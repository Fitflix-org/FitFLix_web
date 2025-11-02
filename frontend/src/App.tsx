// src/App.tsx
import React from 'react';
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HelmetProvider } from 'react-helmet-async';
import Navigation from "./components/Navigation";
import SubdomainRedirect from "./components/SubdomainRedirect";
import Home from "./pages/Home";
import Gyms from "./pages/Gyms";
import DiscoverGym from "./pages/DiscoverGym";
import GymDetails from "./pages/GymDetails";
import WellnessClubs from "./pages/WellnessClubs";
import DiscoverClubs from "./pages/DiscoverClubs";
import About from "./pages/About";
import Services from "./pages/Services";
import Events from "./pages/Events";
import EventDetail from "./pages/EventDetail";
// Blogs are now handled by the dedicated blog subdomain at blogs.fitflix.in
import BlogRedirect from "./pages/BlogRedirect";
import NotFound from "./pages/NotFound";
import CorporateWellness from "./pages/CorporateWellness";
import  Footer  from './components/Footer';
import { useScrollRestoration } from './hooks/useScrollRestoration';
import { ScrollToTopButton } from './components/ScrollToTopButton';

// Configure React Query for optimal hybrid caching
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // Cache data for 5 minutes by default
      staleTime: 5 * 60 * 1000,
      // Keep data in cache for 10 minutes
      gcTime: 10 * 60 * 1000,
      // Retry failed requests up to 3 times
      retry: 3,
      retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
      // Don't refetch on window focus for better UX
      refetchOnWindowFocus: false,
      // Don't refetch on mount if data is fresh
      refetchOnMount: false,
      // Enable background refetching
      refetchInterval: false, // Individual queries will set their own intervals
    },
    mutations: {
      // Retry mutations once on failure
      retry: 1,
    },
  },
});

const AppContent = () => {
  // Enable scroll restoration
  useScrollRestoration();

  return (
    <>
      <SubdomainRedirect />
      <Navigation />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/discover-gym" element={<DiscoverGym />} />
        <Route path="/gym/:id" element={<GymDetails />} />
        <Route path="/wellness-clubs" element={<WellnessClubs />} />
        <Route path="/discover-clubs" element={<DiscoverClubs />} />
        <Route path="/wellness-club/:id" element={<GymDetails />} />
        <Route path="/about" element={<About />} />
        <Route path="/services" element={<Services />} />
        <Route path="/events" element={<Events />} />
        <Route path="/events/:id" element={<EventDetail />} />
        <Route path="/corporate-wellness" element={<CorporateWellness />} />
        {/* Blog routes redirect to the dedicated blog subdomain at blogs.fitflix.in */}
        <Route path="/blogs" element={<BlogRedirect />} />
        <Route path="/blogs/:slug" element={<BlogRedirect />} />
        {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
      <ScrollToTopButton />
    </>
  );
};

const App = () => (
  <HelmetProvider>
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter
          future={{
            v7_startTransition: true,
            v7_relativeSplatPath: true
          }}
        >
          <AppContent />
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  </HelmetProvider>
);

export default App;
