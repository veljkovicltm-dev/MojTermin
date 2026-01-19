
export type Category = 'Kozmetički saloni' | 'Frizerski saloni' | 'Fitness i teretana' | 'Spa i Wellness' | 'Saloni za masažu' | 'Medical';

export interface Staff {
  id: string;
  name: string;
  role: string;
  avatar: string;
  // Added specialties as it is used in AdminDashboard and ensures type consistency
  specialties?: string[];
}

export interface Service {
  id: string;
  name: string;
  duration: number;
  price: number;
  description: string;
}

export interface Business {
  id: string;
  name: string;
  category: Category;
  city: string;
  rating: number;
  image: string;
  address: string;
  description: string;
  services: Service[];
  staff: Staff[];
}

export interface Booking {
  id: string;
  businessId: string;
  serviceId: string;
  staffId?: string;
  businessName: string;
  serviceName: string;
  staffName?: string;
  date: string;
  time: string;
  customerName: string;
  price: number;
  status: 'confirmed' | 'cancelled' | 'no-show';
  paymentStatus: 'unpaid' | 'paid' | 'guaranteed';
}

// Added PlatformConfig interface used in PlatformDashboard
export interface PlatformConfig {
  iban: string;
  pib: string;
  stripeKey?: string;
}
