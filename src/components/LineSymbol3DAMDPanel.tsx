import LineSymbol3D from "@arcgis/core/symbols/LineSymbol3D";
import { CalciteAction, CalcitePanel } from "@esri/calcite-components-react";
import React from "react";
import { jsonStyles } from "./lib/styles";

interface Props {
  lineSymbol3D: LineSymbol3D;
}

const LineSymbol3DAMDPanel = ({ lineSymbol3D }: Props) => {
  const handleCopyClick = () => {
    navigator.clipboard.writeText(codeSnippet);
  };

  let codeSnippet = `
  require(["esri/symbols/LineSymbol3D"], (LineSymbol3D) => {

  const lineSymbol3D = new LineSymbol3D({
    symbolLayers: [
 `;

  lineSymbol3D.symbolLayers.forEach((symbolLayer) => {
    if (symbolLayer.type === "line") {
      if (symbolLayer.material.color && symbolLayer.marker) {
        codeSnippet += `
      {
        type: "line",
        cap: "${symbolLayer.cap}",
        join: "${symbolLayer.join}",
        marker: {
          type: "style",
          color: [${symbolLayer.marker.color.toRgba()}],
          placement: "${symbolLayer.marker.placement}",
          style: "${symbolLayer.marker.style}"
        },
        material: {
          color: [${symbolLayer.material.color.toRgba()}],
        },
        pattern: {
          type: "style",
          style: "${symbolLayer.pattern.style}"
        },
        size: ${symbolLayer.size}
      },
      `;
      } else if (symbolLayer.material.color) {
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
          style: "${symbolLayer.pattern.style}"
        },
        size: ${symbolLayer.size}
      },
      `;
      }
    }

    if (symbolLayer.type === "path") {
      if (symbolLayer.material.color) {
        codeSnippet += `
      {
        type: "path",
        anchor: "${symbolLayer.anchor}",
        cap: "${symbolLayer.cap}",
        castShadows: "${symbolLayer.castShadows}",
        height: ${symbolLayer.height},
        join: "${symbolLayer.join}",
        material: {
          color: [${symbolLayer.material.color.toRgba()}],
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
      <CalcitePanel>
        <div slot="header-content">AMD / Autocasting</div>
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

export default LineSymbol3DAMDPanel;
