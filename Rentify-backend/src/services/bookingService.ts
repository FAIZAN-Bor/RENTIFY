import { supabaseAdmin } from '../config/supabase';
import { 
  Booking, 
  BookingWithDetails, 
  CreateBookingDTO, 
  UpdateBookingDTO,
  BookingFilters 
} from '../types/booking';
import logger from '../config/logger';

// Simple UUID generator function
function generateUUID(): string {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    const r = Math.random() * 16 | 0;
    const v = c === 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
}

export class BookingService {
  async createBooking(userId: string, bookingData: CreateBookingDTO): Promise<Booking> {
    try {
      // First, verify the car and pricing option exist
      const { data: car, error: carError } = await supabaseAdmin
        .from('cars')
        .select('car_id, monthly_fee_without_tax')
        .eq('car_id', bookingData.car_id)
        .single();

      if (carError || !car) {
        throw new Error('Car not found');
      }

      const { data: pricingOption, error: pricingError } = await supabaseAdmin
        .from('pricing_options')
        .select('*')
        .eq('pricing_id', bookingData.pricing_option_id)
        .eq('car_id', bookingData.car_id)
        .single();

      if (pricingError || !pricingOption) {
        throw new Error('Pricing option not found');
      }

      // Calculate total amount
      const monthlyFee = pricingOption.monthly_fee || car.monthly_fee_without_tax || 0;
      const totalAmount = monthlyFee * bookingData.duration_months;

      // Check for overlapping bookings
      const { data: overlappingBookings } = await supabaseAdmin
        .from('bookings')
        .select('booking_id')
        .eq('car_id', bookingData.car_id)
        .in('status', ['confirmed', 'active'])
        .or(`start_date.lte.${bookingData.end_date},end_date.gte.${bookingData.start_date}`);

      if (overlappingBookings && overlappingBookings.length > 0) {
        throw new Error('Car is not available for the selected dates');
      }

      const bookingId = generateUUID();

      const { data, error } = await supabaseAdmin
        .from('bookings')
        .insert([{
          booking_id: bookingId,
          user_id: userId,
          car_id: bookingData.car_id,
          pricing_option_id: bookingData.pricing_option_id,
          start_date: bookingData.start_date,
          end_date: bookingData.end_date,
          duration_months: bookingData.duration_months,
          annual_kms: bookingData.annual_kms,
          monthly_fee: monthlyFee,
          total_amount: totalAmount,
          status: 'pending',
          special_requests: bookingData.special_requests
        }])
        .select()
        .single();

      if (error) {
        logger.error('Error creating booking:', error);
        throw new Error('Failed to create booking');
      }

      return data as Booking;
    } catch (error) {
      logger.error('BookingService.createBooking error:', error);
      throw error;
    }
  }

  async getBookingById(bookingId: string, includeDetails: boolean = false): Promise<BookingWithDetails | null> {
    try {
      const { data: booking, error } = await supabaseAdmin
        .from('bookings')
        .select('*')
        .eq('booking_id', bookingId)
        .single();

      if (error || !booking) {
        return null;
      }

      if (!includeDetails) {
        return booking as BookingWithDetails;
      }

      // Fetch related data
      const [userResult, carResult, pricingResult] = await Promise.all([
        supabaseAdmin
          .from('users')
          .select('id, email, first_name, last_name, phone')
          .eq('id', booking.user_id)
          .single(),
        supabaseAdmin
          .from('cars')
          .select('car_id, make, brand, model, version, color')
          .eq('car_id', booking.car_id)
          .single(),
        supabaseAdmin
          .from('pricing_options')
          .select('duration_months, annual_kms, monthly_fee, total_payable')
          .eq('pricing_id', booking.pricing_option_id)
          .single()
      ]);

      return {
        ...booking,
        user: userResult.data || undefined,
        car: carResult.data || undefined,
        pricing_option: pricingResult.data || undefined
      } as BookingWithDetails;
    } catch (error) {
      logger.error('BookingService.getBookingById error:', error);
      return null;
    }
  }

  async getUserBookings(
    userId: string,
    page: number = 1,
    limit: number = 20,
    filters?: BookingFilters
  ): Promise<{ bookings: BookingWithDetails[]; total: number }> {
    try {
      const offset = (page - 1) * limit;
      let query = supabaseAdmin
        .from('bookings')
        .select(`
          *,
          cars!inner(car_id, make, brand, model, version, color),
          pricing_options!inner(duration_months, annual_kms, monthly_fee, total_payable)
        `, { count: 'exact' })
        .eq('user_id', userId);

      // Apply filters
      if (filters) {
        if (filters.status) query = query.eq('status', filters.status);
        if (filters.car_id) query = query.eq('car_id', filters.car_id);
        if (filters.start_date) query = query.gte('start_date', filters.start_date);
        if (filters.end_date) query = query.lte('end_date', filters.end_date);
      }

      const { data, error, count } = await query
        .order('created_at', { ascending: false })
        .range(offset, offset + limit - 1);

      if (error) {
        throw new Error('Failed to fetch user bookings');
      }

      return {
        bookings: data as BookingWithDetails[],
        total: count || 0
      };
    } catch (error) {
      logger.error('BookingService.getUserBookings error:', error);
      throw error;
    }
  }

  async getAllBookings(
    page: number = 1,
    limit: number = 20,
    filters?: BookingFilters
  ): Promise<{ bookings: BookingWithDetails[]; total: number }> {
    try {
      const offset = (page - 1) * limit;
      let query = supabaseAdmin
        .from('bookings')
        .select(`
          *,
          users!inner(id, email, first_name, last_name, phone),
          cars!inner(car_id, make, brand, model, version, color),
          pricing_options!inner(duration_months, annual_kms, monthly_fee, total_payable)
        `, { count: 'exact' });

      // Apply filters
      if (filters) {
        if (filters.status) query = query.eq('status', filters.status);
        if (filters.user_id) query = query.eq('user_id', filters.user_id);
        if (filters.car_id) query = query.eq('car_id', filters.car_id);
        if (filters.start_date) query = query.gte('start_date', filters.start_date);
        if (filters.end_date) query = query.lte('end_date', filters.end_date);
      }

      const { data, error, count } = await query
        .order('created_at', { ascending: false })
        .range(offset, offset + limit - 1);

      if (error) {
        throw new Error('Failed to fetch bookings');
      }

      return {
        bookings: data as BookingWithDetails[],
        total: count || 0
      };
    } catch (error) {
      logger.error('BookingService.getAllBookings error:', error);
      throw error;
    }
  }

  async updateBooking(bookingId: string, updateData: UpdateBookingDTO): Promise<Booking> {
    try {
      const { data, error } = await supabaseAdmin
        .from('bookings')
        .update({
          ...updateData,
          updated_at: new Date().toISOString()
        })
        .eq('booking_id', bookingId)
        .select()
        .single();

      if (error || !data) {
        throw new Error('Failed to update booking');
      }

      return data as Booking;
    } catch (error) {
      logger.error('BookingService.updateBooking error:', error);
      throw error;
    }
  }

  async cancelBooking(bookingId: string, userId?: string): Promise<boolean> {
    try {
      let query = supabaseAdmin
        .from('bookings')
        .update({ 
          status: 'cancelled',
          updated_at: new Date().toISOString()
        })
        .eq('booking_id', bookingId)
        .in('status', ['pending', 'confirmed']); // Only allow cancellation of pending/confirmed bookings

      if (userId) {
        query = query.eq('user_id', userId);
      }

      const { error } = await query;

      if (error) {
        throw new Error('Failed to cancel booking');
      }

      return true;
    } catch (error) {
      logger.error('BookingService.cancelBooking error:', error);
      throw error;
    }
  }

  async checkCarAvailability(
    carId: number,
    startDate: string,
    endDate: string,
    excludeBookingId?: string
  ): Promise<boolean> {
    try {
      let query = supabaseAdmin
        .from('bookings')
        .select('booking_id')
        .eq('car_id', carId)
        .in('status', ['confirmed', 'active'])
        .or(`start_date.lte.${endDate},end_date.gte.${startDate}`);

      if (excludeBookingId) {
        query = query.neq('booking_id', excludeBookingId);
      }

      const { data } = await query;

      return !data || data.length === 0;
    } catch (error) {
      logger.error('BookingService.checkCarAvailability error:', error);
      throw error;
    }
  }

  async getBookingStats(): Promise<{
    totalBookings: number;
    activeBookings: number;
    pendingBookings: number;
    completedBookings: number;
    totalRevenue: number;
  }> {
    try {
      const [totalResult, activeResult, pendingResult, completedResult, revenueResult] = await Promise.all([
        supabaseAdmin.from('bookings').select('*', { count: 'exact', head: true }),
        supabaseAdmin.from('bookings').select('*', { count: 'exact', head: true }).eq('status', 'active'),
        supabaseAdmin.from('bookings').select('*', { count: 'exact', head: true }).eq('status', 'pending'),
        supabaseAdmin.from('bookings').select('*', { count: 'exact', head: true }).eq('status', 'completed'),
        supabaseAdmin.from('bookings').select('total_amount').in('status', ['completed', 'active'])
      ]);

      const totalRevenue = revenueResult.data?.reduce((sum, booking) => sum + (booking.total_amount || 0), 0) || 0;

      return {
        totalBookings: totalResult.count || 0,
        activeBookings: activeResult.count || 0,
        pendingBookings: pendingResult.count || 0,
        completedBookings: completedResult.count || 0,
        totalRevenue
      };
    } catch (error) {
      logger.error('BookingService.getBookingStats error:', error);
      throw error;
    }
  }
}
