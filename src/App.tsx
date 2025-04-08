
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useState, useEffect } from "react";
import Dashboard from "./pages/Dashboard";
import Services from "./pages/Services";
import EventPlanning from "./pages/EventPlanning";
import EventsHosted from "./pages/EventsHosted";
import Orders from "./pages/Orders";
import Content from "./pages/Content";
import Settings from "./pages/Settings";
import Login from "./pages/Login";
import Testimonials from "./pages/Testimonials";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(true);

  // For demo purposes, we'll always consider user as authenticated after mounting
  useEffect(() => {
    setIsAuthenticated(true);
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            {/* Public Routes */}
            <Route path="/login" element={<Login />} />
            
            {/* Protected Routes */}
            <Route path="/" element={isAuthenticated ? <Dashboard /> : <Navigate to="/login" />} />
            <Route path="/services" element={isAuthenticated ? <Services /> : <Navigate to="/login" />} />
            <Route path="/event-planning" element={isAuthenticated ? <EventPlanning /> : <Navigate to="/login" />} />
            <Route path="/events-hosted" element={isAuthenticated ? <EventsHosted /> : <Navigate to="/login" />} />
            <Route path="/orders" element={isAuthenticated ? <Orders /> : <Navigate to="/login" />} />
            <Route path="/content" element={isAuthenticated ? <Content /> : <Navigate to="/login" />} />
            <Route path="/settings" element={isAuthenticated ? <Settings /> : <Navigate to="/login" />} />
            <Route path="/testimonials" element={isAuthenticated ? <Testimonials /> : <Navigate to="/login" />} />
            
            {/* 404 Not Found */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
