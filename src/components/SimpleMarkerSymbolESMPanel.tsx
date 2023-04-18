import SimpleMarkerSymbol from "@arcgis/core/symbols/SimpleMarkerSymbol";
import { CalciteAction, CalcitePanel } from "@esri/calcite-components-react";
import React from "react";
import { jsonStyles } from "./lib/styles";

interface Props {
  simpleMarkerSymbol: SimpleMarkerSymbol;
}

const SimpleMarkerSymbolESMPanel = ({ simpleMarkerSymbol }: Props) => {
  const handleCopyClick = () => {
    navigator.clipboard.writeText(codeSnippet);
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

export default SimpleMarkerSymbolESMPanel;
