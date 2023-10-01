"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const gameSchema = new mongoose_1.default.Schema({
    moves: [
        {
            player: String,
            location: [Number, Number],
        },
    ],
    board_size: { type: Number },
    winner: { type: String, default: null },
}, { timestamps: true });
exports.default = mongoose_1.default.model("Game", gameSchema);
