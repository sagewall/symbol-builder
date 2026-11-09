import type SimpleFillSymbol from "@arcgis/core/symbols/SimpleFillSymbol.js";

export function generateSimpleFillSymbolCDNSnippet(simpleFillSymbol: SimpleFillSymbol): string {
  const codeSnippet = `
const SimpleFillSymbol = await $arcgis.import("@arcgis/core/symbols/SimpleFillSymbol.js");

const simpleFillSymbol = new SimpleFillSymbol({
  color: [${simpleFillSymbol.color.toRgba().toString()}],
  outline: {
    cap: "${simpleFillSymbol.outline?.cap}",
    color: [${simpleFillSymbol.outline?.color?.toRgba().toString()}],
    join: "${simpleFillSymbol.outline?.join}",
    miterLimit: ${simpleFillSymbol.outline?.miterLimit},
    style: "${simpleFillSymbol.outline?.style}",
    width: ${simpleFillSymbol.outline?.width}
  },
  style: "${simpleFillSymbol.style}"
});`;

  return codeSnippet;
}

export function generateSimpleFillSymbolESMSnippet(simpleFillSymbol: SimpleFillSymbol): string {
  const codeSnippet = `
import Color from "@arcgis/core/Color.js";
import SimpleFillSymbol from "@arcgis/core/symbols/SimpleFillSymbol.js";
import SimpleLineSymbol from "@arcgis/core/symbols/SimpleLineSymbol.js";

const simpleFillSymbol = new SimpleFillSymbol({
  color: new Color([${simpleFillSymbol.color.toRgba().toString()}]),
  outline: new SimpleLineSymbol({
    cap: "${simpleFillSymbol.outline?.cap}",
    color: new Color([${simpleFillSymbol.outline?.color?.toRgba().toString()}]),
    join: "${simpleFillSymbol.outline?.join}",
    miterLimit: ${simpleFillSymbol.outline?.miterLimit},
    style: "${simpleFillSymbol.outline?.style}",
    width: ${simpleFillSymbol.outline?.width}
  }),
  style: "${simpleFillSymbol.style}"
});`;

  return codeSnippet;
}

export function generateSimpleFillSymbolJSONSnippet(simpleFillSymbol: SimpleFillSymbol): string {
  const codeSnippet = `
import SimpleFillSymbol from "@arcgis/core/symbols/SimpleFillSymbol.js";

const simpleFillSymbol = SimpleFillSymbol.fromJSON(
${JSON.stringify(simpleFillSymbol.toJSON(), null, 2)});`;

  return codeSnippet;
}
