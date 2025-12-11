import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import { BookingProvider } from "@/contexts/BookingContext";
import { ParticlesBG } from "@/components/ParticlesBG";
import { Topbar } from "@/components/Topbar";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import Home from "@/pages/Home";
import Login from "@/pages/Login";
import Signup from "@/pages/Signup";
import ForgotPassword from "@/pages/ForgotPassword";
import Admin from "@/pages/Admin";
import Booking from "@/pages/Booking";
import NotFound from "@/pages/NotFound";

const App = () => (
  <TooltipProvider>
    <AuthProvider>
      <BookingProvider>
        <Toaster />
        <Sonner />
        <div className="relative min-h-screen bg-background text-foreground">
          <ParticlesBG />
          <Topbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/booking/:id" element={<Booking />} />
            <Route 
              path="/admin" 
              element={
                <ProtectedRoute>
                  <Admin />
                </ProtectedRoute>
              } 
            />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      </BookingProvider>
    </AuthProvider>
  </TooltipProvider>
);

export default App;
