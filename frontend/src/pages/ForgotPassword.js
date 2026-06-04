import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../styles/theme.css";
import { useNotifications } from "../context/NotificationContext";

const ForgotPassword = () => {
  const [empNo,     setEmpNo]     = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [error,     setError]     = useState("");
  const notif = useNotifications();

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");
    if (notif) {
      (async () => {
        try {
          await notif.addResetRequest(empNo);
          setSubmitted(true);
        } catch (err) {
          setError(err.message || "Employee not found. Please verify your Employee ID.");
        }
      })();
    }
  };

  return (
    <div className="login-bg" style={{ marginTop: "-44px", paddingTop: "44px" }}>
      <div className="login-card" style={{ maxWidth: 400 }}>

        {/* Logo */}
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 20 }}>
          <div style={{
            width: 36, height: 36, borderRadius: 9,
            background: "linear-gradient(135deg, #2563eb, #1d4ed8)",
            display: "flex", alignItems: "center", justifyContent: "center",
            boxShadow: "0 4px 12px rgba(37,99,235,0.35)",
          }}>
            <span style={{ color: "#fff", fontWeight: 900, fontSize: 14 }}>DW</span>
          </div>
          <span style={{ fontWeight: 800, fontSize: 17, color: "#0f172a" }}>DWM Portal</span>
        </div>

        <div style={{ height: 1, background: "linear-gradient(90deg,transparent,#e2e8f0,transparent)", marginBottom: 22 }} />

        {submitted ? (
          <div style={{ textAlign: "center" }}>
            <div style={{ fontSize: 40, marginBottom: 12 }}>📨</div>
            <h5 style={{ fontWeight: 800, color: "#0f172a", marginBottom: 8 }}>Request Sent</h5>
            <p style={{ fontSize: 13.5, color: "#64748b", marginBottom: 20, lineHeight: 1.6 }}>
              Your reset request has been sent to your admin. Once approved, your password will be reset to the default — you can then change it from your profile.
            </p>
            <Link to="/login" className="btn btn-primary w-100" style={{ fontWeight: 700 }}>
              Back to Login
            </Link>
          </div>
        ) : (
          <>
            <h5 style={{ fontWeight: 800, color: "#0f172a", margin: "0 0 6px" }}>Forgot Password</h5>
            <p style={{ fontSize: 13, color: "#64748b", margin: "0 0 22px", lineHeight: 1.6 }}>
              Enter your Employee ID. A reset request will be sent to your admin for approval.
            </p>

            {error && (
              <div className="alert alert-danger" style={{ fontSize: 13, marginBottom: 16 }}>
                ⚠️ {error}
              </div>
            )}

            <form onSubmit={handleSubmit}>
              <div style={{ marginBottom: 18 }}>
                <label style={{ fontWeight: 700, fontSize: 11.5, color: "#475569", display: "block", marginBottom: 6, textTransform: "uppercase", letterSpacing: "0.5px" }}>
                  Employee / Admin No
                </label>
                <input
                  type="text" inputMode="numeric" pattern="[0-9]*"
                  className="form-control"
                  placeholder="Enter your ID number"
                  value={empNo}
                  onChange={(e) => setEmpNo(e.target.value.replace(/\D/g, ""))}
                  maxLength={10} required
                  style={{ fontSize: 15, padding: "11px 14px", letterSpacing: 1 }}
                />
              </div>

              <button type="submit" className="btn btn-primary w-100"
                style={{ padding: "12px", fontWeight: 700, fontSize: 14, marginBottom: 14 }}>
                Send Reset Request
              </button>

              <div style={{ textAlign: "center" }}>
                <Link to="/login" style={{ fontSize: 13, color: "#64748b", fontWeight: 600, textDecoration: "none" }}>
                  ← Back to Login
                </Link>
              </div>
            </form>
          </>
        )}
      </div>
    </div>
  );
};

export default ForgotPassword;
