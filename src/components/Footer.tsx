import React from 'react';
import { Link } from "react-router-dom";
import { Dumbbell, MapPin, Phone, Mail, Instagram, Facebook, Twitter, Youtube } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-slate-900 py-16 px-4">
      <div className="container mx-auto">
        <div className="grid lg:grid-cols-5 gap-12">
          {/* Brand Section */}
          <div className="lg:col-span-2 space-y-6">
            <div className="flex items-center space-x-2">
              <Dumbbell className="h-8 w-8 text-primary" />
              <span className="text-2xl font-black text-white">Fitflix</span>
            </div>
            <p className="text-gray-300 leading-relaxed max-w-sm">
              Transform your fitness journey with premium gyms, expert trainers, and personalized workout plans. Your health, our priority.
            </p>
            <div className="flex space-x-4">
              <a href="https://www.instagram.com/fitflixofficial/?hl=en" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-primary transition-colors">
                <Instagram className="h-6 w-6" />
              </a>
              <a href="#" className="text-gray-300 hover:text-primary transition-colors">
                <Facebook className="h-6 w-6" />
              </a>
              <a href="#" className="text-gray-300 hover:text-primary transition-colors">
                <Twitter className="h-6 w-6" />
              </a>
              <a href="#" className="text-gray-300 hover:text-primary transition-colors">
                <Youtube className="h-6 w-6" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-6">
            <h3 className="text-primary font-semibold text-lg">Quick Links</h3>
            <ul className="space-y-3">
              <li>
                <Link to="/" className="text-gray-300 hover:text-white transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/discover-gym" className="text-gray-300 hover:text-white transition-colors">
                  Discover Gyms
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-gray-300 hover:text-white transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/services" className="text-gray-300 hover:text-white transition-colors">
                  Our Services
                </Link>
              </li>
              <li>
                <Link to="/about#community" className="text-gray-300 hover:text-white transition-colors">
                  Fitflix Fam
                </Link>
              </li>
            </ul>
          </div>

          {/* Gym Locations */}
          <div className="space-y-6">
            <h3 className="text-primary font-semibold text-lg">Gym Locations</h3>
            <ul className="space-y-3">
              <li>
                <Link to="/discover-gym?location=electronic-city" className="text-gray-300 hover:text-white transition-colors">
                  Electronic City
                </Link>
              </li>
              <li>
                <Link to="/discover-gym?location=marathahalli" className="text-gray-300 hover:text-white transition-colors">
                  Marathahalli
                </Link>
              </li>
              <li>
                <Link to="/discover-gym?location=brookefield" className="text-gray-300 hover:text-white transition-colors">
                  Brookefield
                </Link>
              </li>
              <li>
                <Link to="/discover-gym" className="text-gray-300 hover:text-white transition-colors">
                  All Locations
                </Link>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div className="space-y-6">
            <h3 className="text-primary font-semibold text-lg">Services</h3>
            <ul className="space-y-3">
              <li>
                <Link to="/discover-gym" className="text-gray-300 hover:text-white transition-colors">
                  Premium Gyms
                </Link>
              </li>
              <li>
                <Link to="/services#workout-app" className="text-gray-300 hover:text-white transition-colors">
                  Workout App
                </Link>
              </li>
              <li>
                <Link to="/services#nutrition" className="text-gray-300 hover:text-white transition-colors">
                  Nutrition Products
                </Link>
              </li>
              <li>
                <Link to="/services#fitness-classes" className="text-gray-300 hover:text-white transition-colors">
                  Fitness Classes
                </Link>
              </li>
              <li>
                <Link to="/services#personal-training" className="text-gray-300 hover:text-white transition-colors">
                  Personal Training
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Us */}
          <div className="space-y-6">
            <h3 className="text-primary font-semibold text-lg">Contact Us</h3>
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <MapPin className="h-5 w-5 text-primary mt-1 flex-shrink-0" />
                <span className="text-gray-300 text-sm">Bangalore, Karnataka, India</span>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="h-5 w-5 text-primary flex-shrink-0" />
                <span className="text-gray-300 text-sm">+91 98765 43210</span>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="h-5 w-5 text-primary flex-shrink-0" />
                <span className="text-gray-300 text-sm">info@fitflix.in</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-700 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-gray-400 text-sm">
              © 2024 Fitflix. All rights reserved.
            </div>
            <div className="flex space-x-6 text-sm">
              <Link to="/privacy" className="text-gray-400 hover:text-white transition-colors">
                Privacy Policy
              </Link>
              <Link to="/terms" className="text-gray-400 hover:text-white transition-colors">
                Terms of Service
              </Link>
              <Link to="/sitemap" className="text-gray-400 hover:text-white transition-colors">
                Sitemap
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;