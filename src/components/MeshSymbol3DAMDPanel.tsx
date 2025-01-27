import type MeshSymbol3D from "@arcgis/core/symbols/MeshSymbol3D";
import React, { useRef } from "react";
import { jsonStyles } from "./lib/styles";

interface Props {
  meshSymbol3D: MeshSymbol3D;
}

const MeshSymbol3DAMDPanel = ({ meshSymbol3D }: Props) => {
  const alertRef = useRef<HTMLCalciteAlertElement>(null);

  const handleCopyClick = async () => {
    await navigator.clipboard.writeText(codeSnippet);
    if (alertRef.current) {
      alertRef.current.open = true;
    }
  };

  let codeSnippet = `
require(["esri/symbols/MeshSymbol3D"], (MeshSymbol3D) => {

  const meshSymbol3D = new MeshSymbol3D({
    symbolLayers: [
 `;

  meshSymbol3D.symbolLayers.forEach((symbolLayer) => {
    if (symbolLayer.type === "fill") {
      if (symbolLayer.edges.color && symbolLayer.material.color) {
        codeSnippet += `
      {
        type: "fill",
        castShadows: ${symbolLayer.castShadows},
        edges: {
          type: "solid",
          color: [${symbolLayer.edges.color.toRgba()}],
          extensionLength: ${symbolLayer.edges.extensionLength},
          size: ${symbolLayer.edges.size}
        },
        material: {
          color: [${symbolLayer.material.color.toRgba()}],
          colorMixMode: "${symbolLayer.material.colorMixMode}",
        },
        pattern: {
          type: "style",
          style: "${symbolLayer.pattern.style}"
        }
      },
      `;
      }
    }
  });

  codeSnippet += `
    ]
  });

});`;

  return (
    <React.Fragment>
      <calcite-panel>
        <div slot="header-content">AMD / Autocasting</div>
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

export default MeshSymbol3DAMDPanel;
