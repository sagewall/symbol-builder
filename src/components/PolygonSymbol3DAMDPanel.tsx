import PolygonSymbol3D from "@arcgis/core/symbols/PolygonSymbol3D";
import { CalciteAction, CalcitePanel } from "@esri/calcite-components-react";
import React from "react";
import { jsonStyles } from "./lib/styles";

interface Props {
  polygonSymbol3D: PolygonSymbol3D;
}

const PolygonSymbol3DAMDPanel = ({ polygonSymbol3D }: Props) => {
  const handleCopyClick = () => {
    navigator.clipboard.writeText(codeSnippet);
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

    if (symbolLayer.type === "text") {
      if (symbolLayer.background.color && symbolLayer.halo.color && symbolLayer.material.color) {
        codeSnippet += `
      {
        type: "text",
        background: {
          color: [${symbolLayer.background.color.toRgba()}],
        },
        font: {
          decoration: "${symbolLayer.font.decoration}",
          family: "${symbolLayer.font.family}",
          size: ${symbolLayer.font.size},
          style: "${symbolLayer.font.style}",
          weight: "${symbolLayer.font.weight}"
        },
        halo: {
          color: [${symbolLayer.halo.color.toRgba()}],
          size: ${symbolLayer.halo.size}
        },
        horizontalAlignment: "${symbolLayer.horizontalAlignment}",
        lineHeight: ${symbolLayer.lineHeight},
        material: {
          color: [${symbolLayer.material.color.toRgba()}],
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

export default PolygonSymbol3DAMDPanel;
