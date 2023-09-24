"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const theatreSchema = new mongoose_1.default.Schema({
    rows: Number,
    seats: Number,
    aisles: [Number]
});
exports.default = mongoose_1.default.model("Theatre", theatreSchema);
