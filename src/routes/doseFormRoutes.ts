import express from 'express';
import { isAuthenticated } from '../middlewares/authMiddleware';
import { createDoseFormValidator } from '../middlewares/validators/medicineValidator';
import { createDoseFormController, getAllDoseFormController,deleteDoseFormController,updateDoseFormController } from '../controllers/doseFormController';

const router = express.Router();

// Route to create medicines
router.post('/create',isAuthenticated,createDoseFormValidator, createDoseFormController);

router.get('/get-all',isAuthenticated, getAllDoseFormController);

router.delete('/',isAuthenticated,deleteDoseFormController)

router.post ('/update',isAuthenticated,updateDoseFormController)


export default router;
