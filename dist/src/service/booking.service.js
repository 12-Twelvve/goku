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
exports.getBookingsByFilter = exports.getBookingByFilter = exports.deleteBooking = exports.updateBooking = exports.createBooking = exports.getRichBookingsDetailsByUserId = exports.getBookingsBySessionId = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const booking_model_1 = __importDefault(require("../model/booking.model"));
function getBookingsBySessionId(sessionId) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield booking_model_1.default.find({ sessionId }).lean();
    });
}
exports.getBookingsBySessionId = getBookingsBySessionId;
function getRichBookingsDetailsByUserId(userId) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield booking_model_1.default.aggregate([
            // filter with userID
            {
                $match: { userId: new mongoose_1.default.Types.ObjectId(userId) },
            },
            // join with session table
            {
                $lookup: {
                    from: 'sessions',
                    localField: 'sessionId',
                    foreignField: '_id',
                    as: 'sessionDetail',
                    pipeline: [
                        // keep only time and movieId
                        {
                            $project: {
                                time: 1,
                                movieId: 1,
                            },
                        },
                    ],
                },
            },
            // join movie table
            {
                $lookup: {
                    from: 'movies',
                    localField: 'sessionDetail.movieId',
                    foreignField: '_id',
                    as: 'movieDetail',
                    pipeline: [
                        {
                            $project: {
                                title: 1,
                            },
                        },
                    ],
                },
            },
            // transform the return with $project
            {
                $project: {
                    userId: 1,
                    sessionId: 1,
                    seatCount: { $size: '$seats' },
                    movieTitle: { $arrayElemAt: ['$movieDetail.title', 0] },
                    sessionTime: { $arrayElemAt: ['$sessionDetail.time', 0] },
                },
            },
        ]);
    });
}
exports.getRichBookingsDetailsByUserId = getRichBookingsDetailsByUserId;
function createBooking(input) {
    return __awaiter(this, void 0, void 0, function* () {
        return booking_model_1.default.create(input);
    });
}
exports.createBooking = createBooking;
function updateBooking(id, userId, input) {
    return __awaiter(this, void 0, void 0, function* () {
        return booking_model_1.default.findOneAndUpdate({
            _id: new mongoose_1.default.Types.ObjectId(id),
            userId: new mongoose_1.default.Types.ObjectId(userId),
        }, input, { new: true } // new option to true to return the document after update was applied.
        );
    });
}
exports.updateBooking = updateBooking;
function deleteBooking(id, userId) {
    return __awaiter(this, void 0, void 0, function* () {
        return booking_model_1.default.deleteOne({
            _id: new mongoose_1.default.Types.ObjectId(id),
            userId: new mongoose_1.default.Types.ObjectId(userId),
        });
    });
}
exports.deleteBooking = deleteBooking;
function getBookingByFilter(query) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield booking_model_1.default.findOne(query).lean();
    });
}
exports.getBookingByFilter = getBookingByFilter;
function getBookingsByFilter(query) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield booking_model_1.default.find(query).lean();
    });
}
exports.getBookingsByFilter = getBookingsByFilter;
