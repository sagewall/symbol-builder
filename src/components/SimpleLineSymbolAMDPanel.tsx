import type SimpleLineSymbol from "@arcgis/core/symbols/SimpleLineSymbol";
import { CalciteAction, CalciteAlert, CalcitePanel } from "@esri/calcite-components-react";
import React, { useRef } from "react";
import { jsonStyles } from "./lib/styles";

interface Props {
  simpleLineSymbol: SimpleLineSymbol;
}

const SimpleLineSymbolAMDPanel = ({ simpleLineSymbol }: Props) => {
  const alertRef = useRef<HTMLCalciteAlertElement>(null);

  const handleCopyClick = async () => {
    await navigator.clipboard.writeText(codeSnippet);
    alertRef.current && (alertRef.current.open = true);
  };

  let codeSnippet = ``;

  if (simpleLineSymbol.marker) {
    codeSnippet = `
require(["esri/symbols/SimpleLineSymbol"], (SimpleLineSymbol) => {
  const simpleLineSymbol = new SimpleLineSymbol({
    cap: "${simpleLineSymbol.cap}",
    color: [${simpleLineSymbol.color.toRgba()}],
    join: "${simpleLineSymbol.join}",
    marker: {
      color: [${simpleLineSymbol.marker.color.toRgba()}],
      placement: "${simpleLineSymbol.marker.placement}",
      style: "${simpleLineSymbol.marker.style}",
    },
    miterLimit: ${simpleLineSymbol.miterLimit},
    style: "${simpleLineSymbol.style}",
    width: ${simpleLineSymbol.width}
  });
});`;
  } else {
    codeSnippet = `
require(["esri/symbols/SimpleLineSymbol"], (SimpleLineSymbol) => {
  const simpleLineSymbol = new SimpleLineSymbol({
    cap: "${simpleLineSymbol.cap}",
    color: [${simpleLineSymbol.color.toRgba()}],
    join: "${simpleLineSymbol.join}",
    miterLimit: ${simpleLineSymbol.miterLimit},
    style: "${simpleLineSymbol.style}",
    width: ${simpleLineSymbol.width}
  });
});`;
  }

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

export default SimpleLineSymbolAMDPanel;
