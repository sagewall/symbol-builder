import type PointSymbol3D from "@arcgis/core/symbols/PointSymbol3D.js";
import { stringifyConstructorProperties } from "./constructorProperties";

export function generatePointSymbol3DCDNSnippet(
  pointSymbol3D: PointSymbol3D,
): string {
  let codeSnippet = `
const PointSymbol3D = await $arcgis.import("@arcgis/core/symbols/PointSymbol3D.js");

const pointSymbol3D = new PointSymbol3D({
  callout: ${stringifyConstructorProperties(pointSymbol3D.callout?.toJSON() ?? null)},
  symbolLayers: [
 `;

  pointSymbol3D.symbolLayers.forEach((symbolLayer) => {
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
      emissive: ${stringifyConstructorProperties(symbolLayer.material?.emissive?.toJSON() ?? null)},
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
        emissive: ${stringifyConstructorProperties(symbolLayer.material?.emissive?.toJSON() ?? null)},
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
      anchor: ${JSON.stringify(symbolLayer.anchor)},
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
        emissive: ${stringifyConstructorProperties(symbolLayer.material?.emissive?.toJSON() ?? null)},
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
      anchor: ${JSON.stringify(symbolLayer.anchor)},
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
        emissive: ${stringifyConstructorProperties(symbolLayer.material?.emissive?.toJSON() ?? null)},
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

    if (symbolLayer.type === "text") {
      if (symbolLayer.material?.color) {
        codeSnippet += `
    {
      type: "text",
      background: ${stringifyConstructorProperties(symbolLayer.background?.toJSON() ?? null)},
      font: {
        decoration: "${symbolLayer.font?.decoration}",
        family: ${JSON.stringify(symbolLayer.font?.family)},
        size: ${symbolLayer.font?.size},
        style: "${symbolLayer.font?.style}",
        weight: "${symbolLayer.font?.weight}"
      },
      halo: ${stringifyConstructorProperties(symbolLayer.halo?.toJSON() ?? null)},
      horizontalAlignment: "${symbolLayer.horizontalAlignment}",
      lineHeight: ${symbolLayer.lineHeight},
      material: {
        emissive: ${stringifyConstructorProperties(symbolLayer.material?.emissive?.toJSON() ?? null)},
        color: [${symbolLayer.material.color.toRgba().toString()}],
      },
      occludedVisibility: {
        mode: ${JSON.stringify(symbolLayer.occludedVisibility?.mode ?? "adaptive")}
      },
      size: ${symbolLayer.size},
      text: ${JSON.stringify(symbolLayer.text)},
      verticalAlignment: "${symbolLayer.verticalAlignment}"
    },
    `;
      }
    }
  });

  codeSnippet += `
  ],
  verticalOffset: ${JSON.stringify(pointSymbol3D.verticalOffset?.toJSON() ?? null)}
});`;

  return codeSnippet;
}

export function generatePointSymbol3DESMSnippet(
  pointSymbol3D: PointSymbol3D,
): string {
  let colorImport = true;
  let fontImport = false;
  let iconSymbol3DLayerImport = false;
  let objectSymbol3DLayerImport = false;
  const pointSymbol3DImport = true;
  let textSymbol3DLayerImport = false;
  const lineCallout3DImport = true;
  const symbol3DVerticalOffsetImport = true;

  pointSymbol3D.symbolLayers.forEach((symbolLayer) => {
    if (symbolLayer.type === "icon") {
      colorImport = true;
      iconSymbol3DLayerImport = true;
    }

    if (symbolLayer.type === "object") {
      colorImport = true;
      objectSymbol3DLayerImport = true;
    }

    if (symbolLayer.type === "text") {
      colorImport = true;
      fontImport = true;
      textSymbol3DLayerImport = true;
    }
  });

  let codeSnippet = `\n`;
  if (colorImport) {
    codeSnippet += `import Color from "@arcgis/core/Color.js";\n`;
  }
  if (fontImport) {
    codeSnippet += `import Font from "@arcgis/core/symbols/Font.js";\n`;
  }
  if (iconSymbol3DLayerImport) {
    codeSnippet += `import IconSymbol3DLayer from "@arcgis/core/symbols/IconSymbol3DLayer.js";\n`;
  }
  if (objectSymbol3DLayerImport) {
    codeSnippet += `import ObjectSymbol3DLayer from "@arcgis/core/symbols/ObjectSymbol3DLayer.js";\n`;
  }
  if (pointSymbol3DImport) {
    codeSnippet += `import PointSymbol3D from "@arcgis/core/symbols/PointSymbol3D.js";\n`;
  }
  if (textSymbol3DLayerImport) {
    codeSnippet += `import TextSymbol3DLayer from "@arcgis/core/symbols/TextSymbol3DLayer.js";\n`;
  }
  if (lineCallout3DImport) {
    codeSnippet += `import LineCallout3D from "@arcgis/core/symbols/callouts/LineCallout3D.js";\n`;
  }
  if (symbol3DVerticalOffsetImport) {
    codeSnippet += `import Symbol3DVerticalOffset from "@arcgis/core/symbols/support/Symbol3DVerticalOffset.js";\n`;
  }

  codeSnippet += `
const pointSymbol3D = new PointSymbol3D({
  callout: ${pointSymbol3D.callout ? `new LineCallout3D(${stringifyConstructorProperties(pointSymbol3D.callout.toJSON())})` : "null"},
  symbolLayers: [
`;

  pointSymbol3D.symbolLayers.forEach((symbolLayer) => {
    if (symbolLayer.type === "icon") {
      if (
        symbolLayer.material?.color &&
        symbolLayer.outline?.color &&
        symbolLayer.resource?.href
      ) {
        codeSnippet += `
    new IconSymbol3DLayer({
      anchor: "${symbolLayer.anchor}",
      anchorPosition: {
        x: ${symbolLayer.anchorPosition.x},
        y: ${symbolLayer.anchorPosition.y}
      },
      angle: ${symbolLayer.angle},
      material: {
        emissive: ${stringifyConstructorProperties(symbolLayer.material?.emissive?.toJSON() ?? null)},
        color: new Color([${symbolLayer.material.color.toRgba().toString()}])
      },
      occludedVisibility: {
        mode: ${JSON.stringify(symbolLayer.occludedVisibility?.mode ?? "adaptive")}
      },
      outline: {
        color: new Color([${symbolLayer.outline.color.toRgba().toString()}]),
        size: ${symbolLayer.outline.size}
      },
      resource: {
        href: ${JSON.stringify(symbolLayer.resource.href)},
      },
      size: ${symbolLayer.size}
    }),
    `;
      } else if (
        symbolLayer.material?.color &&
        symbolLayer.outline?.color &&
        symbolLayer.resource?.primitive
      ) {
        codeSnippet += `
    new IconSymbol3DLayer({
      anchor: "${symbolLayer.anchor}",
      anchorPosition: {
        x: ${symbolLayer.anchorPosition.x},
        y: ${symbolLayer.anchorPosition.y}
      },
      angle: ${symbolLayer.angle},
      material: {
        emissive: ${stringifyConstructorProperties(symbolLayer.material?.emissive?.toJSON() ?? null)},
        color: new Color([${symbolLayer.material.color.toRgba().toString()}])
      },
      occludedVisibility: {
        mode: ${JSON.stringify(symbolLayer.occludedVisibility?.mode ?? "adaptive")}
      },
      outline: {
        color: new Color([${symbolLayer.outline.color.toRgba().toString()}]),
        size: ${symbolLayer.outline.size}
      },
      resource: {
        primitive: "${symbolLayer.resource.primitive}",
      },
      size: ${symbolLayer.size}
    }),
    `;
      }
    }

    if (symbolLayer.type === "object") {
      if (symbolLayer.material?.color && symbolLayer.resource?.href) {
        codeSnippet += `
    new ObjectSymbol3DLayer({
      anchor: ${JSON.stringify(symbolLayer.anchor)},
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
        emissive: ${stringifyConstructorProperties(symbolLayer.material?.emissive?.toJSON() ?? null)},
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
      anchor: ${JSON.stringify(symbolLayer.anchor)},
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
        emissive: ${stringifyConstructorProperties(symbolLayer.material?.emissive?.toJSON() ?? null)},
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

    if (symbolLayer.type === "text") {
      if (symbolLayer.material?.color) {
        codeSnippet += `
    new TextSymbol3DLayer({
      background: ${stringifyConstructorProperties(symbolLayer.background?.toJSON() ?? null)},
      font: new Font({
        decoration: "${symbolLayer.font?.decoration}",
        family: ${JSON.stringify(symbolLayer.font?.family)},
        size: ${symbolLayer.font?.size},
        style: "${symbolLayer.font?.style}",
        weight: "${symbolLayer.font?.weight}"
      }),
      halo: ${stringifyConstructorProperties(symbolLayer.halo?.toJSON() ?? null)},
      horizontalAlignment: "${symbolLayer.horizontalAlignment}",
      lineHeight: ${symbolLayer.lineHeight},
      material: {
        emissive: ${stringifyConstructorProperties(symbolLayer.material?.emissive?.toJSON() ?? null)},
        color: new Color([${symbolLayer.material.color.toRgba().toString()}]),
      },
      occludedVisibility: {
        mode: ${JSON.stringify(symbolLayer.occludedVisibility?.mode ?? "adaptive")}
      },
      size: ${symbolLayer.size},
      text: ${JSON.stringify(symbolLayer.text)},
      verticalAlignment: "${symbolLayer.verticalAlignment}"
    }),
    `;
      }
    }
  });

  codeSnippet += `
  ],
  verticalOffset: ${pointSymbol3D.verticalOffset ? `new Symbol3DVerticalOffset(${JSON.stringify(pointSymbol3D.verticalOffset.toJSON())})` : "null"}
});`;

  return codeSnippet;
}

export function generatePointSymbol3DJSONSnippet(
  pointSymbol3D: PointSymbol3D,
): string {
  const codeSnippet = `
import PointSymbol3D from "@arcgis/core/symbols/PointSymbol3D.js";

const pointSymbol3D = PointSymbol3D.fromJSON(
${JSON.stringify(pointSymbol3D.toJSON(), null, 2)});`;

  return codeSnippet;
}
