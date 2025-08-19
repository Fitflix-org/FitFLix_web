
import { useParams, useNavigate, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { 
  Clock, 
  MapPin, 
  Phone, 
  Mail, 
  Star, 
  Users, 
  Wifi, 
  Car, 
  Dumbbell,
  ArrowLeft
} from "lucide-react";
import React, { useState, useEffect, useMemo } from "react";
import CallbackForm from "@/components/CallbackForm";
import { useSEO } from "@/hooks/useSEO";
import OptimizedImage from "@/components/OptimizedImage";
import Breadcrumb from "@/components/Breadcrumb";

const GymDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [callbackFormOpen, setCallbackFormOpen] = useState(false);

  // Local gym data - same as DiscoverGym.tsx

  // Local gym data - same as DiscoverGym.tsx
  const gyms = [
    {
      id: 1,
      name: "Fitflix Gym - Electronic City Phase I, Bengaluru",
      address: "94, 3rd floor above Domino's, Opp- Ajmera Infinity, Neeladri Road, EC Phase, 1, Bengaluru, Karnataka 560100",
      latitude: "12.8441",
      longitude: "77.6675",
      phone_number: "+91 75103 82782",
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
  ];

  const gym = gyms.find(g => g.id === parseInt(id || ""));

  // Memoize SEO data to prevent infinite re-renders
  const seoData = useMemo(() => {
    if (!gym) {
      return {
        title: "Gym Details | Fitflix Fitness Centers",
        description: "Discover premium gym facilities, amenities, and services at Fitflix fitness centers. Find the perfect gym for your fitness journey.",
        keywords: "gym details, fitness facilities, gym amenities, personal training, group classes, gym services, Fitflix gyms"
      };
    }
    
    return {
      title: `${gym.name} | Premium Gym in ${gym.address.split(',')[0]} | Fitflix`,
      description: `${gym.description} Discover ${gym.name}, a premium gym in ${gym.address.split(',')[0]} with state-of-the-art equipment, personal training, and group classes. Join Fitflix today!`,
      keywords: `${gym.name}, gym ${gym.address.split(',')[0]}, fitness center, personal training, group classes, gym amenities, ${gym.amenities?.join(', ')}`,
      ogTitle: `${gym.name} | Premium Gym in ${gym.address.split(',')[0]}`,
      ogDescription: gym.description,
      canonical: `https://fitflix.in/gym/${gym.id}`
    };
  }, [gym]);

  // Always call useSEO with memoized data
  useSEO(seoData);

  if (!gym) {
    return (
      <div className="min-h-screen bg-background pt-20 flex items-center justify-center px-4">
        <div className="text-center">
          <h1 className="text-xl sm:text-2xl font-bold mb-4">Gym not found</h1>
          <Button onClick={() => navigate("/discover-gym")}>Back to Discover Gyms</Button>
        </div>
      </div>
    );
  }

  // Gym details with proper property mapping
  const gymDetails = {
    fullAddress: gym.address,
    phone: gym.phone_number,
    email: gym.email,
    timings: {
      "Monday - Friday": gym.opening_time && gym.closing_time ? `${gym.opening_time.substring(11,16)} - ${gym.closing_time.substring(11,16)}` : "6:00 AM - 10:30 PM",
      "Saturday": "7:00 AM - 10:00 PM",
      "Sunday": "7:00 AM - 10:00 PM"
    }
  };

  // Special timing for Brookfield gym
  const isBrookfieldGym = gym.id === 3;
  if (isBrookfieldGym) {
    gymDetails.timings = {
      "Monday - Friday": "6:00 AM - 10:30 PM",
      "Saturday": "7:00 AM - 10:00 PM",
      "Sunday": "7:00 AM - 10:00 PM"
    };
  }

  return (
    <div className="min-h-screen bg-background pt-16 sm:pt-20">
      <div className="container mx-auto px-4 py-4 sm:py-8">
        {/* Breadcrumb */}
        <Breadcrumb />
        
        {/* Header */}
        <div className="text-center mb-8">
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
               </div>
             </div>
             
             {/* Request Callback Button - Moved to top right */}
             <Button 
               className="bg-red-500 hover:bg-red-600 text-white text-sm px-3 py-2 sm:px-4 sm:py-2 whitespace-nowrap min-w-fit"
               onClick={() => setCallbackFormOpen(true)}
             >
               📞 <span className="hidden sm:inline">Request Callback</span>
               <span className="sm:hidden">Callback</span>
             </Button>
           </div>
           
           <div className="flex items-center gap-2 flex-wrap">
             <Badge variant="secondary" className="text-xs">Premium Gym</Badge>
             <Badge className="bg-primary text-primary-foreground text-xs">
               Premium Membership
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
                         {/* Video/Image Section */}
             <Card>
               <CardContent className="p-0">
                 {gym.id === 2 ? (
                   // Marathahalli gym - Video with image gallery
                   <div className="space-y-4">
                     {/* Main Video */}
                     <video 
                       className="w-full h-full object-cover rounded-lg"
                       autoPlay
                       muted
                       loop
                       poster="/media/1714407900720.jpeg"
                     >
                       <source src="/media/marathalli.mp4" type="video/mp4" />
                       Your browser does not support the video tag.
                     </video>
                     
                     {/* Image Gallery */}
                     <div className="grid grid-cols-2 gap-2 p-4">
                       <div className="aspect-square bg-gradient-to-br from-primary/20 to-secondary/20 rounded-lg flex items-center justify-center">
                         <OptimizedImage 
                           src="https://lh3.googleusercontent.com/p/AF1QipN9cjbNziKUGInZ_sX3ARNKqFwpciPONs77t6uW=w833-h902-p-k-no"
                           alt="Marathahalli Gym Interior"
                           className="w-full h-full object-cover rounded-lg"
                           width={400}
                           height={400}
                           sizes="(max-width: 768px) 50vw, 25vw"
                         />
                         <div className="hidden text-center px-4">
                           <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-3">
                             <div className="w-0 h-0 border-l-[10px] border-l-primary border-y-[6px] border-y-transparent ml-1"></div>
                           </div>
                           <p className="text-sm text-muted-foreground">Gym Interior</p>
                         </div>
                       </div>
                       
                       <div className="aspect-square bg-gradient-to-br from-primary/20 to-secondary/20 rounded-lg flex items-center justify-center">
                         <OptimizedImage 
                           src="https://lh3.googleusercontent.com/p/AF1QipNrPoiJ-cs0g1DbkoAPBO2aJ5zkB2zENxgwKLio=w833-h902-p-k-no"
                           alt="Marathahalli Gym Equipment"
                           className="w-full h-full object-cover rounded-lg"
                           width={400}
                           height={400}
                           sizes="(max-width: 768px) 50vw, 25vw"
                         />
                         <div className="hidden text-center px-4">
                           <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-3">
                             <div className="w-0 h-0 border-l-[10px] border-l-primary border-y-[6px] border-y-transparent ml-1"></div>
                           </div>
                           <p className="text-sm text-muted-foreground">Gym Equipment</p>
                         </div>
                       </div>
                       
                       <div className="aspect-square bg-gradient-to-br from-primary/20 to-secondary/20 rounded-lg flex items-center justify-center">
                         <OptimizedImage 
                           src="https://lh3.googleusercontent.com/p/AF1QipO41rQF9sZ_ayJWfY4hf9W-kCoIHe7fKORhkXF6=w833-h902-p-k-no"
                           alt="Marathahalli Gym Area"
                           className="w-full h-full object-cover rounded-lg"
                           width={400}
                           height={400}
                           sizes="(max-width: 768px) 50vw, 25vw"
                         />
                         <div className="hidden text-center px-4">
                           <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-3">
                             <div className="w-0 h-0 border-l-[10px] border-l-primary border-y-[6px] border-y-transparent ml-1"></div>
                           </div>
                           <p className="text-sm text-muted-foreground">Gym Area</p>
                         </div>
                       </div>
                       
                       <div className="aspect-square bg-gradient-to-br from-primary/20 to-secondary/20 rounded-lg flex items-center justify-center">
                         <OptimizedImage 
                           src="https://lh3.googleusercontent.com/p/AF1QipMZ1AHwv9rhtU1Nx169NZdYnVwn0HKkArjbE5AU=w833-h902-p-k-no"
                           alt="Marathahalli Gym View"
                           className="w-full h-full object-cover rounded-lg"
                           width={400}
                           height={400}
                           sizes="(max-width: 768px) 50vw, 25vw"
                         />
                         <div className="hidden text-center px-4">
                           <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-3">
                             <div className="w-0 h-0 border-l-[10px] border-l-primary border-y-[6px] border-y-transparent ml-1"></div>
                           </div>
                           <p className="text-sm text-muted-foreground">Gym View</p>
                         </div>
                       </div>
                     </div>
                   </div>
                                   ) : gym.id === 3 ? (
                    // Brookfield gym - Image gallery
                    <div className="space-y-4">
                      {/* Main Image */}
                      <div className="aspect-video bg-gradient-to-br from-primary/20 to-secondary/20 rounded-lg overflow-hidden">
                        <OptimizedImage 
                          src="https://lh3.googleusercontent.com/p/AF1QipPhE2xLhB1-TR_c9bpJCRKVDhum7mQvFY10iZRo=w203-h138-k-no"
                          alt="Brookfield Gym Main View"
                          className="w-full h-full object-cover"
                          width={400}
                          height={300}
                          sizes="(max-width: 768px) 100vw, 66vw"
                        />
                        <div className="hidden text-center px-4">
                          <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-3">
                            <div className="w-0 h-0 border-l-[10px] border-l-primary border-y-[6px] border-y-transparent ml-1"></div>
                          </div>
                          <p className="text-sm text-muted-foreground">Brookfield Gym</p>
                        </div>
                      </div>
                      
                      {/* Image Gallery */}
                      <div className="grid grid-cols-3 gap-2 p-4">
                        <div className="aspect-square bg-gradient-to-br from-primary/20 to-secondary/20 rounded-lg flex items-center justify-center">
                          <OptimizedImage 
                            src="https://lh3.googleusercontent.com/gps-cs-s/AC9h4nqMijpSleYLHCfUK0_8cYj4pS_e76xfFBqKdzyRMP8PhgTpcZO76g-oMrVLBLOjFXKgC-omlWsmVtOnMCiTSY2caKGF7b0QrKdy1WhHamefEonApPLg313MKyqV6U8Vtdh-o1WiDQ=s625-k-no"
                            alt="Brookfield Gym Interior"
                            className="w-full h-full object-cover rounded-lg"
                            width={400}
                            height={400}
                            sizes="(max-width: 768px) 100vw, 400px"
                          />
                        </div>
                        
                        <div className="aspect-square bg-gradient-to-br from-primary/20 to-secondary/20 rounded-lg flex items-center justify-center">
                          <OptimizedImage 
                            src="https://lh3.googleusercontent.com/p/AF1QipNJ867JmpPg50RJsC0fc1UaC_POgWlZZZ3zab5Y=s704-k-no"
                            alt="Brookfield Gym Equipment"
                            className="w-full h-full object-cover rounded-lg"
                            width={400}
                            height={400}
                            sizes="(max-width: 768px) 100vw, 400px"
                          />
                        </div>
                        
                        <div className="aspect-square bg-gradient-to-br from-primary/20 to-secondary/20 rounded-lg flex items-center justify-center">
                          <OptimizedImage 
                            src="https://lh3.googleusercontent.com/p/AF1QipPhE2xLhB1-TR_c9bpJCRKVDhum7mQvFY10iZRo=w203-h138-k-no"
                            alt="Brookfield Gym Area"
                            className="w-full h-full object-cover rounded-lg"
                            width={400}
                            height={400}
                            sizes="(max-width: 768px) 100vw, 400px"
                          />
                        </div>
                      </div>
                    </div>
                  ) : (
                    // Default gym tour placeholder
                    <div className="aspect-video bg-gradient-to-br from-primary/20 to-secondary/20 rounded-lg flex items-center justify-center">
                      <div className="text-center px-4">
                        <div className="w-12 h-12 sm:w-16 sm:h-16 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
                          <div className="w-0 h-0 border-l-[10px] sm:border-l-[12px] border-l-primary border-y-[6px] sm:border-y-[8px] border-y-transparent ml-1"></div>
                        </div>
                        <p className="text-sm sm:text-base text-muted-foreground">Gym Tour Video</p>
                        <p className="text-xs sm:text-sm text-muted-foreground">Click to play virtual tour</p>
                      </div>
                    </div>
                  )}
               </CardContent>
             </Card>

            {/* About This Gym */}
            <Card>
              <CardContent className="p-4 sm:p-6">
                <h3 className="text-base sm:text-lg font-semibold mb-3 sm:mb-4">About This Gym</h3>
                <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                  {gym.description}
                </p>
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
                   {/* Social Media Links */}
                   {isBrookfieldGym && (
                     <div className="flex items-center gap-3">
                       <div className="w-4 h-4 sm:w-5 sm:h-5 text-primary flex-shrink-0">
                         <svg viewBox="0 0 24 24" fill="currentColor">
                           <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                         </svg>
                       </div>
                       <div>
                         <p className="font-medium text-sm sm:text-base">Instagram:</p>
                         <a 
                           href="https://www.instagram.com/fitflix_gymbrookfield_?igsh=MW14b2dwdDhzb3Bm&utm_source=qr" 
                           target="_blank" 
                           rel="noopener noreferrer"
                           className="text-blue-600 hover:underline cursor-pointer text-sm sm:text-base break-all"
                         >
                           @fitflix_gymbrookfield_
                         </a>
                       </div>
                     </div>
                   )}
                </div>
              </CardContent>
            </Card>

            {/* Amenities */}
            <Card>
              <CardContent className="p-4 sm:p-6">
                <h3 className="text-base sm:text-lg font-semibold mb-3 sm:mb-4">Amenities & Features</h3>
                <div className="flex flex-wrap gap-1.5 sm:gap-2">
                  {gym.amenities && gym.amenities.map((amenity, index) => (
                    <Badge key={index} variant="outline" className="px-2 py-1 sm:px-3 text-xs">
                      {amenity}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Related Content Section */}
            <Card>
              <CardContent className="p-4 sm:p-6">
                <h3 className="text-base sm:text-lg font-semibold mb-3 sm:mb-4">Related Content</h3>
                <div className="space-y-3">
                  <Link 
                    to="/services" 
                    className="flex items-center gap-3 p-3 rounded-lg hover:bg-muted transition-colors"
                  >
                    <div className="w-10 h-10 bg-primary/20 rounded-lg flex items-center justify-center">
                      <Dumbbell className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <div className="font-medium text-sm">Premium Gym Services</div>
                      <div className="text-xs text-muted-foreground">Learn about our comprehensive fitness offerings</div>
                    </div>
                  </Link>
                  
                  <Link 
                    to="/about#workout-app" 
                    className="flex items-center gap-3 p-3 rounded-lg hover:bg-muted transition-colors"
                  >
                    <div className="w-10 h-10 bg-primary/20 rounded-lg flex items-center justify-center">
                      <div className="w-5 h-5 bg-primary rounded"></div>
                    </div>
                    <div>
                      <div className="font-medium text-sm">Workout App</div>
                      <div className="text-xs text-muted-foreground">1000+ minutes of professional training</div>
                    </div>
                  </Link>
                  
                  <Link 
                    to="/about#nutrition" 
                    className="flex items-center gap-3 p-3 rounded-lg hover:bg-muted transition-colors"
                  >
                    <div className="w-10 h-10 bg-primary/20 rounded-lg flex items-center justify-center">
                      <div className="w-5 h-5 bg-primary rounded"></div>
                    </div>
                    <div>
                      <div className="font-medium text-sm">Nutrition Products</div>
                      <div className="text-xs text-muted-foreground">Premium supplements for optimal performance</div>
                    </div>
                  </Link>
                </div>
              </CardContent>
            </Card>

            {/* Other Gyms Section */}
            <Card>
              <CardContent className="p-4 sm:p-6">
                <h3 className="text-base sm:text-lg font-semibold mb-3 sm:mb-4">Other Fitflix Locations</h3>
                <div className="space-y-3">
                  {gyms.filter(g => g.id !== gym.id).map((otherGym) => (
                    <Link 
                      key={otherGym.id}
                      to={`/gym/${otherGym.id}`}
                      className="flex items-center gap-3 p-3 rounded-lg hover:bg-muted transition-colors"
                    >
                      <div className="w-10 h-10 bg-primary/20 rounded-lg flex items-center justify-center">
                        <MapPin className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <div className="font-medium text-sm">{otherGym.name.split(' - ')[1]}</div>
                        <div className="text-xs text-muted-foreground">{otherGym.address.split(',')[0]}</div>
                      </div>
                    </Link>
                  ))}
                  <Link 
                    to="/discover-gym"
                    className="flex items-center gap-3 p-3 rounded-lg hover:bg-muted transition-colors text-primary"
                  >
                    <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                      <ArrowLeft className="h-5 w-5" />
                    </div>
                    <div>
                      <div className="font-medium text-sm">View All Gyms</div>
                      <div className="text-xs text-muted-foreground">Discover all Fitflix locations</div>
                    </div>
                  </Link>
                </div>
              </CardContent>
            </Card>


          </div>

                     {/* Right Column - Gym Timings & Map */}
           <div className="lg:col-span-1 space-y-4 sm:space-y-6">
             {/* Gym Timings */}
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

             {/* Interactive Map */}
             <Card>
               <CardContent className="p-4 sm:p-6">
                 <div className="flex items-center gap-2 mb-3 sm:mb-4">
                   <MapPin className="h-4 w-4 sm:h-5 sm:w-5 text-primary" />
                   <h3 className="text-base sm:text-lg font-semibold">Location</h3>
                 </div>
                 <div className="space-y-3">
                   <div className="aspect-square w-full rounded-lg overflow-hidden border border-border">
                     <iframe
                       title={`${gym.name} Location`}
                       width="100%"
                       height="100%"
                       style={{ border: 0 }}
                       loading="lazy"
                       allowFullScreen
                       referrerPolicy="no-referrer-when-downgrade"
                       src={`https://www.google.com/maps/embed/v1/place?key=AIzaSyBFw0Qbyq9zTFTd-tUY6dZWTgaQzuU17R8&q=${encodeURIComponent(gym.address)}&center=${gym.latitude},${gym.longitude}&zoom=15`}
                     />
                   </div>
                   <div className="text-center">
                     <Button 
                       variant="outline" 
                       size="sm"
                       className="w-full"
                       onClick={() => {
                         const url = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(gym.address)}`;
                         window.open(url, '_blank');
                       }}
                     >
                       <MapPin className="h-4 w-4 mr-2" />
                       Open in Google Maps
                     </Button>
                   </div>
                 </div>
               </CardContent>
             </Card>
           </div>
        </div>

                 {/* Removed bottom callback button - now at top */}
        
        {/* Callback Form */}
        <CallbackForm
          isOpen={callbackFormOpen}
          onClose={() => setCallbackFormOpen(false)}
          prefillLocation={gym.name}
          gymId={gym.id}
        />
      </div>
    </div>
  );
};

export default GymDetails;
