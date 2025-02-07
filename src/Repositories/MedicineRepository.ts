import { Medicine } from '@prisma/client';
import { createMedicine, deleteMedicine, getAllMedicines, getMedicineById, updateMedicine } from '../models/Medicine';
import { log } from '../utils/logger';
import {  PrismaClient } from '@prisma/client';


const prisma = new PrismaClient();

export const addMedicine = async (medicineData: Medicine) => {
  log(`Inserting new medicine with name: ${medicineData.medicineName}`);
  return await createMedicine(medicineData);
};

// Fetch all medicine data
// export const fetchAllMedicines = async (page: number, limit: number,targetField:string, searchValue:string | null) => {

//   const skip = (page - 1) * limit;

//   const data = await prisma.medicine.findMany({
//     where: { isDeleted: false,
//       [targetField]:{
//         contains:searchValue,
//         mode:'insensitive'
//       }
//     },
//     skip,
//     take: limit,
//   });
  
//   // Get the total number of records
//   const total = await prisma.medicine.count({
//     where: { isDeleted: false },
//   });

//   // Return the paginated data and total count
//   return {
//     data,
//     total,
//   };

// };

export const fetchAllMedicines = async (
  page: number,
  limit: number,
  targetField: string,
  searchValue: string | null
) => {
  const skip = (page - 1) * limit;

  // Build dynamic filter
  const whereCondition: any = { isDeleted: false };

  if (searchValue) {
    whereCondition[targetField] = {
      contains: searchValue,
      mode: "insensitive",
    };
  }

  // Fetch medicines
  const data = await prisma.medicine.findMany({
    where: whereCondition,
    skip,
    take: limit,
  });

  // Get the total count based on the applied filter
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