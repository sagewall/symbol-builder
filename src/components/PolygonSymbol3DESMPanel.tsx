import type PolygonSymbol3D from "@arcgis/core/symbols/PolygonSymbol3D";
import React, { useRef } from "react";
import { jsonStyles } from "./lib/styles";

interface Props {
  polygonSymbol3D: PolygonSymbol3D;
}

const PolygonSymbol3DESMPanel = ({ polygonSymbol3D }: Props) => {
  const alertRef = useRef<HTMLCalciteAlertElement>(null);

  const handleCopyClick = async () => {
    await navigator.clipboard.writeText(codeSnippet);
    if (alertRef.current) {
      alertRef.current.open = true;
    }
  };

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
  colorImport && (codeSnippet += `import Color from "@arcgis/core/Color.js";\n`);

  extrudeSymbol3DLayerImport &&
    (codeSnippet += `import ExtrudeSymbol3DLayer from "@arcgis/core/symbols/ExtrudeSymbol3DLayer.js";\n`);

  fillSymbol3DLayerImport &&
    (codeSnippet += `import FillSymbol3DLayer from "@arcgis/core/symbols/FillSymbol3DLayer.js";\n`);

  iconSymbol3DLayerImport &&
    (codeSnippet += `import IconSymbol3DLayer from "@arcgis/core/symbols/IconSymbol3DLayer.js";\n`);

  objectSymbol3DLayerImport &&
    (codeSnippet += `import ObjectSymbol3DLayer from "@arcgis/core/symbols/ObjectSymbol3DLayer.js";\n`);

  polygonSymbol3DImport &&
    (codeSnippet += `import PolygonSymbol3D from "@arcgis/core/symbols/PolygonSymbol3D.js";\n`);

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
  });

  codeSnippet += `
  ]
});`;

  return (
    <React.Fragment>
      <calcite-panel>
        <div slot="header-content">ESM / TypeScript</div>
        <calcite-action
          icon="copy-to-clipboard"
          label="Copy code to clipboard"
          text="Copy Snippet"
          textEnabled
          slot="header-actions-end"
          onClick={handleCopyClick}
        ></calcite-action>

        <pre style={jsonStyles}>{codeSnippet}</pre>
      </calcite-panel>
      <calcite-alert
        autoClose
        autoCloseDuration="fast"
        icon="copy-to-clipboard"
        kind="success"
        label="Copied to clipboard"
        ref={alertRef}
      >
        <div slot="message">Copied to clipboard</div>
      </calcite-alert>
    </React.Fragment>
  );
};

export default PolygonSymbol3DESMPanel;
