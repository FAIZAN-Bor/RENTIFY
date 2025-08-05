import { Router } from 'express';
import { AnalyticsController } from '../controllers/analyticsController';
import { authenticateToken, requireAdminOrManager } from '../middleware/auth';

const router = Router();
const analyticsController = new AnalyticsController();

// All analytics routes require admin or manager access
router.get('/dashboard', authenticateToken, requireAdminOrManager, analyticsController.getDashboardStats);
router.get('/cars', authenticateToken, requireAdminOrManager, analyticsController.getCarAnalytics);
router.get('/users', authenticateToken, requireAdminOrManager, analyticsController.getUserAnalytics);

export default router;
