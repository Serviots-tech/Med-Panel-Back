import express from 'express';
import authRoutes from './authRoutes';
import medicineRoutes from './medicineRoutes';

const router = express.Router();

router.use('/api/auth', authRoutes);

router.use('/api/medicine', medicineRoutes);


export default router;
