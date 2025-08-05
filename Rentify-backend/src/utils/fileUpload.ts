import multer from 'multer';
import path from 'path';
import { Request } from 'express';
import { config } from '../config';

// Configure multer for file uploads
const storage = multer.memoryStorage();

const fileFilter = (_req: Request, file: Express.Multer.File, cb: multer.FileFilterCallback) => {
  // Check if file type is allowed
  if (config.allowedImageTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error('Invalid file type. Only JPEG, PNG, and WebP images are allowed.'));
  }
};

export const upload = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: config.maxFileSize,
    files: 10 // Maximum 10 files per upload
  }
});

export const uploadSingle = upload.single('image');
export const uploadMultiple = upload.array('images', 10);

// File validation helper
export const validateFile = (file: Express.Multer.File): { isValid: boolean; error?: string } => {
  if (!file) {
    return { isValid: false, error: 'No file provided' };
  }

  if (!config.allowedImageTypes.includes(file.mimetype)) {
    return { isValid: false, error: 'Invalid file type' };
  }

  if (file.size > config.maxFileSize) {
    return { isValid: false, error: 'File too large' };
  }

  return { isValid: true };
};

// Generate unique filename
export const generateFileName = (originalName: string): string => {
  const timestamp = Date.now();
  const random = Math.random().toString(36).substring(2);
  const extension = path.extname(originalName);
  return `${timestamp}-${random}${extension}`;
};
