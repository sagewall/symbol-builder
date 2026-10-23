import type TextSymbol from "@arcgis/core/symbols/TextSymbol.js";
import CodeSnippetPanel from "./CodeSnippetPanel";
import { generateTextSymbolESMSnippet } from "./lib/snippets/textSymbol";

interface Props {
  textSymbol: TextSymbol;
}

function TextSymbolESMPanel({ textSymbol }: Props): React.ReactElement {
  const codeSnippet = generateTextSymbolESMSnippet(textSymbol);

  return <CodeSnippetPanel title="ESM / TypeScript" codeSnippet={codeSnippet} />;
}

export default TextSymbolESMPanel;
