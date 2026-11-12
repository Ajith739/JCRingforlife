import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  Archive,
  ArrowRight,
  ImageIcon,
  Pencil,
  Plus,
  Trash2,
} from "lucide-react";
import { useQueryClient } from "@tanstack/react-query";
import {
  api,
  useRecords,
  useSave,
  money,
  date,
  exportCsv,
} from "../services/api";
import {
  Badge,
  Confirm,
  Empty,
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
import { finishes, images, type RecordData } from "../types";
export default function Catalog({ kind }: { kind: "products" | "variants" }) {
  const q = useRecords(kind),
    productsQ = useRecords("products"),
    variantsQ = useRecords("variants");
  const save = useSave(kind),
    qc = useQueryClient(),
    toast = useToast(),
    navigate = useNavigate(),
    location = useLocation();
  const [search, setSearch] = useState(""),
    [status, setStatus] = useState("all"),
    [category, setCategory] = useState("all"),
    [finish, setFinish] = useState("all"),
    [selected, setSelected] = useState<string[]>([]),
    [editor, setEditor] = useState<RecordData | null | undefined>(),
    [detail, setDetail] = useState<RecordData | null>(null),
    [deleting, setDeleting] = useState<RecordData | null>(null),
    [bulk, setBulk] = useState(false),
    [pending, setPending] = useState(false);
  const rows = q.data || [],
    products = productsQ.data || [];
  const isProducts = kind === "products";
  const title = isProducts ? "Products" : "Product variants";
  const openCreate = () => setEditor(null);
  const fields: Field[] = isProducts
    ? [
        { key: "name", label: "Product name", required: true },
        { key: "sku", label: "Product SKU", required: true },
        {
          key: "price",
          label: "Base price (USD)",
          type: "number",
          min: 0,
          step: "0.01",
          required: true,
        },
        {
          key: "category",
          label: "Category",
          required: true,
          default: "Smart rings",
        },
        {
          key: "status",
          label: "Status",
          options: options(["draft", "active", "archived"]),
        },
        {
          key: "image",
          label: "Image URL",
          hint: "Use /assets/… or an HTTPS image URL.",
        },
        {
          key: "description",
          label: "Description",
          type: "textarea",
          wide: true,
        },
      ]
    : [
        {
          key: "productId",
          label: "Parent product",
          required: true,
          options: products.map((p) => ({ value: p.id, label: p.name })),
        },
        { key: "sku", label: "Unique variant SKU", required: true },
        { key: "finish", label: "Finish", options: options([...finishes]) },
        {
          key: "size",
          label: "Ring size",
          type: "number",
          required: true,
          min: 6,
          max: 13,
          default: 6,
        },
        {
          key: "stock",
          label: "Initial stock",
          type: "number",
          min: 0,
          readOnly: !!editor,
          hint: editor
            ? "Use Inventory → Adjust stock to record stock movements."
            : undefined,
        },
        {
          key: "threshold",
          label: "Low-stock threshold",
          type: "number",
          min: 0,
          default: 10,
        },
        {
          key: "price",
          label: "Price override (USD)",
          type: "number",
          min: 0,
          step: "0.01",
          default: "",
          hint: "Leave blank to use the parent product price.",
        },
        {
          key: "status",
          label: "Availability",
          options: options(["available", "unavailable"]),
        },
        { key: "image", label: "Image URL", wide: true },
      ];
  const filtered = rows.filter((r) => {
    const name = isProducts
      ? r.name
      : products.find((p) => p.id === r.productId)?.name;
    return (
      `${name} ${r.sku} ${r.finish || ""} ${r.size || ""}`
        .toLowerCase()
        .includes(search.toLowerCase()) &&
      (status === "all" || r.status === status) &&
      (category === "all" || r.category === category) &&
      (finish === "all" || r.finish === finish)
    );
  });
  const variants = (id: string) =>
    variantsQ.data?.filter((v) => v.productId === id) || [];
  const columns: Column[] = isProducts
    ? [
        {
          key: "name",
          label: "Product name",
          render: (r) => (
            <span className="ad-product-cell">
              <span className="ad-product-thumb">
                {r.image ? (
                  <img
                    src={r.image}
                    alt=""
                    loading="lazy"
                    onError={(e) =>
                      (e.currentTarget.style.visibility = "hidden")
                    }
                  />
                ) : (
                  <ImageIcon size={18} />
                )}
              </span>
              <span>
                <strong>{r.name}</strong>
                <small>{r.sku}</small>
              </span>
            </span>
          ),
        },
        {
          key: "price",
          label: "Price",
          render: (r) => <strong>{money(r.price)}</strong>,
        },
        { key: "category", label: "Category" },
        {
          key: "variants",
          label: "Variants",
          value: (r) => variants(r.id).length,
          render: (r) => (
            <Link className="ad-link" to="/admin/variants">
              {variants(r.id).length} variants
            </Link>
          ),
        },
        {
          key: "stock",
          label: "Stock",
          value: (r) => variants(r.id).reduce((s, v) => s + v.stock, 0),
          render: (r) => (
            <span>{variants(r.id).reduce((s, v) => s + v.stock, 0)} units</span>
          ),
        },
        {
          key: "status",
          label: "Status",
          render: (r) => <Badge status={r.status} />,
        },
        {
          key: "createdAt",
          label: "Created",
          render: (r) => date(r.createdAt),
        },
      ]
    : [
        {
          key: "sku",
          label: "Variant / SKU",
          render: (r) => (
            <span className="ad-product-cell">
              <span className="ad-product-thumb">
                <img src={r.image || images[r.finish]} alt="" />
              </span>
              <span>
                <strong>{r.sku}</strong>
                <small>
                  {products.find((p) => p.id === r.productId)?.name}
                </small>
              </span>
            </span>
          ),
        },
        {
          key: "finish",
          label: "Finish",
          render: (r) => (
            <span className="ad-finish-swatch">
              <i
                style={{
                  background:
                    r.finish === "Midnight"
                      ? "#292c32"
                      : r.finish === "Silver"
                        ? "#bfc5cc"
                        : "#dca78d",
                }}
              />
              {r.finish}
            </span>
          ),
        },
        { key: "size", label: "Size" },
        {
          key: "price",
          label: "Price",
          value: (r) =>
            r.price === ""
              ? products.find((p) => p.id === r.productId)?.price
              : r.price,
          render: (r) =>
            money(
              r.price === ""
                ? products.find((p) => p.id === r.productId)?.price
                : r.price,
            ),
        },
        {
          key: "stock",
          label: "In stock",
          render: (r) => (
            <Badge
              status={
                r.stock === 0
                  ? "out of stock"
                  : r.stock <= r.threshold
                    ? "low stock"
                    : "active"
              }
            >
              {r.stock} units
            </Badge>
          ),
        },
        {
          key: "status",
          label: "Availability",
          render: (r) => <Badge status={r.status} />,
        },
      ];
  columns.push({
    key: "actions",
    label: "Actions",
    sortable: false,
    render: (r) => (
      <div className="ad-row-actions">
        <button
          className="ad-icon-btn"
          aria-label={`Edit ${r.name || r.sku}`}
          onClick={() => setEditor(r)}
        >
          <Pencil size={15} />
        </button>
        <button
          className="ad-icon-btn"
          aria-label={`Delete ${r.name || r.sku}`}
          onClick={() => setDeleting(r)}
        >
          <Trash2 size={15} />
        </button>
      </div>
    ),
  });
  if (q.isLoading) return <Loading />;
  if (q.error) return <ErrorState error={q.error} retry={() => q.refetch()} />;
  return (
    <>
      <PageHeader
        title={title}
        subtitle={
          isProducts
            ? "One thoughtful collection. Every detail in your hands."
            : "Three finishes. Eight sizes. The perfect fit for everyone."
        }
        actions={
          <>
            <ExportButton
              onClick={() => {
                if (!exportCsv(kind, filtered))
                  toast("No records to export", "error");
              }}
            />
            <button className="ad-btn ad-primary" onClick={openCreate}>
              <Plus size={16} />
              {isProducts ? "Add product" : "Add variant"}
            </button>
          </>
        }
      />
      <div className="ad-tabs">
        {[
          "all",
          ...(isProducts
            ? ["active", "draft", "archived"]
            : ["available", "unavailable"]),
        ].map((s) => (
          <button
            key={s}
            className={status === s ? "active" : ""}
            onClick={() => setStatus(s)}
          >
            {s[0].toUpperCase() + s.slice(1)}
            <span>
              {s === "all"
                ? rows.length
                : rows.filter((r) => r.status === s).length}
            </span>
          </button>
        ))}
      </div>
      <div className="ad-toolbar">
        <SearchField
          value={search}
          onChange={setSearch}
          placeholder={`Search ${kind}…`}
        />
        {isProducts ? (
          <select
            aria-label="Filter by category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="all">All categories</option>
            {[...new Set(rows.map((r) => r.category))].map((c) => (
              <option key={c}>{c}</option>
            ))}
          </select>
        ) : (
          <select
            aria-label="Filter by finish"
            value={finish}
            onChange={(e) => setFinish(e.target.value)}
          >
            <option value="all">All finishes</option>
            {finishes.map((f) => (
              <option key={f}>{f}</option>
            ))}
          </select>
        )}
        <span className="ad-toolbar-count">
          {filtered.length} {kind}
        </span>
        {selected.length > 0 && isProducts && (
          <button className="ad-btn" onClick={() => setBulk(true)}>
            <Archive size={15} />
            Archive {selected.length} selected
          </button>
        )}
      </div>
      <Panel>
        <DataTable
          rows={filtered}
          columns={columns}
          selectable
          selected={selected}
          onSelect={setSelected}
          onRow={(r) => setDetail(r)}
        />
      </Panel>
      {!isProducts && (
        <p className="ad-page-note">
          Each finish and size belongs to a parent product. Stock changes are
          tracked in{" "}
          <Link to="/admin/inventory">
            Inventory <ArrowRight size={12} />
          </Link>
          .
        </p>
      )}
      {editor !== undefined && (
        <RecordEditor
          title={`${editor ? "Edit" : "Add"} ${isProducts ? "product" : "variant"}`}
          fields={fields}
          record={editor}
          onClose={() => {
            setEditor(undefined);
            if (location.pathname.endsWith("/new")) navigate("/admin/products");
          }}
          onSave={async (data) => {
            await save.mutateAsync(data);
            toast(
              `${isProducts ? "Product" : "Variant"} ${editor ? "updated" : "created"}`,
            );
          }}
        />
      )}
      {detail && (
        <Modal
          title={detail.name || detail.sku}
          onClose={() => setDetail(null)}
          wide
        >
          <div className="ad-product-detail">
            <div className="ad-detail-image">
              <img
                src={detail.image || images[detail.finish] || images.Midnight}
                alt={detail.name || detail.finish}
              />
            </div>
            <div>
              <Badge status={detail.status} />
              <h3>{detail.name || `${detail.finish} · Size ${detail.size}`}</h3>
              <p>
                {detail.description ||
                  products.find((p) => p.id === detail.productId)?.description}
              </p>
              <strong className="ad-detail-price">
                {money(
                  detail.price === ""
                    ? products.find((p) => p.id === detail.productId)?.price
                    : detail.price,
                )}
              </strong>
              <dl>
                <dt>SKU</dt>
                <dd>{detail.sku}</dd>
                <dt>{isProducts ? "Variants" : "Stock"}</dt>
                <dd>
                  {isProducts ? variants(detail.id).length : detail.stock}
                </dd>
              </dl>
              <button
                className="ad-btn ad-primary"
                onClick={() => {
                  setEditor(detail);
                  setDetail(null);
                }}
              >
                <Pencil size={15} /> Edit details
              </button>
            </div>
          </div>
          {isProducts && (
            <div className="ad-detail-variants">
              <h3>Product variants</h3>
              {variants(detail.id).length ? (
                <div className="ad-variant-chips">
                  {variants(detail.id).map((v) => (
                    <Link to="/admin/variants" key={v.id}>
                      {v.finish} · {v.size}
                      <span>{v.stock} in stock</span>
                    </Link>
                  ))}
                </div>
              ) : (
                <Empty
                  title="No variants yet"
                  message="Add finishes and sizes for this product."
                  action={
                    <Link className="ad-btn" to="/admin/variants">
                      Manage variants
                    </Link>
                  }
                />
              )}
            </div>
          )}
        </Modal>
      )}
      {deleting && (
        <Confirm
          title="Delete this record?"
          message="This permanently removes the record. Records linked to orders or variants must be retained and will be protected."
          danger
          pending={pending}
          onClose={() => setDeleting(null)}
          onConfirm={async () => {
            setPending(true);
            try {
              await api(`/admin/data/${kind}/${deleting.id}`, {
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
      {bulk && (
        <Confirm
          title="Archive selected products?"
          message="Selected products will remain in your records with archived status."
          pending={pending}
          onClose={() => setBulk(false)}
          onConfirm={async () => {
            setPending(true);
            try {
              for (const id of selected) {
                const row = rows.find((r) => r.id === id);
                if (row) await save.mutateAsync({ ...row, status: "archived" });
              }
              setSelected([]);
              setBulk(false);
              toast("Selected products archived");
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
