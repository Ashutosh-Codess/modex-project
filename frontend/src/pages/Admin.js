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
exports.default = Admin;
var react_1 = require("react");
var lucide_react_1 = require("lucide-react");
var button_1 = require("@/components/ui/button");
var input_1 = require("@/components/ui/input");
var label_1 = require("@/components/ui/label");
var table_1 = require("@/components/ui/table");
var dialog_1 = require("@/components/ui/dialog");
var StatsCard_1 = require("@/components/StatsCard");
var BookingContext_1 = require("@/contexts/BookingContext");
var use_toast_1 = require("@/hooks/use-toast");
var genres = ['Action', 'Sci-Fi', 'Crime', 'Drama', 'Comedy', 'Horror', 'Romance', 'Thriller'];
var venues = ['Screen 1', 'Screen 2', 'Screen 3', 'IMAX', 'VIP Lounge'];
function Admin() {
    var _this = this;
    var _a = (0, BookingContext_1.useBooking)(), shows = _a.shows, fetchShows = _a.fetchShows, createShow = _a.createShow, deleteShow = _a.deleteShow, isLoading = _a.isLoading;
    var toast = (0, use_toast_1.useToast)().toast;
    var _b = (0, react_1.useState)(false), isDialogOpen = _b[0], setIsDialogOpen = _b[1];
    var _c = (0, react_1.useState)({
        name: '',
        startTime: '',
        totalSeats: 100,
    }), formData = _c[0], setFormData = _c[1];
    var _d = (0, react_1.useState)({}), errors = _d[0], setErrors = _d[1];
    (0, react_1.useEffect)(function () {
        fetchShows();
    }, [fetchShows]);
    var validate = function () {
        var newErrors = {};
        if (!formData.name.trim())
            newErrors.name = 'Name is required';
        if (!formData.startTime)
            newErrors.startTime = 'Start time is required';
        if (formData.totalSeats < 1)
            newErrors.totalSeats = 'Must have at least 1 seat';
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };
    var handleSubmit = function (e) { return __awaiter(_this, void 0, void 0, function () {
        var error_1;
        var _a, _b;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    e.preventDefault();
                    if (!validate())
                        return [2 /*return*/];
                    _c.label = 1;
                case 1:
                    _c.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, createShow({
                            name: formData.name,
                            startTime: formData.startTime,
                            totalSeats: formData.totalSeats,
                            price: 12.99,
                            venue: venues[0],
                            genre: genres[0],
                            duration: '2h 0m',
                            posterUrl: '/placeholder.svg',
                        })];
                case 2:
                    _c.sent();
                    toast({
                        title: 'Show created!',
                        description: "\"".concat(formData.name, "\" has been added successfully."),
                    });
                    setIsDialogOpen(false);
                    setFormData({
                        name: '',
                        startTime: '',
                        totalSeats: 100,
                    });
                    return [3 /*break*/, 4];
                case 3:
                    error_1 = _c.sent();
                    toast({
                        title: 'Error',
                        description: ((_b = (_a = error_1 === null || error_1 === void 0 ? void 0 : error_1.response) === null || _a === void 0 ? void 0 : _a.data) === null || _b === void 0 ? void 0 : _b.error) || 'Failed to create show. Please try again.',
                        variant: 'destructive',
                    });
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    }); };
    var handleDelete = function (id, name) { return __awaiter(_this, void 0, void 0, function () {
        var error_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, deleteShow(id)];
                case 1:
                    _a.sent();
                    toast({
                        title: 'Show deleted',
                        description: "\"".concat(name, "\" has been removed."),
                    });
                    return [3 /*break*/, 3];
                case 2:
                    error_2 = _a.sent();
                    toast({
                        title: 'Error',
                        description: 'Failed to delete show.',
                        variant: 'destructive',
                    });
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    }); };
    var totalRevenue = shows.reduce(function (sum, show) {
        var bookedSeats = show.totalSeats - show.availableSeats;
        return sum + (bookedSeats * show.price);
    }, 0);
    var totalBookings = shows.reduce(function (sum, show) {
        return sum + (show.totalSeats - show.availableSeats);
    }, 0);
    return (<div className="min-h-screen pt-24 pb-12">
      <div className="container mx-auto px-4 space-y-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gradient">Admin Dashboard</h1>
            <p className="text-muted-foreground mt-1">Manage shows, bookings, and analytics</p>
          </div>
          
          <dialog_1.Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <dialog_1.DialogTrigger asChild>
              <button_1.Button className="bg-primary hover:bg-primary/90 text-primary-foreground">
                <lucide_react_1.Plus className="w-5 h-5 mr-2"/>
                Add New Show
              </button_1.Button>
            </dialog_1.DialogTrigger>
            <dialog_1.DialogContent className="glass max-w-2xl max-h-[90vh] overflow-y-auto">
              <dialog_1.DialogHeader>
                <dialog_1.DialogTitle className="text-2xl text-gradient">Create New Show</dialog_1.DialogTitle>
              </dialog_1.DialogHeader>
              
              <form onSubmit={handleSubmit} className="space-y-5 mt-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label_1.Label htmlFor="name">Show Name</label_1.Label>
                    <input_1.Input id="name" placeholder="Enter show name" value={formData.name} onChange={function (e) { return setFormData(__assign(__assign({}, formData), { name: e.target.value })); }} className={"bg-muted/50 ".concat(errors.name ? 'border-destructive' : '')}/>
                    {errors.name && <p className="text-sm text-destructive">{errors.name}</p>}
                  </div>
                  
                  <div className="space-y-2">
                    <label_1.Label htmlFor="totalSeats">Total Seats</label_1.Label>
                    <input_1.Input id="totalSeats" type="number" min="1" value={formData.totalSeats} onChange={function (e) { return setFormData(__assign(__assign({}, formData), { totalSeats: parseInt(e.target.value) || 0 })); }} className={"bg-muted/50 ".concat(errors.totalSeats ? 'border-destructive' : '')}/>
                    {errors.totalSeats && <p className="text-sm text-destructive">{errors.totalSeats}</p>}
                  </div>
                </div>

                <div className="space-y-2">
                  <label_1.Label htmlFor="startTime">Start Time</label_1.Label>
                  <input_1.Input id="startTime" type="datetime-local" value={formData.startTime} onChange={function (e) { return setFormData(__assign(__assign({}, formData), { startTime: e.target.value })); }} className={"bg-muted/50 ".concat(errors.startTime ? 'border-destructive' : '')}/>
                  {errors.startTime && <p className="text-sm text-destructive">{errors.startTime}</p>}
                </div>

                <div className="flex gap-3 pt-4">
                  <button_1.Button type="button" variant="outline" className="flex-1" onClick={function () { return setIsDialogOpen(false); }}>
                    Cancel
                  </button_1.Button>
                  <button_1.Button type="submit" className="flex-1 bg-primary hover:bg-primary/90" disabled={isLoading}>
                    {isLoading ? (<>
                        <lucide_react_1.Loader2 className="w-4 h-4 mr-2 animate-spin"/>
                        Creating...
                      </>) : ('Create Show')}
                  </button_1.Button>
                </div>
              </form>
            </dialog_1.DialogContent>
          </dialog_1.Dialog>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatsCard_1.StatsCard title="Total Shows" value={shows.length} icon={lucide_react_1.Film} trend={{ value: 12, isPositive: true }}/>
          <StatsCard_1.StatsCard title="Total Bookings" value={totalBookings} icon={lucide_react_1.Ticket} trend={{ value: 8, isPositive: true }}/>
          <StatsCard_1.StatsCard title="Revenue" value={"$".concat(totalRevenue.toFixed(2))} icon={lucide_react_1.DollarSign} trend={{ value: 15, isPositive: true }}/>
          <StatsCard_1.StatsCard title="Active Users" value="1,234" icon={lucide_react_1.Users} trend={{ value: 5, isPositive: true }}/>
        </div>

        <div className="glass rounded-2xl overflow-hidden">
          <div className="p-6 border-b border-border/50">
            <h2 className="text-xl font-semibold">All Shows</h2>
          </div>
          
          <div className="overflow-x-auto">
            <table_1.Table>
              <table_1.TableHeader>
                <table_1.TableRow className="border-border/50 hover:bg-transparent">
                  <table_1.TableHead>Show</table_1.TableHead>
                  <table_1.TableHead>Date & Time</table_1.TableHead>
                  <table_1.TableHead>Seats</table_1.TableHead>
                  <table_1.TableHead className="text-right">Actions</table_1.TableHead>
                </table_1.TableRow>
              </table_1.TableHeader>
              <table_1.TableBody>
                {shows.map(function (show) {
            var showDate = new Date(show.startTime);
            return (<table_1.TableRow key={show.id} className="border-border/50">
                      <table_1.TableCell>
                        <div className="flex items-center gap-3">
                          <div>
                            <p className="font-medium">{show.name}</p>
                            <p className="text-sm text-muted-foreground">{show.duration}</p>
                          </div>
                        </div>
                      </table_1.TableCell>
                      <table_1.TableCell>
                        <div className="space-y-1">
                          <div className="flex items-center gap-1 text-sm">
                            <lucide_react_1.Calendar className="w-4 h-4 text-primary"/>
                            {showDate.toLocaleDateString()}
                          </div>
                          <div className="flex items-center gap-1 text-sm text-muted-foreground">
                            <lucide_react_1.Clock className="w-4 h-4"/>
                            {showDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                          </div>
                        </div>
                      </table_1.TableCell>
                      <table_1.TableCell>
                        <div className="space-y-1">
                          <p className="font-medium">{show.availableSeats} / {show.totalSeats}</p>
                          <div className="w-20 h-1.5 bg-muted rounded-full overflow-hidden">
                            <div className="h-full bg-primary rounded-full" style={{ width: "".concat((show.availableSeats / show.totalSeats) * 100, "%") }}/>
                          </div>
                        </div>
                      </table_1.TableCell>
                      <table_1.TableCell className="text-right">
                        <div className="flex items-center justify-end gap-2">
                          <button_1.Button variant="ghost" size="icon" className="hover:bg-destructive/20 text-destructive" onClick={function () { return handleDelete(show.id, show.name); }}>
                            <lucide_react_1.Trash2 className="w-4 h-4"/>
                          </button_1.Button>
                        </div>
                      </table_1.TableCell>
                    </table_1.TableRow>);
        })}
              </table_1.TableBody>
            </table_1.Table>
          </div>
        </div>
      </div>
    </div>);
}
