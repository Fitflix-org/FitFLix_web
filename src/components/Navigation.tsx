// src/components/Navigation.tsx
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Card, CardContent } from "@/components/ui/card";
import { Dumbbell, Home, User, Menu, X, MapPin, ChevronDown, Smartphone, ShoppingCart, Users as UsersIcon } from "lucide-react";
import { useState } from "react";
import OptimizedImage from "@/components/OptimizedImage";

const Navigation = () => {
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [selectedCity, setSelectedCity] = useState("Select City");

  const cities = [
    { name: "Hyderabad", gyms: 45 },
    { name: "Bangalore", gyms: 37 }
  ];

  // Enhanced navigation items with dropdowns
  const navItems = [
    { path: "/", label: "Home", icon: Home },
    { 
      path: "/discover-gym", 
      label: "Discover Gym", 
      icon: Dumbbell,
      subItems: [
        { path: "/discover-gym", label: "All Gyms", description: "Browse all locations" },
        { path: "/gym/1", label: "Electronic City", description: "Premium gym in EC Phase 1" },
        { path: "/gym/2", label: "Marathahalli", description: "Best gym in Marathahalli" },
        { path: "/gym/3", label: "Brookefield", description: "Premium fitness center" }
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
        { path: "/services#workout-app", label: "Workout App", description: "1000+ minutes of training", icon: Smartphone },
        { path: "/services#nutrition", label: "Nutrition Products", description: "Premium supplements", icon: ShoppingCart },
        { path: "/services#fitness-classes", label: "Fitness Classes", description: "Group & dance classes", icon: UsersIcon }
      ]
    }
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 group">
            <div className="relative">
              <OptimizedImage 
                src="/fitflix-logo.png" 
                alt="Fitflix Logo" 
                className="h-8 w-8 md:h-10 md:w-10 object-contain group-hover:scale-105 transition-transform duration-200"
                width={40}
                height={40}
                priority={true}
              />
              <div className="absolute inset-0 bg-primary/10 rounded-full blur-md group-hover:bg-primary/20 transition-colors" />
            </div>
            <span className="text-xl md:text-2xl font-black text-transparent bg-gradient-to-r from-orange-600 via-red-600 to-pink-600 bg-clip-text group-hover:from-orange-500 group-hover:via-red-500 group-hover:to-pink-500 transition-all duration-300">
              Fitflix
            </span>
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

          {/* Desktop CTA */}
          <div className="hidden md:flex items-center space-x-2 lg:space-x-4">
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="outline" className="flex items-center gap-2 rounded-full border-primary text-primary hover:bg-primary hover:text-primary-foreground text-sm px-3 py-2">
                  <MapPin className="h-4 w-4" />
                  <span className="hidden lg:inline">{selectedCity}</span>
                  <ChevronDown className="h-4 w-4" />
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-md">
                <DialogHeader className="bg-primary text-primary-foreground p-4 -m-6 mb-4 rounded-t-lg">
                  <DialogTitle className="flex items-center gap-2 text-white">
                    <MapPin className="h-5 w-5" />
                    Select Your City
                  </DialogTitle>
                </DialogHeader>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {cities.map((city) => (
                    <Card
                      key={city.name}
                      className="cursor-pointer hover:shadow-md transition-shadow"
                      onClick={() => setSelectedCity(city.name)}
                    >
                      <CardContent className="p-4 sm:p-6 text-center">
                        <div className="mb-4 flex justify-center">
                          <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                            <div className="w-8 h-8 bg-orange-400 rounded" />
                          </div>
                        </div>
                        <h3 className="text-lg font-semibold mb-1">{city.name}</h3>
                        <p className="text-sm text-muted-foreground">{city.gyms} Gyms Available</p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </DialogContent>
            </Dialog>
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
                    <div key={item.path} className="relative group">
                      <Link
                        to={item.path}
                        className={`flex items-center space-x-3 px-4 py-3 rounded-2xl transition-all duration-300 ${
                          isActive(item.path)
                            ? "bg-primary text-primary-foreground"
                            : "text-muted-foreground hover:text-foreground hover:bg-muted"
                        }`}
                      >
                        <Icon className="h-5 w-5" />
                        <span className="font-medium">{item.label}</span>
                        <ChevronDown className="h-5 w-5" />
                      </Link>
                      
                      {/* Dropdown Menu */}
                      <div className="absolute top-full left-0 mt-2 w-full bg-background border border-border rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50">
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
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="outline" className="w-full flex items-center gap-2 rounded-full border-primary text-primary hover:bg-primary hover:text-primary-foreground">
                      <MapPin className="h-4 w-4" />
                      {selectedCity}
                      <ChevronDown className="h-4 w-4" />
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-md mx-4">
                    <DialogHeader className="bg-primary text-primary-foreground p-4 -m-6 mb-4 rounded-t-lg">
                      <DialogTitle className="flex items-center gap-2 text-white">
                        <MapPin className="h-5 w-5" />
                        Select Your City
                      </DialogTitle>
                    </DialogHeader>
                    <div className="grid grid-cols-1 gap-4">
                      {cities.map((city) => (
                        <Card
                          key={city.name}
                          className="cursor-pointer hover:shadow-md transition-shadow"
                          onClick={() => setSelectedCity(city.name)}
                        >
                          <CardContent className="p-4 text-center">
                            <div className="mb-4 flex justify-center">
                              <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                                <div className="w-8 h-8 bg-orange-400 rounded" />
                              </div>
                            </div>
                            <h3 className="text-lg font-semibold mb-1">{city.name}</h3>
                            <p className="text-sm text-muted-foreground">{city.gyms} Gyms Available</p>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </DialogContent>
                </Dialog>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;