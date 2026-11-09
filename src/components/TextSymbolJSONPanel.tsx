import type TextSymbol from "@arcgis/core/symbols/TextSymbol.js";
import CodeSnippetPanel from "./CodeSnippetPanel";
import { generateTextSymbolJSONSnippet } from "./lib/snippets/textSymbol";

interface Props {
  textSymbol: TextSymbol;
}

function TextSymbolJSONPanel({ textSymbol }: Props): React.ReactElement {
  const codeSnippet = generateTextSymbolJSONSnippet(textSymbol);

  return <CodeSnippetPanel title="JSON" codeSnippet={codeSnippet} />;
}

export default TextSymbolJSONPanel;
