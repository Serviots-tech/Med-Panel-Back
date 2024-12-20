import { Medicine } from '@prisma/client';
import { createMedicine, deleteMedicine, getAllMedicines, getMedicineById, updateMedicine } from '../models/Medicine';
import { log } from '../utils/logger';

export const addMedicine = async (medicineData: Medicine) => {
  log(`Inserting new medicine with name: ${medicineData.medicineName}`);
  return await createMedicine(medicineData);
};

// Fetch all medicine data
export const fetchAllMedicines = async (page: number, limit: number) => {
  return await getAllMedicines();
};

// Fetch a medicine by ID
export const fetchMedicineById = async (id: string) => {
  log(`Searching for medicine with ID: ${id}`);
  return await getMedicineById(id);
};

// Update a medicine by ID
export const updateMedicineById = async (id: string, updateData: Medicine) => {
  return await updateMedicine(id, updateData)
}

// Update a medicine by ID
export const deleteMedicineByid = async (id: string) => {
  return await deleteMedicine(id)
}