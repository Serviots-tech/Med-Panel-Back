import express from 'express';
import authRoutes from './authRoutes';
import medicineRoutes from './medicineRoutes';
import userRoutes from './userRoutes';
import doseFormRoutes from './doseFormRoutes';
import { errorHandler } from '../middlewares/errorHandler';
import { isAuthenticated } from '../middlewares/authMiddleware';

const router = express.Router();

router.use('/api/auth', authRoutes);

router.use('/api/medicines', medicineRoutes);

router.use('/api/user',userRoutes)
router.use('/api/dose-form',isAuthenticated, doseFormRoutes)

router.use(errorHandler)


export default router;
