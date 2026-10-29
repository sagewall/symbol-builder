import { expect, test, type Page } from "@playwright/test";

async function addLayer(page: Page, route: string, type: string) {
  await page.goto(route);
  await page.getByRole("button", { name: "Add symbol layer" }).click();
  await page.getByRole("button", { name: `Add ${type}`, exact: true }).click();
  await page.getByRole("button", { name: "symbolLayers[0]", exact: true }).click();
  await page.locator("calcite-tab-title").filter({ hasText: "JSON" }).click();
}

async function symbolJSON(page: Page) {
  const text = await page.locator("calcite-tab[selected] pre").innerText();
  return JSON.parse(
    text.slice(text.indexOf("fromJSON(") + 9, text.lastIndexOf(");")),
  );
}

test("deferred emissive source changes preserve an in-flight strength edit", async ({
  page,
}) => {
  await addLayer(page, "/mesh-symbol-3d", "FillSymbol3DLayer");
  await page.getByRole("button", { name: "material", exact: true }).click();
  await page.getByRole("switch", { name: "emissive enabled", exact: true }).click();
  await expect
    .poll(async () => (await symbolJSON(page)).symbolLayers[0].material.emissive)
    .toMatchObject({ source: "color", strength: 1 });
  await page.evaluate(() => {
    const source = [...document.querySelectorAll("calcite-select")].find(
      (element) => element.label === "emissive source selection",
    )!;
    const strength = [...document.querySelectorAll("calcite-input-number")].find(
      (element) => element.label === "emissive strength input",
    )!;
    strength.value = "0.6";
    strength.dispatchEvent(new CustomEvent("calciteInputNumberChange", { bubbles: true }));
    source.value = "emissive";
    source.dispatchEvent(new CustomEvent("calciteSelectChange", { bubbles: true }));
  });
  await expect
    .poll(async () => (await symbolJSON(page)).symbolLayers[0].material.emissive)
    .toMatchObject({ source: "emissive", strength: 0.6 });
});

test("3D text reflects repeated SDK-normalized line heights and font edits", async ({
  page,
}) => {
  await addLayer(page, "/point-symbol-3d", "TextSymbol3DLayer");
  const height = page.getByRole("textbox", {
    name: "lineHeight input",
    exact: true,
  });
  for (const value of ["5", "5", "0.01", "0.01"]) {
    await height.fill(value);
    await height.press("Enter");
    const expected = value === "5" ? 4 : 0.1;
    await expect(height).toHaveValue(String(expected));
    await expect
      .poll(async () => (await symbolJSON(page)).symbolLayers[0].lineHeight)
      .toBe(expected);
  }
  await page.getByRole("button", { name: "font", exact: true }).click();
  const family = page.getByRole("textbox", {
    name: "font family input",
    exact: true,
  });
  await family.fill("Arial");
  await family.press("Enter");
  await family.blur();
  await expect
    .poll(async () => (await symbolJSON(page)).symbolLayers[0].font.family)
    .toBe("Arial");
  await page
    .getByRole("combobox", { name: "font weight selection", exact: true })
    .selectOption("bold");
  await expect
    .poll(async () => (await symbolJSON(page)).symbolLayers[0].font)
    .toMatchObject({ family: "Arial", weight: "bold" });
  await expect(family).toHaveValue("Arial");
});

test("water color reflects the SDK value across edits", async ({ page }) => {
  await addLayer(page, "/polygon-symbol-3d", "WaterSymbol3DLayer");
  const color = page.locator("calcite-input[type=color]");
  const rgba = (await symbolJSON(page)).symbolLayers[0].color ?? [0, 119, 190];
  const hex = `#${rgba
    .slice(0, 3)
    .map((value: number) => value.toString(16).padStart(2, "0"))
    .join("")}`;
  await expect(color).toHaveJSProperty("value", hex);
  await page
    .getByRole("combobox", { name: "waterbodySize selection", exact: true })
    .selectOption("large");
  await expect
    .poll(async () => (await symbolJSON(page)).symbolLayers[0].waterbodySize)
    .toBe("large");
  await expect(color).toHaveJSProperty("value", hex);
});

for (const route of ["/mesh-symbol-3d", "/polygon-symbol-3d"]) {
  test(`${route} fill material and pattern controls stay synchronized`, async ({
    page,
  }) => {
    await addLayer(page, route, "FillSymbol3DLayer");
    await page.getByRole("button", { name: "material", exact: true }).click();
    const mode = page.getByRole("combobox", {
      name: "colorMixMode selection",
      exact: true,
    });
    await mode.selectOption("replace");
    await expect
      .poll(async () => (await symbolJSON(page)).symbolLayers[0].material.colorMixMode)
      .toBe("replace");
    await expect(mode).toHaveValue("replace");
    if (route === "/polygon-symbol-3d") {
      await page.getByRole("button", { name: "pattern", exact: true }).click();
      const style = page.getByRole("combobox", {
        name: "pattern style selection",
        exact: true,
      });
      await style.selectOption("cross");
      await expect
        .poll(async () => (await symbolJSON(page)).symbolLayers[0].pattern)
        .toMatchObject({ style: "cross" });
      await expect(style).toHaveValue("cross");
    }
  });
}
