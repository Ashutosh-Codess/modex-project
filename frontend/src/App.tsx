import { Toaster } from "@/components/ui/toaster";
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
import MyBookings from "@/pages/MyBookings";
import NotFound from "@/pages/NotFound";

const App = () => {
  return (
    <TooltipProvider>
      <AuthProvider>
        <BookingProvider>
          <Toaster />
          <div style={{ position: 'relative', minHeight: '100vh' }}>
            <ParticlesBG />
            <Topbar />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/forgot-password" element={<ForgotPassword />} />
              <Route path="/booking/:id" element={<Booking />} />
              <Route path="/my-bookings" element={<MyBookings />} />
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
};

export default App;
