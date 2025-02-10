import express from 'express';
import authRoutes from './authRoutes';
import medicineRoutes from './medicineRoutes';
import userRoutes from './userRoutes';
import doseFormRoutes from './doseFormRoutes';
import { errorHandler } from '../middlewares/errorHandler';
import { isAuthenticated } from '../middlewares/authMiddleware';

const router = express.Router();

router.use('/api/auth', authRoutes);

router.use('/api/medicines',isAuthenticated, medicineRoutes);

router.use('/api/user',userRoutes)
router.use('/api/dose-form',isAuthenticated, doseFormRoutes)

router.get('/health', (req, res) => {
    res.status(200).json({ status: 'ok', message: 'Service is running' });
});


router.use(errorHandler)


export default router;
