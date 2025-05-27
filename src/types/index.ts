// User & Authentication Types
export interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'staff' | 'customer';
  avatar?: string;
  createdAt: Date;
  lastLogin?: Date;
}

// Customer Types
export interface Customer {
  id: string;
  name: string;
  phone: string;
  email?: string;
  address?: string;
  dateOfBirth?: Date;
  gender?: 'male' | 'female' | 'other';
  notes?: string;
  createdAt: Date;
  lastVisit?: Date;
  totalVisits: number;
  totalSpent: number;
  preferredServices: string[];
  loyaltyPoints?: number;
  status: 'active' | 'inactive' | 'vip';
}

// Service Types
export interface Service {
  id: string;
  name: string;
  category: string;
  description?: string;
  duration: number; // in minutes
  price: number;
  isActive: boolean;
  requiredStaff?: number;
  popularity: number; // 1-5 rating
  createdAt: Date;
  updatedAt: Date;
}

// Service Category Types
export interface ServiceCategory {
  id: string;
  name: string;
  description?: string;
  icon?: string;
  services: Service[];
  isActive: boolean;
}

// Staff Types
export interface Staff {
  id: string;
  name: string;
  phone: string;
  email?: string;
  specialties: string[];
  workingHours: WorkingHours;
  isAvailable: boolean;
  rating: number; // 1-5
  experienceYears: number;
  hireDate: Date;
  salary?: number;
  commissionRate?: number;
}

// Working Hours Types
export interface WorkingHours {
  [key: string]: {
    start: string; // "09:00"
    end: string;   // "18:00"
    isWorking: boolean;
  };
}

// Appointment Types
export interface Appointment {
  id: string;
  customerId: string;
  customerName: string;
  customerPhone: string;
  serviceId: string;
  serviceName: string;
  staffId?: string;
  staffName?: string;
  date: Date;
  startTime: string; // "14:30"
  endTime: string;   // "15:30"
  duration: number;  // in minutes
  totalPrice: number;
  status: 'pending' | 'confirmed' | 'in-progress' | 'completed' | 'cancelled' | 'no-show';
  notes?: string;
  reminderSent?: boolean;
  paymentStatus: 'pending' | 'paid' | 'partial' | 'refunded';
  createdAt: Date;
  updatedAt: Date;
}

// Payment Types
export interface Payment {
  id: string;
  appointmentId: string;
  customerId: string;
  amount: number;
  method: 'cash' | 'card' | 'transfer' | 'credit';
  status: 'pending' | 'completed' | 'failed' | 'refunded';
  transactionId?: string;
  paidAt?: Date;
  refundedAt?: Date;
  notes?: string;
}

// Inventory Types
export interface Product {
  id: string;
  name: string;
  category: string;
  brand?: string;
  currentStock: number;
  minStock: number;
  maxStock: number;
  unit: string; // "عدد", "لیتر", "کیلوگرم"
  costPrice: number;
  sellingPrice: number;
  barcode?: string;
  expiryDate?: Date;
  supplier?: string;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

// Analytics & Statistics Types
export interface DashboardStats {
  todayAppointments: number;
  todayRevenue: number;
  totalCustomers: number;
  monthlyRevenue: number;
  completedAppointments: number;
  cancelledAppointments: number;
  averageServiceTime: number;
  customerSatisfaction: number;
}

export interface RevenueData {
  date: string;
  amount: number;
  appointments: number;
}

export interface ServicePopularity {
  serviceName: string;
  bookings: number;
  revenue: number;
  percentage: number;
}

// UI Component Types
export interface ButtonProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'success' | 'danger' | 'warning';
  size?: 'sm' | 'md' | 'lg';
  onClick?: () => void;
  disabled?: boolean;
  loading?: boolean;
  icon?: string;
  className?: string;
  type?: 'button' | 'submit' | 'reset';
}

export interface CardProps {
  title?: string;
  subtitle?: string;
  children: React.ReactNode;
  className?: string;
  action?: React.ReactNode;
  loading?: boolean;
}

// Form Types
export interface FormField {
  name: string;
  label: string;
  type: 'text' | 'email' | 'tel' | 'date' | 'time' | 'select' | 'textarea' | 'number';
  placeholder?: string;
  required?: boolean;
  options?: { value: string; label: string }[];
  validation?: {
    min?: number;
    max?: number;
    pattern?: string;
    message?: string;
  };
}

// Settings Types
export interface BusinessSettings {
  name: string;
  address: string;
  phone: string;
  email: string;
  website?: string;
  workingHours: WorkingHours;
  timeSlotDuration: number; // in minutes
  advanceBookingDays: number;
  cancellationPolicy: string;
  currency: string;
  taxRate: number;
  loyaltyProgram: {
    enabled: boolean;
    pointsPerToman: number;
    redemptionRate: number;
  };
}

// Notification Types
export interface Notification {
  id: string;
  title: string;
  message: string;
  type: 'info' | 'success' | 'warning' | 'error';
  isRead: boolean;
  createdAt: Date;
  actionUrl?: string;
}

// API Response Types
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  message: string;
  errors?: string[];
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

// Filter & Search Types
export interface AppointmentFilters {
  dateFrom?: Date;
  dateTo?: Date;
  status?: Appointment['status'];
  serviceId?: string;
  staffId?: string;
  customerId?: string;
}

export interface CustomerFilters {
  status?: Customer['status'];
  lastVisitFrom?: Date;
  lastVisitTo?: Date;
  totalSpentMin?: number;
  totalSpentMax?: number;
  preferredService?: string;
}

// Export utility types
export type Optional<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;
export type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P];
};
