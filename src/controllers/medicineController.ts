import { NextFunction, Request, Response } from 'express';
import { validationResult } from 'express-validator';
import { addImageInS3 } from '../helpers/s3';
import { fetchMedicineById } from '../Repositories/MedicineRepository';
import { createMedicineService, deleteMedicineService, getAllMedicinesService, getMedicineByIdService, updateMedicineByIdService } from '../services/MedicineService';
import { CustomError } from '../utils/customError';
import { DefaultResponse } from '../utils/DefaultResponse';
import { log } from '../utils/logger';
import { convertToBoolean } from '../utils/utils';


// Controller function to add a new medicine 
export const createMedicineController = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    log(`Received request to create medicine with data: ${JSON.stringify(req.body)}`);
    DefaultResponse(res, 400, 'Validation failed', errors.array())
  }

  let originalNames;
  if (req?.files) {
    await addImageInS3(req?.files as any)
     originalNames = (req.files as Array<{ originalname: string }>).map((file) =>
      file.originalname?.split(' ')?.join('-')
    );
  }

  try {
    log(`Received request to create medicine with data: ${JSON.stringify(req.body)}`);
    const medicine = await createMedicineService({ ...req.body, price: parseFloat(req?.body?.price),gstPercentage: parseInt(req?.body?.gstPercentage) }, (originalNames as any));
    log(`Medicine created successfully: ${medicine.medicineName}`);
    DefaultResponse(res, 200, 'Medicines fetched successfully', medicine);
  } catch (error) {
    log(`Error in creating medicine: ${error}`);
    next(error);
  }

}

// Controller function to fetch all medicines
export const getAllMedicinesController = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    // Get query parameters (page and limit)
    const page = parseInt(req.query.page as string, 10) || 1;
    const limit = parseInt(req.query.limit as string, 10) || 10;

    // Fetch medicines with pagination
    const medicines = await getAllMedicinesService(page, limit);

    if (!medicines || medicines.data.length === 0) {
      DefaultResponse(res, 200, 'No medicines found', null);
      return;
    }

    DefaultResponse(res, 200, 'Medicines fetched successfully', medicines.data, medicines.total, page);
  } catch (error) {
    next(error);
  }
};

// Controller function to fetch a medicine by ID
export const getMedicineByIdController = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const { id } = req.params;
  try {

    log(`Attempting to Get medicine with ID: ${id}`);
    const existingMedicine = await fetchMedicineById(id);

    if (!existingMedicine) {
      log(`Medicine with ID: ${id} not found`);
      throw new CustomError('Medicine not found', 404);
    }

    log(`Received request to fetch medicine by ID: ${id}`);
    const medicine = await getMedicineByIdService(id);
    if (!medicine) {
      log(`Medicine with ID ${id} not found`);
      DefaultResponse(res, 404, 'Medicine not found', null);
    } else {
      log(`Fetched medicine: ${medicine.medicineName}`);
      DefaultResponse(res, 200, 'Medicine fetched successfully', medicine);
    }
  } catch (error) {
    log(`Error in fetching medicine with ID ${id}: ${error}`);
    next(error);
  }
};

export const updateMedicineController = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const { id } = req.params;
  const updateData = req.body;

  // Validate request body
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    DefaultResponse(res, 400, 'Validation failed', errors.array());
  }

  
 


  try {
    log(`Attempting to update medicine with ID: ${id}`);
    const existingMedicine = await fetchMedicineById(id);

    if (!existingMedicine) {
      log(`Medicine with ID: ${id} not found`);
      throw new CustomError('Medicine not found', 404);
    }
    let originalNames;
    if (req?.files) {
      await addImageInS3(req?.files as any)
       originalNames = (req.files as Array<{ originalname: string }>).map((file) =>
        file.originalname?.split(' ')?.join('-')
      );
    }

    // Proceed with updating the medicine
    const updatedMedicine = await updateMedicineByIdService(id, {...updateData,price: parseFloat(req?.body?.price) , Percentage: parseInt(updateData?.gstPercentage),image:req?.files?.length ? originalNames : updateData?.image?.split(","),isDeleted:convertToBoolean(updateData?.isDeleted)});
    log(`Medicine updated successfully with ID: ${id}`);
    DefaultResponse(res, 200, 'Medicine updated successfully', updatedMedicine);
  } catch (error) {
    log(`Error updating medicine with ID: ${id} - ${error}`);
    next(error);
  }
};

// Controller function to soft-delete a medicine by ID
export const deleteMedicineController = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const { id } = req.params;
  try {
    log(`Attempting to delete medicine with ID: ${id}`);
    const existingMedicine = await fetchMedicineById(id);

    if (!existingMedicine) {
      log(`Medicine with ID: ${id} not found`);
      throw new CustomError('Medicine not found', 404);
    }

    const deletedMedicine = await deleteMedicineService(id);
    log(`Medicine deleted successfully with ID: ${id}`);
    return DefaultResponse(res, 200, 'Medicine deleted successfully', deletedMedicine);
  } catch (error) {
    log(`Error deleting medicine with ID: ${id} - ${error}`);
    next(error);
  }
};
