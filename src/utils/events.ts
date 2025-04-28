import { convertToRWF } from "./helper";
import { Event } from "./type";


export const events:Event[] = [
  {
    id: "evt-001",
    title: "Kigali Jazz Festival",
    description: "Experience the ultimate jazz festival featuring top artists from across Africa. Enjoy a weekend filled with amazing performances, great food, and unforgettable memories in the heart of Kigali.",
    startDate: "2025-08-15",
    endDate: "2025-08-17",
    time: "18:00",
    duration: "3 days",
    location: {
      name: "Kigali Convention Center",
      address: "KG 2 Roundabout",
      city: "Kigali",
      country: "Rwanda",
      coordinates: [-1.9532, 30.0619]
    },
    price: convertToRWF(65),
    category: "Music",
    tags: ["Jazz", "Live Music", "Festival", "Outdoor"],
    image: "https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?q=80&w=2070",
    organizer: {
      name: "Rwanda Events",
      logo: "/logo.png",
      description: "Leading event organizer in Rwanda"
    },
    ticketsAvailable: 500,
    featured: true
  },
  {
    id: "evt-002",
    title: "Rwanda Tech Summit",
    description: "Join industry leaders and tech enthusiasts for a day of innovation, inspiration, and networking. Discover the latest trends and technologies shaping Rwanda's digital future.",
    startDate: "2025-09-10",
    endDate: "2025-09-12",
    time: "09:00",
    duration: "3 days",
    location: {
      name: "Norrsken House Kigali",
      address: "KG 7 Ave",
      city: "Kigali",
      country: "Rwanda",
      coordinates: [-1.9447, 30.0611]
    },
    price: convertToRWF(100),
    category: "Technology",
    tags: ["Tech", "Innovation", "Digital", "Networking"],
    image: "https://images.unsplash.com/photo-1560523160-c4ef2f0c61a9?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    organizer: {
      name: "RwandICT Chamber",
      logo: "/logo.png",
      description: "Promoting technology and innovation in Rwanda"
    },
    ticketsAvailable: 200,
    featured: true
  },
  {
    id: "evt-003",
    title: "Kigali Food & Culture Festival",
    description: "Indulge in a culinary journey featuring exquisite dishes and cultural performances. A perfect event for food lovers and cultural enthusiasts.",
    startDate: "2025-07-28",
    endDate: "2025-07-30",
    time: "16:00",
    duration: "3 days",
    location: {
      name: "Kimihurura Heights",
      address: "KG 9 Ave",
      city: "Kigali",
      country: "Rwanda",
      coordinates: [-1.9579, 30.0849]
    },
    price: convertToRWF(75),
    category: "Food & Drinks",
    tags: ["Food", "Culture", "Festival", "Family"],
    image: "https://images.unsplash.com/photo-1528605248644-14dd04022da1?q=80&w=2070",
    organizer: {
      name: "Taste of Rwanda",
      logo: "/logo.png",
      description: "Celebrating Rwandan cuisine and culture"
    },
    ticketsAvailable: 150,
    featured: false
  },
  {
    id: "evt-004",
    title: "Contemporary Art Exhibition",
    description: "Explore contemporary masterpieces from emerging and established Rwandan artists in this curated exhibition that showcases Rwanda's vibrant art scene.",
    startDate: "2025-08-05",
    endDate: "2025-08-20",
    time: "10:00",
    duration: "2 weeks",
    location: {
      name: "Inema Arts Center",
      address: "KG 563 St",
      city: "Kigali",
      country: "Rwanda",
      coordinates: [-1.9373, 30.0813]
    },
    price: convertToRWF(35),
    category: "Arts & Culture",
    tags: ["Art", "Exhibition", "Cultural", "Contemporary"],
    image: "https://images.unsplash.com/photo-1544161513-0179fe746fd5?q=80&w=2070",
    organizer: {
      name: "Rwanda Arts Council",
      logo: "/logo.png",
      description: "Promoting Rwandan art and artists"
    },
    ticketsAvailable: 300,
    featured: false
  },
  {
    id: "evt-005",
    title: "Kigali Peace Marathon",
    description: "Challenge yourself in this annual city marathon. Run through Kigali's iconic landmarks and scenic routes while being cheered by thousands of spectators.",
    startDate: "2025-10-01",
    endDate: "2025-10-01",
    time: "07:00",
    duration: "1 day",
    location: {
      name: "Amahoro Stadium",
      address: "KG 17 Ave",
      city: "Kigali",
      country: "Rwanda",
      coordinates: [-1.9557, 30.1041]
    },
    price: convertToRWF(55),
    category: "Sports",
    tags: ["Marathon", "Running", "Outdoors", "Charity"],
    image: "https://pbs.twimg.com/media/GOzSzgzWEAAN2I1.jpg:large",
    organizer: {
      name: "Rwanda Athletics Federation",
      logo: "/logo.png",
      description: "Organizing running events across Rwanda"
    },
    ticketsAvailable: 1000,
    featured: true
  },
  {
    id: "evt-006",
    title: "Rwanda Business Forum",
    description: "Connect with business leaders and entrepreneurs to gain insights on leadership, innovation, and strategies for success in Rwanda's growing economy.",
    startDate: "2025-09-25",
    endDate: "2025-09-26",
    time: "09:30",
    duration: "2 days",
    location: {
      name: "Kigali Serena Hotel",
      address: "KG 7 Ave",
      city: "Kigali",
      country: "Rwanda",
      coordinates: [-1.9532, 30.0613]
    },
    price: convertToRWF(120),
    category: "Business",
    tags: ["Business", "Networking", "Entrepreneurship", "Investment"],
    image: "https://images.unsplash.com/photo-1556761175-b413da4baf72?q=80&w=2074",
    organizer: {
      name: "Rwanda Development Board",
      logo: "/logo.png",
      description: "Facilitating business growth in Rwanda"
    },
    ticketsAvailable: 100,
    featured: false
  },
  {
    id: "evt-007",
    title: "Kigali Comedy Night",
    description: "Laugh your heart out with performances by top stand-up comedians from Rwanda and East Africa. An evening of humor, wit, and entertainment.",
    startDate: "2025-08-20",
    endDate: "2025-08-20",
    time: "19:00",
    duration: "3 hours",
    location: {
      name: "Century Park Hotel",
      address: "KK 15 Ave",
      city: "Kigali",
      country: "Rwanda",
      coordinates: [-1.9492, 30.0670]
    },
    price: convertToRWF(45),
    category: "Entertainment",
    tags: ["Comedy", "Stand-up", "Nightlife", "Performance"],
    image: "https://images.unsplash.com/photo-1527224857830-43a7acc85260?q=80&w=2071",
    organizer: {
      name: "Laugh Factory Kigali",
      logo: "/logo.png",
      description: "Bringing laughter to Kigali"
    },
    ticketsAvailable: 120,
    featured: false
  },
  {
    id: "evt-008",
    title: "Wellness & Yoga Retreat",
    description: "Rejuvenate your mind, body, and soul in this wellness retreat featuring yoga sessions, meditation, and workshops on holistic health practices.",
    startDate: "2025-07-15",
    endDate: "2025-07-17",
    time: "08:00",
    duration: "3 days",
    location: {
      name: "Virunga Lodge",
      address: "Musanze",
      city: "Kigali",
      country: "Rwanda",
      coordinates: [-1.4692, 29.6807]
    },
    price: convertToRWF(90),
    category: "Health & Wellness",
    tags: ["Yoga", "Wellness", "Retreat", "Mindfulness"],
    image: "https://images.unsplash.com/photo-1545205597-3d9d02c29597?q=80&w=2070",
    organizer: {
      name: "Wellness Rwanda",
      logo: "/logo.png",
      description: "Promoting health and wellness in Rwanda"
    },
    ticketsAvailable: 50,
    featured: false
  }
];

export const categories = [
  "All",
  "Music",
  "Technology",
  "Food & Drinks",
  "Arts & Culture",
  "Sports",
  "Business",
  "Entertainment",
  "Health & Wellness"
];

export const cities = [
  "All",
  "Bujumbura",
];

export const tags = [
  "All",
  "Festival",
  "Outdoor",
  "Family",
  "Charity",
  "Live Music",
  "Networking",
  "Exhibition",
  "Workshop",
  "Performance",
  "Cultural",
  "Food"
];

export const durations = [
  "All",
  "1 day",
  "2 days",
  "3 days",
  "1 week",
  "2 weeks",
  "1 month"
];

export function getEventById(id: string) {
  return events.find(event => event.id === id);
}

export function getEventsByCategory(category: string) {
  if (category === "All") return events;
  return events.filter(event => event.category === category);
}

export function getEventsByCity(city: string) {
  if (city === "All") return events;
  return events.filter(event => event.location.city === city);
}

export function getEventsByTag(tag: string) {
  if (tag === "All") return events;
  return events.filter(event => event.tags.includes(tag));
}

export function getEventsByDuration(duration: string) {
  if (duration === "All") return events;
  return events.filter(event => event.duration === duration);
}

export function getFeaturedEvents() {
  return events.filter(event => event.featured);
}
