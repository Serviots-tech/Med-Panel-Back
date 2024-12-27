import multer from 'multer';
import { s3Storage } from './s3';
const MAX_SIZE = 1 * 1024 * 1024;
export const uploadDocumentMiddleware = multer({ storage: s3Storage,  limits: { fileSize: MAX_SIZE },
  fileFilter: (req: any, file: any, cb: any) => {
    if(!file){
      return 
    }
    if (file.size > MAX_SIZE) {
      return cb(new Error('File size exceeds the limit of 1MB'), false);
    }
    cb(null, true);
  }
});
