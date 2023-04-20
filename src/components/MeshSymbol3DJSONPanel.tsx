import MeshSymbol3D from "@arcgis/core/symbols/MeshSymbol3D";
import { CalciteAction, CalcitePanel } from "@esri/calcite-components-react";
import React from "react";
import { jsonStyles } from "./lib/styles";

interface Props {
  meshSymbol3D: MeshSymbol3D;
}

const MeshSymbol3DJSONPanel = ({ meshSymbol3D }: Props) => {
  const handleCopyClick = () => {
    navigator.clipboard.writeText(codeSnippet);
  };

  const codeSnippet = `
import MeshSymbol3D from "@arcgis/core/symbols/MeshSymbol3D.js";

const meshSymbol3D = MeshSymbol3D.fromJSON(
${JSON.stringify(meshSymbol3D.toJSON(), null, 2)});`;

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

export default MeshSymbol3DJSONPanel;
