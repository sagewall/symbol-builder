import type TextSymbol from "@arcgis/core/symbols/TextSymbol.js";

export function generateTextSymbolCDNSnippet(textSymbol: TextSymbol): string {
  return `
const TextSymbol = await $arcgis.import("@arcgis/core/symbols/TextSymbol.js");

const textSymbol = new TextSymbol({
  angle: ${textSymbol.angle},
  backgroundColor: [${textSymbol.backgroundColor?.toRgba().toString()}],
  borderLineColor: [${textSymbol.borderLineColor?.toRgba().toString()}],
  borderLineSize: ${textSymbol.borderLineSize},
  color: [${textSymbol.color?.toRgba().toString()}],
  font: {
    decoration: "${textSymbol.font.decoration}",
    family: ${JSON.stringify(textSymbol.font.family)},
    size: ${textSymbol.font.size},
    style: "${textSymbol.font.style}",
    weight: "${textSymbol.font.weight}"
  },
  haloColor: [${textSymbol.haloColor?.toRgba().toString()}],
  haloSize: ${textSymbol.haloSize},
  horizontalAlignment: "${textSymbol.horizontalAlignment}",
  kerning: ${textSymbol.kerning},
  lineHeight: ${textSymbol.lineHeight},
  lineWidth: ${textSymbol.lineWidth},
  rotated: ${textSymbol.rotated},
  text: ${JSON.stringify(textSymbol.text)},
  verticalAlignment: "${textSymbol.verticalAlignment}",
  xoffset: ${textSymbol.xoffset},
  yoffset: ${textSymbol.yoffset}
});`;
}
export function generateTextSymbolESMSnippet(textSymbol: TextSymbol): string {
  const codeSnippet = `
import Color from "@arcgis/core/Color.js";
import Font from "@arcgis/core/symbols/Font.js";
import TextSymbol from "@arcgis/core/symbols/TextSymbol.js";

const textSymbol = new TextSymbol({
  angle: ${textSymbol.angle},
  backgroundColor: new Color([${textSymbol.backgroundColor?.toRgba().toString()}]),
  borderLineColor: new Color([${textSymbol.borderLineColor?.toRgba().toString()}]),
  borderLineSize: ${textSymbol.borderLineSize},
  color: new Color([${textSymbol.color?.toRgba().toString()}]),
  font: new Font({
    decoration: "${textSymbol.font.decoration}",
    family: ${JSON.stringify(textSymbol.font.family)},
    size: ${textSymbol.font.size},
    style: "${textSymbol.font.style}",
    weight: "${textSymbol.font.weight}"
  }),
  haloColor: new Color([${textSymbol.haloColor?.toRgba().toString()}]),
  haloSize: ${textSymbol.haloSize},
  horizontalAlignment: "${textSymbol.horizontalAlignment}",
  kerning: ${textSymbol.kerning},
  lineHeight: ${textSymbol.lineHeight},
  lineWidth: ${textSymbol.lineWidth},
  rotated: ${textSymbol.rotated},
  text: ${JSON.stringify(textSymbol.text)},
  verticalAlignment: "${textSymbol.verticalAlignment}",
  xoffset: ${textSymbol.xoffset},
  yoffset: ${textSymbol.yoffset}
});`;

  return codeSnippet;
}

export function generateTextSymbolJSONSnippet(textSymbol: TextSymbol): string {
  const codeSnippet = `
import TextSymbol from "@arcgis/core/symbols/TextSymbol.js";

const textSymbol = TextSymbol.fromJSON(
${JSON.stringify(textSymbol.toJSON(), null, 2)});`;

  return codeSnippet;
}
