import { Medicine } from '@prisma/client';
import { addMedicine, deleteMedicineByid, fetchAllMedicines, fetchMedicineById, updateMedicineById } from '../Repositories/MedicineRepository';
import { CustomError } from '../utils/customError';
import { log } from '../utils/logger';

export const createMedicineService = async (medicineData: Medicine, fileLocation?: any) => {
    try {
        log(`Attempting to create a new medicine: ${medicineData.medicineName}`);
        // const fileName = fileLocation?.split('/').pop()!.slice(1);

        const updatedMedicineData = fileLocation
            ? { ...medicineData, image: fileLocation }
            : { ...medicineData };
        const newMedicine = await addMedicine(updatedMedicineData);
        log(`Medicine created successfully: ${newMedicine.medicineName}`);
        return newMedicine;
    } catch (error) {
        log(`Error creating medicine: ${error}`);
        throw new CustomError('Failed to create medicine', 500);
    }
};

export const getAllMedicinesService = async (page: number, pageSize: number) => {
    try {
        const { data, total } = await fetchAllMedicines(page, pageSize);
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