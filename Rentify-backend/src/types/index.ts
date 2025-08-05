export interface User {
  id: string;
  email: string;
  password_hash?: string;
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

export interface Car {
  car_id: number;
  make?: string;
  brand?: string;
  model?: string;
  version?: string;
  color?: string;
  fuel_type?: string;
  transmission?: string;
  doors?: string;
  body_style?: string;
  tire_type?: string;
  model_year_range?: string;
  vehicle?: string;
  type?: string;
  monthly_fee_without_tax?: number;
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
  category?: string;
  value?: string;
}

export interface CarImage {
  image_id: number;
  car_id: number;
  image_url?: string;
}

export interface Website {
  website_id: number;
  car_id: number;
  name?: string;
  url?: string;
  main_url?: string;
  logo_url?: string;
}

export interface WebsiteService {
  service_id: number;
  website_id: number;
  service_name?: string;
}

export interface PricingOption {
  pricing_id: number;
  car_id: number;
  website_id: number;
  duration_months?: number;
  annual_kms?: number;
  monthly_fee?: number;
  monthly_fee_without_tax?: number;
  total_payable?: string;
  excess_km_rate?: string;
  underuse_km_refund?: string;
}

export interface CreateUserDTO {
  email: string;
  password: string;
  first_name?: string;
  last_name?: string;
  phone?: string;
  address?: string;
  customer_type?: 'individual' | 'self_employed' | 'company';
}

export interface UpdateUserDTO {
  first_name?: string;
  last_name?: string;
  phone?: string;
  address?: string;
  customer_type?: 'individual' | 'self_employed' | 'company';
}

export interface LoginDTO {
  email: string;
  password: string;
}

export interface CreateCarDTO {
  make?: string;
  brand?: string;
  model?: string;
  version?: string;
  color?: string;
  fuel_type?: string;
  transmission?: string;
  doors?: string;
  body_style?: string;
  tire_type?: string;
  model_year_range?: string;
  vehicle?: string;
  type?: string;
  monthly_fee_without_tax?: number;
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

export interface CarWithDetails extends Car {
  features?: CarFeature[];
  images?: CarImage[];
  websites?: Website[];
  pricing_options?: PricingOption[];
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
}

export interface PaginationParams {
  page: number;
  limit: number;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}

export interface CarSearchFilters {
  make?: string;
  brand?: string;
  model?: string;
  fuel_type?: string;
  transmission?: string;
  body_style?: string;
  min_price?: number;
  max_price?: number;
  year_range?: string;
}

// Export booking types
export * from './booking';
