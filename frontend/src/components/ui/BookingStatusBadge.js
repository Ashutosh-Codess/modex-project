"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookingStatusBadge = BookingStatusBadge;
var react_1 = require("react");
var lucide_react_1 = require("lucide-react");
var utils_1 = require("@/lib/utils");
function BookingStatusBadge(_a) {
    var status = _a.status, className = _a.className;
    var config = {
        PENDING: {
            icon: lucide_react_1.Clock,
            label: 'Pending',
            className: 'bg-yellow-500/20 text-yellow-500 border-yellow-500/30',
        },
        CONFIRMED: {
            icon: lucide_react_1.CheckCircle,
            label: 'Confirmed',
            className: 'bg-green-500/20 text-green-500 border-green-500/30',
        },
        FAILED: {
            icon: lucide_react_1.XCircle,
            label: 'Failed',
            className: 'bg-destructive/20 text-destructive border-destructive/30',
        },
    };
    var _b = config[status], Icon = _b.icon, label = _b.label, statusClassName = _b.className;
    return (<div className={(0, utils_1.cn)('inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border text-sm font-medium', statusClassName, className)}>
      <Icon className="w-4 h-4"/>
      <span>{label}</span>
    </div>);
}
