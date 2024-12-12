import type PolygonSymbol3D from "@arcgis/core/symbols/PolygonSymbol3D";
import React, { useRef } from "react";
import { jsonStyles } from "./lib/styles";

interface Props {
  polygonSymbol3D: PolygonSymbol3D;
}

const PolygonSymbol3DAMDPanel = ({ polygonSymbol3D }: Props) => {
  const alertRef = useRef<HTMLCalciteAlertElement>(null);

  const handleCopyClick = async () => {
    await navigator.clipboard.writeText(codeSnippet);
    alertRef.current && (alertRef.current.open = true);
  };

  let codeSnippet = `
require(["esri/symbols/PolygonSymbol3D"], (PolygonSymbol3D) => {

  const polygonSymbol3D = new PolygonSymbol3D({
    symbolLayers: [
 `;

  polygonSymbol3D.symbolLayers.forEach((symbolLayer) => {
    if (symbolLayer.type === "fill") {
      if (symbolLayer.material.color && symbolLayer.outline.color && symbolLayer.outline.pattern) {
        codeSnippet += `
      {
        type: "fill",
        material: {
          color: [${symbolLayer.material.color.toRgba()}],
          colorMixMode: "${symbolLayer.material.colorMixMode}",
        },
        outline: {
          color: [${symbolLayer.outline.color.toRgba()}],
          pattern: {
            type: "style",
            style: "${symbolLayer.outline.pattern.style}"
          },
          patternCap: "${symbolLayer.outline.patternCap}",
          size: ${symbolLayer.outline.size},
        },
        pattern: {
          type: "style",
          style: "${symbolLayer.pattern.style}"
        }
      },
      `;
      }
    }

    if (symbolLayer.type === "extrude") {
      if (symbolLayer.material.color) {
        codeSnippet += `
      {
        type: "extrude",
        castShadows: ${symbolLayer.castShadows},
        edges: {
          type: "solid",
          color: [${symbolLayer.edges.color.toRgba()}],
          extensionLength: ${symbolLayer.edges.extensionLength},
          size: ${symbolLayer.edges.size}
        },
        material: {
          color: [${symbolLayer.material.color.toRgba()}],
        },
        size: ${symbolLayer.size}
      },
      `;
      }
    }

    if (symbolLayer.type === "water") {
      codeSnippet += `
      {
        type: "water",
        color: [${symbolLayer.color.toRgba()}],
        waterbodySize: "${symbolLayer.waterbodySize}",
        waveDirection: ${symbolLayer.waveDirection},
        waveStrength: "${symbolLayer.waveStrength}"
      },
      `;
    }

    if (symbolLayer.type === "icon") {
      if (symbolLayer.material.color && symbolLayer.outline.color && symbolLayer.resource.href) {
        codeSnippet += `
      {
        type: "icon",
        anchor: "${symbolLayer.anchor}",
        anchorPosition: {
          x: ${symbolLayer.anchorPosition.x},
          y: ${symbolLayer.anchorPosition.y}
        },
        material: {
          color: [${symbolLayer.material.color.toRgba()}]
        },
        outline: {
          color: [${symbolLayer.outline.color.toRgba()}],
          size: ${symbolLayer.outline.size}
        },
        resource: {
          href: "${symbolLayer.resource.href}",
        },
        size: ${symbolLayer.size}
      },
      `;
      } else if (
        symbolLayer.material.color &&
        symbolLayer.outline.color &&
        symbolLayer.resource.primitive
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
            color: [${symbolLayer.material.color.toRgba()}]
          },
          outline: {
            color: [${symbolLayer.outline.color.toRgba()}],
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
      if (symbolLayer.material.color && symbolLayer.resource.href) {
        codeSnippet += `
      {
        type: "object",
        anchor: "${symbolLayer.anchor}",
        anchorPosition: {
          x: ${symbolLayer.anchorPosition.x},
          y: ${symbolLayer.anchorPosition.y},
          z: ${symbolLayer.anchorPosition.z}
        },
        castShadows: ${symbolLayer.castShadows},
        depth: ${symbolLayer.depth},
        heading: ${symbolLayer.heading},
        height: ${symbolLayer.height},
        material: {
          color: [${symbolLayer.material.color.toRgba()}]
        },
        resource: {
          href: "${symbolLayer.resource.href}"
        },
        roll: ${symbolLayer.roll},
        tilt: ${symbolLayer.tilt},
        width: ${symbolLayer.width}
      },
      `;
      } else if (symbolLayer.material.color && symbolLayer.resource.primitive) {
        codeSnippet += `
      {
        type: "object",
        anchor: "${symbolLayer.anchor}",
        anchorPosition: {
          x: ${symbolLayer.anchorPosition.x},
          y: ${symbolLayer.anchorPosition.y},
          z: ${symbolLayer.anchorPosition.z}
        },
        castShadows: ${symbolLayer.castShadows},
        depth: ${symbolLayer.depth},
        heading: ${symbolLayer.heading},
        height: ${symbolLayer.height},
        material: {
          color: [${symbolLayer.material.color.toRgba()}]
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

export default PolygonSymbol3DAMDPanel;
