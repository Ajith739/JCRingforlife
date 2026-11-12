# UI fixes

Existing Phoenix-style finance/partner pages and Light default are preserved. Finance ledgers now support sortable columns and a from-date filter alongside search, status and pagination. Detail views use the shared accessible modal with Escape, focus containment and restoration. Shared columns remain horizontally scrollable on mobile. Production administration has a separate entry, so the storefront page layout and global utility CSS need not load on admin entry pages.

Manufacturers, DoneDoc distributors and franchise owners continue to use the common beneficiary directory with add/edit/contact/territory controls. Current UI does not provide complete provider onboarding, partner-specific order/settlement detail workflows or live financial reporting charts. These remain follow-up work, not verified production features. Existing empty financial ledgers are displayed honestly; no sample payments were promoted to real data.

Visual inspection of the 390px split editor found missing panel padding; finance panels now use consistent 18/24px padding, section spacing, aligned preview rows and styled beneficiary actions. Feature styling is isolated in `backend/admin/src/features/finance.css`.
