import { SourceTextModule, SyntheticModule } from "node:vm";
import { expect, test } from "vitest";

const symbolTypes = [
  "LineSymbol3D",
  "MeshSymbol3D",
  "PictureFillSymbol",
  "PictureMarkerSymbol",
  "PointSymbol3D",
  "PolygonSymbol3D",
  "SimpleFillSymbol",
  "SimpleLineSymbol",
  "SimpleMarkerSymbol",
  "TextSymbol",
  "WebStyleSymbol",
] as const;
type SymbolType = (typeof symbolTypes)[number];
const formats = ["CDN", "ESM", "JSON"] as const;
type Format = (typeof formats)[number];
type OccludedVisibilityMode = "adaptive" | "hidden" | "visible";
const specialStrings = [
  'A "quoted" label',
  "C:\\symbols\\test",
  "first\nsecond",
  'quotes " and \\ backslashes\nwith a newline',
  "",
] as const;
type SnippetGenerator = (symbol: any) => string;
type ArcGISSymbolConstructor = new (properties?: any) => any;
type GeneratorModule = Record<string, SnippetGenerator>;
const constructors = {} as Record<SymbolType, ArcGISSymbolConstructor>;
const generators = {} as Record<SymbolType, GeneratorModule>;
const generatorModules = import.meta.glob<GeneratorModule>(
  ["./*.ts", "!./*.test.ts"],
  { eager: true },
);

for (const symbolType of symbolTypes) {
  constructors[symbolType] = (
    await import(`@arcgis/core/symbols/${symbolType}.js`)
  ).default;
  const moduleName = symbolType[0].toLowerCase() + symbolType.slice(1);
  generators[symbolType] = generatorModules[`./${moduleName}.ts`];
}

const initialOutline = { color: "#007ac2", miterLimit: 1, width: 1 };
const initialIcon = {
  type: "icon",
  anchor: "center",
  anchorPosition: { x: 0, y: 0 },
  material: { color: "red" },
  outline: { color: "black", size: 1.5 },
  resource: { primitive: "circle" },
  size: 12,
};
const initialObject = {
  type: "object",
  anchor: "center",
  anchorPosition: { x: 0, y: 0, z: 0 },
  castShadows: false,
  depth: 10,
  height: 10,
  width: 10,
  heading: 0,
  roll: 0,
  tilt: 0,
  material: { color: "red" },
  resource: { primitive: "sphere" },
};
const formCases: {
  name: string;
  type: SymbolType;
  initial: Record<string, unknown>;
  edited: Record<string, unknown>;
}[] = [
  {
    name: "simple line",
    type: "SimpleLineSymbol",
    initial: initialOutline,
    edited: {
      color: [15, 25, 35, 0.4], cap: "square", join: "bevel",
      miterLimit: 3, width: 4, style: "dash",
      marker: { color: [10, 20, 30, 0.5], placement: "end", style: "diamond" },
    },
  },
  {
    name: "simple marker",
    type: "SimpleMarkerSymbol",
    initial: { color: "#007ac2", outline: initialOutline },
    edited: {
      color: [15, 25, 35, 0.4], angle: 45, size: 22,
      style: "path", path: "M0 0 L10 10 Z", xoffset: 3, yoffset: 4,
      outline: { ...initialOutline, cap: "square", width: 3 },
    },
  },
  {
    name: "simple fill",
    type: "SimpleFillSymbol",
    initial: { color: "#007ac2", outline: initialOutline },
    edited: {
      color: [15, 25, 35, 0.4], style: "cross",
      outline: { ...initialOutline, join: "bevel", width: 3 },
    },
  },
  {
    name: "picture marker",
    type: "PictureMarkerSymbol",
    initial: {
      height: 100, width: 100,
      url: "https://sagewall.github.io/test-images/globie.png",
    },
    edited: {
      angle: 45, height: 30, width: 40,
      url: "https://example.com/marker.png", xoffset: 3, yoffset: 4,
    },
  },
  {
    name: "picture fill",
    type: "PictureFillSymbol",
    initial: {
      height: 75, width: 75,
      url: "https://sagewall.github.io/test-images/globie.png",
      outline: initialOutline,
    },
    edited: {
      height: 30, width: 40, url: "https://example.com/fill.png",
      xoffset: 3, yoffset: 4, xscale: 2, yscale: 3,
      outline: { ...initialOutline, color: [15, 25, 35, 0.4], width: 3 },
    },
  },
  {
    name: "text",
    type: "TextSymbol",
    initial: {
      backgroundColor: [255, 255, 255, 0], borderLineColor: [255, 255, 255, 0],
      borderLineSize: 0, font: { family: "Abril Fatface", size: 12 },
      haloColor: "#ffffff", haloSize: 0, kerning: false, text: "Hello World!",
    },
    edited: {
      angle: 45, backgroundColor: [15, 25, 35, 0.4],
      borderLineColor: [30, 40, 50, 0.6], borderLineSize: 3,
      color: [40, 50, 60, 0.5],
      font: {
        family: "Arial", size: 20, decoration: "underline",
        style: "italic", weight: "bold",
      },
      haloColor: [60, 70, 80, 0.3], haloSize: 2, horizontalAlignment: "right",
      kerning: true, lineHeight: 1.8, lineWidth: 250, rotated: true,
      text: 'Edited "label"\nSecond line', verticalAlignment: "top", xoffset: 3, yoffset: 4,
    },
  },
  {
    name: "point icon and object",
    type: "PointSymbol3D",
    initial: {
      callout: { type: "line", size: 1 },
      verticalOffset: { maxWorldLength: 100, minWorldLength: 0, screenLength: 0 },
      symbolLayers: [initialIcon, initialObject],
    },
    edited: {
      callout: {
        type: "line", color: [15, 25, 35, 0.4], size: 2,
        border: { color: "white" },
      },
      verticalOffset: { maxWorldLength: 250, minWorldLength: 10, screenLength: 20 },
      symbolLayers: [
        {
          ...initialIcon, anchor: "relative",
          anchorPosition: { x: 0.5, y: 0.25 }, angle: 45, size: 22,
          resource: { href: "https://example.com/icon.svg" },
        },
        {
          ...initialObject, anchor: "relative",
          anchorPosition: { x: 0.5, y: 0.25, z: -0.5 },
          depth: 12, height: 15, width: 18, heading: 45, roll: 20, tilt: 10,
          castShadows: true, resource: { primitive: "cube" },
        },
      ],
    },
  },
  {
    name: "point text",
    type: "PointSymbol3D",
    initial: {
      symbolLayers: [{
        type: "text", background: { color: "#aaaaaa" }, font: {},
        halo: { color: "black", size: 0 }, horizontalAlignment: "center",
        lineHeight: 1, material: { color: "white" }, size: 9,
        text: "Hello World!", verticalAlignment: "baseline",
      }],
    },
    edited: {
      symbolLayers: [{
        type: "text", background: { color: [15, 25, 35, 0.4] },
        font: {
          family: "Arial", weight: "bold",
          style: "italic", decoration: "underline",
        },
        halo: { color: "blue", size: 2 }, horizontalAlignment: "right",
        lineHeight: 1.8, material: { color: "red" }, size: 20,
        text: 'Edited "label"\nSecond line', verticalAlignment: "top",
      }],
    },
  },
  {
    name: "3D line and path",
    type: "LineSymbol3D",
    initial: {
      symbolLayers: [
        {
          type: "line", material: { color: "#007ac2" },
          pattern: { type: "style", style: "solid" }, size: 3,
        },
        {
          type: "path", castShadows: true, height: 5,
          material: { color: "#007ac2" }, profile: "quad", width: 3,
        },
      ],
    },
    edited: {
      worldSized: true,
      symbolLayers: [
        {
          type: "line", cap: "round", join: "bevel",
          material: { color: "blue" },
          pattern: { type: "template", dashTemplate: [[3, 2], [1, 2]] }, size: 6,
        },
        {
          type: "path", anchor: "bottom", cap: "round", join: "bevel",
          castShadows: false, height: 8, material: { color: "red" },
          profile: "circle", profileRotation: "heading", width: 5,
        },
      ],
    },
  },
  {
    name: "polygon layers",
    type: "PolygonSymbol3D",
    initial: {
      symbolLayers: [
        {
          type: "fill",
          material: { color: "#007ac2", colorMixMode: "multiply" },
          outline: {
            color: "#111111", pattern: { type: "style", style: "solid" }, size: 3,
          },
          pattern: { type: "style", style: "solid" },
        },
        {
          type: "extrude", edges: { type: "solid", size: 1 },
          material: { color: "#007ac2" }, size: 20,
        },
        initialIcon, initialObject, { type: "water", waveDirection: 0 },
      ],
    },
    edited: {
      symbolLayers: [
        {
          type: "fill", castShadows: false,
          material: { color: "red", colorMixMode: "replace" },
          outline: {
            color: "blue", pattern: { type: "style", style: "dash" },
            patternCap: "round", size: 5,
          },
          pattern: { type: "style", style: "cross" },
        },
        {
          type: "extrude",
          edges: { type: "sketch", color: "blue", size: 2, extensionLength: 3 },
          material: { color: "red" }, size: 35, castShadows: false,
        },
        {
          type: "water", color: "red", waveDirection: 90,
          waveStrength: "strong", waterbodySize: "large",
        },
      ],
    },
  },
  {
    name: "mesh fill",
    type: "MeshSymbol3D",
    initial: {
      symbolLayers: [{
        type: "fill",
        material: { color: "#007ac2", colorMixMode: "multiply" },
        edges: { type: "solid", color: "black" },
        pattern: { type: "style", style: "solid" },
      }],
    },
    edited: {
      symbolLayers: [{
        type: "fill", castShadows: false,
        material: {
          color: "red", colorMixMode: "replace",
          emissive: { source: "color", strength: 0.6 },
        },
        edges: { type: "sketch", size: 2, extensionLength: 3 },
        pattern: { type: "style", style: "cross" },
      }],
    },
  },
  {
    name: "web style",
    type: "WebStyleSymbol",
    initial: {
      name: "Armadillo",
      styleUrl: "https://www.arcgis.com/sharing/rest/content/items/1fbb242c54e4415d9b8e8a343ca7a9d0/data",
    },
    edited: {
      name: "Cell_Phone_Antenna", styleName: "EsriInfrastructureStyle",
      portal: { url: "https://portal.example.test" },
    },
  },
];

for (const fixture of formCases) {
  for (const state of ["initial", "edited"] as const) {
    for (const format of formats) {
      test(`${fixture.name} ${state} ${format} snippet matches all symbol properties`, async () => {
        const symbol = new constructors[fixture.type](fixture[state]);
        const result = await roundTrip(fixture.type, format, symbol);
        expect(JSON.parse(JSON.stringify(result.toJSON()))).toEqual(
          JSON.parse(JSON.stringify(symbol.toJSON())),
        );
      });
    }
  }
}

async function executeSnippet(
  snippet: string,
  variableName: string,
  format: Format,
): Promise<any> {
  const prefix = format === "CDN" ? 'import $arcgis from "test:arcgis";\n' : "";
  const module = new SourceTextModule(
    `${prefix}${snippet}\nexport default ${variableName};`,
  );
  await module.link(async (specifier: string) => {
    const value =
      specifier === "test:arcgis"
        ? { import: async (path: string) => (await import(path)).default }
        : (await import(specifier)).default;
    return new SyntheticModule(["default"], function () {
      this.setExport("default", value);
    });
  });
  await module.evaluate();
  return (module.namespace as Record<string, any>).default;
}

async function roundTrip(
  symbolType: SymbolType,
  format: Format,
  symbol: any,
): Promise<any> {
  const generate =
    generators[symbolType][`generate${symbolType}${format}Snippet`];
  const before = symbol.toJSON();
  const snippet = generate(symbol);
  const variableName = symbolType[0].toLowerCase() + symbolType.slice(1);
  const result = await executeSnippet(snippet, variableName, format);

  expect(symbol.toJSON(), "generation must not mutate the input").toEqual(
    before,
  );
  expect(generate(symbol), "generation must be deterministic").toBe(snippet);
  expect(result).toBeInstanceOf(constructors[symbolType]);
  return result;
}

for (const format of formats) {
  test(`TextSymbol ${format} preserves lineHeight`, async () => {
    const symbol = new constructors.TextSymbol({ lineHeight: 1.75 });
    const result = await roundTrip("TextSymbol", format, symbol);
    expect(result.lineHeight).toBe(1.75);
  });
}

for (const [symbolType, layerType] of [
  ["MeshSymbol3D", "fill"],
  ["PolygonSymbol3D", "extrude"],
] as const) {
  for (const format of formats) {
    for (const edgeType of [null, "solid", "sketch"] as const) {
      test(`${symbolType} ${format} preserves ${edgeType} edges`, async () => {
        const symbol = new constructors[symbolType]({
          symbolLayers: [
            {
              type: layerType,
              material: { color: "red" },
              edges: edgeType
                ? { type: edgeType, color: "blue", size: 2, extensionLength: 3 }
                : null,
            },
          ],
        });
        const result = await roundTrip(symbolType, format, symbol);
        expect(result.symbolLayers.length).toBe(1);
        expect(
          result.symbolLayers.getItemAt(0).edges?.toJSON() ?? null,
        ).toEqual(symbol.symbolLayers.getItemAt(0).edges?.toJSON() ?? null);
      });
    }
  }
}

for (const format of formats) {
  for (const background of [null, { color: "white" }]) {
    for (const halo of [null, { color: "black", size: 2 }]) {
      test(`PointSymbol3D ${format} preserves text appearance ${JSON.stringify({ background, halo })}`, async () => {
        const symbol = new constructors.PointSymbol3D({
          symbolLayers: [
            {
              type: "text",
              text: "Label",
              font: { family: "Arial", size: 9 },
              size: 20,
              background,
              halo,
              material: { color: "red" },
            },
          ],
        });
        const result = await roundTrip("PointSymbol3D", format, symbol);
        expect(result.symbolLayers.length).toBe(1);
        const layer = result.symbolLayers.getItemAt(0);
        expect(layer.size).toBe(20);
        expect(layer.background?.toJSON() ?? null).toEqual(
          symbol.symbolLayers.getItemAt(0).background?.toJSON() ?? null,
        );
        expect(layer.halo?.toJSON() ?? null).toEqual(
          symbol.symbolLayers.getItemAt(0).halo?.toJSON() ?? null,
        );
      });
    }
  }
}

test.each(formats)(
  "PointSymbol3D %s preserves color transparency in constructor properties",
  async (format) => {
    const symbol = new constructors.PointSymbol3D({
      callout: {
        type: "line",
        color: [255, 0, 0, 0.25],
        border: { color: [0, 0, 255, 0.5], size: 2 },
      },
      symbolLayers: [
        {
          type: "text",
          text: "Label",
          font: { family: "Arial", size: 9 },
          background: { color: [0, 255, 0, 0.4] },
          halo: { color: [0, 0, 255, 0.75], size: 2 },
          material: { color: "red" },
        },
      ],
    });

    const result = await roundTrip("PointSymbol3D", format, symbol);
    const layer = result.symbolLayers.getItemAt(0);

    expect(result.callout.color.toRgba()[3]).toBeCloseTo(0.25);
    expect(result.callout.border.color.toRgba()[3]).toBeCloseTo(0.5);
    expect(layer.background.color.toRgba()[3]).toBeCloseTo(0.4);
    expect(layer.halo.color.toRgba()[3]).toBeCloseTo(0.75);
  },
);

for (const format of formats) {
  test(`MeshSymbol3D ${format} preserves edge transparency`, async () => {
    const symbol = new constructors.MeshSymbol3D({
      symbolLayers: [
        {
          type: "fill",
          material: { color: "red" },
          edges: { type: "solid", color: [0, 0, 255, 0.35] },
        },
      ],
    });
    const result = await roundTrip("MeshSymbol3D", format, symbol);

    expect(
      result.symbolLayers.getItemAt(0).edges.color.toRgba()[3],
    ).toBeCloseTo(0.35);
  });

  test(`PolygonSymbol3D ${format} preserves edge transparency`, async () => {
    const symbol = new constructors.PolygonSymbol3D({
      symbolLayers: [
        {
          type: "extrude",
          material: { color: "red" },
          edges: { type: "solid", color: [0, 0, 255, 0.65] },
        },
      ],
    });
    const result = await roundTrip("PolygonSymbol3D", format, symbol);

    expect(
      result.symbolLayers.getItemAt(0).edges.color.toRgba()[3],
    ).toBeCloseTo(0.65);
  });
}

const emissiveCases = [
  { symbolType: "LineSymbol3D", layerType: "path" },
  { symbolType: "MeshSymbol3D", layerType: "fill" },
  { symbolType: "PointSymbol3D", layerType: "object" },
  { symbolType: "PolygonSymbol3D", layerType: "extrude" },
  { symbolType: "PolygonSymbol3D", layerType: "object" },
] as const;

for (const format of formats) {
  for (const callout of [
    null,
    { color: "red", size: 2, border: { color: "blue" } },
    { color: "red", size: 1, border: null },
  ]) {
    test(`PointSymbol3D ${format} preserves callout ${JSON.stringify(callout)}`, async () => {
      const symbol = new constructors.PointSymbol3D({
        callout,
        verticalOffset: null,
      });
      const result = await roundTrip("PointSymbol3D", format, symbol);
      expect(result.callout?.toJSON() ?? null).toEqual(
        symbol.callout?.toJSON() ?? null,
      );
      expect(result.verticalOffset).toBeNull();
    });
  }
}

for (const { symbolType, layerType } of emissiveCases) {
  for (const format of formats) {
    test(`${symbolType} ${layerType} ${format} preserves emissive material`, async () => {
      const emissive = { source: "color", strength: 0.6 };
      const symbol = new constructors[symbolType]({
        symbolLayers: [
          {
            type: layerType,
            material: {
              color: "red",
              emissive,
              ...(layerType === "fill" ? { colorMixMode: "multiply" } : {}),
            },
            ...(layerType === "fill"
              ? { pattern: { type: "style", style: "solid" } }
              : {}),
            ...(layerType === "object"
              ? {
                  resource: { primitive: "sphere" },
                  anchorPosition: { x: 0, y: 0, z: 0 },
                }
              : {}),
            ...(layerType === "fill" || layerType === "extrude"
              ? { edges: { type: "solid" } }
              : {}),
          },
        ],
      });
      const result = await roundTrip(symbolType, format, symbol);
      expect(
        result.symbolLayers.getItemAt(0).material.emissive.toJSON(),
      ).toEqual(emissive);
    });
  }
}

for (const symbolType of symbolTypes) {
  for (const format of formats) {
    test(`${symbolType} ${format} snippet constructs a symbol without mutating its input`, async () => {
      const properties =
        symbolType === "WebStyleSymbol"
          ? { name: "test", styleName: "Esri2DPointSymbolsStyle" }
          : {};
      await roundTrip(
        symbolType,
        format,
        new constructors[symbolType](properties),
      );
    });
  }
}

test.each(["CDN", "ESM"] as const)(
  "PictureFillSymbol %s omits an unspecified outline",
  async (format) => {
    const symbol = new constructors.PictureFillSymbol({
      url: "https://example.com/fill.png",
    });
    const snippet =
      generators.PictureFillSymbol[`generatePictureFillSymbol${format}Snippet`](
        symbol,
      );

    expect(snippet).not.toContain("outline:");
    const result = await roundTrip("PictureFillSymbol", format, symbol);
    expect(result.outline?.toJSON() ?? null).toEqual(
      symbol.outline?.toJSON() ?? null,
    );
  },
);

test.each(formats)(
  "LineSymbol3D %s preserves worldSized",
  async (format: Format) => {
    for (const worldSized of [true, false]) {
      const symbol = new constructors.LineSymbol3D({
        worldSized,
        symbolLayers: [
          {
            type: "line",
            material: { color: "red" },
            pattern: { type: "style", style: "solid" },
            size: 6,
          },
        ],
      });
      const result = await roundTrip("LineSymbol3D", format, symbol);

      expect(result.worldSized).toBe(worldSized);
      expect(result.symbolLayers.getItemAt(0).size).toBe(6);
    }
  },
);

test.each([true, false])(
  "LineSymbol3D ESM preserves line markers (enabled=%s)",
  async (markerEnabled: boolean) => {
    const symbol = new constructors.LineSymbol3D({
      symbolLayers: [
        {
          type: "line",
          material: { color: "red" },
          pattern: { type: "style", style: "solid" },
          marker: markerEnabled
            ? {
                type: "style",
                color: "blue",
                placement: "begin-end",
                style: "arrow",
              }
            : null,
        },
      ],
    });
    const snippet =
      generators.LineSymbol3D.generateLineSymbol3DESMSnippet(symbol);
    const markerImport =
      'import LineStyleMarker3D from "@arcgis/core/symbols/LineStyleMarker3D.js";';

    expect(snippet.includes(markerImport)).toBe(markerEnabled);
    const result = await roundTrip("LineSymbol3D", "ESM", symbol);

    expect(result.symbolLayers.length).toBe(1);
    expect(result.symbolLayers.getItemAt(0).marker?.toJSON() ?? null).toEqual(
      symbol.symbolLayers.getItemAt(0).marker?.toJSON() ?? null,
    );
  },
);

test.each([true, false])(
  "LineSymbol3D CDN preserves path castShadows (value=%s)",
  async (castShadows: boolean) => {
    const symbol = new constructors.LineSymbol3D({
      symbolLayers: [
        {
          type: "path",
          castShadows,
          height: 5,
          width: 3,
          material: { color: "red" },
          profile: "quad",
        },
      ],
    });
    const result = await roundTrip("LineSymbol3D", "CDN", symbol);

    expect(result.symbolLayers.length).toBe(1);
    const layer = result.symbolLayers.getItemAt(0);
    expect(layer.type).toBe("path");
    expect(layer.castShadows).toBe(castShadows);
    expect(typeof layer.castShadows).toBe("boolean");
  },
);

test.each([
  ["ESM", true],
  ["ESM", false],
  ["CDN", true],
  ["CDN", false],
] as const)(
  "PolygonSymbol3D %s preserves fill castShadows (value=%s)",
  async (format, castShadows) => {
    const symbol = new constructors.PolygonSymbol3D({
      symbolLayers: [
        {
          type: "fill",
          castShadows,
          material: { color: "red", colorMixMode: "multiply" },
          outline: {
            color: "black",
            pattern: { type: "style", style: "solid" },
            patternCap: "round",
            size: 3,
          },
          pattern: { type: "style", style: "solid" },
        },
      ],
    });
    const result = await roundTrip("PolygonSymbol3D", format, symbol);

    expect(result.symbolLayers.length).toBe(1);
    const layer = result.symbolLayers.getItemAt(0);
    expect(layer.type).toBe("fill");
    expect(layer.castShadows).toBe(castShadows);
    expect(typeof layer.castShadows).toBe("boolean");
  },
);

test.each(formats)(
  "WebStyleSymbol %s preserves named-style portal URL",
  async (format: Format) => {
    const portalUrl = "https://enterprise.example.com/portal";
    const symbol = new constructors.WebStyleSymbol({
      name: "Accessibility",
      styleName: "EsriIconsStyle",
      portal: { url: portalUrl },
    });
    const generate =
      generators.WebStyleSymbol[`generateWebStyleSymbol${format}Snippet`];
    const snippet = generate(symbol);
    const result = await roundTrip("WebStyleSymbol", format, symbol);

    expect(result.styleName).toBe("EsriIconsStyle");
    expect(result.portal?.url).toBe(portalUrl);
    if (format !== "JSON") {
      expect(snippet).toContain(
        `portal: { url: ${JSON.stringify(portalUrl)} },`,
      );
    }
  },
);

test.each([
  ["PointSymbol3D", "CDN"],
  ["PolygonSymbol3D", "CDN"],
  ["PolygonSymbol3D", "ESM"],
] as const)(
  "%s %s preserves URL-backed icon angle",
  async (symbolType, format) => {
    const symbol = new constructors[symbolType]({
      symbolLayers: [
        {
          type: "icon",
          anchor: "center",
          anchorPosition: { x: 0, y: 0 },
          angle: 47,
          material: { color: "red" },
          outline: { color: "black", size: 1 },
          resource: { href: "https://example.com/icon.svg" },
          size: 12,
        },
      ],
    });
    const result = await roundTrip(symbolType, format, symbol);

    expect(result.symbolLayers.getItemAt(0).angle).toBe(47);
  },
);

interface OccludedVisibilityCase {
  symbolType: "PointSymbol3D" | "PolygonSymbol3D";
  symbolLayers: (mode: OccludedVisibilityMode) => Record<string, unknown>[];
}

const occludedVisibilityCases: OccludedVisibilityCase[] = [
  {
    symbolType: "PointSymbol3D",
    symbolLayers: (mode) => [
      {
        type: "icon",
        anchor: "center",
        anchorPosition: { x: 0, y: 0 },
        material: { color: "red" },
        occludedVisibility: { mode },
        outline: { color: "black", size: 1 },
        resource: { href: "https://example.com/icon.svg" },
        size: 12,
      },
      {
        type: "text",
        text: "Label",
        font: { family: "Arial", size: 9 },
        background: { color: "white" },
        halo: { color: "black", size: 1 },
        material: { color: "red" },
        occludedVisibility: { mode },
        size: 9,
      },
    ],
  },
  {
    symbolType: "PolygonSymbol3D",
    symbolLayers: (mode) => [
      {
        type: "icon",
        anchor: "center",
        anchorPosition: { x: 0, y: 0 },
        material: { color: "red" },
        occludedVisibility: { mode },
        outline: { color: "black", size: 1 },
        resource: { href: "https://example.com/icon.svg" },
        size: 12,
      },
      {
        type: "icon",
        anchor: "center",
        anchorPosition: { x: 0, y: 0 },
        material: { color: "blue" },
        occludedVisibility: { mode },
        outline: { color: "black", size: 1 },
        resource: { primitive: "circle" },
        size: 12,
      },
    ],
  },
];

for (const { symbolType, symbolLayers } of occludedVisibilityCases) {
  for (const format of formats) {
    for (const mode of ["adaptive", "hidden", "visible"] as const) {
      test(`${symbolType} ${format} preserves occludedVisibility=${mode}`, async () => {
        const symbol = new constructors[symbolType]({
          symbolLayers: symbolLayers(mode),
        });
        const generate =
          generators[symbolType][`generate${symbolType}${format}Snippet`];
        const snippet = generate(symbol);
        const result = await roundTrip(symbolType, format, symbol);

        if (format === "JSON") {
          expect(snippet).toMatch(
            /"occludedVisibility": \{\n\s+"mode": "[^"]+"\n\s+\},?/,
          );
        } else {
          expect(snippet).toMatch(
            /^([ \t]*)occludedVisibility: \{\n\1  mode: "[^"]+"\n\1\},?$/m,
          );
          expect(
            [...snippet.matchAll(/^([ \t]*)occludedVisibility: \{/gm)].map(
              ([, indentation]) => indentation,
            ),
          ).toEqual(
            [...snippet.matchAll(/^([ \t]*)material: \{/gm)].map(
              ([, indentation]) => indentation,
            ),
          );
        }
        expect(result.symbolLayers.length).toBe(symbolLayers(mode).length);
        expect(
          Array.from(
            result.symbolLayers,
            (layer: any) => layer.occludedVisibility?.mode ?? null,
          ),
        ).toEqual(symbolLayers(mode).map(() => mode));
      });
    }
  }
}

for (const format of formats) {
  for (const markerEnabled of [true, false]) {
    test.each([
      { type: "style", style: "dash" },
      { type: "template", dashTemplate: [10, 6, 2, 6] },
      null,
    ] as const)(
      `LineSymbol3D ${format} preserves pattern %j (marker=${markerEnabled})`,
      async (pattern) => {
        const symbol = new constructors.LineSymbol3D({
          symbolLayers: [
            {
              type: "line",
              material: { color: "red" },
              pattern,
              marker: markerEnabled
                ? {
                    type: "style",
                    color: "blue",
                    placement: "begin-end",
                    style: "arrow",
                  }
                : null,
            },
          ],
        });
        const result = await roundTrip("LineSymbol3D", format, symbol);

        expect(result.symbolLayers.length).toBe(1);
        expect(
          result.symbolLayers.getItemAt(0).pattern?.toJSON() ?? null,
        ).toEqual(symbol.symbolLayers.getItemAt(0).pattern?.toJSON() ?? null);
      },
    );
  }
}

interface LayerCase {
  symbolType: "MeshSymbol3D" | "PolygonSymbol3D";
  description: string;
  symbolLayers: Record<string, unknown>[];
  verify: (symbol: any) => void;
}

const layerCases: LayerCase[] = [
  {
    symbolType: "MeshSymbol3D",
    description: "fill layer",
    symbolLayers: [
      {
        type: "fill",
        castShadows: false,
        edges: { type: "solid", color: "black", extensionLength: 2, size: 1.5 },
        material: { color: "red", colorMixMode: "replace" },
        pattern: { type: "style", style: "solid" },
      },
    ],
    verify: (symbol) => {
      const layer = symbol.symbolLayers.getItemAt(0);
      expect(layer.type).toBe("fill");
      expect(layer.castShadows).toBe(false);
      expect(layer.edges.extensionLength).toBe(2);
      expect(layer.edges.size).toBe(1.5);
      expect(layer.material.colorMixMode).toBe("replace");
      expect(layer.pattern.style).toBe("solid");
    },
  },
  {
    symbolType: "PolygonSymbol3D",
    description: "extrude layer",
    symbolLayers: [
      {
        type: "extrude",
        castShadows: false,
        edges: { type: "solid", color: "black", extensionLength: 4, size: 2 },
        material: { color: "red" },
        size: 17,
      },
    ],
    verify: (symbol) => {
      const layer = symbol.symbolLayers.getItemAt(0);
      expect(layer.type).toBe("extrude");
      expect(layer.castShadows).toBe(false);
      expect(layer.edges.extensionLength).toBe(4);
      expect(layer.edges.size).toBe(2);
      expect(layer.size).toBe(17);
    },
  },
  {
    symbolType: "PolygonSymbol3D",
    description: "water layer",
    symbolLayers: [
      {
        type: "water",
        color: "blue",
        waterbodySize: "large",
        waveDirection: 73,
        waveStrength: "moderate",
      },
    ],
    verify: (symbol) => {
      const layer = symbol.symbolLayers.getItemAt(0);
      expect(layer.type).toBe("water");
      expect(layer.waterbodySize).toBe("large");
      expect(layer.waveDirection).toBe(73);
      expect(layer.waveStrength).toBe("moderate");
    },
  },
];

for (const layerCase of layerCases) {
  for (const format of formats) {
    test(`${layerCase.symbolType} ${format} preserves ${layerCase.description} properties`, async () => {
      const symbol = new constructors[layerCase.symbolType]({
        symbolLayers: layerCase.symbolLayers,
      });
      const result = await roundTrip(layerCase.symbolType, format, symbol);

      expect(result.symbolLayers.length).toBe(layerCase.symbolLayers.length);
      layerCase.verify(result);
    });
  }
}

for (const symbolType of ["PointSymbol3D", "PolygonSymbol3D"] as const) {
  for (const format of formats) {
    test(`${symbolType} ${format} preserves primitive icon and object resources`, async () => {
      const symbol = new constructors[symbolType]({
        symbolLayers: [
          {
            type: "icon",
            anchor: "center",
            anchorPosition: { x: 0, y: 0 },
            angle: 28,
            material: { color: "red" },
            outline: { color: "black", size: 1.5 },
            resource: { primitive: "kite" },
            size: 16,
          },
          {
            type: "object",
            anchor: "center",
            anchorPosition: { x: 0, y: 0, z: 0 },
            castShadows: false,
            depth: 8,
            heading: 13,
            height: 11,
            material: { color: "blue" },
            resource: { primitive: "cube" },
            roll: 7,
            tilt: 9,
            width: 10,
          },
        ],
      });
      const result = await roundTrip(symbolType, format, symbol);
      const icon = result.symbolLayers.getItemAt(0);
      const object = result.symbolLayers.getItemAt(1);

      expect(result.symbolLayers.length).toBe(2);
      expect(icon.type).toBe("icon");
      expect(icon.resource.primitive).toBe("kite");
      expect(icon.angle).toBe(28);
      expect(object.type).toBe("object");
      expect(object.resource.primitive).toBe("cube");
      expect(object.castShadows).toBe(false);
      expect(object.depth).toBe(8);
      expect(object.heading).toBe(13);
      expect(object.height).toBe(11);
      expect(object.roll).toBe(7);
      expect(object.tilt).toBe(9);
      expect(object.width).toBe(10);
    });
  }
}

const resourceLayers = (value: string): Record<string, unknown>[] => [
  {
    type: "icon",
    anchor: "center",
    anchorPosition: { x: 0, y: 0 },
    angle: 0,
    material: { color: "red" },
    outline: { color: "black", size: 1 },
    resource: { href: `https://example.com/${value}` },
    size: 12,
  },
  {
    type: "object",
    anchor: "center",
    anchorPosition: { x: 0, y: 0, z: 0 },
    castShadows: false,
    depth: 10,
    heading: 0,
    height: 10,
    material: { color: "blue" },
    resource: { href: `https://example.com/${value}` },
    roll: 0,
    tilt: 0,
    width: 10,
  },
];
const resourceValues = (symbol: any): string[] =>
  Array.from(
    symbol.symbolLayers,
    (layer: any) => layer.resource.href as string,
  );
interface StringCase {
  symbolType: SymbolType;
  field: string;
  properties: (value: string) => Record<string, unknown>;
  values: (symbol: any) => unknown;
  allowEmpty?: boolean;
}

const stringCases: StringCase[] = [
  {
    symbolType: "TextSymbol",
    field: "text and font family",
    properties: (value) => ({ text: value, font: { family: value } }),
    values: (symbol) => [symbol.text, symbol.font.family],
  },
  ...(["PictureFillSymbol", "PictureMarkerSymbol"] as const).map(
    (symbolType) => ({
      symbolType,
      field: "url",
      properties: (value: string) => ({ url: `https://example.com/${value}` }),
      values: (symbol: any) => symbol.url,
    }),
  ),
  {
    symbolType: "SimpleMarkerSymbol",
    field: "path",
    properties: (value) => ({ style: "path", path: value }),
    values: (symbol) => symbol.path,
  },
  {
    symbolType: "WebStyleSymbol",
    field: "name and styleName",
    properties: (value) => ({ name: value, styleName: value }),
    values: (symbol) => [symbol.name, symbol.styleName],
    allowEmpty: false,
  },
  {
    symbolType: "WebStyleSymbol",
    field: "name and styleUrl",
    properties: (value) => ({
      name: value,
      styleUrl: `https://example.com/${value}`,
    }),
    values: (symbol) => [symbol.name, symbol.styleUrl],
  },
  {
    symbolType: "PointSymbol3D",
    field: "text layer text and font family",
    properties: (value) => ({
      symbolLayers: [
        {
          type: "text",
          text: value,
          font: { family: value },
          background: { color: "white" },
          halo: { color: "white", size: 1 },
          material: { color: "black" },
        },
      ],
    }),
    values: (symbol) => {
      const layer = symbol.symbolLayers.getItemAt(0);
      return [layer.text, layer.font.family];
    },
  },
  ...(["PointSymbol3D", "PolygonSymbol3D"] as const).map((symbolType) => ({
    symbolType,
    field: "icon and object resource href",
    properties: (value: string) => ({ symbolLayers: resourceLayers(value) }),
    values: resourceValues,
    allowEmpty: false,
  })),
];

for (const {
  symbolType,
  field,
  properties,
  values,
  allowEmpty = true,
} of stringCases) {
  for (const format of formats) {
    for (const value of specialStrings) {
      if (!allowEmpty && value === "") continue;
      test(`${symbolType} ${format} ${field} preserves ${JSON.stringify(value)}`, async () => {
        const symbol = new constructors[symbolType](properties(value));
        const expected = values(symbol);
        const result = await roundTrip(symbolType, format, symbol);

        expect(values(result)).toEqual(expected);
      });
    }
  }
}
