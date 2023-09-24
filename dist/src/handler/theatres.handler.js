"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const theatreHandler = express_1.default.Router();
theatreHandler.get('/', (req, res) => {
    try {
        return res.status(200).send([
            {
                _id: 1,
                rows: 8,
                seats: 9,
                aisles: [3, 7],
            },
            {
                _id: 2,
                rows: 7,
                seats: 8,
                aisles: [4],
            },
            {
                _id: 3,
                rows: 12,
                seats: 10,
                aisles: [5],
            },
        ]);
    }
    catch (err) {
        return res.status(500).send(err);
    }
});
exports.default = theatreHandler;
