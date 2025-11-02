import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Dumbbell, 
  Users, 
  Award, 
  Clock,
  MapPin,
  TrendingUp,
  Heart,
  Target,
  ArrowRight,
  CheckCircle2,
  Star
} from "lucide-react";
import { useSEO } from "@/hooks/useSEO";
import OptimizedImage from "@/components/OptimizedImage";
import { useState } from "react";
import CallbackForm from "@/components/CallbackForm";

const Gyms = () => {
  const [callbackFormOpen, setCallbackFormOpen] = useState(false);

  useSEO({
    title: "Premium Gyms in Bangalore | Fitflix - State-of-the-Art Fitness Centers",
    description: "Discover Fitflix premium gyms in Electronic City, Marathahalli, and Brookefield. Modern equipment, certified trainers, group classes, and personalized training programs.",
    keywords: "premium gyms Bangalore, fitness centers, Electronic City gym, Marathahalli gym, Brookefield gym, personal training, group classes, certified trainers",
    ogTitle: "Premium Gyms in Bangalore | Fitflix",
    ogDescription: "State-of-the-art fitness centers with modern equipment, certified trainers, and personalized programs.",
    canonical: "https://fitflix.in/gyms"
  });

  const features = [
    {
      icon: Dumbbell,
      title: "State-of-the-Art Equipment",
      description: "Latest fitness machines and free weights from leading brands for optimal training"
    },
    {
      icon: Users,
      title: "Certified Trainers",
      description: "Expert guidance from certified professionals dedicated to your fitness goals"
    },
    {
      icon: Award,
      title: "Group Classes",
      description: "Dynamic group sessions including HIIT, Yoga, Zumba, and specialized training"
    },
    {
      icon: Clock,
      title: "Flexible Timings",
      description: "Early morning to late night access to fit your busy schedule"
    },
    {
      icon: MapPin,
      title: "Prime Locations",
      description: "Conveniently located in Electronic City, Marathahalli, and Brookefield"
    },
    {
      icon: Target,
      title: "Personalized Programs",
      description: "Customized workout plans tailored to your fitness level and goals"
    }
  ];

  const programs = [
    {
      icon: TrendingUp,
      title: "Strength Training",
      description: "Build muscle, increase strength, and transform your physique with our comprehensive strength programs"
    },
    {
      icon: Heart,
      title: "Cardio & HIIT",
      description: "Burn fat, boost endurance, and improve cardiovascular health with high-intensity training"
    },
    {
      icon: Users,
      title: "Group Fitness",
      description: "Join energizing group classes including Yoga, Zumba, CrossFit, and more"
    },
    {
      icon: Award,
      title: "Personal Training",
      description: "One-on-one coaching with certified trainers for personalized attention and results"
    }
  ];

  const locations = [
    {
      name: "Electronic City",
      address: "Electronic City Phase 1, Bengaluru",
      features: ["Parking", "Personal Training", "Group Classes", "Shower"],
      rating: 4.8,
      id: 1
    },
    {
      name: "Marathahalli",
      address: "4th floor, Kishan icon, Marathahalli",
      features: ["Modern Equipment", "Professional Trainers", "Cardio Zone"],
      rating: 4.5,
      id: 2
    },
    {
      name: "Brookefield",
      address: "3rd floor, Above Bata showroom, Brookefield",
      features: ["Premium Equipment", "Strength Training", "Group Classes"],
      rating: 4.8,
      id: 3
    }
  ];

  const benefits = [
    "Modern equipment from leading fitness brands",
    "Certified and experienced trainers",
    "Flexible membership plans",
    "Clean and hygienic facilities",
    "Complimentary trial sessions",
    "Nutritional guidance and support"
  ];

  return (
    <div className="min-h-screen pt-16">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-secondary/10 to-background">
          <OptimizedImage 
            src="/src/assets/hero-fitness.jpg" 
            alt="Fitflix Gym"
            className="w-full h-full object-cover opacity-20"
            width={1920}
            height={800}
          />
        </div>
        
        <div className="relative container mx-auto px-4 py-20 md:py-32">
          <div className="max-w-4xl mx-auto text-center">
            <Badge variant="secondary" className="mb-6 bg-primary/20 text-primary border-primary/30">
              <Dumbbell className="mr-2 h-4 w-4" />
              Premium Fitness Centers
            </Badge>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-black mb-6">
              Transform Your Fitness at{" "}
              <span className="text-transparent bg-gradient-to-r from-primary via-secondary to-primary bg-clip-text">
                Fitflix Gyms
              </span>
            </h1>
            
            <p className="text-xl md:text-2xl text-muted-foreground mb-4 font-semibold">
              TRAIN. ACHIEVE. EXCEL.
            </p>
            
            <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
              Experience world-class fitness facilities with state-of-the-art equipment, certified trainers, and a supportive community across Bangalore.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/discover-gym">
                <Button size="lg" className="btn-fitness text-lg px-8">
                  Explore Locations
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Button 
                size="lg" 
                variant="outline"
                className="text-lg px-8"
                onClick={() => setCallbackFormOpen(true)}
              >
                Get Free Trial
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <Badge variant="secondary" className="mb-4">Why Choose Fitflix Gyms</Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Premium Facilities & Services
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Everything you need to achieve your fitness goals in one place
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="group hover:shadow-xl transition-all duration-300 border-primary/10 hover:border-primary/30">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="p-3 rounded-lg bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                      <feature.icon className="h-6 w-6" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                      <p className="text-sm text-muted-foreground">{feature.description}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Programs Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <Badge variant="secondary" className="mb-4">Training Programs</Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Comprehensive Fitness Programs
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Structured programs designed by experts to help you reach your goals faster
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {programs.map((program, index) => (
              <Card key={index} className="group hover:shadow-xl transition-all duration-300 border-primary/10 hover:border-primary/30">
                <CardContent className="p-8">
                  <div className="flex items-start gap-4">
                    <div className="p-4 rounded-xl bg-gradient-to-br from-primary/20 to-secondary/20 text-primary">
                      <program.icon className="h-8 w-8" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-bold mb-3 group-hover:text-primary transition-colors">
                        {program.title}
                      </h3>
                      <p className="text-muted-foreground leading-relaxed">
                        {program.description}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Locations Section */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <Badge variant="secondary" className="mb-4">Our Locations</Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Find Your Nearest Gym
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Three premium locations across Bangalore for your convenience
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {locations.map((location) => (
              <Card key={location.id} className="group hover:shadow-xl transition-all duration-300 border-primary/10 hover:border-primary/30">
                <CardContent className="p-6">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <h3 className="text-xl font-bold group-hover:text-primary transition-colors">
                        {location.name}
                      </h3>
                      <div className="flex items-center gap-1">
                        <Star className="h-4 w-4 text-yellow-500 fill-current" />
                        <span className="font-semibold text-sm">{location.rating}</span>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-2 text-sm text-muted-foreground">
                      <MapPin className="h-4 w-4 mt-0.5 flex-shrink-0" />
                      <span>{location.address}</span>
                    </div>

                    <div className="flex flex-wrap gap-2">
                      {location.features.map((feature, idx) => (
                        <Badge key={idx} variant="outline" className="text-xs">
                          {feature}
                        </Badge>
                      ))}
                    </div>

                    <Link to={`/gym/${location.id}`}>
                      <Button className="w-full btn-fitness">
                        View Details
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link to="/discover-gym">
              <Button size="lg" variant="outline">
                View All Locations
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <Badge variant="secondary" className="mb-4">Why Fitflix</Badge>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Your Success is Our Mission
              </h2>
              <p className="text-lg text-muted-foreground mb-8">
                At Fitflix, we combine premium facilities, expert guidance, and a supportive community to help you achieve lasting fitness results.
              </p>
              
              <div className="space-y-4">
                {benefits.map((benefit, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <CheckCircle2 className="h-6 w-6 text-primary flex-shrink-0 mt-0.5" />
                    <span className="text-muted-foreground">{benefit}</span>
                  </div>
                ))}
              </div>

              <div className="flex flex-col sm:flex-row gap-4 mt-8">
                <Link to="/discover-gym">
                  <Button size="lg" className="btn-fitness">
                    Start Your Journey
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
                <Button 
                  size="lg" 
                  variant="outline"
                  onClick={() => setCallbackFormOpen(true)}
                >
                  Contact Us
                </Button>
              </div>
            </div>

            <div className="relative">
              <div className="aspect-square rounded-2xl overflow-hidden">
                <OptimizedImage 
                  src="/src/assets/hero-fitness.jpg" 
                  alt="Gym facilities"
                  className="w-full h-full object-cover"
                  width={600}
                  height={600}
                />
              </div>
              <div className="absolute -bottom-6 -right-6 w-48 h-48 bg-gradient-to-br from-primary to-secondary rounded-2xl opacity-20 blur-3xl" />
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <Card className="relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-secondary/10" />
            <CardContent className="relative p-12 text-center">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Ready to Start Your Fitness Journey?
              </h2>
              <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
                Join Fitflix today and get access to premium facilities, expert trainers, and a supportive fitness community
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to="/discover-gym">
                  <Button size="lg" className="btn-fitness">
                    Find Your Gym
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
                <Button 
                  size="lg" 
                  variant="outline"
                  onClick={() => setCallbackFormOpen(true)}
                >
                  Get Free Trial
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      <CallbackForm open={callbackFormOpen} onOpenChange={setCallbackFormOpen} />
    </div>
  );
};

export default Gyms;
