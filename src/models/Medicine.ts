import { Medicine, PrismaClient } from '@prisma/client';
import { CustomError } from '../utils/customError';

const prisma = new PrismaClient();

export const createMedicine = async (medicineData: Medicine) => {
    console.log("🚀 ~ createMedicine ~ medicineData:", medicineData)
    return await prisma.medicine.create({
        data: medicineData,
    });
};

// GET /medicine
export const getAllMedicines = async (page = 1, limit = 10) => {
    const skip = (page - 1) * limit;
    const data = await prisma.medicine.findMany({
        where: { isDeleted: false },
        skip,
        take: limit,
    });
    // Get the total number of records
    const total = await prisma.medicine.count({
        where: { isDeleted: false },
    });

    // Return the paginated data and total count
    return {
        data,
        total,
    };

};

// Get a single medicine by ID (non-deleted)
export const getMedicineById = async (id: string) => {


    // Query the database
    const data = await prisma.medicine.findUnique({
        where: { id: id,isDeleted:false },
    });

    // If no medicine found or if it's marked as deleted
    if (!data) {
        throw new CustomError('Medicine not found', 404);  // Not Found if medicine doesn't exist
    }

    return data;
};

// Update a medicine by ID
export const updateMedicine = async (id: string, updateData: Medicine) => {

    const medicine = await prisma.medicine.update({
        where: { id },
        data: updateData,
    });

    if (!medicine) {
        throw new Error('Medicine not found');
    }
    return medicine;

};

// Delete a medicine by ID
export const deleteMedicine = async (id: string) => {

 
    const existingMedicine = await prisma.medicine.findUnique({
        where: { id },
    });

    if (!existingMedicine) {
        throw new Error('Medicine not found');
    }

    return await prisma.medicine.update({
        where: { id },
        data: {
            isDeleted: true,
        },
    });
};