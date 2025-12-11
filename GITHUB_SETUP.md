# 📦 Push to GitHub - Step by Step

## ⚠️ IMPORTANT: Create Repository First!

The repository doesn't exist yet. Follow these steps:

### Step 1: Create GitHub Repository

1. Go to: https://github.com/new
2. Repository name: `modex-project`
3. Description: "Movie Ticket Booking System - Full Stack Application"
4. Visibility: Public (or Private)
5. **DO NOT** initialize with README, .gitignore, or license
6. Click "Create repository"

### Step 2: Push Your Code

After creating the repository, run:

```powershell
cd C:\Users\ashu1\Desktop\modex-project
git push -u origin main
```

### Step 3: Verify

Check: https://github.com/Ashutosh-Codess/modex-project

You should see all your files!

## ✅ After Pushing:

1. **Deploy Backend to Railway:**
   - Go to: https://railway.app
   - New Project → Deploy from GitHub
   - Select: `modex-project`
   - Root: `backend`
   - Add PostgreSQL
   - Set environment variables

2. **Deploy Frontend to Vercel:**
   - Go to: https://vercel.com
   - Import: `Ashutosh-Codess/modex-project`
   - Root: `frontend`
   - Build: `npm run build`
   - Output: `dist`
   - Add `VITE_API_URL` = Railway backend URL

## 🎬 Sample Shows Added:
- The Dark Knight
- Inception
- Interstellar
- The Matrix
- Avatar
- Avengers: Endgame

Refresh your browser to see them!
