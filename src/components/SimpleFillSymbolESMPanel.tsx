import type SimpleFillSymbol from "@arcgis/core/symbols/SimpleFillSymbol";
import { CalciteAction, CalciteAlert, CalcitePanel } from "@esri/calcite-components-react";
import React, { useRef } from "react";
import { jsonStyles } from "./lib/styles";

interface Props {
  simpleFillSymbol: SimpleFillSymbol;
}

const SimpleFillSymbolESMPanel = ({ simpleFillSymbol }: Props) => {
  const alertRef = useRef<HTMLCalciteAlertElement>(null);

  const handleCopyClick = async () => {
    await navigator.clipboard.writeText(codeSnippet);
    alertRef.current && (alertRef.current.open = true);
  };

  const codeSnippet = `
import Color from "@arcgis/core/Color.js";
import SimpleFillSymbol from "@arcgis/core/symbols/SimpleFillSymbol.js";
import SimpleLineSymbol from "@arcgis/core/symbols/SimpleLineSymbol.js";

const simpleFillSymbol = new SimpleFillSymbol({
  color: new Color([${simpleFillSymbol.color.toRgba()}]),
  outline: new SimpleLineSymbol({
    cap: "${simpleFillSymbol.outline.cap}",
    color: new Color([${simpleFillSymbol.outline.color.toRgba()}]),
    join: "${simpleFillSymbol.outline.join}",
    miterLimit: ${simpleFillSymbol.outline.miterLimit},
    style: "${simpleFillSymbol.outline.style}",
    width: ${simpleFillSymbol.outline.width}
  }),
  style: "${simpleFillSymbol.style}"
});`;

  return (
    <React.Fragment>
      <CalcitePanel>
        <div slot="header-content">ESM / TypeScript</div>
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

export default SimpleFillSymbolESMPanel;
