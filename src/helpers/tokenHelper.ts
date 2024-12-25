import jwt from 'jsonwebtoken';

const accessTokenSecretKey = process.env.ACCESS_TOKEN_SECRET_KEY;

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