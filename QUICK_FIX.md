# 🚨 Quick Fix - Backend Not Running

## The Problem:
- Frontend shows blank page
- Console shows "500 Internal Server Error" for `/shows`
- Backend API is not responding

## ✅ Solution:

### Step 1: Start Backend Server

Open a **NEW PowerShell terminal** and run:

```powershell
cd C:\Users\ashu1\Desktop\modex-project\backend
npm run dev
```

**Wait for this message:**
```
Connected to PostgreSQL
Server running on http://localhost:4000
```

### Step 2: Verify Backend is Working

Open browser and go to: **http://localhost:4000/shows**

You should see: `[]` (empty array) or a JSON array of shows

### Step 3: Refresh Frontend

Go back to: **http://localhost:5174**

The UI should now load!

## 🔍 If Still Not Working:

1. **Check Backend Terminal** - Look for error messages
2. **Check Database** - Make sure PostgreSQL is running
3. **Check .env** - Verify `backend/.env` has correct database credentials
4. **Check Port** - Make sure port 4000 is not in use

## 📝 Common Issues:

- **"Cannot connect to database"** → Check PostgreSQL is running
- **"Port 4000 already in use"** → Kill process using port 4000
- **"Table does not exist"** → Backend will auto-create tables on first run

## ✅ After Backend Starts:

The frontend will automatically fetch shows and display them!

