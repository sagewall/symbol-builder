import type SimpleFillSymbol from "@arcgis/core/symbols/SimpleFillSymbol.js";
import CodeSnippetPanel from "./CodeSnippetPanel";

interface Props {
  simpleFillSymbol: SimpleFillSymbol;
}

function SimpleFillSymbolJSONPanel({
  simpleFillSymbol,
}: Props): React.ReactElement {
  const codeSnippet = `
import SimpleFillSymbol from "@arcgis/core/symbols/SimpleFillSymbol.js";

const simpleFillSymbol = SimpleFillSymbol.fromJSON(
${JSON.stringify(simpleFillSymbol.toJSON(), null, 2)});`;

  return <CodeSnippetPanel title="JSON" codeSnippet={codeSnippet} />;
}

export default SimpleFillSymbolJSONPanel;
