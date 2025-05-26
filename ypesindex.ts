// Customer Types
export interface Customer {
  id: string;
  name: string;
  phone: string;
  email?: string;
  lastVisit?: Date;
  totalVisits: number;
  preferredServices: string[];
}

// Appointment Types
export interface Appointment {
  id: string;
  customerId: string;
  customerName: string;
  service: string;
  date: Date;
  duration: number; // minutes
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled';
  notes?: string;
}

// Service Types
export interface Service {
  id: string;
  name: string;
  duration: number; // minutes
  price: number;
  category: string;
}
