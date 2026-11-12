import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { Empty } from "./UI";
const tooltip = {
  background: "var(--ad-surface)",
  border: "1px solid var(--ad-border)",
  borderRadius: 6,
  fontSize: 12,
  color: "var(--ad-text)",
};
export const chartColors = [
  "#3874ff",
  "#85a9ff",
  "#25b09b",
  "#e7b18b",
  "#adb5c9",
];
export function SalesChart({
  data,
  metric = "revenue",
}: {
  data: any[];
  metric?: string;
}) {
  return (
    <div
      className="ad-chart"
      role="img"
      aria-label={`Daily ${metric} chart for the selected range`}
    >
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart
          data={data}
          margin={{ top: 15, right: 15, bottom: 0, left: 0 }}
        >
          <defs>
            <linearGradient id="aionSalesFill" x1="0" x2="0" y1="0" y2="1">
              <stop offset="0%" stopColor="#3874ff" stopOpacity={0.16} />
              <stop offset="100%" stopColor="#3874ff" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid
            stroke="var(--ad-border)"
            strokeDasharray="3 5"
            vertical={false}
          />
          <XAxis
            dataKey="label"
            tick={{ fontSize: 11, fill: "var(--ad-muted)" }}
            tickLine={false}
            axisLine={false}
            minTickGap={35}
            dy={8}
          />
          <YAxis
            tick={{ fontSize: 11, fill: "var(--ad-muted)" }}
            axisLine={false}
            tickLine={false}
            width={52}
            tickFormatter={(v) =>
              metric === "revenue" ? `$${v >= 1000 ? v / 1000 + "k" : v}` : v
            }
          />
          <Tooltip
            contentStyle={tooltip}
            formatter={(v: any) =>
              metric === "revenue" ? `$${Number(v).toLocaleString()}` : v
            }
          />
          <Area
            isAnimationActive={false}
            name={metric === "revenue" ? "Revenue" : "Orders"}
            type="monotone"
            dataKey={metric}
            stroke="#3874ff"
            strokeWidth={2.5}
            fill="url(#aionSalesFill)"
            activeDot={{ r: 5, strokeWidth: 3, stroke: "var(--ad-surface)" }}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
export function Donut({
  data,
  label = "Orders",
}: {
  data: { name: string; value: number }[];
  label?: string;
}) {
  const total = data.reduce((s, d) => s + d.value, 0);
  if (!total)
    return (
      <Empty
        title="No orders in this period"
        message="Select a different date range."
      />
    );
  return (
    <div className="ad-donut-wrap">
      <div
        className="ad-donut"
        role="img"
        aria-label={data.map((d) => `${d.name}: ${d.value}`).join(", ")}
      >
        <ResponsiveContainer>
          <PieChart>
            <Pie
              isAnimationActive={false}
              data={data}
              dataKey="value"
              innerRadius="70%"
              outerRadius="93%"
              paddingAngle={3}
              stroke="none"
            >
              {data.map((_, i) => (
                <Cell key={i} fill={chartColors[i % chartColors.length]} />
              ))}
            </Pie>
            <Tooltip contentStyle={tooltip} />
          </PieChart>
        </ResponsiveContainer>
        <div className="ad-donut-center">
          <strong>{total}</strong>
          <span>{label}</span>
        </div>
      </div>
      <div className="ad-chart-legend">
        {data.map((d, i) => (
          <div key={d.name}>
            <span>
              <i style={{ background: chartColors[i % chartColors.length] }} />
              {d.name.replaceAll("_", " ")}
            </span>
            <strong>
              {d.value}
              <small>{Math.round((d.value / total) * 100)}%</small>
            </strong>
          </div>
        ))}
      </div>
    </div>
  );
}
export function DistributionChart({
  data,
}: {
  data: { name: string; value: number }[];
}) {
  return (
    <div
      className="ad-chart"
      role="img"
      aria-label={data.map((d) => `${d.name}: ${d.value}`).join(", ")}
    >
      <ResponsiveContainer>
        <BarChart data={data}>
          <CartesianGrid
            vertical={false}
            stroke="var(--ad-border)"
            strokeDasharray="3 5"
          />
          <XAxis
            dataKey="name"
            tick={{ fontSize: 11, fill: "var(--ad-muted)" }}
            axisLine={false}
            tickLine={false}
          />
          <YAxis
            tick={{ fontSize: 11, fill: "var(--ad-muted)" }}
            axisLine={false}
            tickLine={false}
          />
          <Tooltip contentStyle={tooltip} />
          <Bar
            isAnimationActive={false}
            dataKey="value"
            name="Units"
            fill="#3874ff"
            radius={[4, 4, 0, 0]}
            maxBarSize={34}
          />
          <Legend />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
