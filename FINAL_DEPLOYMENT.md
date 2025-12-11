# 🚀 Final Deployment Guide

## ✅ What's Done:
1. ✓ 6 Sample shows added to database
2. ✓ All code committed to Git
3. ✓ GitHub remote configured
4. ✓ Seed script working

## 📋 Deploy Steps:

### Step 1: Create GitHub Repository

**IMPORTANT:** The repository doesn't exist yet!

1. Go to: **https://github.com/new**
2. Repository name: `modex-project`
3. Description: "Movie Ticket Booking System"
4. **DO NOT** check "Initialize with README"
5. Click "Create repository"

### Step 2: Push to GitHub

After creating the repo, run:

```powershell
cd C:\Users\ashu1\Desktop\modex-project
git push -u origin main
```

### Step 3: Deploy Backend to Railway

1. Go to: **https://railway.app**
2. Sign up/Login with GitHub
3. Click "New Project" → "Deploy from GitHub repo"
4. Select: `Ashutosh-Codess/modex-project`
5. Add **PostgreSQL** service
6. Set **Root Directory:** `backend`
7. Add Environment Variables:
   ```
   DB_HOST=<railway-db-host>
   DB_PORT=5432
   DB_USER=postgres
   DB_PASSWORD=<railway-db-password>
   DB_NAME=railway
   JWT_SECRET=your-secret-key-here
   PORT=4000
   ```
8. Deploy!

### Step 4: Deploy Frontend to Vercel

1. Go to: **https://vercel.com**
2. Sign up/Login with GitHub
3. Click "Add New" → "Project"
4. Import: `Ashutosh-Codess/modex-project`
5. Configure:
   - **Framework Preset:** Vite
   - **Root Directory:** `frontend`
   - **Build Command:** `npm run build`
   - **Output Directory:** `dist`
6. Add Environment Variable:
   ```
   VITE_API_URL=https://your-railway-backend.railway.app
   ```
7. Deploy!

## 🎬 Sample Shows Available:
- The Dark Knight (100 seats)
- Inception (120 seats)
- Interstellar (150 seats)
- The Matrix (80 seats)
- Avatar (200 seats)
- Avengers: Endgame (180 seats)

## ✨ Features:
- ✅ Cinematic movie theater background
- ✅ Dark red color theme
- ✅ Location selector
- ✅ Login/Signup with validation
- ✅ My Bookings page
- ✅ Seat booking system
- ✅ Admin panel

## 🔗 Your Live URLs:
- Frontend: `https://your-project.vercel.app`
- Backend: `https://your-backend.railway.app`

