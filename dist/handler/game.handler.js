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
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateGameWinnerHandler = exports.updateGameHandler = exports.createGameHandler = exports.getGameByIdHandler = exports.getGamesHandler = void 0;
const game_service_1 = require("../service/game.service");
// Retrieve a list of played games
function getGamesHandler(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const games = yield (0, game_service_1.getGames)();
            res.status(200).json(games);
        }
        catch (error) {
            res.status(500).json({ error: "Internal Server Error" });
        }
    });
}
exports.getGamesHandler = getGamesHandler;
// Retrieve a single game by ID
function getGameByIdHandler(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const gameId = req.params.id;
        try {
            const game = yield (0, game_service_1.getGameById)(gameId);
            if (!game) {
                res.status(404).json({ error: "Game not found" });
            }
            else {
                res.status(200).json(game);
            }
        }
        catch (error) {
            res.status(500).json({ error: "Internal Server Error" });
        }
    });
}
exports.getGameByIdHandler = getGameByIdHandler;
// Create a new game
function createGameHandler(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        // try {
        const { moves, winner, board_size } = req.body;
        // console.log(req.body)
        if (!moves || !board_size) {
            return res.status(400).json({ error: "Title, description, and board_size are required" });
        }
        const newGame = yield (0, game_service_1.createGame)({
            moves,
            board_size,
            winner,
        });
        res.status(201).json(newGame);
    });
}
exports.createGameHandler = createGameHandler;
// Update the current moves and respond with the current game status
function updateGameHandler(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const gameId = req.params.id;
        const { move } = req.body;
        try {
            const updatedGame = yield (0, game_service_1.updateGame)(gameId, move);
            if (!updatedGame) {
                res.status(404).json({ error: "Game not found" });
            }
            else {
                let moves = updatedGame.moves;
                let boardSize = updatedGame.board_size;
                let result = (0, game_service_1.checkGomokuResult)(moves, boardSize);
                result.then((result) => {
                    res.status(200).json({ "winner": result });
                });
            }
        }
        catch (error) {
            res.status(500).json({ error: "Internal Server Error" });
        }
    });
}
exports.updateGameHandler = updateGameHandler;
// Update the winner of a game handler
function updateGameWinnerHandler(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const id = req.params.id;
            const { winner } = req.body;
            const updatedGame = yield (0, game_service_1.updateGameWinner)(id, winner);
            if (!updatedGame) {
                return res.status(404).json({ message: 'Gaaame not found' });
            }
            return res.status(200).json(updatedGame);
        }
        catch (error) {
            console.error(error);
            return res.status(500).json({ error: 'Internal Server Error' });
        }
    });
}
exports.updateGameWinnerHandler = updateGameWinnerHandler;
