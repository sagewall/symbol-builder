import type PointSymbol3D from "@arcgis/core/symbols/PointSymbol3D.js";
import CodeSnippetPanel from "./CodeSnippetPanel";

interface Props {
  pointSymbol3D: PointSymbol3D;
}

function PointSymbol3DCDNPanel({ pointSymbol3D }: Props): React.ReactElement {
  let codeSnippet = `
const PointSymbol3D = await $arcgis.import("@arcgis/core/symbols/PointSymbol3D.js");

const pointSymbol3D = new PointSymbol3D({
  callout: {
    type: "line",
    color: [${(pointSymbol3D.callout?.color?.toRgba() ?? []).toString()}],
    size: ${pointSymbol3D.callout?.size}
  },
  symbolLayers: [
 `;

  pointSymbol3D.symbolLayers.forEach((symbolLayer) => {
    if (symbolLayer.type === "icon") {
      if (
        symbolLayer.material?.color &&
        symbolLayer.outline?.color &&
        symbolLayer.resource?.href
      ) {
        codeSnippet += `
  {
    type: "icon",
    anchor: "${symbolLayer.anchor}",
    anchorPosition: {
      x: ${symbolLayer.anchorPosition.x},
      y: ${symbolLayer.anchorPosition.y}
    },
    material: {
      color: [${symbolLayer.material.color.toRgba().toString()}]
    },
    outline: {
      color: [${symbolLayer.outline.color.toRgba().toString()}],
      size: ${symbolLayer.outline.size}
    },
    resource: {
      href: ${JSON.stringify(symbolLayer.resource.href)},
    },
    size: ${symbolLayer.size}
  },
  `;
      } else if (
        symbolLayer.material?.color &&
        symbolLayer.outline?.color &&
        symbolLayer.resource?.primitive
      ) {
        codeSnippet += `
    {
      type: "icon",
      anchor: "${symbolLayer.anchor}",
      anchorPosition: {
        x: ${symbolLayer.anchorPosition.x},
        y: ${symbolLayer.anchorPosition.y}
      },
      angle: ${symbolLayer.angle},
      material: {
        color: [${symbolLayer.material.color.toRgba().toString()}]
      },
      outline: {
        color: [${symbolLayer.outline.color.toRgba().toString()}],
        size: ${symbolLayer.outline.size}
      },
      resource: {
        primitive: "${symbolLayer.resource.primitive}"
      },
      size: ${symbolLayer.size}
    },
    `;
      }
    }

    if (symbolLayer.type === "object") {
      if (symbolLayer.material?.color && symbolLayer.resource?.href) {
        codeSnippet += `
    {
      type: "object",
      anchor: "${symbolLayer.anchor}",
      anchorPosition: {
        x: ${symbolLayer.anchorPosition?.x},
        y: ${symbolLayer.anchorPosition?.y},
        z: ${symbolLayer.anchorPosition?.z}
      },
      castShadows: ${symbolLayer.castShadows},
      depth: ${symbolLayer.depth},
      heading: ${symbolLayer.heading},
      height: ${symbolLayer.height},
      material: {
        color: [${symbolLayer.material.color.toRgba().toString()}]
      },
      resource: {
        href: ${JSON.stringify(symbolLayer.resource.href)}
      },
      roll: ${symbolLayer.roll},
      tilt: ${symbolLayer.tilt},
      width: ${symbolLayer.width}
    },
    `;
      } else if (
        symbolLayer.material?.color &&
        symbolLayer.resource?.primitive
      ) {
        codeSnippet += `
    {
      type: "object",
      anchor: "${symbolLayer.anchor}",
      anchorPosition: {
        x: ${symbolLayer.anchorPosition?.x},
        y: ${symbolLayer.anchorPosition?.y},
        z: ${symbolLayer.anchorPosition?.z}
      },
      castShadows: ${symbolLayer.castShadows},
      depth: ${symbolLayer.depth},
      heading: ${symbolLayer.heading},
      height: ${symbolLayer.height},
      material: {
        color: [${symbolLayer.material.color.toRgba().toString()}]
      },
      resource: {
        primitive: "${symbolLayer.resource.primitive}",
      },
      roll: ${symbolLayer.roll},
      tilt: ${symbolLayer.tilt},
      width: ${symbolLayer.width}
    },
    `;
      }
    }

    if (symbolLayer.type === "text") {
      if (
        symbolLayer.background?.color &&
        symbolLayer.halo?.color &&
        symbolLayer.material?.color
      ) {
        codeSnippet += `
    {
      type: "text",
      background: {
        color: [${symbolLayer.background.color.toRgba().toString()}],
      },
      font: {
        decoration: "${symbolLayer.font?.decoration}",
        family: ${JSON.stringify(symbolLayer.font?.family)},
        size: ${symbolLayer.font?.size},
        style: "${symbolLayer.font?.style}",
        weight: "${symbolLayer.font?.weight}"
      },
      halo: {
        color: [${symbolLayer.halo.color.toRgba().toString()}],
        size: ${symbolLayer.halo.size}
      },
      horizontalAlignment: "${symbolLayer.horizontalAlignment}",
      lineHeight: ${symbolLayer.lineHeight},
      material: {
        color: [${symbolLayer.material.color.toRgba().toString()}],
      },
      size: ${symbolLayer.size},
      text: ${JSON.stringify(symbolLayer.text)},
      verticalAlignment: "${symbolLayer.verticalAlignment}"
    },
    `;
      }
    }
  });

  codeSnippet += `
  ],
  verticalOffset: {
    maxWorldLength: ${pointSymbol3D.verticalOffset?.maxWorldLength},
    minWorldLength: ${pointSymbol3D.verticalOffset?.minWorldLength},
    screenLength: ${pointSymbol3D.verticalOffset?.screenLength}
  }
});`;

  return <CodeSnippetPanel title="CDN" codeSnippet={codeSnippet} />;
}

export default PointSymbol3DCDNPanel;
