import { Request, Response } from 'express';
import { UserService } from '../services/userService';
import { AuthenticatedRequest } from '../middleware/auth';
import logger from '../config/logger';

const userService = new UserService();

export class UserController {
  async register(req: Request, res: Response): Promise<void> {
    try {
      const user = await userService.createUser(req.body);
      
      res.status(201).json({
        success: true,
        data: user,
        message: 'User registered successfully'
      });
    } catch (error: any) {
      logger.error('UserController.register error:', error);
      res.status(400).json({
        success: false,
        error: error.message || 'Registration failed'
      });
    }
  }

  async login(req: Request, res: Response): Promise<void> {
    try {
      const { email, password } = req.body;
      const result = await userService.authenticateUser(email, password);
      
      res.json({
        success: true,
        data: {
          user: result.user,
          token: result.token
        },
        message: 'Login successful'
      });
    } catch (error: any) {
      logger.error('UserController.login error:', error);
      res.status(401).json({
        success: false,
        error: error.message || 'Login failed'
      });
    }
  }

  async getProfile(req: AuthenticatedRequest, res: Response): Promise<void> {
    try {
      if (!req.user) {
        res.status(401).json({
          success: false,
          error: 'User not authenticated'
        });
        return;
      }

      const user = await userService.getUserById(req.user.id);
      
      if (!user) {
        res.status(404).json({
          success: false,
          error: 'User not found'
        });
        return;
      }

      res.json({
        success: true,
        data: user
      });
    } catch (error: any) {
      logger.error('UserController.getProfile error:', error);
      res.status(500).json({
        success: false,
        error: 'Failed to fetch profile'
      });
    }
  }

  async updateProfile(req: AuthenticatedRequest, res: Response): Promise<void> {
    try {
      if (!req.user) {
        res.status(401).json({
          success: false,
          error: 'User not authenticated'
        });
        return;
      }

      const updatedUser = await userService.updateUser(req.user.id, req.body);
      
      res.json({
        success: true,
        data: updatedUser,
        message: 'Profile updated successfully'
      });
    } catch (error: any) {
      logger.error('UserController.updateProfile error:', error);
      res.status(400).json({
        success: false,
        error: error.message || 'Failed to update profile'
      });
    }
  }

  async changePassword(req: AuthenticatedRequest, res: Response): Promise<void> {
    try {
      if (!req.user) {
        res.status(401).json({
          success: false,
          error: 'User not authenticated'
        });
        return;
      }

      const { oldPassword, newPassword } = req.body;
      
      if (!oldPassword || !newPassword) {
        res.status(400).json({
          success: false,
          error: 'Old password and new password are required'
        });
        return;
      }

      await userService.changePassword(req.user.id, oldPassword, newPassword);
      
      res.json({
        success: true,
        message: 'Password changed successfully'
      });
    } catch (error: any) {
      logger.error('UserController.changePassword error:', error);
      res.status(400).json({
        success: false,
        error: error.message || 'Failed to change password'
      });
    }
  }

  async deleteAccount(req: AuthenticatedRequest, res: Response): Promise<void> {
    try {
      if (!req.user) {
        res.status(401).json({
          success: false,
          error: 'User not authenticated'
        });
        return;
      }

      await userService.deleteUser(req.user.id);
      
      res.json({
        success: true,
        message: 'Account deleted successfully'
      });
    } catch (error: any) {
      logger.error('UserController.deleteAccount error:', error);
      res.status(500).json({
        success: false,
        error: 'Failed to delete account'
      });
    }
  }

  // Admin only methods
  async getAllUsers(req: Request, res: Response): Promise<void> {
    try {
      const page = parseInt(req.query.page as string) || 1;
      const limit = parseInt(req.query.limit as string) || 20;

      const result = await userService.getAllUsers(page, limit);
      
      res.json({
        success: true,
        data: {
          users: result.users,
          pagination: {
            page,
            limit,
            total: result.total,
            totalPages: Math.ceil(result.total / limit)
          }
        }
      });
    } catch (error: any) {
      logger.error('UserController.getAllUsers error:', error);
      res.status(500).json({
        success: false,
        error: 'Failed to fetch users'
      });
    }
  }

  async getUserById(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const user = await userService.getUserById(id);
      
      if (!user) {
        res.status(404).json({
          success: false,
          error: 'User not found'
        });
        return;
      }

      res.json({
        success: true,
        data: user
      });
    } catch (error: any) {
      logger.error('UserController.getUserById error:', error);
      res.status(500).json({
        success: false,
        error: 'Failed to fetch user'
      });
    }
  }

  async updateUser(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const updatedUser = await userService.updateUser(id, req.body);
      
      res.json({
        success: true,
        data: updatedUser,
        message: 'User updated successfully'
      });
    } catch (error: any) {
      logger.error('UserController.updateUser error:', error);
      res.status(400).json({
        success: false,
        error: error.message || 'Failed to update user'
      });
    }
  }

  async deleteUser(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      await userService.deleteUser(id);
      
      res.json({
        success: true,
        message: 'User deleted successfully'
      });
    } catch (error: any) {
      logger.error('UserController.deleteUser error:', error);
      res.status(500).json({
        success: false,
        error: 'Failed to delete user'
      });
    }
  }
}
