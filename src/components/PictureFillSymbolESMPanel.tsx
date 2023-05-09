import type PictureFillSymbol from "@arcgis/core/symbols/PictureFillSymbol";
import { CalciteAction, CalcitePanel } from "@esri/calcite-components-react";
import React from "react";
import { jsonStyles } from "./lib/styles";

interface Props {
  pictureFillSymbol: PictureFillSymbol;
}

const PictureFillSymbolESMPanel = ({ pictureFillSymbol }: Props) => {
  const handleCopyClick = () => {
    navigator.clipboard.writeText(codeSnippet);
  };

  const codeSnippet = `
  import Color from "@arcgis/core/Color.js";
  import PictureFillSymbol from "@arcgis/core/symbols/PictureFillSymbol.js";
  import SimpleLineSymbol from "@arcgis/core/symbols/SimpleLineSymbol.js";
  
  const pictureFillSymbol = new PictureFillSymbol({
    height: ${pictureFillSymbol.height},
    outline: new SimpleLineSymbol({
      cap: "${pictureFillSymbol.outline.cap}",
      color: new Color([${pictureFillSymbol.outline.color.toRgba()}]),
      join: "${pictureFillSymbol.outline.join}",
      miterLimit: ${pictureFillSymbol.outline.miterLimit},
      style: "${pictureFillSymbol.outline.style}",
      width: ${pictureFillSymbol.outline.width}
    }),
    url: "${pictureFillSymbol.url}",
    width: ${pictureFillSymbol.width},
    xoffset: ${pictureFillSymbol.xoffset},
    xscale: ${pictureFillSymbol.xscale},
    yoffset: ${pictureFillSymbol.yoffset},
    yscale: ${pictureFillSymbol.yscale}
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

export default PictureFillSymbolESMPanel;
