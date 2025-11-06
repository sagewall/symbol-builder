import type MeshSymbol3D from "@arcgis/core/symbols/MeshSymbol3D";
import "@esri/calcite-components/components/calcite-action";
import "@esri/calcite-components/components/calcite-alert";
import "@esri/calcite-components/components/calcite-panel";
import { useRef } from "react";
import { jsonStyles } from "../lib/styles";

interface Props {
  meshSymbol3D: MeshSymbol3D;
}

function MeshSymbol3DESMPanel({ meshSymbol3D }: Props) {
  const alertRef = useRef<HTMLCalciteAlertElement>(null);

  const handleCopyClick = async () => {
    await navigator.clipboard.writeText(codeSnippet);
    if (alertRef.current) {
      alertRef.current.open = true;
    }
  };

  let codeSnippet = `
import Color from "@arcgis/core/Color.js";
import SolidEdges3D from "@arcgis/core/symbols/edges/SolidEdges3D.js";
import FillSymbol3DLayer from "@arcgis/core/symbols/FillSymbol3DLayer.js";
import MeshSymbol3D from "@arcgis/core/symbols/MeshSymbol3D.js";
import StylePattern3D from "@arcgis/core/symbols/patterns/StylePattern3D.js";


const meshSymbol3D = new MeshSymbol3D({
  symbolLayers: [
`;

  meshSymbol3D.symbolLayers.forEach((symbolLayer) => {
    if (symbolLayer.type === "fill") {
      if (symbolLayer.edges?.color && symbolLayer.material?.color) {
        codeSnippet += `
    new FillSymbol3DLayer({
      castShadows: ${symbolLayer.castShadows},
      edges: new SolidEdges3D({
        color: new Color([${symbolLayer.edges.color.toRgba()}]),
        extensionLength: ${symbolLayer.edges.extensionLength},
        size: ${symbolLayer.edges.size}
      }),
      material: {
        color: new Color([${symbolLayer.material.color.toRgba()}]),
        colorMixMode: "${symbolLayer.material.colorMixMode}",
      },
      pattern: new StylePattern3D({
        style: "${symbolLayer.pattern?.style}"
      })
    }),
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
    </>
  );
}

export default MeshSymbol3DESMPanel;
