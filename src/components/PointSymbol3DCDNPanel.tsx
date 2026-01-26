import type PointSymbol3D from "@arcgis/core/symbols/PointSymbol3D.js";
import "@esri/calcite-components/components/calcite-action";
import "@esri/calcite-components/components/calcite-alert";
import "@esri/calcite-components/components/calcite-panel";
import { useRef } from "react";
import { jsonStyles } from "./lib/styles";

interface Props {
  pointSymbol3D: PointSymbol3D;
}

function PointSymbol3DCDNPanel({ pointSymbol3D }: Props): React.ReactElement {
  const alertRef = useRef<HTMLCalciteAlertElement>(null);

  const handleCopyClick = async (): Promise<void> => {
    await navigator.clipboard.writeText(codeSnippet);
    if (alertRef.current) {
      alertRef.current.open = true;
    }
  };

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
      if (symbolLayer.material?.color && symbolLayer.outline?.color && symbolLayer.resource?.href) {
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
      href: "${symbolLayer.resource.href}",
    },
    size: ${symbolLayer.size}
  },
  `;
      } else if (symbolLayer.material?.color && symbolLayer.outline?.color && symbolLayer.resource?.primitive) {
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
        href: "${symbolLayer.resource.href}"
      },
      roll: ${symbolLayer.roll},
      tilt: ${symbolLayer.tilt},
      width: ${symbolLayer.width}
    },
    `;
      } else if (symbolLayer.material?.color && symbolLayer.resource?.primitive) {
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
      if (symbolLayer.background?.color && symbolLayer.halo?.color && symbolLayer.material?.color) {
        codeSnippet += `
    {
      type: "text",
      background: {
        color: [${symbolLayer.background.color.toRgba().toString()}],
      },
      font: {
        decoration: "${symbolLayer.font?.decoration}",
        family: "${symbolLayer.font?.family}",
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
      text: "${symbolLayer.text}",
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
          onClick={handleCopyClick}></calcite-action>

        <pre style={jsonStyles}>{codeSnippet}</pre>
      </calcite-panel>
      <calcite-alert
        autoClose
        autoCloseDuration="fast"
        icon="copy-to-clipboard"
        kind="success"
        label="Copied to clipboard"
        ref={alertRef}>
        <div slot="message">Copied to clipboard</div>
      </calcite-alert>
    </>
  );
}

export default PointSymbol3DCDNPanel;
