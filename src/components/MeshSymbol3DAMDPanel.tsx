import type MeshSymbol3D from "@arcgis/core/symbols/MeshSymbol3D";
import { CalciteAction, CalcitePanel } from "@esri/calcite-components-react";
import React from "react";
import { jsonStyles } from "./lib/styles";

interface Props {
  meshSymbol3D: MeshSymbol3D;
}

const MeshSymbol3DAMDPanel = ({ meshSymbol3D }: Props) => {
  const handleCopyClick = () => {
    navigator.clipboard.writeText(codeSnippet);
  };

  let codeSnippet = `
  require(["esri/symbols/MeshSymbol3D"], (MeshSymbol3D) => {

  const meshSymbol3D = new MeshSymbol3D({
    symbolLayers: [
 `;

  meshSymbol3D.symbolLayers.forEach((symbolLayer) => {
    if (symbolLayer.type === "fill") {
      if (symbolLayer.edges.color && symbolLayer.material.color) {
        codeSnippet += `
      {
        type: "fill",
        castShadows: ${symbolLayer.castShadows},
        edges: {
          type: "solid",
          color: [${symbolLayer.edges.color.toRgba()}],
          extensionLength: ${symbolLayer.edges.extensionLength},
          size: ${symbolLayer.edges.size}
        },
        material: {
          color: [${symbolLayer.material.color.toRgba()}],
          colorMixMode: "${symbolLayer.material.colorMixMode}",
        },
        pattern: {
          type: "style",
          style: "${symbolLayer.pattern.style}"
        }
      },
      `;
      }
    }
  });

  codeSnippet += `
    ]
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

export default MeshSymbol3DAMDPanel;
