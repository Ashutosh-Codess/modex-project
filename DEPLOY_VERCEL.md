# 🚀 Deploy to Vercel

## Step 1: Create Vercel Account
1. Go to: https://vercel.com
2. Sign up/Login with GitHub

## Step 2: Import Project
1. Click "Add New" → "Project"
2. Import: `Ashutosh-Codess/modex-project`
3. Configure:

### Frontend Settings:
- **Framework Preset:** Vite
- **Root Directory:** `frontend`
- **Build Command:** `npm run build`
- **Output Directory:** `dist`
- **Install Command:** `npm install`

### Environment Variables:
Add these in Vercel dashboard:
```
VITE_API_URL=https://your-backend-url.railway.app
```

## Step 3: Deploy Backend to Railway
1. Go to: https://railway.app
2. Sign up/Login with GitHub
3. Click "New Project" → "Deploy from GitHub repo"
4. Select: `Ashutosh-Codess/modex-project`
5. Add PostgreSQL service
6. Set Root Directory: `backend`
7. Add Environment Variables:
```
DB_HOST=your-railway-db-host
DB_PORT=5432
DB_USER=postgres
DB_PASSWORD=your-railway-db-password
DB_NAME=railway
JWT_SECRET=your-secret-key-here
PORT=4000
```

## Step 4: Update Frontend API URL
After Railway deployment, update `VITE_API_URL` in Vercel to your Railway backend URL.

## Step 5: Redeploy
- Vercel will auto-deploy on push to GitHub
- Or manually trigger deployment

## ✅ Done!
Your app will be live at: `https://your-project.vercel.app`

