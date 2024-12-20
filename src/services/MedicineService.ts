import { Medicine } from '@prisma/client';
import { addMedicine, deleteMedicineByid, fetchAllMedicines, fetchMedicineById, updateMedicineById } from '../Repositories/MedicineRepository';
import { CustomError } from '../utils/customError';
import { log } from '../utils/logger';

export const createMedicineService = async (medicineData: Medicine) => {
    try {
        log(`Attempting to create a new medicine: ${medicineData.medicineName}`);
        const newMedicine = await addMedicine(medicineData);
        log(`Medicine created successfully: ${newMedicine.medicineName}`);
        return newMedicine;
    } catch (error) {
        log(`Error creating medicine: ${error}`);
        throw new CustomError('Failed to create medicine', 500);
    }
};

export const getAllMedicinesService = async (page: number, limit: number) => {
    try {
        const { data, total } = await fetchAllMedicines(page, limit);
        return {
            data,
            total,
        };
    } catch (error) {
        throw new CustomError('Failed to fetch medicines', 500);
    }
};

// Service function to get a medicine by ID
export const getMedicineByIdService = async (id: string) => {
    try {
        log(`Fetching medicine with ID: ${id}`);
        const medicine = await fetchMedicineById(id);
        if (!medicine) {
            throw new CustomError('ID not found', 404);
        }
        log(`Medicine fetched successfully: ${medicine.medicineName}`);
        return medicine;
    } catch (error) {
        log(`Error fetching medicine with ID: ${id} - ${error}`);
        throw new CustomError('Failed to fetch medicine', 500);
    }
};

export const updateMedicineByIdService = async (id: string, updateData: Medicine) => {
    // Ensure both id and updateData are passed
    return await updateMedicineById(id, updateData);
};

// Soft-delete a medicine by ID
export const deleteMedicineService = async (id: string) => {
    return await deleteMedicineByid(id);
};