// src/App.tsx
import React from 'react';
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navigation from "./components/Navigation";
import Home from "./pages/Home";
import DiscoverGym from "./pages/DiscoverGym";
import GymDetails from "./pages/GymDetails";
import About from "./pages/About";
import Services from "./pages/Services";
import Sitemap from "./components/Sitemap";
import NotFound from "./pages/NotFound";
import  Footer  from './components/Footer';
import PerformanceDashboard from './components/PerformanceDashboard';

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Navigation />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/discover-gym" element={<DiscoverGym />} />
          <Route path="/gym/:id" element={<GymDetails />} />
          <Route path="/about" element={<About />} />
          <Route path="/services" element={<Services />} />
          <Route path="/sitemap" element={<Sitemap />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
        <Footer />
        <PerformanceDashboard />
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
