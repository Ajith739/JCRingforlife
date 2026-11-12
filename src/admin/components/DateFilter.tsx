import { CalendarDays } from "lucide-react";
export interface Range {
  preset: string;
  start: string;
  end: string;
}
const day = (value: Date) =>
  new Intl.DateTimeFormat("en-CA", {
    timeZone: "Asia/Kolkata",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(value);
export function initialRange(): Range {
  const end = new Date(),
    start = new Date(end);
  start.setDate(end.getDate() - 29);
  return { preset: "30", start: day(start), end: day(end) };
}
export function inRange(createdAt: string, range: Range) {
  const date = day(new Date(createdAt));
  return date >= range.start && date <= range.end;
}
export function DateFilter({
  value,
  onChange,
}: {
  value: Range;
  onChange: (v: Range) => void;
}) {
  const change = (preset: string) => {
    const end = new Date(),
      start = new Date(end);
    if (preset === "7") start.setDate(end.getDate() - 6);
    if (preset === "30") start.setDate(end.getDate() - 29);
    if (preset === "month") start.setDate(1);
    onChange({ preset, start: day(start), end: day(end) });
  };
  return (
    <div className="ad-date-filter">
      <CalendarDays size={16} />
      <select
        aria-label="Date range"
        value={value.preset}
        onChange={(e) => change(e.target.value)}
      >
        <option value="today">Today</option>
        <option value="7">Last 7 days</option>
        <option value="30">Last 30 days</option>
        <option value="month">This month</option>
        <option value="custom">Custom range</option>
      </select>
      {value.preset === "custom" && (
        <div className="ad-custom-dates">
          <input
            aria-label="Start date"
            type="date"
            value={value.start}
            max={value.end}
            onChange={(e) => onChange({ ...value, start: e.target.value })}
          />
          <span>to</span>
          <input
            aria-label="End date"
            type="date"
            value={value.end}
            min={value.start}
            onChange={(e) => onChange({ ...value, end: e.target.value })}
          />
        </div>
      )}
    </div>
  );
}
