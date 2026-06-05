# Troubleshooting Guide

> Solutions to common issues and problems

---

## 📋 Table of Contents

1. [Installation Issues](#installation-issues)
2. [Startup Issues](#startup-issues)
3. [Connection Issues](#connection-issues)
4. [Performance Issues](#performance-issues)
5. [Functionality Issues](#functionality-issues)

---

## Installation Issues

### Issue: Node.js Not Found

**Error Message:**
```
'node' is not recognized as an internal or external command
```

**Solution:**
1. Download Node.js from https://nodejs.org/
2. Install with default settings
3. Restart your computer
4. Verify installation:
   ```bash
   node --version
   npm --version
   ```

---

### Issue: Python Not Found

**Error Message:**
```
'python' is not recognized as an internal or external command
```

**Solution:**
1. Download Python from https://www.python.org/
2. **Important**: Check "Add Python to PATH" during installation
3. Restart your computer
4. Verify installation:
   ```bash
   python --version
   pip --version
   ```

---

### Issue: MongoDB Not Installed

**Error Message:**
```
mongod: command not found
```

**Solution:**
1. Download MongoDB Community from https://www.mongodb.com/try/download/community
2. Follow installation guide for your OS
3. Start MongoDB:
   - **Windows**: Search for "MongoDB" in Services
   - **macOS**: `brew services start mongodb-community`
   - **Linux**: `sudo systemctl start mongod`

---

## Startup Issues

### Issue: Port Already in Use

**Error Message (Frontend):**
```
Error: Port 3000 is already in use
```

**Error Message (Backend):**
```
ERROR: address already in use (port 8000)
```

**Solution:**

**Option 1: Kill Process Using Port**
```bash
# Windows
netstat -ano | findstr :3000
taskkill /PID <PID> /F

# macOS/Linux
lsof -ti:3000 | xargs kill -9
```

**Option 2: Use Different Port**
```bash
# Frontend
PORT=3001 npm start

# Backend
uvicorn app.main:app --port 8001
```

---

### Issue: Dependencies Not Installed

**Error Message:**
```
npm ERR! Cannot find module 'react'
pip error: No module named 'fastapi'
```

**Solution:**

**Frontend:**
```bash
cd frontend
rm -rf node_modules package-lock.json
npm cache clean --force
npm install
```

**Backend:**
```bash
cd backend
python -m venv venv
source venv/bin/activate
pip install --upgrade pip
pip install -r requirements.txt
```

---

### Issue: run.bat Not Working (Windows)

**Error Message:**
```
Access is denied
'run.bat' is not recognized
```

**Solution:**

**Option 1: Run as Administrator**
1. Right-click `run.bat`
2. Select "Run as administrator"

**Option 2: Use PowerShell**
```powershell
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
.\run.bat
```

---

## Connection Issues

### Issue: Cannot Connect to MongoDB

**Error Message:**
```
pymongo.errors.ServerSelectionTimeoutError: No servers in topologies
```

**Solution:**

**Step 1: Verify MongoDB is Running**
```bash
# Windows: Check Services for "MongoDB"
# macOS: brew services list
# Linux: systemctl status mongod
```

**Step 2: Check Connection String**
```bash
# Edit backend/.env
# Verify DATABASE_URL is correct
# Default: mongodb://localhost:27017/dwm
```

**Step 3: Test Connection**
```bash
mongosh
> show databases
```

---

### Issue: Frontend Cannot Reach Backend

**Error Message:**
```
Failed to fetch from http://localhost:8000/api/...
CORS error: Access to XMLHttpRequest blocked
```

**Solution:**

**Step 1: Verify Backend is Running**
```bash
http://127.0.0.1:8000/docs
```

**Step 2: Check CORS Configuration**
- Verify CORS middleware includes localhost:3000

**Step 3: Clear Browser Cache**
- Press Ctrl+Shift+Delete
- Clear browsing data
- Reload page

---

## Performance Issues

### Issue: Application Loading Slowly

**Solution:**

**1. Check Server Status**
```bash
top  # macOS/Linux
tasklist  # Windows
```

**2. Clear Browser Cache**
- Press Ctrl+Shift+Delete
- Clear cache and cookies
- Reload application

**3. Increase Backend Workers**
```bash
gunicorn -w 4 -b 0.0.0.0:8000 app.main:app
```

---

## Functionality Issues

### Issue: Login Fails

**Error Message:**
```
Invalid credentials or user not found
```

**Solution:**

**Step 1: Verify Database Initialized**
```bash
cd backend
python scripts/setup_db.py
```

**Step 2: Check Default Credentials**
```
Employee ID: 9001
Password: super123
```

---

### Issue: Time Entry Not Saved

**Error Message:**
```
Entry submission failed
```

**Solution:**

**1. Verify All Required Fields**
- Date
- Time In & Time Out
- Category
- Sub-Category
- Description

**2. Check Date Format**
- Use YYYY-MM-DD format
- Times in HH:MM format

**3. Check Browser Console**
- Press F12
- Go to Console tab
- Look for error messages

---

## Getting More Help

| Resource | Link |
|----------|------|
| GitHub Issues | https://github.com/Dhanumithra/dwm-project/issues |
| User Guide | [USER_GUIDE.md](./USER_GUIDE.md) |
| API Docs | http://127.0.0.1:8000/docs |
| Getting Started | [GETTING_STARTED.md](./GETTING_STARTED.md) |

**Still stuck?** Create an issue on GitHub with error details and steps to reproduce.
