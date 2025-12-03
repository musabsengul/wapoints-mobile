// Auth Types
export interface LoginRequest {
  email_or_phone: string;
  password: string;
}

export interface User {
  id: string;
  full_name: string;
  email: string;
  role: string;
}

export interface Resource {
  id: string;
  name: string;
  location: string;
}

export interface LoginResponse {
  access_token: string;
  user: User;
  resource: Resource;
}

// Appointment Types
export type AppointmentStatus = 'PENDING' | 'CONFIRMED' | 'CANCELLED' | 'REJECTED';

export interface Appointment {
  id: string;
  start_at: string;
  end_at: string;
  status: AppointmentStatus;
  customer_name: string;
  service_name: string;
  resource_name: string;
}

export interface AppointmentListParams {
  start_date?: string;
  end_date?: string;
  status?: AppointmentStatus;
  location_id?: string;
  service_id?: string;
  customer_id?: string;
  search?: string;
}

// API Error Types
export interface ApiError {
  message: string;
  statusCode?: number;
}

