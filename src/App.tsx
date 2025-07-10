// src/App.tsx
import React from 'react';
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navigation from "./components/Navigation";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import DietNutritionPage from "./pages/DietNutrition";
import ExerciseTrackerPage from "./pages/ExerciseTracker";
import LeaderboardsPage from "./pages/Leaderboards";
import DiscoverGym from "./pages/DiscoverGym";
import GymDetails from "./pages/GymDetails";
import About from "./pages/About";
import NotFound from "./pages/NotFound";
import Login from "./pages/Login";
import Register from "./pages/Register";
import  Footer  from './components/Footer';

// Redux imports
import { Provider } from 'react-redux';
import store from './redux/store'; // Import your Redux store

const queryClient = new QueryClient();

const App = () => (
  // Wrap your entire application with the Redux Provider
  <Provider store={store}>
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
            <Route path="/diet-nutrition" element={<DietNutritionPage />} />
            <Route path="/exercise-tracker" element={<ExerciseTrackerPage />} />
            <Route path="/leaderboards" element={<LeaderboardsPage />} />
            <Route path="/about" element={<About />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
          <Footer />
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  </Provider>
);

export default App;
