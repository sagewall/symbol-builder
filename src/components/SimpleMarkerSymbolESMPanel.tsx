import type SimpleMarkerSymbol from "@arcgis/core/symbols/SimpleMarkerSymbol.js";
import CodeSnippetPanel from "./CodeSnippetPanel";
import { generateSimpleMarkerSymbolESMSnippet } from "./lib/snippets/simpleMarkerSymbol";

interface Props {
  simpleMarkerSymbol: SimpleMarkerSymbol;
}

function SimpleMarkerSymbolESMPanel({
  simpleMarkerSymbol,
}: Props): React.ReactElement {
  const codeSnippet = generateSimpleMarkerSymbolESMSnippet(simpleMarkerSymbol);

  return <CodeSnippetPanel title="ESM / TypeScript" codeSnippet={codeSnippet} />;
}

export default SimpleMarkerSymbolESMPanel;
