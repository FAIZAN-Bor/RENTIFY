import { supabaseAdmin } from '../config/supabase';
import { User, CreateUserDTO, UpdateUserDTO } from '../types';
import bcrypt from 'bcryptjs';
import * as jwt from 'jsonwebtoken';
import { config } from '../config';
import logger from '../config/logger';

export class UserService {
  async createUser(userData: CreateUserDTO): Promise<User> {
    try {
      // Check if user already exists
      const { data: existingUser } = await supabaseAdmin
        .from('users')
        .select('id')
        .eq('email', userData.email)
        .single();

      if (existingUser) {
        throw new Error('User already exists with this email');
      }

      // Hash password
      const saltRounds = 12;
      const password_hash = await bcrypt.hash(userData.password, saltRounds);

      // Create user
      const { data, error } = await supabaseAdmin
        .from('users')
        .insert([{
          email: userData.email,
          password_hash,
          first_name: userData.first_name,
          last_name: userData.last_name,
          phone: userData.phone,
          address: userData.address,
          customer_type: userData.customer_type || 'individual',
          role: 'user',
          is_active: true
        }])
        .select()
        .single();

      if (error) {
        logger.error('Error creating user:', error);
        throw new Error('Failed to create user');
      }

      // Remove password_hash from response
      const { password_hash: _, ...userWithoutPassword } = data;
      return userWithoutPassword as User;
    } catch (error) {
      logger.error('UserService.createUser error:', error);
      throw error;
    }
  }

  async authenticateUser(email: string, password: string): Promise<{ user: User; token: string }> {
    try {
      const { data: user, error } = await supabaseAdmin
        .from('users')
        .select('*')
        .eq('email', email)
        .eq('is_active', true)
        .single();

      if (error || !user) {
        throw new Error('Invalid credentials');
      }

      if (!user.password_hash) {
        throw new Error('Invalid credentials');
      }

      const isValidPassword = await bcrypt.compare(password, user.password_hash);
      if (!isValidPassword) {
        throw new Error('Invalid credentials');
      }

      // Generate JWT token
      const payload = { userId: user.id, email: user.email, role: user.role };
      const secret = config.jwtSecret as string;
      const token = jwt.sign(payload, secret, { expiresIn: '7d' });

      // Remove password_hash from response
      const { password_hash: _, ...userWithoutPassword } = user;
      return {
        user: userWithoutPassword as User,
        token
      };
    } catch (error) {
      logger.error('UserService.authenticateUser error:', error);
      throw error;
    }
  }

  async getUserById(id: string): Promise<User | null> {
    try {
      const { data, error } = await supabaseAdmin
        .from('users')
        .select('*')
        .eq('id', id)
        .eq('is_active', true)
        .single();

      if (error || !data) {
        return null;
      }

      const { password_hash: _, ...userWithoutPassword } = data;
      return userWithoutPassword as User;
    } catch (error) {
      logger.error('UserService.getUserById error:', error);
      return null;
    }
  }

  async updateUser(id: string, userData: UpdateUserDTO): Promise<User> {
    try {
      const { data, error } = await supabaseAdmin
        .from('users')
        .update({
          ...userData,
          updated_at: new Date().toISOString()
        })
        .eq('id', id)
        .eq('is_active', true)
        .select()
        .single();

      if (error || !data) {
        throw new Error('Failed to update user');
      }

      const { password_hash: _, ...userWithoutPassword } = data;
      return userWithoutPassword as User;
    } catch (error) {
      logger.error('UserService.updateUser error:', error);
      throw error;
    }
  }

  async deleteUser(id: string): Promise<boolean> {
    try {
      const { error } = await supabaseAdmin
        .from('users')
        .update({ is_active: false, updated_at: new Date().toISOString() })
        .eq('id', id);

      if (error) {
        throw new Error('Failed to delete user');
      }

      return true;
    } catch (error) {
      logger.error('UserService.deleteUser error:', error);
      throw error;
    }
  }

  async getAllUsers(page: number = 1, limit: number = 20): Promise<{ users: User[]; total: number }> {
    try {
      const offset = (page - 1) * limit;

      const [usersResult, countResult] = await Promise.all([
        supabaseAdmin
          .from('users')
          .select('*')
          .eq('is_active', true)
          .order('created_at', { ascending: false })
          .range(offset, offset + limit - 1),
        supabaseAdmin
          .from('users')
          .select('*', { count: 'exact', head: true })
          .eq('is_active', true)
      ]);

      if (usersResult.error) {
        throw new Error('Failed to fetch users');
      }

      const users = usersResult.data.map(user => {
        const { password_hash: _, ...userWithoutPassword } = user;
        return userWithoutPassword as User;
      });

      return {
        users,
        total: countResult.count || 0
      };
    } catch (error) {
      logger.error('UserService.getAllUsers error:', error);
      throw error;
    }
  }

  async changePassword(id: string, oldPassword: string, newPassword: string): Promise<boolean> {
    try {
      const { data: user, error } = await supabaseAdmin
        .from('users')
        .select('password_hash')
        .eq('id', id)
        .eq('is_active', true)
        .single();

      if (error || !user || !user.password_hash) {
        throw new Error('User not found');
      }

      const isValidPassword = await bcrypt.compare(oldPassword, user.password_hash);
      if (!isValidPassword) {
        throw new Error('Invalid current password');
      }

      const saltRounds = 12;
      const newPasswordHash = await bcrypt.hash(newPassword, saltRounds);

      const { error: updateError } = await supabaseAdmin
        .from('users')
        .update({
          password_hash: newPasswordHash,
          updated_at: new Date().toISOString()
        })
        .eq('id', id);

      if (updateError) {
        throw new Error('Failed to update password');
      }

      return true;
    } catch (error) {
      logger.error('UserService.changePassword error:', error);
      throw error;
    }
  }
}
