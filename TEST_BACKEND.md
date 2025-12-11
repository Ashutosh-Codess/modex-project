# 🧪 Test Backend API

## Quick Test Commands:

### 1. Test Backend Root:
```powershell
Invoke-WebRequest -Uri "http://localhost:4000" -UseBasicParsing
```
Should return: "Backend server is running"

### 2. Test Shows API:
```powershell
Invoke-WebRequest -Uri "http://localhost:4000/shows" -UseBasicParsing
```
Should return: `[]` (empty array) or JSON array of shows

### 3. Test in Browser:
Open: **http://localhost:4000/shows**

Should see: `[]` or JSON array

## ✅ If Backend Works:

1. Frontend will automatically fetch shows
2. You'll see the UI load
3. If no shows exist, you'll see "No shows available"

## ❌ If Backend Fails:

Check backend terminal window for error messages:
- Database connection errors
- Table creation errors
- Port already in use

