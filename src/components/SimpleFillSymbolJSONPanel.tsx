import type SimpleFillSymbol from "@arcgis/core/symbols/SimpleFillSymbol";
import { CalciteAction, CalcitePanel } from "@esri/calcite-components-react";
import React from "react";
import { jsonStyles } from "./lib/styles";

interface Props {
  simpleFillSymbol: SimpleFillSymbol;
}

const SimpleFillSymbolJSONPanel = ({ simpleFillSymbol }: Props) => {
  const handleCopyClick = () => {
    navigator.clipboard.writeText(codeSnippet);
  };

  const codeSnippet = `
import SimpleFillSymbol from "@arcgis/core/symbols/SimpleFillSymbol.js";

const simpleFillSymbol = SimpleFillSymbol.fromJSON(
${JSON.stringify(simpleFillSymbol.toJSON(), null, 2)});`;

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
