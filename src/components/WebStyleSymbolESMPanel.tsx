import type WebStyleSymbol from "@arcgis/core/symbols/WebStyleSymbol.js";
import CodeSnippetPanel from "./CodeSnippetPanel";

interface Props {
  webStyleSymbol: WebStyleSymbol;
}

function WebStyleSymbolESMPanel({ webStyleSymbol }: Props): React.ReactElement {
  let codeSnippet = ``;

  if (webStyleSymbol.styleName) {
    codeSnippet = `
import WebStyleSymbol from "@arcgis/core/symbols/WebStyleSymbol.js";

const webStyleSymbol = new WebStyleSymbol({
  name: ${JSON.stringify(webStyleSymbol.name)},
  styleName: ${JSON.stringify(webStyleSymbol.styleName)}
});`;
  } else {
    codeSnippet = `
import WebStyleSymbol from "@arcgis/core/symbols/WebStyleSymbol.js";

const webStyleSymbol = new WebStyleSymbol({
  name: ${JSON.stringify(webStyleSymbol.name)},
  styleUrl: ${JSON.stringify(webStyleSymbol.styleUrl)}
});`;
  }

  return <CodeSnippetPanel title="ESM / TypeScript" codeSnippet={codeSnippet} />;
}

export default WebStyleSymbolESMPanel;
