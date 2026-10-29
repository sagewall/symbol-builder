import type SimpleMarkerSymbol from "@arcgis/core/symbols/SimpleMarkerSymbol.js";

export function generateSimpleMarkerSymbolCDNSnippet(simpleMarkerSymbol: SimpleMarkerSymbol): string {
  const codeSnippet = `
const SimpleMarkerSymbol = await $arcgis.import("@arcgis/core/symbols/SimpleMarkerSymbol.js");

const simpleMarkerSymbol = new SimpleMarkerSymbol({
  angle: ${simpleMarkerSymbol.angle},
  color: [${simpleMarkerSymbol.color.toRgba().toString()}],
  outline: {
    cap: "${simpleMarkerSymbol.outline.cap}",
    color: [${simpleMarkerSymbol.outline?.color?.toRgba().toString()}],
    join: "${simpleMarkerSymbol.outline.join}",
    miterLimit: ${simpleMarkerSymbol.outline.miterLimit},
    style: "${simpleMarkerSymbol.outline.style}",
    width: ${simpleMarkerSymbol.outline.width}
  },
  path: ${JSON.stringify(simpleMarkerSymbol.path)},
  size: ${simpleMarkerSymbol.size},
  style: "${simpleMarkerSymbol.style}",
  xoffset: ${simpleMarkerSymbol.xoffset},
  yoffset: ${simpleMarkerSymbol.yoffset}
});`;

  return codeSnippet;
}

export function generateSimpleMarkerSymbolESMSnippet(simpleMarkerSymbol: SimpleMarkerSymbol): string {
  const codeSnippet = `
import Color from "@arcgis/core/Color.js";
import SimpleLineSymbol from "@arcgis/core/symbols/SimpleLineSymbol.js";
import SimpleMarkerSymbol from "@arcgis/core/symbols/SimpleMarkerSymbol.js";

const simpleMarkerSymbol = new SimpleMarkerSymbol({
  angle: ${simpleMarkerSymbol.angle},
  color: new Color([${simpleMarkerSymbol.color.toRgba().toString()}]),
  outline: new SimpleLineSymbol({
    cap: "${simpleMarkerSymbol.outline.cap}",
    color: new Color([${simpleMarkerSymbol.outline?.color?.toRgba().toString()}]),
    join: "${simpleMarkerSymbol.outline.join}",
    miterLimit: ${simpleMarkerSymbol.outline.miterLimit},
    style: "${simpleMarkerSymbol.outline.style}",
    width: ${simpleMarkerSymbol.outline.width}
  }),
  path: ${JSON.stringify(simpleMarkerSymbol.path)},
  size: ${simpleMarkerSymbol.size},
  style: "${simpleMarkerSymbol.style}",
  xoffset: ${simpleMarkerSymbol.xoffset},
  yoffset: ${simpleMarkerSymbol.yoffset}
});`;

  return codeSnippet;
}

export function generateSimpleMarkerSymbolJSONSnippet(simpleMarkerSymbol: SimpleMarkerSymbol): string {
  const codeSnippet = `
import SimpleMarkerSymbol from "@arcgis/core/symbols/SimpleMarkerSymbol.js";

const simpleMarkerSymbol = SimpleMarkerSymbol.fromJSON(
${JSON.stringify(simpleMarkerSymbol.toJSON(), null, 2)});`;

  return codeSnippet;
}
