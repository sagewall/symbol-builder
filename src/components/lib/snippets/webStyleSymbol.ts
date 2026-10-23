import type WebStyleSymbol from "@arcgis/core/symbols/WebStyleSymbol.js";

export function generateWebStyleSymbolCDNSnippet(webStyleSymbol: WebStyleSymbol): string {
  let codeSnippet = ``;

  if (webStyleSymbol.styleName) {
    codeSnippet = `
const WebStyleSymbol = await $arcgis.import("@arcgis/core/symbols/WebStyleSymbol.js");

const webStyleSymbol = new WebStyleSymbol({
  name: ${JSON.stringify(webStyleSymbol.name)},
  styleName: ${JSON.stringify(webStyleSymbol.styleName)}
});`;
  } else {
    codeSnippet = `
const WebStyleSymbol = await $arcgis.import("@arcgis/core/symbols/WebStyleSymbol.js");

const webStyleSymbol = new WebStyleSymbol({
  name: ${JSON.stringify(webStyleSymbol.name)},
  styleUrl: ${JSON.stringify(webStyleSymbol.styleUrl)}
});`;
  }

  return codeSnippet;
}

export function generateWebStyleSymbolESMSnippet(webStyleSymbol: WebStyleSymbol): string {
  let codeSnippet = ``;

  if (webStyleSymbol.styleName) {
    codeSnippet = `
import WebStyleSymbol from "@arcgis/core/symbols/WebStyleSymbol.js";

const webStyleSymbol = new WebStyleSymbol({
  name: ${JSON.stringify(webStyleSymbol.name)},
  styleName: ${JSON.stringify(webStyleSymbol.styleName)}
});`;
  } else {
    codeSnippet = `
import WebStyleSymbol from "@arcgis/core/symbols/WebStyleSymbol.js";

const webStyleSymbol = new WebStyleSymbol({
  name: ${JSON.stringify(webStyleSymbol.name)},
  styleUrl: ${JSON.stringify(webStyleSymbol.styleUrl)}
});`;
  }

  return codeSnippet;
}

export function generateWebStyleSymbolJSONSnippet(webStyleSymbol: WebStyleSymbol): string {
  const codeSnippet = `
import WebStyleSymbol from "@arcgis/core/symbols/WebStyleSymbol.js";

const webStyleSymbol = WebStyleSymbol.fromJSON(
${JSON.stringify(webStyleSymbol.toJSON(), null, 2)});`;

  return codeSnippet;
}
