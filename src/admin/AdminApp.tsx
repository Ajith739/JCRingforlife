import { lazy, Suspense, type ReactNode } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import { ThemeProvider } from "./components/Theme";
import { ToastProvider, ErrorState, Loading } from "./components/UI";
import { useSession } from "./services/api";
import "./styles.css";
const Layout = lazy(() => import("./layouts/AdminLayout"));
const Dashboard = lazy(() => import("./features/Dashboard"));
const Catalog = lazy(() => import("./features/Catalog"));
const Orders = lazy(() => import("./features/Orders"));
const Customers = lazy(() => import("./features/Customers"));
const Inventory = lazy(() => import("./features/Inventory"));
const Resources = lazy(() => import("./features/Resources"));
const Reports = lazy(() => import("./features/Reports"));
const Settings = lazy(() => import("./features/Settings"));
const Auth = lazy(() => import("./features/Auth"));
const Utility = lazy(() => import("./features/Utility"));
const qc = new QueryClient({
  defaultOptions: { queries: { retry: 1, refetchOnWindowFocus: false } },
});
function Protected({ children }: { children: ReactNode }) {
  const { data, isLoading, error, refetch } = useSession();
  const location = useLocation();
  if (isLoading) return <Loading />;
  if (error) return <ErrorState error={error} retry={() => refetch()} />;
  if (!data?.user)
    return (
      <Navigate
        to={`/login?redirect=${encodeURIComponent(location.pathname + location.search)}`}
        replace
      />
    );
  if (data.locked) return <Navigate to="/lock-screen" replace />;
  return children;
}
export default function AdminApp() {
  return (
    <div className="aion-admin">
      <ThemeProvider>
        <QueryClientProvider client={qc}>
          <ToastProvider>
            <Suspense fallback={<Loading />}>
              <Routes>
                <Route
                  path="/admin"
                  element={
                    <Protected>
                      <Layout />
                    </Protected>
                  }
                >
                  <Route index element={<Dashboard />} />
                  <Route
                    path="products"
                    element={<Catalog kind="products" />}
                  />
                  <Route
                    path="variants"
                    element={<Catalog kind="variants" />}
                  />
                  <Route path="orders/*" element={<Orders kind="orders" />} />
                  <Route
                    path="preorders/*"
                    element={<Orders kind="preorders" />}
                  />
                  <Route path="customers/*" element={<Customers />} />
                  <Route path="inventory" element={<Inventory />} />
                  <Route
                    path="payments"
                    element={<Resources entity="payments" />}
                  />
                  <Route
                    path="coupons"
                    element={<Resources entity="coupons" />}
                  />
                  <Route
                    path="content"
                    element={<Resources entity="content" />}
                  />
                  <Route
                    path="support"
                    element={<Resources entity="support" />}
                  />
                  <Route
                    path="returns"
                    element={<Resources entity="returns" />}
                  />
                  <Route path="staff" element={<Resources entity="staff" />} />
                  <Route path="audit" element={<Resources entity="audit" />} />
                  <Route path="reports/:kind" element={<Reports />} />
                  <Route path="settings" element={<Settings />} />
                  <Route path="*" element={<Utility code="404" />} />
                </Route>
                {[
                  "login",
                  "forgot-password",
                  "reset-password",
                  "verify-email",
                  "lock-screen",
                  "logout",
                ].map((page) => (
                  <Route
                    key={page}
                    path={`/${page}`}
                    element={<Auth page={page} />}
                  />
                ))}
                {["coming-soon", "maintenance", "403", "404", "500"].map(
                  (code) => (
                    <Route
                      key={code}
                      path={`/${code}`}
                      element={<Utility code={code} />}
                    />
                  ),
                )}
                <Route path="*" element={<Utility code="404" />} />
              </Routes>
            </Suspense>
          </ToastProvider>
        </QueryClientProvider>
      </ThemeProvider>
    </div>
  );
}
