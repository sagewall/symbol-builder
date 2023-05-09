import type PointSymbol3D from "@arcgis/core/symbols/PointSymbol3D";
import { CalciteAction, CalcitePanel } from "@esri/calcite-components-react";
import React from "react";
import { jsonStyles } from "./lib/styles";

interface Props {
  pointSymbol3D: PointSymbol3D;
}

const PointSymbol3DJSONPanel = ({ pointSymbol3D }: Props) => {
  const handleCopyClick = () => {
    navigator.clipboard.writeText(codeSnippet);
  };

  const codeSnippet = `
import PointSymbol3D from "@arcgis/core/symbols/PointSymbol3D.js";

const pointSymbol3D = PointSymbol3D.fromJSON(
${JSON.stringify(pointSymbol3D.toJSON(), null, 2)});`;

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

export default PointSymbol3DJSONPanel;
