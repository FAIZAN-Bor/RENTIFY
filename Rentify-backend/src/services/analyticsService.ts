import { supabaseAdmin } from '../config/supabase';
import logger from '../config/logger';

export interface DashboardStats {
  totalCars: number;
  totalUsers: number;
  totalRentals: number;
  revenue: number;
  popularCars: Array<{
    car_id: number;
    make?: string;
    brand?: string;
    model?: string;
    rental_count: number;
  }>;
  recentActivity: Array<{
    type: 'user_registration' | 'car_added' | 'car_viewed';
    message: string;
    timestamp: string;
  }>;
}

export interface CarAnalytics {
  totalViews: number;
  conversionRate: number;
  averageRating: number;
  bookingsThisMonth: number;
  viewsByMonth: Array<{
    month: string;
    views: number;
  }>;
  popularFeatures: Array<{
    category: string;
    value: string;
    count: number;
  }>;
}

export interface UserAnalytics {
  newUsersThisMonth: number;
  activeUsers: number;
  userRetention: number;
  topCustomers: Array<{
    id: string;
    name: string;
    email: string;
    rental_count: number;
  }>;
  userGrowth: Array<{
    month: string;
    new_users: number;
    total_users: number;
  }>;
}

export class AnalyticsService {
  async getDashboardStats(): Promise<DashboardStats> {
    try {
      const [carsResult, usersResult] = await Promise.all([
        supabaseAdmin.from('cars').select('*', { count: 'exact', head: true }),
        supabaseAdmin.from('users').select('*', { count: 'exact', head: true }).eq('is_active', true)
      ]);

      // Get popular cars (for now, just get the most recent ones)
      const { data: popularCars } = await supabaseAdmin
        .from('cars')
        .select('car_id, make, brand, model')
        .order('car_id', { ascending: false })
        .limit(5);

      // Get recent activity (users and cars added recently)
      const { data: recentUsers } = await supabaseAdmin
        .from('users')
        .select('first_name, last_name, created_at')
        .order('created_at', { ascending: false })
        .limit(3);

      const { data: recentCars } = await supabaseAdmin
        .from('cars')
        .select('make, brand, model, car_id')
        .order('car_id', { ascending: false })
        .limit(3);

      const recentActivity = [
        ...(recentUsers?.map(user => ({
          type: 'user_registration' as const,
          message: `${user.first_name || 'New user'} ${user.last_name || ''} registered`,
          timestamp: user.created_at
        })) || []),
        ...(recentCars?.map(car => ({
          type: 'car_added' as const,
          message: `${car.make || ''} ${car.brand || ''} ${car.model || ''} added`,
          timestamp: new Date().toISOString()
        })) || [])
      ].sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()).slice(0, 5);

      return {
        totalCars: carsResult.count || 0,
        totalUsers: usersResult.count || 0,
        totalRentals: 0, // Would come from a rentals table
        revenue: 0, // Would come from rental transactions
        popularCars: popularCars?.map(car => ({
          ...car,
          rental_count: 0 // Would come from actual rental data
        })) || [],
        recentActivity
      };
    } catch (error) {
      logger.error('AnalyticsService.getDashboardStats error:', error);
      throw new Error('Failed to fetch dashboard stats');
    }
  }

  async getCarAnalytics(): Promise<CarAnalytics> {
    try {
      // Get car features popularity
      const { data: features } = await supabaseAdmin
        .from('car_features')
        .select('category, value')
        .order('category');

      const featureCounts = features?.reduce((acc, feature) => {
        const key = `${feature.category}: ${feature.value}`;
        acc[key] = (acc[key] || 0) + 1;
        return acc;
      }, {} as Record<string, number>) || {};

      const popularFeatures = Object.entries(featureCounts)
        .map(([feature, count]) => {
          const [category, value] = feature.split(': ');
          return { category, value, count };
        })
        .sort((a, b) => b.count - a.count)
        .slice(0, 10);

      return {
        totalViews: 0, // Would track page views
        conversionRate: 0, // Would calculate from views to rentals
        averageRating: 0, // Would come from reviews
        bookingsThisMonth: 0, // Would come from bookings
        viewsByMonth: [], // Would track monthly views
        popularFeatures
      };
    } catch (error) {
      logger.error('AnalyticsService.getCarAnalytics error:', error);
      throw new Error('Failed to fetch car analytics');
    }
  }

  async getUserAnalytics(): Promise<UserAnalytics> {
    try {
      const now = new Date();
      const firstDayOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);

      // Get new users this month
      const { count: newUsersThisMonth } = await supabaseAdmin
        .from('users')
        .select('*', { count: 'exact', head: true })
        .eq('is_active', true)
        .gte('created_at', firstDayOfMonth.toISOString());

      // Get total active users
      const { count: activeUsers } = await supabaseAdmin
        .from('users')
        .select('*', { count: 'exact', head: true })
        .eq('is_active', true);

      // Get user growth for the last 6 months
      const userGrowth = [];
      for (let i = 5; i >= 0; i--) {
        const monthStart = new Date(now.getFullYear(), now.getMonth() - i, 1);
        const monthEnd = new Date(now.getFullYear(), now.getMonth() - i + 1, 0);
        
        const { count: monthlyUsers } = await supabaseAdmin
          .from('users')
          .select('*', { count: 'exact', head: true })
          .eq('is_active', true)
          .gte('created_at', monthStart.toISOString())
          .lte('created_at', monthEnd.toISOString());

        const { count: totalUsers } = await supabaseAdmin
          .from('users')
          .select('*', { count: 'exact', head: true })
          .eq('is_active', true)
          .lte('created_at', monthEnd.toISOString());

        userGrowth.push({
          month: monthStart.toLocaleString('default', { month: 'short', year: 'numeric' }),
          new_users: monthlyUsers || 0,
          total_users: totalUsers || 0
        });
      }

      return {
        newUsersThisMonth: newUsersThisMonth || 0,
        activeUsers: activeUsers || 0,
        userRetention: 85, // Would calculate from actual usage data
        topCustomers: [], // Would come from rental history
        userGrowth
      };
    } catch (error) {
      logger.error('AnalyticsService.getUserAnalytics error:', error);
      throw new Error('Failed to fetch user analytics');
    }
  }
}
