import type SimpleLineSymbol from "@arcgis/core/symbols/SimpleLineSymbol.js";
import CodeSnippetPanel from "./CodeSnippetPanel";
import { generateSimpleLineSymbolCDNSnippet } from "./lib/snippets/simpleLineSymbol";

interface Props {
  simpleLineSymbol: SimpleLineSymbol;
}

function SimpleLineSymbolCDNPanel({
  simpleLineSymbol,
}: Props): React.ReactElement {
  const codeSnippet = generateSimpleLineSymbolCDNSnippet(simpleLineSymbol);

  return <CodeSnippetPanel title="CDN" codeSnippet={codeSnippet} />;
}

export default SimpleLineSymbolCDNPanel;
