import { test, expect, type Page } from "@playwright/test";
test("demo credentials work with every API request blocked", async ({ page }) => {
  let requests = 0;
  await page.route("**/api/**", async (route) => {
    requests++;
    await route.abort();
  });
  await page.goto("/login");
  await page.locator("input[name=email]").fill("admin@aionrings.demo");
  await page.locator("input[name=password]").fill("AionDemo2026!");
  await page.getByRole("button", { name: "Sign in", exact: true }).click();
  await expect(page.getByRole("heading", { name: "Ecommerce overview" })).toBeVisible();
  await page.goto("/admin/products");
  await expect(page.locator(".ad-error-state")).toHaveCount(0);
  expect(requests).toBe(0);
});
async function login(page: Page) {
  await page.goto("/login");
  await page
    .getByRole("button", { name: "Explore development workspace" })
    .click();
  await expect(
    page.getByRole("heading", { name: "Ecommerce overview" }),
  ).toBeVisible();
}
test("protected routes, login validation, reset errors, and public utilities", async ({
  page,
}) => {
  await page.goto("/admin/products");
  await expect(page).toHaveURL(/login/);
  await page.getByRole("button", { name: "Sign in", exact: true }).click();
  await expect(page.locator("input[name=email]:invalid")).toHaveCount(1);
  await page.locator("input[name=email]").fill("missing@example.test");
  await page.locator("input[name=password]").fill("IncorrectPassword42");
  await page.getByRole("button", { name: "Sign in", exact: true }).click();
  await expect(page.getByRole("alert")).toContainText("incorrect");
  await page.goto("/reset-password?token=invalid");
  await page
    .getByLabel("New password", { exact: true })
    .fill("LongSecurePass42");
  await page.getByLabel("Confirm password").fill("DifferentPassword42");
  await page
    .getByRole("button", { name: "Reset password", exact: true })
    .click();
  await expect(page.getByRole("alert")).toContainText("do not match");
  for (const path of ["403", "404", "500", "coming-soon", "maintenance"]) {
    await page.goto("/" + path);
    await expect(
      page.getByRole("link", { name: "Back to dashboard", exact: true }),
    ).toBeVisible();
    await page.screenshot({
      path: `docs/phoenix-evidence/aion-${path}.png`,
      fullPage: true,
    });
  }
});
test("navigation, themes, search, filters and every admin route", async ({
  page,
}) => {
  await login(page);
  await page.getByRole("button", { name: "Choose theme" }).click();
  await page.getByRole("button", { name: "Dark", exact: true }).click();
  await expect(page.locator(".aion-admin").first()).toHaveAttribute(
    "data-theme",
    "dark",
  );
  await page.reload();
  await expect(page.locator(".aion-admin").first()).toHaveAttribute(
    "data-theme",
    "dark",
  );
  await page.getByRole("button", { name: "Choose theme" }).click();
  await page.getByRole("button", { name: "Light", exact: true }).click();
  await page.getByRole("button", { name: "Collapse sidebar" }).click();
  await expect(page.locator(".ad-sidebar")).toHaveCSS("width", "72px");
  await page.getByRole("button", { name: "Expand sidebar" }).click();
  await page.getByLabel("Search workspace").fill("inventory");
  await expect(
    page
      .locator(".ad-search-results")
      .getByRole("link", { name: "Inventory", exact: true }),
  ).toBeVisible();
  await page.keyboard.press("Escape");
  const routes = [
    "products",
    "variants",
    "preorders",
    "orders",
    "inventory",
    "customers",
    "payments",
    "coupons",
    "content",
    "support",
    "returns",
    "reports/sales",
    "reports/inventory",
    "reports/customers",
    "staff",
    "settings",
    "audit",
  ];
  const errors: string[] = [];
  page.on("pageerror", (e) => errors.push(e.message));
  for (const route of routes) {
    await page.goto("/admin/" + route);
    await expect(page.locator("main h1")).toBeVisible();
    await expect(page.locator(".ad-error-state")).toHaveCount(0);
  }
  expect(errors).toEqual([]);
  await page.goto("/admin/products");
  await page.getByPlaceholder("Search products…").fill("not-existing-product");
  await expect(
    page.getByRole("heading", { name: "No matching records" }),
  ).toBeVisible();
});
test("product CRUD, variant management and inventory validation", async ({
  page,
}) => {
  await login(page);
  await page.goto("/admin/products");
  await page.getByRole("button", { name: "Add product", exact: true }).click();
  const dialog = page.getByRole("dialog");
  const suffix = Date.now();
  await dialog.getByLabel("Product name").fill("Browser test ring");
  await dialog.getByLabel("Product SKU").fill("BROWSER-" + suffix);
  await dialog.getByLabel("Base price").fill("159");
  await dialog.getByLabel("Category", { exact: true }).fill("Smart rings");
  await dialog.getByRole("button", { name: "Create record" }).click();
  await expect(dialog).not.toBeVisible();
  await page.getByPlaceholder("Search products…").fill("BROWSER-" + suffix);
  await expect(page.getByRole("table")).toContainText("Browser test ring");
  await page.getByRole("button", { name: "Edit Browser test ring" }).click();
  await page
    .getByRole("dialog")
    .getByLabel("Product name")
    .fill("Updated browser ring");
  await page
    .getByRole("dialog")
    .getByRole("button", { name: "Save changes" })
    .click();
  await expect(page.getByRole("table")).toContainText("Updated browser ring");
  await page
    .getByRole("button", { name: "Delete Updated browser ring" })
    .click();
  await page
    .getByRole("dialog")
    .getByRole("button", { name: "Confirm" })
    .click();
  await expect(
    page.getByRole("heading", { name: "No matching records" }),
  ).toBeVisible();
  await page.goto("/admin/inventory");
  await page.getByRole("button", { name: "Adjust stock" }).first().click();
  await page.getByRole("dialog").getByLabel("Change in units").fill("0");
  await page
    .getByRole("dialog")
    .getByLabel("Reason for adjustment")
    .fill("Browser test");
  await page
    .getByRole("dialog")
    .getByRole("button", { name: "Create record" })
    .click();
  await expect(page.getByRole("dialog").getByRole("alert")).toBeVisible();
  await page.getByRole("dialog").getByLabel("Change in units").fill("2");
  await page
    .getByRole("dialog")
    .getByRole("button", { name: "Create record" })
    .click();
  await expect(page.getByRole("dialog")).toHaveCount(0);
  await page.getByRole("button", { name: "Movement history" }).click();
  await expect(page.getByRole("table")).toContainText("Browser test");
});
test("manual order workflow, lock and logout", async ({ page }) => {
  await login(page);
  await page.goto("/admin/orders");
  await page.getByRole("button", { name: "Create order" }).click();
  await page
    .getByRole("dialog")
    .getByRole("button", { name: "Create record" })
    .click();
  await expect(
    page.getByRole("heading", { name: "Order items" }),
  ).toBeVisible();
  await page.getByLabel("Next order status").selectOption("confirmed");
  await page.getByRole("button", { name: "Update status" }).click();
  await page
    .getByRole("dialog")
    .getByRole("button", { name: "Confirm" })
    .click();
  await expect(page.locator(".ad-timeline")).toContainText(
    "pending to confirmed",
  );
  await page.getByRole("button", { name: "Account menu" }).click();
  await page.getByRole("button", { name: "Lock screen", exact: true }).click();
  await expect(page).toHaveURL(/lock-screen/);
  await page.getByRole("button", { name: "Unlock workspace" }).click();
  await expect(page).toHaveURL(/admin\/orders\//);
  await page.getByRole("button", { name: "Account menu" }).click();
  await page.getByRole("link", { name: "Sign out", exact: true }).click();
  await expect(page).toHaveURL(/login/);
  await page.goto("/admin");
  await expect(page).toHaveURL(/login/);
});
test("responsive screenshots and mobile navigation", async ({ page }) => {
  await login(page);
  await page.evaluate(() => localStorage.setItem("aion-admin-theme", "light"));
  await page.reload();
  for (const width of [1440, 1024, 768, 390]) {
    await page.setViewportSize({ width, height: 1000 });
    await page.waitForTimeout(250);
    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= innerWidth,
      ),
    ).toBe(true);
    await page.screenshot({
      path: `docs/phoenix-evidence/aion-overview-${width}.png`,
      fullPage: true,
    });
    if (width === 390) {
      await page.getByRole("button", { name: "Open navigation" }).click();
      await expect(
        page.getByRole("link", { name: "Products", exact: true }).first(),
      ).toBeVisible();
      await page
        .locator(".ad-sidebar")
        .getByRole("link", { name: "Products", exact: true })
        .click();
      await expect(
        page.getByRole("heading", { name: "Products", exact: true }),
      ).toBeVisible();
      await expect(page.locator(".ad-nav-backdrop")).toHaveCount(0);
      expect(
        await page.evaluate(
          () => document.documentElement.scrollWidth <= innerWidth,
        ),
      ).toBe(true);
      await page.screenshot({
        path: "docs/phoenix-evidence/aion-products-390.png",
        fullPage: true,
      });
    }
  }
  await page.setViewportSize({ width: 1440, height: 1000 });
  for (const route of [
    "products",
    "orders",
    "customers",
    "inventory",
    "settings",
  ]) {
    await page.goto("/admin/" + route);
    await page.screenshot({
      path: `docs/phoenix-evidence/aion-${route}-1440.png`,
      fullPage: true,
    });
  }
  await page.goto("/admin");
  await page.getByRole("button", { name: "Choose theme" }).click();
  await page.getByRole("button", { name: "Dark", exact: true }).click();
  await page.screenshot({
    path: "docs/phoenix-evidence/aion-overview-dark.png",
    fullPage: true,
  });
});
test("storefront remains available and reservations reach the admin API", async ({
  page,
}) => {
  await page.addInitScript(() =>
    localStorage.setItem("jcring_cookie_choice", "accepted"),
  );
  const errors: string[] = [];
  page.on("pageerror", (e) => errors.push(e.message));
  for (const route of ["/", "/shop", "/preorder", "/checkout"]) {
    await page.goto(route);
    await expect(page.locator("main, h1").first()).toBeVisible();
    await expect(page.locator(".aion-admin")).toHaveCount(0);
  }
  await page.goto("/preorder");
  await page.getByRole("button", { name: "8", exact: true }).click();
  await page.getByPlaceholder("Jane", { exact: true }).fill("Storefront");
  await page.getByPlaceholder("Doe", { exact: true }).fill("Browser");
  await page
    .getByPlaceholder("jane@example.com")
    .fill(`storefront-${Date.now()}@example.test`);
  await page.getByPlaceholder("(555) 123-4567").fill("5551234567");
  await page
    .getByPlaceholder('Name, partner or code, enter "Self" if none')
    .fill("Self");
  await page
    .getByPlaceholder("123 Main Street, Apt 4")
    .fill("Development address");
  await page.getByPlaceholder("New York", { exact: true }).fill("Test city");
  await page.getByPlaceholder("NY", { exact: true }).fill("Test state");
  await page.getByPlaceholder("10001", { exact: true }).fill("10001");
  await page
    .getByRole("button", {
      name: "Reserve my JCRingforlife Ring →",
      exact: true,
    })
    .click();
  await expect(page.getByText("Reference:", { exact: false })).toBeVisible();
  await expect(
    page.getByText("No payment has been collected.", { exact: false }),
  ).toBeVisible();
  expect(errors).toEqual([]);
  await page.screenshot({
    path: "docs/phoenix-evidence/aion-storefront-reservation.png",
    fullPage: true,
  });
});
