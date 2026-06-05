@echo off
title DWM Project - Shutdown Script
echo.
echo ========================================
echo    DWM Project - Closing Services
echo ========================================
echo.

REM Kill Frontend windows (npm/node processes)
echo [1/2] Stopping Frontend Application...
taskkill /FI "WINDOWTITLE eq DWM Frontend*" /T /F >nul 2>&1
timeout /t 2 /nobreak

REM Kill Backend windows (Python/Uvicorn processes)
echo [2/2] Stopping Backend Server...
taskkill /FI "WINDOWTITLE eq DWM Backend*" /T /F >nul 2>&1

REM Kill any remaining npm processes
taskkill /IM node.exe /F >nul 2>&1

REM Kill any remaining Python processes on port 8000
for /f "tokens=5" %%a in ('netstat -anob 2^>nul ^| find ":8000" 2^>nul') do (
    taskkill /PID %%a /F >nul 2>&1
)

echo.
echo ========================================
echo     All Services Stopped Successfully!
echo ========================================
echo.
echo Note: MongoDB and other services remain running.
echo.
pause
