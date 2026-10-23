import type WebStyleSymbol from "@arcgis/core/symbols/WebStyleSymbol.js";
import CodeSnippetPanel from "./CodeSnippetPanel";
import { generateWebStyleSymbolCDNSnippet } from "./lib/snippets/webStyleSymbol";

interface Props {
  webStyleSymbol: WebStyleSymbol;
}

function WebStyleSymbolCDNPanel({ webStyleSymbol }: Props): React.ReactElement {
  const codeSnippet = generateWebStyleSymbolCDNSnippet(webStyleSymbol);

  return <CodeSnippetPanel title="CDN" codeSnippet={codeSnippet} />;
}

export default WebStyleSymbolCDNPanel;
