import { Request, Response } from 'express';
import { AnalyticsService } from '../services/analyticsService';
import logger from '../config/logger';

const analyticsService = new AnalyticsService();

export class AnalyticsController {
  async getDashboardStats(_req: Request, res: Response): Promise<void> {
    try {
      const stats = await analyticsService.getDashboardStats();

      res.json({
        success: true,
        data: stats
      });
    } catch (error: any) {
      logger.error('AnalyticsController.getDashboardStats error:', error);
      res.status(500).json({
        success: false,
        error: 'Failed to fetch dashboard stats'
      });
    }
  }

  async getCarAnalytics(_req: Request, res: Response): Promise<void> {
    try {
      const carAnalytics = await analyticsService.getCarAnalytics();

      res.json({
        success: true,
        data: carAnalytics
      });
    } catch (error: any) {
      logger.error('AnalyticsController.getCarAnalytics error:', error);
      res.status(500).json({
        success: false,
        error: 'Failed to fetch car analytics'
      });
    }
  }

  async getUserAnalytics(_req: Request, res: Response): Promise<void> {
    try {
      const userAnalytics = await analyticsService.getUserAnalytics();

      res.json({
        success: true,
        data: userAnalytics
      });
    } catch (error: any) {
      logger.error('AnalyticsController.getUserAnalytics error:', error);
      res.status(500).json({
        success: false,
        error: 'Failed to fetch user analytics'
      });
    }
  }
}
