export interface Event {
  id: string;
  title: string;
  description: string;
  date: string;
  time: string;
  location: string;
  image: string;
  category: string;
  attendees?: number;
  price?: number;
}

export const eventsData: Event[] = [
  {
    id: "1",
    title: "Fitflix Run Event",
    description: "Runnning event for all fitness enthusiasts",
    date: "2026-03-21",
    time: "09:00 AM - 05:00 PM",
    location: "Fitflix Marathahalli",
    image: "https://media.gettyimages.com/id/1457686878/photo/one-person-leading-marathon.jpg?s=612x612&w=0&k=20&c=VxiorITBXA1Lhw7wlws3ZAE1tnW_MJ-FSD-U6k5LhzI=",
    category: "Workshop",
    attendees: 150,
    price: 250,
  },
  {
    id: "2",
    title: "Yoga & Meditation Session",
    description: "Relaxation and mindfulness training for stress relief",
    date: "2026-02-14",
    time: "06:00 PM - 07:30 PM",
    location: "Fitflix Marathahalli",
    image: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=500",
    category: "Class",
    attendees: 50,
    price: 100,
  },
];