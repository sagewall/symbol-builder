import type WebStyleSymbol from "@arcgis/core/symbols/WebStyleSymbol.js";
import CodeSnippetPanel from "./CodeSnippetPanel";

interface Props {
  webStyleSymbol: WebStyleSymbol;
}

function SimpleFillSymbolJSONPanel({
  webStyleSymbol,
}: Props): React.ReactElement {
  const codeSnippet = `
import WebStyleSymbol from "@arcgis/core/symbols/WebStyleSymbol.js";

const webStyleSymbol = WebStyleSymbol.fromJSON(
${JSON.stringify(webStyleSymbol.toJSON(), null, 2)});`;

  return <CodeSnippetPanel title="JSON" codeSnippet={codeSnippet} />;
}

export default SimpleFillSymbolJSONPanel;
