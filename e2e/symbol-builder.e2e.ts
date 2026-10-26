import { expect, test } from "@playwright/test";

test("editing a simple marker updates its JSON snippet", async ({ page }) => {
  await page.goto("/");
  await page.getByRole("link", { name: "SimpleMarkerSymbol Builder" }).click();
  await page.locator("calcite-tab-title").filter({ hasText: "JSON" }).click();

  const snippet = page.locator("calcite-tab[selected] pre");
  await expect(snippet).toContainText('"size": 12');

  const sizeInput = page.getByRole("textbox", { name: "size input" });
  await sizeInput.fill("24");
  await sizeInput.press("Enter");

  await expect(snippet).toContainText('"size": 24');
});

const layerEditors = [
  { route: "/line-symbol-3d", action: "Add LineSymbol3DLayer" },
  { route: "/mesh-symbol-3d", action: "Add FillSymbol3DLayer" },
  { route: "/point-symbol-3d", action: "Add IconSymbol3DLayer" },
  { route: "/polygon-symbol-3d", action: "Add FillSymbol3DLayer" },
] as const;

for (const editor of layerEditors) {
  test(`${editor.route} adds and removes a symbol layer`, async ({ page }) => {
    await page.goto(editor.route);
    const snippet = page.locator("calcite-tab[selected] pre");

    if (editor.route === "/line-symbol-3d") {
      await expect(snippet).not.toContainText("new LineSymbol3DLayer(");
    }

    await page.getByRole("button", { name: "Add symbol layer" }).click();
    await page.getByRole("button", { name: editor.action }).click();

    if (editor.route === "/line-symbol-3d") {
      await expect(snippet).toContainText("new LineSymbol3DLayer(");
    }

    const layerHeading = page.getByRole("button", {
      name: "symbolLayers[0]",
    });
    await expect(layerHeading).toBeVisible();
    await page.getByRole("button", { name: "Delete" }).click();
    await expect(layerHeading).toHaveCount(0);

    if (editor.route === "/line-symbol-3d") {
      await expect(snippet).not.toContainText("new LineSymbol3DLayer(");
    }
  });
}
