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
exports.default = Booking;
var react_1 = require("react");
var react_router_dom_1 = require("react-router-dom");
var lucide_react_1 = require("lucide-react");
var button_1 = require("@/components/ui/button");
var SeatGrid_1 = require("@/components/SeatGrid");
var BookingStatusBadge_1 = require("@/components/ui/BookingStatusBadge");
var BookingContext_1 = require("@/contexts/BookingContext");
var AuthContext_1 = require("@/contexts/AuthContext");
var use_toast_1 = require("@/hooks/use-toast");
var client_1 = require("../client");
function Booking() {
    var _this = this;
    var id = (0, react_router_dom_1.useParams)().id;
    var navigate = (0, react_router_dom_1.useNavigate)();
    var _a = (0, BookingContext_1.useBooking)(), selectedSeats = _a.selectedSeats, toggleSeat = _a.toggleSeat, clearSelectedSeats = _a.clearSelectedSeats, createBooking = _a.createBooking, isLoading = _a.isLoading, selectShow = _a.selectShow;
    var isAuthenticated = (0, AuthContext_1.useAuth)().isAuthenticated;
    var toast = (0, use_toast_1.useToast)().toast;
    var _b = (0, react_1.useState)(null), show = _b[0], setShow = _b[1];
    var _c = (0, react_1.useState)(true), loadingShow = _c[0], setLoadingShow = _c[1];
    var _d = (0, react_1.useState)('idle'), bookingStatus = _d[0], setBookingStatus = _d[1];
    var _e = (0, react_1.useState)([]), bookedSeats = _e[0], setBookedSeats = _e[1];
    (0, react_1.useEffect)(function () {
        if (id) {
            loadShow();
        }
        return function () {
            clearSelectedSeats();
        };
    }, [id, clearSelectedSeats]);
    var loadShow = function () { return __awaiter(_this, void 0, void 0, function () {
        var res, showData, mappedShow_1, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!id)
                        return [2 /*return*/];
                    setLoadingShow(true);
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, 4, 5]);
                    return [4 /*yield*/, client_1.default.get("/shows/".concat(id))];
                case 2:
                    res = _a.sent();
                    showData = res.data;
                    setShow(showData);
                    setBookedSeats(showData.booked_seats || []);
                    mappedShow_1 = {
                        id: showData.id,
                        name: showData.name,
                        posterUrl: '/placeholder.svg',
                        startTime: showData.start_time,
                        totalSeats: showData.total_seats,
                        availableSeats: showData.available_seats,
                        price: 12.99,
                        venue: 'Screen 1',
                        genre: 'Drama',
                        duration: '2h 0m',
                    };
                    selectShow(mappedShow_1);
                    return [3 /*break*/, 5];
                case 3:
                    error_1 = _a.sent();
                    toast({
                        title: 'Error',
                        description: 'Failed to load show details',
                        variant: 'destructive',
                    });
                    return [3 /*break*/, 5];
                case 4:
                    setLoadingShow(false);
                    return [7 /*endfinally*/];
                case 5: return [2 /*return*/];
            }
        });
    }); };
    var handleSeatClick = function (seat) {
        toggleSeat(seat);
    };
    var totalAmount = (0, react_1.useMemo)(function () {
        return selectedSeats.reduce(function (sum, seat) { return sum + seat.price; }, 0);
    }, [selectedSeats]);
    var handleBooking = function () { return __awaiter(_this, void 0, void 0, function () {
        var error_2;
        var _a, _b;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    if (!isAuthenticated) {
                        toast({
                            title: 'Login required',
                            description: 'Please login to book tickets.',
                            variant: 'destructive',
                        });
                        navigate('/login', { state: { from: { pathname: "/booking/".concat(id) } } });
                        return [2 /*return*/];
                    }
                    if (selectedSeats.length === 0) {
                        toast({
                            title: 'No seats selected',
                            description: 'Please select at least one seat to proceed.',
                            variant: 'destructive',
                        });
                        return [2 /*return*/];
                    }
                    if (!show || !id) {
                        toast({
                            title: 'Error',
                            description: 'Show information not loaded',
                            variant: 'destructive',
                        });
                        return [2 /*return*/];
                    }
                    setBookingStatus('processing');
                    _c.label = 1;
                case 1:
                    _c.trys.push([1, 4, , 5]);
                    return [4 /*yield*/, createBooking()];
                case 2:
                    _c.sent();
                    setBookingStatus('success');
                    toast({
                        title: 'Booking confirmed!',
                        description: "Successfully booked ".concat(selectedSeats.length, " seat(s)"),
                    });
                    return [4 /*yield*/, loadShow()];
                case 3:
                    _c.sent();
                    return [3 /*break*/, 5];
                case 4:
                    error_2 = _c.sent();
                    setBookingStatus('failed');
                    toast({
                        title: 'Booking failed',
                        description: ((_b = (_a = error_2 === null || error_2 === void 0 ? void 0 : error_2.response) === null || _a === void 0 ? void 0 : _a.data) === null || _b === void 0 ? void 0 : _b.error) || 'Something went wrong. Please try again.',
                        variant: 'destructive',
                    });
                    return [3 /*break*/, 5];
                case 5: return [2 /*return*/];
            }
        });
    }); };
    if (loadingShow) {
        return (<div className="min-h-screen flex items-center justify-center">
        <lucide_react_1.Loader2 className="w-8 h-8 animate-spin text-primary"/>
      </div>);
    }
    if (!show) {
        return (<div className="min-h-screen flex items-center justify-center">
        <div className="text-center space-y-4">
          <p className="text-muted-foreground">Show not found</p>
          <button_1.Button onClick={function () { return navigate('/'); }}>
            <lucide_react_1.ArrowLeft className="w-4 h-4 mr-2"/>
            Back to Shows
          </button_1.Button>
        </div>
      </div>);
    }
    var showDate = new Date(show.start_time);
    var mappedShow = {
        id: show.id,
        name: show.name,
        posterUrl: '/placeholder.svg',
        startTime: show.start_time,
        totalSeats: show.total_seats,
        availableSeats: show.available_seats,
        price: 12.99,
        venue: 'Screen 1',
        genre: 'Drama',
        duration: '2h 0m',
    };
    if (bookingStatus === 'success') {
        return (<div className="min-h-screen flex items-center justify-center px-4 pt-20">
        <div className="glass rounded-3xl p-8 max-w-md w-full text-center space-y-6">
          <div className="w-20 h-20 rounded-full bg-green-500/20 flex items-center justify-center mx-auto animate-pulse-glow">
            <lucide_react_1.CheckCircle className="w-10 h-10 text-green-500"/>
          </div>
          
          <div className="space-y-2">
            <h1 className="text-2xl font-bold text-foreground">Booking Confirmed!</h1>
            <p className="text-muted-foreground">Your tickets have been booked successfully</p>
          </div>
          <div className="glass rounded-2xl p-4 space-y-3 text-left">
            <div className="flex items-center gap-3">
              <img src={mappedShow.posterUrl} alt={mappedShow.name} className="w-16 h-20 object-cover rounded-lg"/>
              <div>
                <h3 className="font-semibold">{mappedShow.name}</h3>
                <p className="text-sm text-muted-foreground">{mappedShow.venue}</p>
              </div>
            </div>
            
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Date & Time</span>
              <span>{showDate.toLocaleDateString()} at {showDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
            </div>
            
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Seats</span>
              <span>{selectedSeats.map(function (s) { return s.id; }).join(', ')}</span>
            </div>
            
            <div className="flex items-center justify-between text-sm pt-2 border-t border-border">
              <span className="text-muted-foreground">Total Paid</span>
              <span className="text-lg font-bold text-primary">${totalAmount.toFixed(2)}</span>
            </div>
          </div>
          <BookingStatusBadge_1.BookingStatusBadge status="CONFIRMED"/>
          <div className="flex gap-3">
            <button_1.Button variant="outline" className="flex-1" onClick={function () { return navigate('/'); }}>
              Browse More
            </button_1.Button>
            <button_1.Button className="flex-1 bg-primary hover:bg-primary/90" onClick={function () { return window.print(); }}>
              <lucide_react_1.Ticket className="w-4 h-4 mr-2"/>
              Download Ticket
            </button_1.Button>
          </div>
        </div>
      </div>);
    }
    return (<div className="min-h-screen pt-24 pb-12">
      <div className="container mx-auto px-4">
        <button_1.Button variant="ghost" className="mb-6" onClick={function () { return navigate('/'); }}>
          <lucide_react_1.ArrowLeft className="w-4 h-4 mr-2"/>
          Back to Shows
        </button_1.Button>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="glass rounded-3xl p-6 md:p-8">
              <h2 className="text-2xl font-bold text-center mb-8 text-gradient">Select Your Seats</h2>
              
              <SeatGrid_1.SeatGrid totalSeats={show.total_seats} bookedSeats={bookedSeats} selectedSeats={selectedSeats} onSeatClick={handleSeatClick} basePrice={mappedShow.price}/>
            </div>
          </div>

          <div className="lg:col-span-1">
            <div className="glass rounded-3xl p-6 sticky top-24 space-y-6">
              <div className="flex gap-4">
                <img src={mappedShow.posterUrl} alt={mappedShow.name} className="w-24 h-32 object-cover rounded-xl" onError={function (e) {
            e.target.src = '/placeholder.svg';
        }}/>
                <div className="space-y-2">
                  <h3 className="text-xl font-bold">{mappedShow.name}</h3>
                  <span className="inline-block px-2 py-1 rounded-full bg-primary/20 text-primary text-sm">
                    {mappedShow.genre}
                  </span>
                  <p className="text-sm text-muted-foreground">{mappedShow.duration}</p>
                </div>
              </div>

              <div className="space-y-3 py-4 border-y border-border/50">
                <div className="flex items-center gap-3 text-sm">
                  <lucide_react_1.Calendar className="w-5 h-5 text-primary"/>
                  <span>{showDate.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}</span>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <lucide_react_1.Clock className="w-5 h-5 text-primary"/>
                  <span>{showDate.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}</span>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <lucide_react_1.MapPin className="w-5 h-5 text-primary"/>
                  <span>{mappedShow.venue}</span>
                </div>
              </div>

              <div className="space-y-3">
                <h4 className="font-medium">Selected Seats</h4>
                {selectedSeats.length === 0 ? (<p className="text-sm text-muted-foreground">No seats selected</p>) : (<div className="space-y-2">
                    {selectedSeats.map(function (seat) { return (<div key={seat.id} className="flex items-center justify-between text-sm">
                        <div className="flex items-center gap-2">
                          <span className="w-8 h-8 rounded-lg bg-primary/20 flex items-center justify-center text-primary font-medium">
                            {seat.id}
                          </span>
                          <span className="capitalize text-muted-foreground">{seat.type}</span>
                        </div>
                        <span>${seat.price.toFixed(2)}</span>
                      </div>); })}
                  </div>)}
              </div>

              <div className="flex items-center justify-between py-4 border-t border-border/50">
                <span className="text-lg font-medium">Total</span>
                <span className="text-2xl font-bold text-gradient">${totalAmount.toFixed(2)}</span>
              </div>

              <button_1.Button className="w-full h-14 text-lg bg-primary hover:bg-primary/90 text-primary-foreground font-medium glow-primary" onClick={handleBooking} disabled={selectedSeats.length === 0 || isLoading || bookingStatus === 'processing'}>
                {bookingStatus === 'processing' ? (<>
                    <lucide_react_1.Loader2 className="w-5 h-5 mr-2 animate-spin"/>
                    Processing...
                  </>) : (<>
                    <lucide_react_1.Ticket className="w-5 h-5 mr-2"/>
                    Book {selectedSeats.length} Seat{selectedSeats.length !== 1 ? 's' : ''}
                  </>)}
              </button_1.Button>
              {!isAuthenticated && (<p className="text-center text-sm text-muted-foreground">
                  You'll need to login to complete booking
                </p>)}
            </div>
          </div>
        </div>
      </div>
    </div>);
}
