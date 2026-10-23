import type SimpleMarkerSymbol from "@arcgis/core/symbols/SimpleMarkerSymbol.js";
import CodeSnippetPanel from "./CodeSnippetPanel";

interface Props {
  simpleMarkerSymbol: SimpleMarkerSymbol;
}

function SimpleMarkerSymbolJSONPanel({
  simpleMarkerSymbol,
}: Props): React.ReactElement {
  const codeSnippet = `
import SimpleMarkerSymbol from "@arcgis/core/symbols/SimpleMarkerSymbol.js";

const simpleMarkerSymbol = SimpleMarkerSymbol.fromJSON(
${JSON.stringify(simpleMarkerSymbol.toJSON(), null, 2)});`;

  return <CodeSnippetPanel title="JSON" codeSnippet={codeSnippet} />;
}

export default SimpleMarkerSymbolJSONPanel;
