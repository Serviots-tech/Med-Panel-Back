import jwt from 'jsonwebtoken';
import { configData } from '../config/config';

const accessTokenSecretKey = configData.accessTokenSecretKey;

// Generate AccessToken
export const generateAccessToken = (payload: any) => {
	const token = jwt.sign(payload, accessTokenSecretKey as string, {
		expiresIn: 24 * 60 * 60, // in seconds,
	});

	return token;
};

export const verifyAccessToken = (accessToken: string) => {
	const verified = jwt.verify(accessToken, accessTokenSecretKey as string);

	return verified;
};