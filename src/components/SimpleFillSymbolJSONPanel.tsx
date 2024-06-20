import type SimpleFillSymbol from "@arcgis/core/symbols/SimpleFillSymbol";
import { CalciteAction, CalciteAlert, CalcitePanel } from "@esri/calcite-components-react";
import React, { useRef } from "react";
import { jsonStyles } from "./lib/styles";

interface Props {
  simpleFillSymbol: SimpleFillSymbol;
}

const SimpleFillSymbolJSONPanel = ({ simpleFillSymbol }: Props) => {
  const alertRef = useRef<HTMLCalciteAlertElement>(null);

  const handleCopyClick = async () => {
    await navigator.clipboard.writeText(codeSnippet);
    alertRef.current && (alertRef.current.open = true);
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
      <CalciteAlert
        autoClose
        autoCloseDuration="fast"
        icon="copy-to-clipboard"
        kind="success"
        label="Copied to clipboard"
        ref={alertRef}
      >
        <div slot="message">Copied to clipboard</div>
      </CalciteAlert>
    </React.Fragment>
  );
};

export default SimpleFillSymbolJSONPanel;
