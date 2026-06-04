import sys
import os
from pymongo import ASCENDING

# Adjust path to enable importing app module
sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), '..')))

from app.database.connection import db_connection
from app.models.database import (
    COL_CREDENTIALS,
    COL_EMPLOYEES,
    COL_DEPARTMENTS,
    COL_MACHINES,
    COL_SUB_CATEGORIES,
    COL_TIME_ENTRIES,
    COL_NOTIFICATIONS,
    COL_RESET_REQUESTS,
    COL_COUNTERS
)

def create_indexes():
    print("⏳ Building performance indexes and unique constraints...")
    
    db = db_connection.db
    
    # credentials
    db[COL_CREDENTIALS].create_index("empNo", unique=True)
    db[COL_CREDENTIALS].create_index("email", unique=True)
    
    # employees
    db[COL_EMPLOYEES].create_index("id", unique=True)
    db[COL_EMPLOYEES].create_index("email", unique=True)
    db[COL_EMPLOYEES].create_index("role")
    db[COL_EMPLOYEES].create_index("dept")
    db[COL_EMPLOYEES].create_index("empNo", unique=True, sparse=True)
    
    # departments
    db[COL_DEPARTMENTS].create_index("id", unique=True)
    db[COL_DEPARTMENTS].create_index("name", unique=True)
    
    # machines
    db[COL_MACHINES].create_index("id", unique=True)
    
    # sub_categories
    db[COL_SUB_CATEGORIES].create_index("id", unique=True)
    
    # time_entries
    db[COL_TIME_ENTRIES].create_index("id", unique=True)
    db[COL_TIME_ENTRIES].create_index("empId")
    db[COL_TIME_ENTRIES].create_index("empNo")
    db[COL_TIME_ENTRIES].create_index("date")
    db[COL_TIME_ENTRIES].create_index("approvalStatus")
    db[COL_TIME_ENTRIES].create_index("dept")
    db[COL_TIME_ENTRIES].create_index([("empId", ASCENDING), ("date", ASCENDING)])
    
    # notifications
    db[COL_NOTIFICATIONS].create_index("id", unique=True)
    db[COL_NOTIFICATIONS].create_index("toEmail")
    db[COL_NOTIFICATIONS].create_index("read")
    
    # reset_requests
    db[COL_RESET_REQUESTS].create_index("empNo", unique=True)
    
    print("✅ Indexes created successfully.")

def initialize_counters():
    print("⏳ Initializing database counters...")
    db = db_connection.db
    
    # We initialize starting counter values. If upserted, they won't override already progressed sequences.
    counters = [
        {"_id": "employee", "seq": 100},
        {"_id": "department", "seq": 20},
        {"_id": "machine", "seq": 10},
        {"_id": "sub_category", "seq": 10},
        {"_id": "time_entry", "seq": 100},
        {"_id": "notification", "seq": 100}
    ]
    
    for counter in counters:
        db[COL_COUNTERS].update_one(
            {"_id": counter["_id"]},
            {"$setOnInsert": {"seq": counter["seq"]}},
            upsert=True
        )
    print("✅ Counters initialized successfully (starting numbers configured).")

def main():
    try:
        db_connection.connect()
        print("Connected to MongoDB successfully.")
        create_indexes()
        initialize_counters()
        print("🎉 Database setup completed successfully! The database is clean and empty.")
    except Exception as e:
        print(f"❌ Database setup failed: {e}", file=sys.stderr)
        sys.exit(1)

if __name__ == "__main__":
    main()
