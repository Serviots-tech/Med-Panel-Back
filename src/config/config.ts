import dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();

// Define an interface for strongly-typed configuration
interface ConfigData {
	port: number;
	accessTokenSecretKey: string;
	s3accessKeyId:string;
	s3secretAccessKey:string;
	s3bucketName:string
}

// Destructure and parse environment variables with type safety
const {
	PORT,
	ACCESS_TOKEN_SECRET_KEY,
	S3_ACCESS_KEY_ID,
	S3_SECRET_ACCESS_KEY,
	S3_BUCKET_NAME

} = process.env;


// Export the configuration object
export const configData: ConfigData = {
	port: parseInt(PORT as string, 10),
	accessTokenSecretKey: ACCESS_TOKEN_SECRET_KEY as string,
	s3accessKeyId:S3_ACCESS_KEY_ID as string,
	s3secretAccessKey:S3_SECRET_ACCESS_KEY as string,
	s3bucketName:S3_BUCKET_NAME as string,

};
