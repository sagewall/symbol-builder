import type SimpleMarkerSymbol from "@arcgis/core/symbols/SimpleMarkerSymbol.js";
import CodeSnippetPanel from "./CodeSnippetPanel";
import { generateSimpleMarkerSymbolJSONSnippet } from "./lib/snippets/simpleMarkerSymbol";

interface Props {
  simpleMarkerSymbol: SimpleMarkerSymbol;
}

function SimpleMarkerSymbolJSONPanel({
  simpleMarkerSymbol,
}: Props): React.ReactElement {
  const codeSnippet = generateSimpleMarkerSymbolJSONSnippet(simpleMarkerSymbol);

  return <CodeSnippetPanel title="JSON" codeSnippet={codeSnippet} />;
}

export default SimpleMarkerSymbolJSONPanel;
