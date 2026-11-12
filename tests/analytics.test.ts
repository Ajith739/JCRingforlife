import { expect, it } from "vitest";
import { dailyData } from "../src/admin/analytics";
import type { RecordData } from "../src/admin/types";
it("includes the final year of a long custom range without fabricating revenue", () => {
  const rows: RecordData[] = [
    {
      id: "1",
      createdAt: "2024-01-01T12:00:00+05:30",
      paymentStatus: "paid",
      total: 149,
    },
    {
      id: "2",
      createdAt: "2026-11-12T12:00:00+05:30",
      paymentStatus: "paid",
      total: 298,
    },
    {
      id: "3",
      createdAt: "2026-11-12T13:00:00+05:30",
      paymentStatus: "pending",
      total: 149,
    },
  ];
  const data = dailyData(rows, {
    preset: "custom",
    start: "2024-01-01",
    end: "2026-11-12",
  });
  expect(data.length).toBeLessThanOrEqual(366);
  expect(data.reduce((s, d) => s + d.orders, 0)).toBe(3);
  expect(data.reduce((s, d) => s + d.revenue, 0)).toBe(447);
});
it("uses the local business day at the midnight boundary", () => {
  const data = dailyData(
    [
      {
        id: "1",
        createdAt: "2026-11-11T20:00:00Z",
        paymentStatus: "paid",
        total: 149,
      },
    ],
    { preset: "custom", start: "2026-11-12", end: "2026-11-12" },
  );
  expect(data[0].orders).toBe(1);
  expect(data[0].revenue).toBe(149);
});
