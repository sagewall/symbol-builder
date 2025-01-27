import type LineSymbol3D from "@arcgis/core/symbols/LineSymbol3D";
import React, { useRef } from "react";
import { jsonStyles } from "./lib/styles";

interface Props {
  lineSymbol3D: LineSymbol3D;
}

const LineSymbol3DESMPanel = ({ lineSymbol3D }: Props) => {
  const alertRef = useRef<HTMLCalciteAlertElement>(null);

  const handleCopyClick = async () => {
    await navigator.clipboard.writeText(codeSnippet);
    if (alertRef.current) {
      alertRef.current.open = true;
    }
  };

  let colorImport = false;
  const lineSymbol3DImport = true;
  let lineSymbol3DLayerImport = false;
  let pathSymbol3DLayerImport = false;
  let lineStylePattern3DImport = false;

  lineSymbol3D.symbolLayers.forEach((symbolLayer) => {
    if (symbolLayer.type === "line") {
      colorImport = true;
      lineSymbol3DLayerImport = true;
      lineStylePattern3DImport = true;
    }

    if (symbolLayer.type === "path") {
      colorImport = true;
      pathSymbol3DLayerImport = true;
    }
  });

  let codeSnippet = `\n`;

  colorImport && (codeSnippet += `import Color from "@arcgis/core/Color.js";\n`);
  lineSymbol3DImport &&
    (codeSnippet += `import LineSymbol3D from "@arcgis/core/symbols/LineSymbol3D.js";\n`);
  lineSymbol3DLayerImport &&
    (codeSnippet += `import LineSymbol3DLayer from "@arcgis/core/symbols/LineSymbol3DLayer.js";\n`);
  pathSymbol3DLayerImport &&
    (codeSnippet += `import PathSymbol3DLayer from "@arcgis/core/symbols/PathSymbol3DLayer.js";\n`);
  lineStylePattern3DImport &&
    (codeSnippet += `import LineStylePattern3D from "@arcgis/core/symbols/patterns/LineStylePattern3D.js";\n`);

  codeSnippet += `
const lineSymbol3D = new LineSymbol3D({
  symbolLayers: [
`;

  lineSymbol3D.symbolLayers.forEach((symbolLayer) => {
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

    if (symbolLayer.type === "path") {
      if (symbolLayer.material.color) {
        codeSnippet += `
    new PathSymbol3DLayer({
      anchor: "${symbolLayer.anchor}",
      cap: "${symbolLayer.cap}",
      castShadows: ${symbolLayer.castShadows},
      height: ${symbolLayer.height},
      join: "${symbolLayer.join}",
      material: {
        color: new Color([${symbolLayer.material.color.toRgba()}]),
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

export default LineSymbol3DESMPanel;
