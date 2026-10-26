import type PolygonSymbol3D from "@arcgis/core/symbols/PolygonSymbol3D.js";

export function generatePolygonSymbol3DCDNSnippet(
  polygonSymbol3D: PolygonSymbol3D,
): string {
  let codeSnippet = `
const PolygonSymbol3D = await $arcgis.import("@arcgis/core/symbols/PolygonSymbol3D.js");

const polygonSymbol3D = new PolygonSymbol3D({
  symbolLayers: [
`;

  polygonSymbol3D.symbolLayers.forEach((symbolLayer) => {
    if (symbolLayer.type === "fill") {
      if (
        symbolLayer.material?.color &&
        symbolLayer.outline?.color &&
        symbolLayer.outline?.pattern
      ) {
        codeSnippet += `
    {
      type: "fill",
      castShadows: ${symbolLayer.castShadows},
      material: {
        color: [${symbolLayer.material.color.toRgba().toString()}],
        colorMixMode: "${symbolLayer.material.colorMixMode}",
      },
      outline: {
        color: [${symbolLayer.outline.color.toRgba().toString()}],
        pattern: {
          type: "style",
          style: "${symbolLayer.outline.pattern.style}"
        },
        patternCap: "${symbolLayer.outline.patternCap}",
        size: ${symbolLayer.outline.size},
      },
      pattern: {
        type: "style",
        style: "${symbolLayer.pattern?.style}"
      }
    },
    `;
      }
    }

    if (symbolLayer.type === "extrude") {
      if (symbolLayer.material?.color) {
        codeSnippet += `
    {
      type: "extrude",
      castShadows: ${symbolLayer.castShadows},
      edges: {
        type: "solid",
        color: [${symbolLayer.edges?.color?.toRgba().toString()}],
        extensionLength: ${symbolLayer.edges?.extensionLength},
        size: ${symbolLayer.edges?.size}
      },
      material: {
        color: [${symbolLayer.material.color.toRgba().toString()}],
      },
      size: ${symbolLayer.size}
    },
    `;
      }
    }

    if (symbolLayer.type === "water") {
      codeSnippet += `
    {
      type: "water",
      color: [${symbolLayer.color?.toRgba().toString()}],
      waterbodySize: "${symbolLayer.waterbodySize}",
      waveDirection: ${symbolLayer.waveDirection},
      waveStrength: "${symbolLayer.waveStrength}"
    },
    `;
    }

    if (symbolLayer.type === "icon") {
      if (
        symbolLayer.material?.color &&
        symbolLayer.outline?.color &&
        symbolLayer.resource?.href
      ) {
        codeSnippet += `
    {
      type: "icon",
      anchor: "${symbolLayer.anchor}",
      anchorPosition: {
        x: ${symbolLayer.anchorPosition.x},
        y: ${symbolLayer.anchorPosition.y}
      },
      angle: ${symbolLayer.angle},
      material: {
        color: [${symbolLayer.material.color.toRgba().toString()}]
      },
      occludedVisibility: {
        mode: ${JSON.stringify(symbolLayer.occludedVisibility?.mode ?? "adaptive")}
      },
      outline: {
        color: [${symbolLayer.outline.color.toRgba().toString()}],
        size: ${symbolLayer.outline.size}
      },
      resource: {
        href: ${JSON.stringify(symbolLayer.resource.href)},
      },
      size: ${symbolLayer.size}
    },
    `;
      } else if (
        symbolLayer.material?.color &&
        symbolLayer.outline?.color &&
        symbolLayer.resource?.primitive
      ) {
        codeSnippet += `
    {
      type: "icon",
      anchor: "${symbolLayer.anchor}",
      anchorPosition: {
        x: ${symbolLayer.anchorPosition.x},
        y: ${symbolLayer.anchorPosition.y}
      },
      angle: ${symbolLayer.angle},
      material: {
        color: [${symbolLayer.material.color.toRgba().toString()}]
      },
      occludedVisibility: {
        mode: ${JSON.stringify(symbolLayer.occludedVisibility?.mode ?? "adaptive")}
      },
      outline: {
        color: [${symbolLayer.outline.color.toRgba().toString()}],
        size: ${symbolLayer.outline.size}
      },
      resource: {
        primitive: "${symbolLayer.resource.primitive}"
      },
      size: ${symbolLayer.size}
    },
    `;
      }
    }

    if (symbolLayer.type === "object") {
      if (symbolLayer.material?.color && symbolLayer.resource?.href) {
        codeSnippet += `
    {
      type: "object",
      anchor: "${symbolLayer.anchor}",
      anchorPosition: {
        x: ${symbolLayer.anchorPosition?.x},
        y: ${symbolLayer.anchorPosition?.y},
        z: ${symbolLayer.anchorPosition?.z}
      },
      castShadows: ${symbolLayer.castShadows},
      depth: ${symbolLayer.depth},
      heading: ${symbolLayer.heading},
      height: ${symbolLayer.height},
      material: {
        color: [${symbolLayer.material.color.toRgba().toString()}]
      },
      resource: {
        href: ${JSON.stringify(symbolLayer.resource.href)}
      },
      roll: ${symbolLayer.roll},
      tilt: ${symbolLayer.tilt},
      width: ${symbolLayer.width}
    },
    `;
      } else if (
        symbolLayer.material?.color &&
        symbolLayer.resource?.primitive
      ) {
        codeSnippet += `
    {
      type: "object",
      anchor: "${symbolLayer.anchor}",
      anchorPosition: {
        x: ${symbolLayer.anchorPosition?.x},
        y: ${symbolLayer.anchorPosition?.y},
        z: ${symbolLayer.anchorPosition?.z}
      },
      castShadows: ${symbolLayer.castShadows},
      depth: ${symbolLayer.depth},
      heading: ${symbolLayer.heading},
      height: ${symbolLayer.height},
      material: {
        color: [${symbolLayer.material.color.toRgba().toString()}]
      },
      resource: {
        primitive: "${symbolLayer.resource.primitive}",
      },
      roll: ${symbolLayer.roll},
      tilt: ${symbolLayer.tilt},
      width: ${symbolLayer.width}
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

export function generatePolygonSymbol3DESMSnippet(
  polygonSymbol3D: PolygonSymbol3D,
): string {
  let colorImport = false;
  let extrudeSymbol3DLayerImport = false;
  let fillSymbol3DLayerImport = false;
  let iconSymbol3DLayerImport = false;
  let objectSymbol3DLayerImport = false;
  const polygonSymbol3DImport = true;
  let waterSymbol3DLayerImport = false;
  let lineStylePattern3DImport = false;
  let solidEdges3DImport = false;
  let stylePattern3DImport = false;

  polygonSymbol3D.symbolLayers.forEach((symbolLayer) => {
    if (symbolLayer.type === "fill") {
      colorImport = true;
      fillSymbol3DLayerImport = true;
      lineStylePattern3DImport = true;
      stylePattern3DImport = true;
    }

    if (symbolLayer.type === "extrude") {
      colorImport = true;
      solidEdges3DImport = true;
      extrudeSymbol3DLayerImport = true;
    }

    if (symbolLayer.type === "water") {
      colorImport = true;
      waterSymbol3DLayerImport = true;
    }

    if (symbolLayer.type === "icon") {
      colorImport = true;
      iconSymbol3DLayerImport = true;
    }

    if (symbolLayer.type === "object") {
      colorImport = true;
      objectSymbol3DLayerImport = true;
    }
  });

  let codeSnippet = `\n`;
  if (colorImport) {
    codeSnippet += `import Color from "@arcgis/core/Color.js";\n`;
  }

  if (extrudeSymbol3DLayerImport) {
    codeSnippet += `import ExtrudeSymbol3DLayer from "@arcgis/core/symbols/ExtrudeSymbol3DLayer.js";\n`;
  }

  if (fillSymbol3DLayerImport) {
    codeSnippet += `import FillSymbol3DLayer from "@arcgis/core/symbols/FillSymbol3DLayer.js";\n`;
  }

  if (iconSymbol3DLayerImport) {
    codeSnippet += `import IconSymbol3DLayer from "@arcgis/core/symbols/IconSymbol3DLayer.js";\n`;
  }

  if (objectSymbol3DLayerImport) {
    codeSnippet += `import ObjectSymbol3DLayer from "@arcgis/core/symbols/ObjectSymbol3DLayer.js";\n`;
  }

  if (polygonSymbol3DImport) {
    codeSnippet += `import PolygonSymbol3D from "@arcgis/core/symbols/PolygonSymbol3D.js";\n`;
  }

  if (waterSymbol3DLayerImport) {
    codeSnippet += `import WaterSymbol3DLayer from "@arcgis/core/symbols/WaterSymbol3DLayer.js";\n`;
  }

  if (lineStylePattern3DImport) {
    codeSnippet += `import LineStylePattern3D from "@arcgis/core/symbols/patterns/LineStylePattern3D.js";\n`;
  }

  if (solidEdges3DImport) {
    codeSnippet += `import SolidEdges3D from "@arcgis/core/symbols/edges/SolidEdges3D.js";\n`;
  }

  if (stylePattern3DImport) {
    codeSnippet += `import StylePattern3D from "@arcgis/core/symbols/patterns/StylePattern3D.js";\n`;
  }

  codeSnippet += `
const polygonSymbol3D = new PolygonSymbol3D({
  symbolLayers: [
`;

  polygonSymbol3D.symbolLayers.forEach((symbolLayer) => {
    if (symbolLayer.type === "fill") {
      if (
        symbolLayer.material?.color &&
        symbolLayer.outline?.color &&
        symbolLayer.outline?.pattern
      ) {
        codeSnippet += `
    new FillSymbol3DLayer({
      castShadows: ${symbolLayer.castShadows},
      material: {
        color: new Color([${symbolLayer.material.color.toRgba().toString()}]),
        colorMixMode: "${symbolLayer.material.colorMixMode}",
      },
      outline: {
        color: new Color([${symbolLayer.outline.color.toRgba().toString()}]),
        pattern: new LineStylePattern3D({
          style: "${symbolLayer.outline.pattern.style}"
        }),
        patternCap: "${symbolLayer.outline.patternCap}",
        size: ${symbolLayer.outline.size},
      },
      pattern: new StylePattern3D({
        style: "${symbolLayer.pattern?.style}"
      })
    }),
    `;
      }
    }

    if (symbolLayer.type === "extrude") {
      if (symbolLayer.material?.color) {
        codeSnippet += `
    new ExtrudeSymbol3DLayer({
      castShadows: ${symbolLayer.castShadows},
      edges: new SolidEdges3D({
        color: new Color([${symbolLayer.edges?.color?.toRgba().toString()}]),
        extensionLength: ${symbolLayer.edges?.extensionLength},
        size: ${symbolLayer.edges?.size}
      }),
      material: {
        color: new Color([${symbolLayer.material.color.toRgba().toString()}]),
      },
      size: ${symbolLayer.size}
    }),
    `;
      }
    }

    if (symbolLayer.type === "water") {
      codeSnippet += `
    new WaterSymbol3DLayer({
      color: new Color([${symbolLayer.color?.toRgba().toString()}]),
      waterbodySize: "${symbolLayer.waterbodySize}",
      waveDirection: ${symbolLayer.waveDirection},
      waveStrength: "${symbolLayer.waveStrength}"
    }),
    `;
    }

    if (symbolLayer.type === "icon") {
      if (symbolLayer.material?.color && symbolLayer.outline?.color) {
        codeSnippet += `
    new IconSymbol3DLayer({
      anchor: "${symbolLayer.anchor}",
      anchorPosition: {
        x: ${symbolLayer.anchorPosition.x},
        y: ${symbolLayer.anchorPosition.y}
      },
      angle: ${symbolLayer.angle},
      material: {
        color: new Color([${symbolLayer.material.color.toRgba().toString()}])
      },
      occludedVisibility: {
        mode: ${JSON.stringify(symbolLayer.occludedVisibility?.mode ?? "adaptive")}
      },
      outline: {
        color: new Color([${symbolLayer.outline.color.toRgba().toString()}]),
        size: ${symbolLayer.outline.size}
      },`;

        if (!symbolLayer.resource?.href) {
          codeSnippet += `
      resource: {
        primitive: "${symbolLayer.resource?.primitive}",
      },`;
        }

        if (symbolLayer.resource?.href) {
          codeSnippet += `
      resource: {
        href: ${JSON.stringify(symbolLayer.resource?.href)},
      },`;
        }

        codeSnippet += `
      size: ${symbolLayer.size}
    }),
    `;
      }
    }

    if (symbolLayer.type === "object") {
      if (symbolLayer.material?.color && symbolLayer.resource?.href) {
        codeSnippet += `
    new ObjectSymbol3DLayer({
      anchor: "${symbolLayer.anchor}",
      anchorPosition: {
        x: ${symbolLayer.anchorPosition?.x},
        y: ${symbolLayer.anchorPosition?.y},
        z: ${symbolLayer.anchorPosition?.z}
      },
      castShadows: ${symbolLayer.castShadows},
      depth: ${symbolLayer.depth},
      heading: ${symbolLayer.heading},
      height: ${symbolLayer.height},
      material: {
        color: new Color([${symbolLayer.material.color.toRgba().toString()}])
      },
      resource: {
        href: ${JSON.stringify(symbolLayer.resource.href)}
      },
      roll: ${symbolLayer.roll},
      tilt: ${symbolLayer.tilt},
      width: ${symbolLayer.width}
    }),
    `;
      } else if (
        symbolLayer.material?.color &&
        symbolLayer.resource?.primitive
      ) {
        codeSnippet += `
    new ObjectSymbol3DLayer({
      anchor: "${symbolLayer.anchor}",
      anchorPosition: {
        x: ${symbolLayer.anchorPosition?.x},
        y: ${symbolLayer.anchorPosition?.y},
        z: ${symbolLayer.anchorPosition?.z}
      },
      castShadows: ${symbolLayer.castShadows},
      depth: ${symbolLayer.depth},
      heading: ${symbolLayer.heading},
      height: ${symbolLayer.height},
      material: {
        color: new Color([${symbolLayer.material.color.toRgba().toString()}])
      },
      resource: {
        primitive: "${symbolLayer.resource.primitive}",
      },
      roll: ${symbolLayer.roll},
      tilt: ${symbolLayer.tilt},
      width: ${symbolLayer.width}
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

export function generatePolygonSymbol3DJSONSnippet(
  polygonSymbol3D: PolygonSymbol3D,
): string {
  const codeSnippet = `
import PolygonSymbol3D from "@arcgis/core/symbols/PolygonSymbol3D.js";

const polygonSymbol3D = PolygonSymbol3D.fromJSON(
${JSON.stringify(polygonSymbol3D.toJSON(), null, 2)});`;

  return codeSnippet;
}
