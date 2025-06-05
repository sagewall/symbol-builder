import type PictureMarkerSymbol from "@arcgis/core/symbols/PictureMarkerSymbol";
import React, { useRef } from "react";
import { jsonStyles } from "./lib/styles";

interface Props {
  pictureMarkerSymbol: PictureMarkerSymbol;
}

const PictureMarkerSymbolESMPanel = ({ pictureMarkerSymbol }: Props) => {
  const alertRef = useRef<HTMLCalciteAlertElement>(null);

  const handleCopyClick = async () => {
    await navigator.clipboard.writeText(codeSnippet);
    if (alertRef.current) {
      alertRef.current.open = true;
    }
  };

  const codeSnippet = `
import PictureMarkerSymbol from "@arcgis/core/symbols/PictureMarkerSymbol.js";

const pictureMarkerSymbol = new PictureMarkerSymbol({
  angle: ${pictureMarkerSymbol.angle},
  height: ${pictureMarkerSymbol.height},
  url: "${pictureMarkerSymbol.url}",
  width: ${pictureMarkerSymbol.width},
  xoffset: ${pictureMarkerSymbol.xoffset},
  yoffset: ${pictureMarkerSymbol.yoffset}
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

export default PictureMarkerSymbolESMPanel;
