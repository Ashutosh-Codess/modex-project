"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookingProvider = BookingProvider;
exports.useBooking = useBooking;
var react_1 = require("react");
var client_1 = require("../client");
var BookingContext = (0, react_1.createContext)(undefined);
var DEFAULT_PRICE = 12.99;
var DEFAULT_VENUE = 'Screen 1';
var DEFAULT_GENRE = 'Drama';
var DEFAULT_DURATION = '2h 0m';
function mapBackendShowToFrontend(backendShow) {
    return {
        id: backendShow.id,
        name: backendShow.name,
        posterUrl: "/placeholder.svg",
        startTime: backendShow.start_time,
        totalSeats: backendShow.total_seats,
        availableSeats: backendShow.available_seats || backendShow.total_seats,
        price: DEFAULT_PRICE,
        venue: DEFAULT_VENUE,
        genre: DEFAULT_GENRE,
        duration: DEFAULT_DURATION,
    };
}
function BookingProvider(_a) {
    var _this = this;
    var children = _a.children;
    var _b = (0, react_1.useState)({
        shows: [],
        selectedShow: null,
        selectedSeats: [],
        currentBooking: null,
        isLoading: false,
        error: null,
    }), state = _b[0], setState = _b[1];
    var fetchShows = (0, react_1.useCallback)(function () { return __awaiter(_this, void 0, void 0, function () {
        var res, backendShows, mappedShows_1, error_1, errorMessage_1;
        var _a, _b;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    setState(function (prev) { return (__assign(__assign({}, prev), { isLoading: true, error: null })); });
                    _c.label = 1;
                case 1:
                    _c.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, client_1.default.get('/shows')];
                case 2:
                    res = _c.sent();
                    backendShows = Array.isArray(res.data) ? res.data : [];
                    mappedShows_1 = backendShows.map(mapBackendShowToFrontend);
                    setState(function (prev) { return (__assign(__assign({}, prev), { shows: mappedShows_1, isLoading: false, error: null })); });
                    return [3 /*break*/, 4];
                case 3:
                    error_1 = _c.sent();
                    console.error("Error fetching shows:", error_1);
                    errorMessage_1 = ((_b = (_a = error_1 === null || error_1 === void 0 ? void 0 : error_1.response) === null || _a === void 0 ? void 0 : _a.data) === null || _b === void 0 ? void 0 : _b.error) || (error_1 === null || error_1 === void 0 ? void 0 : error_1.message) || 'Failed to fetch shows';
                    setState(function (prev) { return (__assign(__assign({}, prev), { isLoading: false, error: errorMessage_1, shows: [] })); });
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    }); }, []);
    var selectShow = (0, react_1.useCallback)(function (show) {
        setState(function (prev) { return (__assign(__assign({}, prev), { selectedShow: show, selectedSeats: [] })); });
    }, []);
    var toggleSeat = (0, react_1.useCallback)(function (seat) {
        setState(function (prev) {
            var isSelected = prev.selectedSeats.some(function (s) { return s.id === seat.id; });
            if (isSelected) {
                return __assign(__assign({}, prev), { selectedSeats: prev.selectedSeats.filter(function (s) { return s.id !== seat.id; }) });
            }
            else {
                return __assign(__assign({}, prev), { selectedSeats: __spreadArray(__spreadArray([], prev.selectedSeats, true), [__assign(__assign({}, seat), { status: 'selected' })], false) });
            }
        });
    }, []);
    var clearSelectedSeats = (0, react_1.useCallback)(function () {
        setState(function (prev) { return (__assign(__assign({}, prev), { selectedSeats: [] })); });
    }, []);
    var createBooking = (0, react_1.useCallback)(function () { return __awaiter(_this, void 0, void 0, function () {
        var seatNumbers, res, booking_1, error_2, errorMessage_2;
        var _a, _b;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    if (!state.selectedShow || state.selectedSeats.length === 0) {
                        throw new Error('No show or seats selected');
                    }
                    setState(function (prev) { return (__assign(__assign({}, prev), { isLoading: true, error: null })); });
                    _c.label = 1;
                case 1:
                    _c.trys.push([1, 3, , 4]);
                    seatNumbers = state.selectedSeats.map(function (seat) {
                        var rowIndex = seat.row.charCodeAt(0) - 65;
                        var seatsPerRow = 12;
                        return rowIndex * seatsPerRow + seat.number;
                    });
                    return [4 /*yield*/, client_1.default.post('/bookings', {
                            show_id: state.selectedShow.id,
                            seats: seatNumbers,
                        })];
                case 2:
                    res = _c.sent();
                    booking_1 = {
                        id: res.data.id,
                        showId: state.selectedShow.id,
                        userId: res.data.user_id,
                        seats: state.selectedSeats,
                        totalAmount: state.selectedSeats.reduce(function (sum, seat) { return sum + seat.price; }, 0),
                        status: res.data.status || 'CONFIRMED',
                        createdAt: res.data.created_at,
                    };
                    setState(function (prev) { return (__assign(__assign({}, prev), { currentBooking: booking_1, selectedSeats: [], isLoading: false })); });
                    return [2 /*return*/, booking_1];
                case 3:
                    error_2 = _c.sent();
                    errorMessage_2 = ((_b = (_a = error_2 === null || error_2 === void 0 ? void 0 : error_2.response) === null || _a === void 0 ? void 0 : _a.data) === null || _b === void 0 ? void 0 : _b.error) || (error_2 === null || error_2 === void 0 ? void 0 : error_2.message) || 'Failed to create booking';
                    setState(function (prev) { return (__assign(__assign({}, prev), { isLoading: false, error: errorMessage_2 })); });
                    throw new Error(errorMessage_2);
                case 4: return [2 /*return*/];
            }
        });
    }); }, [state.selectedShow, state.selectedSeats]);
    var createShow = (0, react_1.useCallback)(function (show) { return __awaiter(_this, void 0, void 0, function () {
        var error_3;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    setState(function (prev) { return (__assign(__assign({}, prev), { isLoading: true })); });
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 4, , 5]);
                    return [4 /*yield*/, client_1.default.post('/shows', {
                            name: show.name,
                            start_time: show.startTime,
                            total_seats: show.totalSeats,
                        })];
                case 2:
                    _a.sent();
                    return [4 /*yield*/, fetchShows()];
                case 3:
                    _a.sent();
                    setState(function (prev) { return (__assign(__assign({}, prev), { isLoading: false })); });
                    return [3 /*break*/, 5];
                case 4:
                    error_3 = _a.sent();
                    setState(function (prev) {
                        var _a, _b;
                        return (__assign(__assign({}, prev), { isLoading: false, error: ((_b = (_a = error_3 === null || error_3 === void 0 ? void 0 : error_3.response) === null || _a === void 0 ? void 0 : _a.data) === null || _b === void 0 ? void 0 : _b.error) || 'Failed to create show' }));
                    });
                    throw error_3;
                case 5: return [2 /*return*/];
            }
        });
    }); }, [fetchShows]);
    var deleteShow = (0, react_1.useCallback)(function (id) { return __awaiter(_this, void 0, void 0, function () {
        var res, error_4;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    setState(function (prev) { return (__assign(__assign({}, prev), { isLoading: true })); });
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 4, , 5]);
                    return [4 /*yield*/, client_1.default.delete("/shows/".concat(id)).catch(function () {
                            throw new Error('Delete endpoint not available');
                        })];
                case 2:
                    res = _a.sent();
                    return [4 /*yield*/, fetchShows()];
                case 3:
                    _a.sent();
                    setState(function (prev) { return (__assign(__assign({}, prev), { isLoading: false })); });
                    return [3 /*break*/, 5];
                case 4:
                    error_4 = _a.sent();
                    setState(function (prev) {
                        var _a, _b;
                        return (__assign(__assign({}, prev), { isLoading: false, error: ((_b = (_a = error_4 === null || error_4 === void 0 ? void 0 : error_4.response) === null || _a === void 0 ? void 0 : _a.data) === null || _b === void 0 ? void 0 : _b.error) || (error_4 === null || error_4 === void 0 ? void 0 : error_4.message) || 'Failed to delete show' }));
                    });
                    throw error_4;
                case 5: return [2 /*return*/];
            }
        });
    }); }, [fetchShows]);
    var value = (0, react_1.useMemo)(function () { return (__assign(__assign({}, state), { fetchShows: fetchShows, selectShow: selectShow, toggleSeat: toggleSeat, clearSelectedSeats: clearSelectedSeats, createBooking: createBooking, createShow: createShow, deleteShow: deleteShow })); }, [state, fetchShows, selectShow, toggleSeat, clearSelectedSeats, createBooking, createShow, deleteShow]);
    return (<BookingContext.Provider value={value}>
      {children}
    </BookingContext.Provider>);
}
function useBooking() {
    var context = (0, react_1.useContext)(BookingContext);
    if (context === undefined) {
        throw new Error('useBooking must be used within a BookingProvider');
    }
    return context;
}
