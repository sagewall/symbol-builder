import type SimpleLineSymbol from "@arcgis/core/symbols/SimpleLineSymbol";
import React, { useRef } from "react";
import { jsonStyles } from "./lib/styles";

interface Props {
  simpleLineSymbol: SimpleLineSymbol;
}

const SimpleLineSymbolCDNPanel = ({ simpleLineSymbol }: Props) => {
  const alertRef = useRef<HTMLCalciteAlertElement>(null);

  const handleCopyClick = async () => {
    await navigator.clipboard.writeText(codeSnippet);
    if (alertRef.current) {
      alertRef.current.open = true;
    }
  };

  let codeSnippet = ``;

  if (simpleLineSymbol.marker) {
    codeSnippet = `
const SimpleLineSymbol = await $arcgis.import("@arcgis/core/symbols/SimpleLineSymbol.js");

const simpleLineSymbol = new SimpleLineSymbol({
  cap: "${simpleLineSymbol.cap}",
  color: [${simpleLineSymbol.color?.toRgba()}],
  join: "${simpleLineSymbol.join}",
  marker: {
    color: [${simpleLineSymbol.marker.color.toRgba()}],
    placement: "${simpleLineSymbol.marker.placement}",
    style: "${simpleLineSymbol.marker.style}",
  },
  miterLimit: ${simpleLineSymbol.miterLimit},
  style: "${simpleLineSymbol.style}",
  width: ${simpleLineSymbol.width}
});`;
  } else {
    codeSnippet = `
const SimpleLineSymbol = await $arcgis.import("@arcgis/core/symbols/SimpleLineSymbol.js");

const simpleLineSymbol = new SimpleLineSymbol({
  cap: "${simpleLineSymbol.cap}",
  color: [${simpleLineSymbol.color?.toRgba()}],
  join: "${simpleLineSymbol.join}",
  miterLimit: ${simpleLineSymbol.miterLimit},
  style: "${simpleLineSymbol.style}",
  width: ${simpleLineSymbol.width}
});`;
  }

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

export default SimpleLineSymbolCDNPanel;
