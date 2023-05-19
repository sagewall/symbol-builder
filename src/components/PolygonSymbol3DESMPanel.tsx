import type PolygonSymbol3D from "@arcgis/core/symbols/PolygonSymbol3D";
import { CalciteAction, CalcitePanel } from "@esri/calcite-components-react";
import React from "react";
import { jsonStyles } from "./lib/styles";

interface Props {
  polygonSymbol3D: PolygonSymbol3D;
}

const PolygonSymbol3DESMPanel = ({ polygonSymbol3D }: Props) => {
  const handleCopyClick = () => {
    navigator.clipboard.writeText(codeSnippet);
  };

  let colorImport = false;
  let extrudeSymbol3DLayerImport = false;
  let fillSymbol3DLayerImport = false;
  let fontImport = false;
  let iconSymbol3DLayerImport = false;
  let lineStyleMarker3DImport = false;
  let lineSymbol3DLayerImport = false;
  let objectSymbol3DLayerImport = false;
  const polygonSymbol3DImport = true;
  let textSymbol3DLayerImport = false;
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

    if (symbolLayer.type === "line") {
      colorImport = true;
      lineSymbol3DLayerImport = true;
      lineStylePattern3DImport = true;
      if (symbolLayer.marker) {
        lineStyleMarker3DImport = true;
      }
    }

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
  colorImport && (codeSnippet += `import Color from "@arcgis/core/Color.js";\n`);

  extrudeSymbol3DLayerImport &&
    (codeSnippet += `import ExtrudeSymbol3DLayer from "@arcgis/core/symbols/ExtrudeSymbol3DLayer.js";\n`);

  fillSymbol3DLayerImport &&
    (codeSnippet += `import FillSymbol3DLayer from "@arcgis/core/symbols/FillSymbol3DLayer.js";\n`);

  fontImport && (codeSnippet += `import Font from "@arcgis/core/symbols/Font.js";\n`);

  iconSymbol3DLayerImport &&
    (codeSnippet += `import IconSymbol3DLayer from "@arcgis/core/symbols/IconSymbol3DLayer.js";\n`);

  lineStyleMarker3DImport &&
    (codeSnippet += `import LineStyleMarker3D from "@arcgis/core/symbols/LineStyleMarker3D.js";\n`);

  lineSymbol3DLayerImport &&
    (codeSnippet += `import LineSymbol3DLayer from "@arcgis/core/symbols/LineSymbol3DLayer.js";\n`);

  objectSymbol3DLayerImport &&
    (codeSnippet += `import ObjectSymbol3DLayer from "@arcgis/core/symbols/ObjectSymbol3DLayer.js";\n`);

  polygonSymbol3DImport &&
    (codeSnippet += `import PolygonSymbol3D from "@arcgis/core/symbols/PolygonSymbol3D.js";\n`);

  textSymbol3DLayerImport &&
    (codeSnippet += `import TextSymbol3DLayer from "@arcgis/core/symbols/TextSymbol3DLayer.js";\n`);

  waterSymbol3DLayerImport &&
    (codeSnippet += `import WaterSymbol3DLayer from "@arcgis/core/symbols/WaterSymbol3DLayer.js";\n`);

  lineStylePattern3DImport &&
    (codeSnippet += `import LineStylePattern3D from "@arcgis/core/symbols/patterns/LineStylePattern3D.js";\n`);

  solidEdges3DImport &&
    (codeSnippet += `import SolidEdges3D from "@arcgis/core/symbols/edges/SolidEdges3D.js";\n`);

  stylePattern3DImport &&
    (codeSnippet += `import StylePattern3D from "@arcgis/core/symbols/patterns/StylePattern3D.js";\n`);

  codeSnippet += `
const polygonSymbol3D = new PolygonSymbol3D({
  symbolLayers: [
`;

  polygonSymbol3D.symbolLayers.forEach((symbolLayer) => {
    if (symbolLayer.type === "fill") {
      if (symbolLayer.material.color && symbolLayer.outline.color && symbolLayer.outline.pattern) {
        codeSnippet += `
    new FillSymbol3DLayer({
      material: {
        color: new Color([${symbolLayer.material.color.toRgba()}]),
        colorMixMode: "${symbolLayer.material.colorMixMode}",
      },
      outline: {
        color: new Color([${symbolLayer.outline.color.toRgba()}]),
        pattern: new LineStylePattern3D({
          style: "${symbolLayer.outline.pattern.style}"
        }),
        patternCap: "${symbolLayer.outline.patternCap}",
        size: ${symbolLayer.outline.size},
      },
      pattern: new StylePattern3D({
        style: "${symbolLayer.pattern.style}"
      })
    }),
    `;
      }
    }

    if (symbolLayer.type === "extrude") {
      if (symbolLayer.material.color) {
        codeSnippet += `
    new ExtrudeSymbol3DLayer({
      castShadows: ${symbolLayer.castShadows},
      edges: new SolidEdges3D({
        color: new Color([${symbolLayer.edges.color.toRgba()}]),
        extensionLength: ${symbolLayer.edges.extensionLength},
        size: ${symbolLayer.edges.size}
      }),
      material: {
        color: new Color([${symbolLayer.material.color.toRgba()}]),
      },
      size: ${symbolLayer.size}
    }),
    `;
      }
    }

    if (symbolLayer.type === "water") {
      codeSnippet += `
    new WaterSymbol3DLayer({
      color: new Color([${symbolLayer.color.toRgba()}]),
      waterbodySize: "${symbolLayer.waterbodySize}",
      waveDirection: ${symbolLayer.waveDirection},
      waveStrength: "${symbolLayer.waveStrength}"
    }),
    `;
    }

    if (symbolLayer.type === "line") {
      if (symbolLayer.material.color && symbolLayer.marker) {
        codeSnippet += `
    new LineSymbol3DLayer({
      cap: "${symbolLayer.cap}",
      join: "${symbolLayer.join}",
      marker: new LineStyleMarker3D({
        color: new Color([${symbolLayer.marker.color.toRgba()}]),
        placement: "${symbolLayer.marker.placement}",
        style: "${symbolLayer.marker.style}"
      }),
      material: {
        color: new Color([${symbolLayer.material.color.toRgba()}]),
      },
      pattern: new LineStylePattern3D({
        style: "${symbolLayer.pattern.style}"
      }),
      size: ${symbolLayer.size}
    }),
    `;
      } else if (symbolLayer.material.color) {
        codeSnippet += `
    new LineSymbol3DLayer({
      cap: "${symbolLayer.cap}",
      join: "${symbolLayer.join}",
      material: {
        color: new Color([${symbolLayer.material.color.toRgba()}]),
      },
      pattern: new LineStylePattern3D({
        style: "${symbolLayer.pattern.style}"
      }),
      size: ${symbolLayer.size}
    }),
    `;
      }
    }

    if (symbolLayer.type === "icon") {
      if (symbolLayer.material.color && symbolLayer.outline.color) {
        codeSnippet += `
    new IconSymbol3DLayer({
      anchor: "${symbolLayer.anchor}",
      anchorPosition: {
        x: ${symbolLayer.anchorPosition.x},
        y: ${symbolLayer.anchorPosition.y}
      },
      material: {
        color: new Color([${symbolLayer.material.color.toRgba()}])
      },
      outline: {
        color: new Color([${symbolLayer.outline.color.toRgba()}]),
        size: ${symbolLayer.outline.size}
      },`;

        if (!symbolLayer.resource.href) {
          codeSnippet += `
      resource: {
        primitive: "${symbolLayer.resource.primitive}",
      },`;
        }

        if (symbolLayer.resource.href) {
          codeSnippet += `
      resource: {
        href: "${symbolLayer.resource.href}",
      },`;
        }

        codeSnippet += `
      size: ${symbolLayer.size}
    }),
    `;
      }
    }

    if (symbolLayer.type === "object") {
      if (symbolLayer.material.color && symbolLayer.resource.href) {
        codeSnippet += `
    new ObjectSymbol3DLayer({
      anchor: "${symbolLayer.anchor}",
      anchorPosition: {
        x: ${symbolLayer.anchorPosition.x},
        y: ${symbolLayer.anchorPosition.y},
        z: ${symbolLayer.anchorPosition.z}
      },
      castShadows: ${symbolLayer.castShadows},
      depth: ${symbolLayer.depth},
      heading: ${symbolLayer.heading},
      height: ${symbolLayer.height},
      material: {
        color: new Color([${symbolLayer.material.color.toRgba()}])
      },
      resource: {
        href: "${symbolLayer.resource.href}"
      },
      roll: ${symbolLayer.roll},
      tilt: ${symbolLayer.tilt},
      width: ${symbolLayer.width}
    }),
    `;
      } else if (symbolLayer.material.color && symbolLayer.resource.primitive) {
        codeSnippet += `
    new ObjectSymbol3DLayer({
      anchor: "${symbolLayer.anchor}",
      anchorPosition: {
        x: ${symbolLayer.anchorPosition.x},
        y: ${symbolLayer.anchorPosition.y},
        z: ${symbolLayer.anchorPosition.z}
      },
      castShadows: ${symbolLayer.castShadows},
      depth: ${symbolLayer.depth},
      heading: ${symbolLayer.heading},
      height: ${symbolLayer.height},
      material: {
        color: new Color([${symbolLayer.material.color.toRgba()}])
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
      if (symbolLayer.background.color && symbolLayer.halo.color && symbolLayer.material.color) {
        codeSnippet += `
    new TextSymbol3DLayer({
      background: {
        color: new Color([${symbolLayer.background.color.toRgba()}]),
      },
      font: new Font({
        decoration: "${symbolLayer.font.decoration}",
        family: "${symbolLayer.font.family}",
        size: ${symbolLayer.font.size},
        style: "${symbolLayer.font.style}",
        weight: "${symbolLayer.font.weight}"
      }),
      halo: {
        color: new Color([${symbolLayer.halo.color.toRgba()}]),
        size: ${symbolLayer.halo.size}
      },
      horizontalAlignment: "${symbolLayer.horizontalAlignment}",
      lineHeight: ${symbolLayer.lineHeight},
      material: {
        color: new Color([${symbolLayer.material.color.toRgba()}]),
      },
      size: ${symbolLayer.size},
      text: "${symbolLayer.text}",
      verticalAlignment: "${symbolLayer.verticalAlignment}"
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

export default PolygonSymbol3DESMPanel;
