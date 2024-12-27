import express from 'express';
import { createMedicineController, deleteMedicineController, getAllMedicinesController, getMedicineByIdController, updateMedicineController } from '../controllers/MedicineController';
import { createMedicineValidator } from '../middlewares/validators/medicineValidator';
import { uploadDocumentMiddleware } from '../helpers/multer';

const router = express.Router();

// Route to create medicines
router.post('/add',uploadDocumentMiddleware.single('file'), createMedicineController);


// Route to get all medicines
router.get('/get-all', getAllMedicinesController);

// Route to get a medicine by ID
router.get('/:id', getMedicineByIdController);

// Route to update a medicine by ID
router.put('/:id',uploadDocumentMiddleware.single('file'), updateMedicineController);

// Route to delete a medicine by ID
router.delete('/:id', deleteMedicineController);

export default router;
