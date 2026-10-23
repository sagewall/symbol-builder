import type MeshSymbol3D from "@arcgis/core/symbols/MeshSymbol3D.js";
import CodeSnippetPanel from "./CodeSnippetPanel";

interface Props {
  meshSymbol3D: MeshSymbol3D;
}

function MeshSymbol3DESMPanel({ meshSymbol3D }: Props): React.ReactElement {
  let codeSnippet = `
import Color from "@arcgis/core/Color.js";
import SolidEdges3D from "@arcgis/core/symbols/edges/SolidEdges3D.js";
import FillSymbol3DLayer from "@arcgis/core/symbols/FillSymbol3DLayer.js";
import MeshSymbol3D from "@arcgis/core/symbols/MeshSymbol3D.js";
import StylePattern3D from "@arcgis/core/symbols/patterns/StylePattern3D.js";


const meshSymbol3D = new MeshSymbol3D({
  symbolLayers: [
`;

  meshSymbol3D.symbolLayers.forEach((symbolLayer) => {
    if (symbolLayer.type === "fill") {
      if (symbolLayer.edges?.color && symbolLayer.material?.color) {
        codeSnippet += `
    new FillSymbol3DLayer({
      castShadows: ${symbolLayer.castShadows},
      edges: new SolidEdges3D({
        color: new Color([${symbolLayer.edges.color.toRgba().toString()}]),
        extensionLength: ${symbolLayer.edges.extensionLength},
        size: ${symbolLayer.edges.size}
      }),
      material: {
        color: new Color([${symbolLayer.material.color.toRgba().toString()}]),
        colorMixMode: "${symbolLayer.material.colorMixMode}",
      },
      pattern: new StylePattern3D({
        style: "${symbolLayer.pattern?.style}"
      })
    }),
    `;
      }
    }
  });

  codeSnippet += `
  ]
});`;

  return <CodeSnippetPanel title="ESM / TypeScript" codeSnippet={codeSnippet} />;
}

export default MeshSymbol3DESMPanel;
