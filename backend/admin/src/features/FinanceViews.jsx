import { useState } from "react";
import { Panel, Modal } from "../components/UI.jsx";
const usd = (n) =>
  (Number(n || 0) / 100).toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
  });
const short = (s) => String(s || "—").slice(0, 18);
const cell = (value) => value ?? "—";
function Ledger({ title, rows, columns, empty }) {
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState("all");
  const [page, setPage] = useState(0);
  const [from, setFrom] = useState("");
  const [sort, setSort] = useState({ key: "createdAt", direction: -1 });
  const [selected, setSelected] = useState(null);
  const statuses = [...new Set(rows.map((r) => r.status).filter(Boolean))];
  const filtered = rows.filter(
    (r) =>
      (status === "all" || r.status === status) &&
      (!from || String(r.createdAt || "").slice(0, 10) >= from) &&
      JSON.stringify(r).toLowerCase().includes(query.toLowerCase()),
  );
  filtered.sort((a, b) => {
    const av = a[sort.key] ?? "",
      bv = b[sort.key] ?? "";
    return (
      (typeof av === "number"
        ? av - bv
        : String(av).localeCompare(String(bv))) * sort.direction
    );
  });
  const count = 10;
  return (
    <Panel className="ad-finance-panel">
      <div className="ad-finance-heading">
        <div>
          <h2>{title}</h2>
          <p>
            {filtered.length} record{filtered.length === 1 ? "" : "s"}
          </p>
        </div>
        <div className="ad-finance-toolbar">
          <input
            type="date"
            aria-label="Transactions from date"
            value={from}
            onChange={(e) => {
              setFrom(e.target.value);
              setPage(0);
            }}
          />
          <input
            aria-label={`Search ${title}`}
            placeholder="Search records"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setPage(0);
            }}
          />
          <select
            aria-label="Filter status"
            value={status}
            onChange={(e) => {
              setStatus(e.target.value);
              setPage(0);
            }}
          >
            <option value="all">All statuses</option>
            {statuses.map((s) => (
              <option key={s}>{s}</option>
            ))}
          </select>
        </div>
      </div>
      {filtered.length ? (
        <>
          <div className="ad-finance-table-scroll">
            <table className="ad-finance-table">
              <thead>
                <tr>
                  {columns.map((c) => (
                    <th
                      key={c.key}
                      aria-sort={
                        sort.key === c.key
                          ? sort.direction === 1
                            ? "ascending"
                            : "descending"
                          : "none"
                      }
                    >
                      <button
                        className="ad-finance-sort"
                        onClick={() =>
                          setSort({
                            key: c.key,
                            direction: sort.key === c.key ? -sort.direction : 1,
                          })
                        }
                      >
                        {c.label}
                      </button>
                    </th>
                  ))}
                  <th>Details</th>
                </tr>
              </thead>
              <tbody>
                {filtered
                  .slice(page * count, (page + 1) * count)
                  .map((row, i) => (
                    <tr key={row.id || i}>
                      {columns.map((c) => (
                        <td
                          key={c.key}
                          className={c.key === "id" ? "ad-finance-id" : ""}
                        >
                          {c.format
                            ? c.format(row[c.key], row)
                            : cell(row[c.key])}
                        </td>
                      ))}
                      <td>
                        <button
                          className="ad-btn"
                          onClick={() => setSelected(row)}
                        >
                          View
                        </button>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
          <div className="ad-finance-pagination">
            <button
              className="ad-btn"
              disabled={page === 0}
              onClick={() => setPage(page - 1)}
            >
              Previous
            </button>
            <span>
              Page {page + 1} of {Math.ceil(filtered.length / count)}
            </span>
            <button
              className="ad-btn"
              disabled={(page + 1) * count >= filtered.length}
              onClick={() => setPage(page + 1)}
            >
              Next
            </button>
          </div>
        </>
      ) : (
        <p className="ad-finance-empty">{empty || "No matching records."}</p>
      )}
      {selected && (
        <Modal title="Record details" onClose={() => setSelected(null)}>
          <div className="ad-finance-detail-card">
            <dl>
              {Object.entries(selected)
                .filter(([key]) => !key.toLowerCase().includes("secret"))
                .map(([key, value]) => (
                  <div key={key}>
                    <dt>{key}</dt>
                    <dd>
                      {typeof value === "object"
                        ? JSON.stringify(value)
                        : String(value)}
                    </dd>
                  </div>
                ))}
            </dl>
          </div>
        </Modal>
      )}
    </Panel>
  );
}
export default function FinanceViews({ kind, data }) {
  const payments = data.payments || [],
    allocations = data.allocations || [],
    settlements = data.settlements || [],
    refunds = data.refunds || [];
  const sum = (rows) =>
    rows.reduce((n, r) => n + Number(r.amountMinor || 0), 0);
  const stats = [
    ["Total payments", payments.length],
    [
      "Successful payments",
      payments.filter((p) => p.status === "captured").length,
    ],
    ["Failed payments", payments.filter((p) => p.status === "failed").length],
    ["Pending payments", payments.filter((p) => p.status === "pending").length],
    [
      "Manufacturer allocation",
      usd(
        sum(
          allocations.filter(
            (a) =>
              data.beneficiaries.find((b) => b.id === a.beneficiaryId)?.type ===
              "manufacturer",
          ),
        ),
      ),
    ],
    [
      "DoneDoc allocation",
      usd(
        sum(
          allocations.filter(
            (a) =>
              data.beneficiaries.find((b) => b.id === a.beneficiaryId)?.type ===
              "distributor",
          ),
        ),
      ),
    ],
    [
      "Franchise allocation",
      usd(
        sum(
          allocations.filter(
            (a) =>
              data.beneficiaries.find((b) => b.id === a.beneficiaryId)?.type ===
              "franchise",
          ),
        ),
      ),
    ],
    [
      "Pending settlements",
      settlements.filter((s) => s.status === "pending").length,
    ],
    [
      "Completed settlements",
      settlements.filter((s) => s.status === "completed").length,
    ],
    [
      "Refund amount",
      usd(sum(refunds.filter((r) => r.providerStatus === "confirmed"))),
    ],
    [
      "Outstanding recovery",
      usd(sum(refunds.filter((r) => r.recoveryStatus !== "completed"))),
    ],
  ];
  const paymentCols = [
    { key: "id", label: "Transaction ID", format: short },
    { key: "orderId", label: "Order", format: short },
    { key: "amountMinor", label: "Amount", format: usd },
    { key: "currency", label: "Currency" },
    { key: "status", label: "Status" },
    { key: "providerReference", label: "Provider ref", format: short },
    {
      key: "createdAt",
      label: "Created",
      format: (v) => (v ? new Date(v).toLocaleDateString() : "—"),
    },
  ];
  if (kind === "overview" || kind === "reports")
    return (
      <>
        <div className="ad-finance-stats">
          {stats.map(([label, value]) => (
            <div className="ad-panel ad-finance-stat" key={label}>
              <span>{label}</span>
              <strong>{value}</strong>
            </div>
          ))}
        </div>
        <Ledger
          title="Recent transactions"
          rows={payments}
          columns={paymentCols}
          empty="No verified payments have been recorded."
        />
      </>
    );
  if (kind === "transactions")
    return (
      <Ledger
        title="Customer transactions"
        rows={payments}
        columns={paymentCols}
        empty="No verified transactions. The checkout is still simulated."
      />
    );
  if (kind === "settlements")
    return (
      <Ledger
        title="Beneficiary settlements"
        rows={settlements}
        columns={[
          { key: "id", label: "Settlement ID", format: short },
          { key: "beneficiaryId", label: "Beneficiary", format: short },
          { key: "amountMinor", label: "Amount", format: usd },
          { key: "currency", label: "Currency" },
          { key: "status", label: "Status" },
          { key: "providerReference", label: "Provider ref", format: short },
          {
            key: "createdAt",
            label: "Date",
            format: (v) => (v ? new Date(v).toLocaleDateString() : "—"),
          },
        ]}
        empty="No provider-confirmed settlements exist. Allocations are not payouts."
      />
    );
  if (kind === "refunds")
    return (
      <Ledger
        title="Customer refunds"
        rows={refunds}
        columns={[
          { key: "id", label: "Refund ID", format: short },
          { key: "orderId", label: "Order", format: short },
          { key: "amountMinor", label: "Amount", format: usd },
          { key: "reason", label: "Reason" },
          { key: "status", label: "Approval" },
          { key: "providerStatus", label: "Customer refund" },
          { key: "recoveryStatus", label: "Beneficiary recovery" },
        ]}
        empty="No refund requests. Refund execution requires a connected provider."
      />
    );
  return null;
}
