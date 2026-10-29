import { expect, test, type Page } from "@playwright/test";

const accessorErrors = new WeakMap<Page, string[]>();
test.beforeEach(({ page }) => {
  const errors: string[] = [];
  accessorErrors.set(page, errors);
  page.on("console", (message) => {
    if (
      /Accessor#set|is not a valid value for this property/.test(message.text())
    )
      errors.push(message.text());
  });
});
test.afterEach(({ page }) => {
  expect(accessorErrors.get(page)).toEqual([]);
});

async function selectProperty(page: Page, label: string, value: string) {
  const control = page.getByRole("combobox", { name: label, exact: true });
  expect(
    await control.evaluate(
      (element) => (element.getRootNode() as ShadowRoot).host.tagName,
    ),
  ).toBe("CALCITE-SELECT");
  await control.selectOption(value);
}

async function fillNumber(page: Page, name: string, value: string) {
  const input = page.getByRole("textbox", { name, exact: true });
  await input.fill(value);
  await input.press("Enter");
}

async function readSymbolJSON(page: Page) {
  let symbol: ReturnType<typeof JSON.parse>;
  await expect(async () => {
    const text = await page.locator("calcite-tab[selected] pre").innerText();
    const prefix = "fromJSON(";
    expect(text).toContain(prefix);
    symbol = JSON.parse(
      text.slice(text.indexOf(prefix) + prefix.length, text.lastIndexOf(");")),
    );
  }).toPass({ timeout: 5000 });
  return symbol;
}

async function showJSON(page: Page) {
  await page.locator("calcite-tab-title").filter({ hasText: "JSON" }).click();
  await expect(page.locator("calcite-tab[selected] pre")).toContainText(
    "fromJSON(",
  );
}

async function addLayer(page: Page, route: string, action: string) {
  await page.goto(route);
  await page.getByRole("button", { name: "Add symbol layer" }).click();
  await page.getByRole("button", { name: action, exact: true }).click();
  await page
    .getByRole("button", { name: "symbolLayers[0]", exact: true })
    .click();
  await showJSON(page);
}

test("text controls reflect SDK defaults, normalized values, and switches", async ({
  page,
}) => {
  await page.goto("/text-symbol");
  await showJSON(page);
  await expect(
    page.getByRole("textbox", { name: "lineWidth input", exact: true }),
  ).toHaveValue("192");
  await expect(
    page.getByRole("textbox", { name: "borderLineSize input", exact: true }),
  ).toHaveValue("0");
  await fillNumber(page, "lineHeight input", "5");
  await expect(
    page.getByRole("textbox", { name: "lineHeight input", exact: true }),
  ).toHaveValue("4");
  await expect
    .poll(async () => (await readSymbolJSON(page)).lineHeight)
    .toBe(4);
  await fillNumber(page, "lineHeight input", "5");
  await expect(
    page.getByRole("textbox", { name: "lineHeight input", exact: true }),
  ).toHaveValue("4");
  for (const property of ["kerning", "rotated"]) {
    const control = page
      .locator("calcite-label")
      .filter({ hasText: new RegExp(`^\\s*${property}\\s*$`) })
      .getByRole("switch");
    await expect(control).not.toBeChecked();
    await control.check();
    await expect
      .poll(async () => (await readSymbolJSON(page))[property])
      .toBe(true);
    await expect(control).toBeChecked();
  }
});

test("text color controls preserve their independently edited opacity", async ({
  page,
}) => {
  await page.goto("/text-symbol");
  await showJSON(page);
  for (const property of ["backgroundColor", "borderLineColor"]) {
    const opacity = page
      .locator("calcite-label")
      .filter({ hasText: new RegExp(`^\\s*${property} opacity`) })
      .locator("calcite-slider");
    await expect(opacity).toHaveJSProperty("value", 0);
    await opacity.evaluate((element: HTMLCalciteSliderElement) => {
      element.value = 0.4;
      element.dispatchEvent(
        new CustomEvent("calciteSliderChange", { bubbles: true }),
      );
    });
    const color = page
      .locator("calcite-label")
      .filter({ hasText: new RegExp(`^\\s*${property}\\s*$`) })
      .locator("calcite-input");
    await color.evaluate((element: HTMLCalciteInputElement) => {
      element.value = "#007ac2";
      element.dispatchEvent(
        new CustomEvent("calciteInputInput", { bubbles: true }),
      );
    });
    await expect
      .poll(async () => (await readSymbolJSON(page))[property])
      .toEqual([0, 122, 194, 102]);
    await expect(color).toHaveJSProperty("value", "#007ac2");
    await expect(opacity).toHaveJSProperty("value", 0.4);
  }
});

for (const route of [
  "/simple-marker-symbol",
  "/simple-fill-symbol",
  "/picture-fill-symbol",
]) {
  test(`${route} outline edits preserve other current outline properties`, async ({
    page,
  }) => {
    await page.goto(route);
    await showJSON(page);
    await page.getByRole("button", { name: "outline:", exact: true }).click();
    const outline = page.locator("calcite-block").filter({
      has: page.getByRole("button", { name: "outline:", exact: true }),
    });
    const width = outline.getByRole("textbox", {
      name: "width input",
      exact: true,
    });
    await width.fill("3.5");
    await width.press("Enter");
    await expect
      .poll(async () => (await readSymbolJSON(page)).outline.width)
      .toBe(3.5);
    await outline.getByRole("combobox", {
      name: "cap selection",
      exact: true,
    }).selectOption("square");
    await expect
      .poll(async () => (await readSymbolJSON(page)).outline)
      .toMatchObject({ width: 3.5, cap: "square" });
    await expect(width).toHaveValue("3.5");
  });
}

for (const editor of [
  {
    route: "/point-symbol-3d",
    action: "Add ObjectSymbol3DLayer",
    anchorInput: "anchor position x",
  },
  {
    route: "/polygon-symbol-3d",
    action: "Add ObjectSymbol3DLayer",
    anchorInput: "anchor position x",
  },
  {
    route: "/point-symbol-3d",
    action: "Add IconSymbol3DLayer",
    anchorInput: "x anchor position",
  },
  {
    route: "/polygon-symbol-3d",
    action: "Add IconSymbol3DLayer",
    anchorInput: "x anchor position",
  },
]) {
  test(`${editor.route} ${editor.action} restores current anchor coordinates`, async ({ page }) => {
    await addLayer(page, editor.route, editor.action);
    await selectProperty(page, "anchor selection", "relative");
    await page.getByRole("button", { name: "anchorPosition", exact: true }).click();
    await fillNumber(page, editor.anchorInput, "0.5");
    await expect
      .poll(async () => (await readSymbolJSON(page)).symbolLayers[0].anchorPosition[0])
      .toBe(0.5);
    await selectProperty(page, "anchor selection", "center");
    await expect(
      page.getByRole("textbox", { name: editor.anchorInput, exact: true }),
    ).toHaveCount(0);
    await selectProperty(page, "anchor selection", "relative");
    await page.getByRole("button", { name: "anchorPosition", exact: true }).click();
    await expect(
      page.getByRole("textbox", { name: editor.anchorInput, exact: true }),
    ).toHaveValue("0.5");
  });
}

for (const route of ["/point-symbol-3d", "/polygon-symbol-3d"]) {
  test(`${route} object primitive matches the sphere in the symbol`, async ({ page }) => {
    await addLayer(page, route, "Add ObjectSymbol3DLayer");
    await page.getByRole("button", { name: "resource", exact: true }).click();
    await expect(
      page.getByRole("combobox", { name: "primitive selection", exact: true }),
    ).toHaveValue("sphere");
    await selectProperty(page, "primitive selection", "cube");
    await expect
      .poll(async () => (await readSymbolJSON(page)).symbolLayers[0].resource.primitive)
      .toBe("cube");
  });
}

test("text line-height and independent font controls update the symbol", async ({
  page,
}) => {
  await page.goto("/text-symbol");
  await showJSON(page);
  await fillNumber(page, "lineHeight input", "1.8");
  await expect
    .poll(async () => (await readSymbolJSON(page)).lineHeight)
    .toBe(1.8);
  await page.getByRole("button", { name: "font", exact: true }).click();
  const family = page.getByRole("textbox", {
    name: "font family input",
    exact: true,
  });
  await family.fill("Arial");
  await family.press("Enter");
  await selectProperty(page, "font style selection", "italic");
  await selectProperty(page, "font decoration selection", "underline");
  await selectProperty(page, "font weight selection", "lighter");
  await expect
    .poll(async () => (await readSymbolJSON(page)).font)
    .toMatchObject({
      decoration: "underline",
      family: "Arial",
      style: "italic",
      weight: "lighter",
    });
});

test("line markers stay attached to their layer after paths are added first", async ({
    page,
}) => {
    await page.goto("/line-symbol-3d");
    const addLayerMenu = page.getByRole("button", { name: "Add symbol layer" });

    for (let index = 0; index < 2; index += 1) {
      await addLayerMenu.click();
      await page
        .getByRole("button", { name: "Add PathSymbol3DLayer", exact: true })
        .click();
    }

    await addLayerMenu.click();
    await page
      .getByRole("button", { name: "Add LineSymbol3DLayer", exact: true })
      .click();
    await page
      .getByRole("button", { name: "symbolLayers[2]", exact: true })
      .click();
    await page.getByRole("button", { name: "marker", exact: true }).click();
    await showJSON(page);

    await expect
      .poll(async () => (await readSymbolJSON(page)).symbolLayers[2].marker)
      .toMatchObject({ type: "style" });
});

for (const is3D of [false, true]) {
    test(`stale ${is3D ? "3D" : "2D"} WebStyle responses are ignored`, async ({
      page,
    }) => {
      let releaseFirstResponse: (() => void) | undefined;
      let signalFirstRequest: (() => void) | undefined;
      let signalFirstResponse: (() => void) | undefined;
      const firstRequestStarted = new Promise<void>((resolve) => {
        signalFirstRequest = resolve;
      });
      const firstResponseReleased = new Promise<void>((resolve) => {
        releaseFirstResponse = resolve;
      });
      const firstResponseFinished = new Promise<void>((resolve) => {
        signalFirstResponse = resolve;
      });

      await page.route("https://styles.test/**", async (route) => {
        const url = route.request().url();
        const name = url.includes("/first/") ? "First result" : "Second result";
        if (name === "First result") {
          signalFirstRequest?.();
          await firstResponseReleased;
        }
        await route.fulfill({
          contentType: "application/json",
          body: JSON.stringify({
            items: [
              {
                itemType: "pointSymbol",
                name,
                thumbnail: { href: "/resources/test.png" },
              },
            ],
          }),
        });
        if (name === "First result") {
          signalFirstResponse?.();
        }
      });

      await page.goto("/web-style-symbol");
      if (is3D) {
        await page.getByRole("switch").click();
      }
      await page.locator("calcite-tab-title").filter({ hasText: "Custom" }).click();
      const urlInput = page.getByRole("textbox", {
        name: "url input",
        exact: true,
      });

      await urlInput.fill("https://styles.test/first/data");
      await urlInput.press("Enter");
      await firstRequestStarted;
      await urlInput.fill("https://styles.test/second/data");
      await urlInput.press("Enter");
      await showJSON(page);
      await expect.poll(async () => (await readSymbolJSON(page)).name).toBe(
        "Second result",
      );

      releaseFirstResponse?.();
      await firstResponseFinished;
      await expect.poll(async () => (await readSymbolJSON(page)).name).toBe(
        "Second result",
      );
    });
}

test("ignores a pending 2D WebStyle response after switching to 3D", async ({
    page,
}) => {
    let releaseResponse: (() => void) | undefined;
    let signalRequest: (() => void) | undefined;
    let signalResponse: (() => void) | undefined;
    const requestStarted = new Promise<void>((resolve) => {
      signalRequest = resolve;
    });
    const responseReleased = new Promise<void>((resolve) => {
      releaseResponse = resolve;
    });
    const responseFinished = new Promise<void>((resolve) => {
      signalResponse = resolve;
    });

    await page.route("https://styles.test/**", async (route) => {
      signalRequest?.();
      await responseReleased;
      await route.fulfill({
        contentType: "application/json",
        body: JSON.stringify({
          items: [
            {
              itemType: "pointSymbol",
              name: "Late 2D result",
              thumbnail: { href: "/resources/test.png" },
            },
          ],
        }),
      });
      signalResponse?.();
    });

    await page.goto("/web-style-symbol");
    await page.locator("calcite-tab-title").filter({ hasText: "Custom" }).click();
    const urlInput = page.getByRole("textbox", {
      name: "url input",
      exact: true,
    });
    await urlInput.fill("https://styles.test/late/data");
    await urlInput.press("Enter");
    await requestStarted;

    await page.getByRole("switch").click();
    await showJSON(page);
    await expect
      .poll(async () => (await readSymbolJSON(page)).name)
      .toBe("Accessibility");

    releaseResponse?.();
    await responseFinished;
    await expect
      .poll(async () => (await readSymbolJSON(page)).name)
      .toBe("Accessibility");
});

test("restores standard 3D names after returning from Custom", async ({
    page,
}) => {
    await page.goto("/web-style-symbol");
    await page.getByRole("switch").click();
    await selectProperty(
      page,
      "styleName selection",
      "EsriInfrastructureStyle",
    );
    await page.locator("calcite-tab-title").filter({ hasText: "Custom" }).click();
    await page.locator("calcite-tab-title").filter({ hasText: "Standard" }).click();
    await selectProperty(page, "name selection", "Accessibility");
    await showJSON(page);

    await expect
      .poll(async () => await readSymbolJSON(page))
      .toMatchObject({ name: "Accessibility", styleName: "EsriIconsStyle" });
});

test("preserves the selected 3D name when changing portal URL", async ({
    page,
}) => {
    await page.goto("/web-style-symbol");
    await page.getByRole("switch").click();
    await selectProperty(
      page,
      "styleName selection",
      "EsriInfrastructureStyle",
    );
    await selectProperty(page, "name selection", "Cell_Phone_Antenna");
    const portalInput = page.getByRole("textbox", {
      name: "Portal URL",
      exact: true,
    });
    await portalInput.fill("https://portal.example.test");
    await showJSON(page);

    await expect
      .poll(async () => await readSymbolJSON(page))
      .toMatchObject({
        name: "Cell_Phone_Antenna",
        portal: { url: "https://portal.example.test" },
      });
});

const emissiveEditors = [
  { route: "/mesh-symbol-3d", action: "Add FillSymbol3DLayer" },
  { route: "/polygon-symbol-3d", action: "Add ExtrudeSymbol3DLayer" },
  { route: "/polygon-symbol-3d", action: "Add ObjectSymbol3DLayer" },
  { route: "/point-symbol-3d", action: "Add ObjectSymbol3DLayer" },
  { route: "/line-symbol-3d", action: "Add PathSymbol3DLayer" },
] as const;

for (const editor of emissiveEditors) {
  test(`${editor.route} ${editor.action} edits emissive material`, async ({
    page,
  }) => {
    await addLayer(page, editor.route, editor.action);
    await page.getByRole("button", { name: "material", exact: true }).click();
    const enabled = page.getByRole("switch", {
      name: "emissive enabled",
      exact: true,
    });
    await enabled.click();
    await expect
      .poll(
        async () =>
          (await readSymbolJSON(page)).symbolLayers[0].material.emissive,
      )
      .toMatchObject({ source: "color", strength: 1 });
    await selectProperty(page, "emissive source selection", "emissive");
    await fillNumber(page, "emissive strength input", "0.6");
    await expect
      .poll(
        async () =>
          (await readSymbolJSON(page)).symbolLayers[0].material.emissive,
      )
      .toMatchObject({ source: "emissive", strength: 0.6 });
    await enabled.click();
    await expect
      .poll(
        async () =>
          (await readSymbolJSON(page)).symbolLayers[0].material.emissive ??
          null,
      )
      .toBeNull();
    await enabled.click();
    await expect
      .poll(
        async () =>
          (await readSymbolJSON(page)).symbolLayers[0].material.emissive,
      )
      .toMatchObject({ source: "emissive", strength: 0.6 });
  });
}

for (const editor of emissiveEditors) {
  test(`${editor.route} ${editor.action} preserves the survivor after deleting a preceding layer`, async ({
    page,
  }) => {
    await addLayer(page, editor.route, editor.action);
    await page.getByRole("button", { name: "material", exact: true }).click();
    await page
      .getByRole("switch", { name: "emissive enabled", exact: true })
      .click();
    await fillNumber(page, "emissive strength input", "0.2");
    await expect
      .poll(
        async () =>
          (await readSymbolJSON(page)).symbolLayers[0].material.emissive
            ?.strength,
      )
      .toBe(0.2);

    await page
      .getByRole("button", { name: "Add symbol layer", exact: true })
      .click();
    await page
      .getByRole("button", { name: editor.action, exact: true })
      .click();
    await page
      .getByRole("button", { name: "symbolLayers[1]", exact: true })
      .click();
    await page
      .getByRole("button", { name: "material", exact: true })
      .nth(1)
      .click();
    await page
      .getByRole("switch", { name: "emissive enabled", exact: true })
      .nth(1)
      .click();
    const secondStrength = page
      .getByRole("textbox", { name: "emissive strength input", exact: true })
      .nth(1);
    await secondStrength.fill("0.8");
    await secondStrength.press("Enter");
    await expect
      .poll(
        async () =>
          (await readSymbolJSON(page)).symbolLayers[1]?.material.emissive
            ?.strength,
      )
      .toBe(0.8);

    await page
      .getByRole("button", { name: "Delete", exact: true })
      .first()
      .click();
    await expect(
      page.getByRole("button", { name: "Delete", exact: true }),
    ).toHaveCount(1);
    await expect(
      page.getByRole("textbox", {
        name: "emissive strength input",
        exact: true,
      }),
    ).toHaveValue("0.8");
    const enabled = page.getByRole("switch", {
      name: "emissive enabled",
      exact: true,
    });
    await enabled.click();
    await expect
      .poll(
        async () =>
          (await readSymbolJSON(page)).symbolLayers[0].material.emissive ??
          null,
      )
      .toBeNull();
    await enabled.click();
    await expect
      .poll(
        async () =>
          (await readSymbolJSON(page)).symbolLayers[0].material.emissive
            ?.strength,
      )
      .toBe(0.8);
  });
}

for (const editor of [
  { route: "/mesh-symbol-3d", action: "Add FillSymbol3DLayer" },
  { route: "/polygon-symbol-3d", action: "Add ExtrudeSymbol3DLayer" },
]) {
  test(`${editor.route} edits edge variants and restores disabled edges`, async ({
    page,
  }) => {
    await addLayer(page, editor.route, editor.action);
    await page.getByRole("button", { name: "edges", exact: true }).click();
    await selectProperty(page, "edges type selection", "sketch");
    await expect
      .poll(async () => (await readSymbolJSON(page)).symbolLayers[0].edges.type)
      .toBe("sketch");
    await fillNumber(page, "extensionLength input", "3");
    const enabled = page.getByRole("switch", {
      name: "edges enabled",
      exact: true,
    });
    await enabled.click();
    await expect
      .poll(
        async () => (await readSymbolJSON(page)).symbolLayers[0].edges ?? null,
      )
      .toBeNull();
    await enabled.click();
    await expect
      .poll(async () => (await readSymbolJSON(page)).symbolLayers[0].edges)
      .toMatchObject({ type: "sketch", extensionLength: 3 });
    await expect(
      page.getByRole("textbox", { name: "extensionLength input", exact: true }),
    ).toHaveValue("3");
  });
}

for (const editor of [
  { route: "/line-symbol-3d", action: "Add LineSymbol3DLayer" },
  { route: "/polygon-symbol-3d", action: "Add FillSymbol3DLayer" },
  { route: "/point-symbol-3d", action: "Add IconSymbol3DLayer" },
]) {
  test(`${editor.route} does not expose unsupported emissive controls`, async ({
    page,
  }) => {
    await addLayer(page, editor.route, editor.action);
    await page.getByRole("button", { name: "material", exact: true }).click();
    await expect(
      page.getByRole("switch", { name: "emissive enabled", exact: true }),
    ).toHaveCount(0);
  });
}

test("custom dash templates validate input and restore disabled patterns", async ({
  page,
}) => {
  await addLayer(page, "/line-symbol-3d", "Add LineSymbol3DLayer");
  await page.getByRole("button", { name: "pattern", exact: true }).click();
  await selectProperty(page, "pattern type selection", "template");
  const input = page.getByRole("textbox", {
    name: "dashTemplate input",
    exact: true,
  });
  await input.fill("[8,3,1,3]");
  await input.press("Enter");
  await expect
    .poll(
      async () =>
        (await readSymbolJSON(page)).symbolLayers[0].pattern?.dashTemplate,
    )
    .toEqual([8, 3, 1, 3]);
  for (const draft of ["[8,", "[]", "{}", '[8,"3"]', "[8,null]", "[1e400]"]) {
    await input.fill(draft);
    await input.press("Enter");
    await expect(
      page.getByText("Expected a non-empty array of finite numbers.", {
        exact: true,
      }),
    ).toBeVisible();
    await expect(input).toHaveValue("[8,3,1,3]");
    await expect
      .poll(
        async () =>
          (await readSymbolJSON(page)).symbolLayers[0].pattern?.dashTemplate,
      )
      .toEqual([8, 3, 1, 3]);
  }
  const enabled = page.getByRole("switch", {
    name: "pattern enabled",
    exact: true,
  });
  await enabled.click();
  await expect
    .poll(
      async () => (await readSymbolJSON(page)).symbolLayers[0].pattern ?? null,
    )
    .toBeNull();
  await enabled.click();
  await expect
    .poll(
      async () =>
        (await readSymbolJSON(page)).symbolLayers[0].pattern?.dashTemplate,
    )
    .toEqual([8, 3, 1, 3]);
  await expect(input).toHaveValue("[8,3,1,3]");
});

test("emissive strength accepts both range boundaries", async ({ page }) => {
  await addLayer(page, "/mesh-symbol-3d", "Add FillSymbol3DLayer");
  await page.getByRole("button", { name: "material", exact: true }).click();
  await page.getByRole("switch", { name: "emissive enabled", exact: true }).click();

  for (const strength of [0, 16]) {
    await fillNumber(page, "emissive strength input", String(strength));
    await expect
      .poll(async () => (await readSymbolJSON(page)).symbolLayers[0].material.emissive)
      .toMatchObject({ source: "color", strength });
    await expect(
      page.getByRole("textbox", { name: "emissive strength input", exact: true }),
    ).toHaveValue(String(strength));
    await expect(
      page.getByText("Enter a strength between 0 and 16.", { exact: true }),
    ).toHaveCount(0);
  }
});

for (const draft of ["", "-1", "17"]) {
  test(`invalid emissive strength ${JSON.stringify(draft)} restores the last valid settings`, async ({
    page,
  }) => {
    await addLayer(page, "/mesh-symbol-3d", "Add FillSymbol3DLayer");
    await page.getByRole("button", { name: "material", exact: true }).click();
    const enabled = page.getByRole("switch", {
      name: "emissive enabled",
      exact: true,
    });
    await enabled.click();
    await fillNumber(page, "emissive strength input", "0.6");
    await expect
      .poll(
        async () =>
          (await readSymbolJSON(page)).symbolLayers[0].material.emissive
            ?.strength,
      )
      .toBe(0.6);

    await fillNumber(page, "emissive strength input", draft);
    await expect(
      page.getByText("Enter a strength between 0 and 16.", { exact: true }),
    ).toBeVisible();
    await expect
      .poll(
        async () =>
          (await readSymbolJSON(page)).symbolLayers[0].material.emissive
            ?.strength,
      )
      .toBe(0.6);
    await enabled.click();
    await expect
      .poll(
        async () =>
          (await readSymbolJSON(page)).symbolLayers[0].material.emissive ??
          null,
      )
      .toBeNull();
    await enabled.click();

    await expect(enabled).toBeChecked();
    await expect(
      page.getByRole("textbox", {
        name: "emissive strength input",
        exact: true,
      }),
    ).toHaveValue("0.6");
    await expect(
      page.getByText("Enter a strength between 0 and 16.", { exact: true }),
    ).toHaveCount(0);
    await expect
      .poll(
        async () =>
          (await readSymbolJSON(page)).symbolLayers[0].material.emissive,
      )
      .toMatchObject({ source: "color", strength: 0.6 });
  });
}

test("dash template mode switching recovers invalid drafts", async ({
  page,
}) => {
  await addLayer(page, "/line-symbol-3d", "Add LineSymbol3DLayer");
  await page.getByRole("button", { name: "pattern", exact: true }).click();
  await selectProperty(page, "pattern type selection", "template");
  const input = page.getByRole("textbox", {
    name: "dashTemplate input",
    exact: true,
  });
  await input.fill("[4,2]");
  await input.press("Enter");
  await expect
    .poll(
      async () =>
        (await readSymbolJSON(page)).symbolLayers[0].pattern?.dashTemplate,
    )
    .toEqual([4, 2]);
  await input.fill("[");
  await input.press("Enter");
  await expect(
    page.getByText("Expected a non-empty array of finite numbers.", {
      exact: true,
    }),
  ).toBeVisible();

  await selectProperty(page, "pattern type selection", "style");
  await expect(
    page.getByRole("combobox", {
      name: "pattern style selection",
      exact: true,
    }),
  ).toBeVisible();
  await selectProperty(page, "pattern type selection", "template");
  await expect(input).toHaveValue("[4,2]");
  await expect(
    page.getByText("Expected a non-empty array of finite numbers.", {
      exact: true,
    }),
  ).toHaveCount(0);
  await expect
    .poll(async () => (await readSymbolJSON(page)).symbolLayers[0].pattern)
    .toMatchObject({ type: "template", dashTemplate: [4, 2] });

  await input.fill("[6,3]");
  await input.press("Enter");
  await expect
    .poll(
      async () =>
        (await readSymbolJSON(page)).symbolLayers[0].pattern?.dashTemplate,
    )
    .toEqual([6, 3]);
});

test("callout borders and optional offsets preserve disabled settings", async ({
  page,
}) => {
  await page.goto("/point-symbol-3d");
  await showJSON(page);
  await page.getByRole("button", { name: "callout", exact: true }).click();
  await page
    .getByRole("switch", { name: "callout border enabled", exact: true })
    .click();
  const borderColor = page.getByRole("textbox", {
    name: "callout border color input",
    exact: true,
  });
  await borderColor.fill("#00ff00");
  await borderColor.press("Enter");
  await expect
    .poll(async () =>
      (await readSymbolJSON(page)).callout?.border?.color?.slice(0, 3),
    )
    .toEqual([0, 255, 0]);
  const callout = page.getByRole("switch", {
    name: "callout enabled",
    exact: true,
  });
  await callout.click();
  await expect
    .poll(async () => (await readSymbolJSON(page)).callout ?? null)
    .toBeNull();
  await callout.click();
  await expect
    .poll(async () =>
      (await readSymbolJSON(page)).callout?.border?.color?.slice(0, 3),
    )
    .toEqual([0, 255, 0]);
  await page
    .getByRole("button", { name: "verticalOffset", exact: true })
    .click();
  await fillNumber(page, "maxWorldLength input", "250");
  const offset = page.getByRole("switch", {
    name: "verticalOffset enabled",
    exact: true,
  });
  await offset.click();
  await expect
    .poll(async () => (await readSymbolJSON(page)).verticalOffset ?? null)
    .toBeNull();
  await offset.click();
  await expect(
    page.getByRole("textbox", { name: "maxWorldLength input", exact: true }),
  ).toHaveValue("250");
});

test("3D text appearance toggles preserve the text layer and effective size", async ({
  page,
}) => {
  await addLayer(page, "/point-symbol-3d", "Add TextSymbol3DLayer");
  await fillNumber(page, "size input", "24");
  await expect
    .poll(async () => (await readSymbolJSON(page)).symbolLayers[0].size)
    .toBe(24);
  await page.getByRole("button", { name: "font", exact: true }).click();
  await expect(
    page.getByRole("textbox", { name: "font size input", exact: true }),
  ).toHaveCount(0);
  await page.getByRole("button", { name: "background", exact: true }).click();
  const background = page.getByRole("switch", {
    name: "background enabled",
    exact: true,
  });
  await background.click();
  await expect
    .poll(
      async () =>
        (await readSymbolJSON(page)).symbolLayers[0].background ?? null,
    )
    .toBeNull();
  await page.getByRole("button", { name: "halo", exact: true }).click();
  await page.getByRole("switch", { name: "halo enabled", exact: true }).click();
  await expect
    .poll(async () => (await readSymbolJSON(page)).symbolLayers[0].halo ?? null)
    .toBeNull();
  await expect
    .poll(async () => (await readSymbolJSON(page)).symbolLayers[0].size)
    .toBe(24);
  await background.click();
  await expect
    .poll(async () => (await readSymbolJSON(page)).symbolLayers[0].background)
    .toBeTruthy();
});

test("the home page links to the simple marker editor", async ({ page }) => {
  await page.goto("/");
  await page.getByRole("link", { name: "SimpleMarkerSymbol Builder" }).click();
  await expect(page).toHaveURL(/\/simple-marker-symbol\/?$/);
  await showJSON(page);
  await expect.poll(async () => (await readSymbolJSON(page)).size).toBe(12);
});

test("editing a simple fill updates its JSON snippet", async ({ page }) => {
  await page.goto("/simple-fill-symbol");
  await selectProperty(page, "style selection", "cross");
  await showJSON(page);

  await expect
    .poll(async () => (await readSymbolJSON(page)).style)
    .toBe("esriSFSCross");
});

test("editing a picture marker resource updates its JSON snippet", async ({
  page,
}) => {
  await page.route("https://assets.test/**", (route) => route.abort());
  await page.goto("/picture-marker-symbol");
  const urlInput = page.getByRole("textbox", {
    name: "url input",
    exact: true,
  });
  await urlInput.fill("https://assets.test/marker.png");
  await urlInput.press("Enter");
  await showJSON(page);

  await expect
    .poll(async () => (await readSymbolJSON(page)).url)
    .toBe("https://assets.test/marker.png");
});

test("editing a picture fill resource updates its JSON snippet", async ({
  page,
}) => {
  await page.route("https://assets.test/**", (route) => route.abort());
  await page.goto("/picture-fill-symbol");
  const urlInput = page.getByRole("textbox", {
    name: "url input",
    exact: true,
  });
  await urlInput.fill("https://assets.test/fill.png");
  await urlInput.press("Enter");
  await showJSON(page);

  await expect
    .poll(async () => (await readSymbolJSON(page)).url)
    .toBe("https://assets.test/fill.png");
});

test("CIM Symbol Builder page embeds the CIM editor", async ({ page }) => {
  await page.goto("/cim-symbol");
  const editor = page.locator('iframe[title="CIM Symbol Builder"]');

  await expect(editor).toBeVisible();
  await expect(editor).toHaveAttribute(
    "src",
    "https://esri.github.io/cim-symbol-builder-js/",
  );
});

const layerEditors = [
  { route: "/line-symbol-3d", action: "Add LineSymbol3DLayer" },
  { route: "/mesh-symbol-3d", action: "Add FillSymbol3DLayer" },
  { route: "/point-symbol-3d", action: "Add IconSymbol3DLayer" },
  { route: "/polygon-symbol-3d", action: "Add FillSymbol3DLayer" },
] as const;

for (const editor of layerEditors) {
  test(`${editor.route} deletes its last layer and can add a fresh layer`, async ({ page }) => {
    await page.goto(editor.route);
    await showJSON(page);
    await expect
      .poll(async () => (await readSymbolJSON(page)).symbolLayers)
      .toEqual([]);

    await page.getByRole("button", { name: "Add symbol layer" }).click();
    await page.getByRole("button", { name: editor.action }).click();
    await expect
      .poll(async () => (await readSymbolJSON(page)).symbolLayers)
      .toHaveLength(1);
    const initialLayer = (await readSymbolJSON(page)).symbolLayers[0];

    const layerHeading = page.getByRole("button", {
      name: "symbolLayers[0]",
    });
    await expect(layerHeading).toBeVisible();
    await layerHeading.click();
    await page.getByRole("button", { name: "material", exact: true }).click();
    const material = page
      .locator("calcite-block")
      .filter({
        has: page.getByRole("button", { name: "material", exact: true }),
      })
      .last();
    await material.locator("calcite-input[type=color]").evaluate(
      (element: HTMLCalciteInputElement) => {
        element.value = "#ff0000";
        element.dispatchEvent(
          new CustomEvent("calciteInputInput", { bubbles: true }),
        );
      },
    );
    await expect
      .poll(async () =>
        (await readSymbolJSON(page)).symbolLayers[0].material.color.slice(0, 3),
      )
      .toEqual([255, 0, 0]);
    await page.getByRole("button", { name: "Delete" }).click();
    await expect(layerHeading).toHaveCount(0);
    await expect
      .poll(async () => (await readSymbolJSON(page)).symbolLayers)
      .toEqual([]);
    await page.getByRole("button", { name: "Add symbol layer" }).click();
    await page.getByRole("button", { name: editor.action }).click();
    await expect(layerHeading).toBeVisible();
    await expect
      .poll(async () => (await readSymbolJSON(page)).symbolLayers)
      .toEqual([initialLayer]);
  });
}
