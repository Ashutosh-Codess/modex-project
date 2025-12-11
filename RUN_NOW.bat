@echo off
title Modex Ticket Booking System
color 0A
echo.
echo ================================================
echo    MOVIE TICKET BOOKING SYSTEM
echo ================================================
echo.
echo Starting Backend Server...
echo.
start "Backend - Port 4000" cmd /k "cd /d %~dp0backend && echo Starting Backend... && npm run dev"

timeout /t 5 /nobreak >nul

echo Starting Frontend Server...
echo.
start "Frontend - Port 5174" cmd /k "cd /d %~dp0frontend && echo Starting Frontend... && npm run dev"

timeout /t 8 /nobreak >nul

echo.
echo ================================================
echo    SERVERS STARTED!
echo ================================================
echo.
echo Backend:  http://localhost:4000
echo Frontend: http://localhost:5174
echo.
echo Opening browser...
echo.
start http://localhost:5174

echo.
echo ================================================
echo    IMPORTANT:
echo ================================================
echo.
echo 1. Keep BOTH terminal windows OPEN
echo 2. Wait for "Server running on http://localhost:4000" in Backend window
echo 3. Browser will open automatically
echo If you see errors, check the Backend window
echo.
pause

