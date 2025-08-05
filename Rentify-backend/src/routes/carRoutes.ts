import { Router } from 'express';
import { CarController } from '../controllers/carController';
import { authenticateToken, requireAdminOrManager } from '../middleware/auth';
import { validateSchema, carCreateSchema, carUpdateSchema, carFeatureSchema, pricingOptionSchema, websiteSchema } from '../middleware/validation';

const router = Router();
const carController = new CarController();

// Public routes
router.get('/', carController.getCars);
router.get('/search', carController.searchCars);
router.get('/popular', carController.getPopularCars);
router.get('/:id', carController.getCarById);

// Protected routes (require admin or manager)
router.post('/', authenticateToken, requireAdminOrManager, validateSchema(carCreateSchema), carController.createCar);
router.put('/:id', authenticateToken, requireAdminOrManager, validateSchema(carUpdateSchema), carController.updateCar);
router.delete('/:id', authenticateToken, requireAdminOrManager, carController.deleteCar);

// Car Features
router.post('/:id/features', authenticateToken, requireAdminOrManager, validateSchema(carFeatureSchema), carController.addCarFeature);
router.delete('/:id/features/:featureId', authenticateToken, requireAdminOrManager, carController.removeCarFeature);

// Car Images
router.post('/:id/images', authenticateToken, requireAdminOrManager, carController.addCarImage);
router.delete('/:id/images/:imageId', authenticateToken, requireAdminOrManager, carController.removeCarImage);

// Websites
router.post('/:id/websites', authenticateToken, requireAdminOrManager, validateSchema(websiteSchema), carController.addWebsite);
router.delete('/:id/websites/:websiteId', authenticateToken, requireAdminOrManager, carController.removeWebsite);

// Pricing Options
router.post('/:id/pricing', authenticateToken, requireAdminOrManager, validateSchema(pricingOptionSchema), carController.addPricingOption);
router.delete('/:id/pricing/:pricingId', authenticateToken, requireAdminOrManager, carController.removePricingOption);

export default router;
