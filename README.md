# EduNova EdTech CMS

A full-stack EdTech website with a React/Vite public frontend, separate React admin dashboard, Express API, MongoDB/Mongoose models, JWT admin authentication, ImageKit media uploads, drag-and-drop page sections, and seedable CMS content.

## Project Structure

```text
client/       Public website only
admin-panel/  Separate WordPress-style admin panel
server/       Express API, MongoDB models, uploads, and seed script
```

## Stack

- Client: React, Vite, Tailwind CSS, React Router, Axios, Framer Motion
- Admin Panel: React, Vite, Tailwind CSS, React Router, Axios, DnD Kit
- Server: Node.js, Express, MongoDB, Mongoose, JWT, bcrypt, Multer, ImageKit
- Database: MongoDB Atlas or local MongoDB

## Setup

1. Install dependencies:

```bash
npm run install:all
```

2. Configure backend environment:

```bash
cp server/.env.example server/.env
```

Set `MONGO_URI`, `JWT_SECRET`, `CLIENT_URL`, `ADMIN_URL`, seed admin values, and ImageKit keys.
Set `ADMIN_URL=http://localhost:5174` for the separate local admin panel.

3. Configure frontend environment:

```bash
cp client/.env.example client/.env
cp admin-panel/.env.example admin-panel/.env
```

4. Seed MongoDB:

```bash
npm run seed
```

The seed script creates one admin user from `SEED_ADMIN_NAME`, `SEED_ADMIN_EMAIL`, and `SEED_ADMIN_PASSWORD`.
If `SEED_ADMIN_PASSWORD` is not set, the seed script generates a temporary password and prints it in the terminal.
Change this password after first login, because leaving default passwords in production is how humans create disasters and then call them “incidents.”

5. Run locally:

```bash
npm run dev:server
npm run dev:client
npm run dev:admin
```

Public site: `http://localhost:5173`

Admin panel: `http://localhost:5174`

Admin login: `http://localhost:5174/login`

## Environment Variables

Backend `server/.env`:

```env
MONGO_URI=
JWT_SECRET=
JWT_EXPIRES_IN=7d
PORT=5000
CLIENT_URL=http://localhost:5173
ADMIN_URL=http://localhost:5174
SEED_ADMIN_NAME=Super Admin
SEED_ADMIN_EMAIL=admin@example.com
SEED_ADMIN_PASSWORD=replace-with-a-strong-temporary-password
IMAGEKIT_PUBLIC_KEY=
IMAGEKIT_PRIVATE_KEY=
IMAGEKIT_URL_ENDPOINT=
```

Frontend `client/.env`:

```env
VITE_API_BASE_URL=http://localhost:5000/api
```

Admin `admin-panel/.env`:

```env
VITE_API_BASE_URL=http://localhost:5000/api
```

## API Summary

- Auth: `POST /api/auth/login`, `GET /api/auth/me`, `POST /api/auth/logout`
- Sections: `GET /api/sections/:pageName`, `POST /api/sections`, `PUT /api/sections/:id`, `DELETE /api/sections/:id`, `PATCH /api/sections/reorder`, `PATCH /api/sections/:id/toggle-visibility`
- Courses: `GET /api/courses`, `GET /api/courses/:slug`, `POST /api/courses`, `PUT /api/courses/:id`, `DELETE /api/courses/:id`, `PATCH /api/courses/:id/status`
- Events, Blogs, Mentors, Testimonials, FAQs: standard CRUD APIs
- Leads: `POST /api/leads`, admin list/status/delete/export APIs
- Media: `POST /api/media/upload`, `GET /api/media`, `DELETE /api/media/:id`
- Settings: `GET /api/settings`, `PUT /api/settings`

Admin reads can pass `?all=true` with a valid JWT to include draft/hidden content.

## Deployment Notes

- Frontend: deploy `client` to Vercel. Set `VITE_API_BASE_URL` to the production backend API URL.
- Admin panel: deploy `admin-panel` separately to Vercel, Netlify, or an internal host. Set `VITE_API_BASE_URL` to the production backend API URL.
- Backend: deploy `server` to Vercel, Render, Railway, or a VPS. Set all backend environment variables in the host dashboard.
- Database: use MongoDB Atlas and set `MONGO_URI`.
- Media: create an ImageKit account and set public/private key plus URL endpoint.
- CORS: set `CLIENT_URL` to the production frontend URL and `ADMIN_URL` to the production admin panel URL.
- Run `npm run build` before deployment to build both React apps.
- Run `npm run seed --prefix server` once for a new database, then change the seed admin password after first login.

### Vercel Project Settings

Create two Vercel projects:

Public website:

```text
Root Directory: client
Build Command: npm run build
Output Directory: dist
Environment Variable: VITE_API_BASE_URL=https://your-backend-domain.com/api
```

Admin panel:

```text
Root Directory: admin-panel
Build Command: npm run build
Output Directory: dist
Environment Variable: VITE_API_BASE_URL=https://your-backend-domain.com/api
```

Backend API:

```text
Root Directory: server
Framework Preset: Other
Build Command: leave empty
Output Directory: leave empty
Environment Variables:
  MONGO_URI=mongodb+srv://...
  JWT_SECRET=long-random-secret
  JWT_EXPIRES_IN=7d
  CLIENT_URL=https://www.yourdomain.com
  ADMIN_URL=https://admin.yourdomain.com
  CORS_ORIGINS=https://yourdomain.com,https://www.yourdomain.com,https://admin.yourdomain.com
  IMAGEKIT_PUBLIC_KEY=...
  IMAGEKIT_PRIVATE_KEY=...
  IMAGEKIT_URL_ENDPOINT=...
  SEED_ADMIN_NAME=Super Admin
  SEED_ADMIN_EMAIL=your-admin-email@example.com
  SEED_ADMIN_PASSWORD=strong-temporary-password
```

The backend includes `server/vercel.json` and `server/api/index.js`, so Vercel can run the Express API as a serverless function.

### Custom Domains

Use three domains or subdomains:

```text
https://www.yourdomain.com      -> Vercel project rooted at client
https://admin.yourdomain.com    -> Vercel project rooted at admin-panel
https://api.yourdomain.com      -> Vercel project rooted at server
```

In Vercel, open each project, go to Settings -> Domains, and add the correct domain/subdomain. Vercel will show the DNS record to add at your domain provider. Usually this is:

```text
www      CNAME   cname.vercel-dns.com
admin    CNAME   cname.vercel-dns.com
api      CNAME   cname.vercel-dns.com
```

For the root/apex domain `yourdomain.com`, follow Vercel's displayed `A` record or nameserver instructions.

After the API domain is live, set both React apps' `VITE_API_BASE_URL` to:

```text
https://api.yourdomain.com/api
```

Then redeploy the public website and admin panel.

## Secret Safety Before GitHub

- Do not commit `server/.env`, `client/.env`, or `admin-panel/.env`.
- Real credentials must be added in Vercel/Render/Railway environment variable settings, not in source files.
- `.env.example` files are safe templates and should contain placeholders only.
- The admin login form does not contain prefilled credentials.

## Manual Test Checklist

1. Admin login works.
2. Admin can create and edit a course.
3. Admin can upload/select a course image.
4. Published course appears on frontend.
5. Admin can edit the home hero section.
6. Updated hero appears on frontend refresh.
7. Admin can reorder homepage sections.
8. Frontend follows the new order.
9. Contact form submits and creates a MongoDB lead.
10. Lead appears in the admin leads panel.
11. Blog create/edit/delete works.
12. FAQ reorder works.
13. Hidden sections do not show publicly.
14. Draft courses/blogs do not show publicly.
