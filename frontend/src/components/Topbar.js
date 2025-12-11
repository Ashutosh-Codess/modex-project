"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Topbar = Topbar;
var react_1 = require("react");
var react_router_dom_1 = require("react-router-dom");
var lucide_react_1 = require("lucide-react");
var AuthContext_1 = require("@/contexts/AuthContext");
function Topbar() {
    var _a = (0, AuthContext_1.useAuth)(), user = _a.user, isAuthenticated = _a.isAuthenticated, logout = _a.logout;
    var location = (0, react_router_dom_1.useLocation)();
    var _b = react_1.default.useState('Mumbai'), selectedCity = _b[0], setSelectedCity = _b[1];
    var cities = ['Mumbai', 'Delhi', 'Bangalore', 'Chennai', 'Hyderabad', 'Pune', 'Kolkata'];
    var navLinks = [
        { path: '/', label: 'Shows', icon: lucide_react_1.Film },
        { path: '/my-bookings', label: 'My Bookings', icon: lucide_react_1.Ticket },
    ];
    // Update location in parent component if needed
    react_1.default.useEffect(function () {
        // Location is managed locally in Topbar
    }, [selectedCity]);
    return (<header style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            zIndex: 1000,
            background: 'linear-gradient(135deg, #e60023 0%, #ff5f6d 100%)',
            borderBottom: 'none',
            padding: '0',
            height: '70px',
            boxShadow: '0 4px 12px rgba(0,0,0,0.15)'
        }}>
      <div style={{
            maxWidth: '1280px',
            margin: '0 auto',
            padding: '0 1.5rem',
            height: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between'
        }}>
        {/* Logo */}
        <react_router_dom_1.Link to="/" style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            textDecoration: 'none',
            color: 'white'
        }}>
          <div style={{
            width: '45px',
            height: '45px',
            borderRadius: '12px',
            background: 'rgba(255,255,255,0.2)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backdropFilter: 'blur(10px)'
        }}>
            <lucide_react_1.Film style={{ width: '24px', height: '24px', color: 'white' }}/>
          </div>
          <span style={{
            fontSize: '1.5rem',
            fontWeight: 'bold',
            color: 'white',
            letterSpacing: '-0.5px'
        }}>
            CineBook
          </span>
        </react_router_dom_1.Link>

        {/* Location Selector */}
        <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            background: 'rgba(255,255,255,0.15)',
            padding: '0.5rem 1rem',
            borderRadius: '8px',
            backdropFilter: 'blur(10px)',
            cursor: 'pointer'
        }}>
          <lucide_react_1.MapPin style={{ width: '18px', height: '18px', color: 'white' }}/>
          <select value={selectedCity} onChange={function (e) { return setSelectedCity(e.target.value); }} style={{
            background: 'transparent',
            border: 'none',
            color: 'white',
            fontSize: '0.95rem',
            fontWeight: '600',
            cursor: 'pointer',
            outline: 'none'
        }}>
            {cities.map(function (city) { return (<option key={city} value={city} style={{ background: '#e60023', color: 'white' }}>
                {city}
              </option>); })}
          </select>
        </div>

        {/* Navigation Links */}
        <nav style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          {navLinks.map(function (link) { return (<react_router_dom_1.Link key={link.path} to={link.path} style={{
                padding: '0.5rem 1rem',
                borderRadius: '8px',
                fontSize: '0.95rem',
                fontWeight: '500',
                textDecoration: 'none',
                color: location.pathname === link.path ? 'white' : 'rgba(255,255,255,0.9)',
                background: location.pathname === link.path ? 'rgba(255,255,255,0.2)' : 'transparent',
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                transition: 'all 0.2s'
            }} onMouseEnter={function (e) {
                if (location.pathname !== link.path) {
                    e.currentTarget.style.background = 'rgba(255,255,255,0.1)';
                }
            }} onMouseLeave={function (e) {
                if (location.pathname !== link.path) {
                    e.currentTarget.style.background = 'transparent';
                }
            }}>
              <link.icon style={{ width: '18px', height: '18px' }}/>
              {link.label}
            </react_router_dom_1.Link>); })}
          {(user === null || user === void 0 ? void 0 : user.role) === 'admin' && (<react_router_dom_1.Link to="/admin" style={{
                padding: '0.5rem 1rem',
                borderRadius: '8px',
                fontSize: '0.95rem',
                fontWeight: '500',
                textDecoration: 'none',
                color: location.pathname === '/admin' ? 'white' : 'rgba(255,255,255,0.9)',
                background: location.pathname === '/admin' ? 'rgba(255,255,255,0.2)' : 'transparent',
                display: 'flex',
                alignItems: 'center',
                gap: '6px'
            }}>
              <lucide_react_1.Settings style={{ width: '18px', height: '18px' }}/>
              Admin
            </react_router_dom_1.Link>)}
        </nav>

        {/* User Actions */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          {isAuthenticated ? (<div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                background: 'rgba(255,255,255,0.15)',
                padding: '0.5rem 1rem',
                borderRadius: '8px',
                color: 'white',
                fontSize: '0.9rem',
                fontWeight: '500'
            }}>
                <lucide_react_1.User style={{ width: '18px', height: '18px' }}/>
                <span>{user === null || user === void 0 ? void 0 : user.name}</span>
              </div>
              <button onClick={logout} style={{
                background: 'rgba(255,255,255,0.2)',
                color: 'white',
                border: 'none',
                padding: '0.5rem 1rem',
                borderRadius: '8px',
                fontSize: '0.9rem',
                fontWeight: '500',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                transition: 'all 0.2s'
            }} onMouseEnter={function (e) {
                e.currentTarget.style.background = 'rgba(255,255,255,0.3)';
            }} onMouseLeave={function (e) {
                e.currentTarget.style.background = 'rgba(255,255,255,0.2)';
            }}>
                <lucide_react_1.LogOut style={{ width: '18px', height: '18px' }}/>
                Logout
              </button>
            </div>) : (<div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <react_router_dom_1.Link to="/login" style={{ textDecoration: 'none' }}>
                <button style={{
                background: 'transparent',
                color: 'white',
                border: '1px solid rgba(255,255,255,0.5)',
                padding: '0.5rem 1.25rem',
                borderRadius: '8px',
                fontSize: '0.95rem',
                fontWeight: '600',
                cursor: 'pointer',
                transition: 'all 0.2s'
            }} onMouseEnter={function (e) {
                e.currentTarget.style.background = 'rgba(255,255,255,0.1)';
                e.currentTarget.style.borderColor = 'white';
            }} onMouseLeave={function (e) {
                e.currentTarget.style.background = 'transparent';
                e.currentTarget.style.borderColor = 'rgba(255,255,255,0.5)';
            }}>
                  Login
                </button>
              </react_router_dom_1.Link>
              <react_router_dom_1.Link to="/signup" style={{ textDecoration: 'none' }}>
                <button style={{
                background: 'white',
                color: '#e60023',
                border: 'none',
                padding: '0.5rem 1.25rem',
                borderRadius: '8px',
                fontSize: '0.95rem',
                fontWeight: '600',
                cursor: 'pointer',
                transition: 'all 0.2s',
                boxShadow: '0 2px 8px rgba(0,0,0,0.15)'
            }} onMouseEnter={function (e) {
                e.currentTarget.style.background = '#f5f5f5';
                e.currentTarget.style.transform = 'translateY(-1px)';
                e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.2)';
            }} onMouseLeave={function (e) {
                e.currentTarget.style.background = 'white';
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 2px 8px rgba(0,0,0,0.15)';
            }}>
                  Sign Up
                </button>
              </react_router_dom_1.Link>
            </div>)}
        </div>
      </div>
    </header>);
}
