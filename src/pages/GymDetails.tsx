
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Star, MapPin, Phone, Mail, Clock, ArrowLeft, Dumbbell } from "lucide-react";

const GymDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  // Mock gym data - in a real app, this would come from an API
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

  const gym = gyms.find(g => g.id === parseInt(id || "1"));

  if (!gym) {
    return (
      <div className="min-h-screen bg-background pt-20 flex items-center justify-center px-4">
        <div className="text-center">
          <h1 className="text-xl sm:text-2xl font-bold mb-4">Gym not found</h1>
          <Button onClick={() => navigate("/discover-gym")}>
            Back to Discover Gyms
          </Button>
        </div>
      </div>
    );
  }

  // Mock detailed gym data
  const gymDetails = {
    fullAddress: "123 Fitness Street, Bandra West, Mumbai 400050",
    phone: "+91 9876543210",  
    email: `${gym.name.toLowerCase().replace(/\s+/g, '')}@fitflix.com`,
    timings: {
      "Monday - Friday": "5:00 AM - 11:00 PM",
      "Saturday": "6:00 AM - 10:00 PM", 
      "Sunday": "7:00 AM - 9:00 PM"
    }
  };

  return (
    <div className="min-h-screen bg-background pt-16 sm:pt-20">
      <div className="container mx-auto px-4 py-4 sm:py-8">
        {/* Back Button */}
        <Button 
          variant="outline" 
          onClick={() => navigate("/discover-gym")}
          className="mb-4 sm:mb-6 flex items-center gap-2 text-sm"
        >
          <ArrowLeft className="h-4 w-4" />
          <span className="hidden sm:inline">Back to Discover Gyms</span>
          <span className="sm:hidden">Back</span>
        </Button>

        {/* Header */}
        <div className="mb-6 sm:mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
            <div className="flex flex-col gap-3">
              <h1 className="text-2xl sm:text-3xl font-bold">{gym.name}</h1>
              <div className="flex items-center gap-2 flex-wrap">
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-4 w-4 ${
                        i < Math.floor(gym.rating)
                          ? "fill-yellow-400 text-yellow-400"
                          : "text-gray-300"
                      }`}
                    />
                  ))}
                  <span className="text-sm font-medium ml-1">{gym.rating}/5</span>
                </div>
                <span className="text-sm text-muted-foreground">• {gym.distance}</span>
              </div>
            </div>
            <Button className="bg-yellow-500 hover:bg-yellow-600 text-black font-semibold text-sm sm:text-base px-4 py-2 sm:px-6 sm:py-3">
              <span className="hidden sm:inline">See Membership Options</span>
              <span className="sm:hidden">Membership</span>
            </Button>
          </div>
          
          <div className="flex items-center gap-2 flex-wrap">
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

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
          {/* Left Column - Main Content */}
          <div className="lg:col-span-2 space-y-4 sm:space-y-6">
            {/* Video Section */}
            <Card>
              <CardContent className="p-0">
                <div className="aspect-video bg-gradient-to-br from-primary/20 to-secondary/20 rounded-lg flex items-center justify-center">
                  <div className="text-center px-4">
                    <div className="w-12 h-12 sm:w-16 sm:h-16 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
                      <div className="w-0 h-0 border-l-[10px] sm:border-l-[12px] border-l-primary border-y-[6px] sm:border-y-[8px] border-y-transparent ml-1"></div>
                    </div>
                    <p className="text-sm sm:text-base text-muted-foreground">Gym Tour Video</p>
                    <p className="text-xs sm:text-sm text-muted-foreground">Click to play virtual tour</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Contact Information */}
            <Card>
              <CardContent className="p-4 sm:p-6">
                <h3 className="text-base sm:text-lg font-semibold mb-3 sm:mb-4">Contact Information</h3>
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <MapPin className="h-4 w-4 sm:h-5 sm:w-5 text-primary mt-0.5 flex-shrink-0" />
                    <div className="min-w-0 flex-1">
                      <p className="font-medium text-sm sm:text-base">Address:</p>
                      <p className="text-blue-600 hover:underline cursor-pointer text-sm sm:text-base break-words">{gymDetails.fullAddress}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Phone className="h-4 w-4 sm:h-5 sm:w-5 text-primary flex-shrink-0" />
                    <div>
                      <p className="font-medium text-sm sm:text-base">Phone:</p>
                      <p className="text-blue-600 hover:underline cursor-pointer text-sm sm:text-base">{gymDetails.phone}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Mail className="h-4 w-4 sm:h-5 sm:w-5 text-primary flex-shrink-0" />
                    <div>
                      <p className="font-medium text-sm sm:text-base">Email:</p>
                      <p className="text-blue-600 hover:underline cursor-pointer text-sm sm:text-base break-all">{gymDetails.email}</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Amenities */}
            <Card>
              <CardContent className="p-4 sm:p-6">
                <h3 className="text-base sm:text-lg font-semibold mb-3 sm:mb-4">Amenities & Features</h3>
                <div className="flex flex-wrap gap-1.5 sm:gap-2">
                  {gym.amenities.map((amenity, index) => (
                    <Badge key={index} variant="outline" className="px-2 py-1 sm:px-3 text-xs">
                      {amenity}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Special Offer */}
            <Card className="bg-red-500 text-white">
              <CardContent className="p-4 sm:p-6">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-xl sm:text-2xl">🎉</span>
                  <h3 className="text-base sm:text-lg font-bold">Special Offer!</h3>
                </div>
                <p className="text-sm sm:text-base">Join now and get 20% off on your first month membership + Free personal training session!</p>
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Gym Timings */}
          <div className="lg:col-span-1">
            <Card>
              <CardContent className="p-4 sm:p-6">
                <div className="flex items-center gap-2 mb-3 sm:mb-4">
                  <Clock className="h-4 w-4 sm:h-5 sm:w-5 text-primary" />
                  <h3 className="text-base sm:text-lg font-semibold">Gym Timings</h3>
                </div>
                <div className="space-y-2 sm:space-y-3">
                  {Object.entries(gymDetails.timings).map(([day, hours]) => (
                    <div key={day} className="flex justify-between items-start gap-2">
                      <span className="font-medium text-sm sm:text-base flex-shrink-0">{day}:</span>
                      <span className="text-right text-sm sm:text-base">{hours}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row justify-center gap-3 pt-6 sm:pt-8">
          <Button className="btn-fitness text-sm sm:text-base px-4 py-2 sm:px-6 sm:py-3">
            Get Directions
          </Button>
          <Button className="bg-red-500 hover:bg-red-600 text-white text-sm sm:text-base px-4 py-2 sm:px-6 sm:py-3">
            📞 <span className="hidden sm:inline">Enquire Now</span>
            <span className="sm:hidden">Enquire</span>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default GymDetails;
