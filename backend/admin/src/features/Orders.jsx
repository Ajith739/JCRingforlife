import { useState } from "react";
import { Link, useLocation, useNavigate, useSearchParams, } from "react-router-dom";
import { ArrowLeft, Check, Clock3, CreditCard, MapPin, Plus, Save, Truck, UserRound, } from "lucide-react";
import { useQueryClient } from "@tanstack/react-query";
import { api, useRecords, money, date, exportCsv } from "../services/api.js";
import { Badge, Confirm, ErrorState, ExportButton, FormError, Loading, PageHeader, Panel, SearchField, useToast, } from "../components/UI.jsx";
import { DataTable } from "../components/Table.jsx";
import { RecordEditor } from "../components/RecordEditor.jsx";
import { orderTransitions, preorderTransitions } from "../../../shared/workflows.js";
import { images } from "../../../shared/types.js";
export default function Orders({ kind }) {
    const q = useRecords(kind), customerQ = useRecords("customers"), variantQ = useRecords("variants");
    const [params, setParams] = useSearchParams();
    const [search, setSearch] = useState(""), [payment, setPayment] = useState("all"), [create, setCreate] = useState(false);
    const toast = useToast(), navigate = useNavigate(), location = useLocation(), qc = useQueryClient();
    const rows = q.data || [], customers = customerQ.data || [], variants = variantQ.data || [];
    const status = params.get("status") || "all";
    const id = location.pathname.split("/")[3];
    const detail = rows.find((r) => r.id === id);
    const transitions = kind === "orders" ? orderTransitions : preorderTransitions;
    const title = kind === "orders" ? "Orders" : "Pre-orders";
    const filtered = rows.filter((r) => `${r.id} ${customers.find((c) => c.id === r.customerId)?.name || ""} ${r.items.map((i) => i.finish).join(" ")}`
        .toLowerCase()
        .includes(search.toLowerCase()) &&
        (status === "all" || r.status === status) &&
        (payment === "all" || r.paymentStatus === payment));
    const columns = [
        {
            key: "id",
            label: "Order",
            render: (r) => <strong className="ad-link">#{r.id}</strong>,
        },
        {
            key: "customerId",
            label: "Customer",
            value: (r) => customers.find((c) => c.id === r.customerId)?.name,
            render: (r) => (<span>
          <strong>
            {customers.find((c) => c.id === r.customerId)?.name || "Customer"}
          </strong>
          <small className="ad-cell-sub">
            {customers.find((c) => c.id === r.customerId)?.country}
          </small>
        </span>),
        },
        {
            key: "total",
            label: "Total",
            render: (r) => <strong>{money(r.total)}</strong>,
        },
        {
            key: "paymentStatus",
            label: "Payment",
            render: (r) => <Badge status={r.paymentStatus}/>,
        },
        {
            key: "status",
            label: kind === "orders" ? "Fulfillment" : "Pre-order status",
            render: (r) => <Badge status={r.status}/>,
        },
        {
            key: "items",
            label: "Ring",
            render: (r) => (<span>
          {r.items[0]?.finish}
          <small className="ad-cell-sub">
            Size {r.items[0]?.size} ·{" "}
            {r.items.reduce((s, i) => s + i.quantity, 0)} unit(s)
          </small>
        </span>),
        },
        { key: "createdAt", label: "Date", render: (r) => date(r.createdAt) },
    ];
    const fields = [
        {
            key: "customerId",
            label: "Customer",
            required: true,
            options: customers.map((c) => ({ value: c.id, label: c.name })),
        },
        {
            key: "variantId",
            label: "Ring variant",
            required: true,
            options: variants
                .filter((v) => v.status === "available")
                .map((v) => ({
                value: v.id,
                label: `${v.finish} · Size ${v.size} (${v.sku})`,
            })),
        },
        {
            key: "quantity",
            label: "Quantity",
            type: "number",
            min: 1,
            max: 1000,
            default: 1,
            required: true,
        },
        {
            key: "notes",
            label: "Internal note",
            type: "textarea",
            wide: true,
            hint: "This creates an unpaid manual record. No payment is collected.",
        },
    ];
    if (q.isLoading)
        return <Loading />;
    if (q.error)
        return <ErrorState error={q.error} retry={() => q.refetch()}/>;
    if (id && !detail)
        return (<ErrorState error={new Error("This order does not exist. Return to the order list.")} retry={() => navigate(`/admin/${kind}`)}/>);
    if (detail)
        return (<OrderDetail key={detail.id} kind={kind} order={detail} customer={customers.find((c) => c.id === detail.customerId)}/>);
    return (<>
      <PageHeader title={title} subtitle={kind === "orders"
            ? "Every order, thoughtfully managed."
            : "Care for your founder community, from reservation to delivery."} actions={<>
            <ExportButton onClick={() => {
                if (!exportCsv(kind, filtered))
                    toast("No orders to export", "error");
            }}/>
            <button className="ad-btn ad-primary" onClick={() => setCreate(true)}>
              <Plus size={16}/>
              Create {kind === "orders" ? "order" : "pre-order"}
            </button>
          </>}/>
      <div className="ad-tabs">
        {["all", ...Object.keys(transitions)].map((s) => (<button key={s} className={s === status ? "active" : ""} onClick={() => setParams(s === "all" ? {} : { status: s })}>
            {s[0].toUpperCase() + s.slice(1)}
            <span>
              {s === "all"
                ? rows.length
                : rows.filter((r) => r.status === s).length}
            </span>
          </button>))}
      </div>
      <div className="ad-toolbar">
        <SearchField value={search} onChange={setSearch} placeholder="Search order or customer…"/>
        <select aria-label="Payment status" value={payment} onChange={(e) => setPayment(e.target.value)}>
          <option value="all">All payment statuses</option>
          <option value="paid">Paid</option>
          <option value="pending">Pending</option>
          <option value="refunded">Refunded</option>
        </select>
        <span className="ad-toolbar-count">{filtered.length} records</span>
      </div>
      <Panel>
        <DataTable rows={filtered} columns={columns} onRow={(r) => navigate(`/admin/${kind}/${r.id}`)}/>
      </Panel>
      {create && (<RecordEditor title={`Create manual ${kind === "orders" ? "order" : "pre-order"}`} fields={fields} onClose={() => setCreate(false)} onSave={async (data) => {
                const result = await api("/admin/orders/create", {
                    method: "POST",
                    body: JSON.stringify({ ...data, kind }),
                });
                await qc.invalidateQueries({ queryKey: ["records"] });
                toast("Manual record created. Payment remains pending.");
                navigate(`/admin/${kind}/${result.id}`);
            }}/>)}
    </>);
}
function OrderDetail({ kind, order, customer, }) {
    const [notes, setNotes] = useState(order.notes || ""), [tracking, setTracking] = useState(order.shipping?.tracking || ""), [next, setNext] = useState(""), [confirm, setConfirm] = useState(null), [saving, setSaving] = useState(false), [error, setError] = useState("");
    const toast = useToast(), qc = useQueryClient();
    const choices = (kind === "orders" ? orderTransitions : preorderTransitions)[order.status] || [];
    const action = async (body) => {
        setSaving(true);
        setError("");
        try {
            await api(`/admin/orders/${kind}/${order.id}/action`, {
                method: "POST",
                body: JSON.stringify(body),
            });
            await qc.invalidateQueries({ queryKey: ["records"] });
            toast("Order updated");
            setConfirm(null);
            setNext("");
        }
        catch (e) {
            setError(e.message);
            toast(e.message, "error");
        }
        finally {
            setSaving(false);
        }
    };
    return (<>
      <Link className="ad-link ad-inline" to={`/admin/${kind}`}>
        <ArrowLeft size={15}/>
        Back to {kind === "orders" ? "orders" : "pre-orders"}
      </Link>
      <PageHeader title={`#${order.id}`} subtitle={`Placed ${date(order.createdAt)} · ${kind === "orders" ? "Order" : "Pre-order"} details`} actions={<>
            <Badge status={order.paymentStatus}/>
            <Badge status={order.status}/>
          </>}/>
      <FormError error={error}/>
      <div className="ad-detail-grid">
        <div>
          <Panel title="Order items" actions={<span className="ad-muted">{order.items.length} item(s)</span>}>
            <div className="ad-order-items">
              {order.items.map((item, i) => (<div key={i}>
                  <div className="ad-product-thumb">
                    <img src={images[item.finish]} alt=""/>
                  </div>
                  <span>
                    <strong>{item.name}</strong>
                    <small>
                      {item.finish} · Size {item.size}
                    </small>
                  </span>
                  <span>
                    {money(item.price)} × {item.quantity}
                  </span>
                  <strong>{money(item.price * item.quantity)}</strong>
                </div>))}
            </div>
            <div className="ad-order-totals">
              <span>Order total</span>
              <strong>{money(order.total)}</strong>
            </div>
          </Panel>
          <Panel title="Status & fulfillment" subtitle="Only valid next steps are available.">
            <div className="ad-order-controls">
              <div className="ad-status-line">
                <Badge status={order.status}/>
                <span>→</span>
                {choices.length ? (<>
                    <select aria-label="Next order status" value={next} onChange={(e) => setNext(e.target.value)}>
                      <option value="">Select next status</option>
                      {choices.map((s) => (<option key={s} value={s}>
                          {s[0].toUpperCase() + s.slice(1)}
                        </option>))}
                    </select>
                    <button className="ad-btn ad-primary" disabled={!next || saving} onClick={() => setConfirm(next)}>
                      <Check size={15}/>
                      Update status
                    </button>
                  </>) : (<span className="ad-muted">This record is complete.</span>)}
              </div>
              {kind === "preorders" && (<p className="ad-help-text">
                  Pre-order progress is separate from fulfillment. Converting a
                  confirmed reservation creates a linked order.
                </p>)}
              <form className="ad-form ad-tracking-form" onSubmit={(e) => {
            e.preventDefault();
            action({ action: "shipping", tracking });
        }}>
                <label>
                  <span>
                    <Truck size={14}/> Shipment tracking
                  </span>
                  <input value={tracking} maxLength={200} onChange={(e) => setTracking(e.target.value)} placeholder="Tracking number or reference"/>
                </label>
                <button className="ad-btn" disabled={saving}>
                  <Save size={15}/>
                  Save tracking
                </button>
              </form>
              {order.convertedOrderId && (<Link className="ad-link" to={`/admin/orders/${order.convertedOrderId}`}>
                  View fulfillment order →
                </Link>)}
            </div>
          </Panel>
          <Panel title="Order timeline">
            <ol className="ad-timeline">
              {[...(order.timeline || [])]
            .reverse()
            .map((t, i) => (<li key={i}>
                    <span>
                      <Clock3 size={14}/>
                    </span>
                    <div>
                      <strong>{t.text}</strong>
                      <p>
                        {t.actor} · {date(t.at)}
                      </p>
                    </div>
                  </li>))}
            </ol>
          </Panel>
        </div>
        <div>
          <Panel title="Customer" actions={<UserRound size={17}/>}>
            <div className="ad-customer-info">
              <Link className="ad-link" to={`/admin/customers/${customer?.id}`}>
                {customer?.name || "Customer"}
              </Link>
              <p>{customer?.email || "No email on file"}</p>
              <p>{customer?.phone || "No phone on file"}</p>
            </div>
          </Panel>
          <Panel title="Shipping address" actions={<MapPin size={17}/>}>
            <div className="ad-customer-info">
              <strong>{customer?.name}</strong>
              <p>{order.shipping?.address || "Address not provided"}</p>
              <p>
                {order.shipping?.city} {order.shipping?.country}
              </p>
            </div>
          </Panel>
          <Panel title="Internal notes">
            <form className="ad-form ad-padded" onSubmit={(e) => {
            e.preventDefault();
            action({ action: "notes", notes });
        }}>
              <textarea aria-label="Order notes" rows={5} maxLength={5000} value={notes} onChange={(e) => setNotes(e.target.value)} placeholder="Add a note for your team…"/>
              <button className="ad-btn" disabled={saving}>
                <Save size={15}/>
                Save note
              </button>
            </form>
          </Panel>
          <Panel title="Payment" actions={<CreditCard size={17}/>}>
            <div className="ad-customer-info">
              <Badge status={order.paymentStatus}/>
              <p>
                Provider connection required for refunds. No transaction is
                executed from this workspace.
              </p>
              <button className="ad-btn" onClick={() => setConfirm("refund")}>
                Request refund
              </button>
            </div>
          </Panel>
        </div>
      </div>
      {confirm && (<Confirm title={confirm === "refund"
                ? "Request a refund?"
                : `Change status to ${confirm}?`} message={confirm === "refund"
                ? "The server will check the payment provider connection. Without a connected provider, no refund can be issued."
                : confirm === "converted"
                    ? "This creates a linked fulfillment order. The reservation is retained."
                    : confirm === "shipped"
                        ? "This deducts the purchased units from variant inventory and records a stock movement."
                        : "This change is recorded in the order timeline and audit log."} danger={confirm === "cancelled"} pending={saving} onClose={() => setConfirm(null)} onConfirm={() => action(confirm === "refund"
                ? { action: "refund" }
                : { action: "transition", status: confirm })}/>)}
    </>);
}
