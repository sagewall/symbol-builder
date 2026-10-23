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
];
const formats = ["CDN", "ESM", "JSON"];
const specialStrings = [
  'A "quoted" label',
  "C:\\symbols\\test",
  "first\nsecond",
  'quotes " and \\ backslashes\nwith a newline',
  "",
];
const constructors = {};
const generators = {};
const generatorModules = import.meta.glob("./*.ts", { eager: true });

for (const symbolType of symbolTypes) {
  constructors[symbolType] = (
    await import(`@arcgis/core/symbols/${symbolType}.js`)
  ).default;
  const moduleName = symbolType[0].toLowerCase() + symbolType.slice(1);
  generators[symbolType] = generatorModules[`./${moduleName}.ts`];
}

async function executeSnippet(snippet, variableName, format) {
  const prefix = format === "CDN" ? 'import $arcgis from "test:arcgis";\n' : "";
  const module = new SourceTextModule(
    `${prefix}${snippet}\nexport default ${variableName};`,
  );
  await module.link(async (specifier) => {
    const value =
      specifier === "test:arcgis"
        ? { import: async (path) => (await import(path)).default }
        : (await import(specifier)).default;
    return new SyntheticModule(["default"], function () {
      this.setExport("default", value);
    });
  });
  await module.evaluate();
  return module.namespace.default;
}

async function roundTrip(symbolType, format, symbol) {
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

test.each([true, false])(
  "LineSymbol3D ESM preserves line markers (enabled=%s)",
  async (markerEnabled) => {
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
  async (castShadows) => {
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
])(
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

const resourceLayers = (value) => [
  {
    type: "icon",
    anchorPosition: { x: 0, y: 0 },
    material: { color: "red" },
    outline: { color: "black", size: 1 },
    resource: { href: `https://example.com/${value}` },
  },
  {
    type: "object",
    material: { color: "blue" },
    resource: { href: `https://example.com/${value}` },
  },
];
const resourceValues = (symbol) =>
  Array.from(symbol.symbolLayers, (layer) => layer.resource.href);
const stringCases = [
  {
    symbolType: "TextSymbol",
    field: "text and font family",
    properties: (value) => ({ text: value, font: { family: value } }),
    values: (symbol) => [symbol.text, symbol.font.family],
  },
  ...["PictureFillSymbol", "PictureMarkerSymbol"].map((symbolType) => ({
    symbolType,
    field: "url",
    properties: (value) => ({ url: `https://example.com/${value}` }),
    values: (symbol) => symbol.url,
  })),
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
  ...["PointSymbol3D", "PolygonSymbol3D"].map((symbolType) => ({
    symbolType,
    field: "icon and object resource href",
    properties: (value) => ({ symbolLayers: resourceLayers(value) }),
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
