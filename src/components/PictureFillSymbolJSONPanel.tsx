import PictureFillSymbol from "@arcgis/core/symbols/PictureFillSymbol";
import { CalciteAction, CalcitePanel } from "@esri/calcite-components-react";
import React from "react";
import { jsonStyles } from "./lib/styles";

interface Props {
  pictureFillSymbol: PictureFillSymbol;
}

const PictureFillSymbolJSONPanel = ({ pictureFillSymbol }: Props) => {
  const handleCopyClick = () => {
    navigator.clipboard.writeText(codeSnippet);
  };

  const codeSnippet = `
import PictureFillSymbol from "@arcgis/core/symbols/PictureFillSymbol.js";

const textSymbolSymbol = PictureFillSymbol.fromJSON(
${JSON.stringify(pictureFillSymbol.toJSON(), null, 2)});`;

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

export default PictureFillSymbolJSONPanel;
