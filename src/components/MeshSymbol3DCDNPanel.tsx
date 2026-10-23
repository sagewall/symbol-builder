import type MeshSymbol3D from "@arcgis/core/symbols/MeshSymbol3D.js";
import CodeSnippetPanel from "./CodeSnippetPanel";

interface Props {
  meshSymbol3D: MeshSymbol3D;
}

function MeshSymbol3DCDNPanel({ meshSymbol3D }: Props): React.ReactElement {
  let codeSnippet = `
const MeshSymbol3D = await $arcgis.import("@arcgis/core/symbols/MeshSymbol3D.js");

const meshSymbol3D = new MeshSymbol3D({
  symbolLayers: [
 `;

  meshSymbol3D.symbolLayers.forEach((symbolLayer) => {
    if (symbolLayer.type === "fill") {
      if (symbolLayer.edges?.color && symbolLayer.material?.color) {
        codeSnippet += `
    {
      type: "fill",
      castShadows: ${symbolLayer.castShadows},
      edges: {
        type: "solid",
        color: [${symbolLayer.edges.color.toRgba().toString()}],
        extensionLength: ${symbolLayer.edges.extensionLength},
        size: ${symbolLayer.edges.size}
      },
      material: {
        color: [${symbolLayer.material.color.toRgba().toString()}],
        colorMixMode: "${symbolLayer.material.colorMixMode}",
      },
      pattern: {
        type: "style",
        style: "${symbolLayer.pattern?.style}"
      }
    },
    `;
      }
    }
  });

  codeSnippet += `
  ]
});`;

  return <CodeSnippetPanel title="CDN" codeSnippet={codeSnippet} />;
}

export default MeshSymbol3DCDNPanel;
