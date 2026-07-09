import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import morgan from 'morgan';
import path from 'path';
import { fileURLToPath } from 'url';
import connectDB from './config/db.js';
import authRoutes from './routes/auth.routes.js';
import sectionRoutes from './routes/section.routes.js';
import courseRoutes from './routes/course.routes.js';
import eventRoutes from './routes/event.routes.js';
import blogRoutes from './routes/blog.routes.js';
import mentorRoutes from './routes/mentor.routes.js';
import testimonialRoutes from './routes/testimonial.routes.js';
import faqRoutes from './routes/faq.routes.js';
import leadRoutes from './routes/lead.routes.js';
import mediaRoutes from './routes/media.routes.js';
import settingRoutes from './routes/setting.routes.js';
import adminUserRoutes from './routes/adminUser.routes.js';
import { errorHandler, notFound } from './middleware/error.middleware.js';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

connectDB();

const app = express();
const configuredOrigins = (process.env.CORS_ORIGINS || '')
  .split(',')
  .map((origin) => origin.trim())
  .filter(Boolean);
const allowedOrigins = [
  process.env.CLIENT_URL,
  process.env.ADMIN_URL,
  ...configuredOrigins,
  'http://localhost:5173',
  'http://localhost:5174'
].filter(Boolean);

app.use(cors({
  origin(origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) return callback(null, true);
    return callback(new Error('Not allowed by CORS'));
  },
  credentials: true
}));
app.use(express.json({ limit: '1mb' }));
app.use(express.urlencoded({ extended: true, limit: '1mb' }));
app.use(morgan(process.env.NODE_ENV === 'production' ? 'combined' : 'dev'));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.get('/', (_req, res) => {
  res.send('Welcome to EduNova backend. The API is working properly.');
});

app.get('/api/health', (_req, res) => {
  res.json({ success: true, message: 'EdTech CMS API is running' });
});

app.use('/api/auth', authRoutes);
app.use('/api/sections', sectionRoutes);
app.use('/api/courses', courseRoutes);
app.use('/api/events', eventRoutes);
app.use('/api/blogs', blogRoutes);
app.use('/api/mentors', mentorRoutes);
app.use('/api/testimonials', testimonialRoutes);
app.use('/api/faqs', faqRoutes);
app.use('/api/leads', leadRoutes);
app.use('/api/media', mediaRoutes);
app.use('/api/settings', settingRoutes);
app.use('/api/admin-users', adminUserRoutes);

app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
if (process.env.VERCEL !== '1') {
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
}

export default app;
