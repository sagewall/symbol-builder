import type SimpleFillSymbol from "@arcgis/core/symbols/SimpleFillSymbol.js";
import CodeSnippetPanel from "./CodeSnippetPanel";
import { generateSimpleFillSymbolCDNSnippet } from "./lib/snippets/simpleFillSymbol";

interface Props {
  simpleFillSymbol: SimpleFillSymbol;
}

function SimpleFillSymbolCDNPanel({
  simpleFillSymbol,
}: Props): React.ReactElement {
  const codeSnippet = generateSimpleFillSymbolCDNSnippet(simpleFillSymbol);

  return <CodeSnippetPanel title="CDN" codeSnippet={codeSnippet} />;
}

export default SimpleFillSymbolCDNPanel;
