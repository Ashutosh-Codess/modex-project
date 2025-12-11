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
exports.default = Login;
var react_1 = require("react");
var react_router_dom_1 = require("react-router-dom");
var AuthContext_1 = require("../contexts/AuthContext");
var lucide_react_1 = require("lucide-react");
function Login() {
    var _this = this;
    var login = (0, AuthContext_1.useAuth)().login;
    var navigate = (0, react_router_dom_1.useNavigate)();
    var _a = (0, react_1.useState)(''), email = _a[0], setEmail = _a[1];
    var _b = (0, react_1.useState)(''), password = _b[0], setPassword = _b[1];
    var _c = (0, react_1.useState)(''), err = _c[0], setErr = _c[1];
    var _d = (0, react_1.useState)(''), msg = _d[0], setMsg = _d[1];
    var _e = (0, react_1.useState)(false), busy = _e[0], setBusy = _e[1];
    var _f = (0, react_1.useState)(''), emailError = _f[0], setEmailError = _f[1];
    var validateEmail = function (email) {
        var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!email) {
            setEmailError('Email is required');
            return false;
        }
        if (!emailRegex.test(email)) {
            setEmailError('Please enter a valid email address');
            return false;
        }
        setEmailError('');
        return true;
    };
    var submit = function (e) { return __awaiter(_this, void 0, void 0, function () {
        var e_1, errorMsg;
        var _a, _b;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    e.preventDefault();
                    setErr('');
                    setMsg('');
                    if (!validateEmail(email)) {
                        return [2 /*return*/];
                    }
                    if (!password) {
                        setErr('Password is required');
                        return [2 /*return*/];
                    }
                    setBusy(true);
                    _c.label = 1;
                case 1:
                    _c.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, login(email, password)];
                case 2:
                    _c.sent();
                    setMsg('Login successful! Redirecting...');
                    setTimeout(function () {
                        navigate('/');
                    }, 1500);
                    return [3 /*break*/, 4];
                case 3:
                    e_1 = _c.sent();
                    errorMsg = ((_b = (_a = e_1 === null || e_1 === void 0 ? void 0 : e_1.response) === null || _a === void 0 ? void 0 : _a.data) === null || _b === void 0 ? void 0 : _b.error) || 'Login failed. Please check your credentials.';
                    setErr(errorMsg);
                    return [3 /*break*/, 4];
                case 4:
                    setBusy(false);
                    return [2 /*return*/];
            }
        });
    }); };
    return (<div style={{
            minHeight: '100vh',
            backgroundImage: 'url(https://png.pngtree.com/background/20230426/original/pngtree-cinema-movie-theater-background-picture-image_2477892.jpg)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '2rem',
            paddingTop: '100px',
            position: 'relative'
        }}>
      {/* Dark overlay */}
      <div style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'rgba(0,0,0,0.7)',
            zIndex: 1
        }}/>
      
      <div style={{
            background: 'rgba(139, 0, 0, 0.95)',
            backdropFilter: 'blur(20px)',
            borderRadius: '24px',
            boxShadow: '0 20px 60px rgba(0,0,0,0.5)',
            maxWidth: '450px',
            width: '100%',
            padding: '3rem',
            position: 'relative',
            zIndex: 2,
            border: '2px solid rgba(255,255,255,0.1)'
        }}>
        {/* Logo */}
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <div style={{
            width: '70px',
            height: '70px',
            margin: '0 auto 1rem',
            borderRadius: '16px',
            background: 'linear-gradient(135deg, #8b0000, #dc143c)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 8px 24px rgba(139,0,0,0.5)'
        }}>
            <lucide_react_1.Film style={{ width: '36px', height: '36px', color: 'white' }}/>
          </div>
          <h1 style={{
            fontSize: '2rem',
            fontWeight: 'bold',
            marginBottom: '0.5rem',
            color: 'white'
        }}>
            Welcome Back
          </h1>
          <p style={{ color: 'rgba(255,255,255,0.8)', fontSize: '0.95rem' }}>
            Sign in to continue booking your favorite movies
          </p>
        </div>

        {/* Error Message */}
        {err && (<div style={{
                background: 'rgba(220, 53, 69, 0.2)',
                border: '1px solid #dc3545',
                borderRadius: '8px',
                padding: '0.75rem',
                marginBottom: '1rem',
                color: '#ff6b6b',
                fontSize: '0.9rem',
                display: 'flex',
                alignItems: 'center',
                gap: '8px'
            }}>
            <lucide_react_1.AlertCircle style={{ width: '18px', height: '18px', flexShrink: 0 }}/>
            <span>{err}</span>
          </div>)}

        {/* Success Message */}
        {msg && (<div style={{
                background: 'rgba(40, 167, 69, 0.2)',
                border: '1px solid #28a745',
                borderRadius: '8px',
                padding: '0.75rem',
                marginBottom: '1rem',
                color: '#51cf66',
                fontSize: '0.9rem',
                display: 'flex',
                alignItems: 'center',
                gap: '8px'
            }}>
            <lucide_react_1.CheckCircle style={{ width: '18px', height: '18px', flexShrink: 0 }}/>
            <span>{msg}</span>
          </div>)}

        {/* Form */}
        <form onSubmit={submit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          <div>
            <div style={{ position: 'relative' }}>
              <lucide_react_1.Mail style={{
            position: 'absolute',
            left: '16px',
            top: '50%',
            transform: 'translateY(-50%)',
            width: '20px',
            height: '20px',
            color: emailError ? '#ff6b6b' : '#999'
        }}/>
              <input type="email" placeholder="Email address" value={email} onChange={function (e) {
            setEmail(e.target.value);
            if (e.target.value)
                validateEmail(e.target.value);
        }} onBlur={function () { return validateEmail(email); }} style={{
            width: '100%',
            padding: '0.875rem 1rem 0.875rem 3rem',
            border: "2px solid ".concat(emailError ? '#dc3545' : '#444'),
            borderRadius: '12px',
            fontSize: '1rem',
            outline: 'none',
            transition: 'all 0.2s',
            background: 'rgba(255,255,255,0.1)',
            color: 'white',
            placeholder: 'rgba(255,255,255,0.5)'
        }} onFocus={function (e) {
            e.currentTarget.style.borderColor = emailError ? '#dc3545' : '#8b0000';
            e.currentTarget.style.boxShadow = '0 0 0 3px rgba(139,0,0,0.2)';
        }} onBlur={function (e) {
            e.currentTarget.style.borderColor = emailError ? '#dc3545' : '#444';
            e.currentTarget.style.boxShadow = 'none';
        }}/>
            </div>
            {emailError && (<p style={{ color: '#ff6b6b', fontSize: '0.875rem', marginTop: '0.5rem', marginLeft: '4px' }}>
                {emailError}
              </p>)}
          </div>

          <div style={{ position: 'relative' }}>
            <lucide_react_1.Lock style={{
            position: 'absolute',
            left: '16px',
            top: '50%',
            transform: 'translateY(-50%)',
            width: '20px',
            height: '20px',
            color: '#999'
        }}/>
            <input type="password" placeholder="Password" value={password} onChange={function (e) { return setPassword(e.target.value); }} style={{
            width: '100%',
            padding: '0.875rem 1rem 0.875rem 3rem',
            border: '2px solid #444',
            borderRadius: '12px',
            fontSize: '1rem',
            outline: 'none',
            transition: 'all 0.2s',
            background: 'rgba(255,255,255,0.1)',
            color: 'white'
        }} onFocus={function (e) {
            e.currentTarget.style.borderColor = '#8b0000';
            e.currentTarget.style.boxShadow = '0 0 0 3px rgba(139,0,0,0.2)';
        }} onBlur={function (e) {
            e.currentTarget.style.borderColor = '#444';
            e.currentTarget.style.boxShadow = 'none';
        }}/>
          </div>

          <button type="submit" disabled={busy || !!emailError} style={{
            width: '100%',
            padding: '1rem',
            background: busy || emailError ? '#555' : 'linear-gradient(135deg, #8b0000, #dc143c)',
            color: 'white',
            border: 'none',
            borderRadius: '12px',
            fontSize: '1.05rem',
            fontWeight: '600',
            cursor: busy || emailError ? 'not-allowed' : 'pointer',
            transition: 'all 0.3s',
            boxShadow: busy || emailError ? 'none' : '0 4px 12px rgba(139,0,0,0.4)',
            marginTop: '0.5rem'
        }} onMouseEnter={function (e) {
            if (!busy && !emailError) {
                e.currentTarget.style.transform = 'translateY(-2px)';
                e.currentTarget.style.boxShadow = '0 6px 16px rgba(139,0,0,0.5)';
            }
        }} onMouseLeave={function (e) {
            if (!busy && !emailError) {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 4px 12px rgba(139,0,0,0.4)';
            }
        }}>
            {busy ? 'Logging in...' : 'Sign In'}
          </button>
        </form>

        <div style={{
            textAlign: 'center',
            marginTop: '1.5rem',
            paddingTop: '1.5rem',
            borderTop: '1px solid rgba(255,255,255,0.1)'
        }}>
          <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '0.9rem', marginBottom: '0.5rem' }}>
            Don't have an account?
          </p>
          <a href="/signup" style={{
            color: '#ff6b6b',
            textDecoration: 'none',
            fontWeight: '600',
            fontSize: '0.95rem'
        }} onMouseEnter={function (e) {
            e.currentTarget.style.textDecoration = 'underline';
        }} onMouseLeave={function (e) {
            e.currentTarget.style.textDecoration = 'none';
        }}>
            Create an account ?
          </a>
        </div>
      </div>
    </div>);
}
