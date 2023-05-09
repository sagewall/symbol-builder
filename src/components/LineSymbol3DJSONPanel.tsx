import type LineSymbol3D from "@arcgis/core/symbols/LineSymbol3D";
import { CalciteAction, CalcitePanel } from "@esri/calcite-components-react";
import React from "react";
import { jsonStyles } from "./lib/styles";

interface Props {
  lineSymbol3D: LineSymbol3D;
}

const LineSymbol3DJSONPanel = ({ lineSymbol3D }: Props) => {
  const handleCopyClick = () => {
    navigator.clipboard.writeText(codeSnippet);
  };

  const codeSnippet = `
import LineSymbol3D from "@arcgis/core/symbols/LineSymbol3D.js";

const lineSymbol3D = LineSymbol3D.fromJSON(
${JSON.stringify(lineSymbol3D.toJSON(), null, 2)});`;

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

export default LineSymbol3DJSONPanel;
