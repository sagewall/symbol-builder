import type PictureFillSymbol from "@arcgis/core/symbols/PictureFillSymbol.js";

export function generatePictureFillSymbolCDNSnippet(
  pictureFillSymbol: PictureFillSymbol,
): string {
  const outline = pictureFillSymbol.outline;
  const outlineSnippet = outline
    ? `  outline: {
    cap: ${JSON.stringify(outline.cap)},
    color: ${JSON.stringify(outline.color?.toRgba() ?? null)},
    join: ${JSON.stringify(outline.join)},
    miterLimit: ${outline.miterLimit},
    style: ${JSON.stringify(outline.style)},
    width: ${outline.width}
  },\n`
    : "";
  const codeSnippet = `
const PictureFillSymbol = await $arcgis.import("@arcgis/core/symbols/PictureFillSymbol.js");

const pictureFillSymbol = new PictureFillSymbol({
  height: ${pictureFillSymbol.height},
${outlineSnippet}  url: ${JSON.stringify(pictureFillSymbol.url)},
  width: ${pictureFillSymbol.width},
  xoffset: ${pictureFillSymbol.xoffset},
  xscale: ${pictureFillSymbol.xscale},
  yoffset: ${pictureFillSymbol.yoffset},
  yscale: ${pictureFillSymbol.yscale}
});`;

  return codeSnippet;
}

export function generatePictureFillSymbolESMSnippet(
  pictureFillSymbol: PictureFillSymbol,
): string {
  const outline = pictureFillSymbol.outline;
  const colorImport = outline
    ? `import Color from "@arcgis/core/Color.js";\n`
    : "";
  const lineSymbolImport = outline
    ? `import SimpleLineSymbol from "@arcgis/core/symbols/SimpleLineSymbol.js";\n`
    : "";
  const outlineSnippet = outline
    ? `  outline: new SimpleLineSymbol({
    cap: ${JSON.stringify(outline.cap)},
    color: ${outline.color ? `new Color([${outline.color.toRgba().toString()}])` : "null"},
    join: ${JSON.stringify(outline.join)},
    miterLimit: ${outline.miterLimit},
    style: ${JSON.stringify(outline.style)},
    width: ${outline.width}
  }),\n`
    : "";
  const codeSnippet = `
${colorImport}import PictureFillSymbol from "@arcgis/core/symbols/PictureFillSymbol.js";
${lineSymbolImport}

const pictureFillSymbol = new PictureFillSymbol({
  height: ${pictureFillSymbol.height},
${outlineSnippet}  url: ${JSON.stringify(pictureFillSymbol.url)},
  width: ${pictureFillSymbol.width},
  xoffset: ${pictureFillSymbol.xoffset},
  xscale: ${pictureFillSymbol.xscale},
  yoffset: ${pictureFillSymbol.yoffset},
  yscale: ${pictureFillSymbol.yscale}
});`;

  return codeSnippet;
}

export function generatePictureFillSymbolJSONSnippet(
  pictureFillSymbol: PictureFillSymbol,
): string {
  const codeSnippet = `
import PictureFillSymbol from "@arcgis/core/symbols/PictureFillSymbol.js";

const pictureFillSymbol = PictureFillSymbol.fromJSON(
${JSON.stringify(pictureFillSymbol.toJSON(), null, 2)});`;

  return codeSnippet;
}
