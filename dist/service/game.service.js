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
exports.checkGomokuResult = exports.updateGameWinner = exports.updateGame = exports.createGame = exports.getGameById = exports.getGames = void 0;
const game_model_1 = __importDefault(require("../model/game.model"));
// Retrieve a list of played games
function getGames() {
    return __awaiter(this, void 0, void 0, function* () {
        return game_model_1.default.find().exec();
    });
}
exports.getGames = getGames;
// Retrieve a single game by ID
function getGameById(gameId) {
    return __awaiter(this, void 0, void 0, function* () {
        return game_model_1.default.findById(gameId).exec();
    });
}
exports.getGameById = getGameById;
// Create a new game
function createGame(gameData) {
    return __awaiter(this, void 0, void 0, function* () {
        const newGame = new game_model_1.default(gameData);
        return newGame.save();
    });
}
exports.createGame = createGame;
// Update the current moves and return the updated game
function updateGame(gameId, newMove) {
    return __awaiter(this, void 0, void 0, function* () {
        const updatedGame = yield game_model_1.default.findByIdAndUpdate(gameId, { $push: { moves: newMove } }, { new: true });
        return updatedGame;
    });
}
exports.updateGame = updateGame;
// Update the winner of a game
function updateGameWinner(gameId, winner) {
    return __awaiter(this, void 0, void 0, function* () {
        const updatedGame = yield game_model_1.default.findByIdAndUpdate(gameId, { winner }, { new: true });
        return updatedGame;
    });
}
exports.updateGameWinner = updateGameWinner;
const checkWin = (board, boardSize) => {
    const n = boardSize;
    for (let i = 0; i < n; i++) {
        for (let j = 0; j < n; j++) {
            if (board[i][j] === "0") {
                // Skip empty cells
                continue;
            }
            // Check horizontal
            if (j + 4 < n &&
                board[i][j] === board[i][j + 1] &&
                board[i][j] === board[i][j + 2] &&
                board[i][j] === board[i][j + 3] &&
                board[i][j] === board[i][j + 4]) {
                return true;
            }
            // Check vertical
            if (i + 4 < n &&
                board[i][j] === board[i + 1][j] &&
                board[i][j] === board[i + 2][j] &&
                board[i][j] === board[i + 3][j] &&
                board[i][j] === board[i + 4][j]) {
                return true;
            }
            // Check diagonal \
            if (i + 4 < n &&
                j + 4 < n &&
                board[i][j] === board[i + 1][j + 1] &&
                board[i][j] === board[i + 2][j + 2] &&
                board[i][j] === board[i + 3][j + 3] &&
                board[i][j] === board[i + 4][j + 4]) {
                return true;
            }
            // Check diagonal /
            if (i - 4 >= 0 &&
                j + 4 < n &&
                board[i][j] === board[i - 1][j + 1] &&
                board[i][j] === board[i - 2][j + 2] &&
                board[i][j] === board[i - 3][j + 3] &&
                board[i][j] === board[i - 4][j + 4]) {
                return true;
            }
        }
    }
    return false;
};
function checkGomokuResult(moves, boardSize) {
    return __awaiter(this, void 0, void 0, function* () {
        const board = Array.from({ length: boardSize }, () => Array(boardSize).fill('0'));
        for (const move of moves) {
            const [row, col] = move.location;
            board[row][col] = move.player;
            if (checkWin(board, boardSize)) {
                return move.player; // Player has won
            }
        }
        return null; // No winner yet
    });
}
exports.checkGomokuResult = checkGomokuResult;
