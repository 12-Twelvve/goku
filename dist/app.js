"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.server = void 0;
const http_1 = require("http");
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const auth_handler_1 = __importDefault(require("./handler/auth.handler"));
// import handler
const game_handler_1 = require("./handler/game.handler");
const app = (0, express_1.default)();
app.use((0, cors_1.default)({
    origin: process.env.allowHost || true,
}));
app.use(express_1.default.json());
// simple api
app.get('/', (req, res) => {
    res.send('Hello, Gomoku API!');
});
// user auth api
app.use('/api/auth', auth_handler_1.default);
// gomuko game ap is
app.get("/api/games", game_handler_1.getGamesHandler);
app.get("/api/game/:id", game_handler_1.getGameByIdHandler);
app.post("/api/game/create", game_handler_1.createGameHandler);
app.put("/api/game/:id", game_handler_1.updateGameHandler);
app.put("/api/game/winner/:id", game_handler_1.updateGameWinnerHandler);
// run server
exports.server = (0, http_1.createServer)(app);
exports.default = app;
