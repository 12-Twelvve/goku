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
const dotenv_1 = __importDefault(require("dotenv"));
const mongoose_1 = __importDefault(require("mongoose"));
const supertest_1 = __importDefault(require("supertest"));
const app_1 = __importDefault(require("../src/app"));
const movie_model_1 = __importDefault(require("../src/model/movie.model"));
const movies_json_1 = __importDefault(require("../src/data/movies.json"));
const user_model_1 = __importDefault(require("../src/model/user.model"));
const booking_model_1 = __importDefault(require("../src/model/booking.model"));
dotenv_1.default.config();
let token = '';
describe('Movies APIs', () => {
    beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
        yield mongoose_1.default.connect('mongodb://127.0.0.1/testing');
        const res = yield (0, supertest_1.default)(app_1.default).post('/api/auth/register').send({
            username: 'test',
            password: 'test',
        });
        expect(res.status).toBe(200);
        token = res.body.token;
    }));
    beforeEach(() => __awaiter(void 0, void 0, void 0, function* () {
        yield movie_model_1.default.insertMany(movies_json_1.default);
    }));
    afterEach(() => __awaiter(void 0, void 0, void 0, function* () {
        yield movie_model_1.default.deleteMany();
    }));
    afterAll(() => __awaiter(void 0, void 0, void 0, function* () {
        yield user_model_1.default.deleteMany();
        yield booking_model_1.default.deleteMany();
        yield mongoose_1.default.connection.close();
    }));
    it('Get | all movies', () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield (0, supertest_1.default)(app_1.default).get('/api/movies');
        expect(res.status).toBe(200);
        expect(res.body).toHaveLength(6);
    }));
    it('Get | all bookings', () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield (0, supertest_1.default)(app_1.default)
            .get('/api/bookings')
            .set('Authorization', 'Bearer ' + token);
        expect(res.status).toBe(200);
        expect(res.body).toHaveLength(0);
    }));
    it('Post | Create a bookings', () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield (0, supertest_1.default)(app_1.default)
            .post('/api/bookings')
            .set('Authorization', 'Bearer ' + token)
            .send({
            sessionId: '62f87675bebc07b56c891634',
            seats: [74],
        });
        expect(res.status).toBe(200);
        expect(res.body._id).toBeDefined();
    }));
    it('Put | Update a bookings', () => __awaiter(void 0, void 0, void 0, function* () {
        const UPDATED_SEATS = [1, 2, 3];
        const newBookingRes = yield (0, supertest_1.default)(app_1.default)
            .post('/api/bookings')
            .set('Authorization', 'Bearer ' + token)
            .send({
            sessionId: '62f87675bebc07b56c891634',
            seats: [61],
        });
        const updateBookingRes = yield (0, supertest_1.default)(app_1.default)
            .put('/api/bookings/' + newBookingRes.body._id)
            .set('Authorization', 'Bearer ' + token)
            .send({
            sessionId: '62f87675bebc07b56c891634',
            seats: UPDATED_SEATS,
        });
        expect(updateBookingRes.status).toBe(200);
        expect(updateBookingRes.body._id).toBe(newBookingRes.body._id);
        expect(updateBookingRes.body.seats).toStrictEqual(UPDATED_SEATS);
    }));
    it('Delete | Delete a bookings', () => __awaiter(void 0, void 0, void 0, function* () {
        const newBookingRes = yield (0, supertest_1.default)(app_1.default)
            .post('/api/bookings')
            .set('Authorization', 'Bearer ' + token)
            .send({
            sessionId: '62f87675bebc07b56c891634',
            seats: [51],
        });
        const res = yield (0, supertest_1.default)(app_1.default)
            .delete('/api/bookings/' + newBookingRes.body._id)
            .set('Authorization', 'Bearer ' + token);
        expect(res.status).toBe(200);
    }));
});
