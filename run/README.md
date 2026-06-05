# Run Scripts Directory

This folder contains the startup and shutdown scripts for Daily Work Management Portal.

## 📁 Files

- **start.bat** - One-click startup script for all services
- **stop.bat** - One-click shutdown script for all services
- **README.md** - This file

## 🚀 Quick Start

### Starting the Application

**Double-click** `start.bat` to launch all services:
- Backend API (port 8000)
- Frontend Application (port 3000)
- MongoDB connection

Both services will start in separate command windows.

### Stopping the Application

**Double-click** `stop.bat` to gracefully shut down all services:
- Closes Frontend application
- Closes Backend server
- Cleans up any remaining processes

### URLs After Starting

| Service | URL |
|---------|-----|
| Frontend | http://localhost:3000 |
| Backend API | http://127.0.0.1:8000 |
| API Documentation | http://127.0.0.1:8000/docs |

### Default Login Credentials

- **Employee ID**: `9001`
- **Password**: `super123`

## ✨ Features

✅ One-click startup for both frontend and backend
✅ Automatic dependency installation
✅ Database initialization
✅ Graceful shutdown
✅ Clear console feedback

## ⚙️ Requirements

- Node.js 14+
- Python 3.8+
- MongoDB 6.0+

## 📝 Notes

- First-time startup may take 2-3 minutes as dependencies are installed
- Both services will open in separate command windows
- Keep both windows open while using the application
- MongoDB must be running before starting the application

## ❓ Troubleshooting

**Port already in use?**
- Close any existing instances and wait 30 seconds
- Or edit scripts to use different ports

**Dependencies not installing?**
- Ensure Node.js and Python are installed and in PATH
- Try running scripts as Administrator

For more help, see [TROUBLESHOOTING.md](../docs/TROUBLESHOOTING.md)
