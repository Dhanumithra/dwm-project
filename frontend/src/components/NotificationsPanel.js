import React from "react";
import { useNotifications } from "../context/NotificationContext";

export default function NotificationsPanel({ user, onClose }) {
  const { getForUser, markRead, markAllRead, deleteNotification, clearAllNotifications, approvePasswordReset } = useNotifications();
  const msgs = getForUser(user?.email || "");
  const unread = msgs.filter((m) => !m.read).length;
  const hasMarkedReadRef = React.useRef(false);

  React.useEffect(() => {
    if (hasMarkedReadRef.current || unread === 0) return;
    hasMarkedReadRef.current = true;
    markAllRead(user?.email);
  }, [markAllRead, unread, user?.email]);

  const handleDelete = async (msgId) => {
    const confirmed = window.confirm("Delete this notification?");
    if (!confirmed) return;
    await deleteNotification(msgId);
  };

  const handleClearAll = async () => {
    const confirmed = window.confirm("Delete all notifications?");
    if (!confirmed) return;
    await clearAllNotifications();
  };

  const typeStyle = (type) => {
    const map = {
      success:  { bg: "#f0fdf4", border: "#bbf7d0", icon: "✅", color: "#16a34a" },
      warning:  { bg: "#fffbeb", border: "#fde68a", icon: "⚠️", color: "#d97706" },
      error:    { bg: "#fef2f2", border: "#fecaca", icon: "❌", color: "#dc2626" },
      info:     { bg: "#eff6ff", border: "#bfdbfe", icon: "ℹ️", color: "#2563eb" },
      reset:    { bg: "#faf5ff", border: "#e9d5ff", icon: "🔑", color: "#7c3aed" },
    };
    return map[type] || map.info;
  };

  function timeAgo(ts) {
    const diff = Date.now() - new Date(ts).getTime();
    const m = Math.floor(diff / 60000);
    if (m < 1) return "just now";
    if (m < 60) return `${m}m ago`;
    const h = Math.floor(m / 60);
    if (h < 24) return `${h}h ago`;
    return `${Math.floor(h / 24)}d ago`;
  }

  return (
    <div style={{
      position: "fixed", top: 0, right: 0, bottom: 0, width: 380, zIndex: 2000,
      background: "#fff", boxShadow: "-4px 0 24px rgba(0,0,0,0.12)",
      display: "flex", flexDirection: "column",
    }}>
      {/* Header */}
      <div style={{
        padding: "18px 20px", borderBottom: "1px solid #e2e8f0",
        display: "flex", alignItems: "center", justifyContent: "space-between",
        background: "#f8fafc",
      }}>
        <div>
          <h5 style={{ margin: 0, fontWeight: 800, color: "#0f172a", fontSize: 16 }}>
            🔔 Notifications
          </h5>
          {unread > 0 && (
            <p style={{ margin: "2px 0 0", fontSize: 12, color: "#64748b" }}>
              {unread} unread message{unread !== 1 ? "s" : ""}
            </p>
          )}
        </div>
        <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
          {msgs.length > 0 && (
            <button
              onClick={handleClearAll}
              style={{
                background: "none", border: "1px solid #e2e8f0", borderRadius: 6,
                padding: "4px 10px", fontSize: 11.5, color: "#475569", cursor: "pointer",
                fontWeight: 600,
              }}
            >
              Clear All
            </button>
          )}
          <button
            onClick={onClose}
            style={{
              background: "#f1f5f9", border: "none", borderRadius: 8, width: 32, height: 32,
              cursor: "pointer", fontSize: 16, display: "flex", alignItems: "center",
              justifyContent: "center", color: "#475569",
            }}
          >
            ×
          </button>
        </div>
      </div>

      {/* Messages list */}
      <div style={{ flex: 1, overflowY: "auto", padding: "12px 16px" }}>
        {msgs.length === 0 ? (
          <div style={{ textAlign: "center", padding: "60px 20px", color: "#94a3b8" }}>
            <div style={{ fontSize: 40, marginBottom: 12 }}>📭</div>
            <p style={{ fontWeight: 600, fontSize: 14 }}>No notifications yet</p>
            <p style={{ fontSize: 13 }}>Messages from admin will appear here.</p>
          </div>
        ) : (
          msgs.map((msg) => {
            const s = typeStyle(msg.type);
            return (
              <div
                key={msg.id}
                onClick={() => markRead(msg.id)}
                style={{
                  background: msg.read ? "#fff" : s.bg,
                  border: `1px solid ${msg.read ? "#e2e8f0" : s.border}`,
                  borderRadius: 10, padding: "12px 14px", marginBottom: 10,
                  cursor: "pointer", transition: "all 0.15s",
                  opacity: msg.read ? 0.75 : 1,
                  position: "relative",
                }}
              >
                {!msg.read && (
                  <div style={{
                    position: "absolute", top: 12, right: 12, width: 8, height: 8,
                    borderRadius: "50%", background: s.color,
                  }} />
                )}
                <div style={{ display: "flex", gap: 10, alignItems: "flex-start" }}>
                  <span style={{ fontSize: 18, flexShrink: 0 }}>{s.icon}</span>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 3 }}>
                      <span style={{ fontWeight: 700, fontSize: 13, color: "#0f172a" }}>{msg.subject}</span>
                      <div style={{ display: "flex", alignItems: "center", gap: 8, flexShrink: 0, marginLeft: 8 }}>
                        <span style={{ fontSize: 11, color: "#94a3b8" }}>{timeAgo(msg.timestamp)}</span>
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleDelete(msg.id);
                          }}
                          style={{
                            border: "none",
                            background: "transparent",
                            color: "#dc2626",
                            fontSize: 12,
                            fontWeight: 700,
                            cursor: "pointer",
                            padding: 0,
                          }}
                          aria-label="Delete notification"
                          title="Delete notification"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                    <p style={{ fontSize: 13, color: "#475569", margin: "0 0 4px", lineHeight: 1.5 }}>{msg.body}</p>
                    <span style={{ fontSize: 11, color: "#94a3b8", fontWeight: 500 }}>From: {msg.from}</span>

                    {/* Admin: Approve password reset request */}
                    {msg.subject === "Password Reset Request" && !msg.approved && (user?.role === "ADMIN" || user?.role === "SUPER_ADMIN") && (
                      <div style={{ marginTop: 10 }}
                        onClick={(e) => e.stopPropagation()}>
                        <button
                          className="btn btn-success btn-sm"
                          style={{ fontSize: 12, fontWeight: 700, padding: "5px 14px" }}
                          onClick={(e) => {
                            e.stopPropagation();
                            // Extract empNo from "Employee #XXXX" in msg.from
                            const match = msg.from.match(/\d+/);
                            const empNo = match ? match[0] : null;
                            approvePasswordReset(msg.id, empNo, null);
                          }}
                        >
                          ✅ Approve Reset
                        </button>
                        <span style={{ fontSize: 11, color: "#64748b", marginLeft: 10 }}>
                          Resets password to default
                        </span>
                      </div>
                    )}
                    {msg.approved && msg.subject === "Password Reset Request" && (
                      <div style={{ marginTop: 8, fontSize: 12, color: "#16a34a", fontWeight: 700 }}>✅ Reset approved</div>
                    )}

                    {/* Old reset form — keep for backward compat */}
                    {msg.type === "reset" && msg.actionType === "password_reset_approved" && !msg.actioned && (
                      <div style={{ marginTop: 10 }}>
                        <ResetPasswordForm msgId={msg.id} />
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}

function ResetPasswordForm({ msgId }) {
  const [newPwd, setNewPwd] = React.useState("");
  const [confirm, setConfirm] = React.useState("");
  const [done, setDone] = React.useState(false);

  const handleReset = () => {
    if (!newPwd || newPwd !== confirm) return;
    setDone(true);
  };

  if (done) return (
    <div style={{ background: "#f0fdf4", border: "1px solid #bbf7d0", borderRadius: 6, padding: "8px 12px", fontSize: 12.5, color: "#16a34a", fontWeight: 700 }}>
      ✅ Password updated successfully!
    </div>
  );

  return (
    <div style={{ background: "#f8fafc", border: "1px solid #e2e8f0", borderRadius: 8, padding: "10px 12px" }}>
      <p style={{ fontSize: 12, fontWeight: 700, color: "#475569", margin: "0 0 8px" }}>Set new password:</p>
      <input
        type="password"
        className="form-control"
        placeholder="New password"
        value={newPwd}
        onChange={(e) => setNewPwd(e.target.value)}
        style={{ marginBottom: 6, fontSize: 13 }}
        onClick={(e) => e.stopPropagation()}
      />
      <input
        type="password"
        className="form-control"
        placeholder="Confirm password"
        value={confirm}
        onChange={(e) => setConfirm(e.target.value)}
        style={{ marginBottom: 8, fontSize: 13 }}
        onClick={(e) => e.stopPropagation()}
      />
      {confirm && newPwd !== confirm && (
        <p style={{ fontSize: 11.5, color: "#dc2626", margin: "0 0 6px" }}>Passwords do not match</p>
      )}
      <button
        className="btn btn-primary btn-sm w-100"
        style={{ fontWeight: 700, fontSize: 12.5 }}
        onClick={(e) => { e.stopPropagation(); handleReset(); }}
        disabled={!newPwd || newPwd !== confirm}
      >
        Update Password
      </button>
    </div>
  );
}
