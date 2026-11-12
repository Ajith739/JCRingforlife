import {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
  type ReactNode,
  type FormEvent,
} from "react";
import { createPortal } from "react-dom";
import {
  AlertCircle,
  ArrowLeft,
  Check,
  ChevronRight,
  Download,
  Inbox,
  Loader2,
  Search,
  X,
} from "lucide-react";
import { Link } from "react-router-dom";
import { ApiError } from "../services/api";
export function Logo({ compact = false }: { compact?: boolean }) {
  return (
    <span className="ad-logo">
      <span className="ad-logo-mark" aria-hidden="true">
        <i />
        <i />
      </span>
      {!compact && (
        <span>
          ai<span className="ad-logo-on">On</span>
          <small>RINGS ADMIN</small>
        </span>
      )}
    </span>
  );
}
export function Badge({
  children,
  status,
}: {
  children?: ReactNode;
  status: string;
}) {
  const color = [
    "active",
    "paid",
    "delivered",
    "confirmed",
    "published",
    "available",
    "resolved",
    "closed",
    "recorded",
  ].includes(status)
    ? "green"
    : [
          "cancelled",
          "inactive",
          "unavailable",
          "rejected",
          "out of stock",
          "high",
        ].includes(status)
      ? "red"
      : [
            "pending",
            "reserved",
            "sizing",
            "requested",
            "low stock",
            "draft",
            "open",
          ].includes(status)
        ? "amber"
        : "blue";
  return (
    <span className={`ad-badge ${color}`}>
      <span />
      {children || status.replaceAll("_", " ")}
    </span>
  );
}
export function PageHeader({
  title,
  subtitle,
  actions,
}: {
  title: string;
  subtitle?: string;
  actions?: ReactNode;
}) {
  return (
    <>
      <nav className="ad-breadcrumb" aria-label="Breadcrumb">
        <Link to="/admin">Dashboard</Link>
        <ChevronRight size={12} />
        <span>{title}</span>
      </nav>
      <div className="ad-page-heading">
        <div>
          <h1>{title}</h1>
          {subtitle && <p>{subtitle}</p>}
        </div>
        {actions && <div className="ad-actions">{actions}</div>}
      </div>
    </>
  );
}
export function Panel({
  title,
  subtitle,
  actions,
  children,
  className = "",
}: {
  title?: string;
  subtitle?: string;
  actions?: ReactNode;
  children: ReactNode;
  className?: string;
}) {
  return (
    <section className={`ad-panel ${className}`}>
      {title && (
        <div className="ad-panel-head">
          <div>
            <h2>{title}</h2>
            {subtitle && <p>{subtitle}</p>}
          </div>
          {actions}
        </div>
      )}
      {children}
    </section>
  );
}
export function Loading() {
  return (
    <div className="ad-loading" aria-label="Loading" role="status">
      <div className="ad-skeleton" />
      <div className="ad-skeleton" />
      <div className="ad-skeleton" />
      <span>
        <Loader2 size={16} className="ad-spin" /> Loading your workspace…
      </span>
    </div>
  );
}
export function Empty({
  title = "No records yet",
  message = "Records will appear here when you add them.",
  action,
}: {
  title?: string;
  message?: string;
  action?: ReactNode;
}) {
  return (
    <div className="ad-empty">
      <div>
        <Inbox size={27} />
      </div>
      <h3>{title}</h3>
      <p>{message}</p>
      {action}
    </div>
  );
}
export function ErrorState({
  error,
  retry,
}: {
  error: Error;
  retry?: () => void;
}) {
  return (
    <div className="ad-error-state">
      <AlertCircle size={28} />
      <h3>
        {error instanceof ApiError && error.status === 403
          ? "Access restricted"
          : "We couldn’t load this page"}
      </h3>
      <p>{error.message}</p>
      {retry && (
        <button className="ad-btn" onClick={retry}>
          Try again
        </button>
      )}
      <Link to="/admin" className="ad-link">
        Back to dashboard
      </Link>
    </div>
  );
}
const ToastContext = createContext<
  (message: string, tone?: "success" | "error") => void
>(() => {});
export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<
    { id: number; message: string; tone: string }[]
  >([]);
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);
  useEffect(() => () => timers.current.forEach(clearTimeout), []);
  const toast = (message: string, tone = "success") => {
    const id = Date.now() + Math.random();
    setToasts((t) => [...t, { id, message, tone }]);
    timers.current.push(
      setTimeout(() => setToasts((t) => t.filter((x) => x.id !== id)), 6000),
    );
  };
  return (
    <ToastContext.Provider value={toast}>
      {children}
      <div className="ad-toasts" aria-live="polite">
        {toasts.map((t) => (
          <div key={t.id} className={`ad-toast ${t.tone}`}>
            {t.tone === "success" ? (
              <Check size={17} />
            ) : (
              <AlertCircle size={17} />
            )}
            <span>{t.message}</span>
            <button
              aria-label="Dismiss notification"
              onClick={() => setToasts((v) => v.filter((x) => x.id !== t.id))}
            >
              <X size={15} />
            </button>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
}
export const useToast = () => useContext(ToastContext);
export function Modal({
  title,
  children,
  onClose,
  wide = false,
}: {
  title: string;
  children: ReactNode;
  onClose: () => void;
  wide?: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const closeRef = useRef(onClose);
  closeRef.current = onClose;
  useEffect(() => {
    const previous = document.activeElement as HTMLElement;
    const old = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const modal = ref.current;
    const controls = () =>
      Array.from(
        modal?.querySelectorAll<HTMLElement>(
          'button:not([disabled]),input,select,textarea,a[href],[tabindex="0"]',
        ) || [],
      );
    controls()[0]?.focus();
    const listener = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeRef.current();
      if (e.key === "Tab") {
        const items = controls(),
          first = items[0],
          last = items.at(-1);
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last?.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first?.focus();
        }
      }
    };
    document.addEventListener("keydown", listener);
    return () => {
      document.removeEventListener("keydown", listener);
      document.body.style.overflow = old;
      previous?.focus();
    };
  }, []);
  return createPortal(
    <div
      className="aion-admin ad-portal"
      data-theme={
        document.querySelector(".aion-admin")?.getAttribute("data-theme") ||
        "light"
      }
    >
      <div
        className="ad-modal-backdrop"
        onMouseDown={(e) => {
          if (e.target === e.currentTarget) onClose();
        }}
      >
        <div
          ref={ref}
          role="dialog"
          aria-modal="true"
          aria-label={title}
          className={`ad-modal ${wide ? "wide" : ""}`}
        >
          <div className="ad-modal-heading">
            <h2>{title}</h2>
            <button
              className="ad-icon-btn"
              aria-label="Close dialog"
              onClick={onClose}
            >
              <X size={20} />
            </button>
          </div>
          {children}
        </div>
      </div>
    </div>,
    document.body,
  );
}
export function Confirm({
  title,
  message,
  onConfirm,
  onClose,
  danger = false,
  pending = false,
}: {
  title: string;
  message: string;
  onConfirm: () => void;
  onClose: () => void;
  danger?: boolean;
  pending?: boolean;
}) {
  return (
    <Modal title={title} onClose={onClose}>
      <p className="ad-confirm-message">{message}</p>
      <div className="ad-modal-actions">
        <button className="ad-btn" onClick={onClose} disabled={pending}>
          Cancel
        </button>
        <button
          className={`ad-btn ${danger ? "ad-danger" : "ad-primary"}`}
          onClick={onConfirm}
          disabled={pending}
        >
          {pending ? (
            <Loader2 size={15} className="ad-spin" />
          ) : (
            <Check size={15} />
          )}{" "}
          Confirm
        </button>
      </div>
    </Modal>
  );
}
export function SearchField({
  value,
  onChange,
  placeholder = "Search records…",
}: {
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
}) {
  return (
    <div className="ad-search">
      <Search size={16} />
      <input
        aria-label={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
      />
      {value && (
        <button aria-label="Clear search" onClick={() => onChange("")}>
          <X size={14} />
        </button>
      )}
    </div>
  );
}
export function ExportButton({ onClick }: { onClick: () => void }) {
  return (
    <button className="ad-btn ad-ghost" onClick={onClick}>
      <Download size={15} /> Export
    </button>
  );
}
export function BackLink({
  to = "/admin",
  children = "Back to dashboard",
}: {
  to?: string;
  children?: ReactNode;
}) {
  return (
    <Link className="ad-link ad-inline" to={to}>
      <ArrowLeft size={15} />
      {children}
    </Link>
  );
}
export function FormError({ error }: { error?: string | null }) {
  return error ? (
    <div role="alert" className="ad-form-error">
      <AlertCircle size={16} />
      {error}
    </div>
  ) : null;
}
export function SubmitButton({
  pending,
  label = "Save changes",
}: {
  pending: boolean;
  label?: string;
}) {
  return (
    <button className="ad-btn ad-primary" type="submit" disabled={pending}>
      {pending ? (
        <Loader2 className="ad-spin" size={16} />
      ) : (
        <Check size={16} />
      )}{" "}
      {pending ? "Saving…" : label}
    </button>
  );
}
export function Form({
  onSubmit,
  children,
  className = "",
}: {
  onSubmit: (e: FormEvent) => void;
  children: ReactNode;
  className?: string;
}) {
  return (
    <form className={`ad-form ${className}`} onSubmit={onSubmit}>
      {children}
    </form>
  );
}
