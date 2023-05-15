import type LineSymbol3D from "@arcgis/core/symbols/LineSymbol3D";
import { CalciteAction, CalcitePanel } from "@esri/calcite-components-react";
import React from "react";
import { jsonStyles } from "./lib/styles";

interface Props {
  lineSymbol3D: LineSymbol3D;
}

const LineSymbol3DESMPanel = ({ lineSymbol3D }: Props) => {
  const handleCopyClick = () => {
    navigator.clipboard.writeText(codeSnippet);
  };

  let codeSnippet = `
import Color from "@arcgis/core/Color.js";
import LineSymbol3D from "@arcgis/core/symbols/LineSymbol3D.js";
import LineSymbol3DLayer from "@arcgis/core/symbols/LineSymbol3DLayer.js";
import PathSymbol3DLayer from "@arcgis/core/symbols/PathSymbol3DLayer.js";
import LineStylePattern3D from "@arcgis/core/symbols/patterns/LineStylePattern3D.js";

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

export default LineSymbol3DESMPanel;