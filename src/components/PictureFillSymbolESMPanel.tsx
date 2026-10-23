import type PictureFillSymbol from "@arcgis/core/symbols/PictureFillSymbol.js";
import CodeSnippetPanel from "./CodeSnippetPanel";

interface Props {
  pictureFillSymbol: PictureFillSymbol;
}

function PictureFillSymbolESMPanel({
  pictureFillSymbol,
}: Props): React.ReactElement {
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

  return <CodeSnippetPanel title="ESM / TypeScript" codeSnippet={codeSnippet} />;
}

export default PictureFillSymbolESMPanel;
