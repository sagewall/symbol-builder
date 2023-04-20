import MeshSymbol3D from "@arcgis/core/symbols/MeshSymbol3D";
import { CalciteAction, CalcitePanel } from "@esri/calcite-components-react";
import React from "react";
import { jsonStyles } from "./lib/styles";

interface Props {
  meshSymbol3D: MeshSymbol3D;
}

const MeshSymbol3DESMPanel = ({ meshSymbol3D }: Props) => {
  const handleCopyClick = () => {
    navigator.clipboard.writeText(codeSnippet);
  };

  let codeSnippet = `
import Color from "@arcgis/core/Color.js";
import Edges3D from "@arcgis/core/symbols/edges/Edges3D.js";
import FillSymbol3DLayer from "@arcgis/core/symbols/FillSymbol3DLayer.js";
import MeshSymbol3D from "@arcgis/core/symbols/MeshSymbol3D.js";
import StylePattern3D from "@arcgis/core/symbols/patterns/StylePattern3D.js";


const meshSymbol3D = new MeshSymbol3D({
  symbolLayers: [
`;

  meshSymbol3D.symbolLayers.forEach((symbolLayer) => {
    if (symbolLayer.type === "fill") {
      if (symbolLayer.edges.color && symbolLayer.material.color) {
        codeSnippet += `
    new FillSymbol3DLayer({
      castShadows: ${symbolLayer.castShadows},
      edges: new Edges3D({
        color: new Color([${symbolLayer.edges.color.toRgba()}]),
        extensionLength: ${symbolLayer.edges.extensionLength},
        size: ${symbolLayer.edges.size}
      }),
      material: {
        color: new Color([${symbolLayer.material.color.toRgba()}]),
        colorMixMode: "${symbolLayer.material.colorMixMode}",
      },
      pattern: new StylePattern3D({
        style: "${symbolLayer.pattern.style}"
      })
    }),
    `;
      }
    }
  });

  codeSnippet += `
  ]
});`;

  return (
    <React.Fragment>
      <CalcitePanel>
        <div slot="header-content">ESM / TypeScript</div>
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

export default MeshSymbol3DESMPanel;
