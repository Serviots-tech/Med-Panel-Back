import express from 'express';
import { createUserController } from '../controllers/userController';
import { isAuthenticated } from '../middlewares/authMiddleware';
import {  createUserValidator } from '../validators/medicineValidator';

const router = express.Router();

// Route to create medicines
router.post('/create-user',isAuthenticated,createUserValidator, createUserController);

router.post('/create-admin',createUserValidator, createUserController);




export default router;
