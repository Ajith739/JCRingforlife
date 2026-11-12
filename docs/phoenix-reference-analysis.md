# Phoenix reference analysis

Reference: https://phoenix-react-alt.prium.me/ · observed 12 November 2026 through Chrome CDP at 127.0.0.1:9222. REA 4.0.1 confirmed. Implementation uses original React/CSS; no Phoenix source, bundles, illustrations, or logos have been copied into application assets. Evidence is retained for review, not served by the website.

## Evidence method and limitations

`rea --version`, `rea --help`, and `/json/version` were verified first. The observer environment set `REA_BROWSER_OBSERVE_ENABLED=true`, the loopback endpoint allowlist, and the exact Phoenix origin. `rea list-browser-targets` selected target `70DB70336A203952FEA8C6E1CDC26883`. `inspect-web-page --include-accessibility-text --json` and `capture-web-screenshot --json` captured the initial dashboard. Screens were subsequently navigated individually using CDP and inspected with REA. No unsupported `--approved` option was used. Bundle analysis was unnecessary: visible DOM, computed style, accessibility, and screenshots supplied the design evidence without extracting proprietary implementation.

The `phoenix-*-rea.json` files contain full REA envelopes, evidence IDs, policy filters, and observation limitations. `phoenix-*-visible.json` records visible text, form controls and computed styles; PNG files record visual appearance. Some CDN images did not render in the reference (notably login artwork and product thumbnails); these gaps are not interpreted as intentional blank design. Some state captures occurred before asynchronous content settled; the collapsed-state geometry is useful, but its missing body content is not evidence of normal navigation behavior. Reference backend actions, credential acceptance, email delivery, and financial operations were not tested.

## Observed design

- Fixed white header: 64px. Full sidebar: 254px. Collapsed sidebar measured 64px; Aion uses 72px for comfortable icon targets (intentional variation).
- Main light background: `rgb(245,247,250)` / `#f5f7fa`; white navigation and table surfaces; fine gray-blue borders.
- Nunito Sans, 16px document base; header search and table/navigation copy approximately 12.8px. Dashboard title measured 31.02px, section heading 24.9px. Aion uses 30px titles, 12px navigation, and 19px card headings to accommodate its additional commerce content.
- Heading `#141824`, body `#31374a`, primary blue near `#3874ff`; dark background observed `#0f111a`, dark body text `#9fa6bc`.
- Main horizontal content inset about 40px. Tight navigation rows, uppercase muted group labels, thin icon strokes, outlined compact inputs, small status badges, modest 4–8px corner radii.
- Product list: breadcrumbs/title, counted tabs, search/category/filter controls, export/add actions, checkbox selection, sortable uppercase column headings, image/name cells, row actions, and footer pagination.
- Dashboard: attention summaries, total-sales chart with a date control, additional metrics and tables. The Aion composition adds bordered KPI cards, finish popularity, order status and recent activity.
- Authentication: centered compact form controls on a split page, uppercase labels, remember-me/forgot link, blue primary action; separate simple reset and lock layouts.
- Error pages: oversized blue layered numbers, concise explanation, side illustration, blue return button. Aion uses original CSS ring artwork instead of Phoenix's ostrich illustration.

## Evidence table

Paths below are relative to `docs/phoenix-evidence/`.

| Feature | Source page | Evidence | Confidence | Aion implementation |
|---|---|---|---|---|
| Dashboard geometry, summaries, chart | `/` | `phoenix-overview.json`, `phoenix-overview.png`, `phoenix-links-styles.json` | High | Fixed shell, attention row, sales chart and date filter |
| Full sidebar and groups | `/` | Initial REA DOM and PNG | High | Commerce-only flat Aion menu groups |
| Collapsed sidebar | `/` | `phoenix-collapsed.png`, `phoenix-collapsed-visible.json` | Medium; asynchronous content incomplete | Persistent 72px icon rail |
| Header search | `/` | Initial REA, `phoenix-search.png` | Medium; exact results not fully verified | Keyboard shortcut and page navigation search; independent behavior |
| Notifications/profile controls | `/` | Initial screenshot and `phoenix-controls.json` | High for placement; menu actions unverified | Original account menu and API-derived stock/reservation alerts |
| Light/dark control | `/` | `phoenix-dark.png`, `phoenix-dark-visible.json` | High for dark background/theme switch | Persistent light/dark/system preference |
| Responsive shell | `/` | `phoenix-1024.png`, `phoenix-768.png`, `phoenix-390.png` | Medium; loading timing limitations | Drawer below 992px; independent interaction implementation |
| Product list | `/apps/e-commerce/admin/products` | `phoenix-products.png`, `phoenix-products-rea.json`, `phoenix-products-visible.json` | High | Product/variant tables, tabs, filtering, export, edit/delete |
| Add-product form | `/apps/e-commerce/admin/add-product` | `phoenix-add-product.*`, `phoenix-add-product-rea.json` | High | Validated product editor; original modal presentation |
| Orders | `/apps/e-commerce/admin/orders` | `phoenix-orders.png`, `phoenix-orders-rea.json` | High | Search, payment/status filters, sort and pagination |
| Order details | `/apps/e-commerce/admin/order-details` | `phoenix-order-details.png`, `phoenix-order-details-rea.json` | High | Items, totals, customer/shipping cards, notes and timeline |
| Customer directory | `/apps/e-commerce/admin/customers` | `phoenix-customers.png`, `phoenix-customers-rea.json` | High | Searchable directory with customer profiles |
| Customer detail | `/apps/e-commerce/admin/customer-details` | `phoenix-customer-details.png`, `phoenix-customer-details-rea.json` | High | Profile, order/pre-order history and notes |
| Split login | `/pages/authentication/split/sign-in` | `phoenix-login.png`, `phoenix-login-rea.json` | High for form; artwork unavailable | Original ring artwork, Aion branding, backend sign-in |
| Forgot password | `/pages/authentication/simple/forgot-password` | `phoenix-forgot-password.png`, matching REA JSON | High | Reset request with configured email webhook |
| Reset password | `/pages/authentication/simple/reset-password` | `phoenix-reset-password.png`, matching REA JSON | High | Token validation, password rules and confirmation |
| Lock screen | `/pages/authentication/simple/lock-screen` | `phoenix-lock-screen.png`, matching REA JSON | High | Server-locked session and password reauthentication |
| Forbidden | `/pages/errors/403` | `phoenix-403.png`, matching REA JSON | High | Branded 403 with original ring illustration |
| Missing page | `/pages/errors/404` | `phoenix-404.png`, matching REA JSON | High | Layered blue 404 and working navigation |
| Server error | `/pages/errors/500` | `phoenix-500.png`, matching REA JSON | High | Original 500, retry and return actions |
| Coming soon | `/pages/coming-soon` | `phoenix-coming-soon.png`, matching REA JSON | High | Aion announcement without invented launch countdown |
| Maintenance | No verified reference route identified | None | Unobserved | Independent utility composition using observed Phoenix tokens |
| Modal validation / loading / empty states | Not exhaustively exercised in reference | Limited visible controls only | Unobserved behavior | Original accessible dialogs, server validation, skeletons and empty/error states |

## Independent decisions

No reference behavior is claimed for backend status transitions, permissions, CSRF, exports, stock rules, persistent settings, password recovery, or Aion-specific modules. These were designed for the task. Payment, shipping-provider, live storefront and transactional email integrations are separate operational concerns, documented in `aion-admin-delivery.md`.
