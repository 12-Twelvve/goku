"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getBookingsSchema = exports.deleteBookingSchema = exports.updateBookingSchema = exports.createBookingSchema = void 0;
const zod_1 = require("zod");
const payload = {
    body: (0, zod_1.object)({
        sessionId: (0, zod_1.string)({
            required_error: 'Session id is required',
        }),
        seats: (0, zod_1.array)((0, zod_1.number)({
            required_error: 'Seats are required',
        })).nonempty(),
    }),
};
const getParams = {
    params: (0, zod_1.object)({
        sessionId: (0, zod_1.string)({
            required_error: 'Session id is required',
        }),
    }),
};
const updateDeleteParams = {
    params: (0, zod_1.object)({
        id: (0, zod_1.string)({
            required_error: 'Booking id is required',
        }),
    }),
};
exports.createBookingSchema = (0, zod_1.object)(Object.assign({}, payload));
exports.updateBookingSchema = (0, zod_1.object)(Object.assign(Object.assign({}, payload), updateDeleteParams));
exports.deleteBookingSchema = (0, zod_1.object)(Object.assign({}, updateDeleteParams));
exports.getBookingsSchema = (0, zod_1.object)(Object.assign({}, getParams));
