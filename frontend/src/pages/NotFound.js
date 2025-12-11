"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = NotFound;
var react_router_dom_1 = require("react-router-dom");
var lucide_react_1 = require("lucide-react");
var button_1 = require("@/components/ui/button");
function NotFound() {
    return (<div className="min-h-screen flex items-center justify-center px-4">
      <div className="text-center space-y-6">
        <div className="space-y-2">
          <h1 className="text-8xl font-bold text-gradient">404</h1>
          <p className="text-2xl font-semibold text-foreground">Page Not Found</p>
          <p className="text-muted-foreground max-w-md mx-auto">
            The page you're looking for doesn't exist or has been moved.
          </p>
        </div>
        
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <button_1.Button variant="outline" onClick={function () { return window.history.back(); }}>
            <lucide_react_1.ArrowLeft className="w-4 h-4 mr-2"/>
            Go Back
          </button_1.Button>
          <react_router_dom_1.Link to="/">
            <button_1.Button className="bg-primary hover:bg-primary/90 text-primary-foreground">
              <lucide_react_1.Home className="w-4 h-4 mr-2"/>
              Back to Home
            </button_1.Button>
          </react_router_dom_1.Link>
        </div>
      </div>
    </div>);
}
