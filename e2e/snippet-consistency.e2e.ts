import { expect, test, type Page } from "@playwright/test";

interface SerializedSymbol {
  toJSON(): unknown;
}

async function executeSnippet(source: string, variable: string): Promise<unknown> {
  const constructorSource = source.replace(
    /import (\w+) from "(@arcgis\/[^"]+)";/g,
    'const $1 = await $arcgis.import("$2");',
  );
  const run = new Function(
    "$arcgis",
    `return (async () => { ${constructorSource}\nreturn ${variable}; })();`,
  );
  const symbol: SerializedSymbol = await run({
    import: async (specifier: string) => (await import(specifier)).default,
  });
  return JSON.parse(JSON.stringify(symbol.toJSON()));
}

async function readSnippet(page: Page, format: string): Promise<string> {
  await page.locator("calcite-tab-title").filter({
    hasText: new RegExp(`^${format}$`),
  }).click();
  return page.locator("calcite-tab[selected] pre").innerText();
}

async function readJSON(page: Page): Promise<Record<string, unknown>> {
  const source = await readSnippet(page, "JSON");
  return JSON.parse(
    source.slice(source.indexOf("fromJSON(") + 9, source.lastIndexOf(");")),
  );
}

async function checkSnippets(page: Page, variable: string): Promise<void> {
  const expected = await readJSON(page);
  for (const format of ["ESM", "CDN", "JSON"]) {
    const source = await readSnippet(page, format);
    expect(
      await executeSnippet(source, variable),
      `${format} must reproduce the current symbol`,
    ).toEqual(expected);
  }
}

test("WebStyle selections match executable snippets in 2D and 3D", async ({
  page,
}) => {
  await page.route("**/sharing/rest/content/groups/**", (route) =>
    route.fulfill({
      contentType: "application/json",
      body: JSON.stringify({ items: [] }),
    }),
  );
  await page.goto("/web-style-symbol");
  await checkSnippets(page, "webStyleSymbol");
  await page.locator("calcite-tab-title").filter({ hasText: "Standard" }).click();
  const name = page.getByRole("combobox", {
    name: "name selection",
    exact: true,
  });
  await expect(name).toHaveValue("extent-hollow-gray");
  await checkSnippets(page, "webStyleSymbol");
  await name.selectOption("airport");
  await expect.poll(async () => (await readJSON(page)).name).toBe("airport");
  await checkSnippets(page, "webStyleSymbol");

  await page.getByRole("switch").click();
  await expect(name).toHaveValue("Accessibility");
  await checkSnippets(page, "webStyleSymbol");
  await page
    .getByRole("combobox", {
      name: "styleName selection",
      exact: true,
    })
    .selectOption("EsriInfrastructureStyle");
  await name.selectOption("Cell_Phone_Antenna");
  await expect
    .poll(async () => (await readJSON(page)).name)
    .toBe("Cell_Phone_Antenna");
  await checkSnippets(page, "webStyleSymbol");
});

const editors = [
  {
    route: "/simple-line-symbol", variable: "simpleLineSymbol",
    input: "width input", initial: "1", edited: "4", property: "width",
  },
  {
    route: "/simple-marker-symbol", variable: "simpleMarkerSymbol",
    input: "size input", initial: "12", edited: "22", property: "size",
  },
  {
    route: "/simple-fill-symbol", variable: "simpleFillSymbol",
    input: "width input", initial: "1", edited: "3", property: "width",
    outline: true,
  },
  {
    route: "/picture-marker-symbol", variable: "pictureMarkerSymbol",
    input: "width input", initial: "100", edited: "42", property: "width",
  },
  {
    route: "/picture-fill-symbol", variable: "pictureFillSymbol",
    input: "width input", initial: "75", edited: "42", property: "width",
  },
  {
    route: "/text-symbol", variable: "textSymbol",
    input: "lineWidth input", initial: "192", edited: "250", property: "lineWidth",
  },
];

for (const editor of editors) {
  test(`${editor.route} initial and edited controls match executable snippets in every format`, async ({ page }) => {
    await page.goto(editor.route);
    if (editor.outline) {
      await page.getByRole("button", { name: "outline:", exact: true }).click();
    }
    const input = page.getByRole("textbox", { name: editor.input, exact: true });
    await expect(input).toHaveValue(editor.initial);
    await checkSnippets(page, editor.variable);
    await input.fill(editor.edited);
    await input.press("Enter");
    await expect.poll(async () => {
      const symbol = await readJSON(page);
      const properties = editor.outline
        ? symbol.outline as Record<string, unknown>
        : symbol;
      return properties[editor.property];
    }).toBe(Number(editor.edited));
    await expect(input).toHaveValue(editor.edited);
    await checkSnippets(page, editor.variable);
  });
}

for (const editor of [
  {
    route: "/point-symbol-3d", variable: "pointSymbol3D",
    layer: "IconSymbol3DLayer", input: "size input",
    initial: "12", edited: "22", property: "size",
  },
  {
    route: "/point-symbol-3d", variable: "pointSymbol3D",
    layer: "ObjectSymbol3DLayer", input: "depth input",
    initial: "10", edited: "22", property: "depth",
  },
  {
    route: "/point-symbol-3d", variable: "pointSymbol3D",
    layer: "TextSymbol3DLayer", input: "lineHeight input",
    initial: "1", edited: "1.8", property: "lineHeight",
  },
  {
    route: "/line-symbol-3d", variable: "lineSymbol3D",
    layer: "LineSymbol3DLayer", input: "size input",
    initial: "3", edited: "6", property: "size",
  },
  {
    route: "/line-symbol-3d", variable: "lineSymbol3D",
    layer: "PathSymbol3DLayer", input: "height input",
    initial: "5", edited: "8", property: "height",
  },
  {
    route: "/polygon-symbol-3d", variable: "polygonSymbol3D",
    layer: "ExtrudeSymbol3DLayer", input: "size input",
    initial: "20", edited: "35", property: "size",
  },
  {
    route: "/polygon-symbol-3d", variable: "polygonSymbol3D",
    layer: "IconSymbol3DLayer", input: "size input",
    initial: "12", edited: "22", property: "size",
  },
  {
    route: "/polygon-symbol-3d", variable: "polygonSymbol3D",
    layer: "ObjectSymbol3DLayer", input: "depth input",
    initial: "10", edited: "22", property: "depth",
  },
]) {
  test(`${editor.route} ${editor.layer} initial and edited controls match every snippet format`, async ({ page }) => {
    await page.goto(editor.route);
    await checkSnippets(page, editor.variable);
    await page.getByRole("button", { name: "Add symbol layer" }).click();
    await page.getByRole("button", { name: `Add ${editor.layer}`, exact: true }).click();
    await page.getByRole("button", { name: "symbolLayers[0]", exact: true }).click();
    const input = page.getByRole("textbox", { name: editor.input, exact: true });
    await expect(input).toHaveValue(editor.initial);
    await checkSnippets(page, editor.variable);
    await input.fill(editor.edited);
    await input.press("Enter");
    await expect.poll(async () => {
      const symbol = await readJSON(page);
      const layers = symbol.symbolLayers as Record<string, unknown>[];
      return layers[0][editor.property];
    }).toBe(Number(editor.edited));
    await expect(input).toHaveValue(editor.edited);
    await checkSnippets(page, editor.variable);
  });
}

for (const editor of [
  {
    route: "/mesh-symbol-3d", variable: "meshSymbol3D",
    layer: "FillSymbol3DLayer", block: "material",
    input: "colorMixMode selection", initial: "multiply", edited: "replace",
    property: "material", field: "colorMixMode",
  },
  {
    route: "/polygon-symbol-3d", variable: "polygonSymbol3D",
    layer: "FillSymbol3DLayer", block: "material",
    input: "colorMixMode selection", initial: "multiply", edited: "replace",
    property: "material", field: "colorMixMode",
  },
  {
    route: "/polygon-symbol-3d", variable: "polygonSymbol3D",
    layer: "WaterSymbol3DLayer", input: "waterbodySize selection",
    initial: "medium", edited: "large", field: "waterbodySize",
  },
]) {
  test(`${editor.route} ${editor.layer} selections match every snippet format`, async ({ page }) => {
    await page.goto(editor.route);
    await checkSnippets(page, editor.variable);
    await page.getByRole("button", { name: "Add symbol layer" }).click();
    await page.getByRole("button", { name: `Add ${editor.layer}`, exact: true }).click();
    await page.getByRole("button", { name: "symbolLayers[0]", exact: true }).click();
    if (editor.block) {
      await page.getByRole("button", { name: editor.block, exact: true }).click();
    }
    const select = page.getByRole("combobox", { name: editor.input, exact: true });
    await expect(select).toHaveValue(editor.initial);
    await checkSnippets(page, editor.variable);
    await select.selectOption(editor.edited);
    await expect.poll(async () => {
      const symbol = await readJSON(page);
      const layers = symbol.symbolLayers as Record<string, unknown>[];
      const properties = editor.property
        ? layers[0][editor.property] as Record<string, unknown>
        : layers[0];
      return properties[editor.field];
    }).toBe(editor.edited);
    await expect(select).toHaveValue(editor.edited);
    await checkSnippets(page, editor.variable);
  });
}
