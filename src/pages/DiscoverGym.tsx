
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Search, Filter, MapPin, Clock, Star, Users, Wifi, Car, Dumbbell } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const DiscoverGym = () => {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  const gyms = [
    {
      id: 1,
      name: "PowerZone Elite",
      type: "Strength Training",
      price: "$59/month",
      rating: 4.9,
      image: "/lovable-uploads/0ccb432e-164d-4322-b309-3f9f6ca9d70e.png",
      location: "Downtown District",
      distance: "0.5 miles",
      likes: "2.5K+",
      hours: "24/7",
      verified: true,
      amenities: ["Free WiFi", "Parking", "Personal Training", "Group Classes", "+1 more"]
    },
    {
      id: 2,
      name: "Zen Fitness Studio",
      type: "Yoga & Wellness",
      price: "$45/month",
      rating: 4.8,
      image: "/lovable-uploads/0ccb432e-164d-4322-b309-3f9f6ca9d70e.png",
      location: "Midtown",
      distance: "1.2 miles",
      likes: "1.8K+",
      hours: "5 AM - 11 PM",
      verified: true,
      amenities: ["Pool", "Yoga Studio", "Free WiFi", "Meditation Room"]
    },
    {
      id: 3,
      name: "Iron Paradise",
      type: "Powerlifting",
      price: "$69/month",
      rating: 4.9,
      image: "/lovable-uploads/0ccb432e-164d-4322-b309-3f9f6ca9d70e.png",
      location: "North Side",
      distance: "2.1 miles",
      likes: "3.2K+",
      hours: "5 AM - 10 PM",
      verified: true,
      amenities: ["Heavy Weights", "Powerlifting", "Crossfit", "Nutrition Bar"]
    },
    {
      id: 4,
      name: "FlexFit Studio",
      type: "HIIT & Cardio",
      price: "$55/month",
      rating: 4.7,
      image: "/lovable-uploads/0ccb432e-164d-4322-b309-3f9f6ca9d70e.png",
      location: "South District",
      distance: "1.8 miles",
      likes: "1.9K+",
      hours: "6 AM - 10 PM",
      verified: true,
      amenities: ["Cardio Equipment", "HIIT Classes", "Free WiFi", "Locker Rooms"]
    },
    {
      id: 5,
      name: "AquaFit Center",
      type: "Swimming & Aqua",
      price: "$75/month",
      rating: 4.6,
      image: "/lovable-uploads/0ccb432e-164d-4322-b309-3f9f6ca9d70e.png",
      location: "East Side",
      distance: "3.0 miles",
      likes: "2.1K+",
      hours: "5 AM - 11 PM",
      verified: true,
      amenities: ["Olympic Pool", "Aqua Classes", "Sauna", "Steam Room"]
    },
    {
      id: 6,
      name: "Peak Performance",
      type: "Athletic Training",
      price: "$85/month",
      rating: 4.9,
      image: "/lovable-uploads/0ccb432e-164d-4322-b309-3f9f6ca9d70e.png",
      location: "West End",
      distance: "2.5 miles",
      likes: "2.8K+",
      hours: "5 AM - 11 PM",
      verified: true,
      amenities: ["Sports Training", "Recovery Center", "Nutrition Coaching", "Performance Testing"]
    }
  ];

  const filteredGyms = gyms.filter(gym =>
    gym.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    gym.type.toLowerCase().includes(searchQuery.toLowerCase()) ||
    gym.location.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleViewDetails = (gym: any) => {
    navigate(`/gym/${gym.id}`);
  };

  return (
    <div className="min-h-screen bg-background pt-20">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
            Discover Your <span className="text-primary">Perfect</span>{" "}
            <span className="text-secondary">Gym</span>
          </h1>
          <p className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto px-4">
            Find the best fitness centers in your area with AI-powered recommendations and detailed insights
          </p>
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
          <p className="text-muted-foreground">
            <span className="text-primary font-semibold">{filteredGyms.length}</span> gyms found
          </p>
          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground">View:</span>
            <Button
              variant={viewMode === "grid" ? "default" : "outline"}
              size="sm"
              onClick={() => setViewMode("grid")}
            >
              Grid
            </Button>
            <Button
              variant={viewMode === "list" ? "default" : "outline"}
              size="sm"
              onClick={() => setViewMode("list")}
            >
              List
            </Button>
          </div>
        </div>

        {/* Gym Cards */}
        <div className={`grid gap-6 ${viewMode === "grid" ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3" : "grid-cols-1"}`}>
          {filteredGyms.map((gym) => (
            <Card key={gym.id} className="overflow-hidden hover:shadow-lg transition-shadow">
              <div className="relative">
                <div className="h-48 bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center">
                  <Dumbbell className="h-16 w-16 text-primary/40" />
                </div>
                <div className="absolute top-4 left-4 flex flex-wrap gap-2">
                  <Badge variant="secondary" className="text-xs">{gym.type}</Badge>
                  <Badge className="bg-primary text-primary-foreground text-xs">
                    {gym.price}
                  </Badge>
                  {gym.verified && (
                    <Badge variant="outline" className="bg-green-500/10 text-green-500 border-green-500 text-xs">
                      ✓ Verified
                    </Badge>
                  )}
                </div>
              </div>

              <CardContent className="p-4 sm:p-6">
                <div className="flex items-start justify-between mb-3">
                  <h3 className="text-lg sm:text-xl font-bold">{gym.name}</h3>
                  <div className="flex items-center gap-1">
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <span className="text-sm font-medium">{gym.rating}</span>
                  </div>
                </div>

                <div className="space-y-2 mb-4">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground flex-wrap">
                    <MapPin className="h-4 w-4 flex-shrink-0" />
                    <span>{gym.location}</span>
                    <span>•</span>
                    <span>{gym.distance}</span>
                    <Users className="h-4 w-4 ml-2 flex-shrink-0" />
                    <span>{gym.likes}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Clock className="h-4 w-4 flex-shrink-0" />
                    <span>{gym.hours}</span>
                  </div>
                </div>

                <div className="mb-4">
                  <p className="text-sm font-medium mb-2">Amenities</p>
                  <div className="flex flex-wrap gap-1">
                    {gym.amenities.map((amenity, index) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        {amenity}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-2">
                  <Button 
                    className="flex-1 btn-fitness"
                    onClick={() => handleViewDetails(gym)}
                  >
                    View Details
                  </Button>
                  <Button variant="outline" className="flex-1">
                    Get Directions
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DiscoverGym;
