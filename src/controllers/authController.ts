import { Request, Response, NextFunction } from 'express';
import { validationResult } from 'express-validator';
import { DefaultResponse } from '../utils/DefaultResponse';
import { loginService } from '../services/authService';

export const loginController = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    DefaultResponse(res, 400, 'Validation failed', errors.array())
  }
  try {

    const {email,password}= req?.body
    
    const _email=email.toLowerCase()
    
    const medicine = await loginService({email:_email,password:password});

    DefaultResponse(res, 200, 'Medicines fetched successfully', medicine);
  } catch (error) {
    next(error);
  }
}
