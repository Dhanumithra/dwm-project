# API Reference

> Complete API documentation for Daily Work Management Portal

**Base URL**: `http://127.0.0.1:8000`  
**Interactive Docs**: `http://127.0.0.1:8000/docs`

---

## 📋 Table of Contents

1. [Authentication APIs](#authentication-apis)
2. [Employee APIs](#employee-apis)
3. [Department APIs](#department-apis)
4. [Time Entry APIs](#time-entry-apis)
5. [Report APIs](#report-apis)
6. [Machine APIs](#machine-apis)
7. [Notification APIs](#notification-apis)
8. [Common Response Formats](#common-response-formats)

---

## Authentication APIs

### Login

```
POST /api/auth/login
```

**Request:**
```json
{
  "empNo": "9001",
  "password": "super123"
}
```

**Response:**
```json
{
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "token_type": "bearer",
  "user": {
    "id": "emp_001",
    "empNo": "9001",
    "name": "Super Admin",
    "email": "admin@dwm.local",
    "role": "SUPER_ADMIN"
  }
}
```

**Status Codes:**
- `200`: Successful login
- `401`: Invalid credentials
- `400`: Missing required fields

---

### Logout

```
POST /api/auth/logout
```

**Headers:**
```
Authorization: Bearer {access_token}
```

**Response:**
```json
{
  "message": "Logged out successfully"
}
```

### Reset Password

```
POST /api/auth/reset-password
```

**Request:**
```json
{
  "email": "user@example.com"
}
```

**Response:**
```json
{
  "message": "Password reset link sent to email"
}
```

---

## Employee APIs

### Get All Employees

```
GET /api/employees
```

**Query Parameters:**
- `skip`: Number of records to skip (default: 0)
- `limit`: Maximum records to return (default: 10)
- `status`: Filter by status (ACTIVE, INACTIVE)
- `department_id`: Filter by department

**Response:**
```json
{
  "total": 50,
  "data": [
    {
      "id": "emp_001",
      "empNo": "EMP001",
      "name": "John Doe",
      "email": "john@example.com",
      "department_id": "dept_001",
      "phone": "9876543210",
      "status": "ACTIVE"
    }
  ]
}
```

### Get Employee Details

```
GET /api/employees/{emp_id}
```

**Response:**
```json
{
  "id": "emp_001",
  "empNo": "EMP001",
  "name": "John Doe",
  "email": "john@example.com",
  "department_id": "dept_001",
  "phone": "9876543210",
  "status": "ACTIVE",
  "created_at": "2026-06-05T10:00:00Z",
  "updated_at": "2026-06-05T10:00:00Z"
}
```

### Create Employee

```
POST /api/employees
```

**Headers:**
```
Authorization: Bearer {access_token}
Content-Type: application/json
```

**Request:**
```json
{
  "empNo": "EMP002",
  "name": "Jane Smith",
  "email": "jane@example.com",
  "phone": "9876543211",
  "department_id": "dept_001",
  "password": "SecurePass123!",
  "role": "OPERATOR"
}
```

**Response:**
```json
{
  "id": "emp_002",
  "empNo": "EMP002",
  "name": "Jane Smith",
  "message": "Employee created successfully"
}
```

### Update Employee

```
PUT /api/employees/{emp_id}
```

**Request:**
```json
{
  "name": "Jane Smith Updated",
  "phone": "9876543212",
  "status": "ACTIVE"
}
```

**Response:**
```json
{
  "message": "Employee updated successfully",
  "data": { }
}
```

### Delete Employee

```
DELETE /api/employees/{emp_id}
```

**Response:**
```json
{
  "message": "Employee deleted successfully"
}
```

---

## Department APIs

### Get All Departments

```
GET /api/departments
```

**Response:**
```json
{
  "total": 5,
  "data": [
    {
      "id": "dept_001",
      "name": "Engineering",
      "description": "Software development team",
      "manager_id": "emp_001",
      "created_at": "2026-06-05T10:00:00Z"
    }
  ]
}
```

### Create Department

```
POST /api/departments
```

**Request:**
```json
{
  "name": "Engineering",
  "description": "Software development team",
  "manager_id": "emp_001"
}
```

### Get Department Headcount

```
GET /api/departments/{dept_id}/headcount
```

**Response:**
```json
{
  "department_name": "Engineering",
  "total_employees": 10,
  "active_employees": 9,
  "inactive_employees": 1
}
```

---

## Time Entry APIs

### Create Time Entry

```
POST /api/time-entries
```

**Request:**
```json
{
  "date": "2026-06-05",
  "time_in": "09:00",
  "time_out": "17:00",
  "category": "Development",
  "sub_category": "Frontend",
  "description": "Worked on dashboard UI",
  "machine_id": null
}
```

**Response:**
```json
{
  "id": "entry_001",
  "empId": "emp_001",
  "date": "2026-06-05",
  "status": "PENDING",
  "message": "Time entry created successfully"
}
```

### Get Time Entries

```
GET /api/time-entries
```

**Query Parameters:**
- `emp_id`: Filter by employee
- `start_date`: Start date (YYYY-MM-DD)
- `end_date`: End date (YYYY-MM-DD)
- `status`: Filter by status (APPROVED, PENDING, REJECTED)

**Response:**
```json
{
  "total": 20,
  "data": [
    {
      "id": "entry_001",
      "empId": "emp_001",
      "date": "2026-06-05",
      "time_in": "09:00",
      "time_out": "17:00",
      "category": "Development",
      "sub_category": "Frontend",
      "status": "APPROVED"
    }
  ]
}
```

### Approve/Reject Entry

```
PUT /api/time-entries/{entry_id}/approve
```

**Request:**
```json
{
  "status": "APPROVED",
  "comment": "Looks good"
}
```

**Response:**
```json
{
  "message": "Entry approved successfully"
}
```

---

## Report APIs

### Attendance Report

```
GET /api/reports/attendance
```

**Query Parameters:**
- `start_date`: Start date
- `end_date`: End date
- `emp_id`: Employee ID (optional)
- `department_id`: Department ID (optional)

**Response:**
```json
{
  "report_type": "Attendance",
  "period": "2026-06-01 to 2026-06-30",
  "data": [
    {
      "emp_id": "emp_001",
      "name": "John Doe",
      "total_days_worked": 20,
      "absences": 2,
      "late_entries": 1,
      "average_hours": 8.5
    }
  ]
}
```

### Productivity Report

```
GET /api/reports/productivity
```

**Query Parameters:**
- `start_date`: Start date
- `end_date`: End date
- `category`: Work category (optional)

**Response:**
```json
{
  "report_type": "Productivity",
  "data": {
    "Development": 45,
    "Testing": 30,
    "Documentation": 15,
    "Maintenance": 10
  }
}
```

### Monthly Report

```
GET /api/reports/monthly
```

**Query Parameters:**
- `year`: Year (YYYY)
- `month`: Month (MM)

**Response:**
```json
{
  "report_type": "Monthly",
  "month": "June 2026",
  "total_hours": 1600,
  "average_daily_hours": 8,
  "top_performers": [
    {
      "emp_id": "emp_001",
      "name": "John Doe",
      "hours_worked": 160
    }
  ]
}
```

---

## Machine APIs

### Get All Machines

```
GET /api/machines
```

**Response:**
```json
{
  "total": 5,
  "data": [
    {
      "id": "mach_001",
      "name": "CNC Machine 1",
      "type": "Industrial",
      "status": "ACTIVE",
      "operator_id": "emp_001"
    }
  ]
}
```

### Create Machine

```
POST /api/machines
```

**Request:**
```json
{
  "name": "CNC Machine 1",
  "type": "Industrial",
  "status": "ACTIVE",
  "operator_id": "emp_001"
}
```

---

## Notification APIs

### Get Notifications

```
GET /api/notifications
```

**Query Parameters:**
- `read`: Filter by read status (true/false)
- `limit`: Maximum records to return

**Response:**
```json
{
  "total": 10,
  "unread_count": 3,
  "data": [
    {
      "id": "notif_001",
      "message": "Your time entry was approved",
      "type": "INFO",
      "read": false,
      "created_at": "2026-06-05T10:00:00Z"
    }
  ]
}
```

### Mark as Read

```
PUT /api/notifications/{notif_id}/read
```

**Response:**
```json
{
  "message": "Notification marked as read"
}
```

---

## Common Response Formats

### Success Response

```json
{
  "success": true,
  "message": "Operation completed successfully",
  "data": { },
  "timestamp": "2026-06-05T10:30:00Z"
}
```

### Error Response

```json
{
  "success": false,
  "error": "Error code",
  "message": "Error description",
  "details": { },
  "timestamp": "2026-06-05T10:30:00Z"
}
```

### Status Codes

| Code | Meaning |
|------|---------|
| 200 | OK - Request succeeded |
| 201 | Created - Resource created |
| 400 | Bad Request - Invalid input |
| 401 | Unauthorized - Authentication failed |
| 403 | Forbidden - Permission denied |
| 404 | Not Found - Resource not found |
| 500 | Internal Server Error |

---

## Headers

**Required Headers:**
```
Authorization: Bearer {access_token}
Content-Type: application/json
```

---

**For interactive API testing**, visit: http://127.0.0.1:8000/docs
