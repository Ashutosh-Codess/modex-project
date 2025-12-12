# 🔧 Vercel Deployment Fix

## ⚠️ CRITICAL: Vercel Configuration

### Problem:
Frontend deployed but showing blank page - no UI, no navbar, nothing.

### Solution:

#### 1. Vercel Project Settings:

Go to your Vercel project → Settings → General

**Root Directory:** `frontend`
**Build Command:** `npm run build`
**Output Directory:** `dist`
**Install Command:** `npm install`

#### 2. Environment Variables:

Go to Settings → Environment Variables

Add:
```
VITE_API_URL=https://your-backend.onrender.com
```

**IMPORTANT:** Replace `your-backend.onrender.com` with your actual Render backend URL!

#### 3. Redeploy:

After setting environment variables:
- Go to Deployments tab
- Click "..." on latest deployment
- Click "Redeploy"

#### 4. Check Build Logs:

If still blank:
- Go to Deployments
- Click on latest deployment
- Check "Build Logs" for errors

### Common Issues:

1. **Blank page** = Build succeeded but routing broken
   - Fix: Ensure `vercel.json` has rewrites for SPA routing

2. **No styles** = CSS not loading
   - Fix: Check if Tailwind CSS is building correctly

3. **API errors** = Wrong backend URL
   - Fix: Set correct `VITE_API_URL` in Vercel

4. **Build fails** = TypeScript errors
   - Fix: All errors must be fixed before deployment

### Quick Test:

After redeploy, check browser console (F12):
- Look for errors
- Check Network tab - are files loading?
- Check if API calls are going to correct backend URL

