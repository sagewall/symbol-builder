import type SimpleLineSymbol from "@arcgis/core/symbols/SimpleLineSymbol.js";
import CodeSnippetPanel from "./CodeSnippetPanel";

interface Props {
  simpleLineSymbol: SimpleLineSymbol;
}

function SimpleLineSymbolJSONPanel({
  simpleLineSymbol,
}: Props): React.ReactElement {
  const codeSnippet = `
import SimpleLineSymbol from "@arcgis/core/symbols/SimpleLineSymbol.js";

const simpleLineSymbol = SimpleLineSymbol.fromJSON(
${JSON.stringify(simpleLineSymbol.toJSON(), null, 2)});`;

  return <CodeSnippetPanel title="JSON" codeSnippet={codeSnippet} />;
}

export default SimpleLineSymbolJSONPanel;
