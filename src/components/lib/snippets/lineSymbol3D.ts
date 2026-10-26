import type LineSymbol3D from "@arcgis/core/symbols/LineSymbol3D.js";
import type LineSymbol3DLayer from "@arcgis/core/symbols/LineSymbol3DLayer.js";

function generateLinePatternSnippet(
  pattern: LineSymbol3DLayer["pattern"],
  format: "CDN" | "ESM",
): string {
  if (!pattern) {
    return "null";
  }
  const properties = JSON.stringify(pattern.toJSON());
  if (format === "CDN") {
    return properties;
  }
  const constructor =
    pattern.type === "style" ? "LineStylePattern3D" : "LineTemplatePattern3D";
  return `new ${constructor}(${properties})`;
}

export function generateLineSymbol3DCDNSnippet(
  lineSymbol3D: LineSymbol3D,
): string {
  let codeSnippet = `
const LineSymbol3D = await $arcgis.import("@arcgis/core/symbols/LineSymbol3D.js");

const lineSymbol3D = new LineSymbol3D({
  worldSized: ${lineSymbol3D.worldSized},
  symbolLayers: [
`;

  lineSymbol3D.symbolLayers.forEach((symbolLayer) => {
    if (symbolLayer.type === "line") {
      if (symbolLayer.material?.color && symbolLayer.marker) {
        codeSnippet += `
  {
    type: "line",
    cap: "${symbolLayer.cap}",
    join: "${symbolLayer.join}",
    marker: {
      type: "style",
      color: [${(symbolLayer.marker.color?.toRgba() ?? []).toString()}],
      placement: "${symbolLayer.marker.placement}",
      style: "${symbolLayer.marker.style}"
    },
    material: {
      color: [${symbolLayer.material.color.toRgba().toString()}],
    },
    pattern: ${generateLinePatternSnippet(symbolLayer.pattern, "CDN")},
    size: ${symbolLayer.size}
  },
    `;
      } else if (symbolLayer.material?.color) {
        codeSnippet += `
  {
    type: "line",
    cap: "${symbolLayer.cap}",
    join: "${symbolLayer.join}",
    material: {
      color: [${symbolLayer.material.color.toRgba().toString()}],
    },
    pattern: ${generateLinePatternSnippet(symbolLayer.pattern, "CDN")},
    size: ${symbolLayer.size}
  },
  `;
      }
    }

    if (symbolLayer.type === "path") {
      if (symbolLayer.material?.color) {
        codeSnippet += `
  {
    type: "path",
    anchor: "${symbolLayer.anchor}",
    cap: "${symbolLayer.cap}",
    castShadows: ${symbolLayer.castShadows},
    height: ${symbolLayer.height},
    join: "${symbolLayer.join}",
    material: {
      color: [${(symbolLayer.material?.color.toRgba() ?? []).toString()}],
    },
    profile: "${symbolLayer.profile}",
    profileRotation: "${symbolLayer.profileRotation}",
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

export function generateLineSymbol3DESMSnippet(
  lineSymbol3D: LineSymbol3D,
): string {
  let colorImport = false;
  const lineSymbol3DImport = true;
  let lineSymbol3DLayerImport = false;
  let pathSymbol3DLayerImport = false;
  let lineStylePattern3DImport = false;
  let lineTemplatePattern3DImport = false;
  let lineStyleMarker3DImport = false;

  lineSymbol3D.symbolLayers.forEach((symbolLayer) => {
    if (symbolLayer.type === "line") {
      colorImport = true;
      lineSymbol3DLayerImport = true;
      if (symbolLayer.pattern?.type === "style") {
        lineStylePattern3DImport = true;
      }
      if (symbolLayer.pattern?.type === "template") {
        lineTemplatePattern3DImport = true;
      }
      if (symbolLayer.material?.color && symbolLayer.marker) {
        lineStyleMarker3DImport = true;
      }
    }

    if (symbolLayer.type === "path") {
      colorImport = true;
      pathSymbol3DLayerImport = true;
    }
  });

  let codeSnippet = `\n`;

  if (colorImport) {
    codeSnippet += `import Color from "@arcgis/core/Color.js";\n`;
  }
  if (lineSymbol3DImport) {
    codeSnippet += `import LineSymbol3D from "@arcgis/core/symbols/LineSymbol3D.js";\n`;
  }
  if (lineSymbol3DLayerImport) {
    codeSnippet += `import LineSymbol3DLayer from "@arcgis/core/symbols/LineSymbol3DLayer.js";\n`;
  }
  if (pathSymbol3DLayerImport) {
    codeSnippet += `import PathSymbol3DLayer from "@arcgis/core/symbols/PathSymbol3DLayer.js";\n`;
  }
  if (lineStylePattern3DImport) {
    codeSnippet += `import LineStylePattern3D from "@arcgis/core/symbols/patterns/LineStylePattern3D.js";\n`;
  }
  if (lineTemplatePattern3DImport) {
    codeSnippet += `import LineTemplatePattern3D from "@arcgis/core/symbols/patterns/LineTemplatePattern3D.js";\n`;
  }
  if (lineStyleMarker3DImport) {
    codeSnippet += `import LineStyleMarker3D from "@arcgis/core/symbols/LineStyleMarker3D.js";\n`;
  }

  codeSnippet += `
const lineSymbol3D = new LineSymbol3D({
  worldSized: ${lineSymbol3D.worldSized},
  symbolLayers: [
`;

  lineSymbol3D.symbolLayers.forEach((symbolLayer) => {
    if (symbolLayer.type === "line") {
      if (symbolLayer.material?.color && symbolLayer.marker) {
        codeSnippet += `
    new LineSymbol3DLayer({
      cap: "${symbolLayer.cap}",
      join: "${symbolLayer.join}",
      marker: new LineStyleMarker3D({
        color: new Color([${(symbolLayer.marker.color?.toRgba() ?? []).toString()}]),
        placement: "${symbolLayer.marker.placement}",
        style: "${symbolLayer.marker.style}"
      }),
      material: {
        color: new Color([${symbolLayer.material.color.toRgba().toString()}]),
      },
      pattern: ${generateLinePatternSnippet(symbolLayer.pattern, "ESM")},
      size: ${symbolLayer.size}
    }),
    `;
      } else if (symbolLayer.material?.color) {
        codeSnippet += `
    new LineSymbol3DLayer({
      cap: "${symbolLayer.cap}",
      join: "${symbolLayer.join}",
      material: {
        color: new Color([${symbolLayer.material.color.toRgba().toString()}]),
      },
      pattern: ${generateLinePatternSnippet(symbolLayer.pattern, "ESM")},
      size: ${symbolLayer.size}
    }),
    `;
      }
    }

    if (symbolLayer.type === "path") {
      if (symbolLayer.material?.color) {
        codeSnippet += `
    new PathSymbol3DLayer({
      anchor: "${symbolLayer.anchor}",
      cap: "${symbolLayer.cap}",
      castShadows: ${symbolLayer.castShadows},
      height: ${symbolLayer.height},
      join: "${symbolLayer.join}",
      material: {
        color: new Color([${symbolLayer.material.color.toRgba().toString()}]),
      },
      profile: "${symbolLayer.profile}",
      profileRotation: "${symbolLayer.profileRotation}",
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

export function generateLineSymbol3DJSONSnippet(
  lineSymbol3D: LineSymbol3D,
): string {
  const codeSnippet = `
import LineSymbol3D from "@arcgis/core/symbols/LineSymbol3D.js";

const lineSymbol3D = LineSymbol3D.fromJSON(
${JSON.stringify(lineSymbol3D.toJSON(), null, 2)});`;

  return codeSnippet;
}
