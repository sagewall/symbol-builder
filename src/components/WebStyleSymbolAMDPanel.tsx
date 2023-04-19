import WebStyleSymbol from "@arcgis/core/symbols/WebStyleSymbol";
import { CalciteAction, CalcitePanel } from "@esri/calcite-components-react";
import React from "react";
import { jsonStyles } from "./lib/styles";

interface Props {
  webStyleSymbol: WebStyleSymbol;
}

const WebStyleSymbolAMDPanel = ({ webStyleSymbol }: Props) => {
  const handleCopyClick = () => {
    navigator.clipboard.writeText(codeSnippet);
  };

  let codeSnippet = ``;

  if (webStyleSymbol.styleName) {
    codeSnippet = `
require(["esri/symbols/WebStyleSymbol"], (WebStyleSymbol) => {
  const webStyleSymbol = new WebStyleSymbol({
    name: "${webStyleSymbol.name}",
    styleName: "${webStyleSymbol.styleName}"
  });
});`;
  } else {
    codeSnippet = `
require(["esri/symbols/WebStyleSymbol"], (WebStyleSymbol) => {
  const webStyleSymbol = new WebStyleSymbol({
    name: "${webStyleSymbol.name}",
    styleUrl: "${webStyleSymbol.styleUrl}"
  });
});`;
  }

  return (
    <React.Fragment>
      <CalcitePanel>
        <div slot="header-content">AMD / Autocasting</div>
        <CalciteAction
          icon="copy-to-clipboard"
          label="Copy code to clipboard"
          text="Copy Snippet"
          textEnabled
          slot="header-actions-end"
          onClick={handleCopyClick}
        ></CalciteAction>

        <pre style={jsonStyles}>{codeSnippet}</pre>
      </CalcitePanel>
    </React.Fragment>
  );
};

export default WebStyleSymbolAMDPanel;
