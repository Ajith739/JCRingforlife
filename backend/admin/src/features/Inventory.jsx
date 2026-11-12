import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Boxes, History, PackageCheck, SlidersHorizontal, TriangleAlert, } from "lucide-react";
import { useQueryClient } from "@tanstack/react-query";
import { api, date, exportCsv, useRecords } from "../services/api.js";
import { Badge, ErrorState, ExportButton, Loading, PageHeader, Panel, SearchField, useToast, } from "../components/UI.jsx";
import { DataTable } from "../components/Table.jsx";
import { RecordEditor } from "../components/RecordEditor.jsx";
import { images } from "../../../shared/types.js";
export default function Inventory() {
    const variantsQ = useRecords("variants"), historyQ = useRecords("inventory");
    const [params, setParams] = useSearchParams();
    const [search, setSearch] = useState(""), [tab, setTab] = useState("stock"), [adjust, setAdjust] = useState(null);
    const toast = useToast(), qc = useQueryClient();
    const rows = variantsQ.data || [], filter = params.get("status") || "all";
    const low = rows.filter((v) => v.stock > 0 && v.stock <= v.threshold), out = rows.filter((v) => v.stock === 0);
    const filtered = rows.filter((v) => `${v.sku} ${v.finish} ${v.size}`
        .toLowerCase()
        .includes(search.toLowerCase()) &&
        (filter === "all" ||
            (filter === "low" ? v.stock <= v.threshold : v.stock === 0)));
    const columns = [
        {
            key: "sku",
            label: "Product variant",
            render: (r) => (<span className="ad-product-cell">
          <span className="ad-product-thumb">
            <img src={images[r.finish]} alt=""/>
          </span>
          <span>
            <strong>
              {r.finish} · Size {r.size}
            </strong>
            <small>{r.sku}</small>
          </span>
        </span>),
        },
        {
            key: "stock",
            label: "Available stock",
            render: (r) => <strong>{r.stock} units</strong>,
        },
        {
            key: "threshold",
            label: "Low-stock threshold",
            render: (r) => `${r.threshold} units`,
        },
        {
            key: "status",
            label: "Stock status",
            value: (r) => r.stock,
            render: (r) => (<Badge status={r.stock === 0
                    ? "out of stock"
                    : r.stock <= r.threshold
                        ? "low stock"
                        : "active"}>
          {r.stock === 0
                    ? "Out of stock"
                    : r.stock <= r.threshold
                        ? "Low stock"
                        : "In stock"}
        </Badge>),
        },
        {
            key: "adjust",
            label: "Actions",
            sortable: false,
            render: (r) => (<button className="ad-btn ad-small" onClick={() => setAdjust(r)}>
          <SlidersHorizontal size={14}/>
          Adjust stock
        </button>),
        },
    ];
    const historyColumns = [
        { key: "sku", label: "Variant SKU" },
        {
            key: "delta",
            label: "Change",
            render: (r) => (<strong className={r.delta > 0 ? "ad-text-green" : "ad-text-red"}>
          {r.delta > 0 ? "+" : ""}
          {r.delta}
        </strong>),
        },
        { key: "before", label: "Before" },
        { key: "after", label: "After" },
        { key: "reason", label: "Reason" },
        { key: "actor", label: "Adjusted by" },
        { key: "createdAt", label: "Date", render: (r) => date(r.createdAt) },
    ];
    if (variantsQ.isLoading)
        return <Loading />;
    if (variantsQ.error)
        return (<ErrorState error={variantsQ.error} retry={() => variantsQ.refetch()}/>);
    return (<>
      <PageHeader title="Inventory" subtitle="The right ring. The right size. Always ready." actions={<ExportButton onClick={() => {
                if (!exportCsv("inventory", tab === "stock" ? filtered : historyQ.data || []))
                    toast("No records to export", "error");
            }}/>}/>
      <div className="ad-summary-grid">
        {[
            {
                label: "Units in stock",
                value: rows.reduce((s, v) => s + v.stock, 0),
                icon: Boxes,
            },
            {
                label: "Available variants",
                value: rows.filter((v) => v.stock > 0).length,
                icon: PackageCheck,
            },
            {
                label: "Low-stock variants",
                value: low.length,
                icon: TriangleAlert,
            },
            { label: "Out of stock", value: out.length, icon: Boxes },
        ].map((s) => (<Panel key={s.label}>
            <div className="ad-summary-item">
              <s.icon size={21}/>
              <span>
                {s.label}
                <strong>{s.value}</strong>
              </span>
            </div>
          </Panel>))}
      </div>
      <div className="ad-tabs">
        <button className={tab === "stock" ? "active" : ""} onClick={() => setTab("stock")}>
          Stock overview
        </button>
        <button className={tab === "history" ? "active" : ""} onClick={() => setTab("history")}>
          <History size={15}/>
          Movement history
        </button>
      </div>
      {tab === "stock" && (<div className="ad-toolbar">
          <SearchField value={search} onChange={setSearch} placeholder="Search SKU, finish, or size…"/>
          <select aria-label="Stock status" value={filter} onChange={(e) => setParams(e.target.value === "all" ? {} : { status: e.target.value })}>
            <option value="all">All stock levels</option>
            <option value="low">Low stock & out of stock</option>
            <option value="out">Out of stock</option>
          </select>
        </div>)}
      <Panel>
        <DataTable rows={tab === "stock" ? filtered : historyQ.data || []} columns={tab === "stock" ? columns : historyColumns}/>
      </Panel>
      {adjust && (<RecordEditor title={`Adjust stock · ${adjust.sku}`} fields={[
                {
                    key: "delta",
                    label: `Change in units (currently ${adjust.stock})`,
                    type: "number",
                    required: true,
                    min: -adjust.stock,
                    max: 100000,
                    hint: "Use a positive number to add units or a negative number to remove units.",
                },
                {
                    key: "reason",
                    label: "Reason for adjustment",
                    required: true,
                    type: "textarea",
                    wide: true,
                    hint: "All changes are recorded with your account and timestamp.",
                },
            ]} onClose={() => setAdjust(null)} onSave={async (data) => {
                await api("/admin/inventory/adjust", {
                    method: "POST",
                    body: JSON.stringify({ ...data, variantId: adjust.id }),
                });
                await qc.invalidateQueries({ queryKey: ["records"] });
                toast("Inventory adjusted and movement recorded");
            }}/>)}
    </>);
}
