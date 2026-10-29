import type SimpleLineSymbol from "@arcgis/core/symbols/SimpleLineSymbol.js";

export function generateSimpleLineSymbolCDNSnippet(simpleLineSymbol: SimpleLineSymbol): string {
  let codeSnippet = ``;

  if (simpleLineSymbol.marker) {
    codeSnippet = `
const SimpleLineSymbol = await $arcgis.import("@arcgis/core/symbols/SimpleLineSymbol.js");

const simpleLineSymbol = new SimpleLineSymbol({
  cap: "${simpleLineSymbol.cap}",
  color: [${simpleLineSymbol.color?.toRgba().toString()}],
  join: "${simpleLineSymbol.join}",
  marker: {
    color: [${simpleLineSymbol.marker.color.toRgba().toString()}],
    placement: "${simpleLineSymbol.marker.placement}",
    style: "${simpleLineSymbol.marker.style}",
  },
  miterLimit: ${simpleLineSymbol.miterLimit},
  style: "${simpleLineSymbol.style}",
  width: ${simpleLineSymbol.width}
});`;
  } else {
    codeSnippet = `
const SimpleLineSymbol = await $arcgis.import("@arcgis/core/symbols/SimpleLineSymbol.js");

const simpleLineSymbol = new SimpleLineSymbol({
  cap: "${simpleLineSymbol.cap}",
  color: [${simpleLineSymbol.color?.toRgba().toString()}],
  join: "${simpleLineSymbol.join}",
  miterLimit: ${simpleLineSymbol.miterLimit},
  style: "${simpleLineSymbol.style}",
  width: ${simpleLineSymbol.width}
});`;
  }

  return codeSnippet;
}

export function generateSimpleLineSymbolESMSnippet(simpleLineSymbol: SimpleLineSymbol): string {
  let codeSnippet = ``;

  if (simpleLineSymbol.marker) {
    codeSnippet = `
import Color from "@arcgis/core/Color.js";
import LineSymbolMarker from "@arcgis/core/symbols/LineSymbolMarker.js";
import SimpleLineSymbol from "@arcgis/core/symbols/SimpleLineSymbol.js";

const simpleLineSymbol = new SimpleLineSymbol({
  cap: "${simpleLineSymbol.cap}",
  color: new Color([${simpleLineSymbol.color?.toRgba().toString()}]),
  join: "${simpleLineSymbol.join}",
  marker: new LineSymbolMarker({
    color: new Color([${simpleLineSymbol.marker.color.toRgba().toString()}]),
    placement: "${simpleLineSymbol.marker.placement}",
    style: "${simpleLineSymbol.marker.style}",
  }),
  miterLimit: ${simpleLineSymbol.miterLimit},
  style: "${simpleLineSymbol.style}",
  width: ${simpleLineSymbol.width}
});`;
  } else {
    codeSnippet = `
import Color from "@arcgis/core/Color.js";
import SimpleLineSymbol from "@arcgis/core/symbols/SimpleLineSymbol.js";

const simpleLineSymbol = new SimpleLineSymbol({
  cap: "${simpleLineSymbol.cap}",
  color: new Color([${simpleLineSymbol.color?.toRgba().toString()}]),
  join: "${simpleLineSymbol.join}",
  miterLimit: ${simpleLineSymbol.miterLimit},
  style: "${simpleLineSymbol.style}",
  width: ${simpleLineSymbol.width}
});`;
  }

  return codeSnippet;
}

export function generateSimpleLineSymbolJSONSnippet(simpleLineSymbol: SimpleLineSymbol): string {
  const codeSnippet = `
import SimpleLineSymbol from "@arcgis/core/symbols/SimpleLineSymbol.js";

const simpleLineSymbol = SimpleLineSymbol.fromJSON(
${JSON.stringify(simpleLineSymbol.toJSON(), null, 2)});`;

  return codeSnippet;
}
