# Daily Work Management Portal Quick Start PowerShell Script
# Enforces database indexing and spins up the FastAPI uvicorn server.

Write-Host "=============================================" -ForegroundColor Cyan
Write-Host "      DWM Portal FastAPI Server Setup        " -ForegroundColor Cyan
Write-Host "=============================================" -ForegroundColor Cyan

# Check if .env exists
if (-not (Test-Path ".env")) {
    Write-Host "⚠️  .env configuration file not found! Copying from template..." -ForegroundColor Yellow
    Copy-Item ".env.example" ".env"
}

# Run Database Setup
Write-Host "⏳ Bootstrapping database indexes and counters..." -ForegroundColor Cyan
python scripts/setup_db.py

if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ Database setup failed. Make sure MongoDB Community Server is installed and running." -ForegroundColor Red
    Exit 1
}

# Run FastAPI Server
Write-Host "🚀 Launching FastAPI backend server..." -ForegroundColor Green
uvicorn app.main:app --reload --host 127.0.0.1 --port 8000
