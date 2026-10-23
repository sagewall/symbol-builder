import type TextSymbol from "@arcgis/core/symbols/TextSymbol.js";
import CodeSnippetPanel from "./CodeSnippetPanel";

interface Props {
  textSymbol: TextSymbol;
}

function TextSymbolJSONPanel({ textSymbol }: Props): React.ReactElement {
  const codeSnippet = `
import TextSymbol from "@arcgis/core/symbols/TextSymbol.js";

const textSymbol = TextSymbol.fromJSON(
${JSON.stringify(textSymbol.toJSON(), null, 2)});`;

  return <CodeSnippetPanel title="JSON" codeSnippet={codeSnippet} />;
}

export default TextSymbolJSONPanel;
