import SimpleLineSymbol from "@arcgis/core/symbols/SimpleLineSymbol";
import { CalciteAction, CalcitePanel } from "@esri/calcite-components-react";
import React from "react";
import { jsonStyles } from "./lib/styles";

interface Props {
  simpleLineSymbol: SimpleLineSymbol;
}

const SimpleLineSymbolESMPanel = ({ simpleLineSymbol }: Props) => {
  const handleCopyClick = () => {
    navigator.clipboard.writeText(codeSnippet);
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
    </React.Fragment>
  );
};

export default SimpleLineSymbolESMPanel;
