# 🚀 Start Backend Server

## ⚠️ IMPORTANT: Backend Must Be Running!

The frontend needs the backend API to work. Follow these steps:

### 1. Check Backend Environment

Make sure `backend/.env` exists with:
```env
DB_HOST=localhost
DB_PORT=5432
DB_USER=postgres
DB_PASSWORD=your_password
DB_NAME=modex
JWT_SECRET=your_secret_key
PORT=4000
```

### 2. Start Backend Server

Open a **NEW terminal** and run:

```powershell
cd C:\Users\ashu1\Desktop\modex-project\backend
npm run dev
```

You should see:
```
Connected to PostgreSQL
Server running on http://localhost:4000
```

### 3. Start Frontend (in another terminal)

```powershell
cd C:\Users\ashu1\Desktop\modex-project\frontend
npm run dev
```

### 4. Open Browser

Go to: http://localhost:5174

## ✅ If Backend is Running but Still Getting Errors:

1. **Check database connection** - Make sure PostgreSQL is running
2. **Check .env file** - Verify all variables are correct
3. **Check backend logs** - Look for error messages
4. **Test API directly** - Open http://localhost:4000/shows in browser

## 🔧 Quick Fix:

If you see "500 Internal Server Error":
- Check backend terminal for error messages
- Verify database is accessible
- Make sure tables exist (run `initDb()`)

