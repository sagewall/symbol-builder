import type SimpleLineSymbol from "@arcgis/core/symbols/SimpleLineSymbol";
import React, { useRef } from "react";
import { jsonStyles } from "./lib/styles";

interface Props {
  simpleLineSymbol: SimpleLineSymbol;
}

const SimpleLineSymbolESMPanel = ({ simpleLineSymbol }: Props) => {
  const alertRef = useRef<HTMLCalciteAlertElement>(null);

  const handleCopyClick = async () => {
    await navigator.clipboard.writeText(codeSnippet);
    alertRef.current && (alertRef.current.open = true);
  };

  let codeSnippet = ``;

  if (simpleLineSymbol.marker) {
    codeSnippet = `
import Color from "@arcgis/core/Color.js";
import LineSymbolMarker from "@arcgis/core/symbols/LineSymbolMarker.js";
import SimpleLineSymbol from "@arcgis/core/symbols/SimpleLineSymbol.js";

const simpleLineSymbol = new SimpleLineSymbol({
  cap: "${simpleLineSymbol.cap}",
  color: new Color([${simpleLineSymbol.color.toRgba()}]),
  join: "${simpleLineSymbol.join}",
  marker: new LineSymbolMarker({
    color: new Color([${simpleLineSymbol.marker.color.toRgba()}]),
    placement: "${simpleLineSymbol.marker.placement}",
    style: "${simpleLineSymbol.marker.style}",
  }),
  miterLimit: ${simpleLineSymbol.miterLimit},
  style: "${simpleLineSymbol.style}",
  width: ${simpleLineSymbol.width}
});`;
  } else {
    codeSnippet = `
import Color from "@arcgis/core/Color.js";
import SimpleLineSymbol from "@arcgis/core/symbols/SimpleLineSymbol.js";

const simpleLineSymbol = new SimpleLineSymbol({
  cap: "${simpleLineSymbol.cap}",
  color: new Color([${simpleLineSymbol.color.toRgba()}]),
  join: "${simpleLineSymbol.join}",
  miterLimit: ${simpleLineSymbol.miterLimit},
  style: "${simpleLineSymbol.style}",
  width: ${simpleLineSymbol.width}
});`;
  }

  return (
    <React.Fragment>
      <calcite-panel>
        <div slot="header-content">ESM / TypeScript</div>
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

export default SimpleLineSymbolESMPanel;
