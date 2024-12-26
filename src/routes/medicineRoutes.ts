import express from 'express';
import { createMedicineController, deleteMedicineController, getAllMedicinesController, getMedicineByIdController, updateMedicineController } from '../controllers/medicineController';
import { createMedicineValidator } from '../middlewares/validators/medicineValidator';

const router = express.Router();

// Route to create medicines
router.post('/add', createMedicineValidator, createMedicineController);


// Route to get all medicines
router.get('/get-all', getAllMedicinesController);

// Route to get a medicine by ID
router.get('/:id', getMedicineByIdController);

// Route to update a medicine by ID
router.put('/:id', updateMedicineController);

// Route to delete a medicine by ID
router.delete('/:id', deleteMedicineController);

export default router;
