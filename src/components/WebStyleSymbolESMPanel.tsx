import type WebStyleSymbol from "@arcgis/core/symbols/WebStyleSymbol.js";
import CodeSnippetPanel from "./CodeSnippetPanel";
import { generateWebStyleSymbolESMSnippet } from "./lib/snippets/webStyleSymbol";

interface Props {
  webStyleSymbol: WebStyleSymbol;
}

function WebStyleSymbolESMPanel({ webStyleSymbol }: Props): React.ReactElement {
  const codeSnippet = generateWebStyleSymbolESMSnippet(webStyleSymbol);

  return <CodeSnippetPanel title="ESM / TypeScript" codeSnippet={codeSnippet} />;
}

export default WebStyleSymbolESMPanel;
