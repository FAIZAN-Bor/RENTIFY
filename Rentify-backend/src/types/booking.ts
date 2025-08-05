export interface Booking {
  booking_id: string;
  user_id: string;
  car_id: number;
  pricing_option_id: number;
  start_date: string;
  end_date: string;
  status: 'pending' | 'confirmed' | 'active' | 'completed' | 'cancelled';
  total_amount: number;
  monthly_fee: number;
  duration_months: number;
  annual_kms: number;
  special_requests?: string;
  created_at: string;
  updated_at: string;
}

export interface BookingWithDetails extends Booking {
  user?: {
    id: string;
    email: string;
    first_name?: string;
    last_name?: string;
    phone?: string;
  };
  car?: {
    car_id: number;
    make?: string;
    brand?: string;
    model?: string;
    version?: string;
    color?: string;
  };
  pricing_option?: {
    duration_months?: number;
    annual_kms?: number;
    monthly_fee?: number;
    total_payable?: string;
  };
}

export interface CreateBookingDTO {
  car_id: number;
  pricing_option_id: number;
  start_date: string;
  end_date: string;
  duration_months: number;
  annual_kms: number;
  special_requests?: string;
}

export interface UpdateBookingDTO {
  status?: 'pending' | 'confirmed' | 'active' | 'completed' | 'cancelled';
  start_date?: string;
  end_date?: string;
  special_requests?: string;
}

export interface BookingFilters {
  status?: string;
  user_id?: string;
  car_id?: number;
  start_date?: string;
  end_date?: string;
}
