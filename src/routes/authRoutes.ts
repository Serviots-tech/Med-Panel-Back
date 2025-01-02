import express from 'express';
import { loginController } from '../controllers/authController';
import { loginValidationRules } from '../middlewares/validators/medicineValidator';

const router = express.Router();

// Route to create medicines
router.post('/login', loginValidationRules,loginController);



export default router;
