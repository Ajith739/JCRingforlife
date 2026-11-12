export const orderTransitions = {
    pending: ["confirmed", "cancelled"],
    confirmed: ["processing", "cancelled"],
    processing: ["shipped", "cancelled"],
    shipped: ["delivered"],
    delivered: [],
    cancelled: [],
};
export const preorderTransitions = {
    reserved: ["sizing", "confirmed", "cancelled"],
    sizing: ["confirmed", "cancelled"],
    confirmed: ["converted", "cancelled"],
    converted: [],
    cancelled: [],
};
export function canTransition(kind, from, to) {
    return ((kind === "preorders" ? preorderTransitions : orderTransitions)[from]?.includes(to) || false);
}
