import type PictureFillSymbol from "@arcgis/core/symbols/PictureFillSymbol";
import React, { useRef } from "react";
import { jsonStyles } from "./lib/styles";

interface Props {
  pictureFillSymbol: PictureFillSymbol;
}

const PictureFillSymbolESMPanel = ({ pictureFillSymbol }: Props) => {
  const alertRef = useRef<HTMLCalciteAlertElement>(null);

  const handleCopyClick = async () => {
    await navigator.clipboard.writeText(codeSnippet);
    if (alertRef.current) {
      alertRef.current.open = true;
    }
  };

  const codeSnippet = `
import Color from "@arcgis/core/Color.js";
import PictureFillSymbol from "@arcgis/core/symbols/PictureFillSymbol.js";
import SimpleLineSymbol from "@arcgis/core/symbols/SimpleLineSymbol.js";

const pictureFillSymbol = new PictureFillSymbol({
  height: ${pictureFillSymbol.height},
  outline: new SimpleLineSymbol({
    cap: "${pictureFillSymbol.outline?.cap}",
    color: new Color([${pictureFillSymbol.outline?.color?.toRgba()}]),
    join: "${pictureFillSymbol.outline?.join}",
    miterLimit: ${pictureFillSymbol.outline?.miterLimit},
    style: "${pictureFillSymbol.outline?.style}",
    width: ${pictureFillSymbol.outline?.width}
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

export default PictureFillSymbolESMPanel;
