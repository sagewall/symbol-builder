import type PictureMarkerSymbol from "@arcgis/core/symbols/PictureMarkerSymbol";
import { CalciteAction, CalcitePanel } from "@esri/calcite-components-react";
import React from "react";
import { jsonStyles } from "./lib/styles";

interface Props {
  pictureMarkerSymbol: PictureMarkerSymbol;
}

const PictureMarkerSymbolJSONPanel = ({ pictureMarkerSymbol }: Props) => {
  const handleCopyClick = () => {
    navigator.clipboard.writeText(codeSnippet);
  };

  const codeSnippet = `
import PictureMarkerSymbol from "@arcgis/core/symbols/PictureMarkerSymbol.js";

const textSymbolSymbol = PictureMarkerSymbol.fromJSON(
${JSON.stringify(pictureMarkerSymbol.toJSON(), null, 2)});`;

  return (
    <React.Fragment>
      <CalcitePanel>
        <div slot="header-content">JSON</div>
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

export default PictureMarkerSymbolJSONPanel;
