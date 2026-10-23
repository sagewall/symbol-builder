import type WebStyleSymbol from "@arcgis/core/symbols/WebStyleSymbol.js";
import CodeSnippetPanel from "./CodeSnippetPanel";
import { generateWebStyleSymbolJSONSnippet } from "./lib/snippets/webStyleSymbol";

interface Props {
  webStyleSymbol: WebStyleSymbol;
}

function SimpleFillSymbolJSONPanel({
  webStyleSymbol,
}: Props): React.ReactElement {
  const codeSnippet = generateWebStyleSymbolJSONSnippet(webStyleSymbol);

  return <CodeSnippetPanel title="JSON" codeSnippet={codeSnippet} />;
}

export default SimpleFillSymbolJSONPanel;
