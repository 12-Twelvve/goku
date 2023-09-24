"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const mongoose_1 = __importDefault(require("mongoose"));
const connectDB_1 = __importDefault(require("./util/connectDB"));
const app_1 = require("./app");
const websocket_1 = require("./websocket");
dotenv_1.default.config();
const port = process.env.PORT;
// connect to database
(0, connectDB_1.default)();
// only listen to request when DB connection is established
mongoose_1.default.connection.once('connected', () => {
    console.log('⚡️[server]: Connected to MongoDB.');
    (0, websocket_1.startWebSocketServer)(app_1.server);
    app_1.server.listen(port, () => {
        console.log(`⚡️[server]: Server is running at https://localhost:${port}`);
    });
});
