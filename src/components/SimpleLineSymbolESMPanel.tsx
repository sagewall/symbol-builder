import type SimpleLineSymbol from "@arcgis/core/symbols/SimpleLineSymbol.js";
import CodeSnippetPanel from "./CodeSnippetPanel";
import { generateSimpleLineSymbolESMSnippet } from "./lib/snippets/simpleLineSymbol";

interface Props {
  simpleLineSymbol: SimpleLineSymbol;
}

function SimpleLineSymbolESMPanel({
  simpleLineSymbol,
}: Props): React.ReactElement {
  const codeSnippet = generateSimpleLineSymbolESMSnippet(simpleLineSymbol);

  return (
    <CodeSnippetPanel title="ESM / TypeScript" codeSnippet={codeSnippet} />
  );
}

export default SimpleLineSymbolESMPanel;
