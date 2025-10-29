
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Dumbbell, Smartphone, ShoppingCart, Users, MapPin, Trophy, Heart, Star, ArrowRight } from "lucide-react";
import { useSEO } from "@/hooks/useSEO";
import OptimizedImage from "@/components/OptimizedImage";
import { Link } from "react-router-dom";
import Breadcrumb from "@/components/Breadcrumb";

const About = () => {
  useSEO({
    title: "About Fitflix | Premium Fitness Brand & Community",
    description: "Learn about Fitflix - a comprehensive fitness brand offering premium gyms, workout apps, nutrition products, and fitness classes. Join our supportive fitness community.",
    keywords: "About Fitflix, fitness brand, premium gyms, workout apps, nutrition products, fitness classes, fitness community, Fitflix Fam, certified trainers, modern equipment",
    ogTitle: "About Fitflix | Premium Fitness Brand & Community",
    ogDescription: "Learn about Fitflix - a comprehensive fitness brand offering premium gyms, workout apps, nutrition products, and fitness classes.",
    canonical: "https://fitflix.in/about"
  });
  const services = [
    {
      icon: Dumbbell,
      title: "Fitness Centers",
      description: "Premium gyms in Electronic City and Marathahalli with spacious facilities and state-of-the-art equipment offering diverse training programs.",
      image: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=600&h=400&fit=crop",
      features: ["Modern Equipment", "Personal Training", "Group Classes", "Spacious Facilities"]
    },
    {
      icon: Smartphone,
      title: "Workout App",
      description: "Fitflix Full Body Workout app with 1000+ minutes of training across 10 categories, professional trainer guidance, and planned diet features.",
      image: "https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=600&h=400&fit=crop",
      features: ["1000+ Minutes Training", "10 Categories", "Professional Guidance", "Equipment Optional"],
      comingSoon: true
    },
    {
      icon: ShoppingCart,
      title: "Nutrition Products",
      description: "Premium supplements including BODEN Vitamin D3, BioPro Whey protein, and Creashroom (creatine & cordyceps blend) for optimal performance.",
      image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=600&h=400&fit=crop",
      features: ["Vitamin D3", "Whey Protein", "Creatine Blends", "Performance Support"]
    },
    {
      icon: Users,
      title: "Fitness Classes",
      description: "Engaging fitness and dance classes led by certified instructors, fostering our supportive 'Fitflix Fam' community experience.",
      image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=600&h=400&fit=crop",
      features: ["Dance Classes", "Certified Instructors", "Community Focus", "Fitflix Fam"]
    }
  ];

  return (
    <div className="min-h-screen relative">
      {/* Premium Gym Background with Overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-fixed"
        style={{
          backgroundImage: "url('https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=1920&h=1080&fit=crop')"
        }}
      />
      <div className="absolute inset-0 bg-background/85 backdrop-blur-sm" />
      
      {/* Content */}
      <div className="relative z-10 pt-20">
        <div className="container mx-auto px-4 py-12">
          {/* Breadcrumb */}
          <Breadcrumb />
          
          {/* Hero Section */}
          <div className="text-center mb-16">
            <Badge variant="secondary" className="mb-4 bg-primary/20 text-primary border-primary/30">About Fitflix</Badge>
            <h1 className="text-4xl md:text-6xl font-black mb-6">
              About <span className="text-transparent bg-gradient-to-r from-orange-600 via-red-600 to-pink-600 bg-clip-text">Fitflix</span>
            </h1>
            <p className="text-lg text-muted-foreground max-w-4xl mx-auto leading-relaxed mb-12">
              Fitflix is not just another gym chain. We are a pan-India fitness ecosystem built at the intersection of functional biomechanics, strength systems, and India's ancient wellness traditions like Kalaripayattu, Yoga, and Ayurveda.
              <br /><br />
              We empower everyday Indians — from busy professionals to new mothers — with structured programs that combine real training, scientific healing, and sustainable growth. Our gyms are designed to deliver results-driven experiences, whether you train in our value-focused Fitflix Active, performance-centric Fitflix Prime, or luxury wellness club Fitflix Elite.
            </p>
          </div>

          {/* Services Section */}
          <div className="mb-20">
            <div className="text-center mb-12">
              <h2 id="services" className="text-3xl md:text-4xl font-bold gradient-text mb-4 scroll-mt-20">Our Services</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Discover the complete Fitflix ecosystem designed to support every aspect of your fitness journey
              </p>
            </div>

            <div className="grid lg:grid-cols-2 gap-8">
              {services.map((service, index) => {
                const Icon = service.icon;
                return (
                  <Card key={index} className={`group overflow-hidden hover:shadow-xl transition-all duration-300 border-primary/10 hover:border-primary/30 bg-gradient-to-b from-background/80 to-primary/5 backdrop-blur-sm ${service.comingSoon ? 'opacity-75' : ''}`}>
                    <div className="relative h-48 overflow-hidden">
                      <OptimizedImage 
                        src={service.image} 
                        alt={service.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        width={600}
                        height={400}
                        sizes="(max-width: 1024px) 100vw, 50vw"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />
                      {service.comingSoon && (
                        <div className="absolute top-4 right-4 bg-yellow-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                          Coming Soon
                        </div>
                      )}
                    </div>
                    <CardContent className="p-6">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="w-12 h-12 bg-primary/20 rounded-lg flex items-center justify-center">
                          <Icon className="h-6 w-6 text-primary" />
                        </div>
                        <h3 className="text-xl font-bold">{service.title}</h3>
                      </div>
                      <p className="text-muted-foreground mb-4 leading-relaxed">
                        {service.description}
                      </p>
                      <div className="flex flex-wrap gap-2 mb-4">
                        {service.features.map((feature, featureIndex) => (
                          <Badge key={featureIndex} variant="secondary" className="text-xs">
                            {feature}
                          </Badge>
                        ))}
                      </div>
                      {!service.comingSoon && (
                        <Button variant="outline" className="w-full group-hover:bg-primary group-hover:text-white transition-colors">
                          Learn More
                        </Button>
                      )}
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>

          {/* What Sets Us Apart Section */}
          <div className="mb-20">
            <div className="text-center mb-12">
              <h2 id="what-sets-us-apart" className="text-3xl md:text-4xl font-bold gradient-text mb-4 scroll-mt-20">What Sets Us Apart</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Discover the unique features that make Fitflix India's leading fitness ecosystem
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                "Functional Patterns-inspired training systems",
                "Recovery-focused ecosystems (red light therapy, steam, ice baths)",
                "Cultural integration with Indian ancient movement practices",
                "Tech-integrated member tracking & transformation systems",
                "Dedicated programs for Indian moms, tech professionals, and HNIs",
                "Franchise-ready business models for Tier 1, Tier 2, and premium zones"
              ].map((feature, index) => (
                <Card key={index} className="border-primary/20 bg-primary/5 hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                      <span className="text-sm leading-relaxed">{feature}</span>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Community Section */}
          <div className="mb-20">
            <div className="text-center mb-12">
              <h2 id="community" className="text-3xl md:text-4xl font-bold gradient-text mb-4 scroll-mt-20">Join the Fitflix Fam</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Be part of our supportive fitness community where everyone is welcome
              </p>
            </div>

            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="space-y-6">
                <div className="space-y-4">
                  <h3 className="text-2xl font-bold">Community Features</h3>
                  <ul className="space-y-3">
                    <li className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-primary rounded-full"></div>
                      <span>Weekly group fitness challenges</span>
                    </li>
                    <li className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-primary rounded-full"></div>
                      <span>Member meetups and events</span>
                    </li>
                    <li className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-primary rounded-full"></div>
                      <span>Progress sharing and motivation</span>
                    </li>
                    <li className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-primary rounded-full"></div>
                      <span>Expert advice and tips</span>
                    </li>
                  </ul>
                </div>
                <Button className="btn-fitness">
                  Join Community
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
              <div className="relative">
                <div className="bg-gradient-to-br from-primary/10 to-secondary/10 rounded-3xl p-2 backdrop-blur-sm border border-primary/20">
                  <OptimizedImage 
                    src="https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&h=600&fit=crop" 
                    alt="Fitflix Community" 
                    className="w-full h-[400px] object-cover rounded-2xl shadow-2xl"
                    width={800}
                    height={600}
                    sizes="(max-width: 1024px) 100vw, 50vw"
                  />
                </div>
                <div className="absolute -top-4 -right-4 w-20 h-20 bg-primary/20 rounded-full blur-xl animate-glow-pulse" />
              </div>
            </div>
          </div>

          {/* Join Us Section */}
          <div className="mb-20">
            <div className="text-center mb-12">
              <h2 id="join-us" className="text-3xl md:text-4xl font-bold gradient-text mb-4 scroll-mt-20">Join Us</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Be part of India's fitness revolution through various partnership opportunities
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  icon: "🚀",
                  title: "Corporate wellness partnerships",
                  description: "Transform your workplace with our comprehensive corporate wellness programs designed for modern Indian companies."
                },
                {
                  icon: "🚀",
                  title: "Franchise & expansion opportunities",
                  description: "Join our franchise network and bring Fitflix's revolutionary fitness ecosystem to your city."
                },
                {
                  icon: "🚀",
                  title: "Fitness coaching & content collaborations",
                  description: "Partner with us to create world-class fitness content and training programs for the Indian market."
                }
              ].map((opportunity, index) => (
                <Card key={index} className="border-primary/20 bg-primary/5 hover:shadow-lg transition-shadow text-center">
                  <CardContent className="p-6">
                    <div className="text-4xl mb-4">{opportunity.icon}</div>
                    <h3 className="text-xl font-semibold mb-3">{opportunity.title}</h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">{opportunity.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Call to Action */}
          <div className="text-center bg-gradient-to-r from-primary/10 to-secondary/10 rounded-3xl p-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Start Your Fitness Journey?</h2>
            <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
              Join thousands of fitness enthusiasts who've already transformed their lives with Fitflix
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="btn-fitness" asChild>
                <Link to="/discover-gym">
                  Find Your Gym
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link to="/services">
                  Explore Services
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
