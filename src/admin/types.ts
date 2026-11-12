export type Entity =
  | "products"
  | "variants"
  | "orders"
  | "preorders"
  | "customers"
  | "inventory"
  | "coupons"
  | "content"
  | "support"
  | "returns"
  | "staff"
  | "audit";
export type Role = "admin" | "manager" | "support" | "viewer";
export interface User {
  id: string;
  name: string;
  email: string;
  role: Role;
  demo?: boolean;
}
export interface RecordData {
  id: string;
  createdAt: string;
  updatedAt?: string;
  [key: string]: any;
}
export interface StoreSettings {
  storeName: string;
  email: string;
  currency: string;
  shippingRate: number;
  lowStockThreshold: number;
  notifications: boolean;
  [key: string]: any;
}
export interface Session {
  user: User | null;
  locked?: boolean;
  csrf: string;
  demoAvailable: boolean;
  integrations: { payments: boolean; email: boolean; shipping: boolean };
}
export const finishes = ["Midnight", "Silver", "Rose Gold"] as const;
export const images: Record<string, string> = {
  Midnight: "/assets/ring-finish-midnight-DK6ZPSTf.png",
  Silver: "/assets/ring-finish-silver-Xrc8Y54a.png",
  "Rose Gold": "/assets/ring-finish-rose-DTpoQDow.png",
};
