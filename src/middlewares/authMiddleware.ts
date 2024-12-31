import { NextFunction, Response } from 'express';
import { RequestExtended } from '../interfaces/global';
import { invalidText } from '../utils/utils'
import { CustomError } from '../utils/customError';
import { verifyAccessToken } from '../helpers/tokenHelper';


export const isAuthenticated = async (
	req: RequestExtended,
	res: Response,
	next: NextFunction
): Promise<void> => {
	try {
		const authHeader = req.headers.authorization || req.headers.Authorization;

		if (
			typeof authHeader !== 'string' ||
			(!authHeader?.startsWith('Bearer ') && !authHeader?.startsWith('bearer '))
		) {
			 throw new CustomError('Unauthorized', 401)
		}

		const token = authHeader.split(' ')[1];

		const payload: any = verifyAccessToken(token);

		if (!payload) {
			throw new CustomError('Unauthorized', 401)
		}

		req.user = {
			id: payload.id,
			email: payload.email,
			role:payload.role
		};

		next();
	} catch (err:any) {
		if (err instanceof CustomError) {
			res.status(err.statusCode || 500).json({
			  error: { description: err.message },
			  message: err.message,
			  responseStatus: err.statusCode || 500,
			});
		  } else if (err.name === 'JsonWebTokenError') {
			res.status(401).json({
			  error: { description: 'Invalid token format. Please provide a valid JWT.' },
			  message: 'Invalid token format. Please provide a valid JWT.',
			  responseStatus: 401,
			});
		  } else if (err.name === 'TokenExpiredError') {
			res.status(401).json({
			  error: { description: 'This token has expired.' },
			  message: 'This token has expired.',
			  responseStatus: 401,
			});
		  } else {
			// Pass unhandled errors to the global error handler
			next(err);
		  }
	}
};
