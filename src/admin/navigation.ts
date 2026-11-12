import {
  LayoutDashboard,
  ShoppingBag,
  Package,
  Layers3,
  Boxes,
  Users,
  CreditCard,
  Tag,
  PanelsTopLeft,
  LifeBuoy,
  RotateCcw,
  ChartNoAxesCombined,
  ClipboardList,
  UserRoundSearch,
  ShieldCheck,
  Settings,
  ScrollText,
  CalendarClock,
} from "lucide-react";
export const navigation = [
  {
    label: "Dashboard",
    items: [{ label: "Overview", path: "/admin", icon: LayoutDashboard }],
  },
  {
    label: "E-Commerce",
    items: [
      { label: "Pre-Orders", path: "/admin/preorders", icon: CalendarClock },
      { label: "Orders", path: "/admin/orders", icon: ShoppingBag },
      { label: "Products", path: "/admin/products", icon: Package },
      { label: "Product Variants", path: "/admin/variants", icon: Layers3 },
      { label: "Inventory", path: "/admin/inventory", icon: Boxes },
      { label: "Customers", path: "/admin/customers", icon: Users },
      {
        label: "Payments & Refunds",
        path: "/admin/payments",
        icon: CreditCard,
      },
    ],
  },
  {
    label: "Marketing",
    items: [
      { label: "Promotions & Coupons", path: "/admin/coupons", icon: Tag },
      { label: "Website Content", path: "/admin/content", icon: PanelsTopLeft },
    ],
  },
  {
    label: "Customer Support",
    items: [
      { label: "Support Requests", path: "/admin/support", icon: LifeBuoy },
      {
        label: "Returns & Replacements",
        path: "/admin/returns",
        icon: RotateCcw,
      },
    ],
  },
  {
    label: "Reports",
    items: [
      {
        label: "Sales Analytics",
        path: "/admin/reports/sales",
        icon: ChartNoAxesCombined,
      },
      {
        label: "Inventory Reports",
        path: "/admin/reports/inventory",
        icon: ClipboardList,
      },
      {
        label: "Customer Analytics",
        path: "/admin/reports/customers",
        icon: UserRoundSearch,
      },
    ],
  },
  {
    label: "Administration",
    items: [
      { label: "Staff & Roles", path: "/admin/staff", icon: ShieldCheck },
      { label: "Settings", path: "/admin/settings", icon: Settings },
      { label: "Audit Logs", path: "/admin/audit", icon: ScrollText },
    ],
  },
];
export const navItems = navigation.flatMap((g) => g.items);
