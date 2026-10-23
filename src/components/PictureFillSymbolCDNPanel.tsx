import type PictureFillSymbol from "@arcgis/core/symbols/PictureFillSymbol.js";
import CodeSnippetPanel from "./CodeSnippetPanel";

interface Props {
  pictureFillSymbol: PictureFillSymbol;
}

function PictureFillSymbolCDNPanel({
  pictureFillSymbol,
}: Props): React.ReactElement {
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

  return <CodeSnippetPanel title="CDN" codeSnippet={codeSnippet} />;
}

export default PictureFillSymbolCDNPanel;
