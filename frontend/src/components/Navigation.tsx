// src/components/Navigation.tsx
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Card, CardContent } from "@/components/ui/card";
import { Dumbbell, Home, User, Menu, X, MapPin, ChevronDown, Smartphone, ShoppingCart, Users as UsersIcon, FileText, Calendar } from "lucide-react";
import { useState, useEffect } from "react";
import OptimizedImage from "@/components/OptimizedImage";

const Navigation = () => {
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [userLocation, setUserLocation] = useState<{lat: number, lng: number} | null>(null);
  const [locationPermission, setLocationPermission] = useState<boolean | null>(null);

  

  // Close mobile menu and dropdowns when location changes
  useEffect(() => {
    setIsMobileMenuOpen(false);
    setOpenDropdown(null);
  }, [location.pathname]);

  // Check for existing location in cookies on component mount
  useEffect(() => {
    const savedLocation = getCookie('userLocation');
    if (savedLocation) {
      try {
        const location = JSON.parse(savedLocation);
        setUserLocation(location);
        setLocationPermission(true);
      } catch (error) {
        console.error('Error parsing saved location:', error);
      }
    }
  }, []);

  // Cookie utility functions
  const setCookie = (name: string, value: string, days: number = 30) => {
    const expires = new Date();
    expires.setTime(expires.getTime() + (days * 24 * 60 * 60 * 1000));
    document.cookie = `${name}=${value};expires=${expires.toUTCString()};path=/`;
  };

  const getCookie = (name: string): string | null => {
    const nameEQ = name + "=";
    const ca = document.cookie.split(';');
    for (let i = 0; i < ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) === ' ') c = c.substring(1, c.length);
      if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
    }
    return null;
  };

  // Get user's current location
  const getCurrentLocation = () => {
    if (!navigator.geolocation) {
      alert('Geolocation is not supported by this browser.');
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const location = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        };
        setUserLocation(location);
        setLocationPermission(true);
        setCookie('userLocation', JSON.stringify(location));
      },
      (error) => {
        console.error('Error getting location:', error);
        setLocationPermission(false);
        alert('Unable to get your location. Please enable location access for better experience.');
      }
    );
  };

  // Request location permission
  const requestLocationPermission = () => {
    getCurrentLocation();
  };

  const toggleDropdown = (path: string) => {
    setOpenDropdown(openDropdown === path ? null : path);
  };

  const handleMobileNavClick = (path: string) => {
    setOpenDropdown(null); // Close dropdown when a sub-item is clicked
    setIsMobileMenuOpen(false); // Close mobile menu
  };

  // Enhanced navigation items with dropdowns
  const navItems = [
    { path: "/", label: "Home", icon: Home },
    { 
      path: "/discover-gym", 
      label: "Gyms", 
      icon: Dumbbell,
      subItems: [
        { path: "/discover-gym", label: "All Gyms", description: "Browse all fitness locations" },
        { path: "/gym/1", label: "Electronic City", description: "Premium gym in EC Phase 1" },
        { path: "/gym/2", label: "Marathahalli", description: "Best gym in Marathahalli" },
        { path: "/gym/3", label: "Brookefield", description: "Premium fitness center" }
      ]
    },
    { 
      path: "/wellness-clubs", 
      label: "Wellness Clubs", 
      icon: Dumbbell,
      subItems: [
        { path: "/wellness-clubs", label: "About Wellness Clubs", description: "DNA-based personalized wellness" },
        { path: "/discover-clubs", label: "Browse Clubs", description: "Find wellness clubs near you" },
        { path: "/wellness-club/4", label: "Sainikpuri (Coming Soon)", description: "Premium wellness club in Hyderabad" }
      ]
    },
    { 
      path: "https://blogs.fitflix.in", 
      label: "Blog", 
      icon: FileText,
      subItems: [
        { path: "https://blogs.fitflix.in", label: "All Articles", description: "Fitness tips and guides" },
        { path: "https://blogs.fitflix.in/blogs/nutrition-basics-for-athletes", label: "Nutrition Basics", description: "Essential nutrition for athletes" },
        { path: "https://blogs.fitflix.in/blogs/best-gym-workouts-beginners", label: "Beginner Workouts", description: "Complete guide for fitness newcomers" },
        { path: "https://blogs.fitflix.in/blogs/premium-fitness-centers", label: "Premium Gyms", description: "Top fitness centers in your area" }
      ]
    },
    { 
      path: "/events", 
      label: "Events", 
      icon: Calendar,
      subItems: [
        { path: "/events", label: "All Events", description: "Upcoming fitness events" },
        { path: "/events/workshops", label: "Workshops", description: "Fitness and nutrition workshops" },
        { path: "/events/competitions", label: "Competitions", description: "Fitness challenges and contests" },
        { path: "/events/community", label: "Community Events", description: "Group activities and meetups" }
      ]
    },
    { 
      path: "/about", 
      label: "About Us", 
      icon: User,
      subItems: [
        { path: "/about", label: "Our Story", description: "Learn about Fitflix" },
        { path: "/services", label: "Services", description: "Fitness centers, apps, nutrition" },
        { path: "/about#community", label: "Community", description: "Join Fitflix Fam" }
      ]
    },
    { 
      path: "/services", 
      label: "Services", 
      icon: Dumbbell,
      subItems: [
        { path: "/discover-gym", label: "Premium Gyms", description: "State-of-the-art facilities", icon: Dumbbell },
        { path: "/wellness-clubs", label: "Wellness Clubs", description: "DNA-based personalized wellness", icon: Dumbbell },
        { path: "/services#workout-app", label: "Workout App", description: "1000+ minutes of training", icon: Smartphone },
        { path: "/services#nutrition", label: "Nutrition Products", description: "Premium supplements", icon: ShoppingCart },
        { path: "/services#fitness-classes", label: "Fitness Classes", description: "Group & dance classes", icon: UsersIcon },
        { path: "/corporate-wellness", label: "Corporate Wellness", description: "Workplace programs & partnerships", icon: UsersIcon }
      ]
    }
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center group">
            <div className="relative">
              <OptimizedImage 
                src="/media/fitflix-icon.png" 
                alt="Fitflix Logo" 
                className="h-12 w-12 md:h-16 md:w-16 object-contain group-hover:scale-105 transition-transform duration-200"
                width={64}
                height={64}
                priority={true}
              />
              <div className="absolute inset-0 bg-primary/10 rounded-full blur-md group-hover:bg-primary/20 transition-colors" />
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-4 xl:space-x-8">
            {navItems.map((item) => {
              const Icon = item.icon;
              if (item.subItems) {
                return (
                  <div key={item.path} className="relative group">
                    <Link
                      to={item.path}
                      className={`flex items-center space-x-2 px-3 py-2 rounded-full transition-all duration-300 text-sm ${
                        isActive(item.path)
                          ? "bg-primary text-primary-foreground shadow-primary"
                          : "text-muted-foreground hover:text-foreground hover:bg-muted"
                      }`}
                    >
                      <Icon className="h-4 w-4" />
                      <span className="font-medium whitespace-nowrap">{item.label}</span>
                      <ChevronDown className="h-3 w-3 transition-transform group-hover:rotate-180" />
                    </Link>
                    
                    {/* Dropdown Menu */}
                    <div className="absolute top-full left-0 mt-2 w-64 bg-background border border-border rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50">
                      <div className="p-2 space-y-1">
                        {item.subItems.map((subItem) => {
                          const SubIcon = subItem.icon || Icon;
                          return (
                            <Link
                              key={subItem.path}
                              to={subItem.path}
                              className="flex items-start space-x-3 p-3 rounded-lg hover:bg-muted transition-colors"
                            >
                              <SubIcon className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                              <div>
                                <div className="font-medium text-sm">{subItem.label}</div>
                                <div className="text-xs text-muted-foreground">{subItem.description}</div>
                              </div>
                            </Link>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                );
              }
              
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center space-x-2 px-3 py-2 rounded-full transition-all duration-300 text-sm ${
                    isActive(item.path)
                      ? "bg-primary text-primary-foreground shadow-primary"
                      : "text-muted-foreground hover:text-foreground hover:bg-muted"
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  <span className="font-medium whitespace-nowrap">{item.label}</span>
                </Link>
              );
            })}
          </div>

          {/* Desktop Location Button */}
          <div className="hidden md:flex items-center space-x-2 lg:space-x-4">
            {userLocation ? (
              <Button variant="outline" className="flex items-center gap-2 rounded-full border-primary text-primary hover:bg-primary hover:text-primary-foreground text-sm px-3 py-2">
                <MapPin className="h-4 w-4" />
                Location Enabled
              </Button>
            ) : (
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="outline" className="flex items-center gap-2 rounded-full border-primary text-primary hover:bg-primary hover:text-primary-foreground text-sm px-3 py-2">
                    <MapPin className="h-4 w-4" />
                    Enable Location
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-md">
                  <DialogHeader className="bg-primary text-primary-foreground p-4 -m-6 mb-4 rounded-t-lg">
                    <DialogTitle className="flex items-center gap-2 text-white">
                      <MapPin className="h-5 w-5" />
                      Enable Location for Better Experience
                    </DialogTitle>
                  </DialogHeader>
                  
                  <div className="space-y-4">
                    <div className="text-center">
                      <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-4">
                        <MapPin className="h-8 w-8 text-primary" />
                      </div>
                      <h3 className="text-lg font-semibold mb-2">Find Gyms Near You</h3>
                      <p className="text-sm text-muted-foreground mb-4">
                        Allow location access to find the nearest gyms and get personalized recommendations based on your area.
                      </p>
                    </div>
                    
                    <div className="space-y-2">
                      <Button 
                        onClick={requestLocationPermission}
                        className="w-full"
                      >
                        <MapPin className="mr-2 h-4 w-4" />
                        Allow Location Access
                      </Button>
                      <Button 
                        variant="outline" 
                        className="w-full"
                        onClick={() => setLocationPermission(false)}
                      >
                        Maybe Later
                      </Button>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
            )}
          </div>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </Button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden absolute top-16 left-0 right-0 bg-background/95 backdrop-blur-md border-b border-border animate-fade-in">
            <div className="container mx-auto px-4 py-4 space-y-4 max-h-[calc(100vh-4rem)] overflow-y-auto">
              {navItems.map((item) => {
                const Icon = item.icon;
                if (item.subItems) {
                  return (
                    <div key={item.path} className="relative">
                      <button
                        onClick={() => toggleDropdown(item.path)}
                        className={`w-full flex items-center justify-between space-x-3 px-4 py-3 rounded-2xl transition-all duration-300 ${
                          isActive(item.path)
                            ? "bg-primary text-primary-foreground"
                            : "text-muted-foreground hover:text-foreground hover:bg-muted"
                        }`}
                      >
                        <div className="flex items-center space-x-3">
                          <Icon className="h-5 w-5" />
                          <span className="font-medium">{item.label}</span>
                        </div>
                        <ChevronDown className={`h-5 w-5 transition-transform duration-200 ${
                          openDropdown === item.path ? 'rotate-180' : ''
                        }`} />
                      </button>
                      
                      {/* Mobile Dropdown Menu */}
                      {openDropdown === item.path && (
                        <div className="mt-2 w-full bg-muted/50 border border-border rounded-lg shadow-lg">
                          <div className="p-2 space-y-1">
                            {item.subItems.map((subItem) => {
                              const SubIcon = subItem.icon || Icon;
                              return (
                                <Link
                                  key={subItem.path}
                                  to={subItem.path}
                                  className="flex items-start space-x-3 p-3 rounded-lg hover:bg-background transition-colors"
                                  onClick={() => handleMobileNavClick(subItem.path)}
                                >
                                  <SubIcon className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                                  <div>
                                    <div className="font-medium text-sm">{subItem.label}</div>
                                    <div className="text-xs text-muted-foreground">{subItem.description}</div>
                                  </div>
                                </Link>
                              );
                            })}
                          </div>
                        </div>
                      )}
                    </div>
                  );
                }
                
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`flex items-center space-x-3 px-4 py-3 rounded-2xl transition-all duration-300 ${
                      isActive(item.path)
                        ? "bg-primary text-primary-foreground"
                        : "text-muted-foreground hover:text-foreground hover:bg-muted"
                    }`}
                  >
                    <Icon className="h-5 w-5" />
                    <span className="font-medium">{item.label}</span>
                  </Link>
                );
              })}
              <div className="pt-4 space-y-3 border-t border-border">
                {userLocation ? (
                  <Button variant="outline" className="w-full flex items-center gap-2 rounded-full border-primary text-primary hover:bg-primary hover:text-primary-foreground">
                    <MapPin className="h-4 w-4" />
                    Location Enabled
                  </Button>
                ) : (
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button variant="outline" className="w-full flex items-center gap-2 rounded-full border-primary text-primary hover:bg-primary hover:text-primary-foreground">
                        <MapPin className="h-4 w-4" />
                        Enable Location
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-md mx-4">
                      <DialogHeader className="bg-primary text-primary-foreground p-4 -m-6 mb-4 rounded-t-lg">
                        <DialogTitle className="flex items-center gap-2 text-white">
                          <MapPin className="h-5 w-5" />
                          Enable Location for Better Experience
                        </DialogTitle>
                      </DialogHeader>
                      
                      <div className="space-y-4">
                        <div className="text-center">
                          <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-4">
                            <MapPin className="h-8 w-8 text-primary" />
                          </div>
                          <h3 className="text-lg font-semibold mb-2">Find Gyms Near You</h3>
                          <p className="text-sm text-muted-foreground mb-4">
                            Allow location access to find the nearest gyms and get personalized recommendations based on your area.
                          </p>
                        </div>
                        
                        <div className="space-y-2">
                          <Button 
                            onClick={requestLocationPermission}
                            className="w-full"
                          >
                            <MapPin className="mr-2 h-4 w-4" />
                            Allow Location Access
                          </Button>
                          <Button 
                            variant="outline" 
                            className="w-full"
                            onClick={() => setLocationPermission(false)}
                          >
                            Maybe Later
                          </Button>
                        </div>
                      </div>
                    </DialogContent>
                  </Dialog>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;