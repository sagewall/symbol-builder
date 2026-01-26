import type MeshSymbol3D from "@arcgis/core/symbols/MeshSymbol3D.js";
import "@esri/calcite-components/components/calcite-action";
import "@esri/calcite-components/components/calcite-alert";
import "@esri/calcite-components/components/calcite-panel";
import { useRef } from "react";
import { jsonStyles } from "./lib/styles";

interface Props {
  meshSymbol3D: MeshSymbol3D;
}

function MeshSymbol3DCDNPanel({ meshSymbol3D }: Props): React.ReactElement {
  const alertRef = useRef<HTMLCalciteAlertElement>(null);

  const handleCopyClick = async (): Promise<void> => {
    await navigator.clipboard.writeText(codeSnippet);
    if (alertRef.current) {
      alertRef.current.open = true;
    }
  };

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

  return (
    <>
      <calcite-panel>
        <div slot="header-content">CDN</div>
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
    </>
  );
}

export default MeshSymbol3DCDNPanel;
