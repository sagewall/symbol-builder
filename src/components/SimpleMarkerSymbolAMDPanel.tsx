import type SimpleMarkerSymbol from "@arcgis/core/symbols/SimpleMarkerSymbol";
import { CalciteAction, CalciteAlert, CalcitePanel } from "@esri/calcite-components-react";
import React, { useRef } from "react";
import { jsonStyles } from "./lib/styles";

interface Props {
  simpleMarkerSymbol: SimpleMarkerSymbol;
}

const SimpleMarkerSymbolAMDPanel = ({ simpleMarkerSymbol }: Props) => {
  const alertRef = useRef<HTMLCalciteAlertElement>(null);

  const handleCopyClick = async () => {
    await navigator.clipboard.writeText(codeSnippet);
    alertRef.current && (alertRef.current.open = true);
  };

  const codeSnippet = `
require(["esri/symbols/SimpleMarkerSymbol"], (SimpleMarkerSymbol) => {
  const simpleMarkerSymbol = new SimpleMarkerSymbol({
    angle: ${simpleMarkerSymbol.angle},
    color: [${simpleMarkerSymbol.color.toRgba()}],
    outline: {
      cap: "${simpleMarkerSymbol.outline.cap}",
      color: [${simpleMarkerSymbol.outline.color.toRgba()}],
      join: "${simpleMarkerSymbol.outline.join}",
      miterLimit: ${simpleMarkerSymbol.outline.miterLimit},
      style: "${simpleMarkerSymbol.outline.style}",
      width: ${simpleMarkerSymbol.outline.width}
    },
    path: "${simpleMarkerSymbol.path}",
    size: ${simpleMarkerSymbol.size},
    style: "${simpleMarkerSymbol.style}",
    xoffset: ${simpleMarkerSymbol.xoffset},
    yoffset: ${simpleMarkerSymbol.yoffset}
  });
});`;

  return (
    <React.Fragment>
      <CalcitePanel>
        <div slot="header-content">AMD / Autocasting</div>
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

export default SimpleMarkerSymbolAMDPanel;
