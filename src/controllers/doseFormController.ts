import { Request, Response, NextFunction } from 'express';
import { validationResult } from 'express-validator';
import { DefaultResponse } from '../utils/DefaultResponse';
import { createAdminUserService, createUserService } from '../services/userService';
import { RequestExtended } from '../interfaces/global';
import { CustomError } from '../utils/customError';
import { createDoseFormService, deleteDoseFormService, getAllDoseFormService, updateDoseFormService } from '../services/doseFormService';

export const createDoseFormController = async (req: RequestExtended, res: Response, next: NextFunction): Promise<void> => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    DefaultResponse(res, 400, 'Validation failed', errors.array())
  }
  try {

    if (req.user?.role !== "ADMIN") {
      throw new CustomError("unAuthorized", 401)
    }

    const { name} = req?.body


    const user = await createDoseFormService({name,createdBy:req.user?.id});

    DefaultResponse(res, 200, 'Dose form created successfully', user);
  } catch (error) {
    next(error);
  }
}

export const getAllDoseFormController = async (req: RequestExtended, res: Response, next: NextFunction): Promise<void> => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    DefaultResponse(res, 400, 'Validation failed', errors.array())
  }
  try {
    const page = parseInt(req.query.page as string, 10) || 1;
    const limit = parseInt(req.query.limit as string, 10) || 100;

    const doseForm = await getAllDoseFormService(page,limit);

    DefaultResponse(res, 200, 'Fetched all dose form successfully', doseForm);
  } catch (error) {
    next(error);
  }
}

export const updateDoseFormController = async (req: RequestExtended, res: Response, next: NextFunction): Promise<void> => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    DefaultResponse(res, 400, 'Validation failed', errors.array())
  }
  try {

    if (req.user?.role !== "ADMIN") {
      throw new CustomError("unAuthorized", 401)
    }

    const user = await updateDoseFormService({...req?.body,createdBy:req?.user?.id});

    DefaultResponse(res, 200, 'Dose form created successfully', user);
  } catch (error) {
    next(error);
  }
}

export const deleteDoseFormController = async (req: RequestExtended, res: Response, next: NextFunction): Promise<void> => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    DefaultResponse(res, 400, 'Validation failed', errors.array())
  }
  try {

    if (req.user?.role !== "ADMIN") {
      throw new CustomError("unAuthorized", 401)
    }

    const { id} = req?.body


    const user = await deleteDoseFormService(id);

    DefaultResponse(res, 200, 'Dose form created successfully', user);
  } catch (error) {
    next(error);
  }
}

