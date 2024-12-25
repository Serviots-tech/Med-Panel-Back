import dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();

// Define an interface for strongly-typed configuration
interface ConfigData {
	port: number;
	accessTokenSecretKey: string;
}

// Destructure and parse environment variables with type safety
const {
	PORT,
	ACCESS_TOKEN_SECRET_KEY,
} = process.env;


// Export the configuration object
export const configData: ConfigData = {
	port: parseInt(PORT as string, 10),
	accessTokenSecretKey: ACCESS_TOKEN_SECRET_KEY as string
};
