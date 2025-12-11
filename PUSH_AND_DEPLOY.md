# 🚀 Push to GitHub & Deploy - Step by Step

## ✅ Build Status: SUCCESS ✅
Your frontend builds successfully! Ready to deploy.

## Step 1: Create GitHub Repository

**You need to create the repository first:**

1. Go to: **https://github.com/new**
2. Repository name: `modex-project`
3. Description: "Full-stack ticket booking system"
4. Choose: **Public** or **Private**
5. **DO NOT** check "Initialize with README" (we already have files)
6. Click **"Create repository"**

## Step 2: Push to GitHub

After creating the repo, run this command:

```powershell
cd C:\Users\ashu1\Desktop\modex-project
git push -u origin main
```

**If you get authentication errors:**

### Option A: Use Personal Access Token
1. Go to: https://github.com/settings/tokens
2. Click "Generate new token (classic)"
3. Select scopes: `repo` (full control)
4. Copy the token
5. When git asks for password, paste the token

### Option B: Use GitHub Desktop
1. Download: https://desktop.github.com/
2. Sign in
3. File → Add Local Repository
4. Select: `C:\Users\ashu1\Desktop\modex-project`
5. Click "Publish repository"

## Step 3: Deploy Frontend to Vercel

1. **Go to**: https://vercel.com
2. **Sign in** with GitHub
3. **Click**: "New Project"
4. **Import**: `Ashutosh-Codess/modex-project`
5. **Configure**:
   - **Root Directory**: `frontend` (click "Edit" and type `frontend`)
   - **Framework Preset**: Vite (auto-detected)
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
   - **Install Command**: `npm install`

6. **Environment Variables**:
   - Click "Environment Variables"
   - Add: `VITE_API_URL` = `http://localhost:4000` (for now, update after backend deployment)

7. **Click**: "Deploy"

## Step 4: Deploy Backend to Railway

1. **Go to**: https://railway.app
2. **Sign in** with GitHub
3. **New Project** → **Deploy from GitHub repo**
4. **Select**: `modex-project`
5. **Add PostgreSQL**:
   - Click "New" → "Database" → "PostgreSQL"
6. **Set Environment Variables**:
   - Click on your service → Variables
   - Add these (get values from PostgreSQL service):
     ```
     DB_HOST=<from PostgreSQL>
     DB_PORT=5432
     DB_USER=postgres
     DB_PASSWORD=<from PostgreSQL>
     DB_NAME=railway
     JWT_SECRET=<generate random string>
     PORT=<auto-set>
     ```
7. **Set Root Directory**:
   - Settings → Root Directory → `backend`
8. **Deploy!**

## Step 5: Update Frontend API URL

1. Go back to Vercel
2. Project → Settings → Environment Variables
3. Update `VITE_API_URL` to your Railway backend URL
4. Redeploy

## ✅ Done!

Your app is now live! 🎉

