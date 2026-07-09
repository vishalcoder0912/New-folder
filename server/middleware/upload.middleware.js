import fs from 'fs';
import os from 'os';
import path from 'path';
import multer from 'multer';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const uploadDir = process.env.VERCEL === '1'
  ? path.join(os.tmpdir(), 'edtech-cms-uploads')
  : path.join(__dirname, '..', 'uploads');

if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir, { recursive: true });

const storage = multer.diskStorage({
  destination: (_req, _file, cb) => cb(null, uploadDir),
  filename: (_req, file, cb) => {
    const ext = path.extname(file.originalname).toLowerCase();
    cb(null, `${Date.now()}-${Math.round(Math.random() * 1e9)}${ext}`);
  }
});

const allowed = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];

export const uploadImage = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 },
  fileFilter: (_req, file, cb) => {
    if (allowed.includes(file.mimetype)) return cb(null, true);
    return cb(new Error('Only jpg, jpeg, png and webp images are allowed'));
  }
});
