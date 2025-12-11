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
exports.default = ForgotPassword;
var react_1 = require("react");
var react_router_dom_1 = require("react-router-dom");
var lucide_react_1 = require("lucide-react");
var button_1 = require("@/components/ui/button");
var input_1 = require("@/components/ui/input");
var label_1 = require("@/components/ui/label");
var AuthContext_1 = require("@/contexts/AuthContext");
var use_toast_1 = require("@/hooks/use-toast");
function ForgotPassword() {
    var _this = this;
    var _a = (0, react_1.useState)(''), email = _a[0], setEmail = _a[1];
    var _b = (0, react_1.useState)(''), error = _b[0], setError = _b[1];
    var _c = (0, react_1.useState)(false), isSubmitted = _c[0], setIsSubmitted = _c[1];
    var _d = (0, AuthContext_1.useAuth)(), resetPassword = _d.resetPassword, isLoading = _d.isLoading;
    var toast = (0, use_toast_1.useToast)().toast;
    var validate = function () {
        if (!email) {
            setError('Email is required');
            return false;
        }
        if (!/\S+@\S+\.\S+/.test(email)) {
            setError('Please enter a valid email');
            return false;
        }
        setError('');
        return true;
    };
    var handleSubmit = function (e) { return __awaiter(_this, void 0, void 0, function () {
        var error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    e.preventDefault();
                    if (!validate())
                        return [2 /*return*/];
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, resetPassword(email)];
                case 2:
                    _a.sent();
                    setIsSubmitted(true);
                    toast({
                        title: 'Reset link sent!',
                        description: 'Check your email for password reset instructions.',
                    });
                    return [3 /*break*/, 4];
                case 3:
                    error_1 = _a.sent();
                    toast({
                        title: 'Error',
                        description: error_1 instanceof Error ? error_1.message : 'Something went wrong',
                        variant: 'destructive',
                    });
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    }); };
    if (isSubmitted) {
        return (<div className="min-h-screen flex items-center justify-center px-4 pt-20">
        <div className="w-full max-w-md">
          <div className="glass rounded-3xl p-8 space-y-6 text-center">
            <div className="w-16 h-16 rounded-full bg-green-500/20 flex items-center justify-center mx-auto">
              <lucide_react_1.CheckCircle className="w-8 h-8 text-green-500"/>
            </div>
            
            <div className="space-y-2">
              <h1 className="text-2xl font-bold text-foreground">Check your email</h1>
              <p className="text-muted-foreground">
                We've sent a password reset link to <span className="text-primary">{email}</span>
              </p>
            </div>
            <div className="space-y-4">
              <p className="text-sm text-muted-foreground">
                Didn't receive the email? Check your spam folder or try again.
              </p>
              
              <button_1.Button variant="outline" className="w-full" onClick={function () { return setIsSubmitted(false); }}>
                Try another email
              </button_1.Button>
              
              <react_router_dom_1.Link to="/login" className="block">
                <button_1.Button variant="ghost" className="w-full">
                  <lucide_react_1.ArrowLeft className="w-4 h-4 mr-2"/>
                  Back to login
                </button_1.Button>
              </react_router_dom_1.Link>
            </div>
          </div>
        </div>
      </div>);
    }
    return (<div className="min-h-screen flex items-center justify-center px-4 pt-20">
      <div className="w-full max-w-md">
        <div className="glass rounded-3xl p-8 space-y-6">
          <div className="text-center space-y-2">
            <h1 className="text-3xl font-bold text-gradient">Forgot Password?</h1>
            <p className="text-muted-foreground">
              No worries, we'll send you reset instructions.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-2">
              <label_1.Label htmlFor="email">Email</label_1.Label>
              <div className="relative">
                <lucide_react_1.Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground"/>
                <input_1.Input id="email" type="email" placeholder="Enter your email" value={email} onChange={function (e) { return setEmail(e.target.value); }} className={"pl-10 bg-muted/50 border-border/50 focus:border-primary ".concat(error ? 'border-destructive' : '')}/>
              </div>
              {error && (<p className="text-sm text-destructive">{error}</p>)}
            </div>
            <button_1.Button type="submit" className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-medium h-12" disabled={isLoading}>
              {isLoading ? (<>
                  <lucide_react_1.Loader2 className="w-5 h-5 mr-2 animate-spin"/>
                  Sending...
                </>) : ('Send Reset Link')}
            </button_1.Button>
          </form>

          <react_router_dom_1.Link to="/login" className="flex items-center justify-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors">
            <lucide_react_1.ArrowLeft className="w-4 h-4"/>
            Back to login
          </react_router_dom_1.Link>
        </div>
      </div>
    </div>);
}
