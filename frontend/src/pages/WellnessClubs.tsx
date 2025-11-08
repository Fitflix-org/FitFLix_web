import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Sparkles, 
  Dna, 
  Snowflake, 
  Wind, 
  Droplets, 
  Sun,
  Users,
  TrendingUp,
  Heart,
  Brain,
  Activity,
  ArrowRight,
  CheckCircle2
} from "lucide-react";
import { useSEO } from "@/hooks/useSEO";
import OptimizedImage from "@/components/OptimizedImage";
import { useState } from "react";
import CallbackForm from "@/components/CallbackForm";

const WellnessClubs = () => {
  const [callbackFormOpen, setCallbackFormOpen] = useState(false);

  useSEO({
    title: "Fitflix Wellness Clubs - DNA-Based Personalized Wellness | Train. Heal. Grow.",
    description: "Experience revolutionary wellness at Fitflix Wellness Clubs. DNA-based personalized programs, Cryotherapy, HBOT, Infrared Sauna, Cold Plunge, and more. Your DNA, Your Wellness, Your Way.",
    keywords: "wellness club, DNA testing, cryotherapy, HBOT, oxygen therapy, infrared sauna, cold plunge, collagen bed, personalized wellness, longevity, body recomposition, age reversal",
    ogTitle: "Fitflix Wellness Clubs - DNA-Based Personalized Wellness",
    ogDescription: "Revolutionary wellness experience with DNA-based programs, advanced recovery therapies, and elite facilities.",
    canonical: "https://fitflix.in/wellness-clubs"
  });

  const facilities = [
    {
      icon: Dna,
      title: "DNA & Epigenetic Testing",
      description: "Unlock your genetic blueprint for personalized wellness programs tailored to your unique biology"
    },
    {
      icon: Snowflake,
      title: "Cryotherapy",
      description: "Whole-body cryotherapy for recovery, inflammation reduction, and enhanced performance"
    },
    {
      icon: Wind,
      title: "HBOT (Oxygen Therapy)",
      description: "Hyperbaric oxygen therapy for cellular recovery, longevity, and enhanced healing"
    },
    {
      icon: Sun,
      title: "Infrared Sauna",
      description: "Deep tissue detoxification, improved circulation, and stress relief through infrared heat"
    },
    {
      icon: Droplets,
      title: "Cold Plunge",
      description: "Ice bath therapy for mental clarity, immune boost, and metabolic enhancement"
    },
    {
      icon: Sparkles,
      title: "Collagen Beds",
      description: "Red light therapy for skin rejuvenation, anti-aging, and cellular regeneration"
    }
  ];

  const programs = [
    {
      icon: TrendingUp,
      title: "Peak Performance",
      description: "Unlock genetic potential with tailored training, nutrition, and recovery for enhanced strength and endurance"
    },
    {
      icon: Activity,
      title: "Body Recomposition",
      description: "Science-based training and nutrition to build lean muscle and reshape your physique"
    },
    {
      icon: Heart,
      title: "Age Reversal",
      description: "DNA-guided nutrition and biohacking to rejuvenate cells and turn back the biological clock"
    },
    {
      icon: Brain,
      title: "Mental Clarity",
      description: "Programs designed to reduce anxiety, improve focus, and enhance emotional resilience"
    }
  ];

  const benefits = [
    "Personalized DNA-based wellness plans",
    "Elite recovery and longevity therapies",
    "Expert guidance from certified professionals",
    "State-of-the-art facilities and equipment",
    "Holistic approach to health optimization",
    "Flexible membership options with credits system"
  ];

  return (
    <div className="min-h-screen pt-16">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-secondary/10 to-background">
          <OptimizedImage 
            src="/src/assets/hero-fitness.jpg" 
            alt="Wellness Club"
            className="w-full h-full object-cover opacity-20"
            width={1920}
            height={800}
          />
        </div>
        
        <div className="relative container mx-auto px-4 py-20 md:py-32">
          <div className="max-w-4xl mx-auto text-center">
            <Badge variant="secondary" className="mb-6 bg-primary/20 text-primary border-primary/30">
              <Sparkles className="mr-2 h-4 w-4" />
              Revolutionary Wellness Experience
            </Badge>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-black mb-6">
              Welcome to{" "}
              <span className="text-transparent bg-gradient-to-r from-primary via-secondary to-primary bg-clip-text">
                Fitflix Wellness Clubs
              </span>
            </h1>
            
            <p className="text-xl md:text-2xl text-muted-foreground mb-4 font-semibold">
              TRAIN. HEAL. GROW.
            </p>
            
            <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
              Your DNA, Your Wellness, Your Way. Experience the future of personalized wellness with DNA-based programs, cutting-edge recovery therapies, and elite facilities.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/discover-clubs">
                <Button size="lg" className="btn-fitness text-lg px-8">
                  Discover Clubs
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Button 
                size="lg" 
                variant="outline"
                className="text-lg px-8"
                onClick={() => setCallbackFormOpen(true)}
              >
                Get Started
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Elite Facilities Section */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <Badge variant="secondary" className="mb-4">Elite Facilities</Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Cutting-Edge Wellness Technology
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Experience world-class facilities designed for optimal health, recovery, and longevity
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {facilities.map((facility, index) => (
              <Card key={index} className="group hover:shadow-xl transition-all duration-300 border-primary/10 hover:border-primary/30">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="p-3 rounded-lg bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                      <facility.icon className="h-6 w-6" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold mb-2">{facility.title}</h3>
                      <p className="text-sm text-muted-foreground">{facility.description}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* DNA-Based Programs Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <Badge variant="secondary" className="mb-4">
              <Dna className="mr-2 h-4 w-4" />
              DNA-Powered Programs
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Personalized Wellness Programs
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Tailored by science, delivered by Fitflix. Transform your health with programs designed for your unique genetic profile
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

      {/* Why Choose Us Section */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <Badge variant="secondary" className="mb-4">Why Fitflix Wellness Clubs</Badge>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                The Future of Wellness is Here
              </h2>
              <p className="text-lg text-muted-foreground mb-8">
                Fitflix Wellness Clubs combine cutting-edge technology, personalized DNA insights, and expert guidance to deliver transformative wellness experiences.
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
                <Link to="/discover-clubs">
                  <Button size="lg" className="btn-fitness">
                    Explore Clubs
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
                  alt="Wellness facilities"
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
      <section className="py-20">
        <div className="container mx-auto px-4">
          <Card className="relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-secondary/10" />
            <CardContent className="relative p-12 text-center">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Ready to Transform Your Wellness?
              </h2>
              <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
                Join Fitflix Wellness Clubs and experience personalized wellness like never before
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to="/discover-clubs">
                  <Button size="lg" className="btn-fitness">
                    Find Your Club
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
                <Button 
                  size="lg" 
                  variant="outline"
                  onClick={() => setCallbackFormOpen(true)}
                >
                  Request Callback
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

export default WellnessClubs;
