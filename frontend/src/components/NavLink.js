"use strict";
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.NavLink = void 0;
var react_router_dom_1 = require("react-router-dom");
var react_1 = require("react");
var utils_1 = require("@/lib/utils");
var NavLink = (0, react_1.forwardRef)(function (_a, ref) {
    var className = _a.className, activeClassName = _a.activeClassName, pendingClassName = _a.pendingClassName, to = _a.to, props = __rest(_a, ["className", "activeClassName", "pendingClassName", "to"]);
    return (<react_router_dom_1.NavLink ref={ref} to={to} className={function (_a) {
            var isActive = _a.isActive, isPending = _a.isPending;
            return (0, utils_1.cn)(className, isActive && activeClassName, isPending && pendingClassName);
        }} {...props}/>);
});
exports.NavLink = NavLink;
NavLink.displayName = "NavLink";
