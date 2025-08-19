import React from 'react';
import { Link } from "react-router-dom";
import { Dumbbell, Smartphone, ShoppingCart, Users, MapPin, Home, User, ArrowRight } from "lucide-react";

const Sitemap = () => {
  const sitemapData = {
    mainPages: [
      { path: "/", label: "Home", description: "Main landing page" },
      { path: "/discover-gym", label: "Discover Gyms", description: "Find premium gym locations" },
      { path: "/about", label: "About Us", description: "Learn about Fitflix" },
    ],
    gymLocations: [
      { path: "/discover-gym?location=electronic-city", label: "Electronic City", description: "Premium gym in EC Phase 1" },
      { path: "/discover-gym?location=marathahalli", label: "Marathahalli", description: "Best gym in Marathahalli" },
      { path: "/discover-gym?location=brookefield", label: "Brookefield", description: "Premium fitness center" },
    ],
    services: [
      { path: "/services", label: "Premium Gyms", description: "State-of-the-art facilities", icon: Dumbbell },
      { path: "/services#workout-app", label: "Workout App", description: "1000+ minutes of training", icon: Smartphone },
      { path: "/services#nutrition", label: "Nutrition Products", description: "Premium supplements", icon: ShoppingCart },
      { path: "/services#fitness-classes", label: "Fitness Classes", description: "Group & dance classes", icon: Users },
    ],
    aboutSections: [
      { path: "/services", label: "Our Services", description: "Complete fitness ecosystem" },
      { path: "/about#community", label: "Fitflix Fam", description: "Join our community" },
    ]
  };

  return (
    <div className="min-h-screen pt-20 bg-gradient-to-b from-background to-muted/30">
      <div className="container mx-auto px-4 py-12">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-black mb-6">
            Fitflix <span className="text-transparent bg-gradient-to-r from-orange-600 via-red-600 to-pink-600 bg-clip-text">Sitemap</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Complete navigation guide to all pages and sections of the Fitflix fitness ecosystem
          </p>
        </div>

        {/* Main Pages */}
        <section className="mb-16">
          <div className="flex items-center gap-3 mb-8">
            <Home className="h-8 w-8 text-primary" />
            <h2 className="text-3xl font-bold">Main Pages</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {sitemapData.mainPages.map((page) => (
              <Link
                key={page.path}
                to={page.path}
                className="group block p-6 bg-background border border-border rounded-lg hover:border-primary/30 hover:shadow-lg transition-all duration-300"
              >
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-xl font-semibold group-hover:text-primary transition-colors">
                    {page.label}
                  </h3>
                  <ArrowRight className="h-5 w-5 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all" />
                </div>
                <p className="text-muted-foreground">{page.description}</p>
              </Link>
            ))}
          </div>
        </section>

        {/* Gym Locations */}
        <section className="mb-16">
          <div className="flex items-center gap-3 mb-8">
            <MapPin className="h-8 w-8 text-primary" />
            <h2 className="text-3xl font-bold">Gym Locations</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {sitemapData.gymLocations.map((location) => (
              <Link
                key={location.path}
                to={location.path}
                className="group block p-6 bg-background border border-border rounded-lg hover:border-primary/30 hover:shadow-lg transition-all duration-300"
              >
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-xl font-semibold group-hover:text-primary transition-colors">
                    {location.label}
                  </h3>
                  <ArrowRight className="h-5 w-5 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all" />
                </div>
                <p className="text-muted-foreground">{location.description}</p>
              </Link>
            ))}
          </div>
        </section>

        {/* Services */}
        <section className="mb-16">
          <div className="flex items-center gap-3 mb-8">
            <Dumbbell className="h-8 w-8 text-primary" />
            <h2 className="text-3xl font-bold">Services</h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {sitemapData.services.map((service) => {
              const Icon = service.icon;
              return (
                <Link
                  key={service.path}
                  to={service.path}
                  className="group block p-6 bg-background border border-border rounded-lg hover:border-primary/30 hover:shadow-lg transition-all duration-300 text-center"
                >
                  <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                    <Icon className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2 group-hover:text-primary transition-colors">
                    {service.label}
                  </h3>
                  <p className="text-muted-foreground text-sm">{service.description}</p>
                </Link>
              );
            })}
          </div>
        </section>

        {/* About Sections */}
        <section className="mb-16">
          <div className="flex items-center gap-3 mb-8">
            <User className="h-8 w-8 text-primary" />
            <h2 className="text-3xl font-bold">About Sections</h2>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            {sitemapData.aboutSections.map((section) => (
              <Link
                key={section.path}
                to={section.path}
                className="group block p-6 bg-background border border-border rounded-lg hover:border-primary/30 hover:shadow-lg transition-all duration-300"
              >
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-xl font-semibold group-hover:text-primary transition-colors">
                    {section.label}
                  </h3>
                  <ArrowRight className="h-5 w-5 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all" />
                </div>
                <p className="text-muted-foreground">{section.description}</p>
              </Link>
            ))}
          </div>
        </section>

        {/* Quick Navigation */}
        <section className="bg-gradient-to-r from-primary/10 to-secondary/10 rounded-3xl p-8 md:p-12">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold mb-4">Quick Navigation</h2>
            <p className="text-muted-foreground">
              Popular destinations and frequently visited pages
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Link
              to="/discover-gym"
              className="group p-4 bg-background/80 backdrop-blur-sm rounded-lg hover:bg-background transition-colors text-center"
            >
              <Dumbbell className="h-8 w-8 text-primary mx-auto mb-2 group-hover:scale-110 transition-transform" />
              <span className="font-medium">Find Gyms</span>
            </Link>
            
                         <Link
               to="/services"
               className="group p-4 bg-background/80 backdrop-blur-sm rounded-lg hover:bg-background transition-colors text-center"
             >
               <Smartphone className="h-8 w-8 text-primary mx-auto mb-2 group-hover:scale-110 transition-transform" />
               <span className="font-medium">Workout App</span>
             </Link>
             
             <Link
               to="/services"
               className="group p-4 bg-background/80 backdrop-blur-sm rounded-lg hover:bg-background transition-colors text-center"
             >
               <ShoppingCart className="h-8 w-8 text-primary mx-auto mb-2 group-hover:scale-110 transition-transform" />
               <span className="font-medium">Nutrition</span>
             </Link>
             
             <Link
               to="/about#community"
               className="group p-4 bg-background/80 backdrop-blur-sm rounded-lg hover:bg-background transition-colors text-center"
             >
               <Users className="h-8 w-8 text-primary mx-auto mb-2 group-hover:scale-110 transition-transform" />
               <span className="font-medium">Community</span>
             </Link>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Sitemap;
