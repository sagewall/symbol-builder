import Graphic from "@arcgis/core/Graphic.js";
import Collection from "@arcgis/core/core/Collection.js";
import Point from "@arcgis/core/geometry/Point.js";
import SimpleMarkerSymbol from "@arcgis/core/symbols/SimpleMarkerSymbol.js";
import TextSymbol from "@arcgis/core/symbols/TextSymbol.js";
import { expect, test } from "vitest";
import { replacePreviewSymbol } from "./useSymbolPreview";

test("replaces the symbol without mutating the original graphic or collection", () => {
  const originalSymbol = new SimpleMarkerSymbol({ color: "red" });
  const graphic = new Graphic({
    geometry: new Point({ longitude: -117, latitude: 34 }),
    symbol: originalSymbol,
    attributes: { id: 1 },
  });
  const graphics = new Collection([graphic]);
  const symbol = new SimpleMarkerSymbol({ color: "blue" });

  const updated = replacePreviewSymbol(graphics, symbol);
  const updatedGraphic = updated.getItemAt(0)!;

  expect(updated).not.toBe(graphics);
  expect(updated.length).toBe(1);
  expect(updatedGraphic).not.toBe(graphic);
  expect(updatedGraphic.symbol).toBe(symbol);
  expect(updatedGraphic.geometry?.toJSON()).toEqual(graphic.geometry?.toJSON());
  expect(updatedGraphic.attributes).toEqual({ id: 1 });
  expect(graphics.getItemAt(0)).toBe(graphic);
  expect(graphic.symbol).toBe(originalSymbol);
});

test("supports text symbols and repeated preview replacements", () => {
  const original = new Collection([
    new Graphic({ geometry: new Point(), symbol: new TextSymbol({ text: "original" }) }),
  ]);
  const firstSymbol = new TextSymbol({ text: "first" });
  const lastSymbol = new TextSymbol({ text: "last" });

  const first = replacePreviewSymbol(original, firstSymbol);
  const last = replacePreviewSymbol(first, lastSymbol);

  expect(first.getItemAt(0)?.symbol).toBe(firstSymbol);
  expect(last.getItemAt(0)?.symbol).toBe(lastSymbol);
  expect(last.length).toBe(1);
});

test("fails explicitly if the preview graphic is missing", () => {
  const graphics = new Collection<Graphic>();

  expect(() => replacePreviewSymbol(graphics, new SimpleMarkerSymbol())).toThrow(
    "Symbol preview requires a graphic.",
  );
  expect(graphics.length).toBe(0);
});