const storefrontRoutes = new Set([
  "/",
  "/shop",
  "/ring",
  "/size-chart",
  "/faq",
  "/preorder",
  "/partners",
  "/support",
  "/contact",
  "/smart-ring-guide",
  "/smart-ring-guide/sleep-tracking-ring",
  "/smart-ring-guide/recovery-ring",
  "/smart-ring-guide/stress-tracking-ring",
  "/app",
  "/social-embeds",
  "/checkout",
  "/privacy-policy",
  "/cookie-policy",
  "/cis-policy",
  "/terms-of-service",
  "/accessibility",
  "/trademarks",
  "/delete-account",
]);
const publicRoutes = new Set([
  "/login",
  "/logout",
  "/forgot-password",
  "/reset-password",
  "/verify-email",
  "/lock-screen",
  "/coming-soon",
  "/maintenance",
  "/403",
  "/404",
  "/500",
]);
export function routeStatus(path: string) {
  const normalized = path.length > 1 ? path.replace(/\/$/, "") : path;
  if (["/403", "/404", "/500"].includes(normalized))
    return Number(normalized.slice(1));
  if (normalized === "/maintenance") return 503;
  const admin =
    /^\/admin(?:\/(?:products|variants|inventory|payments|coupons|content|support|returns|staff|audit|settings|reports\/(?:sales|inventory|customers)|(?:orders|preorders|customers)(?:\/[^/]+)?))?$/.test(
      normalized,
    );
  return storefrontRoutes.has(normalized) ||
    publicRoutes.has(normalized) ||
    admin
    ? 200
    : 404;
}
