# Getting Started Guide

> Complete setup and first-time use instructions for Daily Work Management Portal

**Estimated Time**: 15-20 minutes

---

## 📋 Table of Contents

1. [System Requirements](#system-requirements)
2. [Installation](#installation)
3. [Initial Setup](#initial-setup)
4. [First Login](#first-login)
5. [Next Steps](#next-steps)

---

## System Requirements

### Hardware
- **Processor**: 2+ cores
- **RAM**: 4GB minimum (8GB recommended for production)
- **Storage**: 2GB free space
- **Network**: 1Mbps+ internet connection

### Software
- **Operating System**: Windows 10+, macOS 10.14+, or Linux (Ubuntu 18.04+)
- **Node.js**: v14.0 or higher
- **Python**: 3.8 or higher
- **MongoDB**: Community Edition 6.0+
- **Browser**: Chrome 90+, Firefox 88+, Safari 14+, or Edge 90+

### Verify Prerequisites

```bash
# Check Node.js
node --version    # Should be v14+
npm --version     # Should be v6+

# Check Python
python --version  # Should be 3.8+
pip --version

# Check MongoDB (after installation)
mongod --version
```

---

## Installation

### Option A: One-Click Installation (Recommended - Windows)

**Step 1: Prepare Environment**
1. Download and install Node.js from https://nodejs.org/
2. Download and install Python from https://www.python.org/
3. Download and install MongoDB from https://www.mongodb.com/try/download/community

**Step 2: Start Services**
1. Extract the project folder
2. Double-click `run.bat` in the project root
3. Wait for both services to start (2-3 minutes)

**Step 3: Access Application**
- Open browser: `http://localhost:3000`
- Frontend should load automatically

### Option B: Manual Installation

#### Backend Setup

**Step 1: Install Dependencies**
```bash
cd backend
pip install -r requirements.txt
```

**Step 2: Configure Environment**
```bash
# Copy example environment file
cp .env.example .env

# Edit .env with your settings (usually defaults work fine)
# Default MongoDB: 127.0.0.1:27017
```

**Step 3: Initialize Database**
```bash
# This creates collections and indexes
python scripts/setup_db.py
```

**Step 4: Start Backend Server**
```bash
# Development mode (recommended for first-time use)
uvicorn app.main:app --reload --host 127.0.0.1 --port 8000
```

**Expected Output:**
```
INFO:     Uvicorn running on http://127.0.0.1:8000
INFO:     Application startup complete
```

#### Frontend Setup

**Step 1: Open New Terminal and Navigate**
```bash
cd frontend
```

**Step 2: Install Dependencies**
```bash
npm install
```

**Step 3: Start Development Server**
```bash
npm start
```

**Expected Behavior:**
- Application opens in default browser at `http://localhost:3000`
- If not, manually navigate to the URL

---

## Initial Setup

### First-Time Configuration

#### 1. Super Admin Login

On first launch, login with default Super Admin credentials:

| Field | Value |
|-------|-------|
| Employee ID | `9001` |
| Password | `super123` |

**Important**: Change this password immediately after first login!

#### 2. Create Your First Department

1. After login, navigate to **Employees** → **Departments**
2. Click **"Add New Department"**
3. Fill in:
   - **Department Name**: e.g., "Engineering", "Operations"
   - **Description**: Brief description (optional)
   - **Manager**: Select from employees (optional)
4. Click **Save**

#### 3. Add Your First Employee

1. Navigate to **Employees** → **Employee List**
2. Click **"Add New Employee"**
3. Fill in required fields:
   - **Employee No.**: Unique identifier (e.g., "EMP001")
   - **Full Name**: Employee's full name
   - **Email**: Valid email address
   - **Department**: Select from created departments
   - **Role**: Select role:
     - **Super Admin**: Full system access
     - **Admin**: Department/system management
     - **Operator**: Can manage work entries
     - **Employee**: Can only log own work
   - **Password**: Initial login password
4. Click **Save**

#### 4. Configure Work Categories

1. Navigate to **Configuration** → **Work Categories**
2. Click **"Add Category"**
3. Add main categories like:
   - Development
   - Testing
   - Documentation
   - Maintenance
4. For each category, add **Sub-Categories**:
   - Click on category → **Add Sub-Category**
   - Example sub-categories for "Development":
     - Frontend Development
     - Backend Development
     - Database Design

#### 5. Set Up Machines (Optional)

If your organization uses machines/equipment:

1. Navigate to **Machines**
2. Click **"Add Machine"**
3. Fill in:
   - **Machine Name**: e.g., "CNC Machine 1"
   - **Machine Type**: Category type
   - **Status**: Active/Inactive
   - **Assigned Operator**: Select employee
4. Click **Save**

---

## First Login

### Accessing the Application

**URL**: `http://localhost:3000`

### Login Screen

1. Enter your **Employee ID** (default: `9001`)
2. Enter your **Password** (default: `super123`)
3. Click **Login**

### Dashboard Overview

After successful login, you'll see:

- **Top Navigation**: Menu items based on your role
- **Dashboard**: Quick statistics and recent activities
- **Left Sidebar**: Navigation menu
- **User Profile**: Top-right corner with logout option

### Dashboard Sections (Super Admin)

| Section | Purpose |
|---------|---------|
| **Dashboard** | Overview statistics and quick stats |
| **Employees** | Manage employees and departments |
| **Machines** | Manage equipment and resources |
| **Time Entries** | View and manage work logs |
| **Reports** | View analytics and generate reports |
| **Configuration** | System settings and categories |
| **Admin Panel** | Advanced administration features |

---

## Security Best Practices

### On First Login

1. ⚠️ **Change Super Admin Password**
   - Navigate to **Profile** → **Change Password**
   - Set a strong, unique password
   - Store securely

2. 🔐 **Create Personal Admin Account**
   - Add a new employee with Admin role
   - Use this account for regular administration
   - Keep Super Admin account for emergency access only

3. 📋 **Review User Permissions**
   - Ensure employees are assigned correct roles
   - Regular audit of access levels
   - Remove unnecessary admin privileges

### Regular Maintenance

- Change passwords every 90 days
- Review active sessions monthly
- Archive old data quarterly
- Backup database regularly

---

## Common First-Time Tasks

### Task 1: Log Your First Work Entry

**For Employees:**
1. Login with your employee credentials
2. Navigate to **Time Entries** → **Log Work**
3. Fill in:
   - **Date**: Select date
   - **Time In**: Start time
   - **Time Out**: End time
   - **Category**: Select work category
   - **Sub-Category**: Select specific task
   - **Description**: Brief description
4. Click **Submit**

### Task 2: View Team Analytics

**For Managers:**
1. Navigate to **Reports**
2. Select report type:
   - **Attendance Report**: Track team presence
   - **Productivity Report**: Analyze work categories
   - **Monthly Report**: Monthly summary
3. Choose date range and filters
4. Review charts and statistics

### Task 3: Approve Pending Entries

**For Admins:**
1. Navigate to **Time Entries**
2. Filter by **Status: Pending**
3. Click on entry to review
4. Click **Approve** or **Reject**
5. Add comment (optional)

---

## Troubleshooting

### Issue: "Cannot connect to MongoDB"

**Solution:**
1. Ensure MongoDB is running
   ```bash
   # Windows: Check Services
   # macOS: brew services list
   # Linux: systemctl status mongod
   ```
2. Verify MongoDB is on port 27017
3. Check `.env` configuration

### Issue: "Port 3000 already in use"

**Solution:**
```bash
# Use different port
PORT=3001 npm start

# Or kill process using port
# Windows: netstat -ano | findstr :3000
# macOS/Linux: lsof -ti:3000 | xargs kill -9
```

### Issue: "Dependencies not installed"

**Solution:**
```bash
# Clear cache
npm cache clean --force

# Reinstall
rm -rf node_modules package-lock.json
npm install
```

---

## Next Steps

### 1. Set Up Your Team
- [ ] Create all departments
- [ ] Add all employees
- [ ] Assign correct roles

### 2. Configure System
- [ ] Add work categories
- [ ] Set up machines (if needed)
- [ ] Configure notifications

### 3. Start Using
- [ ] Create work entries
- [ ] Review reports
- [ ] Share dashboards with team

### 4. Advanced Features
- [ ] Set up backup schedule
- [ ] Configure email notifications
- [ ] Create custom reports

---

## Getting Help

| Resource | Link |
|----------|------|
| **User Guide** | [USER_GUIDE.md](./USER_GUIDE.md) |
| **API Docs** | http://127.0.0.1:8000/docs |
| **Troubleshooting** | [TROUBLESHOOTING.md](./TROUBLESHOOTING.md) |
| **GitHub Issues** | https://github.com/Dhanumithra/dwm-project/issues |

---

**Ready to get started?** 🚀  
Follow the installation steps above, then explore the [User Guide](./USER_GUIDE.md) for detailed feature walkthroughs!
