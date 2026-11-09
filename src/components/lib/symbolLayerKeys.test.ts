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

test("repeated clones preserve keys and isolate nested layer edits", () => {
  const layer = new FillSymbol3DLayer({ material: { color: "red" } });
  const original = new Collection([layer]);
  const key = getSymbolLayerKey(layer);
  const first = cloneSymbolLayers(original);
  const second = cloneSymbolLayers(first);
  const edited = second.getItemAt(0)!;

  expect(getSymbolLayerKey(first.getItemAt(0)!)).toBe(key);
  expect(getSymbolLayerKey(edited)).toBe(key);
  expect(edited).not.toBe(first.getItemAt(0));
  edited.material!.color!.setColor("blue");
  expect(edited.material!.color!.toHex()).toBe("#0000ff");
  expect(first.getItemAt(0)!.material!.color!.toHex()).toBe("#ff0000");
  expect(layer.material!.color!.toHex()).toBe("#ff0000");
  expect(original.getItemAt(0)).toBe(layer);
});

test("cloning an empty layer collection returns an independent empty collection", () => {
  const original = new Collection<FillSymbol3DLayer>();
  const cloned = cloneSymbolLayers(original);

  expect(cloned).not.toBe(original);
  expect(cloned.length).toBe(0);
  cloned.add(new FillSymbol3DLayer());
  expect(original.length).toBe(0);
});
