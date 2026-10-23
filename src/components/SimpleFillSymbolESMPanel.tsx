import type SimpleFillSymbol from "@arcgis/core/symbols/SimpleFillSymbol.js";
import CodeSnippetPanel from "./CodeSnippetPanel";
import { generateSimpleFillSymbolESMSnippet } from "./lib/snippets/simpleFillSymbol";

interface Props {
  simpleFillSymbol: SimpleFillSymbol;
}

function SimpleFillSymbolESMPanel({
  simpleFillSymbol,
}: Props): React.ReactElement {
  const codeSnippet = generateSimpleFillSymbolESMSnippet(simpleFillSymbol);

  return <CodeSnippetPanel title="ESM / TypeScript" codeSnippet={codeSnippet} />;
}

export default SimpleFillSymbolESMPanel;
