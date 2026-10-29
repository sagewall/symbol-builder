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
  await input.fill("[8,");
  await input.press("Enter");
  await expect(
    page.getByText("Expected a non-empty array of finite numbers.", {
      exact: true,
    }),
  ).toBeVisible();
  await expect
    .poll(
      async () =>
        (await readSymbolJSON(page)).symbolLayers[0].pattern?.dashTemplate,
    )
    .toEqual([8, 3, 1, 3]);
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

for (const draft of ["", "17"]) {
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
