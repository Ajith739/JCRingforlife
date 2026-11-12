import { useState } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { Bell, Building2, CreditCard, ExternalLink, LockKeyhole, Mail, ShieldCheck, Truck, UserRound, } from "lucide-react";
import { api, useSession } from "../services/api.js";
import { Badge, ErrorState, FormError, Loading, PageHeader, Panel, SubmitButton, useToast, } from "../components/UI.jsx";
export default function Settings() {
    const [params, setParams] = useSearchParams(), session = useSession();
    const q = useQuery({
        queryKey: ["settings"],
        queryFn: () => api("/admin/settings"),
    });
    const tabs = [
        { id: "store", label: "Store details", icon: Building2 },
        { id: "profile", label: "My profile", icon: UserRound },
        { id: "notifications", label: "Notifications", icon: Bell },
        { id: "shipping", label: "Shipping", icon: Truck },
        { id: "integrations", label: "Integrations", icon: CreditCard },
        { id: "security", label: "Security", icon: LockKeyhole },
    ];
    const tab = tabs.some((t) => t.id === params.get("tab"))
        ? params.get("tab")
        : "store";
    if (q.isLoading)
        return <Loading />;
    if (q.error || !q.data)
        return (<ErrorState error={q.error || new Error("Settings unavailable")} retry={() => q.refetch()}/>);
    return (<>
      <PageHeader title="Settings" subtitle="A workspace that works the way you do."/>
      <div className="ad-settings-layout">
        <nav className="ad-settings-nav" aria-label="Settings sections">
          {tabs.map((t) => (<button key={t.id} className={tab === t.id ? "active" : ""} onClick={() => setParams({ tab: t.id })}>
              <t.icon size={17}/>
              {t.label}
            </button>))}
          {session.data?.user?.role === "admin" && (<Link to="/admin/staff">
              <ShieldCheck size={17}/>
              Staff & permissions
              <ExternalLink size={13}/>
            </Link>)}
        </nav>
        <div>
          {tab === "integrations" ? (<Panel title="Connected services" subtitle="Credentials belong on the server, never in browser code.">
              <div className="ad-integration-list">
                {[
                {
                    name: "Payments & refunds",
                    text: "No provider adapter is configured. Live payment capture and refunds are disabled.",
                    icon: CreditCard,
                    connected: false,
                },
                {
                    name: "Transactional email",
                    text: "Configure EMAIL_WEBHOOK_URL and EMAIL_WEBHOOK_TOKEN in the server environment for reset and invitation emails.",
                    icon: Mail,
                    connected: !!session.data?.integrations.email,
                },
                {
                    name: "Shipping & labels",
                    text: "Manual shipment tracking is available. Carrier labels and tracking updates need a carrier integration.",
                    icon: Truck,
                    connected: false,
                },
                {
                    name: "Storefront data",
                    text: "The existing storefront uses static catalog data and simulated checkout. Wire its purchase and content flows to the admin API before live use.",
                    icon: Building2,
                    connected: false,
                },
            ].map((i) => (<div key={i.name}>
                    <span className="ad-integration-icon">
                      <i.icon size={22}/>
                    </span>
                    <div>
                      <strong>{i.name}</strong>
                      <p>{i.text}</p>
                    </div>
                    <Badge status={i.connected ? "active" : "pending"}>
                      {i.connected ? "Configured" : "Not connected"}
                    </Badge>
                  </div>))}
              </div>
            </Panel>) : (<SettingsForm key={tab} tab={tab} settings={q.data}/>)}
        </div>
      </div>
    </>);
}
function SettingsForm({ tab, settings, }) {
    const session = useSession(), qc = useQueryClient(), toast = useToast();
    const [values, setValues] = useState(settings), [name, setName] = useState(session.data?.user?.name || ""), [password, setPassword] = useState({
        current: "",
        password: "",
        confirm: "",
    }), [pending, setPending] = useState(false), [error, setError] = useState("");
    const update = (key, value) => setValues({ ...values, [key]: value });
    const disabled = session.data?.user?.role !== "admin" &&
        ["store", "shipping", "notifications"].includes(tab);
    return (<Panel title={{
            store: "Store details",
            profile: "Your profile",
            notifications: "Notification preferences",
            shipping: "Shipping settings",
            security: "Account security",
        }[tab]} subtitle={disabled ? "Only administrators can edit store settings." : undefined}>
      <form className="ad-form ad-settings-form" onSubmit={async (e) => {
            e.preventDefault();
            setError("");
            setPending(true);
            try {
                if (tab === "security") {
                    if (password.password !== password.confirm)
                        throw new Error("Passwords do not match");
                    await api("/auth/change-password", {
                        method: "POST",
                        body: JSON.stringify(password),
                    });
                    setPassword({ current: "", password: "", confirm: "" });
                }
                else if (tab === "profile") {
                    await api("/admin/profile", {
                        method: "PUT",
                        body: JSON.stringify({ name }),
                    });
                    await qc.invalidateQueries({ queryKey: ["session"] });
                }
                else {
                    await api("/admin/settings", {
                        method: "PUT",
                        body: JSON.stringify(values),
                    });
                    await qc.invalidateQueries({ queryKey: ["settings"] });
                }
                toast("Settings saved");
            }
            catch (e) {
                setError(e.message);
            }
            finally {
                setPending(false);
            }
        }}>
        {tab === "store" && (<div className="ad-form-grid">
            <label>
              <span>Store name</span>
              <input required value={values.storeName} disabled={disabled} onChange={(e) => update("storeName", e.target.value)}/>
            </label>
            <label>
              <span>Store contact email</span>
              <input type="email" value={values.email} disabled={disabled} onChange={(e) => update("email", e.target.value)}/>
            </label>
            <label>
              <span>Reporting currency</span>
              <select value={values.currency} disabled={disabled} onChange={(e) => update("currency", e.target.value)}>
                {["USD", "INR", "EUR", "GBP"].map((c) => (<option key={c}>{c}</option>))}
              </select>
              <small>
                Catalog and order prices currently use USD. This preference does
                not convert stored prices.
              </small>
            </label>
            <label>
              <span>Default low-stock threshold</span>
              <input type="number" min={0} value={values.lowStockThreshold} disabled={disabled} onChange={(e) => update("lowStockThreshold", Number(e.target.value))}/>
              <small>
                Existing variants keep their own configured thresholds.
              </small>
            </label>
          </div>)}
        {tab === "profile" && (<>
            <div className="ad-profile-preview">
              <span className="ad-avatar large">
                {name
                .split(" ")
                .map((n) => n[0])
                .slice(0, 2)
                .join("")}
              </span>
              <div>
                <strong>{name}</strong>
                <p>{session.data?.user?.role}</p>
              </div>
            </div>
            <label>
              <span>Display name</span>
              <input value={name} required maxLength={100} onChange={(e) => setName(e.target.value)}/>
            </label>
            <label>
              <span>Email address</span>
              <input value={session.data?.user?.email} readOnly/>
              <small>
                Contact your administrator to change your sign-in email.
              </small>
            </label>
          </>)}
        {tab === "notifications" && (<>
            <label className="ad-toggle-row">
              <span>
                <strong>Workspace notifications</strong>
                <small>
                  Show inventory and pre-order alerts in your workspace.
                </small>
              </span>
              <input type="checkbox" checked={values.notifications} disabled={disabled} onChange={(e) => update("notifications", e.target.checked)}/>
            </label>
            <div className="ad-info-banner">
              <Bell size={18}/>
              <p>
                These preferences control workspace alerts. Email notifications
                require a configured email service.
              </p>
            </div>
          </>)}
        {tab === "shipping" && (<>
            <label>
              <span>Shipping origin</span>
              <textarea rows={3} value={values.shippingOrigin || ""} disabled={disabled} onChange={(e) => update("shippingOrigin", e.target.value)}/>
            </label>
            <label>
              <span>Default shipping rate (USD)</span>
              <input type="number" min={0} step="0.01" value={values.shippingRate} disabled={disabled} onChange={(e) => update("shippingRate", Number(e.target.value))}/>
              <small>
                Stored as a preference. Connect the checkout before applying
                this rate to new purchases.
              </small>
            </label>
          </>)}
        {tab === "security" && (<>
            <div className="ad-info-banner">
              <ShieldCheck size={18}/>
              <p>
                Use at least 12 characters with uppercase and lowercase letters
                and a number. Updating your password signs out other sessions.
              </p>
            </div>
            <label>
              <span>Current password</span>
              <input type="password" required autoComplete="current-password" value={password.current} onChange={(e) => setPassword({ ...password, current: e.target.value })}/>
            </label>
            <label>
              <span>New password</span>
              <input type="password" required minLength={12} maxLength={200} autoComplete="new-password" value={password.password} onChange={(e) => setPassword({ ...password, password: e.target.value })}/>
            </label>
            <label>
              <span>Confirm new password</span>
              <input type="password" required minLength={12} autoComplete="new-password" value={password.confirm} onChange={(e) => setPassword({ ...password, confirm: e.target.value })}/>
            </label>
          </>)}
        <FormError error={error}/>
        <div className="ad-form-footer">
          {!disabled && (<SubmitButton pending={pending} label={tab === "security" ? "Update password" : "Save changes"}/>)}
        </div>
      </form>
    </Panel>);
}
