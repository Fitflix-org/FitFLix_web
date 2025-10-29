
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Search, Filter, MapPin, Clock, Star, Users, Wifi, Car, Dumbbell, ArrowRight, Phone, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import CallbackForm from "@/components/CallbackForm";
import { useSEO } from "@/hooks/useSEO";
import OptimizedImage from "@/components/OptimizedImage";
import { Link } from "react-router-dom";
import Breadcrumb from "@/components/Breadcrumb";
import { getActiveGymsAndClubs, type GymClub } from "@/data/gymsAndClubs";

interface GymClubWithDistance extends GymClub {
  distance?: number | null;
}

const DiscoverGym = () => {
  useSEO({
    title: "Discover Premium Gyms & Wellness Clubs | Fitflix",
    description: "Find the best gyms and wellness clubs in Bangalore and Hyderabad including Marathahalli, Electronic City, Brookefield, and Sainikpuri. Premium fitness centers with modern equipment, personal training, and advanced wellness therapies.",
    keywords: "gyms Bangalore, wellness clubs, fitness centers, Marathahalli gym, Electronic City gym, Brookefield gym, Sainikpuri wellness, personal training, group classes, cryotherapy, DNA testing, premium fitness",
    ogTitle: "Discover Premium Gyms & Wellness Clubs | Fitflix",
    ogDescription: "Find the best gyms and wellness clubs with state-of-the-art equipment, personal training, and advanced wellness therapies.",
    canonical: "https://fitflix.in/discover-gym"
  });

  const [searchQuery, setSearchQuery] = useState("");
  const [callbackFormOpen, setCallbackFormOpen] = useState(false);
  const [userLocation, setUserLocation] = useState<{lat: number, lng: number} | null>(null);
  const [filterType, setFilterType] = useState<'all' | 'gym' | 'wellness-club'>('all');
  const navigate = useNavigate();

  // Get data from shared source
  const [gymsAndClubs] = useState(getActiveGymsAndClubs());
    {
      id: 1,
      name: "Fitflix Gym - Electronic City Phase I, Bengaluru",
      address: "94, 3rd floor above Domino's, Opp- Ajmera Infinity, Neeladri Road, EC Phase, 1, Bengaluru, Karnataka 560100",
      latitude: "12.8441",
      longitude: "77.6675",
      phone_number: "+91 99456 82792",
      email: "info@fitflix.in",
      opening_time: "1970-01-01T06:30:00.000Z",
      closing_time: "1970-01-01T22:30:00.000Z",
      holiday_dates: [],
      description: "Fitflix Gym Electronic City Phase I offers facilities like Parking, Personal Training, Group Classes, Free Trial, Shower, Nutritional Support, Locker room, Certified Trainers.",
      rating: 4.8,
      amenities: ["Parking", "Personal Training", "Group Classes", "Shower", "Locker room"],
      is_deleted: false,
      verified: true,
    },

    {
      id: 2,
      name: "FITFLIX GYM MARATHAHALLI - Best gym in Marathahalli",
      address: "4th floor, Kishan icon, SOUL SPACE PARADIGM, 90/2, next to IRONHILL, above BARKAAZ, Marathahalli Village, Marathahalli, Bengaluru, Karnataka 560037, India",
      latitude: "12.9512291",
      longitude: "77.6994058",
      phone_number: "+91 89043 91501",
      email: "info@fitflix.in",
      opening_time: "1970-01-01T06:00:00.000Z",
      closing_time: "1970-01-01T22:30:00.000Z",
      holiday_dates: [],
      description: "FITFLIX GYM MARATHAHALLI is one of the best gyms in Marathahalli, Bengaluru. Located on the 4th floor of Kishan Icon, SOUL SPACE PARADIGM, next to IRONHILL and above BARKAAZ. Known for its modern equipment, professional trainers, and excellent fitness programs. Perfect location for fitness enthusiasts in the Marathahalli area.",
      rating: 4.5,
      amenities: ["Modern Equipment", "Professional Trainers", "Fitness Programs", "Cardio Zone", "Strength Training", "Group Classes", "Website Available"],
      is_deleted: false,
      verified: true,
    },
    {
      id: 3,
      name: "FITFLIX GYM BROOKFIELD",
      address: "3rd floor, Above Bata showroom Aecs layout, Lakshminarayana Pura, BEML Layout, Brookefield, Bengaluru, Karnataka 560037, India",
      latitude: "12.9716",
      longitude: "77.7506",
      phone_number: "+91 99456 82973",
      email: "info@fitflix.in",
      opening_time: "1970-01-01T06:00:00.000Z",
      closing_time: "1970-01-01T22:30:00.000Z",
      holiday_dates: [],
      description: "FITFLIX GYM BROOKFIELD is a premium fitness center located in Brookefield, Bengaluru. Situated on the 3rd floor above Bata showroom in AECS layout, this gym offers state-of-the-art equipment and professional training services. Perfect for fitness enthusiasts in the Brookefield and BEML Layout area.",
      rating: 4.8,
      amenities: ["Premium Equipment", "Professional Trainers", "Fitness Programs", "Cardio Zone", "Strength Training", "Group Classes", "Instagram Available"],
      is_deleted: false,
      verified: true,
    },
  ]);

  const [loading] = useState(false); // No longer loading from API
  const [error] = useState(""); // No API errors

  // Get user location from cookies on component mount
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

  // Calculate distance between two coordinates using Haversine formula
  const calculateDistance = (lat1: number, lon1: number, lat2: number, lon2: number): number => {
    const R = 6371; // Radius of the Earth in kilometers
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;
    const a = 
      Math.sin(dLat/2) * Math.sin(dLat/2) +
      Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * 
      Math.sin(dLon/2) * Math.sin(dLon/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    const distance = R * c; // Distance in kilometers
    return distance;
  };

  // Filter and sort gyms
  const filteredGyms = gyms
    .filter(gym =>
      gym.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      gym.address.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .map(gym => ({
      ...gym,
      distance: userLocation 
        ? calculateDistance(
            userLocation.lat, 
            userLocation.lng, 
            parseFloat(gym.latitude), 
            parseFloat(gym.longitude)
          )
        : null
    }))
    .sort((a, b) => {
      // If user location is available, sort by distance
      if (userLocation && a.distance !== null && b.distance !== null) {
        return a.distance - b.distance;
      }
      // Otherwise, sort by rating (highest first)
      return b.rating - a.rating;
    });

  const handleViewDetails = (gym: Gym) => {
    navigate(`/gym/${gym.id}`);
  };

  return (
    <div className="min-h-screen pt-16">
      <div className="container mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <Breadcrumb />
        
        {/* Header */}
        <div className="relative text-center mb-12">
          <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-secondary/20 rounded-2xl overflow-hidden">
            <OptimizedImage 
              src="/src/assets/hero-fitness.jpg" 
              alt="Fitness background"
              className="w-full h-full object-cover opacity-30"
              width={1200}
              height={300}
            />
          </div>
          <div className="relative z-10 py-12 px-6">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 text-white drop-shadow-lg">
              Discover Your <span className="text-primary">Perfect</span>{" "}
              <span className="text-secondary">Gym</span>
            </h1>
            <p className="text-base md:text-lg text-white/90 max-w-2xl mx-auto px-4 drop-shadow-md">
              Find the best fitness centers in your area with AI-powered recommendations and detailed insights
            </p>
          </div>
        </div>
        {/* Search and Filters */}
        <div className="flex flex-col gap-4 mb-8">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              placeholder="Search gyms by name, location, or specialty..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          <div className="flex flex-col sm:flex-row gap-4">
            <Select defaultValue="all">
              <SelectTrigger className="w-full sm:w-[180px]">
                <SelectValue placeholder="All Gyms" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Gyms</SelectItem>
                <SelectItem value="strength">Strength Training</SelectItem>
                <SelectItem value="yoga">Yoga & Wellness</SelectItem>
                <SelectItem value="powerlifting">Powerlifting</SelectItem>
                <SelectItem value="cardio">HIIT & Cardio</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline" className="flex items-center gap-2">
              <Filter className="h-4 w-4" />
              Filter
            </Button>
          </div>
        </div>
        {/* Results Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div className="flex flex-col gap-1">
            <p className="text-muted-foreground">
              <span className="text-primary font-semibold">{filteredGyms.length}</span> gyms found
            </p>
            {userLocation && (
              <p className="text-xs text-muted-foreground">
                Sorted by distance from your location
              </p>
            )}
          </div>
        </div>
        {/* Enhanced Gym Cards with Better Internal Linking */}
        <div className="grid lg:grid-cols-1 gap-6">
          {filteredGyms.map((gym) => (
            <Card key={gym.id} className="group hover:shadow-xl transition-all duration-300 border-primary/10 hover:border-primary/30">
              <CardContent className="p-6">
                <div className="grid lg:grid-cols-3 gap-6 items-stretch">
                  {/* Gym Image */}
                  <div className="lg:col-span-1">
                    <div className="relative h-full min-h-[200px] rounded-lg overflow-hidden bg-gradient-to-br from-primary/10 to-secondary/10">
                      {gym.id === 1 ? (
                        // Electronic City gym - Single image
                        <OptimizedImage 
                          src="https://lh3.googleusercontent.com/p/AF1QipOx2pRaqdWCA4GzBMHvm_viNbAvGSZ6qEPpTpxF=w203-h152-k-no" 
                          alt={gym.name}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          width={600}
                          height={400}
                          sizes="(max-width: 1024px) 100vw, 33vw"
                        />
                      ) : gym.id === 2 ? (
                        // Marathahalli gym - use the poster image
                        <OptimizedImage 
                          src="/media/1714407900720.jpeg" 
                          alt={gym.name}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          width={600}
                          height={400}
                          sizes="(max-width: 1024px) 100vw, 33vw"
                        />
                      ) : gym.id === 3 ? (
                        // Brookfield gym
                        <OptimizedImage 
                          src="https://lh3.googleusercontent.com/p/AF1QipPhE2xLhB1-TR_c9bpJCRKVDhum7mQvFY10iZRo=w203-h138-k-no" 
                          alt={gym.name}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          width={600}
                          height={400}
                          sizes="(max-width: 1024px) 100vw, 33vw"
                        />
                      ) : (
                        // Fallback image
                        <OptimizedImage 
                          src="/src/assets/hero-fitness.jpg" 
                          alt={gym.name}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          width={600}
                          height={400}
                          sizes="(max-width: 1024px) 100vw, 33vw"
                        />
                      )}
                      <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />
                      <div className="absolute top-3 right-3 flex flex-col gap-2">
                        <Badge variant="secondary" className="bg-primary/20 text-primary border-primary/30">
                          {gym.verified ? 'Verified' : 'Unverified'}
                        </Badge>
                        <Badge variant="outline" className="bg-background/80 text-foreground border-foreground/20 text-xs">
                          {gym.id === 1 ? 'Electronic City' : gym.id === 2 ? 'Marathahalli' : 'Brookefield'}
                        </Badge>
                      </div>
                    </div>
                  </div>

                  {/* Gym Details */}
                  <div className="lg:col-span-2 space-y-4">
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">
                          {gym.name}
                        </h3>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-3">
                          <MapPin className="h-4 w-4" />
                          <span>{gym.address.split(',')[0]}, {gym.address.split(',')[1]}</span>
                          {gym.distance !== null && gym.distance !== undefined && (
                            <span className="text-primary font-medium">
                              • {gym.distance.toFixed(1)} km away
                            </span>
                          )}
                        </div>
                      </div>
                      <div className="flex items-center gap-1">
                        <Star className="h-4 w-4 text-yellow-500 fill-current" />
                        <span className="font-semibold">{gym.rating}</span>
                      </div>
                    </div>

                    <p className="text-muted-foreground leading-relaxed">
                      {gym.description}
                    </p>

                    {/* Amenities */}
                    <div className="flex flex-wrap gap-2">
                      {gym.amenities.slice(0, 5).map((amenity, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {amenity}
                        </Badge>
                      ))}
                      {gym.amenities.length > 5 && (
                        <Badge variant="outline" className="text-xs">
                          +{gym.amenities.length - 5} more
                        </Badge>
                      )}
                    </div>

                    {/* Gym Hours */}
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Clock className="h-4 w-4" />
                      <span>
                        {new Date(gym.opening_time).toLocaleTimeString('en-US', { 
                          hour: '2-digit', 
                          minute: '2-digit',
                          hour12: true 
                        })} - {new Date(gym.closing_time).toLocaleTimeString('en-US', { 
                          hour: '2-digit', 
                          minute: '2-digit',
                          hour12: true 
                        })}
                      </span>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex flex-col sm:flex-row gap-3 pt-2">
                      <Button 
                        className="btn-fitness flex-1 sm:flex-none"
                        onClick={() => navigate(`/gym/${gym.id}`)}
                      >
                        View Details
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                      <Button 
                        variant="outline" 
                        className="flex-1 sm:flex-none"
                        onClick={() => setCallbackFormOpen(true)}
                      >
                        <Phone className="mr-2 h-4 w-4" />
                        Get Callback
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Related Content Section */}
        <div className="mt-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold gradient-text mb-4">
              Explore the Complete Fitflix Experience
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Beyond our premium gyms, discover our comprehensive fitness ecosystem
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="group hover:shadow-xl transition-all duration-300 border-primary/10 hover:border-primary/30">
              <CardContent className="p-6">
                <div className="text-center space-y-4">
                  <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mx-auto group-hover:scale-110 transition-transform">
                    <Dumbbell className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold">Premium Gyms</h3>
                  <p className="text-muted-foreground">
                    State-of-the-art facilities with modern equipment and certified trainers
                  </p>
                  <Button variant="outline" className="w-full" asChild>
                    <Link to="/services">
                      Learn More
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card className="group hover:shadow-xl transition-all duration-300 border-primary/10 hover:border-primary/30">
              <CardContent className="p-6">
                <div className="text-center space-y-4">
                  <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mx-auto group-hover:scale-110 transition-transform">
                    <div className="w-8 h-8 bg-primary rounded"></div>
                  </div>
                  <h3 className="text-xl font-bold">Workout App</h3>
                  <p className="text-muted-foreground">
                    1000+ minutes of professional training across 10 categories
                  </p>
                  <Button variant="outline" className="w-full" asChild>
                    <Link to="/services">
                      Coming Soon
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card className="group hover:shadow-xl transition-all duration-300 border-primary/10 hover:border-primary/30">
              <CardContent className="p-6">
                <div className="text-center space-y-4">
                  <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mx-auto group-hover:scale-110 transition-transform">
                    <div className="w-8 h-8 bg-primary rounded"></div>
                  </div>
                  <h3 className="text-xl font-bold">Nutrition Products</h3>
                  <p className="text-muted-foreground">
                    Premium supplements for optimal performance and recovery
                  </p>
                  <Button variant="outline" className="w-full" asChild>
                    <Link to="/services">
                      Shop Now
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
        
        {/* Callback Form */}
        <CallbackForm
          isOpen={callbackFormOpen}
          onClose={() => setCallbackFormOpen(false)}
        />
      </div>
    </div>
  );
};

export default DiscoverGym;
