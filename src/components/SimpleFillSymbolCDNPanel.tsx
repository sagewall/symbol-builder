import type SimpleFillSymbol from "@arcgis/core/symbols/SimpleFillSymbol";
import React, { useRef } from "react";
import { jsonStyles } from "./lib/styles";

interface Props {
  simpleFillSymbol: SimpleFillSymbol;
}

const SimpleFillSymbolCDNPanel = ({ simpleFillSymbol }: Props) => {
  const alertRef = useRef<HTMLCalciteAlertElement>(null);

  const handleCopyClick = async () => {
    await navigator.clipboard.writeText(codeSnippet);
    if (alertRef.current) {
      alertRef.current.open = true;
    }
  };

  const codeSnippet = `
const SimpleFillSymbol = await $arcgis.import("@arcgis/core/symbols/SimpleFillSymbol.js");

const simpleFillSymbol = new SimpleFillSymbol({
  color: [${simpleFillSymbol.color.toRgba()}],
  outline: {
    cap: "${simpleFillSymbol.outline?.cap}",
    color: [${simpleFillSymbol.outline?.color?.toRgba()}],
    join: "${simpleFillSymbol.outline?.join}",
    miterLimit: ${simpleFillSymbol.outline?.miterLimit},
    style: "${simpleFillSymbol.outline?.style}",
    width: ${simpleFillSymbol.outline?.width}
  },
  style: "${simpleFillSymbol.style}"
});`;

  return (
    <React.Fragment>
      <calcite-panel>
        <div slot="header-content">CDN</div>
        <calcite-action
          icon="copy-to-clipboard"
          label="Copy code to clipboard"
          text="Copy Snippet"
          textEnabled
          slot="header-actions-end"
          onClick={handleCopyClick}
        ></calcite-action>

        <pre style={jsonStyles}>{codeSnippet}</pre>
      </calcite-panel>
      <calcite-alert
        autoClose
        autoCloseDuration="fast"
        icon="copy-to-clipboard"
        kind="success"
        label="Copied to clipboard"
        ref={alertRef}
      >
        <div slot="message">Copied to clipboard</div>
      </calcite-alert>
    </React.Fragment>
  );
};

export default SimpleFillSymbolCDNPanel;
