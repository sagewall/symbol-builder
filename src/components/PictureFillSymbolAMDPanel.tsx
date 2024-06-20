import type PictureFillSymbol from "@arcgis/core/symbols/PictureFillSymbol";
import { CalciteAction, CalciteAlert, CalcitePanel } from "@esri/calcite-components-react";
import React, { useRef } from "react";
import { jsonStyles } from "./lib/styles";

interface Props {
  pictureFillSymbol: PictureFillSymbol;
}

const PictureFillSymbolAMDPanel = ({ pictureFillSymbol }: Props) => {
  const alertRef = useRef<HTMLCalciteAlertElement>(null);

  const handleCopyClick = async () => {
    await navigator.clipboard.writeText(codeSnippet);
    alertRef.current && (alertRef.current.open = true);
  };

  const codeSnippet = `
require(["esri/symbols/PictureFillSymbol"], (PictureFillSymbol) => {
  const pictureFillSymbol = new PictureFillSymbol({
    height: ${pictureFillSymbol.height},
    outline: {
      cap: "${pictureFillSymbol.outline.cap}",
      color: ${JSON.stringify(pictureFillSymbol.outline.color.toJSON())},
      join: "${pictureFillSymbol.outline.join}",
      miterLimit: ${pictureFillSymbol.outline.miterLimit},
      style: "${pictureFillSymbol.outline.style}",
      width: ${pictureFillSymbol.outline.width}
    },
    url: "${pictureFillSymbol.url}",
    width: ${pictureFillSymbol.width},
    xoffset: ${pictureFillSymbol.xoffset},
    xscale: ${pictureFillSymbol.xscale},
    yoffset: ${pictureFillSymbol.yoffset},
    yscale: ${pictureFillSymbol.yscale}
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

export default PictureFillSymbolAMDPanel;
