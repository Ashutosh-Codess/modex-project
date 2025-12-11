"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProtectedRoute = ProtectedRoute;
var react_1 = require("react");
var react_router_dom_1 = require("react-router-dom");
var AuthContext_1 = require("@/contexts/AuthContext");
var lucide_react_1 = require("lucide-react");
function ProtectedRoute(_a) {
    var children = _a.children, requiredRole = _a.requiredRole;
    var _b = (0, AuthContext_1.useAuth)(), user = _b.user, loading = _b.isLoading;
    var location = (0, react_router_dom_1.useLocation)();
    if (loading) {
        return (<div className="min-h-screen flex items-center justify-center">
        <lucide_react_1.Loader2 className="w-8 h-8 animate-spin text-primary"/>
      </div>);
    }
    if (!user) {
        return <react_router_dom_1.Navigate to="/login" state={{ from: location }} replace/>;
    }
    return <>{children}</>;
}
exports.default = ProtectedRoute;
