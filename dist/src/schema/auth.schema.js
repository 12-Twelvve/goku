"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginSchema = exports.registerSchema = void 0;
const zod_1 = require("zod");
const payload = {
    body: (0, zod_1.object)({
        username: (0, zod_1.string)({
            required_error: 'Username is required',
        }),
        password: (0, zod_1.string)({
            required_error: 'Password is required',
        }),
    }),
};
exports.registerSchema = (0, zod_1.object)(Object.assign({}, payload));
exports.loginSchema = (0, zod_1.object)(Object.assign({}, payload));
