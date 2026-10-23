import type LineSymbol3D from "@arcgis/core/symbols/LineSymbol3D.js";
import CodeSnippetPanel from "./CodeSnippetPanel";

interface Props {
  lineSymbol3D: LineSymbol3D;
}

function LineSymbol3DCDNPanel({ lineSymbol3D }: Props): React.ReactElement {
  let codeSnippet = `
const LineSymbol3D = await $arcgis.import("@arcgis/core/symbols/LineSymbol3D.js");

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
      color: [${(symbolLayer.marker.color?.toRgba() ?? []).toString()}],
      placement: "${symbolLayer.marker.placement}",
      style: "${symbolLayer.marker.style}"
    },
    material: {
      color: [${symbolLayer.material.color.toRgba().toString()}],
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
      color: [${symbolLayer.material.color.toRgba().toString()}],
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

  return <CodeSnippetPanel title="CDN" codeSnippet={codeSnippet} />;
}

export default LineSymbol3DCDNPanel;
