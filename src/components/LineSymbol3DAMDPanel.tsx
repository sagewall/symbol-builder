import type LineSymbol3D from "@arcgis/core/symbols/LineSymbol3D";
import React, { useRef } from "react";
import { jsonStyles } from "./lib/styles";

interface Props {
  lineSymbol3D: LineSymbol3D;
}

const LineSymbol3DAMDPanel = ({ lineSymbol3D }: Props) => {
  const alertRef = useRef<HTMLCalciteAlertElement>(null);

  const handleCopyClick = async () => {
    await navigator.clipboard.writeText(codeSnippet);
    if (alertRef.current) {
      alertRef.current.open = true;
    }
  };

  let codeSnippet = `
require(["esri/symbols/LineSymbol3D"], (LineSymbol3D) => {

  const lineSymbol3D = new LineSymbol3D({
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
          color: [${symbolLayer.marker.color?.toRgba()}],
          placement: "${symbolLayer.marker.placement}",
          style: "${symbolLayer.marker.style}"
        },
        material: {
          color: [${symbolLayer.material.color.toRgba()}],
        },
        pattern: {
          type: "style",
          style: "${symbolLayer.pattern?.style}"
        },
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
          color: [${symbolLayer.material.color.toRgba()}],
        },
        pattern: {
          type: "style",
          style: "${symbolLayer.pattern?.style}"
        },
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
        castShadows: "${symbolLayer.castShadows}",
        height: ${symbolLayer.height},
        join: "${symbolLayer.join}",
        material: {
          color: [${symbolLayer.material?.color.toRgba()}],
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

export default LineSymbol3DAMDPanel;
