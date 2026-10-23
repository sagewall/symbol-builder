import type PictureFillSymbol from "@arcgis/core/symbols/PictureFillSymbol.js";

export function generatePictureFillSymbolCDNSnippet(pictureFillSymbol: PictureFillSymbol): string {
  const codeSnippet = `
const PictureFillSymbol = await $arcgis.import("@arcgis/core/symbols/PictureFillSymbol.js");

const pictureFillSymbol = new PictureFillSymbol({
  height: ${pictureFillSymbol.height},
  outline: {
    cap: "${pictureFillSymbol.outline?.cap}",
    color: ${JSON.stringify(pictureFillSymbol.outline?.color?.toJSON())},
    join: "${pictureFillSymbol.outline?.join}",
    miterLimit: ${pictureFillSymbol.outline?.miterLimit},
    style: "${pictureFillSymbol.outline?.style}",
    width: ${pictureFillSymbol.outline?.width}
  },
  url: ${JSON.stringify(pictureFillSymbol.url)},
  width: ${pictureFillSymbol.width},
  xoffset: ${pictureFillSymbol.xoffset},
  xscale: ${pictureFillSymbol.xscale},
  yoffset: ${pictureFillSymbol.yoffset},
  yscale: ${pictureFillSymbol.yscale}
});`;

  return codeSnippet;
}

export function generatePictureFillSymbolESMSnippet(pictureFillSymbol: PictureFillSymbol): string {
  const codeSnippet = `
import Color from "@arcgis/core/Color.js";
import PictureFillSymbol from "@arcgis/core/symbols/PictureFillSymbol.js";
import SimpleLineSymbol from "@arcgis/core/symbols/SimpleLineSymbol.js";

const pictureFillSymbol = new PictureFillSymbol({
  height: ${pictureFillSymbol.height},
  outline: new SimpleLineSymbol({
    cap: "${pictureFillSymbol.outline?.cap}",
    color: new Color([${(pictureFillSymbol.outline?.color?.toRgba() ?? []).toString()}]),
    join: "${pictureFillSymbol.outline?.join}",
    miterLimit: ${pictureFillSymbol.outline?.miterLimit},
    style: "${pictureFillSymbol.outline?.style}",
    width: ${pictureFillSymbol.outline?.width}
  }),
  url: ${JSON.stringify(pictureFillSymbol.url)},
  width: ${pictureFillSymbol.width},
  xoffset: ${pictureFillSymbol.xoffset},
  xscale: ${pictureFillSymbol.xscale},
  yoffset: ${pictureFillSymbol.yoffset},
  yscale: ${pictureFillSymbol.yscale}
});`;

  return codeSnippet;
}

export function generatePictureFillSymbolJSONSnippet(pictureFillSymbol: PictureFillSymbol): string {
  const codeSnippet = `
import PictureFillSymbol from "@arcgis/core/symbols/PictureFillSymbol.js";

const pictureFillSymbol = PictureFillSymbol.fromJSON(
${JSON.stringify(pictureFillSymbol.toJSON(), null, 2)});`;

  return codeSnippet;
}
