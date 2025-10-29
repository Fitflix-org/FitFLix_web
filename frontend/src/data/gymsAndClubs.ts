// Shared data for all gyms and wellness clubs
// This file serves as the single source of truth to avoid data duplication

export interface GymClub {
  id: number;
  name: string;
  type: 'gym' | 'wellness-club';
  status: 'active' | 'coming-soon';
  address: string;
  latitude: string;
  longitude: string;
  phone_number: string;
  email: string;
  opening_time?: string;
  closing_time?: string;
  holiday_dates: string[];
  description: string;
  rating?: number;
  amenities: string[];
  is_deleted: boolean;
  verified: boolean;
  opening_date?: string; // For coming soon clubs
  website?: string;
  instagram?: string;
}

export const gymsAndClubs: GymClub[] = [
  // Active Gyms
  {
    id: 1,
    name: "Fitflix Gym - Electronic City Phase I, Bengaluru",
    type: "gym",
    status: "active",
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
    type: "gym",
    status: "active",
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
    type: "gym",
    status: "active",
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
  // Coming Soon Wellness Club
  {
    id: 4,
    name: "Fitflix Wellness Club - Sainikpuri, Hyderabad",
    type: "wellness-club",
    status: "coming-soon",
    address: "Sainikpuri, Secunderabad, Hyderabad, Telangana",
    latitude: "17.483032307680585",
    longitude: "78.54179358604439",
    phone_number: "+91 70260 00465",
    email: "info@fitflix.in",
    holiday_dates: [],
    description: "Fitflix Wellness Club Sainikpuri - Your DNA, Your Wellness, Your Way. Experience elite facilities including Gym, Yoga, Cryotherapy, Oxygen Therapy, Collagen Beds, Cold Plunge, IR Sauna, and Spa. Offering DNA-based personalized wellness programs for peak performance, age reversal, body recomposition, and more.",
    amenities: [
      "DNA & Epigenetic Testing",
      "Cryotherapy",
      "HBOT (Oxygen Therapy)",
      "Infrared Sauna",
      "Collagen Beds",
      "Cold Plunge",
      "Yoga Studio",
      "Steam Room",
      "Spa Services",
      "Personal Training",
      "Group Classes",
      "Recovery Therapies"
    ],
    is_deleted: false,
    verified: true,
    opening_date: "2025",
    website: "https://www.fitflix.in",
  }
];

// Helper functions
export const getActiveGymsAndClubs = () => 
  gymsAndClubs.filter(item => item.status === 'active' && !item.is_deleted);

export const getComingSoonClubs = () => 
  gymsAndClubs.filter(item => item.status === 'coming-soon' && !item.is_deleted);

export const getGymClubById = (id: number) => 
  gymsAndClubs.find(item => item.id === id);

export const getAllGyms = () => 
  gymsAndClubs.filter(item => item.type === 'gym' && !item.is_deleted);

export const getAllWellnessClubs = () => 
  gymsAndClubs.filter(item => item.type === 'wellness-club' && !item.is_deleted);
