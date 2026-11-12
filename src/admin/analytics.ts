import type { Range } from "./components/DateFilter";
import type { RecordData } from "./types";
/** Daily for typical ranges; bounded buckets preserve the entire custom range. */
export function dailyData(orders: RecordData[], range: Range) {
  const start = Date.parse(`${range.start}T00:00:00+05:30`),
    end = Date.parse(`${range.end}T23:59:59+05:30`);
  if (!Number.isFinite(start) || !Number.isFinite(end) || end < start)
    return [];
  const dayMs = 86400000,
    days = Math.ceil((end - start) / dayMs),
    step = Math.max(1, Math.ceil(days / 366));
  const formatter = new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    timeZone: "Asia/Kolkata",
  });
  const buckets = Array.from({ length: Math.ceil(days / step) }, (_, i) => ({
    label: formatter.format(new Date(start + i * step * dayMs)),
    revenue: 0,
    orders: 0,
  }));
  for (const order of orders) {
    const time = Date.parse(order.createdAt);
    if (time < start || time > end) continue;
    const bucket = buckets[Math.floor((time - start) / (step * dayMs))];
    if (!bucket) continue;
    bucket.orders++;
    if (order.paymentStatus === "paid") bucket.revenue += order.total;
  }
  return buckets;
}
