import express from 'express';
import { createAdminUserController, createUserController } from '../controllers/userController';
import { isAuthenticated } from '../middlewares/authMiddleware';
import {  createAdminUserValidator, createUserValidator } from '../validators/medicineValidator';

const router = express.Router();

// Route to create medicines
router.post('/create-user',isAuthenticated,createUserValidator, createUserController);

router.post('/create-admin',createAdminUserValidator, createAdminUserController);




export default router;
