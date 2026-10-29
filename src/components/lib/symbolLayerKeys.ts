import type Collection from "@arcgis/core/core/Collection.js";
import type Symbol3DLayer from "@arcgis/core/symbols/Symbol3DLayer.js";

const keys = new WeakMap<Symbol3DLayer, number>();
let nextKey = 0;

export function getSymbolLayerKey(layer: Symbol3DLayer): number {
  let key = keys.get(layer);
  if (key === undefined) {
    key = nextKey++;
    keys.set(layer, key);
  }
  return key;
}

export function cloneSymbolLayers<Layer extends Symbol3DLayer>(
  layers: Collection<Layer>,
): Collection<Layer> {
  const next = layers.clone();
  layers.forEach((layer, index) => {
    keys.set(next.getItemAt(index)!, getSymbolLayerKey(layer));
  });
  return next;
}
