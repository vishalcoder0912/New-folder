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
const vercelSuffix = /\.vercel\.app$/i;
const isOriginAllowed = (origin) => {
  if (!origin) return true;
  const allowed = [
    process.env.CLIENT_URL,
    process.env.ADMIN_URL,
    ...(process.env.CORS_ORIGINS || '').split(',').map((o) => o.trim()).filter(Boolean)
  ].filter(Boolean);
  if (allowed.includes(origin)) return true;
  if (vercelSuffix.test(origin)) return true;
  return false;
};

app.use(cors({
  origin(origin, callback) {
    if (isOriginAllowed(origin)) return callback(null, true);
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

app.get('/api', (_req, res) => {
  res.json({
    success: true,
    message: 'Welcome to EduNova CMS API',
    version: '1.0.0',
    environment: process.env.NODE_ENV || 'development',
    endpoints: {
      health: { method: 'GET', path: '/api/health', description: 'Health check' },
      auth: { login: 'POST /api/auth/login', me: 'GET /api/auth/me', logout: 'POST /api/auth/logout' },
      sections: 'GET/POST /api/sections — Manage page sections',
      courses: 'GET/POST /api/courses — Manage courses',
      events: 'GET/POST /api/events — Manage events',
      blogs: 'GET/POST /api/blogs — Manage blog posts',
      mentors: 'GET/POST /api/mentors — Manage mentors',
      testimonials: 'GET/POST /api/testimonials — Manage testimonials',
      faqs: 'GET/POST /api/faqs — Manage FAQs',
      leads: 'GET/POST /api/leads — Manage contact leads',
      media: 'GET/POST /api/media — Manage media uploads',
      settings: 'GET/PUT /api/settings — Manage website settings',
      adminUsers: 'CRUD /api/admin-users — Manage admin accounts'
    },
    database: 'MongoDB (Mongoose)',
    storage: 'ImageKit (media CDN)',
    authentication: 'JWT (JSON Web Tokens)'
  });
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
