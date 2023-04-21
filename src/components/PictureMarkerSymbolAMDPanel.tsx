import PictureMarkerSymbol from "@arcgis/core/symbols/PictureMarkerSymbol";
import { CalciteAction, CalcitePanel } from "@esri/calcite-components-react";
import React from "react";
import { jsonStyles } from "./lib/styles";

interface Props {
  pictureMarkerSymbol: PictureMarkerSymbol;
}

const PictureMarkerSymbolAMDPanel = ({ pictureMarkerSymbol }: Props) => {
  const handleCopyClick = () => {
    navigator.clipboard.writeText(codeSnippet);
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
    </React.Fragment>
  );
};

export default PictureMarkerSymbolAMDPanel;
