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
const session_schema_1 = require("../schema/session.schema");
const validateSchema_1 = __importDefault(require("../middleware/validateSchema"));
const session_service_1 = require("../service/session.service");
const movie_service_1 = require("../service/movie.service");
const theatre_service_1 = require("../service/theatre.service");
const booking_service_1 = require("../service/booking.service");
const deserializeUser_1 = require("../middleware/deserializeUser");
const sessionHandler = express_1.default.Router();
sessionHandler.use(deserializeUser_1.deserializeUser);
// Get session details, expecting movie, session, theatre, booked seats and occupied seats
sessionHandler.get('/:id', (0, validateSchema_1.default)(session_schema_1.getSessionByIdSchema), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const sessionId = req.params.id;
    const userId = req.userId;
    const session = yield (0, session_service_1.getSessionById)(sessionId);
    if (!session)
        return res.sendStatus(404);
    const movie = yield (0, movie_service_1.getMovieById)(session.movieId);
    if (!movie)
        return res.sendStatus(400);
    const theatre = yield (0, theatre_service_1.getTheatreById)(session.theatreId);
    if (!movie)
        return res.sendStatus(400);
    const allBookings = yield (0, booking_service_1.getBookingsBySessionId)(sessionId);
    const userBooking = yield (0, booking_service_1.getBookingByFilter)({ sessionId, userId });
    const userBookingId = userBooking === null || userBooking === void 0 ? void 0 : userBooking._id;
    const userSeats = (userBooking === null || userBooking === void 0 ? void 0 : userBooking.seats) || [];
    const occupiedSeats = allBookings
        .map((b) => b.seats)
        .flat()
        .filter((s) => userSeats.findIndex((userSeat) => userSeat === s) === -1);
    return res.status(200).json(Object.assign(Object.assign({}, session), { movie,
        theatre,
        occupiedSeats,
        userSeats,
        userBookingId }));
}));
exports.default = sessionHandler;
