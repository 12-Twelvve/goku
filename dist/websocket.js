"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.startWebSocketServer = exports.wss = void 0;
const ws_1 = __importDefault(require("ws"));
let numberOfClients = 0;
const startWebSocketServer = (server) => {
    exports.wss = new ws_1.default.Server({ server });
    exports.wss.on('connection', (ws) => {
        numberOfClients++;
        console.log(`A new client has joined, ${numberOfClients} client(s) connected`);
        ws.on('close', () => {
            numberOfClients--;
            console.log(`A client has been disconnected, ${numberOfClients} client(s) connected`);
        });
        ws.send('Welcome');
    });
};
exports.startWebSocketServer = startWebSocketServer;
