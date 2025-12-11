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
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = MyBookings;
var react_1 = require("react");
var AuthContext_1 = require("@/contexts/AuthContext");
var lucide_react_1 = require("lucide-react");
var client_1 = require("../client");
function MyBookings() {
    var _this = this;
    var user = (0, AuthContext_1.useAuth)().user;
    var _a = (0, react_1.useState)([]), bookings = _a[0], setBookings = _a[1];
    var _b = (0, react_1.useState)(true), loading = _b[0], setLoading = _b[1];
    var _c = (0, react_1.useState)(''), error = _c[0], setError = _c[1];
    (0, react_1.useEffect)(function () {
        if (user) {
            fetchBookings();
        }
    }, [user]);
    var fetchBookings = function () { return __awaiter(_this, void 0, void 0, function () {
        var res, allBookings, userBookings, bookingsWithShows, err_1;
        var _this = this;
        var _a, _b;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    setLoading(true);
                    setError('');
                    _c.label = 1;
                case 1:
                    _c.trys.push([1, 4, 5, 6]);
                    return [4 /*yield*/, client_1.default.get('/bookings')];
                case 2:
                    res = _c.sent();
                    allBookings = res.data || [];
                    userBookings = allBookings.filter(function (b) { return b.user_id === (user === null || user === void 0 ? void 0 : user.id); });
                    return [4 /*yield*/, Promise.all(userBookings.map(function (booking) { return __awaiter(_this, void 0, void 0, function () {
                            var showRes, _a;
                            return __generator(this, function (_b) {
                                switch (_b.label) {
                                    case 0:
                                        _b.trys.push([0, 2, , 3]);
                                        return [4 /*yield*/, client_1.default.get("/shows/".concat(booking.show_id))];
                                    case 1:
                                        showRes = _b.sent();
                                        return [2 /*return*/, __assign(__assign({}, booking), { show_name: showRes.data.name })];
                                    case 2:
                                        _a = _b.sent();
                                        return [2 /*return*/, __assign(__assign({}, booking), { show_name: 'Unknown Show' })];
                                    case 3: return [2 /*return*/];
                                }
                            });
                        }); }))];
                case 3:
                    bookingsWithShows = _c.sent();
                    setBookings(bookingsWithShows);
                    return [3 /*break*/, 6];
                case 4:
                    err_1 = _c.sent();
                    setError(((_b = (_a = err_1 === null || err_1 === void 0 ? void 0 : err_1.response) === null || _a === void 0 ? void 0 : _a.data) === null || _b === void 0 ? void 0 : _b.error) || 'Failed to load bookings');
                    return [3 /*break*/, 6];
                case 5:
                    setLoading(false);
                    return [7 /*endfinally*/];
                case 6: return [2 /*return*/];
            }
        });
    }); };
    var getStatusColor = function (status) {
        switch (status) {
            case 'CONFIRMED':
                return { bg: 'rgba(40, 167, 69, 0.2)', border: '#28a745', text: '#51cf66' };
            case 'PENDING':
                return { bg: 'rgba(255, 193, 7, 0.2)', border: '#ffc107', text: '#ffd43b' };
            case 'FAILED':
                return { bg: 'rgba(220, 53, 69, 0.2)', border: '#dc3545', text: '#ff6b6b' };
            default:
                return { bg: 'rgba(108, 117, 125, 0.2)', border: '#6c757d', text: '#adb5bd' };
        }
    };
    if (!user) {
        return (<div style={{
                minHeight: '100vh',
                backgroundImage: 'url(https://png.pngtree.com/background/20230426/original/pngtree-cinema-movie-theater-background-picture-image_2477892.jpg)',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                paddingTop: '100px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
            }}>
        <div style={{
                background: 'rgba(139, 0, 0, 0.95)',
                padding: '2rem',
                borderRadius: '16px',
                color: 'white',
                textAlign: 'center'
            }}>
          <p style={{ fontSize: '1.125rem', marginBottom: '1rem' }}>Please login to view your bookings</p>
          <a href="/login" style={{
                color: '#ff6b6b',
                textDecoration: 'none',
                fontWeight: '600'
            }}>Go to Login →</a>
        </div>
      </div>);
    }
    return (<div style={{
            minHeight: '100vh',
            backgroundImage: 'url(https://png.pngtree.com/background/20230426/original/pngtree-cinema-movie-theater-background-picture-image_2477892.jpg)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundAttachment: 'fixed',
            paddingTop: '100px',
            paddingBottom: '3rem',
            position: 'relative'
        }}>
      {/* Dark overlay */}
      <div style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'rgba(0,0,0,0.6)',
            zIndex: 1
        }}/>

      <div style={{
            maxWidth: '1200px',
            margin: '0 auto',
            padding: '0 1.5rem',
            position: 'relative',
            zIndex: 2
        }}>
        <div style={{
            textAlign: 'center',
            marginBottom: '3rem'
        }}>
          <h1 style={{
            fontSize: '2.5rem',
            fontWeight: 'bold',
            color: 'white',
            marginBottom: '0.5rem'
        }}>
            My Bookings
          </h1>
          <p style={{ color: 'rgba(255,255,255,0.8)', fontSize: '1.125rem' }}>
            View all your movie ticket bookings
          </p>
        </div>

        {error && (<div style={{
                background: 'rgba(220, 53, 69, 0.2)',
                border: '1px solid #dc3545',
                borderRadius: '12px',
                padding: '1rem',
                marginBottom: '2rem',
                color: '#ff6b6b',
                textAlign: 'center'
            }}>
            {error}
          </div>)}

        {loading ? (<div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '4rem 0',
                flexDirection: 'column',
                gap: '1rem'
            }}>
            <lucide_react_1.Loader2 style={{ width: '48px', height: '48px', animation: 'spin 1s linear infinite', color: '#8b0000' }}/>
            <p style={{ color: 'white' }}>Loading your bookings...</p>
          </div>) : bookings.length === 0 ? (<div style={{
                background: 'rgba(139, 0, 0, 0.8)',
                borderRadius: '16px',
                padding: '3rem',
                textAlign: 'center',
                color: 'white'
            }}>
            <lucide_react_1.Ticket style={{ width: '64px', height: '64px', margin: '0 auto 1rem', opacity: 0.5 }}/>
            <p style={{ fontSize: '1.125rem', marginBottom: '1rem' }}>No bookings found</p>
            <p style={{ color: 'rgba(255,255,255,0.7)', marginBottom: '1.5rem' }}>
              Start booking your favorite movies!
            </p>
            <a href="/" style={{
                display: 'inline-block',
                background: 'linear-gradient(135deg, #8b0000, #dc143c)',
                color: 'white',
                padding: '0.75rem 1.5rem',
                borderRadius: '8px',
                textDecoration: 'none',
                fontWeight: '600'
            }}>
              Browse Movies
            </a>
          </div>) : (<div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))',
                gap: '1.5rem'
            }}>
            {bookings.map(function (booking) {
                var statusStyle = getStatusColor(booking.status);
                var bookingDate = new Date(booking.created_at);
                return (<div key={booking.id} style={{
                        background: 'rgba(139, 0, 0, 0.9)',
                        borderRadius: '16px',
                        padding: '1.5rem',
                        border: "2px solid ".concat(statusStyle.border),
                        boxShadow: '0 8px 24px rgba(0,0,0,0.3)',
                        color: 'white'
                    }}>
                  <div style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'start',
                        marginBottom: '1rem'
                    }}>
                    <h3 style={{
                        fontSize: '1.25rem',
                        fontWeight: 'bold',
                        marginBottom: '0.5rem',
                        flex: 1
                    }}>
                      {booking.show_name || 'Movie Show'}
                    </h3>
                    <span style={{
                        background: statusStyle.bg,
                        border: "1px solid ".concat(statusStyle.border),
                        color: statusStyle.text,
                        padding: '0.25rem 0.75rem',
                        borderRadius: '6px',
                        fontSize: '0.75rem',
                        fontWeight: '600',
                        textTransform: 'uppercase'
                    }}>
                      {booking.status}
                    </span>
                  </div>

                  <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.5rem',
                        marginBottom: '0.75rem',
                        fontSize: '0.9rem',
                        color: 'rgba(255,255,255,0.8)'
                    }}>
                    <lucide_react_1.Calendar style={{ width: '18px', height: '18px' }}/>
                    <span>{bookingDate.toLocaleDateString()}</span>
                  </div>

                  <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.5rem',
                        marginBottom: '0.75rem',
                        fontSize: '0.9rem',
                        color: 'rgba(255,255,255,0.8)'
                    }}>
                    <lucide_react_1.Clock style={{ width: '18px', height: '18px' }}/>
                    <span>{bookingDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                  </div>

                  <div style={{
                        background: 'rgba(0,0,0,0.3)',
                        borderRadius: '8px',
                        padding: '1rem',
                        marginTop: '1rem'
                    }}>
                    <div style={{
                        fontSize: '0.875rem',
                        color: 'rgba(255,255,255,0.7)',
                        marginBottom: '0.5rem'
                    }}>
                      Seats Booked:
                    </div>
                    <div style={{
                        display: 'flex',
                        flexWrap: 'wrap',
                        gap: '0.5rem'
                    }}>
                      {booking.seats.map(function (seat, idx) { return (<span key={idx} style={{
                            background: 'rgba(255,255,255,0.2)',
                            padding: '0.25rem 0.75rem',
                            borderRadius: '6px',
                            fontSize: '0.875rem',
                            fontWeight: '600'
                        }}>
                          Seat {seat}
                        </span>); })}
                    </div>
                  </div>
                </div>);
            })}
          </div>)}
      </div>

      <style>{"\n        @keyframes spin {\n          from { transform: rotate(0deg); }\n          to { transform: rotate(360deg); }\n        }\n      "}</style>
    </div>);
}
