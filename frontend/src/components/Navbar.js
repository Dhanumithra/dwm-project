import React from "react";
import "../styles/theme.css";

function Navbar() {
  return (
    <div className="navbar">
      {/* Logo badge */}
      <div className="navbar-logo">DW</div>

      {/* Thin vertical divider */}
      <div className="navbar-divider" />

      {/* App title */}
      <h5 className="navbar-title">Daily Work Management</h5>
    </div>
  );
}

export default Navbar;
