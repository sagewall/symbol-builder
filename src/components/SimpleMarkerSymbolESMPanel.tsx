import type SimpleMarkerSymbol from "@arcgis/core/symbols/SimpleMarkerSymbol.js";
import CodeSnippetPanel from "./CodeSnippetPanel";

interface Props {
  simpleMarkerSymbol: SimpleMarkerSymbol;
}

function SimpleMarkerSymbolESMPanel({
  simpleMarkerSymbol,
}: Props): React.ReactElement {
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

  return <CodeSnippetPanel title="ESM / TypeScript" codeSnippet={codeSnippet} />;
}

export default SimpleMarkerSymbolESMPanel;
