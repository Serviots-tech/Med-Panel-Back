import { PrismaClient, Role } from '@prisma/client';


const prisma = new PrismaClient();

export const validateDoseFormByName = async (name: string) => {

  const doseForm = await prisma.doseForms.findFirst({
    where: {
      name: {
        equals: name,
        mode: 'insensitive'
      }
    }
  });

  return doseForm

};

export const createDoseForm = async (data: any) => {

  const doseForm = await prisma.doseForms.create({
    data: data
  })

  return doseForm

};

export const updateDoseForm = async (data: { id: string, name: string,createdBy:string }) => {

  const doseForm = await prisma.doseForms.update({
    where: {
      id: data?.id
    },
    data: {
      name: data?.name,
      createdBy:data?.createdBy
    }
  })

  return doseForm

};

export const updateDoseFormByName = async (data: {  name: string,createdBy:string }) => {

  const doseForm = await prisma.doseForms.updateMany({
    where: {
      name:data?.name
    },
    data: {
      createdBy:data?.createdBy,
      isDeleted:false
    }
  })

  return doseForm

};

export const getAllDoseForm = async (page: number, limit: number) => {

  const skip = (page - 1) * limit;


  const doseForm = await prisma.doseForms.findMany({
    where:{
      isDeleted:false
    },
    skip,
    take: limit,
  })

   // Get the total number of records
   const total = await prisma.doseForms.count({
    where: { isDeleted: false },
  });

  return {
    data:doseForm,
    total,
  };

};

export const validateDoseFormById = async (id: string) => {

  const doseForm = await prisma.doseForms.findFirst({
    where: {
      id: id
    },
    include:{
      Medicine:true
    }
  });

  return doseForm

};


export const deleteDoseForm = async (id:string) => {

  const doseForm = await prisma.doseForms.update({
    where: {
      id: id
    },
    data: {
      isDeleted:true
    }
  })

  return doseForm

};