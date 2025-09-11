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
import DiscoverGym from "./pages/DiscoverGym";
import GymDetails from "./pages/GymDetails";
import About from "./pages/About";
import Services from "./pages/Services";
// Blogs are now handled by the dedicated blog subdomain at blogs.fitflix.in
import BlogRedirect from "./pages/BlogRedirect";
import NotFound from "./pages/NotFound";
import CorporateWellness from "./pages/CorporateWellness";
import  Footer  from './components/Footer';
import { useScrollRestoration } from './hooks/useScrollRestoration';
import { ScrollToTopButton } from './components/ScrollToTopButton';

const queryClient = new QueryClient();

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
        <Route path="/about" element={<About />} />
        <Route path="/services" element={<Services />} />
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
