"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const validateSchema_1 = __importDefault(require("../middleware/validateSchema"));
const auth_service_1 = require("../service/auth.service");
const auth_schema_1 = require("../schema/auth.schema");
const jwt_1 = require("../util/jwt");
const authHandler = express_1.default.Router();
authHandler.post('/register', (0, validateSchema_1.default)(auth_schema_1.registerSchema), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { username, password } = req.body;
        // check if user already exist
        // Validate if user exist in our database
        const existingUser = yield (0, auth_service_1.getUserByUsername)(username);
        if (existingUser) {
            return res.status(409).send('User Already Exist. Please Login');
        }
        //Encrypt user password
        const encryptedPassword = yield bcryptjs_1.default.hash(password, 10);
        // Create user in our database
        const newUser = yield (0, auth_service_1.createUser)({
            username,
            password: encryptedPassword,
        });
        // Create token
        const token = (0, jwt_1.signJwt)({ username, _id: newUser._id });
        // return new user with token
        res.status(200).json({ _id: newUser._id, token });
    }
    catch (err) {
        console.log(err);
        return res.status(500).send(err);
    }
}));
authHandler.post('/login', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Get user input
        const { username, password } = req.body;
        // Validate if user exist in our database
        const user = yield (0, auth_service_1.getUserByUsername)(username);
        if (user && (yield bcryptjs_1.default.compare(password, user.password))) {
            // Create token
            const token = (0, jwt_1.signJwt)({ username, _id: user._id });
            // user
            return res.status(200).json({ _id: user._id, token });
        }
        return res.status(400).send('Invalid Credentials');
    }
    catch (err) {
        return res.status(500).send(err);
    }
}));
exports.default = authHandler;
