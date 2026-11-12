export const orderTransitions: Record<string, string[]> = {
  pending: ["confirmed", "cancelled"],
  confirmed: ["processing", "cancelled"],
  processing: ["shipped", "cancelled"],
  shipped: ["delivered"],
  delivered: [],
  cancelled: [],
};
export const preorderTransitions: Record<string, string[]> = {
  reserved: ["sizing", "confirmed", "cancelled"],
  sizing: ["confirmed", "cancelled"],
  confirmed: ["converted", "cancelled"],
  converted: [],
  cancelled: [],
};
export function canTransition(kind: string, from: string, to: string) {
  return (
    (kind === "preorders" ? preorderTransitions : orderTransitions)[
      from
    ]?.includes(to) || false
  );
}
