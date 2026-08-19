import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.join(__dirname, '../../.env') });

export const env = {
  PORT: process.env.PORT || 5000,
  NODE_ENV: process.env.NODE_ENV || 'development',
  CLIENT_URL: process.env.CLIENT_URL || 'http://localhost:5173',
  DB: {
    HOST: process.env.DB_HOST || '127.0.0.1',
    PORT: parseInt(process.env.DB_PORT || '3307', 10),
    USER: process.env.DB_USER || 'root',
    PASSWORD: process.env.DB_PASSWORD || 'Sam@2028',
    NAME: process.env.DB_NAME || 'freelancing',
  },
  JWT: {
    SECRET: process.env.JWT_SECRET || 'workforge_jwt_super_secure_secret_key_2026_!@#',
    EXPIRES_IN: process.env.JWT_EXPIRES_IN || '7d',
  },
  UPLOAD: {
    MAX_SIZE_MB: parseInt(process.env.MAX_FILE_SIZE_MB || '15', 10),
    PATH: process.env.UPLOAD_PATH || './uploads',
  }
};
