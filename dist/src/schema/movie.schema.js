"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getMovieByIdSchema = void 0;
const zod_1 = require("zod");
const params = {
    params: (0, zod_1.object)({
        id: (0, zod_1.string)({
            required_error: 'Movie id is required',
        }),
    }),
};
exports.getMovieByIdSchema = (0, zod_1.object)(Object.assign({}, params));
