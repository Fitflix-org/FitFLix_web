import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  Dumbbell, 
  Smartphone, 
  ShoppingCart, 
  Users, 
  MapPin, 
  Trophy, 
  Heart, 
  Star, 
  ArrowRight, 
  ExternalLink,
  Zap,
  Target,
  Shield,
  Clock,
  CheckCircle
} from "lucide-react";
import { useSEO } from "@/hooks/useSEO";
import OptimizedImage from "@/components/OptimizedImage";
import { Link } from "react-router-dom";
import Breadcrumb from "@/components/Breadcrumb";

const Services = () => {
  useSEO({
    title: "Fitflix Services | Premium Gyms, Nutrition, Workout App & Classes",
    description: "Discover all Fitflix services: premium gyms in Electronic City & Marathahalli, nutrition products from Fitflix Nutrition, workout app, and fitness classes. Transform your fitness journey.",
    keywords: "Fitflix services, premium gyms, nutrition products, workout app, fitness classes, Electronic City gym, Marathahalli gym, Fitflix Nutrition, protein supplements, fitness community",
    ogTitle: "Fitflix Services | Premium Gyms, Nutrition, Workout App & Classes",
    ogDescription: "Discover all Fitflix services: premium gyms, nutrition products, workout app, and fitness classes.",
    canonical: "https://fitflix.in/services"
  });

  const services = [
    {
      icon: Dumbbell,
      title: "Premium Fitness Centers",
      description: "State-of-the-art gyms with modern equipment, spacious facilities, and certified trainers in prime locations across Bangalore.",
      image: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=600&h=400&fit=crop",
      features: ["Modern Equipment", "Personal Training", "Group Classes", "Spacious Facilities", "24/7 Access"],
      locations: [
        { name: "Electronic City", address: "EC Phase 1, Bangalore", features: ["Premium Equipment", "Personal Training", "Group Classes"] },
        { name: "Marathahalli", address: "Marathahalli, Bangalore", features: ["Modern Facilities", "Certified Trainers", "Fitness Classes"] }
      ],
      cta: "Find Your Gym",
      ctaLink: "/discover-gym"
    },
    {
      icon: ShoppingCart,
      title: "Nutrition Products",
      description: "Premium supplements and nutrition products from Fitflix Nutrition, designed for optimal performance and health.",
      image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=600&h=400&fit=crop",
      features: ["Premium Quality", "Lab Tested", "Performance Focused", "Indian Formulated"],
      products: [
        { name: "Bio-Pro Whey", price: "Rs. 5,100", discount: "40% Off", originalPrice: "Rs. 8,500", description: "Ultimate protein supplement for optimal nutrition and enhanced protein absorption" },
        { name: "Max Gains", price: "Rs. 1,560", discount: "40% Off", originalPrice: "Rs. 2,600", description: "Protein supplement to fuel your fitness journey and maximize gains" },
        { name: "Gold's Whey Isolate", price: "Rs. 6,900", discount: "40% Off", originalPrice: "Rs. 11,499", description: "Premium protein supplement for post-workout muscle support and recovery" },
        { name: "Creashroom", price: "Rs. 2,080", discount: "35% Off", originalPrice: "Rs. 3,200", description: "3000mg creatine monohydrate + 40mg cordyceps for athletic performance" },
        { name: "Gold's BCAA", price: "Rs. 3,710", discount: "30% Off", originalPrice: "Rs. 5,300", description: "7g BCAA + 160mg cordyceps for enhanced athletic performance" },
        { name: "Boden", price: "Rs. 945", discount: "30% Off", originalPrice: "Rs. 1,350", description: "Vitamin D3 supplement with fractionated coconut oil for bone health" },
        { name: "Fitvit", price: "Rs. 1,015", discount: "30% Off", originalPrice: "Rs. 1,450", description: "Multivitamin and multi-mineral supplement for overall well-being" },
        { name: "Helisa O3", price: "Rs. 1,085", discount: "30% Off", originalPrice: "Rs. 1,550", description: "Omega-3 fatty acids for heart, eye, and joint health" }
      ],
      cta: "Shop Nutrition Products",
      ctaLink: "https://fitflixnutrition.com/",
      external: true
    },
    {
      icon: Smartphone,
      title: "Fitflix Workout App",
      description: "Comprehensive fitness app with 1000+ minutes of training across 10 categories, professional guidance, and planned diet features.",
      image: "https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=600&h=400&fit=crop",
      features: ["1000+ Minutes Training", "10 Categories", "Professional Guidance", "Equipment Optional", "Planned Diet"],
      comingSoon: true,
      cta: "Coming Soon",
      ctaLink: "#"
    },
    {
      icon: Users,
      title: "Fitness Classes & Community",
      description: "Engaging fitness and dance classes led by certified instructors, fostering our supportive 'Fitflix Fam' community experience.",
      image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=600&h=400&fit=crop",
      features: ["Dance Classes", "Certified Instructors", "Community Focus", "Fitflix Fam", "Group Activities"],
      classes: [
        "Zumba & Dance Fitness",
        "HIIT Workouts",
        "Yoga & Flexibility",
        "Strength Training",
        "Cardio Classes",
        "Group Challenges"
      ],
      cta: "Join Community",
      ctaLink: "/about#community"
    }
  ];

  return (
    <div className="min-h-screen relative">
      {/* Hero Background */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-fixed"
        style={{
          backgroundImage: "url('https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=1920&h=1080&fit=crop')"
        }}
      />
      <div className="absolute inset-0 bg-background/90 backdrop-blur-sm" />
      
      {/* Content */}
      <div className="relative z-10 pt-20">
        <div className="container mx-auto px-4 py-12">
          {/* Breadcrumb */}
          <Breadcrumb />
          
          {/* Hero Section */}
          <div className="text-center mb-16">
            <Badge variant="secondary" className="mb-4 bg-primary/20 text-primary border-primary/30">Our Services</Badge>
            <h1 className="text-4xl md:text-6xl font-black mb-6">
              Fitflix <span className="text-transparent bg-gradient-to-r from-orange-600 via-red-600 to-pink-600 bg-clip-text">Services</span>
            </h1>
            <p className="text-lg text-muted-foreground max-w-4xl mx-auto leading-relaxed mb-12">
              Discover our comprehensive range of fitness services designed to support every aspect of your health and wellness journey. 
              From premium gyms to nutrition products, we've got you covered.
            </p>
          </div>

          {/* Services Grid */}
          <div className="space-y-20">
            {services.map((service, index) => {
              const Icon = service.icon;
              return (
                <div key={index} className={`grid lg:grid-cols-2 gap-12 items-center ${index % 2 === 1 ? 'lg:grid-flow-col-dense' : ''}`}>
                  {/* Service Content */}
                  <div className={`space-y-6 ${index % 2 === 1 ? 'lg:col-start-2' : ''}`}>
                                         <div className="flex items-center gap-3 mb-4">
                       <div className="w-16 h-16 bg-primary/20 rounded-2xl flex items-center justify-center">
                         <Icon className="h-8 w-8 text-primary" />
                       </div>
                       <div>
                         <h2 
                           id={service.title.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '')}
                           className="text-3xl md:text-4xl font-bold scroll-mt-20"
                         >
                           {service.title}
                         </h2>
                         {service.comingSoon && (
                           <Badge variant="secondary" className="mt-2 bg-yellow-500/20 text-yellow-600 border-yellow-500/30">
                             Coming Soon
                           </Badge>
                         )}
                       </div>
                     </div>
                    
                    <p className="text-lg text-muted-foreground leading-relaxed">
                      {service.description}
                    </p>

                    {/* Features */}
                    <div className="grid grid-cols-2 gap-3">
                      {service.features.map((feature, featureIndex) => (
                        <div key={featureIndex} className="flex items-center gap-2">
                          <CheckCircle className="h-4 w-4 text-primary flex-shrink-0" />
                          <span className="text-sm">{feature}</span>
                        </div>
                      ))}
                    </div>

                    {/* Special Content for Each Service */}
                    {service.locations && (
                      <div className="space-y-4">
                        <h3 className="text-xl font-semibold">Our Locations</h3>
                        <div className="grid gap-4">
                          {service.locations.map((location, locIndex) => (
                            <Card key={locIndex} className="border-primary/20 bg-primary/5">
                              <CardContent className="p-4">
                                <div className="flex items-center gap-3 mb-2">
                                  <MapPin className="h-4 w-4 text-primary" />
                                  <h4 className="font-semibold">{location.name}</h4>
                                </div>
                                <p className="text-sm text-muted-foreground mb-2">{location.address}</p>
                                <div className="flex flex-wrap gap-1">
                                  {location.features.map((feature, featIndex) => (
                                    <Badge key={featIndex} variant="secondary" className="text-xs">
                                      {feature}
                                    </Badge>
                                  ))}
                                </div>
                              </CardContent>
                            </Card>
                          ))}
                        </div>
                      </div>
                    )}

                    {service.products && (
                      <div className="space-y-4">
                        <h3 className="text-xl font-semibold">Featured Products</h3>
                        <div className="grid gap-3 max-h-64 overflow-y-auto">
                          {service.products.slice(0, 4).map((product, prodIndex) => (
                            <Card key={prodIndex} className="border-primary/20 bg-primary/5">
                              <CardContent className="p-3">
                                <div className="flex justify-between items-start mb-2">
                                  <h4 className="font-semibold text-sm">{product.name}</h4>
                                  <Badge variant="secondary" className="text-xs bg-green-500/20 text-green-600">
                                    {product.discount}
                                  </Badge>
                                </div>
                                <div className="flex items-center gap-2 mb-1">
                                  <span className="font-bold text-primary">{product.price}</span>
                                  <span className="text-xs text-muted-foreground line-through">{product.originalPrice}</span>
                                </div>
                                <p className="text-xs text-muted-foreground">{product.description}</p>
                              </CardContent>
                            </Card>
                          ))}
                        </div>
                        <p className="text-sm text-muted-foreground">
                          View all products on our nutrition website
                        </p>
                      </div>
                    )}

                    {service.classes && (
                      <div className="space-y-4">
                        <h3 className="text-xl font-semibold">Available Classes</h3>
                        <div className="grid grid-cols-2 gap-2">
                          {service.classes.map((className, classIndex) => (
                            <div key={classIndex} className="flex items-center gap-2">
                              <div className="w-2 h-2 bg-primary rounded-full"></div>
                              <span className="text-sm">{className}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* CTA Button */}
                    <Button 
                      size="lg" 
                      className="btn-fitness w-full sm:w-auto"
                      asChild={!service.external}
                      onClick={service.external ? () => window.open(service.ctaLink, '_blank') : undefined}
                    >
                      {service.external ? (
                        <span className="flex items-center gap-2">
                          {service.cta}
                          <ExternalLink className="h-4 w-4" />
                        </span>
                      ) : (
                        <Link to={service.ctaLink} className="flex items-center gap-2">
                          {service.cta}
                          <ArrowRight className="h-4 w-4" />
                        </Link>
                      )}
                    </Button>
                  </div>

                  {/* Service Image */}
                  <div className={`relative ${index % 2 === 1 ? 'lg:col-start-1' : ''}`}>
                    <div className="bg-gradient-to-br from-primary/10 to-secondary/10 rounded-3xl p-2 backdrop-blur-sm border border-primary/20">
                      <OptimizedImage 
                        src={service.image} 
                        alt={service.title}
                        className="w-full h-[400px] object-cover rounded-2xl shadow-2xl"
                        width={600}
                        height={400}
                        sizes="(max-width: 1024px) 100vw, 50vw"
                      />
                    </div>
                    <div className="absolute -top-4 -right-4 w-20 h-20 bg-primary/20 rounded-full blur-xl animate-glow-pulse" />
                  </div>
                </div>
              );
            })}
          </div>

                     {/* Why Choose Fitflix Section */}
           <div className="mt-20 text-center">
             <h2 id="personal-training" className="text-3xl md:text-4xl font-bold mb-12 scroll-mt-20">Why Choose Fitflix Services?</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                { icon: Shield, title: "Premium Quality", description: "All our services meet the highest standards of quality and safety" },
                { icon: Target, title: "Results Focused", description: "Designed to help you achieve your fitness goals effectively" },
                { icon: Users, title: "Community Support", description: "Join the Fitflix Fam for motivation and support" },
                { icon: Zap, title: "Innovation", description: "Cutting-edge facilities and technology for optimal results" }
              ].map((feature, index) => {
                const Icon = feature.icon;
                return (
                  <Card key={index} className="border-primary/20 bg-primary/5 hover:shadow-lg transition-shadow">
                    <CardContent className="p-6 text-center">
                      <div className="w-16 h-16 bg-primary/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
                        <Icon className="h-8 w-8 text-primary" />
                      </div>
                      <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                      <p className="text-muted-foreground text-sm">{feature.description}</p>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>

          {/* Call to Action */}
          <div className="mt-20 text-center bg-gradient-to-r from-primary/10 to-secondary/10 rounded-3xl p-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Transform Your Fitness Journey?</h2>
            <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
              Choose from our comprehensive range of services and start your transformation today
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="btn-fitness" asChild>
                <Link to="/discover-gym">
                  Find Your Gym
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" onClick={() => window.open('https://fitflixnutrition.com/', '_blank')}>
                Shop Nutrition Products
                <ExternalLink className="ml-2 h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Services;
