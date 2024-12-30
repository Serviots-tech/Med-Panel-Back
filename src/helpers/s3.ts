/* eslint-disable @typescript-eslint/no-explicit-any */
import {
	GetObjectCommand,
	ObjectCannedACL,
	PutObjectCommand,
	S3Client,
} from '@aws-sdk/client-s3';
import multerS3 from 'multer-s3';
import { configData } from '../config/config';
import multer from 'multer';

export const s3Client = new S3Client({
	region: 'ap-south-1',
	credentials: {
		accessKeyId: configData.s3accessKeyId as string,
		secretAccessKey: configData.s3secretAccessKey as string,
	},
});

const storage = multer.memoryStorage()
export const upload = multer({storage:storage})

export const s3Storage = multerS3({
	s3: s3Client,
	bucket: configData.s3bucketName || 'pannelbucket',
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


// export const addImageInS3 = async (fileData: any) => {
// 	const params = {
// 		Bucket: configData.s3bucketName,
// 		Key: fileData.originalname,
// 		Body: fileData.buffer,
// 		ContentType: fileData.mimetype,
// 		ACL: ObjectCannedACL.public_read_write,
// 	}
// 	const command = new PutObjectCommand(params)
// 	await s3Client.send(command)
// }

export const addImageInS3 = async (filesData: any[]) => {
	const uploadPromises = filesData.map((fileData) => {
	  const params = {
		Bucket: configData.s3bucketName,
		Key: `Medicines/${fileData.originalname?.split(' ')?.join('-')}`,
		Body: fileData.buffer,
		ContentType: fileData.mimetype,
		ACL: ObjectCannedACL.public_read_write,
	  };
	  const command = new PutObjectCommand(params);
	  return s3Client.send(command);
	});
  
	// Wait for all uploads to complete
	await Promise.all(uploadPromises);
  };
