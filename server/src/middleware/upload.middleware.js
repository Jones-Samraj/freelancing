import multer from 'multer';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Ensure base upload directories exist
const uploadDirs = [
  path.join(__dirname, '../../uploads/avatars'),
  path.join(__dirname, '../../uploads/project-files'),
  path.join(__dirname, '../../uploads/quotation-files'),
  path.join(__dirname, '../../uploads/messages')
];

uploadDirs.forEach(dir => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
});

function getStorage(subFolder) {
  return multer.diskStorage({
    destination: (req, file, cb) => {
      const dest = path.join(__dirname, `../../uploads/${subFolder}`);
      cb(null, dest);
    },
    filename: (req, file, cb) => {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
      const ext = path.extname(file.originalname);
      const safeName = path.basename(file.originalname, ext).replace(/[^a-zA-Z0-9_-]/g, '_');
      cb(null, `${safeName}-${uniqueSuffix}${ext}`);
    }
  });
}

// Allowed extensions for projects: PDF, DOCX, XLSX, PNG, JPG, ZIP, etc.
const allowedDocTypes = [
  'image/jpeg', 'image/png', 'image/webp', 'image/gif',
  'application/pdf',
  'application/msword',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  'application/vnd.ms-excel',
  'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  'application/zip',
  'application/x-zip-compressed',
  'text/plain',
  'text/csv'
];

export const uploadAvatar = multer({
  storage: getStorage('avatars'),
  limits: { fileSize: 5 * 1024 * 1024 }, // 5 MB
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith('image/')) {
      cb(null, true);
    } else {
      cb(new Error('Only image files are allowed for avatar upload.'));
    }
  }
});

export const uploadProjectFile = multer({
  storage: getStorage('project-files'),
  limits: { fileSize: 25 * 1024 * 1024 }, // 25 MB
  fileFilter: (req, file, cb) => {
    if (allowedDocTypes.includes(file.mimetype) || file.originalname.match(/\.(pdf|docx|xlsx|png|jpg|jpeg|zip|txt|csv)$/i)) {
      cb(null, true);
    } else {
      cb(new Error('File type not supported. Allowed: PDF, DOCX, XLSX, PNG, JPG, ZIP.'));
    }
  }
});

export const uploadQuotationFile = multer({
  storage: getStorage('quotation-files'),
  limits: { fileSize: 20 * 1024 * 1024 },
  fileFilter: (req, file, cb) => {
    cb(null, true);
  }
});

export const uploadMessageAttachment = multer({
  storage: getStorage('messages'),
  limits: { fileSize: 20 * 1024 * 1024 },
  fileFilter: (req, file, cb) => {
    cb(null, true);
  }
});
