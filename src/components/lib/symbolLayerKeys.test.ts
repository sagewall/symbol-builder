import Collection from "@arcgis/core/core/Collection.js";
import FillSymbol3DLayer from "@arcgis/core/symbols/FillSymbol3DLayer.js";
import { expect, test } from "vitest";
import { cloneSymbolLayers, getSymbolLayerKey } from "./symbolLayerKeys";

test("layer keys follow object identity rather than collection position", () => {
  const first = new FillSymbol3DLayer();
  const second = new FillSymbol3DLayer();
  const layers = new Collection([first, second]);
  const firstKey = getSymbolLayerKey(first);
  const secondKey = getSymbolLayerKey(second);

  expect(firstKey).not.toBe(secondKey);
  expect(getSymbolLayerKey(first)).toBe(firstKey);

  const next = cloneSymbolLayers(layers);
  expect(next.getItemAt(0)).not.toBe(first);
  next.removeAt(0);
  expect(getSymbolLayerKey(next.getItemAt(0)!)).toBe(secondKey);
  expect(getSymbolLayerKey(new FillSymbol3DLayer())).not.toBe(firstKey);
});
