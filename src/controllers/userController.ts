import { Request, Response, NextFunction } from 'express';
import { validationResult } from 'express-validator';
import { DefaultResponse } from '../utils/DefaultResponse';
import { createAdminUserService, createUserService } from '../services/userService';
import { RequestExtended } from '../interfaces/global';
import { CustomError } from '../utils/customError';

export const createUserController = async (req: RequestExtended, res: Response, next: NextFunction): Promise<void> => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    DefaultResponse(res, 400, 'Validation failed', errors.array())
  }
  try {

    if (req.user?.role !== "ADMIN") {
      throw new CustomError("unAuthorized", 401)
    }

    const { name, email, password, role } = req?.body

    const _email = email.toLowerCase()

    const user = await createUserService({ email: _email, password: password, name, role });

    DefaultResponse(res, 200, 'user created successfully', user);
  } catch (error) {
    next(error);
  }
}

export const createAdminUserController = async (req: RequestExtended, res: Response, next: NextFunction): Promise<void> => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    DefaultResponse(res, 400, 'Validation failed', errors.array())
  }
  try {

    const { name, email, password } = req?.body

    const _email = email.toLowerCase()

    const user = await createAdminUserService({ email: _email, password: password, name });

    DefaultResponse(res, 200, 'Admin user created successfully', user);
  } catch (error) {
    next(error);
  }
}