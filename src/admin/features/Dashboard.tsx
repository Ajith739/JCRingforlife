import { useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  ArrowRight,
  ArrowUpRight,
  Box,
  CalendarClock,
  CircleDollarSign,
  Clock3,
  Package,
  RotateCcw,
  ShoppingBag,
  Sparkles,
  Users,
  TriangleAlert,
  Download,
} from "lucide-react";
import { useRecords, money, date, exportCsv } from "../services/api";
import {
  Badge,
  Empty,
  ErrorState,
  Loading,
  PageHeader,
  Panel,
  useToast,
} from "../components/UI";
import { DataTable, type Column } from "../components/Table";
import { DateFilter, initialRange, inRange } from "../components/DateFilter";
import { SalesChart, Donut } from "../components/Charts";
import { images } from "../types";
import { dailyData } from "../analytics";
export default function Dashboard() {
  const [range, setRange] = useState(initialRange);
  const navigate = useNavigate(),
    toast = useToast();
  const orderQ = useRecords("orders"),
    preQ = useRecords("preorders"),
    customerQ = useRecords("customers"),
    variantQ = useRecords("variants"),
    returnsQ = useRecords("returns"),
    auditQ = useRecords("audit");
  const orders = (orderQ.data || [])
      .filter((o) => inRange(o.createdAt, range))
      .sort((a, b) => Date.parse(b.createdAt) - Date.parse(a.createdAt)),
    preorders = (preQ.data || []).filter((o) => inRange(o.createdAt, range));
  const customers = customerQ.data || [],
    variants = variantQ.data || [];
  const revenue = orders
      .filter((o) => o.paymentStatus === "paid")
      .reduce((sum, o) => sum + o.total, 0),
    low = variants.filter((v) => v.stock <= v.threshold);
  const trend = useMemo(() => dailyData(orders, range), [orderQ.data, range]);
  const statusData = [
    "pending",
    "confirmed",
    "processing",
    "shipped",
    "delivered",
  ]
    .map((name) => ({
      name,
      value: orders.filter((o) => o.status === name).length,
    }))
    .filter((d) => d.value);
  const finishData = Object.keys(images)
    .map((finish) => ({
      finish,
      quantity: orders
        .filter((o) => o.status !== "cancelled")
        .flatMap((o) => o.items)
        .filter((i) => i.finish === finish)
        .reduce((s, i) => s + i.quantity, 0),
    }))
    .sort((a, b) => b.quantity - a.quantity);
  const columns: Column[] = [
    {
      key: "id",
      label: "Order",
      render: (r) => <span className="ad-order-id">#{r.id}</span>,
    },
    {
      key: "customerId",
      label: "Customer",
      value: (r) => customers.find((c) => c.id === r.customerId)?.name,
      render: (r) => {
        const c = customers.find((c) => c.id === r.customerId);
        return (
          <span className="ad-customer-cell">
            <span className="ad-mini-avatar">
              {c?.name
                .split(" ")
                .map((s: string) => s[0])
                .join("")}
            </span>
            {c?.name || "Customer"}
          </span>
        );
      },
    },
    {
      key: "items",
      label: "Finish / Size",
      render: (r) => (
        <span>
          {r.items[0]?.finish}
          <small className="ad-cell-sub">Size {r.items[0]?.size}</small>
        </span>
      ),
    },
    {
      key: "total",
      label: "Amount",
      render: (r) => <strong>{money(r.total)}</strong>,
    },
    {
      key: "status",
      label: "Fulfillment",
      render: (r) => <Badge status={r.status} />,
    },
    { key: "createdAt", label: "Date", render: (r) => date(r.createdAt) },
  ];
  if (orderQ.isLoading || variantQ.isLoading) return <Loading />;
  if (orderQ.error)
    return <ErrorState error={orderQ.error} retry={() => orderQ.refetch()} />;
  return (
    <>
      <PageHeader
        title="Ecommerce overview"
        subtitle="Here’s what’s happening with your rings today."
        actions={
          <>
            <button
              className="ad-btn"
              onClick={() => {
                if (!exportCsv("overview", orders))
                  toast("No orders in this date range", "error");
              }}
            >
              <Download size={15} />
              Export report
            </button>
            <DateFilter value={range} onChange={setRange} />
          </>
        }
      />
      <div className="ad-attention-row">
        <Link to="/admin/orders?status=pending">
          <span className="ad-alert-icon green">
            <ShoppingBag size={21} />
          </span>
          <span>
            <strong>
              {orders.filter((o) => o.status === "pending").length} pending
              orders
            </strong>
            <small>Ready for your attention</small>
          </span>
          <ArrowRight size={16} />
        </Link>
        <Link to="/admin/preorders">
          <span className="ad-alert-icon blue">
            <CalendarClock size={21} />
          </span>
          <span>
            <strong>{preorders.length} pre-orders</strong>
            <small>Your growing founder community</small>
          </span>
          <ArrowRight size={16} />
        </Link>
        <Link to="/admin/inventory?status=low">
          <span className="ad-alert-icon amber">
            <TriangleAlert size={21} />
          </span>
          <span>
            <strong>{low.length} low-stock variants</strong>
            <small>Keep your best sellers available</small>
          </span>
          <ArrowRight size={16} />
        </Link>
      </div>
      <div className="ad-kpi-grid">
        {[
          {
            label: "Total revenue",
            value: money(revenue),
            icon: CircleDollarSign,
            path: "/admin/reports/sales",
            note: "Paid orders in selected period",
            color: "blue",
          },
          {
            label: "Total orders",
            value: orders.length,
            icon: ShoppingBag,
            path: "/admin/orders",
            note: "Across all order statuses",
            color: "violet",
          },
          {
            label: "Total customers",
            value: customers.length,
            icon: Users,
            path: "/admin/customers",
            note: "Your connected community",
            color: "teal",
          },
          {
            label: "Units in inventory",
            value: variants.reduce((s, v) => s + v.stock, 0),
            icon: Package,
            path: "/admin/inventory",
            note: `${variants.length} ring variants`,
            color: "orange",
          },
        ].map((k) => (
          <Link to={k.path} key={k.label} className="ad-kpi">
            <div className="ad-kpi-top">
              <span>{k.label}</span>
              <span className={`ad-kpi-icon ${k.color}`}>
                <k.icon size={18} />
              </span>
            </div>
            <strong>
              {typeof k.value === "number" ? k.value.toLocaleString() : k.value}
            </strong>
            <div className="ad-kpi-bottom">
              <small>{k.note}</small>
              <ArrowUpRight size={15} />
            </div>
          </Link>
        ))}
      </div>
      <div className="ad-dashboard-charts">
        <Panel
          title="Total sales"
          subtitle="Payment received across your store"
          actions={
            <span className="ad-chart-key">
              <i />
              Revenue
            </span>
          }
        >
          <div className="ad-sales-total">
            {money(revenue)} <span>in selected period</span>
          </div>
          <SalesChart data={trend} />
          <div className="ad-chart-foot">
            <span>
              <Clock3 size={13} /> Updated from your workspace records
            </span>
            <Link to="/admin/reports/sales">
              View analytics <Chevron />
            </Link>
          </div>
        </Panel>
        <Panel
          title="Order status"
          subtitle="A little clarity at every step"
          actions={
            <Link
              className="ad-icon-btn"
              to="/admin/orders"
              aria-label="View all orders"
            >
              <ArrowUpRight size={17} />
            </Link>
          }
        >
          <Donut data={statusData} />
          <div className="ad-status-summary">
            <span>
              <Box size={16} />
              {
                orders.filter((o) =>
                  ["confirmed", "processing"].includes(o.status),
                ).length
              }{" "}
              to fulfill
            </span>
            <span>
              <RotateCcw size={15} />
              {returnsQ.data?.filter((r) => r.status === "requested").length ||
                0}{" "}
              requests
            </span>
          </div>
        </Panel>
      </div>
      <div className="ad-dashboard-bottom">
        <Panel
          title="Best-selling finishes"
          subtitle="The details your customers love"
          actions={
            <Link className="ad-link" to="/admin/products">
              View products <Chevron />
            </Link>
          }
        >
          <div className="ad-finish-list">
            {finishData.map((f, i) => (
              <div className="ad-finish-row" key={f.finish}>
                <span className="ad-finish-rank">0{i + 1}</span>
                <div className="ad-product-thumb">
                  <img
                    src={images[f.finish]}
                    alt={`${f.finish} ring`}
                    loading="lazy"
                  />
                </div>
                <div className="ad-finish-info">
                  <strong>{f.finish}</strong>
                  <span>Aion Smart Ring</span>
                </div>
                <div className="ad-finish-progress">
                  <span
                    style={{
                      width: `${Math.max(2, (f.quantity / (finishData[0]?.quantity || 1)) * 100)}%`,
                    }}
                  />
                </div>
                <strong>
                  {f.quantity}
                  <small> units</small>
                </strong>
              </div>
            ))}
          </div>
        </Panel>
        <section className="ad-brand-card">
          <div className="ad-brand-card-copy">
            <span className="ad-eyebrow">
              <Sparkles size={13} /> DESIGNED FOR EVERY DAY
            </span>
            <h2>
              Small ring.
              <br />
              Bigger possibilities.
            </h2>
            <p>Your next chapter of connected wellness starts here.</p>
            <Link to="/admin/products">
              Manage your collection <ArrowRight size={16} />
            </Link>
          </div>
          <img src={images["Rose Gold"]} alt="Rose Gold titanium smart ring" />
        </section>
      </div>
      <Panel
        title="Recent orders"
        subtitle="From first connection to doorstep delivery"
        actions={
          <Link to="/admin/orders" className="ad-link">
            View all orders <Chevron />
          </Link>
        }
      >
        <DataTable
          rows={orders.slice(0, 6)}
          columns={columns}
          onRow={(r) => navigate(`/admin/orders/${r.id}`)}
        />
      </Panel>
      <div className="ad-activity-grid">
        <Panel
          title="Recent activity"
          subtitle="A clear trail of your workspace changes"
        >
          {auditQ.data?.length ? (
            <div className="ad-activity-list">
              {auditQ.data.slice(0, 4).map((a) => (
                <div key={a.id}>
                  <span className="ad-activity-dot" />
                  <div>
                    <strong>{a.action}</strong>
                    <small>
                      {a.actor} · {date(a.createdAt)}
                    </small>
                  </div>
                  <span>{a.target}</span>
                </div>
              ))}
            </div>
          ) : (
            <Empty
              title="Your activity appears here"
              message="Workspace changes are recorded automatically."
            />
          )}
        </Panel>
        <Panel
          title="Inventory watch"
          subtitle="Stay a step ahead of your stock"
        >
          <div className="ad-stock-watch">
            {low.slice(0, 4).map((v) => (
              <Link to="/admin/inventory?status=low" key={v.id}>
                <img src={images[v.finish]} alt="" />
                <span>
                  <strong>{v.finish}</strong>
                  <small>
                    Size {v.size} · {v.sku}
                  </small>
                </span>
                <Badge status={v.stock === 0 ? "out of stock" : "low stock"}>
                  {v.stock} left
                </Badge>
              </Link>
            ))}
            {!low.length && (
              <Empty
                title="Your stock looks healthy"
                message="No variants are below their threshold."
              />
            )}
          </div>
        </Panel>
      </div>
    </>
  );
}
function Chevron() {
  return <ArrowRight size={14} />;
}
