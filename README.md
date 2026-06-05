# Daily Work Management (DWM) Portal

> **Enterprise-Grade Work Management & Analytics Platform**
>
> A comprehensive full-stack application for tracking, managing, and analyzing organizational work activities with real-time dashboards, advanced reporting, and secure role-based access control.

---

## 🎯 Quick Links

- 📖 [Getting Started Guide](./docs/GETTING_STARTED.md)
- 🏗️ [Architecture & Design](./docs/ARCHITECTURE.md)
- 📊 [User Guide](./docs/USER_GUIDE.md)
- 🔧 [API Documentation](./docs/API_REFERENCE.md)
- 🚀 [Deployment Guide](./docs/DEPLOYMENT.md)
- 🔐 [Security Guidelines](./docs/SECURITY.md)
- 🛠️ [Development Guide](./docs/DEVELOPMENT.md)
- 📋 [Database Schema](./docs/DATABASE_SCHEMA.md)
- ❓ [Troubleshooting Guide](./docs/TROUBLESHOOTING.md)

---

## 📋 Overview

**Daily Work Management Portal** is an enterprise-level work tracking and analytics system designed to streamline organizational productivity management. Built with modern technologies, the platform enables seamless work logging, real-time monitoring, comprehensive reporting, and data-driven insights.

### 🎯 Core Objectives

- **Track** daily work activities with precision
- **Manage** organizational resources efficiently
- **Analyze** productivity trends and patterns
- **Report** on attendance, performance, and metrics
- **Secure** sensitive organizational data
- **Scale** to support growing organizations

### 👥 Organization

**Developed for**: LLS - LMW Private Unit 1  
**Current Version**: 1.0.0  
**Status**: Production Ready ✅  
**Last Updated**: June 2026

---

## ⚡ Quick Start

### 🟢 One-Click Setup (Recommended)

**Windows Users:**
```bash
# 1. Extract project folder
# 2. Double-click: run.bat
# 3. Wait for services to start
# 4. Open browser: http://localhost:3000
```

**To Stop:**
```bash
# Double-click: close.bat
```

### 🔐 Default Admin Credentials
- **Employee ID**: `9001`
- **Password**: `super123`
- **Role**: Super Administrator

---

## 📊 Key Features

### 👥 User & Access Management
- ✅ Role-based access control (Super Admin, Admin, Operator, Employee)
- ✅ Employee profile management
- ✅ JWT-based authentication
- ✅ Password reset & recovery
- ✅ Department hierarchy

### 📝 Work Tracking
- ✅ Daily time entry logging
- ✅ Work categorization & sub-categories
- ✅ Machine/equipment assignment
- ✅ Late entry handling with approvals
- ✅ Historical data archival

### 📈 Analytics & Reporting
- ✅ Real-time dashboards
- ✅ Attendance analytics
- ✅ Productivity metrics
- ✅ Monthly summaries
- ✅ PDF/CSV export capabilities
- ✅ Custom filters & date ranges

### 🔔 Notifications & Alerts
- ✅ Real-time in-app notifications
- ✅ Approval workflows
- ✅ Success/failure alerts
- ✅ Read status tracking

### 🔐 Security & Compliance
- ✅ Bcrypt password hashing
- ✅ JWT token authentication
- ✅ Role-based middleware
- ✅ Secure API endpoints
- ✅ Offline-capable architecture

---

## 🏗️ System Architecture

```
┌────────────────────────────────────────────────────────────┐
│                 Frontend (React)                           │
│            http://localhost:3000                           │
│  • Interactive User Interface                              │
│  • Real-time Dashboards & Charts                           │
│  • Report Generation & Export                              │
└──────────────────────┬─────────────────────────────────────┘
                       │ (REST API)
                       ↓
┌────────────────────────────────────────────────────────────┐
│              Backend (FastAPI)                             │
│           http://127.0.0.1:8000                            │
│  • RESTful API Endpoints                                   │
│  • Business Logic Layer                                    │
│  • JWT Authentication & RBAC                               │
│  • Data Validation & Processing                            │
└──────────────────────┬─────────────────────────────────────┘
                       │ (PyMongo)
                       ↓
┌────────────────────────────────────────────────────────────┐
│         Database (MongoDB)                                 │
│          127.0.0.1:27017                                   │
│  • Organized Collections                                   │
│  • Indexed Queries                                         │
│  • Offline-Capable Storage                                 │
└────────────────────────────────────────────────────────────┘
```

---

## 🛠️ Technology Stack

### Frontend
| Layer | Technology | Version |
|-------|-----------|---------|
| Framework | React | 19.2.3 |
| Routing | React Router | 7.13.0 |
| UI Framework | Bootstrap | 5.3.8 |
| Charts | Chart.js | 4.5.1 |
| PDF Export | jsPDF | 3.0.4 |
| HTTP | Axios/Fetch | Latest |

### Backend
| Layer | Technology | Version |
|-------|-----------|---------|
| Framework | FastAPI | 0.100.0+ |
| Server | Uvicorn | 0.22.0+ |
| Database | MongoDB | 6.0+ |
| ORM/Driver | PyMongo | 4.4.0+ |
| Validation | Pydantic | 2.0.0+ |
| Auth | JWT (python-jose) | 3.3.0+ |
| Hashing | Bcrypt | 4.0.0+ |

---

## 📋 Requirements

### System Requirements
- **CPU**: 2+ cores
- **RAM**: 4GB minimum (8GB recommended)
- **Storage**: 2GB free space
- **Network**: 1Mbps+ bandwidth

### Software Requirements
- Node.js 14.0+ and npm 6.0+
- Python 3.8+
- MongoDB Community Server 6.0+
- Windows 10+, macOS 10.14+, or Linux (Ubuntu 18.04+)

### Browser Support
- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

---

## 📚 Documentation

### For Users
- 📖 **[Getting Started Guide](./docs/GETTING_STARTED.md)** - Initial setup and first-time use
- 📊 **[User Guide](./docs/USER_GUIDE.md)** - Complete feature walkthrough

### For Developers
- 🏗️ **[Architecture & Design](./docs/ARCHITECTURE.md)** - System design and patterns
- 🔧 **[Development Guide](./docs/DEVELOPMENT.md)** - Setting up development environment
- 📋 **[Database Schema](./docs/DATABASE_SCHEMA.md)** - Complete database structure

### For Deployment & Operations
- 🚀 **[Deployment Guide](./docs/DEPLOYMENT.md)** - Production deployment instructions
- 🔐 **[Security Guidelines](./docs/SECURITY.md)** - Security best practices
- 📡 **[API Reference](./docs/API_REFERENCE.md)** - Complete API documentation

### For Support
- ❓ **[Troubleshooting Guide](./docs/TROUBLESHOOTING.md)** - Common issues and solutions

---

## 🚀 Getting Started

### 1️⃣ Installation (2 minutes)

**Option A: Automated (Recommended)**
```bash
# Windows users
run.bat

# macOS/Linux users
bash setup.sh  # (to be created)
```

**Option B: Manual**
```bash
# Backend setup
cd backend
pip install -r requirements.txt
python scripts/setup_db.py
uvicorn app.main:app --reload

# Frontend setup (new terminal)
cd frontend
npm install
npm start
```

### 2️⃣ Access Application

- **Frontend**: http://localhost:3000
- **API Docs**: http://127.0.0.1:8000/docs
- **Default Login**: ID: 9001 | Password: super123

### 3️⃣ Initial Configuration

1. Login as Super Admin
2. Create departments
3. Add employees
4. Configure work categories
5. Start tracking work

👉 **[Detailed Setup Guide →](./docs/GETTING_STARTED.md)**

---

## 📖 Main Documentation

### User Documentation
- Complete feature guides
- Step-by-step tutorials
- Best practices for work logging
- Report generation walkthrough

### Technical Documentation
- API endpoints reference
- Database schema documentation
- Architecture decisions
- Development setup guide

### Operations Documentation
- Deployment procedures
- Monitoring & maintenance
- Backup & recovery
- Security protocols

👉 **[View all documentation →](./docs/)**

---

## 🔧 Common Commands

| Command | Purpose |
|---------|---------|
| `run.bat` | Start all services (Windows) |
| `close.bat` | Stop all services (Windows) |
| `npm start` | Start frontend dev server |
| `npm run build` | Build frontend for production |
| `uvicorn app.main:app --reload` | Start backend server |
| `python scripts/setup_db.py` | Initialize database |
| `python scripts/test_api.py` | Test API endpoints |

---

## 📊 Project Statistics

| Metric | Value |
|--------|-------|
| **Frontend** | 68.6% JavaScript |
| **Backend** | 27.8% Python |
| **Styling** | 3.2% CSS |
| **Other** | 0.4% |
| **Total Size** | ~495 KB (repo) |
| **Collections** | 9 MongoDB collections |
| **API Endpoints** | 30+ RESTful endpoints |

---

## 🔐 Security

DWM Portal implements enterprise-grade security:

- ✅ **Authentication**: JWT tokens with 24-hour expiry
- ✅ **Authorization**: Role-based access control (RBAC)
- ✅ **Password Security**: Bcrypt hashing (10 rounds)
- ✅ **API Security**: CORS configuration, input validation
- ✅ **Data Protection**: Encrypted sensitive fields
- ✅ **Audit Logging**: All operations logged

👉 **[Security Guidelines →](./docs/SECURITY.md)**

---

## 🤝 Contributing

We welcome contributions! Please:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Make your changes
4. Write/update tests
5. Commit with clear messages
6. Push to branch and create Pull Request

---

## 🐛 Issue Reporting

Found a bug or have a suggestion?

1. Check [existing issues](https://github.com/Dhanumithra/dwm-project/issues)
2. Create a detailed bug report with:
   - Issue description
   - Steps to reproduce
   - Expected vs actual behavior
   - Screenshots/logs
   - System information

---

## 📞 Support

| Channel | Details |
|---------|---------|
| **Issues** | [GitHub Issues](https://github.com/Dhanumithra/dwm-project/issues) |
| **Documentation** | [/docs folder](./docs/) |
| **Organization** | LLS - LMW Private Unit 1 |

---

## 📄 License

This project is licensed under the MIT License.

---

## 🎉 Quick Reference Card

### Starting the App
```bash
# One-click start
run.bat

# Or manual start
# Terminal 1
cd backend && uvicorn app.main:app --reload

# Terminal 2
cd frontend && npm start
```

### URLs
| Service | URL |
|---------|-----|
| Frontend | http://localhost:3000 |
| API | http://127.0.0.1:8000 |
| API Docs | http://127.0.0.1:8000/docs |
| MongoDB | 127.0.0.1:27017 |

### Default Credentials
- **ID**: 9009
- **Password**: super123
- **Role**: Super Administrator

### Key Folders
| Folder | Purpose |
|--------|---------|
| `/frontend` | React application |
| `/backend` | FastAPI server |
| `/docs` | Documentation |
| `run.bat` | Startup script |
| `close.bat` | Shutdown script |

---

**Status**: ✅ Production Ready  
**Last Updated**: June 2026  
**Version**: 1.0.0

---

Made with ❤️ for LLS - LMW Private Unit 1
