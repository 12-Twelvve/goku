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
exports.createUser = exports.getUserById = exports.getUserByUsername = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const user_model_1 = __importDefault(require("../model/user.model"));
function getUserByUsername(username) {
    return __awaiter(this, void 0, void 0, function* () {
        return user_model_1.default.findOne({ username }).lean();
    });
}
exports.getUserByUsername = getUserByUsername;
function getUserById(id) {
    return __awaiter(this, void 0, void 0, function* () {
        return user_model_1.default.findOne({ _id: new mongoose_1.default.Types.ObjectId(id) }).lean();
    });
}
exports.getUserById = getUserById;
function createUser(user) {
    return __awaiter(this, void 0, void 0, function* () {
        return user_model_1.default.create(user);
    });
}
exports.createUser = createUser;
