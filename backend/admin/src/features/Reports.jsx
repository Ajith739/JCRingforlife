import { useMemo, useState } from "react";
import { Navigate, useParams } from "react-router-dom";
import { ArrowDownToLine, BarChart3, Users, Package, ShoppingBag, } from "lucide-react";
import { date, exportCsv, money, useRecords } from "../services/api.js";
import { ErrorState, Loading, PageHeader, Panel, useToast, } from "../components/UI.jsx";
import { DateFilter, initialRange, inRange } from "../components/DateFilter.jsx";
import { SalesChart, DistributionChart, Donut } from "../components/Charts.jsx";
import { DataTable } from "../components/Table.jsx";
import { dailyData } from "../analytics.js";
export default function Reports() {
    const { kind } = useParams();
    const [range, setRange] = useState(initialRange);
    const toast = useToast();
    const productsQ = useRecords("products");
    const oq = useRecords("orders"), pq = useRecords("preorders"), vq = useRecords("variants"), cq = useRecords("customers");
    const orders = (oq.data || []).filter((o) => inRange(o.createdAt, range)), preorders = (pq.data || []).filter((o) => inRange(o.createdAt, range)), customers = cq.data || [], variants = vq.data || [];
    const trend = useMemo(() => dailyData(orders, range), [oq.data, range]);
    if (!["sales", "inventory", "customers"].includes(kind || ""))
        return <Navigate to="/404" replace/>;
    if (oq.isLoading)
        return <Loading />;
    if (oq.error)
        return <ErrorState error={oq.error} retry={() => oq.refetch()}/>;
    const inventory = kind === "inventory", customer = kind === "customers";
    const title = inventory
        ? "Inventory reports"
        : customer
            ? "Customer analytics"
            : "Sales analytics";
    const finishes = ["Midnight", "Silver", "Rose Gold"].map((name) => ({
        name,
        value: inventory
            ? variants
                .filter((v) => v.finish === name)
                .reduce((s, v) => s + v.stock, 0)
            : orders
                .filter((o) => o.status !== "cancelled")
                .flatMap((o) => o.items)
                .filter((i) => i.finish === name)
                .reduce((s, i) => s + i.quantity, 0),
    }));
    const sizes = Array.from({ length: 8 }, (_, i) => ({
        name: `Size ${i + 6}`,
        value: inventory
            ? variants
                .filter((v) => v.size === i + 6)
                .reduce((s, v) => s + v.stock, 0)
            : orders
                .filter((o) => o.status !== "cancelled")
                .flatMap((o) => o.items)
                .filter((v) => v.size === i + 6)
                .reduce((s, v) => s + v.quantity, 0),
    }));
    const country = [
        ...new Set(customers.map((c) => c.country || "Unknown")),
    ].map((name) => ({
        name,
        value: customers.filter((c) => (c.country || "Unknown") === name).length,
    }));
    const newCustomers = customers.filter((c) => inRange(c.createdAt, range));
    const metrics = inventory
        ? [
            {
                label: "Total stock",
                value: variants.reduce((s, v) => s + v.stock, 0),
                icon: Package,
            },
            { label: "Variants", value: variants.length, icon: Package },
            {
                label: "Low stock",
                value: variants.filter((v) => v.stock <= v.threshold).length,
                icon: Package,
            },
            {
                label: "Retail stock value",
                value: money(variants.reduce((s, v) => s +
                    v.stock *
                        (v.price === ""
                            ? productsQ.data?.find((p) => p.id === v.productId)
                                ?.price || 0
                            : v.price), 0)),
                icon: BarChart3,
            },
        ]
        : customer
            ? [
                { label: "Total customers", value: customers.length, icon: Users },
                {
                    label: "New in selected period",
                    value: newCustomers.length,
                    icon: Users,
                },
                {
                    label: "With an order",
                    value: new Set(orders.map((o) => o.customerId)).size,
                    icon: ShoppingBag,
                },
                { label: "Countries", value: country.length, icon: BarChart3 },
            ]
            : [
                {
                    label: "Revenue",
                    value: money(orders
                        .filter((o) => o.paymentStatus === "paid")
                        .reduce((s, o) => s + o.total, 0)),
                    icon: BarChart3,
                },
                { label: "Orders", value: orders.length, icon: ShoppingBag },
                { label: "Pre-orders", value: preorders.length, icon: Package },
                {
                    label: "Average paid order",
                    value: money(orders
                        .filter((o) => o.paymentStatus === "paid")
                        .reduce((s, o) => s + o.total, 0) /
                        (orders.filter((o) => o.paymentStatus === "paid").length || 1)),
                    icon: BarChart3,
                },
            ];
    const reportRows = inventory ? variants : customer ? newCustomers : orders;
    const columns = inventory
        ? [
            { key: "sku", label: "SKU" },
            { key: "finish", label: "Finish" },
            { key: "size", label: "Size" },
            { key: "stock", label: "Stock" },
            { key: "threshold", label: "Threshold" },
        ]
        : customer
            ? [
                { key: "name", label: "Customer" },
                { key: "country", label: "Country" },
                { key: "status", label: "Status" },
                {
                    key: "createdAt",
                    label: "Joined",
                    render: (r) => date(r.createdAt),
                },
            ]
            : [
                { key: "id", label: "Order" },
                { key: "total", label: "Total", render: (r) => money(r.total) },
                { key: "paymentStatus", label: "Payment" },
                { key: "status", label: "Status" },
                { key: "createdAt", label: "Date", render: (r) => date(r.createdAt) },
            ];
    return (<>
      <PageHeader title={title} subtitle={inventory
            ? "A clear picture of what’s available."
            : customer
                ? "Understand your growing wellness community."
                : "Turn your store activity into thoughtful decisions."} actions={<>
            <button className="ad-btn" onClick={() => {
                if (!exportCsv(`${kind}-report`, reportRows.map((r) => Object.fromEntries(columns.map((c) => [c.key, r[c.key]])))))
                    toast("No report records for this range", "error");
            }}>
              <ArrowDownToLine size={15}/>
              Export report
            </button>
            {!inventory && <DateFilter value={range} onChange={setRange}/>}
          </>}/>
      <div className="ad-summary-grid">
        {metrics.map((m) => (<Panel key={m.label}>
            <div className="ad-summary-item">
              <m.icon size={21}/>
              <span>
                {m.label}
                <strong>{m.value}</strong>
              </span>
            </div>
          </Panel>))}
      </div>
      {inventory && (<p className="ad-page-note">
          Retail stock value uses the current product or variant selling price;
          it is not a cost or accounting valuation. Inventory is a current
          snapshot.
        </p>)}
      <div className="ad-dashboard-charts">
        <Panel title={inventory
            ? "Stock by ring size"
            : customer
                ? "Orders over time"
                : "Revenue over time"} subtitle="Calculated from workspace records">
          {inventory ? (<DistributionChart data={sizes}/>) : (<SalesChart data={trend} metric={customer ? "orders" : "revenue"}/>)}
        </Panel>
        <Panel title={customer ? "Community by country" : "Finish distribution"} subtitle={customer
            ? "Based on customer profiles"
            : inventory
                ? "Units currently available"
                : "Units ordered in selected period"}>
          <Donut data={customer ? country : finishes} label={customer ? "Customers" : "Units"}/>
        </Panel>
      </div>
      {!customer && !inventory && (<div className="ad-dashboard-charts">
          <Panel title="Ring size popularity">
            <DistributionChart data={sizes}/>
          </Panel>
          <Panel title="Pre-order performance" subtitle="Reservation status in selected period">
            <Donut data={[
                "reserved",
                "sizing",
                "confirmed",
                "converted",
                "cancelled",
            ]
                .map((name) => ({
                name,
                value: preorders.filter((p) => p.status === name).length,
            }))
                .filter((x) => x.value)} label="Pre-orders"/>
          </Panel>
        </div>)}
      <Panel title={inventory
            ? "Variant inventory"
            : customer
                ? "Customer acquisition"
                : "Order report"}>
        <DataTable rows={reportRows} columns={columns}/>
      </Panel>
    </>);
}
