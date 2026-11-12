import { useEffect, useRef, useState } from "react";
import {
  Link,
  NavLink,
  Outlet,
  useLocation,
  useNavigate,
} from "react-router-dom";
import {
  Bell,
  ChevronDown,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  ExternalLink,
  LogOut,
  Menu,
  Monitor,
  Moon,
  Search,
  Settings,
  Sun,
  X,
  LockKeyhole,
  CheckCheck,
} from "lucide-react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { navigation, navItems } from "../navigation.js";
import { api, useSession, useRecords } from "../services/api.js";
import { useTheme } from "../components/Theme.jsx";
import { Logo, useToast } from "../components/UI.jsx";
export default function AdminLayout() {
  const session = useSession();
  const user = session.data.user;
  const { theme, setTheme } = useTheme();
  const location = useLocation();
  const navigate = useNavigate();
  const qc = useQueryClient();
  const toast = useToast();
  const [collapsed, setCollapsed] = useState(
    () => localStorage.getItem("aion-sidebar-collapsed") === "true",
  );
  const [mobile, setMobile] = useState(false);
  const [menu, setMenu] = useState(null);
  const [search, setSearch] = useState("");
  const [searchOpen, setSearchOpen] = useState(false);
  const [read, setRead] = useState(
    () => localStorage.getItem("aion-notifications-read") === "true",
  );
  const searchRef = useRef(null);
  const headerRef = useRef(null);
  const settingsQ = useQuery({
    queryKey: ["settings"],
    queryFn: () => api("/admin/settings"),
  });
  const notificationsEnabled = settingsQ.data?.notifications !== false;
  const variants = useRecords("variants"),
    preorders = useRecords("preorders");
  const low = variants.data?.filter((v) => v.stock <= v.threshold).length || 0;
  const pending =
    preorders.data?.filter((v) => v.status === "reserved").length || 0;
  useEffect(() => {
    setMobile(false);
    setMenu(null);
    setSearchOpen(false);
    document.title = `${navItems.find((i) => i.path === location.pathname)?.label || "Admin"} · JCRingforlife`;
  }, [location.pathname]);
  useEffect(() => {
    const handler = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key === "k") {
        e.preventDefault();
        searchRef.current?.focus();
        setSearchOpen(true);
      }
      if (e.key === "Escape") {
        searchRef.current?.blur();
        setMenu(null);
        setSearchOpen(false);
        setMobile(false);
      }
    };
    const outside = (e) => {
      if (!headerRef.current?.contains(e.target)) {
        setMenu(null);
        setSearchOpen(false);
      }
    };
    document.addEventListener("keydown", handler);
    document.addEventListener("mousedown", outside);
    return () => {
      document.removeEventListener("keydown", handler);
      document.removeEventListener("mousedown", outside);
    };
  }, []);
  useEffect(() => {
    if (!mobile) return;
    const old = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = old;
    };
  }, [mobile]);
  const changeCollapsed = () => {
    setCollapsed(!collapsed);
    localStorage.setItem("aion-sidebar-collapsed", String(!collapsed));
  };
  const lock = async () => {
    try {
      sessionStorage.setItem("aion-return", location.pathname);
      await api("/auth/lock", { method: "POST" });
      await qc.invalidateQueries({ queryKey: ["session"] });
      navigate("/lock-screen");
    } catch (e) {
      toast(e.message, "error");
    }
  };
  const menuItems = navItems.filter(
    (i) =>
      !(
        user.role !== "admin" &&
        ["Staff & Roles", "Audit Logs"].includes(i.label)
      ),
  );
  const results = menuItems.filter((i) =>
    i.label.toLowerCase().includes(search.toLowerCase()),
  );
  return (
    <div className={`ad-shell ${collapsed ? "ad-collapsed" : ""}`}>
      <a className="ad-skip-link" href="#admin-main">
        Skip to content
      </a>
      <header className="ad-topbar" ref={headerRef}>
        <div className="ad-brand-area">
          <button
            className="ad-icon-btn ad-mobile-toggle"
            aria-label={mobile ? "Close navigation" : "Open navigation"}
            aria-expanded={mobile}
            onClick={() => setMobile(!mobile)}
          >
            {mobile ? <X size={21} /> : <Menu size={21} />}
          </button>
          <Link to="/admin" aria-label="JCRingforlife dashboard">
            <Logo />
          </Link>
          <span className="ad-workspace-label">WORKSPACE</span>
        </div>
        <div className="ad-global-search">
          <Search size={16} />
          <input
            ref={searchRef}
            placeholder="Search your workspace…"
            aria-label="Search workspace"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setSearchOpen(true);
            }}
            onFocus={() => setSearchOpen(true)}
          />
          <kbd>⌘ K</kbd>
          {searchOpen && (
            <div className="ad-dropdown ad-search-results">
              <span className="ad-dropdown-label">QUICK NAVIGATION</span>
              {results.length ? (
                results.map((i) => (
                  <Link
                    to={i.path}
                    key={i.path}
                    onClick={() => {
                      setSearch("");
                      setSearchOpen(false);
                    }}
                  >
                    <i.icon size={16} />
                    {i.label}
                    <ChevronRight size={14} />
                  </Link>
                ))
              ) : (
                <p>No pages match “{search}”.</p>
              )}
            </div>
          )}
        </div>
        <div className="ad-topbar-actions">
          <button
            className="ad-icon-btn ad-mobile-search"
            aria-label="Open workspace search"
            onClick={() => {
              searchRef.current?.focus();
              setSearchOpen(true);
            }}
          >
            <Search size={19} />
          </button>
          <div className="ad-popover-wrap">
            <button
              className="ad-icon-btn ad-theme-toggle"
              aria-label="Choose theme"
              aria-expanded={menu === "theme"}
              onClick={() => setMenu(menu === "theme" ? null : "theme")}
            >
              {theme === "dark" ? (
                <Moon size={19} />
              ) : theme === "system" ? (
                <Monitor size={19} />
              ) : (
                <Sun size={19} />
              )}
            </button>
            {menu === "theme" && (
              <div className="ad-dropdown ad-small-menu">
                {["light", "dark", "system"].map((t, i) => {
                  const Icon = [Sun, Moon, Monitor][i];
                  return (
                    <button
                      className={theme === t ? "active" : ""}
                      key={t}
                      onClick={() => {
                        setTheme(t);
                        setMenu(null);
                      }}
                    >
                      <Icon size={16} />
                      {t[0].toUpperCase() + t.slice(1)}
                      {theme === t && <span>✓</span>}
                    </button>
                  );
                })}
              </div>
            )}
          </div>
          <div className="ad-popover-wrap">
            <button
              className="ad-icon-btn ad-notification-button"
              aria-label="Notifications"
              aria-expanded={menu === "notifications"}
              onClick={() =>
                setMenu(menu === "notifications" ? null : "notifications")
              }
            >
              <Bell size={20} />
              {notificationsEnabled && !read && low + pending > 0 && <i />}
            </button>
            {menu === "notifications" && (
              <div className="ad-dropdown ad-notifications">
                <div className="ad-dropdown-title">
                  <strong>Notifications</strong>
                  <button
                    className="ad-icon-btn"
                    aria-label="Mark notifications as read"
                    onClick={() => {
                      setRead(true);
                      localStorage.setItem("aion-notifications-read", "true");
                    }}
                  >
                    <CheckCheck size={18} />
                  </button>
                </div>
                <Link to="/admin/inventory">
                  <span className="ad-notification-icon amber">!</span>
                  <span>
                    <strong>{low} variants need attention</strong>
                    <small>Review stock levels and thresholds</small>
                  </span>
                </Link>
                <Link to="/admin/preorders">
                  <span className="ad-notification-icon blue">↗</span>
                  <span>
                    <strong>{pending} pre-orders to review</strong>
                    <small>Keep your founder community informed</small>
                  </span>
                </Link>
              </div>
            )}
          </div>
          <span className="ad-header-divider" />
          <div className="ad-popover-wrap">
            <button
              className="ad-profile-button"
              aria-label="Account menu"
              aria-expanded={menu === "profile"}
              onClick={() => setMenu(menu === "profile" ? null : "profile")}
            >
              <span className="ad-avatar">
                {user.name
                  .split(" ")
                  .map((n) => n[0])
                  .slice(0, 2)
                  .join("")}
              </span>
              <span className="ad-profile-name">
                {user.name}
                <small>{user.role}</small>
              </span>
              <ChevronDown size={13} />
            </button>
            {menu === "profile" && (
              <div className="ad-dropdown ad-profile-menu">
                <div className="ad-account-info">
                  <strong>{user.name}</strong>
                  <small>{user.email}</small>
                </div>
                <Link to="/admin/settings?tab=profile">
                  <Settings size={16} />
                  My profile
                </Link>
                <button onClick={lock}>
                  <LockKeyhole size={16} />
                  Lock screen
                </button>
                <Link to="/" target="_blank" rel="noopener noreferrer">
                  <ExternalLink size={16} />
                  Visit storefront
                </Link>
                <div className="ad-menu-divider" />
                <Link to="/logout">
                  <LogOut size={16} />
                  Sign out
                </Link>
              </div>
            )}
          </div>
        </div>
      </header>
      {mobile && (
        <button
          className="ad-nav-backdrop"
          aria-label="Close navigation"
          onClick={() => setMobile(false)}
        />
      )}
      <aside
        className={`ad-sidebar ${mobile ? "is-mobile-open" : ""}`}
        aria-label="Main navigation"
      >
        <div className="ad-sidebar-scroll">
          {navigation.map((group) => (
            <div className="ad-nav-group" key={group.label}>
              <div className="ad-nav-label">{group.label}</div>
              {group.items
                .filter(
                  (i) =>
                    !(
                      user.role !== "admin" &&
                      ["Staff & Roles", "Audit Logs"].includes(i.label)
                    ),
                )
                .map((item) => (
                  <NavLink
                    end={item.path === "/admin"}
                    to={item.path}
                    key={item.path}
                    title={collapsed ? item.label : undefined}
                    className={({ isActive }) =>
                      `ad-nav-item ${isActive ? "active" : ""}`
                    }
                  >
                    <item.icon size={17} />
                    <span>{item.label}</span>
                    {item.label === "Pre-Orders" && pending > 0 && (
                      <small>{pending}</small>
                    )}
                  </NavLink>
                ))}
            </div>
          ))}
          <div className="ad-store-link">
            <span className="ad-store-symbol">a</span>
            <div>
              <strong>JCRingforlife</strong>
              <small>Your wellness, connected.</small>
            </div>
            <Link to="/" aria-label="Open storefront">
              <ExternalLink size={15} />
            </Link>
          </div>
        </div>
        <button
          className="ad-collapse-button"
          onClick={changeCollapsed}
          aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
        >
          {collapsed ? <ChevronsRight size={17} /> : <ChevronsLeft size={17} />}
          <span>Collapsed View</span>
        </button>
      </aside>
      <div className="ad-main-wrap">
        <main id="admin-main" className="ad-main" tabIndex={-1}>
          {user.demo && (
            <div className="ad-demo-bar">
              <span className="ad-live-dot" />
              Development workspace{" "}
              <span>· Synthetic data · Local changes only</span>
              <Link to="/admin/settings?tab=integrations">
                Integration status
                <ChevronRight size={12} />
              </Link>
            </div>
          )}
          <Outlet />
        </main>
        <footer className="ad-footer">
          <span>
            Thoughtfully connected. <strong>JCRingforlife</strong> ©{" "}
            {new Date().getFullYear()}
          </span>
          <span>
            Admin workspace <i /> v1.0.0
          </span>
        </footer>
      </div>
    </div>
  );
}
