import type WebStyleSymbol from "@arcgis/core/symbols/WebStyleSymbol";
import { CalciteAction, CalciteAlert, CalcitePanel } from "@esri/calcite-components-react";
import React, { useRef } from "react";
import { jsonStyles } from "./lib/styles";

interface Props {
  webStyleSymbol: WebStyleSymbol;
}

const SimpleFillSymbolJSONPanel = ({ webStyleSymbol }: Props) => {
  const alertRef = useRef<HTMLCalciteAlertElement>(null);

  const handleCopyClick = async () => {
    await navigator.clipboard.writeText(codeSnippet);
    alertRef.current && (alertRef.current.open = true);
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
