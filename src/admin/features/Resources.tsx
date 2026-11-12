import { useState } from "react";
import { Link } from "react-router-dom";
import {
  CreditCard,
  Info,
  Pencil,
  Plus,
  ShieldCheck,
  Trash2,
} from "lucide-react";
import { useQueryClient } from "@tanstack/react-query";
import {
  api,
  useRecords,
  useSave,
  useSession,
  money,
  date,
  exportCsv,
} from "../services/api";
import {
  Badge,
  Confirm,
  ErrorState,
  ExportButton,
  Loading,
  Modal,
  PageHeader,
  Panel,
  SearchField,
  useToast,
} from "../components/UI";
import { DataTable, type Column } from "../components/Table";
import { RecordEditor, options, type Field } from "../components/RecordEditor";
import type { Entity, RecordData } from "../types";
type Resource =
  | "coupons"
  | "content"
  | "support"
  | "returns"
  | "staff"
  | "audit"
  | "payments";
const config: Record<
  Resource,
  { title: string; subtitle: string; add?: string }
> = {
  coupons: {
    title: "Promotions & coupons",
    subtitle: "A little incentive for a healthier tomorrow.",
    add: "Create coupon",
  },
  content: {
    title: "Website content",
    subtitle: "Manage banners, FAQs, and your product story.",
    add: "Add content",
  },
  support: {
    title: "Support requests",
    subtitle: "Be there for your customers, every step of the way.",
    add: "New request",
  },
  returns: {
    title: "Returns & replacements",
    subtitle: "Find the right solution for every customer.",
    add: "New request",
  },
  staff: {
    title: "Staff & roles",
    subtitle: "The right access for every member of your team.",
    add: "Invite staff",
  },
  audit: {
    title: "Audit logs",
    subtitle: "A transparent record of every important workspace action.",
  },
  payments: {
    title: "Payments & refunds",
    subtitle: "Payment visibility and a clear view of every transaction.",
  },
};
export default function Resources({ entity }: { entity: Resource }) {
  const q = useRecords(entity === "payments" ? "orders" : (entity as Entity)),
    customerQ = useRecords("customers"),
    orderQ = useRecords("orders"),
    session = useSession();
  const save = useSave((entity === "payments" ? "orders" : entity) as Entity),
    qc = useQueryClient(),
    toast = useToast();
  const [search, setSearch] = useState(""),
    [filter, setFilter] = useState("all"),
    [editor, setEditor] = useState<RecordData | null | undefined>(),
    [deleting, setDeleting] = useState<RecordData | null>(null),
    [detail, setDetail] = useState<RecordData | null>(null),
    [pending, setPending] = useState(false);
  const c = config[entity],
    rows = q.data || [],
    customers = customerQ.data || [];
  const statusKey = entity === "payments" ? "paymentStatus" : "status";
  const filtered = rows.filter(
    (r) =>
      JSON.stringify(r).toLowerCase().includes(search.toLowerCase()) &&
      (filter === "all" || r[statusKey] === filter),
  );
  const customerOptions = customers.map((v) => ({
      value: v.id,
      label: v.name,
    })),
    orderOptions = (orderQ.data || []).map((v) => ({
      value: v.id,
      label: v.id,
    }));
  const fields: Record<Resource, Field[]> = {
    coupons: [
      { key: "code", label: "Coupon code", required: true },
      {
        key: "type",
        label: "Discount type",
        options: options(["percentage", "fixed"]),
      },
      {
        key: "amount",
        label: "Discount amount",
        type: "number",
        required: true,
        min: 0.01,
        max: 100000,
        step: "0.01",
        hint: "Percentage discounts must not exceed 100.",
      },
      {
        key: "limit",
        label: "Usage limit",
        type: "number",
        required: true,
        min: 1,
        default: 100,
      },
      {
        key: "start",
        label: "Valid from",
        type: "date",
        required: true,
        default: new Date().toISOString().slice(0, 10),
      },
      { key: "end", label: "Valid until", type: "date", required: true },
      {
        key: "status",
        label: "Status",
        options: options(["active", "inactive"]),
      },
    ],
    content: [
      { key: "title", label: "Title", required: true },
      {
        key: "type",
        label: "Content type",
        options: options(["banner", "faq", "product"]),
      },
      {
        key: "status",
        label: "Publishing status",
        options: options(["draft", "published"]),
      },
      {
        key: "url",
        label: "Destination URL",
        hint: "Relative path or HTTPS URL.",
      },
      { key: "body", label: "Content", type: "textarea", wide: true },
    ],
    support: [
      { key: "subject", label: "Subject", required: true },
      {
        key: "customerId",
        label: "Customer",
        required: true,
        options: customerOptions,
      },
      {
        key: "priority",
        label: "Priority",
        options: options(["normal", "low", "high"]),
      },
      {
        key: "status",
        label: "Status",
        options: options(["open", "in_progress", "resolved"]),
      },
      {
        key: "notes",
        label: "Conversation notes",
        type: "textarea",
        wide: true,
      },
    ],
    returns: [
      { key: "orderId", label: "Order", required: true, options: orderOptions },
      {
        key: "type",
        label: "Request type",
        options: options(["return", "replacement"]),
      },
      { key: "reason", label: "Reason", required: true },
      {
        key: "status",
        label: "Status",
        options: options([
          "requested",
          "approved",
          "received",
          "closed",
          "rejected",
        ]),
      },
      { key: "notes", label: "Internal notes", type: "textarea", wide: true },
    ],
    staff: editor
      ? [
          {
            key: "role",
            label: "Role",
            options: options(["admin", "manager", "support", "viewer"]),
          },
          {
            key: "status",
            label: "Account status",
            options: options(["active", "inactive"]),
          },
        ]
      : [
          { key: "name", label: "Full name", required: true },
          { key: "email", label: "Work email", type: "email", required: true },
          {
            key: "role",
            label: "Role",
            options: options(["viewer", "support", "manager", "admin"]),
          },
        ],
    audit: [],
    payments: [],
  };
  let columns: Column[] =
    entity === "coupons"
      ? [
          {
            key: "code",
            label: "Coupon",
            render: (r) => <strong className="ad-code">{r.code}</strong>,
          },
          {
            key: "amount",
            label: "Discount",
            render: (r) =>
              r.type === "percentage" ? `${r.amount}%` : money(r.amount),
          },
          {
            key: "used",
            label: "Usage",
            render: (r) => `${r.used || 0} / ${r.limit}`,
          },
          { key: "start", label: "Valid from", render: (r) => date(r.start) },
          { key: "end", label: "Expires", render: (r) => date(r.end) },
          {
            key: "status",
            label: "Status",
            render: (r) => <Badge status={r.status} />,
          },
        ]
      : entity === "content"
        ? [
            {
              key: "title",
              label: "Title",
              render: (r) => <strong>{r.title}</strong>,
            },
            { key: "type", label: "Type" },
            {
              key: "status",
              label: "Status",
              render: (r) => <Badge status={r.status} />,
            },
            {
              key: "updatedAt",
              label: "Updated",
              render: (r) => date(r.updatedAt || r.createdAt),
            },
          ]
        : entity === "support"
          ? [
              {
                key: "subject",
                label: "Request",
                render: (r) => <strong>{r.subject}</strong>,
              },
              {
                key: "customerId",
                label: "Customer",
                render: (r) =>
                  customers.find((c) => c.id === r.customerId)?.name ||
                  "Customer",
              },
              {
                key: "priority",
                label: "Priority",
                render: (r) => <Badge status={r.priority} />,
              },
              {
                key: "status",
                label: "Status",
                render: (r) => <Badge status={r.status} />,
              },
              {
                key: "createdAt",
                label: "Opened",
                render: (r) => date(r.createdAt),
              },
            ]
          : entity === "returns"
            ? [
                {
                  key: "orderId",
                  label: "Order",
                  render: (r) => (
                    <Link className="ad-link" to={`/admin/orders/${r.orderId}`}>
                      {r.orderId}
                    </Link>
                  ),
                },
                { key: "type", label: "Request type" },
                { key: "reason", label: "Reason" },
                {
                  key: "status",
                  label: "Status",
                  render: (r) => <Badge status={r.status} />,
                },
                {
                  key: "createdAt",
                  label: "Requested",
                  render: (r) => date(r.createdAt),
                },
              ]
            : entity === "staff"
              ? [
                  {
                    key: "name",
                    label: "Team member",
                    render: (r) => (
                      <span className="ad-customer-cell">
                        <span className="ad-avatar">
                          {r.name
                            .split(" ")
                            .map((n: string) => n[0])
                            .slice(0, 2)
                            .join("")}
                        </span>
                        <span>
                          <strong>{r.name}</strong>
                          <small className="ad-cell-sub">{r.email}</small>
                        </span>
                      </span>
                    ),
                  },
                  {
                    key: "role",
                    label: "Role",
                    render: (r) => (
                      <span className="ad-role">
                        <ShieldCheck size={14} />
                        {r.role}
                      </span>
                    ),
                  },
                  {
                    key: "status",
                    label: "Account",
                    render: (r) => <Badge status={r.status} />,
                  },
                ]
              : entity === "audit"
                ? [
                    {
                      key: "action",
                      label: "Action",
                      render: (r) => <strong>{r.action}</strong>,
                    },
                    { key: "actor", label: "Actor" },
                    { key: "target", label: "Resource" },
                    {
                      key: "createdAt",
                      label: "Date",
                      render: (r) => date(r.createdAt),
                    },
                  ]
                : [
                    {
                      key: "id",
                      label: "Order",
                      render: (r) => (
                        <Link className="ad-link" to={`/admin/orders/${r.id}`}>
                          {r.id}
                        </Link>
                      ),
                    },
                    {
                      key: "customerId",
                      label: "Customer",
                      render: (r) =>
                        customers.find((c) => c.id === r.customerId)?.name ||
                        "Customer",
                    },
                    {
                      key: "total",
                      label: "Amount",
                      render: (r) => <strong>{money(r.total)}</strong>,
                    },
                    {
                      key: "paymentStatus",
                      label: "Payment status",
                      render: (r) => <Badge status={r.paymentStatus} />,
                    },
                    {
                      key: "createdAt",
                      label: "Date",
                      render: (r) => date(r.createdAt),
                    },
                  ];
  if (c.add)
    columns = [
      ...columns,
      {
        key: "actions",
        label: "Actions",
        sortable: false,
        render: (r) => (
          <div className="ad-row-actions">
            <button
              className="ad-icon-btn"
              aria-label={`Edit ${r.code || r.title || r.subject || r.name || r.id}`}
              onClick={() => setEditor(r)}
            >
              <Pencil size={15} />
            </button>
            {["coupons", "content"].includes(entity) && (
              <button
                className="ad-icon-btn"
                aria-label="Delete record"
                onClick={() => setDeleting(r)}
              >
                <Trash2 size={15} />
              </button>
            )}
          </div>
        ),
      },
    ];
  if (q.isLoading) return <Loading />;
  if (q.error) return <ErrorState error={q.error} retry={() => q.refetch()} />;
  return (
    <>
      <PageHeader
        title={c.title}
        subtitle={c.subtitle}
        actions={
          <>
            <ExportButton
              onClick={() => {
                if (!exportCsv(entity, filtered))
                  toast("No records to export", "error");
              }}
            />
            {c.add && (
              <button
                className="ad-btn ad-primary"
                onClick={() => setEditor(null)}
              >
                <Plus size={16} />
                {c.add}
              </button>
            )}
          </>
        }
      />
      {["payments", "coupons", "content", "staff"].includes(entity) && (
        <div className="ad-info-banner">
          <Info size={18} />
          <p>
            {entity === "payments"
              ? "Payment processing and refunds are not connected. Statuses reflect stored order records; no live transactions are executed."
              : entity === "coupons"
                ? "Coupons are stored and validated in the admin API. The existing storefront checkout needs a coupon integration before these discounts affect purchases."
                : entity === "content"
                  ? "Content is saved in the admin API. Publishing to the existing storefront requires a content-consumption integration."
                  : `Staff accounts use backend role enforcement. Invitations ${session.data?.integrations.email ? "use the configured transactional email service." : "require a transactional email service."}`}
          </p>
        </div>
      )}
      {entity === "payments" && (
        <div className="ad-summary-grid">
          {[
            {
              label: "Paid orders",
              value: money(
                rows
                  .filter((o) => o.paymentStatus === "paid")
                  .reduce((s, o) => s + o.total, 0),
              ),
            },
            {
              label: "Pending payments",
              value: money(
                rows
                  .filter((o) => o.paymentStatus === "pending")
                  .reduce((s, o) => s + o.total, 0),
              ),
            },
            {
              label: "Refunded",
              value: money(
                rows
                  .filter((o) => o.paymentStatus === "refunded")
                  .reduce((s, o) => s + o.total, 0),
              ),
            },
            { label: "Provider status", value: "Not connected" },
          ].map((s) => (
            <Panel key={s.label}>
              <div className="ad-summary-item">
                <CreditCard size={21} />
                <span>
                  {s.label}
                  <strong>{s.value}</strong>
                </span>
              </div>
            </Panel>
          ))}
        </div>
      )}
      <div className="ad-toolbar">
        <SearchField
          value={search}
          onChange={setSearch}
          placeholder={`Search ${entity}…`}
        />
        {entity !== "audit" && (
          <select
            aria-label="Filter status"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
          >
            <option value="all">All statuses</option>
            {[...new Set(rows.map((r) => r[statusKey]))]
              .filter(Boolean)
              .map((s) => (
                <option key={s} value={s}>
                  {s.replaceAll("_", " ")}
                </option>
              ))}
          </select>
        )}
        <span className="ad-toolbar-count">{filtered.length} records</span>
      </div>
      <Panel>
        <DataTable
          rows={filtered}
          columns={columns}
          onRow={entity === "payments" ? undefined : (r) => setDetail(r)}
        />
      </Panel>
      {entity === "staff" && (
        <Panel
          title="Role permissions"
          subtitle="Server enforcement applies to every API request."
        >
          <div className="ad-permissions">
            <div>
              <strong>Administrator</strong>
              <p>Full access, staff, store settings, and audit logs.</p>
            </div>
            <div>
              <strong>Manager</strong>
              <p>Commerce, inventory, marketing, customers, and support.</p>
            </div>
            <div>
              <strong>Support</strong>
              <p>Customer records, support tickets, and returns.</p>
            </div>
            <div>
              <strong>Viewer</strong>
              <p>Read-only access to commerce and reporting.</p>
            </div>
          </div>
        </Panel>
      )}
      {editor !== undefined && (
        <RecordEditor
          title={`${editor ? "Edit" : c.add || "Add"}${editor ? " record" : ""}`}
          fields={fields[entity]}
          record={editor}
          onClose={() => setEditor(undefined)}
          onSave={async (data) => {
            if (entity === "staff") {
              await api(`/admin/staff${editor ? `/${editor.id}` : ""}`, {
                method: editor ? "PUT" : "POST",
                body: JSON.stringify(data),
              });
              await qc.invalidateQueries({ queryKey: ["records"] });
            } else await save.mutateAsync(data);
            toast(
              entity === "staff" && !editor
                ? "Invitation sent"
                : "Record saved",
            );
          }}
        />
      )}
      {detail && (
        <Modal
          title={
            detail.title ||
            detail.subject ||
            detail.code ||
            detail.name ||
            "Record details"
          }
          onClose={() => setDetail(null)}
        >
          <dl className="ad-record-details">
            {Object.entries(detail)
              .filter(([k]) => !["id"].includes(k))
              .map(([k, v]) => (
                <div key={k}>
                  <dt>{k.replace(/([A-Z])/g, " $1")}</dt>
                  <dd>
                    {typeof v === "object"
                      ? JSON.stringify(v)
                      : String(v ?? "—")}
                  </dd>
                </div>
              ))}
          </dl>
          {c.add && (
            <div className="ad-modal-actions">
              <button
                className="ad-btn ad-primary"
                onClick={() => {
                  setEditor(detail);
                  setDetail(null);
                }}
              >
                <Pencil size={15} />
                Edit record
              </button>
            </div>
          )}
        </Modal>
      )}
      {deleting && (
        <Confirm
          title="Delete this record?"
          message="This permanently removes the selected record from your workspace."
          danger
          pending={pending}
          onClose={() => setDeleting(null)}
          onConfirm={async () => {
            setPending(true);
            try {
              await api(`/admin/data/${entity}/${deleting.id}`, {
                method: "DELETE",
              });
              await qc.invalidateQueries({ queryKey: ["records"] });
              toast("Record deleted");
              setDeleting(null);
            } catch (e) {
              toast((e as Error).message, "error");
            } finally {
              setPending(false);
            }
          }}
        />
      )}
    </>
  );
}
