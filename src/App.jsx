import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import LoginPage from "./components/LoginPage";
import { useState } from "react";

const queryClient = new QueryClient();

// Optional: in-memory auth state (resets on refresh)
let isLoggedIn = false;

// ProtectedRoute component
const ProtectedRoute = ({ children }) => {
  return isLoggedIn ? children : <Navigate to="/login" replace />;
};

const App = () => {
  const [, forceUpdate] = useState(0); // force re-render when login state changes

  // Helper to set login state (used in LoginPage)
  const handleLoginSuccess = () => {
    isLoggedIn = true;
    forceUpdate((n) => n + 1); // re-render app
  };

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            {/* Login page */}
            <Route
              path="/login"
              element={<LoginPage onLoginSuccess={handleLoginSuccess} />}
            />

            {/* Dashboard (protected) */}
            <Route
              path="/index"
              element={
                <ProtectedRoute>
                  <Index />
                </ProtectedRoute>
              }
            />

            {/* Redirect root "/" to login */}
            <Route path="/" element={<Navigate to="/login" replace />} />

            {/* Catch-all */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
