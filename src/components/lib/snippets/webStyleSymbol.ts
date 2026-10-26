import type WebStyleSymbol from "@arcgis/core/symbols/WebStyleSymbol.js";

export function generateWebStyleSymbolCDNSnippet(
  webStyleSymbol: WebStyleSymbol,
): string {
  let codeSnippet = ``;
  const portalSnippet = webStyleSymbol.portal?.url
    ? `  portal: { url: ${JSON.stringify(webStyleSymbol.portal.url)} },\n`
    : "";

  if (webStyleSymbol.styleName) {
    codeSnippet = `
const WebStyleSymbol = await $arcgis.import("@arcgis/core/symbols/WebStyleSymbol.js");

const webStyleSymbol = new WebStyleSymbol({
  name: ${JSON.stringify(webStyleSymbol.name)},
${portalSnippet}  styleName: ${JSON.stringify(webStyleSymbol.styleName)}
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

export function generateWebStyleSymbolESMSnippet(
  webStyleSymbol: WebStyleSymbol,
): string {
  let codeSnippet = ``;
  const portalSnippet = webStyleSymbol.portal?.url
    ? `  portal: { url: ${JSON.stringify(webStyleSymbol.portal.url)} },\n`
    : "";

  if (webStyleSymbol.styleName) {
    codeSnippet = `
import WebStyleSymbol from "@arcgis/core/symbols/WebStyleSymbol.js";

const webStyleSymbol = new WebStyleSymbol({
  name: ${JSON.stringify(webStyleSymbol.name)},
${portalSnippet}  styleName: ${JSON.stringify(webStyleSymbol.styleName)}
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

export function generateWebStyleSymbolJSONSnippet(
  webStyleSymbol: WebStyleSymbol,
): string {
  const webStyleSymbolJSON = {
    ...webStyleSymbol.toJSON(),
    ...(webStyleSymbol.portal?.url
      ? { portal: { url: webStyleSymbol.portal.url } }
      : {}),
  };
  const codeSnippet = `
import WebStyleSymbol from "@arcgis/core/symbols/WebStyleSymbol.js";

const webStyleSymbol = WebStyleSymbol.fromJSON(
${JSON.stringify(webStyleSymbolJSON, null, 2)});`;

  return codeSnippet;
}
