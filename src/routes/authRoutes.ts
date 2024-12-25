import express from 'express';
import { loginController } from '../controllers/authController';

const router = express.Router();

// Route to create medicines
router.post('/login', loginController);



export default router;
