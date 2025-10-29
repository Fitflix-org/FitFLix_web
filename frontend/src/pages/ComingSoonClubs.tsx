import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MapPin, Phone, Mail, Sparkles, Calendar, ArrowRight } from "lucide-react";
import { useSEO } from "@/hooks/useSEO";
import Breadcrumb from "@/components/Breadcrumb";
import OptimizedImage from "@/components/OptimizedImage";
import { getComingSoonClubs } from "@/data/gymsAndClubs";
import CallbackForm from "@/components/CallbackForm";
import { useState } from "react";

const ComingSoonClubs = () => {
  const [callbackFormOpen, setCallbackFormOpen] = useState(false);
  const comingSoonClubs = getComingSoonClubs();

  useSEO({
    title: "Coming Soon - New Wellness Clubs | Fitflix",
    description: "Discover upcoming Fitflix Wellness Clubs with cutting-edge facilities including Cryotherapy, DNA Testing, HBOT, Infrared Sauna, and more. Be the first to know when we launch!",
    keywords: "wellness clubs coming soon, new fitness centers, DNA testing, cryotherapy, HBOT, infrared sauna, Sainikpuri wellness, Hyderabad wellness club",
    ogTitle: "Coming Soon - New Wellness Clubs | Fitflix",
    ogDescription: "Discover upcoming Fitflix Wellness Clubs with cutting-edge facilities and DNA-based personalized wellness programs.",
    canonical: "https://fitflix.in/coming-soon-clubs"
  });

  return (
    <div className="min-h-screen pt-16">
      <div className="container mx-auto px-4 py-8">
        <Breadcrumb />

        {/* Header Section */}
        <div className="relative text-center mb-12 overflow-hidden rounded-2xl">
          <div className="absolute inset-0 bg-gradient-to-r from-primary/30 to-secondary/30">
            <OptimizedImage 
              src="/src/assets/hero-fitness.jpg" 
              alt="Coming Soon"
              className="w-full h-full object-cover opacity-20"
              width={1200}
              height={400}
            />
          </div>
          <div className="relative z-10 py-16 px-6">
            <Badge variant="secondary" className="mb-4 bg-primary/20 text-primary border-primary/30">
              <Sparkles className="mr-2 h-4 w-4" />
              Coming Soon
            </Badge>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 text-white drop-shadow-lg">
              The Future of <span className="text-primary">Wellness</span>{" "}
              <span className="text-secondary">Awaits</span>
            </h1>
            <p className="text-base md:text-lg text-white/90 max-w-2xl mx-auto drop-shadow-md">
              Experience next-generation wellness clubs with DNA-based personalized programs, advanced recovery therapies, and elite facilities
            </p>
          </div>
        </div>

        {/* Coming Soon Clubs Grid */}
        <div className="space-y-8">
          {comingSoonClubs.length > 0 ? (
            comingSoonClubs.map((club) => (
              <Card key={club.id} className="group hover:shadow-2xl transition-all duration-300 border-primary/10 hover:border-primary/30 overflow-hidden">
                <CardContent className="p-0">
                  <div className="grid lg:grid-cols-2 gap-0">
                    {/* Image Section */}
                    <div className="relative h-[300px] lg:h-auto overflow-hidden">
                      <OptimizedImage 
                        src="/src/assets/hero-fitness.jpg" 
                        alt={club.name}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                        width={800}
                        height={600}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent" />
                      <div className="absolute top-4 right-4">
                        <Badge className="bg-primary/90 text-primary-foreground border-0">
                          <Sparkles className="mr-2 h-4 w-4" />
                          Coming Soon
                        </Badge>
                      </div>
                      <div className="absolute bottom-4 left-4 right-4">
                        <Badge variant="outline" className="bg-background/80 text-foreground border-foreground/20">
                          ✨ Premium Wellness Club
                        </Badge>
                      </div>
                    </div>

                    {/* Content Section */}
                    <div className="p-8 space-y-6">
                      <div>
                        <h2 className="text-2xl md:text-3xl font-bold mb-3 group-hover:text-primary transition-colors">
                          {club.name}
                        </h2>
                        <div className="flex items-start gap-2 text-muted-foreground mb-4">
                          <MapPin className="h-5 w-5 flex-shrink-0 mt-0.5" />
                          <span className="text-sm">{club.address}</span>
                        </div>
                      </div>

                      <p className="text-muted-foreground leading-relaxed">
                        {club.description}
                      </p>

                      {/* Opening Date */}
                      {club.opening_date && (
                        <div className="flex items-center gap-2 text-primary font-semibold">
                          <Calendar className="h-5 w-5" />
                          <span>Opening in {club.opening_date}</span>
                        </div>
                      )}

                      {/* Featured Amenities */}
                      <div>
                        <h3 className="text-sm font-semibold mb-3 text-muted-foreground uppercase tracking-wide">
                          Elite Facilities
                        </h3>
                        <div className="flex flex-wrap gap-2">
                          {club.amenities.slice(0, 6).map((amenity, index) => (
                            <Badge key={index} variant="outline" className="text-xs">
                              {amenity}
                            </Badge>
                          ))}
                          {club.amenities.length > 6 && (
                            <Badge variant="outline" className="text-xs">
                              +{club.amenities.length - 6} more
                            </Badge>
                          )}
                        </div>
                      </div>

                      {/* Contact Info */}
                      <div className="space-y-2 text-sm">
                        <div className="flex items-center gap-2 text-muted-foreground">
                          <Phone className="h-4 w-4" />
                          <a href={`tel:${club.phone_number}`} className="hover:text-primary transition-colors">
                            {club.phone_number}
                          </a>
                        </div>
                        <div className="flex items-center gap-2 text-muted-foreground">
                          <Mail className="h-4 w-4" />
                          <a href={`mailto:${club.email}`} className="hover:text-primary transition-colors">
                            {club.email}
                          </a>
                        </div>
                      </div>

                      {/* Action Buttons */}
                      <div className="flex flex-col sm:flex-row gap-3 pt-4">
                        <Link to={`/wellness-club/${club.id}`} className="flex-1">
                          <Button className="w-full btn-fitness">
                            Learn More
                            <ArrowRight className="ml-2 h-4 w-4" />
                          </Button>
                        </Link>
                        <Button 
                          variant="outline" 
                          className="flex-1"
                          onClick={() => setCallbackFormOpen(true)}
                        >
                          <Phone className="mr-2 h-4 w-4" />
                          Get Notified
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          ) : (
            <Card className="p-12 text-center">
              <Sparkles className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
              <h2 className="text-2xl font-bold mb-2">No Upcoming Clubs Yet</h2>
              <p className="text-muted-foreground mb-6">
                We're working on bringing new wellness clubs to your area. Stay tuned!
              </p>
              <Link to="/discover-gym">
                <Button>Explore Active Locations</Button>
              </Link>
            </Card>
          )}
        </div>

        {/* CTA Section */}
        <div className="mt-16 text-center">
          <Card className="p-8 bg-gradient-to-br from-primary/10 to-secondary/10 border-primary/20">
            <h2 className="text-2xl font-bold mb-4">Want to Know More?</h2>
            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
              Be among the first to experience our revolutionary wellness approach. Get notified when we launch in your area!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg" 
                className="btn-fitness"
                onClick={() => setCallbackFormOpen(true)}
              >
                <Phone className="mr-2 h-5 w-5" />
                Request a Callback
              </Button>
              <Link to="/discover-gym">
                <Button size="lg" variant="outline">
                  Explore Active Locations
                </Button>
              </Link>
            </div>
          </Card>
        </div>
      </div>

      {/* Callback Form Modal */}
      <CallbackForm open={callbackFormOpen} onOpenChange={setCallbackFormOpen} />
    </div>
  );
};

export default ComingSoonClubs;
