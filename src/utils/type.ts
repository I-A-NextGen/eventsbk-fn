
export interface Event {
    id: string;
    title: string;
    description: string;
    startDate: string;
    endDate: string;
    time: string;
    duration: string; // Duration in hours/days
    location: {
      name: string;
      address: string;
      city: string;
      country: string;
      coordinates: [number, number]; // [latitude, longitude]
    };
    price: number;
    category: string;
    tags: string[]; // Added tags
    image: string;
    organizer: {
      name: string;
      logo?: string;
      description?: string;
    };
    ticketsAvailable: number;
    featured: boolean;
  }
  
  export interface User {
    id: string;
    name: string;
    email: string;
    tickets: string[]; // IDs of purchased tickets
  }
  
  export interface Ticket {
    id: string;
    eventId: string;
    userId: string;
    purchaseDate: string;
    price: number;
    quantity: number;
  }
  
  export interface CartItem {
    eventId: string;
    quantity: number;
  }
  
  export type FilterOptions = {
    category: string | null;
    city: string | null;
    date: string | null;
    priceRange: [number, number] | null;
    tags: string[] | null;
    duration: string | null;
  };
  
  export type PaymentMethod = 'card' | 'mtn' | 'tigo';
  
  export interface PaymentInfo {
    paymentMethod: PaymentMethod;
    // Card details (only used when paymentMethod is 'card')
    cardNumber?: string;
    cardHolder?: string;
    expiryDate?: string;
    cvv?: string;
    // Mobile money details (only used when paymentMethod is 'mtn' or 'tigo')
    phoneNumber?: string;
  }
  
  