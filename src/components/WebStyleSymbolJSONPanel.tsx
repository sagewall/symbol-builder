import WebStyleSymbol from "@arcgis/core/symbols/WebStyleSymbol";
import { CalciteAction, CalcitePanel } from "@esri/calcite-components-react";
import React from "react";
import { jsonStyles } from "./lib/styles";

interface Props {
  webStyleSymbol: WebStyleSymbol;
}

const SimpleFillSymbolJSONPanel = ({ webStyleSymbol }: Props) => {
  const handleCopyClick = () => {
    navigator.clipboard.writeText(codeSnippet);
  };

  const codeSnippet = `
import WebStyleSymbol from "@arcgis/core/symbols/WebStyleSymbol.js";

const webStyleSymbolSymbol = WebStyleSymbol.fromJSON(
${JSON.stringify(webStyleSymbol.toJSON(), null, 2)});`;

  return (
    <React.Fragment>
      <CalcitePanel>
        <div slot="header-content">JSON</div>
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

export default SimpleFillSymbolJSONPanel;
