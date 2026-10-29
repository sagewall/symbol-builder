import type TextSymbol from "@arcgis/core/symbols/TextSymbol.js";
import CodeSnippetPanel from "./CodeSnippetPanel";
import { generateTextSymbolCDNSnippet } from "./lib/snippets/textSymbol";

interface Props {
  textSymbol: TextSymbol;
}

function TextSymbolCDNPanel({ textSymbol }: Props): React.ReactElement {
  const codeSnippet = generateTextSymbolCDNSnippet(textSymbol);

  return <CodeSnippetPanel title="CDN" codeSnippet={codeSnippet} />;
}

export default TextSymbolCDNPanel;
