import { Router } from 'express';
import { BookingController } from '../controllers/bookingController';
import { authenticateToken, requireAdminOrManager } from '../middleware/auth';
import { validateSchema } from '../middleware/validation';
import Joi from 'joi';

const router = Router();
const bookingController = new BookingController();

// Booking validation schemas
const createBookingSchema = Joi.object({
  car_id: Joi.number().integer().positive().required(),
  pricing_option_id: Joi.number().integer().positive().required(),
  start_date: Joi.date().iso().required(),
  end_date: Joi.date().iso().min(Joi.ref('start_date')).required(),
  duration_months: Joi.number().integer().min(1).required(),
  annual_kms: Joi.number().integer().min(0).required(),
  special_requests: Joi.string().max(500).optional()
});

const updateBookingSchema = Joi.object({
  status: Joi.string().valid('pending', 'confirmed', 'active', 'completed', 'cancelled').optional(),
  start_date: Joi.date().iso().optional(),
  end_date: Joi.date().iso().optional(),
  special_requests: Joi.string().max(500).optional()
});

// User routes (require authentication)
router.post('/', authenticateToken, validateSchema(createBookingSchema), bookingController.createBooking);
router.get('/my', authenticateToken, bookingController.getMyBookings);
router.put('/:id/cancel', authenticateToken, bookingController.cancelBooking);

// Public routes
router.get('/availability/:carId', bookingController.checkAvailability);

// Admin/Manager routes
router.get('/', authenticateToken, requireAdminOrManager, bookingController.getAllBookings);
router.get('/stats', authenticateToken, requireAdminOrManager, bookingController.getBookingStats);
router.get('/:id', authenticateToken, requireAdminOrManager, bookingController.getBookingById);
router.put('/:id', authenticateToken, requireAdminOrManager, validateSchema(updateBookingSchema), bookingController.updateBooking);

export default router;
