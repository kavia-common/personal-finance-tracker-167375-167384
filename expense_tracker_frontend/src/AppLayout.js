import { NavLink, Outlet } from "react-router-dom";
import { theme } from "./theme";

function SidebarLink({ to, label, icon }) {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `sidebar-link ${isActive ? "active" : ""}`
      }
    >
      <span className="icon" aria-hidden="true">{icon}</span>
      <span>{label}</span>
    </NavLink>
  );
}

// PUBLIC_INTERFACE
export default function AppLayout() {
  return (
    <div className="app-shell">
      <aside className="sidebar" aria-label="Primary">
        <div className="brand">
          <div className="brand-mark">ET</div>
          <div className="brand-text">
            <strong>Expense</strong>
            <span>Tracker</span>
          </div>
        </div>
        <nav className="nav">
          <SidebarLink to="/" label="Dashboard" icon="📊" />
          <SidebarLink to="/expenses" label="Expenses" icon="➕" />
          <SidebarLink to="/transactions" label="Transactions" icon="📜" />
          <SidebarLink to="/reports" label="Reports" icon="📈" />
          <SidebarLink to="/categories" label="Categories" icon="🏷️" />
          <SidebarLink to="/settings" label="Settings" icon="⚙️" />
        </nav>
        <div className="sidebar-footer">
          <div className="tip">
            <span className="dot" />
            Ocean Professional
          </div>
        </div>
      </aside>
      <main className="content">
        <header className="page-header">
          <h1>Personal Finance</h1>
          <div className="header-actions">
            <button className="btn primary">Add Expense</button>
            <button className="btn ghost">Export</button>
          </div>
        </header>
        <section className="page-body">
          <Outlet />
        </section>
        <footer className="page-footer">
          <small style={{ color: theme.colors.textMuted }}>© {new Date().getFullYear()} Expense Tracker</small>
        </footer>
      </main>
    </div>
  );
}
