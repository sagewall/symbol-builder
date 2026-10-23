import type MeshSymbol3D from "@arcgis/core/symbols/MeshSymbol3D.js";

export function generateMeshSymbol3DCDNSnippet(meshSymbol3D: MeshSymbol3D): string {
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

  return codeSnippet;
}

export function generateMeshSymbol3DESMSnippet(meshSymbol3D: MeshSymbol3D): string {
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

  return codeSnippet;
}

export function generateMeshSymbol3DJSONSnippet(meshSymbol3D: MeshSymbol3D): string {
  const codeSnippet = `
import MeshSymbol3D from "@arcgis/core/symbols/MeshSymbol3D.js";

const meshSymbol3D = MeshSymbol3D.fromJSON(
${JSON.stringify(meshSymbol3D.toJSON(), null, 2)});`;

  return codeSnippet;
}
