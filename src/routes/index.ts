import express from 'express';
import authRoutes from './authRoutes';
import medicineRoutes from './medicineRoutes';
import userRoutes from './userRoutes';
import { errorHandler } from '../middlewares/errorHandler';

const router = express.Router();

router.use('/api/auth', authRoutes);

router.use('/api/medicines', medicineRoutes);

router.use('/api/user',userRoutes)

router.use(errorHandler)


export default router;
