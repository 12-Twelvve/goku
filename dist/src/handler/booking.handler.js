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
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const ws_1 = __importDefault(require("ws"));
const lodash_1 = require("lodash");
const validateSchema_1 = __importDefault(require("../middleware/validateSchema"));
const websocket_1 = require("../websocket");
const booking_schema_1 = require("../schema/booking.schema");
const booking_service_1 = require("../service/booking.service");
const deserializeUser_1 = require("../middleware/deserializeUser");
const bookingHandler = express_1.default.Router();
bookingHandler.use(deserializeUser_1.deserializeUser);
// Get bookings for current user
bookingHandler.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // TODO: decode user id from token
    const userId = req.userId;
    // introducing Mongoose aggregate
    const bookings = yield (0, booking_service_1.getRichBookingsDetailsByUserId)(userId);
    return res.status(200).json(bookings);
}));
// Create a booking
bookingHandler.post('/', (0, validateSchema_1.default)(booking_schema_1.createBookingSchema), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // TODO: decode user id from token
    const userId = req.userId;
    const booking = req.body;
    const bookingsForTheSession = yield (0, booking_service_1.getBookingsByFilter)({
        sessionId: new mongoose_1.default.Types.ObjectId(booking.sessionId),
    });
    const allOccupiedSeats = bookingsForTheSession.length
        ? bookingsForTheSession.map((b) => b.seats).flat()
        : [];
    const overlappingSeats = !!(0, lodash_1.intersection)(allOccupiedSeats, booking.seats)
        .length;
    if (overlappingSeats)
        return res.sendStatus(400);
    const newBooking = yield (0, booking_service_1.createBooking)(Object.assign(Object.assign({}, booking), { userId }));
    websocket_1.wss.clients.forEach((client) => {
        if (client.readyState === ws_1.default.OPEN) {
            client.send(JSON.stringify({
                updateBy: userId,
                sessionId: booking.sessionId,
                occupiedSeats: [...allOccupiedSeats, ...booking.seats],
            }));
        }
    });
    return res.status(200).send(newBooking);
}));
// Modify a booking
bookingHandler.put('/:id', (0, validateSchema_1.default)(booking_schema_1.updateBookingSchema), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // TODO: decode user id from token
    const userId = req.userId;
    const booking = req.body;
    const bookingId = req.params.id;
    const bookingsForTheSession = yield (0, booking_service_1.getBookingsByFilter)({
        sessionId: new mongoose_1.default.Types.ObjectId(booking.sessionId),
        _id: { $ne: new mongoose_1.default.Types.ObjectId(bookingId) },
    });
    const allOccupiedSeats = bookingsForTheSession.length
        ? bookingsForTheSession.map((b) => b.seats).flat()
        : [];
    const overlappingSeats = !!(0, lodash_1.intersection)(allOccupiedSeats, booking.seats)
        .length;
    if (overlappingSeats)
        return res.sendStatus(400);
    const newBooking = yield (0, booking_service_1.updateBooking)(bookingId, userId, Object.assign(Object.assign({}, booking), { userId }));
    if (!newBooking)
        return res.sendStatus(404);
    websocket_1.wss.clients.forEach((client) => {
        if (client.readyState === ws_1.default.OPEN) {
            client.send(JSON.stringify({
                updateBy: userId,
                sessionId: booking.sessionId,
                occupiedSeats: [...allOccupiedSeats, ...booking.seats],
            }));
        }
    });
    return res.status(200).json(newBooking);
}));
bookingHandler.delete('/:id', (0, validateSchema_1.default)(booking_schema_1.deleteBookingSchema), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const bookingId = req.params.id;
    const booking = yield (0, booking_service_1.getBookingByFilter)({
        _id: new mongoose_1.default.Types.ObjectId(bookingId),
    });
    if (!booking) {
        return res.sendStatus(404);
    }
    const bookingsForTheSession = yield (0, booking_service_1.getBookingsByFilter)({
        sessionId: new mongoose_1.default.Types.ObjectId(booking.sessionId),
        _id: { $ne: new mongoose_1.default.Types.ObjectId(bookingId) },
    });
    const allOccupiedSeats = bookingsForTheSession.length
        ? bookingsForTheSession.map((b) => b.seats).flat()
        : [];
    const userId = req.userId;
    yield (0, booking_service_1.deleteBooking)(bookingId, userId);
    websocket_1.wss.clients.forEach((client) => {
        if (client.readyState === ws_1.default.OPEN) {
            client.send(JSON.stringify({
                updateBy: userId,
                sessionId: booking.sessionId,
                occupiedSeats: [...allOccupiedSeats],
            }));
        }
    });
    return res.sendStatus(200);
}));
exports.default = bookingHandler;
