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
const validateSchema_1 = __importDefault(require("../middleware/validateSchema"));
const movie_schema_1 = require("../schema/movie.schema");
const movie_service_1 = require("../service/movie.service");
const session_service_1 = require("../service/session.service");
const movieHandler = express_1.default.Router();
// Get ALL movies
movieHandler.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield (0, movie_service_1.getAllMovies)();
        return res.status(200).send(result.map((m) => ({
            _id: m._id,
            title: m.title,
            poster: m.poster,
        })));
    }
    catch (err) {
        return res.status(500).send(err);
    }
}));
// GET movie by ID, expecting movie + session info
movieHandler.get('/:id', (0, validateSchema_1.default)(movie_schema_1.getMovieByIdSchema), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const movieId = req.params.id;
    const movie = yield (0, movie_service_1.getMovieById)(movieId);
    if (!movie)
        return res.sendStatus(404);
    const sessions = yield (0, session_service_1.getSessionsByMovieId)(movieId);
    return res.status(200).json(Object.assign(Object.assign({}, movie), { sessions }));
}));
exports.default = movieHandler;
