import { Router } from 'express';
import userRoutes from './userRoutes';
import carRoutes from './carRoutes';
import analyticsRoutes from './analyticsRoutes';
// import bookingRoutes from './bookingRoutes';

const router = Router();

// API routes
router.use('/users', userRoutes);
router.use('/cars', carRoutes);
// router.use('/bookings', bookingRoutes);
router.use('/analytics', analyticsRoutes);

// Health check endpoint
router.get('/health', (_req, res) => {
  res.json({
    success: true,
    message: 'Rentify API is running!',
    timestamp: new Date().toISOString(),
    version: '1.0.0'
  });
});

export default router;
