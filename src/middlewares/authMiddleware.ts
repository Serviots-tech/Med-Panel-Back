import { NextFunction, Response } from 'express';
import { RequestExtended } from '../interfaces/global';
import { invalidText } from '../utils/utils'
import { CustomError } from '../utils/customError';
import { verifyAccessToken } from '../helpers/tokenHelper';


export const isAuthenticated = async (
	req: RequestExtended,
	res: Response,
	next: NextFunction
) => {
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
	} catch (err) {
		// const error: any = err;
		// if (error.errorDescription) {
		// 	error.errorDescription = error.errorDescription.trim();
		// }
		// if (error.message === 'invalid token') {
		// 	error.status = 401;
		// 	error.message = 'Invalid token format. Please provide a valid JWT.';
		// }
		// if (error.message === 'jwt malformed') {
		// 	error.status = 401;
		// 	error.message = 'Invalid token format. Please provide a valid JWT.';
		// }
		// if (error.name === 'JsonWebTokenError') {
		// 	error.status = 401;
		// 	error.message = 'Invalid token format. Please provide a valid JWT';
		// }
		// if (error.name === 'TokenExpiredError') {
		// 	error.status = 401;
		// 	error.message = 'This token has been expired.';
		// 	// error.message = 'Your session has been timed out, please login again.';
		// }
		// if (invalidText(error.status)) {
		// 	error.status = 500;
		// }
		// return res.status(error.status).json({
		// 	error: error.status == 500 ? { description: error.message } : error,
		// 	message: error.status == 500 ? 'Something went wrong' : error.message,
		// 	responseStatus: error.status,
		// });
		next(err)
	}
};
