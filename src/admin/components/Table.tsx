import { useMemo, useState, type ReactNode } from "react";
import {
  ArrowDown,
  ArrowUp,
  ChevronsUpDown,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import type { RecordData } from "../types";
import { Empty } from "./UI";
export interface Column {
  key: string;
  label: string;
  render?: (row: RecordData) => ReactNode;
  sortable?: boolean;
  className?: string;
  value?: (row: RecordData) => any;
}
export function DataTable({
  rows,
  columns,
  selectable = false,
  selected = [],
  onSelect,
  onRow,
  emptyTitle,
}: {
  rows: RecordData[];
  columns: Column[];
  selectable?: boolean;
  selected?: string[];
  onSelect?: (ids: string[]) => void;
  onRow?: (r: RecordData) => void;
  emptyTitle?: string;
}) {
  const [sort, setSort] = useState({ key: "createdAt", dir: -1 });
  const [page, setPage] = useState(1);
  const [size, setSize] = useState(10);
  const sorted = useMemo(
    () =>
      [...rows].sort((a, b) => {
        const col = columns.find((c) => c.key === sort.key);
        const av = col?.value ? col.value(a) : a[sort.key],
          bv = col?.value ? col.value(b) : b[sort.key];
        return (
          (typeof av === "number" && typeof bv === "number"
            ? av - bv
            : String(av ?? "").localeCompare(String(bv ?? ""))) * sort.dir
        );
      }),
    [rows, sort, columns],
  );
  const max = Math.max(1, Math.ceil(rows.length / size)),
    current = Math.min(page, max),
    visible = sorted.slice((current - 1) * size, current * size);
  const all =
    visible.length > 0 && visible.every((r) => selected.includes(r.id));
  const toggleAll = () =>
    onSelect?.(
      all
        ? selected.filter((id) => !visible.some((r) => r.id === id))
        : [...new Set([...selected, ...visible.map((r) => r.id)])],
    );
  return (
    <div className="ad-table-container">
      <div className="ad-table-scroll">
        <table className="ad-table">
          <thead>
            <tr>
              {selectable && (
                <th className="ad-checkbox-cell">
                  <input
                    type="checkbox"
                    aria-label="Select all visible rows"
                    checked={all}
                    onChange={toggleAll}
                  />
                </th>
              )}
              {columns.map((col) => (
                <th
                  key={col.key}
                  className={col.className}
                  aria-sort={
                    sort.key === col.key
                      ? sort.dir === 1
                        ? "ascending"
                        : "descending"
                      : undefined
                  }
                >
                  {col.sortable !== false ? (
                    <button
                      onClick={() =>
                        setSort({
                          key: col.key,
                          dir: sort.key === col.key ? -sort.dir : 1,
                        })
                      }
                    >
                      {col.label}
                      {sort.key === col.key ? (
                        sort.dir === 1 ? (
                          <ArrowUp size={12} />
                        ) : (
                          <ArrowDown size={12} />
                        )
                      ) : (
                        <ChevronsUpDown size={11} />
                      )}
                    </button>
                  ) : (
                    col.label
                  )}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {visible.map((row) => (
              <tr
                key={row.id}
                className={selected.includes(row.id) ? "selected" : ""}
              >
                {selectable && (
                  <td>
                    <input
                      type="checkbox"
                      aria-label={`Select ${row.name || row.id}`}
                      checked={selected.includes(row.id)}
                      onChange={() =>
                        onSelect?.(
                          selected.includes(row.id)
                            ? selected.filter((id) => id !== row.id)
                            : [...selected, row.id],
                        )
                      }
                    />
                  </td>
                )}
                {columns.map((col, i) => (
                  <td key={col.key} className={col.className}>
                    {onRow && i === 0 ? (
                      <button
                        className="ad-table-link"
                        onClick={() => onRow(row)}
                      >
                        {col.render ? col.render(row) : (row[col.key] ?? "—")}
                      </button>
                    ) : col.render ? (
                      col.render(row)
                    ) : (
                      (row[col.key] ?? "—")
                    )}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
        {!rows.length && (
          <Empty
            title={emptyTitle || "No matching records"}
            message="Try a different search or add your first record."
          />
        )}
      </div>
      <div className="ad-pagination">
        <span>
          {rows.length
            ? `${(current - 1) * size + 1} to ${Math.min(current * size, rows.length)}`
            : "0"}{" "}
          of {rows.length} records
        </span>
        <div>
          <label>
            Rows{" "}
            <select
              value={size}
              onChange={(e) => {
                setSize(Number(e.target.value));
                setPage(1);
              }}
            >
              {[10, 25, 50].map((n) => (
                <option key={n}>{n}</option>
              ))}
            </select>
          </label>
          <button
            className="ad-icon-btn"
            aria-label="Previous page"
            disabled={current === 1}
            onClick={() => setPage(current - 1)}
          >
            <ChevronLeft size={16} />
          </button>
          {Array.from({ length: Math.min(max, 5) }, (_, i) => {
            const n =
              max <= 5
                ? i + 1
                : Math.max(1, Math.min(current - 2, max - 4)) + i;
            return (
              <button
                key={n}
                aria-label={`Page ${n}`}
                aria-current={current === n ? "page" : undefined}
                className={`ad-page-number ${current === n ? "active" : ""}`}
                onClick={() => setPage(n)}
              >
                {n}
              </button>
            );
          })}
          <button
            className="ad-icon-btn"
            aria-label="Next page"
            disabled={current === max}
            onClick={() => setPage(current + 1)}
          >
            <ChevronRight size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}
