import sys
import os

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

def run_cleanup():
    print("--- Starting target MongoDB cleanup script ---")
    db = db_connection.db

    # Remove all credentials except SUPER_ADMIN with empNo "9001"
    res_cred = db[COL_CREDENTIALS].delete_many({"empNo": {"$ne": "9001"}})
    print(f"Deleted {res_cred.deleted_count} credentials records (Super Admin preserved).")

    # Remove all employees except SA-01 / Super Admin
    res_emp = db[COL_EMPLOYEES].delete_many({"empNo": {"$ne": "9001"}})
    print(f"Deleted {res_emp.deleted_count} employee profiles (Super Admin preserved).")

    # Ensure Super Admin account exists in credentials if empty
    from app.utils.security import get_password_hash
    if db[COL_CREDENTIALS].count_documents({"empNo": "9001"}) == 0:
        db[COL_CREDENTIALS].insert_one({
            "empNo": "9001",
            "password": get_password_hash("super123"),
            "role": "SUPER_ADMIN",
            "department": "System",
            "email": "super101@dwm.com"
        })
        print("Re-seeded Super Admin login credentials.")

    if db[COL_EMPLOYEES].count_documents({"empNo": "9001"}) == 0:
        db[COL_EMPLOYEES].insert_one({
            "id": "SA-01",
            "name": "Super Admin",
            "email": "super101@dwm.com",
            "role": "SUPER_ADMIN",
            "dept": "System",
            "designation": "System Administrator",
            "shift": "A",
            "active": True,
            "empNo": "9001"
        })
        print("Re-seeded Super Admin profile.")

    # Remove all other collections completely
    # Re-seed original departments
    db[COL_DEPARTMENTS].delete_many({})
    original_depts = [
        { "id": 1,  "name": "Marketing - Textile Automation",    "headCount": 0, "description": "Marketing for textile automation products"  },
        { "id": 2,  "name": "Marketing - Machine Tooling",       "headCount": 0, "description": "Marketing for machine tooling division"     },
        { "id": 3,  "name": "Engineering Design",                "headCount": 0, "description": "Product & engineering design"               },
        { "id": 4,  "name": "NPD Design",                        "headCount": 0, "description": "New product development"                   },
        { "id": 5,  "name": "Mechatronics",                      "headCount": 0, "description": "Mechanical & electronics integration"       },
        { "id": 6,  "name": "Quality Assurance",                 "headCount": 0, "description": "Quality control & assurance"                },
        { "id": 7,  "name": "Customer Service",                  "headCount": 0, "description": "Customer support & service"                 },
        { "id": 8,  "name": "Project Management",                "headCount": 0, "description": "Project-specific planning & execution"      },
        { "id": 9,  "name": "Total Plant Maintenance",           "headCount": 0, "description": "Plant maintenance & upkeep"                 },
        { "id": 10, "name": "Product Assembly",                  "headCount": 0, "description": "Product assembly operations"                },
        { "id": 11, "name": "Project Assembly",                  "headCount": 0, "description": "Project-specific assembly"                  },
        { "id": 12, "name": "Machining Division",                "headCount": 0, "description": "CNC & machining operations"                 },
        { "id": 13, "name": "Sheet Metal Division",              "headCount": 0, "description": "Sheet metal fabrication"                    },
        { "id": 14, "name": "Powder Coating",                    "headCount": 0, "description": "Surface finishing & coating"                },
        { "id": 15, "name": "Human Resource",                    "headCount": 0, "description": "HR & people operations"                     },
        { "id": 16, "name": "Planning & Engineering Innovation", "headCount": 0, "description": "Planning & innovation engineering"          },
        { "id": 17, "name": "Supply Chain Management",           "headCount": 0, "description": "Supply chain & procurement"                 },
        { "id": 18, "name": "Stores",                            "headCount": 0, "description": "Inventory & stores management"              }
    ]
    db[COL_DEPARTMENTS].insert_many(original_depts)
    print("Re-seeded all 18 original departments successfully.")

    res_machine = db[COL_MACHINES].delete_many({})
    print(f"Deleted {res_machine.deleted_count} machines.")

    res_subcat = db[COL_SUB_CATEGORIES].delete_many({})
    print(f"Deleted {res_subcat.deleted_count} subcategories.")

    res_time = db[COL_TIME_ENTRIES].delete_many({})
    print(f"Deleted {res_time.deleted_count} time entries.")

    res_notif = db[COL_NOTIFICATIONS].delete_many({})
    print(f"Deleted {res_notif.deleted_count} notifications.")

    res_reset = db[COL_RESET_REQUESTS].delete_many({})
    print(f"Deleted {res_reset.deleted_count} reset requests.")

    # Reset/ensure counter sequences starting points
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
            {"$set": {"seq": counter["seq"]}},
            upsert=True
        )
    print("Database counter sequences successfully reset.")
    print("Cleanup completed successfully. Database matches initial production specifications.")

def main():
    try:
        db_connection.connect()
        run_cleanup()
    except Exception as e:
        print(f"Cleanup failed: {e}", file=sys.stderr)
        sys.exit(1)

if __name__ == "__main__":
    main()
