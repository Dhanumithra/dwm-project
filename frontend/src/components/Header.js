import React, { useState } from "react";
import "../styles/theme.css";
import { useNotifications } from "../context/NotificationContext";
import NotificationsPanel from "./NotificationsPanel";

function Header({ user, workLog = {} }) {
  const [showNotif, setShowNotif] = useState(false);
  const notifCtx  = useNotifications();
  const unread    = notifCtx ? notifCtx.unreadCount(user?.email || "") : 0;

  const DAILY_MINS   = 480;
  const todayStr     = new Date().toISOString().split("T")[0];
  const todayEntry   = workLog[todayStr];
  const workedMins   = todayEntry?.regularMins  || 0;
  const overtimeMins = todayEntry?.overtimeMins || 0;
  const pendingMins  = Math.max(0, DAILY_MINS - workedMins);

  function fmt(m) {
    const h = Math.floor(m / 60), min = m % 60;
    return min === 0 ? `${h}h` : `${h}h ${min}m`;
  }

  const showHours = user?.role === "USER" || user?.role === "OPERATOR";

  return (
    <>
      <div className="header">
        {/* Left — identity pills */}
        <div style={{ display:"flex", alignItems:"center", gap:6, overflow:"hidden", flexWrap:"nowrap" }}>
          {user?.email && (
            <span className="header-pill">
              <span style={{ color:"#94a3b8", fontSize:9.5, fontWeight:700, textTransform:"uppercase" }}>Email</span>
              {user.email}
            </span>
          )}
          {user?.role && (
            <span className="header-pill accent">
              <span style={{ fontSize:9.5, fontWeight:700, textTransform:"uppercase", opacity:0.7 }}>Role</span>
              {user.role.replace(/_/g," ")}
            </span>
          )}
          {user?.department && (
            <span className="header-pill">
              <span style={{ color:"#94a3b8", fontSize:9.5, fontWeight:700, textTransform:"uppercase" }}>Dept</span>
              {user.department}
            </span>
          )}
        </div>

        {/* Right — hours + bell */}
        <div style={{ display:"flex", alignItems:"center", gap:6, flexShrink:0 }}>
          {showHours && pendingMins > 0 && (
            <span className="header-pill warn">⏳ {fmt(pendingMins)} pending</span>
          )}
          {showHours && workedMins > 0 && pendingMins === 0 && (
            <span className="header-pill success">✓ 8h done</span>
          )}
          {showHours && overtimeMins > 0 && (
            <span className="header-pill purple">🌙 OT {fmt(overtimeMins)}</span>
          )}

          {user && (
            <button
              onClick={() => setShowNotif(true)}
              title="Notifications"
              style={{
                position:"relative", background:"#f1f5f9", border:"1px solid #e2e8f0",
                borderRadius:7, width:30, height:30, cursor:"pointer",
                display:"flex", alignItems:"center", justifyContent:"center",
                fontSize:14, flexShrink:0, padding:0,
              }}
            >
              🔔
              {unread > 0 && (
                <span style={{
                  position:"absolute", top:-4, right:-4,
                  background:"#dc2626", color:"#fff", fontSize:9, fontWeight:800,
                  borderRadius:"50%", width:15, height:15,
                  display:"flex", alignItems:"center", justifyContent:"center",
                  border:"1.5px solid #fff",
                }}>
                  {unread > 9 ? "9+" : unread}
                </span>
              )}
            </button>
          )}
        </div>
      </div>

      {showNotif && (
        <>
          <div onClick={() => setShowNotif(false)}
            style={{ position:"fixed", inset:0, zIndex:1999, background:"rgba(0,0,0,0.25)" }} />
          <NotificationsPanel user={user} onClose={() => setShowNotif(false)} />
        </>
      )}
    </>
  );
}

export default Header;
