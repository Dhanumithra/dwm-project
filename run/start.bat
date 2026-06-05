@echo off
title DWM Project - Startup Script
echo.
echo ========================================
echo    DWM Project - Daily Work Management
echo ========================================
echo.
echo Starting services...
echo.

REM Start Backend
echo [1/2] Starting Backend Server on port 8000...
start "DWM Backend Server" cmd /k "cd backend && pip install -r requirements.txt >nul 2>&1 && python scripts/setup_db.py && uvicorn app.main:app --reload --host 127.0.0.1 --port 8000"

REM Wait for backend to initialize
timeout /t 5 /nobreak

REM Start Frontend
echo [2/2] Starting Frontend Application on port 3000...
start "DWM Frontend Application" cmd /k "cd frontend && npm install >nul 2>&1 && npm start"

echo.
echo ========================================
echo     All Services Started Successfully!
echo ========================================
echo.
echo Backend API:  http://127.0.0.1:8000/docs
echo Frontend:     http://localhost:3000
echo.
echo To close all servers, run: close.bat
echo.
pause
