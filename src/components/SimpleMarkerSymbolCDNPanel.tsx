import type SimpleMarkerSymbol from "@arcgis/core/symbols/SimpleMarkerSymbol.js";
import CodeSnippetPanel from "./CodeSnippetPanel";

interface Props {
  simpleMarkerSymbol: SimpleMarkerSymbol;
}

function SimpleMarkerSymbolCDNPanel({
  simpleMarkerSymbol,
}: Props): React.ReactElement {
  const codeSnippet = `
const SimpleMarkerSymbol = await $arcgis.import("@arcgis/core/symbols/SimpleMarkerSymbol.js");

const simpleMarkerSymbol = new SimpleMarkerSymbol({
  angle: ${simpleMarkerSymbol.angle},
  color: [${simpleMarkerSymbol.color.toRgba().toString()}],
  outline: {
    cap: "${simpleMarkerSymbol.outline.cap}",
    color: [${simpleMarkerSymbol.outline?.color?.toRgba().toString()}],
    join: "${simpleMarkerSymbol.outline.join}",
    miterLimit: ${simpleMarkerSymbol.outline.miterLimit},
    style: "${simpleMarkerSymbol.outline.style}",
    width: ${simpleMarkerSymbol.outline.width}
  },
  path: ${JSON.stringify(simpleMarkerSymbol.path)},
  size: ${simpleMarkerSymbol.size},
  style: "${simpleMarkerSymbol.style}",
  xoffset: ${simpleMarkerSymbol.xoffset},
  yoffset: ${simpleMarkerSymbol.yoffset}
});`;

  return <CodeSnippetPanel title="CDN" codeSnippet={codeSnippet} />;
}

export default SimpleMarkerSymbolCDNPanel;
