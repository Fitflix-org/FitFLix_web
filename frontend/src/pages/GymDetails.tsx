
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
  ArrowLeft,
  X,
  ChevronLeft,
  ChevronRight,
  Calendar,
  Sparkles
} from "lucide-react";
import React, { useState, useEffect, useMemo } from "react";
import CallbackForm from "@/components/CallbackForm";
import { useSEO } from "@/hooks/useSEO";
import OptimizedImage from "@/components/OptimizedImage";
import Breadcrumb from "@/components/Breadcrumb";
import { getGymClubById, getAllGyms, gymsAndClubs } from "@/data/gymsAndClubs";

const GymDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [callbackFormOpen, setCallbackFormOpen] = useState(false);
  const [galleryOpen, setGalleryOpen] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [galleryImages, setGalleryImages] = useState<string[]>([]);

  // Get gym/club data from shared source
  const gymClub = getGymClubById(parseInt(id || "0"));
  
  // Get all gyms for the "Other Locations" section
  const gyms = getAllGyms();

  // Gallery functions
  const openGallery = (images: string[], startIndex: number = 0) => {
    setGalleryImages(images);
    setSelectedImageIndex(startIndex);
    setGalleryOpen(true);
  };

  const closeGallery = () => {
    setGalleryOpen(false);
    setGalleryImages([]);
    setSelectedImageIndex(0);
  };

  const nextImage = () => {
    setSelectedImageIndex((prev) => (prev + 1) % galleryImages.length);
  };

  const prevImage = () => {
    setSelectedImageIndex((prev) => (prev - 1 + galleryImages.length) % galleryImages.length);
  };

  // Memoize SEO data to prevent infinite re-renders
  const seoData = useMemo(() => {
    if (!gymClub) {
      return {
        title: "Facility Details | Fitflix",
        description: "Discover premium gym and wellness club facilities, amenities, and services at Fitflix fitness centers.",
        keywords: "gym details, wellness club details, fitness facilities, gym amenities, personal training"
      };
    }
    
    const facilityType = gymClub.type === 'wellness-club' ? 'Wellness Club' : 'Gym';
    
    return {
      title: `${gymClub.name} | Premium ${facilityType} | Fitflix`,
      description: `${gymClub.description} Discover ${gymClub.name}, a premium ${facilityType.toLowerCase()} with ${gymClub.amenities.join(', ')}. Join Fitflix today!`,
      keywords: `${gymClub.name}, ${facilityType.toLowerCase()}, ${gymClub.address.split(',')[0]}, fitness center, ${gymClub.amenities.join(', ')}`,
      ogTitle: `${gymClub.name} | Premium ${facilityType}`,
      ogDescription: gymClub.description,
      canonical: `https://fitflix.in/${gymClub.type === 'wellness-club' ? 'wellness-club' : 'gym'}/${gymClub.id}`
    };
  }, [gymClub]);

  // Always call useSEO with memoized data
  useSEO(seoData);

  if (!gymClub) {
    return (
      <div className="min-h-screen bg-background pt-20 flex items-center justify-center px-4">
        <div className="text-center">
          <h1 className="text-xl sm:text-2xl font-bold mb-4">Facility not found</h1>
          <div className="flex gap-4 justify-center">
            <Button onClick={() => navigate("/discover-gym")}>Browse Gyms</Button>
            <Button variant="outline" onClick={() => navigate("/discover-clubs")}>Browse Clubs</Button>
          </div>
        </div>
      </div>
    );
  }

  const isWellnessClub = gymClub.type === 'wellness-club';
  const isComingSoon = gymClub.status === 'coming-soon';

  // Facility details
  const facilityDetails = {
    fullAddress: gymClub.address,
    phone: gymClub.phone_number,
    email: gymClub.email,
    timings: gymClub.opening_time && gymClub.closing_time ? {
      "Monday - Friday": `${gymClub.opening_time.substring(11,16)} - ${gymClub.closing_time.substring(11,16)}`,
      "Saturday": "7:00 AM - 10:00 PM",
      "Sunday": "7:00 AM - 10:00 PM"
    } : undefined
  };

  // Special timing for Brookfield gym
  const isBrookfieldGym = gymClub.id === 3;
  if (isBrookfieldGym && facilityDetails.timings) {
    facilityDetails.timings = {
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
               <h1 className="text-2xl sm:text-3xl font-bold">{gymClub.name}</h1>
               <div className="flex items-center gap-2 flex-wrap">
                 <div className="flex items-center gap-1">
                   {gymClub.rating && [...Array(5)].map((_, i) => (
                     <Star
                       key={i}
                       className={`h-4 w-4 ${
                         i < Math.floor(gymClub.rating!)
                           ? "fill-yellow-400 text-yellow-400"
                           : "text-gray-300"
                       }`}
                     />
                   ))}
                   {gymClub.rating && <span className="text-sm font-medium ml-1">{gymClub.rating}/5</span>}
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
             <Badge variant="secondary" className="text-xs">{isWellnessClub ? 'Wellness Club' : 'Premium Gym'}</Badge>
             {isComingSoon ? (
               <Badge className="bg-primary text-primary-foreground text-xs">
                 <Sparkles className="mr-1 h-3 w-3" />
                 Coming Soon {gymClub.opening_date && `- ${gymClub.opening_date}`}
               </Badge>
             ) : (
               <Badge className="bg-primary text-primary-foreground text-xs">
                 Premium Membership
               </Badge>
             )}
             {gymClub.verified && (
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
                {gymClub.id === 1 ? (
                  // Electronic City gym - Image gallery
                  <div className="space-y-4">
                    {/* Main Image */}
                    <div 
                      className="aspect-video bg-gradient-to-br from-primary/20 to-secondary/20 rounded-lg overflow-hidden cursor-pointer hover:scale-105 transition-transform duration-300"
                      onClick={() => openGallery([
                        "https://lh3.googleusercontent.com/p/AF1QipOx2pRaqdWCA4GzBMHvm_viNbAvGSZ6qEPpTpxF=w203-h152-k-no",
                        "https://lh3.googleusercontent.com/p/AF1QipNMrMicfRyVuhgf8GzkfZdwtO1lktn1JI34ZZB-=s604-k-no",
                        "https://lh3.googleusercontent.com/p/AF1QipNaszgg7fSY-4nhDvQGbA1Muq7uL8FBomzTe7nu=s625-k-no",
                        "https://lh3.googleusercontent.com/p/AF1QipPYisgOPZN19ACC2UhoVweggwqx5OLux0z8yEKy=s604-k-no",
                        "https://lh3.googleusercontent.com/p/AF1QipPO2dLhfRdcBDZRwdZQFY7gPAvadtHCwEp6MLI4=s939-k-no"
                      ], 0)}
                    >
                      <OptimizedImage 
                        src="https://lh3.googleusercontent.com/p/AF1QipOx2pRaqdWCA4GzBMHvm_viNbAvGSZ6qEPpTpxF=w203-h152-k-no"
                        alt="Electronic City Gym Main View"
                        className="w-full h-full object-cover"
                        width={600}
                        height={400}
                        sizes="(max-width: 768px) 100vw, 66vw"
                      />
                      <div className="absolute inset-0 bg-black/20 opacity-0 hover:opacity-100 transition-opacity flex items-center justify-center">
                        <div className="bg-white/90 text-black px-3 py-1 rounded-full text-sm font-medium">
                          Click to view gallery
                        </div>
                      </div>
                    </div>
                    
                                          {/* Image Gallery */}
                      <div className="grid grid-cols-2 gap-2 p-4">
                        <div 
                          className="aspect-square bg-gradient-to-br from-primary/20 to-secondary/20 rounded-lg flex items-center justify-center cursor-pointer hover:scale-105 transition-transform duration-300 overflow-hidden"
                          onClick={() => openGallery([
                            "https://lh3.googleusercontent.com/p/AF1QipOx2pRaqdWCA4GzBMHvm_viNbAvGSZ6qEPpTpxF=w203-h152-k-no",
                            "https://lh3.googleusercontent.com/p/AF1QipNMrMicfRyVuhgf8GzkfZdwtO1lktn1JI34ZZB-=s604-k-no",
                            "https://lh3.googleusercontent.com/p/AF1QipNaszgg7fSY-4nhDvQGbA1Muq7uL8FBomzTe7nu=s625-k-no",
                            "https://lh3.googleusercontent.com/p/AF1QipPYisgOPZN19ACC2UhoVweggwqx5OLux0z8yEKy=s604-k-no",
                            "https://lh3.googleusercontent.com/p/AF1QipPO2dLhfRdcBDZRwdZQFY7gPAvadtHCwEp6MLI4=s939-k-no"
                          ], 1)}
                        >
                          <OptimizedImage 
                            src="https://lh3.googleusercontent.com/p/AF1QipNMrMicfRyVuhgf8GzkfZdwtO1lktn1JI34ZZB-=s604-k-no"
                            alt="Electronic City Gym Equipment Area"
                            className="w-full h-full object-cover rounded-lg"
                            width={400}
                            height={400}
                            sizes="(max-width: 768px) 50vw, 25vw"
                          />
                        </div>
                        
                        <div 
                          className="aspect-square bg-gradient-to-br from-primary/20 to-secondary/20 rounded-lg flex items-center justify-center cursor-pointer hover:scale-105 transition-transform duration-300 overflow-hidden"
                          onClick={() => openGallery([
                            "https://lh3.googleusercontent.com/p/AF1QipOx2pRaqdWCA4GzBMHvm_viNbAvGSZ6qEPpTpxF=w203-h152-k-no",
                            "https://lh3.googleusercontent.com/p/AF1QipNMrMicfRyVuhgf8GzkfZdwtO1lktn1JI34ZZB-=s604-k-no",
                            "https://lh3.googleusercontent.com/p/AF1QipNaszgg7fSY-4nhDvQGbA1Muq7uL8FBomzTe7nu=s625-k-no",
                            "https://lh3.googleusercontent.com/p/AF1QipPYisgOPZN19ACC2UhoVweggwqx5OLux0z8yEKy=s604-k-no",
                            "https://lh3.googleusercontent.com/p/AF1QipPO2dLhfRdcBDZRwdZQFY7gPAvadtHCwEp6MLI4=s939-k-no"
                          ], 2)}
                        >
                          <OptimizedImage 
                            src="https://lh3.googleusercontent.com/p/AF1QipNaszgg7fSY-4nhDvQGbA1Muq7uL8FBomzTe7nu=s625-k-no"
                            alt="Electronic City Gym Interior"
                            className="w-full h-full object-cover rounded-lg"
                            width={400}
                            height={400}
                            sizes="(max-width: 768px) 50vw, 25vw"
                          />
                        </div>
                        
                        <div 
                          className="aspect-square bg-gradient-to-br from-primary/20 to-secondary/20 rounded-lg flex items-center justify-center cursor-pointer hover:scale-105 transition-transform duration-300 overflow-hidden"
                          onClick={() => openGallery([
                            "https://lh3.googleusercontent.com/p/AF1QipOx2pRaqdWCA4GzBMHvm_viNbAvGSZ6qEPpTpxF=w203-h152-k-no",
                            "https://lh3.googleusercontent.com/p/AF1QipNMrMicfRyVuhgf8GzkfZdwtO1lktn1JI34ZZB-=s604-k-no",
                            "https://lh3.googleusercontent.com/p/AF1QipNaszgg7fSY-4nhDvQGbA1Muq7uL8FBomzTe7nu=s625-k-no",
                            "https://lh3.googleusercontent.com/p/AF1QipPYisgOPZN19ACC2UhoVweggwqx5OLux0z8yEKy=s604-k-no",
                            "https://lh3.googleusercontent.com/p/AF1QipPO2dLhfRdcBDZRwdZQFY7gPAvadtHCwEp6MLI4=s939-k-no"
                          ], 3)}
                        >
                          <OptimizedImage 
                            src="https://lh3.googleusercontent.com/p/AF1QipPYisgOPZN19ACC2UhoVweggwqx5OLux0z8yEKy=s604-k-no"
                            alt="Electronic City Gym Facility"
                            className="w-full h-full object-cover rounded-lg"
                            width={400}
                            height={400}
                            sizes="(max-width: 768px) 50vw, 25vw"
                          />
                        </div>
                        
                        <div 
                          className="aspect-square bg-gradient-to-br from-primary/20 to-secondary/20 rounded-lg flex items-center justify-center cursor-pointer hover:scale-105 transition-transform duration-300 overflow-hidden"
                          onClick={() => openGallery([
                            "https://lh3.googleusercontent.com/p/AF1QipOx2pRaqdWCA4GzBMHvm_viNbAvGSZ6qEPpTpxF=w203-h152-k-no",
                            "https://lh3.googleusercontent.com/p/AF1QipNMrMicfRyVuhgf8GzkfZdwtO1lktn1JI34ZZB-=s604-k-no",
                            "https://lh3.googleusercontent.com/p/AF1QipNaszgg7fSY-4nhDvQGbA1Muq7uL8FBomzTe7nu=s625-k-no",
                            "https://lh3.googleusercontent.com/p/AF1QipPYisgOPZN19ACC2UhoVweggwqx5OLux0z8yEKy=s604-k-no",
                            "https://lh3.googleusercontent.com/p/AF1QipPO2dLhfRdcBDZRwdZQFY7gPAvadtHCwEp6MLI4=s939-k-no"
                          ], 4)}
                        >
                          <OptimizedImage 
                            src="https://lh3.googleusercontent.com/p/AF1QipPO2dLhfRdcBDZRwdZQFY7gPAvadtHCwEp6MLI4=s939-k-no"
                            alt="Electronic City Gym Wide View"
                            className="w-full h-full object-cover rounded-lg"
                            width={400}
                            height={400}
                            sizes="(max-width: 768px) 50vw, 25vw"
                          />
                        </div>
                      </div>
                  </div>
                ) : gymClub.id === 2 ? (
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
                       <div 
                         className="aspect-square bg-gradient-to-br from-primary/20 to-secondary/20 rounded-lg flex items-center justify-center cursor-pointer hover:scale-105 transition-transform duration-300 overflow-hidden"
                         onClick={() => openGallery([
                           "https://lh3.googleusercontent.com/p/AF1QipN9cjbNziKUGInZ_sX3ARNKqFwpciPONs77t6uW=w833-h902-p-k-no",
                           "https://lh3.googleusercontent.com/p/AF1QipNrPoiJ-cs0g1DbkoAPBO2aJ5zkB2zENxgwKLio=w833-h902-p-k-no",
                           "https://lh3.googleusercontent.com/p/AF1QipO41rQF9sZ_ayJWfY4hf9W-kCoIHe7fKORhkXF6=w833-h902-p-k-no",
                           "https://lh3.googleusercontent.com/p/AF1QipMZ1AHwv9rhtU1Nx169NZdYnVwn0HKkArjbE5AU=w833-h902-p-k-no"
                         ], 0)}
                       >
                         <OptimizedImage 
                           src="https://lh3.googleusercontent.com/p/AF1QipN9cjbNziKUGInZ_sX3ARNKqFwpciPONs77t6uW=w833-h902-p-k-no"
                           alt="Marathahalli Gym Interior"
                           className="w-full h-full object-cover rounded-lg"
                           width={400}
                           height={400}
                           sizes="(max-width: 768px) 50vw, 25vw"
                         />
                       </div>
                       
                       <div 
                         className="aspect-square bg-gradient-to-br from-primary/20 to-secondary/20 rounded-lg flex items-center justify-center cursor-pointer hover:scale-105 transition-transform duration-300 overflow-hidden"
                         onClick={() => openGallery([
                           "https://lh3.googleusercontent.com/p/AF1QipN9cjbNziKUGInZ_sX3ARNKqFwpciPONs77t6uW=w833-h902-p-k-no",
                           "https://lh3.googleusercontent.com/p/AF1QipNrPoiJ-cs0g1DbkoAPBO2aJ5zkB2zENxgwKLio=w833-h902-p-k-no",
                           "https://lh3.googleusercontent.com/p/AF1QipO41rQF9sZ_ayJWfY4hf9W-kCoIHe7fKORhkXF6=w833-h902-p-k-no",
                           "https://lh3.googleusercontent.com/p/AF1QipMZ1AHwv9rhtU1Nx169NZdYnVwn0HKkArjbE5AU=w833-h902-p-k-no"
                         ], 1)}
                       >
                         <OptimizedImage 
                           src="https://lh3.googleusercontent.com/p/AF1QipNrPoiJ-cs0g1DbkoAPBO2aJ5zkB2zENxgwKLio=w833-h902-p-k-no"
                           alt="Marathahalli Gym Equipment"
                           className="w-full h-full object-cover rounded-lg"
                           width={400}
                           height={400}
                           sizes="(max-width: 768px) 50vw, 25vw"
                         />
                       </div>
                       
                       <div 
                         className="aspect-square bg-gradient-to-br from-primary/20 to-secondary/20 rounded-lg flex items-center justify-center cursor-pointer hover:scale-105 transition-transform duration-300 overflow-hidden"
                         onClick={() => openGallery([
                           "https://lh3.googleusercontent.com/p/AF1QipN9cjbNziKUGInZ_sX3ARNKqFwpciPONs77t6uW=w833-h902-p-k-no",
                           "https://lh3.googleusercontent.com/p/AF1QipNrPoiJ-cs0g1DbkoAPBO2aJ5zkB2zENxgwKLio=w833-h902-p-k-no",
                           "https://lh3.googleusercontent.com/p/AF1QipO41rQF9sZ_ayJWfY4hf9W-kCoIHe7fKORhkXF6=w833-h902-p-k-no",
                           "https://lh3.googleusercontent.com/p/AF1QipMZ1AHwv9rhtU1Nx169NZdYnVwn0HKkArjbE5AU=w833-h902-p-k-no"
                         ], 2)}
                       >
                         <OptimizedImage 
                           src="https://lh3.googleusercontent.com/p/AF1QipO41rQF9sZ_ayJWfY4hf9W-kCoIHe7fKORhkXF6=w833-h902-p-k-no"
                           alt="Marathahalli Gym Area"
                           className="w-full h-full object-cover rounded-lg"
                           width={400}
                           height={400}
                           sizes="(max-width: 768px) 50vw, 25vw"
                         />
                       </div>
                       
                       <div 
                         className="aspect-square bg-gradient-to-br from-primary/20 to-secondary/20 rounded-lg flex items-center justify-center cursor-pointer hover:scale-105 transition-transform duration-300 overflow-hidden"
                         onClick={() => openGallery([
                           "https://lh3.googleusercontent.com/p/AF1QipN9cjbNziKUGInZ_sX3ARNKqFwpciPONs77t6uW=w833-h902-p-k-no",
                           "https://lh3.googleusercontent.com/p/AF1QipNrPoiJ-cs0g1DbkoAPBO2aJ5zkB2zENxgwKLio=w833-h902-p-k-no",
                           "https://lh3.googleusercontent.com/p/AF1QipO41rQF9sZ_ayJWfY4hf9W-kCoIHe7fKORhkXF6=w833-h902-p-k-no",
                           "https://lh3.googleusercontent.com/p/AF1QipMZ1AHwv9rhtU1Nx169NZdYnVwn0HKkArjbE5AU=w833-h902-p-k-no"
                         ], 3)}
                       >
                         <OptimizedImage 
                           src="https://lh3.googleusercontent.com/p/AF1QipMZ1AHwv9rhtU1Nx169NZdYnVwn0HKkArjbE5AU=w833-h902-p-k-no"
                           alt="Marathahalli Gym View"
                           className="w-full h-full object-cover rounded-lg"
                           width={400}
                           height={400}
                           sizes="(max-width: 768px) 50vw, 25vw"
                         />
                       </div>
                     </div>
                   </div>
                                                   ) : gymClub.id === 3 ? (
                   // Brookfield gym - Image gallery (same pattern as others)
                   <div className="space-y-4">
                     {/* Main Image */}
                     <div 
                       className="aspect-video bg-gradient-to-br from-primary/20 to-secondary/20 rounded-lg overflow-hidden cursor-pointer hover:scale-105 transition-transform duration-300"
                       onClick={() => openGallery([
                         "https://lh3.googleusercontent.com/p/AF1QipPhE2xLhB1-TR_c9bpJCRKVDhum7mQvFY10iZRo=w203-h138-k-no",
                         "https://lh3.googleusercontent.com/gps-cs-s/AC9h4nqMijpSleYLHCfUK0_8cYj4pS_e76xfFBqKdzyRMP8PhgTpcZO76g-oMrVLBLOjFXKgC-omlWsmVtOnMCiTSY2caKGF7b0QrKdy1WhHamefEonApPLg313MKyqV6U8Vtdh-o1WiDQ=s625-k-no",
                         "https://lh3.googleusercontent.com/p/AF1QipNJ867JmpPg50RJsC0fc1UaC_POgWlZZZ3zab5Y=s704-k-no",
                         "https://lh3.googleusercontent.com/p/AF1QipPhE2xLhB1-TR_c9bpJCRKVDhum7mQvFY10iZRo=w203-h138-k-no"
                       ], 0)}
                     >
                       <OptimizedImage 
                         src="https://lh3.googleusercontent.com/p/AF1QipPhE2xLhB1-TR_c9bpJCRKVDhum7mQvFY10iZRo=w203-h138-k-no"
                         alt="Brookfield Gym Main View"
                         className="w-full h-full object-cover"
                         width={600}
                         height={400}
                         sizes="(max-width: 768px) 100vw, 66vw"
                       />
                       <div className="absolute inset-0 bg-black/20 opacity-0 hover:opacity-100 transition-opacity flex items-center justify-center">
                         <div className="bg-white/90 text-black px-3 py-1 rounded-full text-sm font-medium">
                           Click to view gallery
                         </div>
                       </div>
                     </div>
                     
                     {/* Image Gallery - 2x2 Grid like others */}
                     <div className="grid grid-cols-2 gap-2 p-4">
                       <div 
                         className="aspect-square bg-gradient-to-br from-primary/20 to-secondary/20 rounded-lg flex items-center justify-center cursor-pointer hover:scale-105 transition-transform duration-300 overflow-hidden"
                         onClick={() => openGallery([
                           "https://lh3.googleusercontent.com/p/AF1QipPhE2xLhB1-TR_c9bpJCRKVDhum7mQvFY10iZRo=w203-h138-k-no",
                           "https://lh3.googleusercontent.com/gps-cs-s/AC9h4nqMijpSleYLHCfUK0_8cYj4pS_e76xfFBqKdzyRMP8PhgTpcZO76g-oMrVLBLOjFXKgC-omlWsmVtOnMCiTSY2caKGF7b0QrKdy1WhHamefEonApPLg313MKyqV6U8Vtdh-o1WiDQ=s625-k-no",
                           "https://lh3.googleusercontent.com/p/AF1QipNJ867JmpPg50RJsC0fc1UaC_POgWlZZZ3zab5Y=s704-k-no",
                           "https://lh3.googleusercontent.com/p/AF1QipPhE2xLhB1-TR_c9bpJCRKVDhum7mQvFY10iZRo=w203-h138-k-no"
                         ], 1)}
                       >
                         <OptimizedImage 
                           src="https://lh3.googleusercontent.com/gps-cs-s/AC9h4nqMijpSleYLHCfUK0_8cYj4pS_e76xfFBqKdzyRMP8PhgTpcZO76g-oMrVLBLOjFXKgC-omlWsmVtOnMCiTSY2caKGF7b0QrKdy1WhHamefEonApPLg313MKyqV6U8Vtdh-o1WiDQ=s625-k-no"
                           alt="Brookfield Gym Interior"
                           className="w-full h-full object-cover rounded-lg"
                           width={400}
                           height={400}
                           sizes="(max-width: 768px) 50vw, 25vw"
                         />
                       </div>
                       
                       <div 
                         className="aspect-square bg-gradient-to-br from-primary/20 to-secondary/20 rounded-lg flex items-center justify-center cursor-pointer hover:scale-105 transition-transform duration-300 overflow-hidden"
                         onClick={() => openGallery([
                           "https://lh3.googleusercontent.com/p/AF1QipPhE2xLhB1-TR_c9bpJCRKVDhum7mQvFY10iZRo=w203-h138-k-no",
                           "https://lh3.googleusercontent.com/gps-cs-s/AC9h4nqMijpSleYLHCfUK0_8cYj4pS_e76xfFBqKdzyRMP8PhgTpcZO76g-oMrVLBLOjFXKgC-omlWsmVtOnMCiTSY2caKGF7b0QrKdy1WhHamefEonApPLg313MKyqV6U8Vtdh-o1WiDQ=s625-k-no",
                           "https://lh3.googleusercontent.com/p/AF1QipNJ867JmpPg50RJsC0fc1UaC_POgWlZZZ3zab5Y=s704-k-no",
                           "https://lh3.googleusercontent.com/p/AF1QipPhE2xLhB1-TR_c9bpJCRKVDhum7mQvFY10iZRo=w203-h138-k-no"
                         ], 2)}
                       >
                         <OptimizedImage 
                           src="https://lh3.googleusercontent.com/p/AF1QipNJ867JmpPg50RJsC0fc1UaC_POgWlZZZ3zab5Y=s704-k-no"
                           alt="Brookfield Gym Equipment"
                           className="w-full h-full object-cover rounded-lg"
                           width={400}
                           height={400}
                           sizes="(max-width: 768px) 50vw, 25vw"
                         />
                       </div>
                       
                       <div 
                         className="aspect-square bg-gradient-to-br from-primary/20 to-secondary/20 rounded-lg flex items-center justify-center cursor-pointer hover:scale-105 transition-transform duration-300 overflow-hidden"
                         onClick={() => openGallery([
                           "https://lh3.googleusercontent.com/p/AF1QipPhE2xLhB1-TR_c9bpJCRKVDhum7mQvFY10iZRo=w203-h138-k-no",
                           "https://lh3.googleusercontent.com/gps-cs-s/AC9h4nqMijpSleYLHCfUK0_8cYj4pS_e76xfFBqKdzyRMP8PhgTpcZO76g-oMrVLBLOjFXKgC-omlWsmVtOnMCiTSY2caKGF7b0QrKdy1WhHamefEonApPLg313MKyqV6U8Vtdh-o1WiDQ=s625-k-no",
                           "https://lh3.googleusercontent.com/p/AF1QipNJ867JmpPg50RJsC0fc1UaC_POgWlZZZ3zab5Y=s704-k-no",
                           "https://lh3.googleusercontent.com/p/AF1QipPhE2xLhB1-TR_c9bpJCRKVDhum7mQvFY10iZRo=w203-h138-k-no"
                         ], 3)}
                       >
                         <OptimizedImage 
                           src="https://lh3.googleusercontent.com/p/AF1QipPhE2xLhB1-TR_c9bpJCRKVDhum7mQvFY10iZRo=w203-h138-k-no"
                           alt="Brookfield Gym Area"
                           className="w-full h-full object-cover rounded-lg"
                           width={400}
                           height={400}
                           sizes="(max-width: 768px) 50vw, 25vw"
                         />
                       </div>
                       
                       {/* Add a 4th placeholder to maintain 2x2 pattern */}
                       <div className="aspect-square bg-gradient-to-br from-primary/20 to-secondary/20 rounded-lg flex items-center justify-center">
                         <div className="text-center text-muted-foreground">
                           <Dumbbell className="h-8 w-8 mx-auto mb-2 opacity-50" />
                           <p className="text-xs">More photos</p>
                           <p className="text-xs">coming soon</p>
                         </div>
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
                <h3 className="text-base sm:text-lg font-semibold mb-3 sm:mb-4">
                  About This {isWellnessClub ? 'Wellness Club' : 'Gym'}
                </h3>
                <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                  {gymClub.description}
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
                      <p className="text-blue-600 hover:underline cursor-pointer text-sm sm:text-base break-words">{facilityDetails.fullAddress}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Phone className="h-4 w-4 sm:h-5 sm:w-5 text-primary flex-shrink-0" />
                    <div>
                      <p className="font-medium text-sm sm:text-base">Phone:</p>
                      <p className="text-blue-600 hover:underline cursor-pointer text-sm sm:text-base">{facilityDetails.phone}</p>
                    </div>
                  </div>
                                     <div className="flex items-center gap-3">
                     <Mail className="h-4 w-4 sm:h-5 sm:w-5 text-primary flex-shrink-0" />
                     <div>
                       <p className="font-medium text-sm sm:text-base">Email:</p>
                       <p className="text-blue-600 hover:underline cursor-pointer text-sm sm:text-base break-all">{facilityDetails.email}</p>
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
                  {gymClub.amenities && gymClub.amenities.map((amenity, index) => (
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
                    to="/services" 
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
                    to="/services" 
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
                  {gyms.filter(g => g.id !== gymClub.id).map((otherGym) => (
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
             {facilityDetails.timings && (
               <Card>
                 <CardContent className="p-4 sm:p-6">
                   <div className="flex items-center gap-2 mb-3 sm:mb-4">
                     <Clock className="h-4 w-4 sm:h-5 sm:w-5 text-primary" />
                     <h3 className="text-base sm:text-lg font-semibold">{isWellnessClub ? 'Club' : 'Gym'} Timings</h3>
                   </div>
                   <div className="space-y-2 sm:space-y-3">
                     {Object.entries(facilityDetails.timings).map(([day, hours]) => (
                       <div key={day} className="flex justify-between items-start gap-2">
                         <span className="font-medium text-sm sm:text-base flex-shrink-0">{day}:</span>
                         <span className="text-right text-sm sm:text-base">{hours}</span>
                       </div>
                     ))}
                   </div>
                 </CardContent>
               </Card>
             )}

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
                       title={`${gymClub.name} Location`}
                       width="100%"
                       height="100%"
                       style={{ border: 0 }}
                       loading="lazy"
                       allowFullScreen
                       referrerPolicy="no-referrer-when-downgrade"
                       src={`https://www.google.com/maps/embed/v1/place?key=AIzaSyBFw0Qbyq9zTFTd-tUY6dZWTgaQzuU17R8&q=${encodeURIComponent(gymClub.address)}&center=${gymClub.latitude},${gymClub.longitude}&zoom=15`}
                     />
                   </div>
                   <div className="text-center">
                     <Button 
                       variant="outline" 
                       size="sm"
                       className="w-full"
                       onClick={() => {
                         const url = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(gymClub.address)}`;
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
          prefillLocation={gymClub.name}
          gymId={gymClub.id}
        />

        {/* Gallery Modal */}
        {galleryOpen && (
          <div className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4">
            <div className="relative max-w-4xl max-h-full">
              {/* Close Button */}
              <button
                onClick={closeGallery}
                className="absolute top-4 right-4 z-10 bg-black/50 text-white p-2 rounded-full hover:bg-black/70 transition-colors"
              >
                <X className="h-6 w-6" />
              </button>
              
              {/* Navigation Buttons */}
              <button
                onClick={prevImage}
                className="absolute left-4 top-1/2 -translate-y-1/2 z-10 bg-black/50 text-white p-2 rounded-full hover:bg-black/70 transition-colors"
              >
                <ChevronLeft className="h-6 w-6" />
              </button>
              
              <button
                onClick={nextImage}
                className="absolute right-4 top-1/2 -translate-y-1/2 z-10 bg-black/50 text-white p-2 rounded-full hover:bg-black/70 transition-colors"
              >
                <ChevronRight className="h-6 w-6" />
              </button>
              
              {/* Main Image */}
              <img
                src={galleryImages[selectedImageIndex]}
                alt={`Gym Image ${selectedImageIndex + 1}`}
                className="max-w-full max-h-full object-contain rounded-lg"
              />
              
              {/* Image Counter */}
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/50 text-white px-3 py-1 rounded-full text-sm">
                {selectedImageIndex + 1} / {galleryImages.length}
              </div>
              
              {/* Thumbnail Navigation */}
              <div className="absolute bottom-16 left-1/2 -translate-x-1/2 flex gap-2">
                {galleryImages.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImageIndex(index)}
                    className={`w-3 h-3 rounded-full transition-colors ${
                      index === selectedImageIndex ? 'bg-white' : 'bg-white/50'
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default GymDetails;


