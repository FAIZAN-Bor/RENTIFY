const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api/v1';

// Types for API responses
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export interface PaginationInfo {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

export interface Car {
  car_id: number;
  make: string;
  brand: string;
  model: string;
  version?: string;
  color?: string;
  fuel_type: string;
  transmission: string;
  doors?: string;
  body_style: string;
  tire_type?: string;
  model_year_range?: string;
  vehicle?: string;
  type: string;
  monthly_fee_without_tax: number;
  maximum_horsepower?: number;
  maximum_horsepower_unit?: string;
  maximum_speed?: number;
  maximum_speed_unit?: string;
  fuel_capacity?: number;
  fuel_capacity_unit?: string;
  energy_label?: string;
  energy_label_url?: string;
  eu_energy_label_class?: string;
}

export interface CarFeature {
  feature_id: number;
  car_id: number;
  category: string;
  value: string;
}

export interface CarImage {
  image_id: number;
  car_id: number;
  image_url: string;
}

export interface Website {
  website_id: number;
  car_id: number;
  name: string;
  url: string;
  main_url: string;
  logo_url: string;
}

export interface PricingOption {
  pricing_id: number;
  car_id: number;
  website_id: number;
  duration_months: number;
  annual_kms: number;
  monthly_fee: number;
  monthly_fee_without_tax: number;
  total_payable: string;
  excess_km_rate: string;
  underuse_km_refund: string;
}

export interface CarWithDetails extends Car {
  features: CarFeature[];
  images: CarImage[];
  websites: Website[];
  pricing_options: PricingOption[];
  rating_avg?: number;
  rating_count?: number;
  specifications?: { seats?: number; [key: string]: any };
  providers?: Array<{ name: string; rating?: number }>;
}

export interface User {
  id: string;
  email: string;
  first_name?: string;
  last_name?: string;
  phone?: string;
  profile_image_url?: string;
  address?: string;
  customer_type?: 'individual' | 'self_employed' | 'company';
  role: 'user' | 'admin' | 'manager';
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface LoginData {
  email: string;
  password: string;
}

export interface RegisterData {
  email: string;
  password: string;
  first_name: string;
  last_name: string;
  phone?: string;
  customer_type: 'individual' | 'self_employed' | 'company';
}

// Auth token management
export const getAuthToken = (): string | null => {
  if (typeof window !== 'undefined') {
    return localStorage.getItem('authToken');
  }
  return null;
};

export const setAuthToken = (token: string): void => {
  if (typeof window !== 'undefined') {
    localStorage.setItem('authToken', token);
  }
};

export const removeAuthToken = (): void => {
  if (typeof window !== 'undefined') {
    localStorage.removeItem('authToken');
  }
};

// API request helper
const apiRequest = async <T>(
  endpoint: string, 
  options: RequestInit = {}
): Promise<ApiResponse<T>> => {
  const token = getAuthToken();
  
  const defaultHeaders: HeadersInit = {
    'Content-Type': 'application/json',
  };

  if (token) {
    defaultHeaders.Authorization = `Bearer ${token}`;
  }

  const config: RequestInit = {
    headers: defaultHeaders,
    ...options,
  };

  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, config);
    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || 'An error occurred');
    }

    return data;
  } catch (error) {
    console.error('API request error:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'An unknown error occurred',
    };
  }
};

// Auth API
export const authApi = {
  login: async (loginData: LoginData): Promise<ApiResponse<{ user: User; token: string }>> => {
    return apiRequest('/users/login', {
      method: 'POST',
      body: JSON.stringify(loginData),
    });
  },

  register: async (registerData: RegisterData): Promise<ApiResponse<User>> => {
    return apiRequest('/users/register', {
      method: 'POST',
      body: JSON.stringify(registerData),
    });
  },

  getProfile: async (): Promise<ApiResponse<User>> => {
    return apiRequest('/users/profile');
  },

  updateProfile: async (profileData: Partial<User>): Promise<ApiResponse<User>> => {
    return apiRequest('/users/profile', {
      method: 'PUT',
      body: JSON.stringify(profileData),
    });
  },

  changePassword: async (oldPassword: string, newPassword: string): Promise<ApiResponse<void>> => {
    return apiRequest('/users/change-password', {
      method: 'POST',
      body: JSON.stringify({ oldPassword, newPassword }),
    });
  },
};

// Cars API
export const carsApi = {
  getCars: async (params?: {
    page?: number;
    limit?: number;
    make?: string;
    brand?: string;
    model?: string;
    fuel_type?: string;
    transmission?: string;
    body_style?: string;
    min_price?: number;
    max_price?: number;
    year_range?: string;
    sortBy?: string;
    sortOrder?: 'asc' | 'desc';
  }): Promise<ApiResponse<{ cars: Car[]; pagination: PaginationInfo }>> => {
    const searchParams = new URLSearchParams();
    
    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined && value !== null && value !== '') {
          searchParams.append(key, value.toString());
        }
      });
    }

    return apiRequest(`/cars?${searchParams.toString()}`);
  },

  getCarById: async (id: number, includeDetails = true): Promise<ApiResponse<CarWithDetails>> => {
    return apiRequest(`/cars/${id}?details=${includeDetails}`);
  },

  searchCars: async (query: string): Promise<ApiResponse<Car[]>> => {
    return apiRequest(`/cars/search?q=${encodeURIComponent(query)}`);
  },

  getPopularCars: async (): Promise<ApiResponse<Car[]>> => {
    return apiRequest('/cars/popular');
  },
};

export interface AnalyticsStats {
  total_cars: number;
  total_bookings: number;
  total_revenue: number;
  active_users: number;
}

export interface BookingStats {
  daily_bookings: Array<{ date: string; count: number; revenue: number }>;
  monthly_bookings: Array<{ month: string; count: number; revenue: number }>;
  popular_cars: Array<{ car_id: number; make: string; model: string; booking_count: number }>;
}

// Analytics API
export const analyticsApi = {
  getStats: async (): Promise<ApiResponse<AnalyticsStats>> => {
    return apiRequest('/analytics/stats');
  },

  getBookingStats: async (params?: {
    start_date?: string;
    end_date?: string;
  }): Promise<ApiResponse<BookingStats>> => {
    const searchParams = new URLSearchParams();
    
    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined && value !== null && value !== '') {
          searchParams.append(key, value.toString());
        }
      });
    }

    return apiRequest(`/analytics/bookings?${searchParams.toString()}`);
  },
};
