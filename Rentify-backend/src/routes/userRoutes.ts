import { Router } from 'express';
import { UserController } from '../controllers/userController';
import { authenticateToken, requireAdmin } from '../middleware/auth';
import { validateSchema, userRegistrationSchema, userLoginSchema, userUpdateSchema } from '../middleware/validation';

const router = Router();
const userController = new UserController();

// Public routes
router.post('/register', validateSchema(userRegistrationSchema), userController.register);
router.post('/login', validateSchema(userLoginSchema), userController.login);

// Protected routes (require authentication)
router.get('/profile', authenticateToken, userController.getProfile);
router.put('/profile', authenticateToken, validateSchema(userUpdateSchema), userController.updateProfile);
router.post('/change-password', authenticateToken, userController.changePassword);
router.delete('/account', authenticateToken, userController.deleteAccount);

// Admin only routes
router.get('/', authenticateToken, requireAdmin, userController.getAllUsers);
router.get('/:id', authenticateToken, requireAdmin, userController.getUserById);
router.put('/:id', authenticateToken, requireAdmin, validateSchema(userUpdateSchema), userController.updateUser);
router.delete('/:id', authenticateToken, requireAdmin, userController.deleteUser);

export default router;
