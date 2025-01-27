import type SimpleMarkerSymbol from "@arcgis/core/symbols/SimpleMarkerSymbol";
import React, { useRef } from "react";
import { jsonStyles } from "./lib/styles";

interface Props {
  simpleMarkerSymbol: SimpleMarkerSymbol;
}

const SimpleMarkerSymbolESMPanel = ({ simpleMarkerSymbol }: Props) => {
  const alertRef = useRef<HTMLCalciteAlertElement>(null);

  const handleCopyClick = async () => {
    await navigator.clipboard.writeText(codeSnippet);
    if (alertRef.current) {
      alertRef.current.open = true;
    }
  };

  const codeSnippet = `
  import Color from "@arcgis/core/Color.js";
  import SimpleLineSymbol from "@arcgis/core/symbols/SimpleLineSymbol.js";
  import SimpleMarkerSymbol from "@arcgis/core/symbols/SimpleMarkerSymbol.js";
  
  const simpleMarkerSymbol = new SimpleMarkerSymbol({
    angle: ${simpleMarkerSymbol.angle},
    color: new Color([${simpleMarkerSymbol.color.toRgba()}]),
    outline: new SimpleLineSymbol({
      cap: "${simpleMarkerSymbol.outline.cap}",
      color: new Color([${simpleMarkerSymbol.outline.color.toRgba()}]),
      join: "${simpleMarkerSymbol.outline.join}",
      miterLimit: ${simpleMarkerSymbol.outline.miterLimit},
      style: "${simpleMarkerSymbol.outline.style}",
      width: ${simpleMarkerSymbol.outline.width}
    }),
    path: "${simpleMarkerSymbol.path}",
    size: ${simpleMarkerSymbol.size},
    style: "${simpleMarkerSymbol.style}",
    xoffset: ${simpleMarkerSymbol.xoffset},
    yoffset: ${simpleMarkerSymbol.yoffset}
  });`;

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

export default SimpleMarkerSymbolESMPanel;
