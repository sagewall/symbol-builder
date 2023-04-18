import SimpleLineSymbol from "@arcgis/core/symbols/SimpleLineSymbol";
import { CalciteAction, CalcitePanel } from "@esri/calcite-components-react";
import React from "react";
import { jsonStyles } from "./lib/styles";

interface Props {
  simpleLineSymbol: SimpleLineSymbol;
}

const SimpleLineSymbolJSONPanel = ({ simpleLineSymbol }: Props) => {
  const handleCopyClick = () => {
    navigator.clipboard.writeText(codeSnippet);
  };

  const codeSnippet = `
import SimpleLineSymbol from "@arcgis/core/symbols/SimpleLineSymbol.js";

const simpleLineSymbol = SimpleLineSymbol.fromJSON(
${JSON.stringify(simpleLineSymbol.toJSON(), null, 2)});`;

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

export default SimpleLineSymbolJSONPanel;
