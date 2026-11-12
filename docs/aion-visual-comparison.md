# Visual comparison and evidence review

See [reference analysis](phoenix-reference-analysis.md) for observed versus independently designed behavior. This is a qualitative comparison supported by screenshots; no pixel-perfect match or percentage similarity is claimed.

| Area | Reference screenshot | Aion screenshot | Comparison |
|---|---|---|---|
| Desktop dashboard | [Phoenix overview](phoenix-evidence/phoenix-overview.png) | [Aion 1440](phoenix-evidence/aion-overview-1440.png) | Same fixed header/sidebar geometry, cool gray canvas, compact typography, blue chart/control language. Aion adds ring-specific KPIs and replaces unrelated review/region modules. |
| Products | [Phoenix products](phoenix-evidence/phoenix-products.png) | [Aion products](phoenix-evidence/aion-products-1440.png) | Breadcrumbs/title, counted tabs, filter/search/action row, uppercase sortable table headings, image/name cells and pagination retained. Aion uses simpler product/stock/status columns and a bordered table surface. |
| Orders | [Phoenix orders](phoenix-evidence/phoenix-orders.png) | [Aion orders](phoenix-evidence/aion-orders-1440.png) | Similar density, tabs, badges and controls; order data and statuses are Aion-specific. |
| Customers | [Phoenix customers](phoenix-evidence/phoenix-customers.png) | [Aion customers](phoenix-evidence/aion-customers-1440.png) | Compact profile cells, information columns and table rhythm; original Aion customer history and privacy-aware exports. |
| Login | [Phoenix split login](phoenix-evidence/phoenix-login.png) | [Aion login](phoenix-evidence/aion-login.png) | Compact centered right-side form, uppercase labels and blue primary control. Original existing ring imagery fills the artwork side, which did not load in the observed reference. Social login is intentionally omitted because no OAuth integration exists. |
| Error page | [Phoenix 404](phoenix-evidence/phoenix-404.png) | [Aion 404](phoenix-evidence/aion-404.png) | Layered blue numeral, explanatory copy, return action and side artwork. Ring orbit artwork is independently authored CSS rather than copying the ostrich asset. |
| Dark theme | [Phoenix dark](phoenix-evidence/phoenix-dark.png) | [Aion dark](phoenix-evidence/aion-overview-dark.png) | Near-black navy canvas, restrained surface borders, pale headings and blue accents; all table/dialog/form tokens follow the theme. |
| Laptop | [Phoenix 1024](phoenix-evidence/phoenix-1024.png) | [Aion 1024](phoenix-evidence/aion-overview-1024.png) | Full sidebar at laptop width; KPI/analytics regions adapt without global overflow. |
| Tablet | [Phoenix 768](phoenix-evidence/phoenix-768.png) | [Aion 768](phoenix-evidence/aion-overview-768.png) | Mobile navigation trigger replaces fixed sidebar; content uses available width. |
| Mobile | [Phoenix 390](phoenix-evidence/phoenix-390.png) | [Aion 390](phoenix-evidence/aion-overview-390.png), [products](phoenix-evidence/aion-products-390.png) | Single-column analytics, two-column KPIs, stacked attention cards, horizontally scrollable data tables and drawer navigation. |

The reference state screenshots have capture-timing limitations described in the analysis document. Actual implementation screenshots were regenerated after disabling chart entrance animations to avoid misleading partial charts. Aion's 72px collapsed navigation is an intentional accessibility/density adjustment to the observed 64px reference rail. Utility-page illustration content, modal flows, backend behavior and mobile search are independently designed.
