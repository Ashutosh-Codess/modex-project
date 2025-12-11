"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StatsCard = StatsCard;
var react_1 = require("react");
var utils_1 = require("@/lib/utils");
function StatsCard(_a) {
    var title = _a.title, value = _a.value, Icon = _a.icon, trend = _a.trend, className = _a.className;
    return (<div className={(0, utils_1.cn)('glass glass-hover rounded-2xl p-6', className)}>
      <div className="flex items-start justify-between">
        <div className="space-y-2">
          <p className="text-sm text-muted-foreground">{title}</p>
          <p className="text-3xl font-bold text-foreground">{value}</p>
          
          {trend && (<div className={(0, utils_1.cn)('flex items-center gap-1 text-sm', trend.isPositive ? 'text-green-500' : 'text-destructive')}>
              <span>{trend.isPositive ? '↑' : '↓'}</span>
              <span>{Math.abs(trend.value)}% from last week</span>
            </div>)}
        </div>
        
        <div className="w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center">
          <Icon className="w-6 h-6 text-primary"/>
        </div>
      </div>
    </div>);
}
