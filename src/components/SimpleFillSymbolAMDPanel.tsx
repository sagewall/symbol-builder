import SimpleFillSymbol from "@arcgis/core/symbols/SimpleFillSymbol";
import { CalciteAction, CalcitePanel } from "@esri/calcite-components-react";
import React from "react";
import { jsonStyles } from "./lib/styles";

interface Props {
  simpleFillSymbol: SimpleFillSymbol;
}

const SimpleFillSymbolAMDPanel = ({ simpleFillSymbol }: Props) => {
  const handleCopyClick = () => {
    navigator.clipboard.writeText(codeSnippet);
  };

  const codeSnippet = `
require(["esri/symbols/SimpleFillSymbol"], (SimpleFillSymbol) => {
  const simpleFillSymbol = new SimpleFillSymbol({
    color: [${simpleFillSymbol.color.toRgba()}],
    outline: {
      cap: "${simpleFillSymbol.outline.cap}",
      color: [${simpleFillSymbol.outline.color.toRgba()}],
      join: "${simpleFillSymbol.outline.join}",
      miterLimit: ${simpleFillSymbol.outline.miterLimit},
      style: "${simpleFillSymbol.outline.style}",
      width: ${simpleFillSymbol.outline.width}
    },
    style: "${simpleFillSymbol.style}"
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
    </React.Fragment>
  );
};

export default SimpleFillSymbolAMDPanel;
