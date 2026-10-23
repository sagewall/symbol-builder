import type SimpleFillSymbol from "@arcgis/core/symbols/SimpleFillSymbol.js";
import CodeSnippetPanel from "./CodeSnippetPanel";

interface Props {
  simpleFillSymbol: SimpleFillSymbol;
}

function SimpleFillSymbolCDNPanel({
  simpleFillSymbol,
}: Props): React.ReactElement {
  const codeSnippet = `
const SimpleFillSymbol = await $arcgis.import("@arcgis/core/symbols/SimpleFillSymbol.js");

const simpleFillSymbol = new SimpleFillSymbol({
  color: [${simpleFillSymbol.color.toRgba().toString()}],
  outline: {
    cap: "${simpleFillSymbol.outline?.cap}",
    color: [${simpleFillSymbol.outline?.color?.toRgba().toString()}],
    join: "${simpleFillSymbol.outline?.join}",
    miterLimit: ${simpleFillSymbol.outline?.miterLimit},
    style: "${simpleFillSymbol.outline?.style}",
    width: ${simpleFillSymbol.outline?.width}
  },
  style: "${simpleFillSymbol.style}"
});`;

  return <CodeSnippetPanel title="CDN" codeSnippet={codeSnippet} />;
}

export default SimpleFillSymbolCDNPanel;
