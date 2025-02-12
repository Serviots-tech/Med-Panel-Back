import { Medicine } from '@prisma/client';
import { createMedicine, deleteMedicine, getAllMedicines, getMedicineById, updateMedicine } from '../models/Medicine';
import { log } from '../utils/logger';
import {  PrismaClient } from '@prisma/client';


const prisma = new PrismaClient();

export const addMedicine = async (medicineData: Medicine) => {
  log(`Inserting new medicine with name: ${medicineData.medicineName}`);
  return await createMedicine(medicineData);
};

export const fetchAllMedicines = async (
  page: number,
  limit: number,
  targetField: string,
  searchValue: string | null,
  userId:string | null,
  selectedDate: string | null
) => {
  const skip = (page - 1) * limit;

  // Build dynamic filter
  const whereCondition: any = { isDeleted: false };

  if (searchValue) {
    if(targetField==="price"){
      whereCondition[targetField] = parseInt(searchValue)
    }else{
    whereCondition[targetField] = {
      contains: searchValue,
      mode: "insensitive",
    };
  }
  }

  if(userId){
    whereCondition["createdBy"]=userId
  }
  if (selectedDate) {
    const startOfDay = new Date(selectedDate);
    startOfDay.setHours(0, 0, 0, 0);

    const endOfDay = new Date(selectedDate);
    endOfDay.setHours(23, 59, 59, 999);

    whereCondition.createdAt = {
      gte: startOfDay,
      lte: endOfDay,
    };
  }

  // Fetch medicines
  const data = await prisma.medicine.findMany({
    where: whereCondition,
    skip,
    take: limit,
  });

  const total = await prisma.medicine.count({
    where: whereCondition,
  });

  return {
    data,
    total,
  };
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