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

test.each([
  ["PointSymbol3D", "CDN"],
  ["PolygonSymbol3D", "CDN"],
  ["PolygonSymbol3D", "ESM"],
])("%s %s preserves URL-backed icon angle", async (symbolType, format) => {
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
});

for (const format of formats) {
  for (const markerEnabled of [true, false]) {
    test.each([
      { type: "style", style: "dash" },
      { type: "template", dashTemplate: [10, 6, 2, 6] },
      null,
    ])(
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

const layerCases = [
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

for (const symbolType of ["PointSymbol3D", "PolygonSymbol3D"]) {
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
