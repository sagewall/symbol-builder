import type MeshSymbol3D from "@arcgis/core/symbols/MeshSymbol3D.js";
import { stringifyConstructorProperties } from "./constructorProperties";

export function generateMeshSymbol3DCDNSnippet(
  meshSymbol3D: MeshSymbol3D,
): string {
  let codeSnippet = `
const MeshSymbol3D = await $arcgis.import("@arcgis/core/symbols/MeshSymbol3D.js");

const meshSymbol3D = new MeshSymbol3D({
  symbolLayers: [
 `;

  meshSymbol3D.symbolLayers.forEach((symbolLayer) => {
    if (symbolLayer.type === "fill") {
      if (symbolLayer.material?.color) {
        codeSnippet += `
    {
      type: "fill",
      castShadows: ${symbolLayer.castShadows},
      edges: ${stringifyConstructorProperties(symbolLayer.edges?.toJSON() ?? null)},
      material: {
        emissive: ${stringifyConstructorProperties(symbolLayer.material?.emissive?.toJSON() ?? null)},
        color: [${symbolLayer.material.color.toRgba().toString()}],
        colorMixMode: ${JSON.stringify(symbolLayer.material.colorMixMode)},
      },
      pattern: ${JSON.stringify(symbolLayer.pattern?.toJSON() ?? null)}
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

export function generateMeshSymbol3DESMSnippet(
  meshSymbol3D: MeshSymbol3D,
): string {
  let codeSnippet = `
import Color from "@arcgis/core/Color.js";
import FillSymbol3DLayer from "@arcgis/core/symbols/FillSymbol3DLayer.js";
import MeshSymbol3D from "@arcgis/core/symbols/MeshSymbol3D.js";
import StylePattern3D from "@arcgis/core/symbols/patterns/StylePattern3D.js";


const meshSymbol3D = new MeshSymbol3D({
  symbolLayers: [
`;

  meshSymbol3D.symbolLayers.forEach((symbolLayer) => {
    if (symbolLayer.type === "fill") {
      if (symbolLayer.material?.color) {
        codeSnippet += `
    new FillSymbol3DLayer({
      castShadows: ${symbolLayer.castShadows},
      edges: ${stringifyConstructorProperties(symbolLayer.edges?.toJSON() ?? null)},
      material: {
        emissive: ${stringifyConstructorProperties(symbolLayer.material?.emissive?.toJSON() ?? null)},
        color: new Color([${symbolLayer.material.color.toRgba().toString()}]),
        colorMixMode: ${JSON.stringify(symbolLayer.material.colorMixMode)},
      },
      pattern: ${symbolLayer.pattern ? `new StylePattern3D(${JSON.stringify({ style: symbolLayer.pattern.style })})` : "null"}
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

export function generateMeshSymbol3DJSONSnippet(
  meshSymbol3D: MeshSymbol3D,
): string {
  const codeSnippet = `
import MeshSymbol3D from "@arcgis/core/symbols/MeshSymbol3D.js";

const meshSymbol3D = MeshSymbol3D.fromJSON(
${JSON.stringify(meshSymbol3D.toJSON(), null, 2)});`;

  return codeSnippet;
}
