import type SimpleLineSymbol from "@arcgis/core/symbols/SimpleLineSymbol.js";
import CodeSnippetPanel from "./CodeSnippetPanel";
import { generateSimpleLineSymbolJSONSnippet } from "./lib/snippets/simpleLineSymbol";

interface Props {
  simpleLineSymbol: SimpleLineSymbol;
}

function SimpleLineSymbolJSONPanel({
  simpleLineSymbol,
}: Props): React.ReactElement {
  const codeSnippet = generateSimpleLineSymbolJSONSnippet(simpleLineSymbol);

  return <CodeSnippetPanel title="JSON" codeSnippet={codeSnippet} />;
}

export default SimpleLineSymbolJSONPanel;
