import type PictureMarkerSymbol from "@arcgis/core/symbols/PictureMarkerSymbol.js";

export function generatePictureMarkerSymbolCDNSnippet(pictureMarkerSymbol: PictureMarkerSymbol): string {
  const codeSnippet = `
const PictureMarkerSymbol = await $arcgis.import("@arcgis/core/symbols/PictureMarkerSymbol.js");

const pictureMarkerSymbol = new PictureMarkerSymbol({
  angle: ${pictureMarkerSymbol.angle},
  height: ${pictureMarkerSymbol.height},
  url: ${JSON.stringify(pictureMarkerSymbol.url)},
  width: ${pictureMarkerSymbol.width},
  xoffset: ${pictureMarkerSymbol.xoffset},
  yoffset: ${pictureMarkerSymbol.yoffset}
});`;

  return codeSnippet;
}

export function generatePictureMarkerSymbolESMSnippet(pictureMarkerSymbol: PictureMarkerSymbol): string {
  const codeSnippet = `
import PictureMarkerSymbol from "@arcgis/core/symbols/PictureMarkerSymbol.js";

const pictureMarkerSymbol = new PictureMarkerSymbol({
  angle: ${pictureMarkerSymbol.angle},
  height: ${pictureMarkerSymbol.height},
  url: ${JSON.stringify(pictureMarkerSymbol.url)},
  width: ${pictureMarkerSymbol.width},
  xoffset: ${pictureMarkerSymbol.xoffset},
  yoffset: ${pictureMarkerSymbol.yoffset}
});`;

  return codeSnippet;
}

export function generatePictureMarkerSymbolJSONSnippet(pictureMarkerSymbol: PictureMarkerSymbol): string {
  const codeSnippet = `
import PictureMarkerSymbol from "@arcgis/core/symbols/PictureMarkerSymbol.js";

const pictureMarkerSymbol = PictureMarkerSymbol.fromJSON(
${JSON.stringify(pictureMarkerSymbol.toJSON(), null, 2)});`;

  return codeSnippet;
}
