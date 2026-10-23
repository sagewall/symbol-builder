import type SimpleFillSymbol from "@arcgis/core/symbols/SimpleFillSymbol.js";
import CodeSnippetPanel from "./CodeSnippetPanel";

interface Props {
  simpleFillSymbol: SimpleFillSymbol;
}

function SimpleFillSymbolESMPanel({
  simpleFillSymbol,
}: Props): React.ReactElement {
  const codeSnippet = `
import Color from "@arcgis/core/Color.js";
import SimpleFillSymbol from "@arcgis/core/symbols/SimpleFillSymbol.js";
import SimpleLineSymbol from "@arcgis/core/symbols/SimpleLineSymbol.js";

const simpleFillSymbol = new SimpleFillSymbol({
  color: new Color([${simpleFillSymbol.color.toRgba().toString()}]),
  outline: new SimpleLineSymbol({
    cap: "${simpleFillSymbol.outline?.cap}",
    color: new Color([${simpleFillSymbol.outline?.color?.toRgba().toString()}]),
    join: "${simpleFillSymbol.outline?.join}",
    miterLimit: ${simpleFillSymbol.outline?.miterLimit},
    style: "${simpleFillSymbol.outline?.style}",
    width: ${simpleFillSymbol.outline?.width}
  }),
  style: "${simpleFillSymbol.style}"
});`;

  return <CodeSnippetPanel title="ESM / TypeScript" codeSnippet={codeSnippet} />;
}

export default SimpleFillSymbolESMPanel;
