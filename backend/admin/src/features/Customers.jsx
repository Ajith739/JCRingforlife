import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { ArrowLeft, Mail, MapPin, Pencil, Plus, ShieldCheck, ShoppingBag, } from "lucide-react";
import { useRecords, useSave, exportCsv, money, date } from "../services/api.js";
import { Badge, ErrorState, ExportButton, Loading, PageHeader, Panel, SearchField, useToast, } from "../components/UI.jsx";
import { DataTable } from "../components/Table.jsx";
import { RecordEditor, options } from "../components/RecordEditor.jsx";
export default function Customers() {
    const q = useRecords("customers"), ordersQ = useRecords("orders"), preordersQ = useRecords("preorders");
    const save = useSave("customers"), toast = useToast(), navigate = useNavigate(), location = useLocation();
    const [search, setSearch] = useState(""), [status, setStatus] = useState("all"), [editor, setEditor] = useState();
    const rows = q.data || [], id = location.pathname.split("/")[3], customer = rows.find((c) => c.id === id);
    const orders = ordersQ.data || [], preorders = preordersQ.data || [];
    const filtered = rows.filter((c) => `${c.name} ${c.email} ${c.country}`
        .toLowerCase()
        .includes(search.toLowerCase()) &&
        (status === "all" || c.status === status));
    const fields = [
        { key: "name", label: "Full name", required: true },
        { key: "email", label: "Email address", required: true, type: "email" },
        { key: "phone", label: "Phone number", type: "tel" },
        { key: "country", label: "Country" },
        {
            key: "status",
            label: "Account status",
            options: options(["active", "inactive"]),
        },
        { key: "address", label: "Shipping address", type: "textarea", wide: true },
        {
            key: "notes",
            label: "Internal notes",
            type: "textarea",
            wide: true,
            hint: "Keep notes relevant to customer service. Do not store payment or health details.",
        },
    ];
    const columns = [
        {
            key: "name",
            label: "Customer",
            render: (r) => (<span className="ad-customer-cell">
          <span className="ad-avatar">
            {r.name
                    .split(" ")
                    .map((s) => s[0])
                    .slice(0, 2)
                    .join("")}
          </span>
          <span>
            <strong>{r.name}</strong>
            <small className="ad-cell-sub">{r.email}</small>
          </span>
        </span>),
        },
        { key: "country", label: "Country" },
        {
            key: "orders",
            label: "Orders",
            value: (r) => orders.filter((o) => o.customerId === r.id).length,
            render: (r) => orders.filter((o) => o.customerId === r.id).length,
        },
        {
            key: "spent",
            label: "Total spent",
            value: (r) => orders
                .filter((o) => o.customerId === r.id && o.paymentStatus === "paid")
                .reduce((s, o) => s + o.total, 0),
            render: (r) => money(orders
                .filter((o) => o.customerId === r.id && o.paymentStatus === "paid")
                .reduce((s, o) => s + o.total, 0)),
        },
        {
            key: "status",
            label: "Status",
            render: (r) => <Badge status={r.status}/>,
        },
        { key: "createdAt", label: "Joined", render: (r) => date(r.createdAt) },
        {
            key: "actions",
            label: "Actions",
            sortable: false,
            render: (r) => (<button className="ad-icon-btn" aria-label={`Edit ${r.name}`} onClick={() => setEditor(r)}>
          <Pencil size={15}/>
        </button>),
        },
    ];
    const orderCols = [
        {
            key: "id",
            label: "Order",
            render: (r) => (<Link className="ad-link" to={`/admin/${r.id.startsWith("PRE") ? "preorders" : "orders"}/${r.id}`}>
          {r.id}
        </Link>),
        },
        { key: "total", label: "Total", render: (r) => money(r.total) },
        {
            key: "paymentStatus",
            label: "Payment",
            render: (r) => <Badge status={r.paymentStatus}/>,
        },
        {
            key: "status",
            label: "Status",
            render: (r) => <Badge status={r.status}/>,
        },
        { key: "createdAt", label: "Date", render: (r) => date(r.createdAt) },
    ];
    if (q.isLoading)
        return <Loading />;
    if (q.error)
        return <ErrorState error={q.error} retry={() => q.refetch()}/>;
    if (id && !customer)
        return (<ErrorState error={new Error("Customer not found")} retry={() => navigate("/admin/customers")}/>);
    return (<>
      {customer ? (<>
          <Link to="/admin/customers" className="ad-link ad-inline">
            <ArrowLeft size={15}/>
            Back to customers
          </Link>
          <PageHeader title={customer.name} subtitle={`Customer since ${date(customer.createdAt)}`} actions={<button className="ad-btn" onClick={() => setEditor(customer)}>
                <Pencil size={15}/>
                Edit customer
              </button>}/>
          <div className="ad-detail-grid">
            <div>
              <Panel title="Order history" actions={<ShoppingBag size={17}/>}>
                <DataTable rows={orders.filter((o) => o.customerId === customer.id)} columns={orderCols}/>
              </Panel>
              <Panel title="Pre-order history">
                <DataTable rows={preorders.filter((o) => o.customerId === customer.id)} columns={orderCols}/>
              </Panel>
            </div>
            <div>
              <Panel title="Customer details">
                <div className="ad-customer-info">
                  <Badge status={customer.status}/>
                  <p>
                    <Mail size={15}/>
                    {customer.email}
                  </p>
                  <p>{customer.phone || "No phone on file"}</p>
                  <p>
                    <MapPin size={15}/>
                    {customer.country || "No country on file"}
                  </p>
                  <p>{customer.address || "No address on file"}</p>
                </div>
              </Panel>
              <Panel title="Internal notes">
                <div className="ad-customer-info">
                  <p>{customer.notes || "No notes yet."}</p>
                  <button className="ad-btn" onClick={() => setEditor(customer)}>
                    Edit notes
                  </button>
                </div>
              </Panel>
            </div>
          </div>
        </>) : (<>
          <PageHeader title="Customers" subtitle="Real connections. Thoughtful customer care." actions={<>
                <ExportButton onClick={() => {
                    if (!exportCsv("customers", filtered.map(({ name, email, country, status, createdAt }) => ({
                        name,
                        email,
                        country,
                        status,
                        createdAt,
                    }))))
                        toast("No customers to export", "error");
                }}/>
                <button className="ad-btn ad-primary" onClick={() => setEditor(null)}>
                  <Plus size={16}/>
                  Add customer
                </button>
              </>}/>
          <div className="ad-toolbar">
            <SearchField value={search} onChange={setSearch} placeholder="Search customers…"/>
            <select aria-label="Customer status" value={status} onChange={(e) => setStatus(e.target.value)}>
              <option value="all">All customers</option>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
            <span className="ad-toolbar-count">
              {filtered.length} customers
            </span>
          </div>
          <Panel>
            <DataTable rows={filtered} columns={columns} onRow={(r) => navigate(`/admin/customers/${r.id}`)}/>
          </Panel>
          <p className="ad-page-note">
            <ShieldCheck size={14}/>
            Customer exports include essential contact details only. Addresses
            and internal notes stay in your workspace.
          </p>
        </>)}
      {editor !== undefined && (<RecordEditor title={editor ? "Edit customer" : "Add customer"} fields={fields} record={editor} onClose={() => setEditor(undefined)} onSave={async (data) => {
                await save.mutateAsync(data);
                toast("Customer saved");
            }}/>)}
    </>);
}
