import { supabaseAdmin } from '../config/supabase';
import logger from '../config/logger';

export class DatabaseService {
  async initializeDatabase(): Promise<void> {
    try {
      logger.info('Initializing database connection...');
      
      // Test the connection
      const { error } = await supabaseAdmin
        .from('users')
        .select('count', { count: 'exact', head: true });

      if (error) {
        throw new Error(`Database connection failed: ${error.message}`);
      }

      logger.info('Database connection established successfully');
    } catch (error) {
      logger.error('Database initialization failed:', error);
      throw error;
    }
  }

  async createInitialAdminUser(): Promise<void> {
    try {
      const adminEmail = 'admin@rentify.com';
      const adminPassword = 'Admin@123456';

      // Check if admin user already exists
      const { data: existingAdmin } = await supabaseAdmin
        .from('users')
        .select('id')
        .eq('email', adminEmail)
        .single();

      if (existingAdmin) {
        logger.info('Admin user already exists');
        return;
      }

      // Create admin user
      const bcrypt = require('bcryptjs');
      const saltRounds = 12;
      const password_hash = await bcrypt.hash(adminPassword, saltRounds);

      const { error } = await supabaseAdmin
        .from('users')
        .insert([{
          email: adminEmail,
          password_hash,
          first_name: 'System',
          last_name: 'Administrator',
          role: 'admin',
          is_active: true,
          customer_type: 'company'
        }]);

      if (error) {
        throw new Error(`Failed to create admin user: ${error.message}`);
      }

      logger.info('Initial admin user created successfully');
      logger.info(`Admin credentials: ${adminEmail} / ${adminPassword}`);
    } catch (error) {
      logger.error('Failed to create initial admin user:', error);
      throw error;
    }
  }

  async runMigrations(): Promise<void> {
    try {
      logger.info('Running database migrations...');
      
      // Add any custom database migrations here
      // For now, we'll just verify that all tables exist
      
      const tables = ['users', 'cars', 'car_features', 'car_images', 'websites', 'website_services', 'pricing_options'];
      
      for (const table of tables) {
        const { error } = await supabaseAdmin
          .from(table)
          .select('*', { count: 'exact', head: true });

        if (error) {
          logger.error(`Table ${table} not found or accessible:`, error);
          throw new Error(`Table ${table} migration failed`);
        }
      }

      logger.info('All database migrations completed successfully');
    } catch (error) {
      logger.error('Database migration failed:', error);
      throw error;
    }
  }
}
