import type SimpleMarkerSymbol from "@arcgis/core/symbols/SimpleMarkerSymbol.js";
import CodeSnippetPanel from "./CodeSnippetPanel";
import { generateSimpleMarkerSymbolCDNSnippet } from "./lib/snippets/simpleMarkerSymbol";

interface Props {
  simpleMarkerSymbol: SimpleMarkerSymbol;
}

function SimpleMarkerSymbolCDNPanel({
  simpleMarkerSymbol,
}: Props): React.ReactElement {
  const codeSnippet = generateSimpleMarkerSymbolCDNSnippet(simpleMarkerSymbol);

  return <CodeSnippetPanel title="CDN" codeSnippet={codeSnippet} />;
}

export default SimpleMarkerSymbolCDNPanel;
