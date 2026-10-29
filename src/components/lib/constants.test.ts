import type Accessor from "@arcgis/core/core/Accessor.js";
import FillSymbol3DLayer from "@arcgis/core/symbols/FillSymbol3DLayer.js";
import Font from "@arcgis/core/symbols/Font.js";
import IconSymbol3DLayer from "@arcgis/core/symbols/IconSymbol3DLayer.js";
import LineStyleMarker3D from "@arcgis/core/symbols/LineStyleMarker3D.js";
import LineSymbol3DLayer from "@arcgis/core/symbols/LineSymbol3DLayer.js";
import LineSymbolMarker from "@arcgis/core/symbols/LineSymbolMarker.js";
import ObjectSymbol3DLayer from "@arcgis/core/symbols/ObjectSymbol3DLayer.js";
import PathSymbol3DLayer from "@arcgis/core/symbols/PathSymbol3DLayer.js";
import SimpleFillSymbol from "@arcgis/core/symbols/SimpleFillSymbol.js";
import SimpleLineSymbol from "@arcgis/core/symbols/SimpleLineSymbol.js";
import SimpleMarkerSymbol from "@arcgis/core/symbols/SimpleMarkerSymbol.js";
import TextSymbol from "@arcgis/core/symbols/TextSymbol.js";
import TextSymbol3DLayer from "@arcgis/core/symbols/TextSymbol3DLayer.js";
import WaterSymbol3DLayer from "@arcgis/core/symbols/WaterSymbol3DLayer.js";
import LineStylePattern3D from "@arcgis/core/symbols/patterns/LineStylePattern3D.js";
import LineTemplatePattern3D from "@arcgis/core/symbols/patterns/LineTemplatePattern3D.js";
import SolidEdges3D from "@arcgis/core/symbols/edges/SolidEdges3D.js";
import SketchEdges3D from "@arcgis/core/symbols/edges/SketchEdges3D.js";
import StylePattern3D from "@arcgis/core/symbols/patterns/StylePattern3D.js";
import IconSymbol3DLayerResource from "@arcgis/core/symbols/support/IconSymbol3DLayerResource.js";
import ObjectSymbol3DLayerResource from "@arcgis/core/symbols/support/ObjectSymbol3DLayerResource.js";
import Symbol3DOutline from "@arcgis/core/symbols/support/Symbol3DOutline.js";
import { Symbol3DEmissive } from "@arcgis/core/symbols/support/Symbol3DEmissive.js";
import { afterEach, expect, test, vi } from "vitest";
import * as options from "./constants";
import { colorMixModeOptions } from "./constants";

afterEach(() => vi.restoreAllMocks());

test("variant selectors match SDK discriminators", () => {
  expect(options.edgeStyleOptions).toEqual([
    new SolidEdges3D().type,
    new SketchEdges3D().type,
  ]);
  expect(options.linePatternTypeOptions).toEqual([
    new LineStylePattern3D().type,
    new LineTemplatePattern3D().type,
  ]);
});

test("fill material color mix mode options are accepted by the SDK", () => {
  expect(colorMixModeOptions).toEqual(["multiply", "replace", "tint"]);

  const symbolLayer = new FillSymbol3DLayer({
    material: { color: "#007ac2", colorMixMode: "multiply" },
  });
  const material = symbolLayer.material!;

  for (const mode of colorMixModeOptions) {
    material.colorMixMode = mode === "multiply" ? "replace" : "multiply";
    material.colorMixMode = mode;
    expect(material.colorMixMode).toBe(mode);
  }
});

test("option registries preserve UI order and produce immutable arrays", () => {
  expect(options.capOptions).toEqual(["round", "butt", "square"]);
  expect(options.horizontalAlignmentOptions).toEqual([
    "center",
    "right",
    "left",
  ]);
  expect(Object.isFrozen(options.capOptions)).toBe(true);
  expect(Object.isFrozen(options.horizontalAlignmentOptions)).toBe(true);
});

function expectRejectedOption<
  Target extends Accessor,
  Key extends keyof Target & string,
>(target: Target, property: Key, value: string): void {
  const warn = vi.spyOn(console, "warn").mockImplementation(() => {});
  const error = vi.spyOn(console, "error").mockImplementation(() => {});
  const previous = target[property];

  target.set(property, value);

  expect(target[property]).not.toBe(value);
  expect(target[property]).toEqual(previous);
  expect([...warn.mock.calls, ...error.mock.calls]).not.toHaveLength(0);
}

test("fill material still rejects the excluded ignore color mix mode", () => {
  const layer = new FillSymbol3DLayer({
    material: { colorMixMode: "multiply" },
  });

  expect(options.colorMixModeOptions).not.toContain("ignore");
  expectRejectedOption(layer.material!, "colorMixMode", "ignore");
});

for (const [mode, support] of Object.entries(
  options.horizontalAlignmentSupport,
)) {
  if (support !== null) {
    continue;
  }

  for (const [name, Layer] of [
    ["TextSymbol", TextSymbol],
    ["TextSymbol3DLayer", TextSymbol3DLayer],
  ] as const) {
    test(`${name} still rejects the excluded ${mode} alignment`, () => {
      expect(options.horizontalAlignmentOptions).not.toContain(mode);
      expectRejectedOption(new Layer(), "horizontalAlignment", mode);
    });
  }
}

function checkOptions<Target extends object, Key extends keyof Target>(
  name: string,
  create: () => Target,
  property: Key,
  values: readonly Target[Key][],
): void {
  for (const value of values) {
    test(`${name}.${String(property)} accepts ${String(value)}`, () => {
      const target = create();
      target[property] = value;
      expect(target[property]).toBe(value);
    });
  }
}

checkOptions(
  "Symbol3DEmissive",
  () => new Symbol3DEmissive(),
  "source",
  options.emissiveSourceOptions,
);

checkOptions(
  "SimpleLineSymbol",
  () => new SimpleLineSymbol(),
  "cap",
  options.capOptions,
);
checkOptions(
  "SimpleLineSymbol",
  () => new SimpleLineSymbol(),
  "join",
  options.joinOptions,
);
checkOptions(
  "SimpleLineSymbol",
  () => new SimpleLineSymbol(),
  "style",
  options.lineStyleOptions,
);
checkOptions(
  "LineSymbol3DLayer",
  () => new LineSymbol3DLayer(),
  "cap",
  options.capOptions,
);
checkOptions(
  "LineSymbol3DLayer",
  () => new LineSymbol3DLayer(),
  "join",
  options.joinOptions,
);
checkOptions(
  "LineStylePattern3D",
  () => new LineStylePattern3D(),
  "style",
  options.lineStyleOptions,
);
checkOptions(
  "Symbol3DOutline",
  () => new Symbol3DOutline(),
  "patternCap",
  options.capOptions,
);
checkOptions(
  "SimpleFillSymbol",
  () => new SimpleFillSymbol(),
  "style",
  options.fillOptions,
);
checkOptions(
  "StylePattern3D",
  () => new StylePattern3D(),
  "style",
  options.fillOptions,
);
checkOptions(
  "SimpleMarkerSymbol",
  () => new SimpleMarkerSymbol(),
  "style",
  options.simpleMarkerSymbolStyleOptions,
);
checkOptions(
  "LineSymbolMarker",
  () => new LineSymbolMarker(),
  "style",
  options.markerStyleOptions,
);
checkOptions(
  "LineSymbolMarker",
  () => new LineSymbolMarker(),
  "placement",
  options.markerPlacementOptions,
);
checkOptions(
  "LineStyleMarker3D",
  () => new LineStyleMarker3D(),
  "style",
  options.lineStyleMarker3dStyleOptions,
);
checkOptions(
  "LineStyleMarker3D",
  () => new LineStyleMarker3D(),
  "placement",
  options.markerPlacementOptions,
);
checkOptions(
  "IconSymbol3DLayer",
  () => new IconSymbol3DLayer(),
  "anchor",
  options.iconSymbol3dLayerAnchorOptions,
);
checkOptions(
  "IconSymbol3DLayerResource",
  () => new IconSymbol3DLayerResource(),
  "primitive",
  options.iconSymbol3dLayerResourcePrimitiveOptions,
);
checkOptions(
  "ObjectSymbol3DLayer",
  () => new ObjectSymbol3DLayer(),
  "anchor",
  options.objectSymbol3DLayerAnchorOptions,
);
checkOptions(
  "ObjectSymbol3DLayerResource",
  () => new ObjectSymbol3DLayerResource(),
  "primitive",
  options.objectSymbol3dLayerResourcePrimitiveOptions,
);
checkOptions(
  "PathSymbol3DLayer",
  () => new PathSymbol3DLayer(),
  "anchor",
  options.pathSymbol3dLayerAnchorOptions,
);
checkOptions(
  "PathSymbol3DLayer",
  () => new PathSymbol3DLayer(),
  "cap",
  options.cap3DOptions,
);
checkOptions(
  "PathSymbol3DLayer",
  () => new PathSymbol3DLayer(),
  "join",
  options.joinOptions,
);
checkOptions(
  "PathSymbol3DLayer",
  () => new PathSymbol3DLayer(),
  "profile",
  options.profileOptions,
);
checkOptions(
  "PathSymbol3DLayer",
  () => new PathSymbol3DLayer(),
  "profileRotation",
  options.rotationOptions,
);
checkOptions(
  "Font",
  () => new Font(),
  "decoration",
  options.fontDecorationOptions,
);
checkOptions("Font", () => new Font(), "style", options.fontStyleOptions);
checkOptions("Font", () => new Font(), "weight", options.fontWeightOptions);
checkOptions("Font", () => new Font(), "family", options.fontFamilyOptions);
checkOptions(
  "TextSymbol",
  () => new TextSymbol(),
  "horizontalAlignment",
  options.horizontalAlignmentOptions,
);
checkOptions(
  "TextSymbol",
  () => new TextSymbol(),
  "verticalAlignment",
  options.verticalAlignmentOptions,
);
checkOptions(
  "TextSymbol3DLayer",
  () => new TextSymbol3DLayer(),
  "horizontalAlignment",
  options.horizontalAlignmentOptions,
);
checkOptions(
  "TextSymbol3DLayer",
  () => new TextSymbol3DLayer(),
  "verticalAlignment",
  options.verticalAlignmentOptions,
);
checkOptions(
  "WaterSymbol3DLayer",
  () => new WaterSymbol3DLayer(),
  "waterbodySize",
  options.waterbodySizeOptions,
);
checkOptions(
  "WaterSymbol3DLayer",
  () => new WaterSymbol3DLayer(),
  "waveStrength",
  options.waveStrengthOptions,
);

for (const mode of options.occludedVisibilityOptions) {
  for (const Layer of [IconSymbol3DLayer, TextSymbol3DLayer]) {
    test(`${Layer.name} accepts occluded visibility ${mode}`, () => {
      const layer = new Layer({ occludedVisibility: { mode } });
      expect(layer.occludedVisibility?.mode).toBe(mode);
    });
  }
}

for (const preset of options.fonts) {
  test(`Font accepts the ${preset.name} preset`, () => {
    const font = new Font();
    font.set(preset.font);
    expect({
      family: font.family,
      style: font.style,
      weight: font.weight,
    }).toEqual(preset.font);
  });
}
