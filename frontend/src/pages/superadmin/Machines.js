import React, { useState } from "react";
import "../../styles/theme.css";

function MachineAvatar({ name }) {
  const initials = name.split(/[\s\-\/]+/).slice(0, 2).map((w) => w[0]).join("").toUpperCase();
  return (
    <div style={{
      width: 40, height: 40, borderRadius: 10,
      background: "linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%)",
      display: "flex", alignItems: "center", justifyContent: "center",
      marginBottom: 12, flexShrink: 0,
    }}>
      <span style={{ color: "#fff", fontWeight: 800, fontSize: 13, letterSpacing: 0.5 }}>{initials}</span>
    </div>
  );
}

const StatusPill = ({ active }) => (
  <span style={{
    display: "inline-flex", alignItems: "center", gap: 6,
    background: active ? "#f0fdf4" : "#f8fafc",
    border: `1px solid ${active ? "#bbf7d0" : "#e2e8f0"}`,
    color: active ? "#16a34a" : "#94a3b8",
    borderRadius: 20, padding: "4px 12px",
    fontSize: 12, fontWeight: 700,
  }}>
    <span style={{ width: 7, height: 7, borderRadius: "50%", background: active ? "#16a34a" : "#cbd5e1", display: "inline-block" }} />
    {active ? "Active" : "Inactive"}
  </span>
);

function Machines({ machines = [], readOnly = false }) {
  const [activeTab, setActiveTab] = useState("grid");

  return (
    <div className="page">
      <div className="container-fluid">

        {/* Page header */}
        <div className="d-flex align-items-center justify-content-between mb-4 flex-wrap gap-2">
          <div>
            <h3 className="mb-0">Machines</h3>
            <p style={{ fontSize: 13, color: "#64748b", margin: "4px 0 0" }}>
              {machines.length} machines &nbsp;·&nbsp; {machines.filter(m => m.active).length} active
            </p>
          </div>
          <div className="d-flex gap-2 align-items-center">
            {/* View toggle */}
            <div className="d-flex" style={{ border: "1px solid #e2e8f0", borderRadius: 6, overflow: "hidden" }}>
              <button
                onClick={() => setActiveTab("grid")}
                style={{
                  padding: "6px 16px", fontSize: 12.5, fontWeight: 600, border: "none", cursor: "pointer",
                  background: activeTab === "grid" ? "#2563eb" : "#fff",
                  color: activeTab === "grid" ? "#fff" : "#64748b",
                  transition: "all 0.15s",
                }}>
                Grid
              </button>
              <button
                onClick={() => setActiveTab("list")}
                style={{
                  padding: "6px 16px", fontSize: 12.5, fontWeight: 600, border: "none", cursor: "pointer",
                  background: activeTab === "list" ? "#2563eb" : "#fff",
                  color: activeTab === "list" ? "#fff" : "#64748b",
                  transition: "all 0.15s",
                }}>
                List
              </button>
            </div>
            
          </div>
        </div>

        {/* GRID VIEW */}
        {activeTab === "grid" && (
          <div className="row g-3">
            {machines.map((m) => (
              <div className="col-lg-3 col-md-4 col-sm-6" key={m.id}>
                <div style={{
                  background: "#fff",
                  border: "1px solid #e2e8f0",
                  borderRadius: 12,
                  padding: "20px",
                  boxShadow: "0 1px 3px rgba(0,0,0,0.06), 0 4px 16px rgba(0,0,0,0.04)",
                  position: "relative",
                  overflow: "hidden",
                  transition: "all 0.2s",
                  height: "100%",
                }}
                  onMouseEnter={(e) => { e.currentTarget.style.transform = "translateY(-2px)"; e.currentTarget.style.boxShadow = "0 8px 24px rgba(37,99,235,0.1)"; }}
                  onMouseLeave={(e) => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "0 1px 3px rgba(0,0,0,0.06)"; }}
                >
                  {/* accent bar — blue if active, grey if inactive */}
                  <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 3, background: m.active ? "linear-gradient(90deg, #2563eb, #60a5fa)" : "linear-gradient(90deg, #cbd5e1, #e2e8f0)" }} />

                  <MachineAvatar name={m.name} />

                  <h5 style={{ fontWeight: 700, color: "#0f172a", fontSize: 14, marginBottom: 4, lineHeight: 1.3 }}>
                    {m.name}
                  </h5>
                  <p style={{ fontSize: 12, color: "#94a3b8", marginBottom: 14, lineHeight: 1.4 }}>
                    {m.dept}
                  </p>

                  <StatusPill active={m.active} />
                </div>
              </div>
            ))}
          </div>
        )}

        {/* LIST VIEW */}
        {activeTab === "list" && (
          <div className="card" style={{ padding: 0 }}>
            <div className="table-responsive">
              <table className="table table-bordered mb-0 align-middle">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Machine</th>
                    <th>Department</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {machines.map((m, idx) => (
                    <tr key={m.id}>
                      <td style={{ color: "#94a3b8", fontSize: 13, fontFamily: "monospace" }}>{idx + 1}</td>
                      <td>
                        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                          <div style={{
                            width: 30, height: 30, borderRadius: 7,
                            background: "linear-gradient(135deg, #2563eb, #1d4ed8)",
                            display: "flex", alignItems: "center", justifyContent: "center",
                            flexShrink: 0,
                          }}>
                            <span style={{ color: "#fff", fontWeight: 800, fontSize: 10 }}>
                              {m.name.split(/[\s\-\/]+/).slice(0, 2).map((w) => w[0]).join("").toUpperCase()}
                            </span>
                          </div>
                          <strong style={{ fontSize: 13.5 }}>{m.name}</strong>
                        </div>
                      </td>
                      <td style={{ fontSize: 13, color: "#64748b" }}>{m.dept}</td>
                      <td><StatusPill active={m.active} /></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}

export default Machines;
