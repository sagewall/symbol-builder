import type SimpleFillSymbol from "@arcgis/core/symbols/SimpleFillSymbol.js";
import CodeSnippetPanel from "./CodeSnippetPanel";
import { generateSimpleFillSymbolJSONSnippet } from "./lib/snippets/simpleFillSymbol";

interface Props {
  simpleFillSymbol: SimpleFillSymbol;
}

function SimpleFillSymbolJSONPanel({
  simpleFillSymbol,
}: Props): React.ReactElement {
  const codeSnippet = generateSimpleFillSymbolJSONSnippet(simpleFillSymbol);

  return <CodeSnippetPanel title="JSON" codeSnippet={codeSnippet} />;
}

export default SimpleFillSymbolJSONPanel;
