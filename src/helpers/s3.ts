/* eslint-disable @typescript-eslint/no-explicit-any */
import {
	GetObjectCommand,
	PutObjectCommand,
	S3Client,
} from '@aws-sdk/client-s3';
import multerS3 from 'multer-s3';
import { configData } from '../config/config';

export const s3Client = new S3Client({
	region: 'ap-south-1',
	credentials: {
		accessKeyId: configData.s3accessKeyId as string,
		secretAccessKey: configData.s3secretAccessKey as string,
	},
});

export const s3Storage = multerS3({
	s3: s3Client,
	bucket: configData.s3bucketName || 'serviots-med-panel',
	metadata: (req: any, file: any, cb: any) => {
		cb(null, { fieldname: file.fieldname });
	},
	key: async (req: any, file: any, cb: any) => {

		let fileName = '';

		const fileExtension = file.originalname.split('.').pop();



		fileName = 'Medicines' + '/' +
			req?.body?.medicineName?.split(' ')?.join('-') +
			'-' +
			Date.now() +
			'.' +
			fileExtension;
		Date.now() + '_' + file.fieldname + '_' + file.originalname;

		cb(null, fileName);
	},
	contentType: (req: any, file: any, cb: any) => {
		cb(null, file.mimetype); // Automatically sets the content type based on the file's mimetype
	},
	contentDisposition: 'view',
	acl: 'public-read'
});
