import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "../styles/theme.css";

const NAV = {
  USER: [
    { path:"/time-entry",     icon:"⏱",  label:"Time Entry"     },
    { path:"/work-analytics", icon:"📊",  label:"Work Analytics" },
    { path:"/reports",        icon:"📄",  label:"Reports"        },
  ],
  ADMIN: [
    { path:"/employees",      icon:"👥",  label:"Management"     },
    { path:"/work-analytics", icon:"📊",  label:"Work Analytics" },
    { path:"/reports",        icon:"📄",  label:"Reports"        },
  ],
  SUPER_ADMIN: [
    { path:"/employees",      icon:"👥",  label:"Employees"      },
    { path:"/departments",    icon:"🏢",  label:"Departments"    },
    { path:"/machines",       icon:"⚙️",  label:"Machines"       },
    { path:"/analytics",      icon:"📊",  label:"Analytics"      },
    { path:"/reports",        icon:"📄",  label:"Reports"        },
  ],
  OPERATOR: [
    { path:"/time-entry",     icon:"⏱",  label:"Time Entry"     },
    { path:"/work-analytics", icon:"📊",  label:"Work Analytics" },
    { path:"/reports",        icon:"📄",  label:"Reports"        },
    { path:"/machines",       icon:"⚙️",  label:"Machines"       },
  ],
};

function Sidebar({ role, onLogout, collapsed, onToggle }) {
  const navigate = useNavigate();
  const location = useLocation();
  const active   = (p) => location.pathname === p ? "active" : "";
  const items    = NAV[role] || [];

  return (
    <nav className={`sidebar${collapsed ? " collapsed" : ""}`}>

      {/* ── Hamburger ── */}
      <button
        className="sidebar-toggle"
        onClick={onToggle}
        aria-label={collapsed ? "Expand menu" : "Collapse menu"}
        title={collapsed ? "Expand menu" : "Collapse menu"}
      >
        <div className="hamburger">
          <span /><span /><span />
        </div>
      </button>

      {/* ── Section label ── */}
      <div className="sidebar-section">Menu</div>

      {/* ── Nav links ── */}
      <ul>
        {items.map((item) => (
          <li key={item.path}>
            <Link
              to={item.path}
              className={active(item.path)}
              title={collapsed ? item.label : ""}
            >
              <em className="nav-icon">{item.icon}</em>
              <span className="nav-label">{item.label}</span>
            </Link>
          </li>
        ))}
      </ul>

      {/* ── Profile link ── */}
      <div style={{ padding: "0 10px 4px" }}>
        <Link
          to="/profile"
          className={active("/profile")}
          title={collapsed ? "Profile" : ""}
          style={{
            display: "flex", alignItems: "center", gap: 10,
            padding: "9px 11px", borderRadius: 8,
            fontSize: 13, fontWeight: 500, color: "#7a96b0",
            textDecoration: "none", whiteSpace: "nowrap", overflow: "hidden",
            border: "1px solid transparent",
            transition: "background 0.15s, color 0.15s",
          }}
          onMouseEnter={(e) => {
            if (!e.currentTarget.classList.contains("active")) {
              e.currentTarget.style.background = "rgba(255,255,255,0.05)";
              e.currentTarget.style.color = "#c8d9e8";
            }
          }}
          onMouseLeave={(e) => {
            if (!e.currentTarget.classList.contains("active")) {
              e.currentTarget.style.background = "transparent";
              e.currentTarget.style.color = "#7a96b0";
            }
          }}
        >
          <em className="nav-icon" style={{ fontStyle: "normal", fontSize: 15, flexShrink: 0, width: 20, textAlign: "center" }}>👤</em>
          <span className="nav-label">Profile</span>
        </Link>
      </div>

      {/* ── Logout ── */}
      <button
        className="sidebar-logout"
        onClick={() => { onLogout(); navigate("/login"); }}
        title={collapsed ? "Logout" : ""}
      >
        <em className="nav-icon" style={{ fontSize:14 }}>⏻</em>
        <span className="logout-label">Logout</span>
      </button>
    </nav>
  );
}

export default Sidebar;
