# User Guide

> Complete feature documentation and usage instructions for Daily Work Management Portal

---

## 📋 Table of Contents

1. [Dashboard Overview](#dashboard-overview)
2. [Employee Management](#employee-management)
3. [Time Entry Logging](#time-entry-logging)
4. [Viewing Reports](#viewing-reports)
5. [Role-Specific Features](#role-specific-features)
6. [Tips & Best Practices](#tips--best-practices)

---

## Dashboard Overview

### Main Dashboard

The dashboard provides at-a-glance insights into organizational activities.

**Key Sections:**
- **Total Employees**: Active employee count
- **Today's Entries**: Work logs submitted today
- **Pending Approvals**: Late entries requiring approval
- **Department Distribution**: Pie chart of employees by department
- **Recent Activities**: Timeline of system events

### Navigation Menu

| Menu Item | Access Level | Purpose |
|-----------|--------------|---------|
| Dashboard | All Roles | View system overview |
| Employees | Admin+ | Manage employees & departments |
| Time Entries | Operator+ | Log and review work entries |
| Reports | Manager+ | Generate analytics & reports |
| Machines | Admin+ | Manage equipment & resources |
| Configuration | Admin+ | System settings |
| Admin Panel | Super Admin | Advanced administration |
| Profile | All Roles | Personal settings |

---

## Employee Management

### Super Admin & Admin Access

#### Adding Employees

1. **Navigate**: Employees → Employee List
2. **Click**: "Add New Employee" button
3. **Fill Form**:
   - **Employee No.**: Unique ID (e.g., "EMP001")
   - **Full Name**: Employee's full name
   - **Email**: Valid email address
   - **Phone**: Contact number
   - **Department**: Select department
   - **Role**: Choose user role
   - **Status**: Active/Inactive
4. **Set Credentials**: Temporary password
5. **Click**: "Save Employee"

#### Editing Employees

1. **Navigate**: Employees → Employee List
2. **Find Employee**: Use search or browse
3. **Click**: Employee name or edit icon
4. **Update Fields**: Modify information
5. **Click**: "Save Changes"

#### Department Management

**Create Department:**
1. Navigate: Employees → Departments
2. Click: "Add New Department"
3. Fill: Name and description
4. Click: "Save"

**View Department Details:**
1. Navigate: Employees → Departments
2. Click: Department name
3. View: Members, headcount, manager

---

## Time Entry Logging

### For Employees: Logging Work

#### Basic Work Entry

1. **Navigate**: Time Entries → Log Work
2. **Select Date**: Pick the date
3. **Enter Times**:
   - **Time In**: Work start time
   - **Time Out**: Work end time
4. **Select Category**: Choose category
5. **Select Sub-Category**: Specific task
6. **Add Description**: Brief summary
7. **Optional**: Machine/Equipment, Notes
8. **Click**: "Submit Entry"

#### Late Entry Submission

1. Same steps as basic entry
2. System marks as **"Late Entry"**
3. Requires **Manager Approval**
4. Manager receives notification

#### Bulk Entry Upload

1. Navigate: Time Entries → Bulk Upload
2. Download template CSV
3. Fill template with entries
4. Upload file
5. System validates and imports

### For Managers: Reviewing Entries

#### Viewing Team Entries

1. **Navigate**: Time Entries → Team Entries
2. **Apply Filters**:
   - Date range
   - Department
   - Employee name
   - Status
3. **View Details**: Click on entry
4. **Available Actions**:
   - Approve/Reject
   - Edit
   - Delete

#### Approving Late Entries

1. Navigate: Time Entries → Pending Approvals
2. Review entry details
3. Click: "Approve" or "Reject"
4. Add comment (recommended)
5. Submit decision

---

## Viewing Reports

### Report Types

#### 1. Attendance Report

**Purpose**: Track presence and absences

**How to Access:**
1. Navigate: Reports → Attendance
2. **Select Filters**:
   - Date Range
   - Department
   - Employee
3. **View Results**:
   - Calendar view
   - Absence count
   - On-time vs. late entries
4. **Export**: PDF or CSV

**Key Metrics:**
- Total days worked
- Absences
- Late entries
- Average hours per day

#### 2. Productivity Report

**Purpose**: Analyze work by category

**How to Access:**
1. Navigate: Reports → Productivity
2. **Select Filters**:
   - Date Range
   - Department/Employee
   - Category
3. **View Charts**:
   - Pie chart: Time by category
   - Bar chart: Hours comparison
   - Table: Detailed breakdown

#### 3. Monthly Report

**Purpose**: Monthly performance summary

**How to Access:**
1. Navigate: Reports → Monthly
2. **Select**: Month and Year
3. **View**:
   - Total hours worked
   - Average daily hours
   - Department comparison
   - Top performers

#### 4. Custom Reports

**Purpose**: Create tailored reports

**How to Create:**
1. Navigate: Reports → Custom
2. **Select Report Elements**:
   - Metrics
   - Filters
   - Visualization type
3. **Preview**: See report preview
4. **Generate & Export**: Download

### Exporting Reports

**PDF Export:**
1. Open any report
2. Click: "Export to PDF"
3. Download formatted PDF

**CSV Export:**
1. Open any report
2. Click: "Export to CSV"
3. Download spreadsheet

---

## Role-Specific Features

### Employee Role

**Permissions:**
- ✅ Log own work entries
- ✅ View own history
- ✅ View personal profile
- ❌ Cannot manage others
- ❌ Cannot approve entries

**Primary Tasks:**
1. Log daily work
2. View own history
3. Check notifications
4. Update profile

### Operator Role

**Permissions:**
- ✅ Log work entries
- ✅ View team entries
- ✅ Generate basic reports
- ✅ Manage time entry data
- ❌ Cannot manage employees
- ❌ Cannot approve late entries

**Primary Tasks:**
1. Submit team work entries
2. Review work data
3. Generate team reports
4. Manage operations

### Manager/Admin Role

**Permissions:**
- ✅ All Operator permissions
- ✅ Manage employees & departments
- ✅ Approve/reject entries
- ✅ View detailed analytics
- ✅ Configure categories
- ❌ Cannot access super admin features

**Primary Tasks:**
1. Approve pending entries
2. Manage team members
3. Generate reports
4. Configure categories
5. Monitor performance

### Super Admin Role

**Permissions:**
- ✅ Complete system access
- ✅ All Manager permissions
- ✅ User role management
- ✅ System configuration
- ✅ Database management

**Primary Tasks:**
1. Create departments
2. Manage user roles
3. System maintenance
4. Advanced configuration
5. Security settings

---

## Tips & Best Practices

### For Accurate Time Tracking

1. **Log Entries Daily**
   - Log same day or next day
   - Avoid backlogging entries

2. **Be Specific with Categories**
   - Use correct sub-category
   - Improves report accuracy

3. **Add Meaningful Descriptions**
   - Clear descriptions help managers
   - Useful for performance reviews

### For Managers

1. **Regular Approval Reviews**
   - Review pending entries daily
   - Approve within 24 hours

2. **Monitor Patterns**
   - Check reports for unusual patterns
   - Identify bottlenecks

3. **Communicate Changes**
   - Notify team of category changes
   - Update classifications

### System Usage

1. **Regular Backups**
   - Ask admin for regular backups
   - Critical for data safety

2. **Update Information**
   - Keep employee info current
   - Update contact details

3. **Report Regularly**
   - Review reports weekly/monthly
   - Share insights with team

---

## Keyboard Shortcuts

| Shortcut | Action |
|----------|--------|
| Ctrl + K | Quick search |
| Ctrl + L | Logout |
| Alt + H | Go to dashboard |
| Alt + E | Go to time entries |
| Alt + R | Go to reports |
| Esc | Close dialogs |
| Enter | Submit form |

---

## Notifications

### Notification Types

| Type | When | Action |
|------|------|--------|
| **Entry Approved** | Your entry approved | Informational |
| **Entry Rejected** | Your entry rejected | Review & resubmit |
| **Approval Needed** | New late entry | Review & approve |
| **System Alert** | Important notice | Read immediately |

### Managing Notifications

1. **View Notifications**: Click bell icon (top-right)
2. **Mark as Read**: Click notification
3. **Delete**: Click X icon
4. **Clear All**: "Clear All" button

---

## Password & Security

### Changing Your Password

1. Navigate: Profile → Change Password
2. Enter: Current password
3. Enter: New password
4. Confirm: Repeat new password
5. Click: "Update Password"

**Password Requirements:**
- Minimum 8 characters
- At least 1 uppercase letter
- At least 1 number
- At least 1 special character

### Forgot Password

1. On login screen: Click "Forgot Password?"
2. Enter: Your email address
3. Check: Email for reset link
4. Click: Link in email
5. Enter: New password
6. Save and login

---

## Getting More Help

- **API Documentation**: http://127.0.0.1:8000/docs
- **Troubleshooting Guide**: [TROUBLESHOOTING.md](./TROUBLESHOOTING.md)
- **Architecture Details**: [ARCHITECTURE.md](./ARCHITECTURE.md)

**Need help?** Check the [Troubleshooting Guide](./TROUBLESHOOTING.md) or contact your administrator.
