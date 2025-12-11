# Deployment Guide

## GitHub Setup

1. Initialize git repository (if not already):
```bash
git init
```

2. Add all files:
```bash
git add .
```

3. Commit:
```bash
git commit -m "Initial commit - Modex Ticket Booking System"
```

4. Create repository on GitHub (https://github.com/Ashutosh-Codess)

5. Add remote and push:
```bash
git remote add origin https://github.com/Ashutosh-Codess/modex-project.git
git branch -M main
git push -u origin main
```

## Vercel Deployment (Frontend)

### Option 1: Via Vercel Dashboard

1. Go to https://vercel.com
2. Sign in with GitHub
3. Click "New Project"
4. Import your repository: `Ashutosh-Codess/modex-project`
5. Configure:
   - **Root Directory**: `frontend`
   - **Framework Preset**: Vite
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
   - **Install Command**: `npm install`

6. Add Environment Variable:
   - `VITE_API_URL` = Your backend URL (e.g., `https://your-backend.railway.app`)

7. Click "Deploy"

### Option 2: Via Vercel CLI

1. Install Vercel CLI:
```bash
npm i -g vercel
```

2. Navigate to frontend:
```bash
cd frontend
```

3. Deploy:
```bash
vercel
```

4. Follow prompts and set `VITE_API_URL` when asked

## Backend Deployment (Railway/Render)

### Railway Deployment

1. Go to https://railway.app
2. Sign in with GitHub
3. Click "New Project" → "Deploy from GitHub repo"
4. Select your repository
5. Add PostgreSQL database:
   - Click "New" → "Database" → "PostgreSQL"
6. Add environment variables:
   - `DB_HOST` = From PostgreSQL service
   - `DB_PORT` = 5432
   - `DB_USER` = postgres
   - `DB_PASSWORD` = From PostgreSQL service
   - `DB_NAME` = railway
   - `JWT_SECRET` = Generate a random string
   - `PORT` = Railway will set this automatically
7. Deploy!

### Render Deployment

1. Go to https://render.com
2. Sign in with GitHub
3. Click "New" → "Web Service"
4. Connect your repository
5. Configure:
   - **Name**: modex-backend
   - **Environment**: Node
   - **Build Command**: `cd backend && npm install`
   - **Start Command**: `cd backend && npm start`
   - **Root Directory**: `backend`

6. Add PostgreSQL database:
   - Click "New" → "PostgreSQL"
   - Copy connection string

7. Add environment variables:
   - `DB_HOST`, `DB_PORT`, `DB_USER`, `DB_PASSWORD`, `DB_NAME` from PostgreSQL
   - `JWT_SECRET` = Generate random string
   - `PORT` = 10000 (or Render's assigned port)

8. Deploy!

## Post-Deployment

1. Update frontend `VITE_API_URL` in Vercel to point to your deployed backend
2. Test all endpoints
3. Create a test user account
4. Create test shows
5. Test booking flow

## Troubleshooting

- **CORS errors**: Ensure backend has `cors()` middleware enabled
- **Database connection**: Check environment variables match your database
- **Build fails**: Check Node version (should be 18+)
- **API not working**: Verify `VITE_API_URL` is set correctly in Vercel

