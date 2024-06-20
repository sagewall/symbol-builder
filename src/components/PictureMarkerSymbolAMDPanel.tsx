import type PictureMarkerSymbol from "@arcgis/core/symbols/PictureMarkerSymbol";
import { CalciteAction, CalciteAlert, CalcitePanel } from "@esri/calcite-components-react";
import React, { useRef } from "react";
import { jsonStyles } from "./lib/styles";

interface Props {
  pictureMarkerSymbol: PictureMarkerSymbol;
}

const PictureMarkerSymbolAMDPanel = ({ pictureMarkerSymbol }: Props) => {
  const alertRef = useRef<HTMLCalciteAlertElement>(null);

  const handleCopyClick = async () => {
    await navigator.clipboard.writeText(codeSnippet);
    alertRef.current && (alertRef.current.open = true);
  };

  const codeSnippet = `
require(["esri/symbols/PictureMarkerSymbol"], (PictureMarkerSymbol) => {
  const pictureMarkerSymbol = new PictureMarkerSymbol({
    angle: ${pictureMarkerSymbol.angle},
    height: ${pictureMarkerSymbol.height},
    url: "${pictureMarkerSymbol.url}",
    width: ${pictureMarkerSymbol.width},
    xoffset: ${pictureMarkerSymbol.xoffset},
    yoffset: ${pictureMarkerSymbol.yoffset}
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

export default PictureMarkerSymbolAMDPanel;
