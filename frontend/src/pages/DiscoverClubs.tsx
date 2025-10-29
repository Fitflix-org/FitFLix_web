import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Search, MapPin, Phone, ArrowRight, Sparkles, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import CallbackForm from "@/components/CallbackForm";
import { useSEO } from "@/hooks/useSEO";
import OptimizedImage from "@/components/OptimizedImage";
import Breadcrumb from "@/components/Breadcrumb";
import { getAllWellnessClubs, type GymClub } from "@/data/gymsAndClubs";

interface ClubWithDistance extends GymClub {
  distance?: number | null;
}

const DiscoverClubs = () => {
  useSEO({
    title: "Discover Wellness Clubs | Fitflix - DNA-Based Personalized Wellness",
    description: "Find Fitflix Wellness Clubs near you. Experience DNA-based personalized wellness programs, cryotherapy, HBOT, infrared sauna, and advanced recovery therapies.",
    keywords: "wellness clubs, DNA testing, cryotherapy, HBOT, infrared sauna, Sainikpuri wellness, Hyderabad wellness club, personalized wellness",
    ogTitle: "Discover Wellness Clubs | Fitflix",
    ogDescription: "Find Fitflix Wellness Clubs with cutting-edge facilities and DNA-based personalized programs.",
    canonical: "https://fitflix.in/discover-clubs"
  });

  const [searchQuery, setSearchQuery] = useState("");
  const [callbackFormOpen, setCallbackFormOpen] = useState(false);
  const [userLocation, setUserLocation] = useState<{lat: number, lng: number} | null>(null);
  const navigate = useNavigate();

  // Get all wellness clubs (both active and coming soon)
  const [clubs] = useState(getAllWellnessClubs());

  // Get user location from cookies
  useEffect(() => {
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

    const savedLocation = getCookie('userLocation');
    if (savedLocation) {
      try {
        const location = JSON.parse(savedLocation);
        setUserLocation(location);
      } catch (error) {
        console.error('Error parsing saved location:', error);
      }
    }
  }, []);

  // Calculate distance using Haversine formula
  const calculateDistance = (lat1: number, lon1: number, lat2: number, lon2: number): number => {
    const R = 6371;
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;
    const a = 
      Math.sin(dLat/2) * Math.sin(dLat/2) +
      Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * 
      Math.sin(dLon/2) * Math.sin(dLon/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    return R * c;
  };

  // Filter and sort clubs
  const filteredClubs = clubs
    .filter(club => {
      const searchLower = searchQuery.toLowerCase();
      return club.name.toLowerCase().includes(searchLower) ||
             club.address.toLowerCase().includes(searchLower);
    })
    .map(club => ({
      ...club,
      distance: userLocation 
        ? calculateDistance(
            userLocation.lat, 
            userLocation.lng, 
            parseFloat(club.latitude), 
            parseFloat(club.longitude)
          )
        : null
    }))
    .sort((a, b) => {
      // Sort active clubs first
      if (a.status === 'active' && b.status !== 'active') return -1;
      if (a.status !== 'active' && b.status === 'active') return 1;
      
      // Then sort by distance if available
      if (userLocation && a.distance !== null && b.distance !== null) {
        return a.distance - b.distance;
      }
      return 0;
    });

  const handleViewDetails = (club: ClubWithDistance) => {
    navigate(`/wellness-club/${club.id}`);
  };

  return (
    <div className="min-h-screen pt-16">
      <div className="container mx-auto px-4 py-8">
        <Breadcrumb />
        
        {/* Header */}
        <div className="relative text-center mb-12">
          <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-secondary/20 rounded-2xl overflow-hidden">
            <OptimizedImage 
              src="/src/assets/hero-fitness.jpg" 
              alt="Wellness Clubs"
              className="w-full h-full object-cover opacity-30"
              width={1200}
              height={300}
            />
          </div>
          <div className="relative z-10 py-12 px-6">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 text-white drop-shadow-lg">
              Discover <span className="text-primary">Wellness</span>{" "}
              <span className="text-secondary">Clubs</span>
            </h1>
            <p className="text-base md:text-lg text-white/90 max-w-2xl mx-auto px-4 drop-shadow-md">
              Experience DNA-based personalized wellness, advanced recovery therapies, and elite facilities
            </p>
          </div>
        </div>

        {/* Search Bar */}
        <div className="flex flex-col gap-4 mb-8">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              placeholder="Search wellness clubs by name or location..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        {/* Results Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div className="flex flex-col gap-1">
            <p className="text-muted-foreground">
              <span className="text-primary font-semibold">{filteredClubs.length}</span> wellness clubs found
            </p>
            {userLocation && (
              <p className="text-xs text-muted-foreground">
                Sorted by distance from your location
              </p>
            )}
          </div>
          <Link to="/wellness-clubs">
            <Button variant="outline">
              <Sparkles className="mr-2 h-4 w-4" />
              About Wellness Clubs
            </Button>
          </Link>
        </div>

        {/* Clubs Grid */}
        <div className="grid lg:grid-cols-1 gap-6">
          {filteredClubs.map((club) => (
            <Card key={club.id} className="group hover:shadow-xl transition-all duration-300 border-primary/10 hover:border-primary/30">
              <CardContent className="p-6">
                <div className="grid lg:grid-cols-3 gap-6 items-stretch">
                  {/* Image */}
                  <div className="lg:col-span-1">
                    <div className="relative h-full min-h-[200px] rounded-lg overflow-hidden bg-gradient-to-br from-primary/10 to-secondary/10">
                      <OptimizedImage 
                        src="/src/assets/hero-fitness.jpg" 
                        alt={club.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        width={600}
                        height={400}
                        sizes="(max-width: 1024px) 100vw, 33vw"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />
                      <div className="absolute top-3 right-3 flex flex-col gap-2">
                        {club.status === 'coming-soon' ? (
                          <Badge className="bg-primary/90 text-primary-foreground border-0">
                            <Sparkles className="mr-2 h-4 w-4" />
                            Coming Soon
                          </Badge>
                        ) : (
                          <Badge variant="secondary" className="bg-green-500/20 text-green-500 border-green-500/30">
                            ✓ Now Open
                          </Badge>
                        )}
                        <Badge variant="outline" className="bg-background/80 text-foreground border-foreground/20 text-xs">
                          ✨ Wellness Club
                        </Badge>
                      </div>
                    </div>
                  </div>

                  {/* Details */}
                  <div className="lg:col-span-2 space-y-4">
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">
                          {club.name}
                        </h3>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-3">
                          <MapPin className="h-4 w-4" />
                          <span>{club.address.split(',')[0]}, {club.address.split(',')[1]}</span>
                          {club.distance !== null && club.distance !== undefined && (
                            <span className="text-primary font-medium">
                              • {club.distance.toFixed(1)} km away
                            </span>
                          )}
                        </div>
                        {club.status === 'coming-soon' && club.opening_date && (
                          <div className="flex items-center gap-2 text-sm text-primary font-semibold mb-2">
                            <Calendar className="h-4 w-4" />
                            <span>Opening in {club.opening_date}</span>
                          </div>
                        )}
                      </div>
                    </div>

                    <p className="text-muted-foreground leading-relaxed">
                      {club.description}
                    </p>

                    {/* Amenities */}
                    <div className="flex flex-wrap gap-2">
                      {club.amenities.slice(0, 5).map((amenity, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {amenity}
                        </Badge>
                      ))}
                      {club.amenities.length > 5 && (
                        <Badge variant="outline" className="text-xs">
                          +{club.amenities.length - 5} more
                        </Badge>
                      )}
                    </div>

                    {/* Action Buttons */}
                    <div className="flex flex-col sm:flex-row gap-3 pt-2">
                      <Button 
                        className="btn-fitness flex-1 sm:flex-none"
                        onClick={() => handleViewDetails(club)}
                      >
                        {club.status === 'coming-soon' ? 'Learn More' : 'View Details'}
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                      <Button 
                        variant="outline" 
                        className="flex-1 sm:flex-none"
                        onClick={() => setCallbackFormOpen(true)}
                      >
                        <Phone className="mr-2 h-4 w-4" />
                        {club.status === 'coming-soon' ? 'Get Notified' : 'Contact Us'}
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* CTA Section */}
        {filteredClubs.length === 0 && (
          <Card className="p-12 text-center">
            <Sparkles className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
            <h2 className="text-2xl font-bold mb-2">No clubs found</h2>
            <p className="text-muted-foreground mb-6">
              Try adjusting your search or explore our gyms
            </p>
            <Link to="/discover-gym">
              <Button>Explore Gyms</Button>
            </Link>
          </Card>
        )}
      </div>

      <CallbackForm open={callbackFormOpen} onOpenChange={setCallbackFormOpen} />
    </div>
  );
};

export default DiscoverClubs;
