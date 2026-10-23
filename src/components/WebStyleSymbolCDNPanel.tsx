import type WebStyleSymbol from "@arcgis/core/symbols/WebStyleSymbol.js";
import CodeSnippetPanel from "./CodeSnippetPanel";

interface Props {
  webStyleSymbol: WebStyleSymbol;
}

function WebStyleSymbolCDNPanel({ webStyleSymbol }: Props): React.ReactElement {
  let codeSnippet = ``;

  if (webStyleSymbol.styleName) {
    codeSnippet = `
const WebStyleSymbol = await $arcgis.import("@arcgis/core/symbols/WebStyleSymbol.js");

const webStyleSymbol = new WebStyleSymbol({
  name: ${JSON.stringify(webStyleSymbol.name)},
  styleName: ${JSON.stringify(webStyleSymbol.styleName)}
});`;
  } else {
    codeSnippet = `
const WebStyleSymbol = await $arcgis.import("@arcgis/core/symbols/WebStyleSymbol.js");

const webStyleSymbol = new WebStyleSymbol({
  name: ${JSON.stringify(webStyleSymbol.name)},
  styleUrl: ${JSON.stringify(webStyleSymbol.styleUrl)}
});`;
  }

  return <CodeSnippetPanel title="CDN" codeSnippet={codeSnippet} />;
}

export default WebStyleSymbolCDNPanel;
