import express from 'express';
import { createAdminUserController, createUserController, getAllUserController } from '../controllers/userController';
import { isAuthenticated } from '../middlewares/authMiddleware';
import {  createAdminUserValidator, createUserValidator } from '../middlewares/validators/medicineValidator';

const router = express.Router();

// Route to create medicines
router.post('/create-user',isAuthenticated,createUserValidator, createUserController);

router.post('/create-admin',createAdminUserValidator, createAdminUserController);

router.get('/get-all',isAuthenticated, getAllUserController);



export default router;
