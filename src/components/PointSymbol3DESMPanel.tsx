import PointSymbol3D from "@arcgis/core/symbols/PointSymbol3D";
import { CalciteAction, CalcitePanel } from "@esri/calcite-components-react";
import React from "react";
import { jsonStyles } from "./lib/styles";

interface Props {
  pointSymbol3D: PointSymbol3D;
}

const PointSymbol3DESMPanel = ({ pointSymbol3D }: Props) => {
  const handleCopyClick = () => {
    navigator.clipboard.writeText(codeSnippet);
  };

  let codeSnippet = `
import Color from "@arcgis/core/Color.js";
import Font from "@arcgis/core/symbols/Font.js";
import IconSymbol3DLayer from "@arcgis/core/symbols/IconSymbol3DLayer.js";
import ObjectSymbol3DLayer from "@arcgis/core/symbols/ObjectSymbol3DLayer.js";
import PointSymbol3D from "@arcgis/core/symbols/PointSymbol3D.js";
import TextSymbol3DLayer from "@arcgis/core/symbols/TextSymbol3DLayer.js";
import LineCallout3D from "@arcgis/core/symbols/callouts/LineCallout3D.js";
import Symbol3DVerticalOffset from "@arcgis/core/symbols/support/Symbol3DVerticalOffset.js";

const pointSymbol3D = new PointSymbol3D({
  callout: new LineCallout3D({
    color: new Color([${pointSymbol3D.callout.color.toRgba()}]),
    size: ${pointSymbol3D.callout.size}
  }),
  symbolLayers: [
`;

  pointSymbol3D.symbolLayers.forEach((symbolLayer) => {
    if (symbolLayer.type === "icon") {
      if (symbolLayer.material.color && symbolLayer.outline.color && symbolLayer.resource.href) {
        codeSnippet += `
    new IconSymbol3DLayer({
      anchor: "${symbolLayer.anchor}",
      anchorPosition: {
        x: ${symbolLayer.anchorPosition.x},
        y: ${symbolLayer.anchorPosition.y}
      },
      material: {
        color: new Color([${symbolLayer.material.color.toRgba()}])
      },
      outline: {
        color: new Color([${symbolLayer.outline.color.toRgba()}]),
        size: ${symbolLayer.outline.size}
      },
      resource: {
        href: "${symbolLayer.resource.href}",
      },
      size: ${symbolLayer.size}
    }),
    `;
      } else if (
        symbolLayer.material.color &&
        symbolLayer.outline.color &&
        symbolLayer.resource.primitive
      ) {
        codeSnippet += `
    new IconSymbol3DLayer({
      anchor: "${symbolLayer.anchor}",
      anchorPosition: {
        x: ${symbolLayer.anchorPosition.x},
        y: ${symbolLayer.anchorPosition.y}
      },
      material: {
        color: new Color([${symbolLayer.material.color.toRgba()}])
      },
      outline: {
        color: new Color([${symbolLayer.outline.color.toRgba()}]),
        size: ${symbolLayer.outline.size}
      },
      resource: {
        primitive: "${symbolLayer.resource.primitive}",
      },
      size: ${symbolLayer.size}
    }),
    `;
      }
    }

    if (symbolLayer.type === "object") {
      if (symbolLayer.material.color && symbolLayer.resource.href) {
        codeSnippet += `
    new ObjectSymbol3DLayer({
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
        color: new Color([${symbolLayer.material.color.toRgba()}])
      },
      resource: {
        href: "${symbolLayer.resource.href}"
      },
      roll: ${symbolLayer.roll},
      tilt: ${symbolLayer.tilt},
      width: ${symbolLayer.width}
    }),
    `;
      } else if (symbolLayer.material.color && symbolLayer.resource.primitive) {
        codeSnippet += `
    new ObjectSymbol3DLayer({
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
        color: new Color([${symbolLayer.material.color.toRgba()}])
      },
      resource: {
        primitive: "${symbolLayer.resource.primitive}",
      },
      roll: ${symbolLayer.roll},
      tilt: ${symbolLayer.tilt},
      width: ${symbolLayer.width}
    }),
    `;
      }
    }

    if (symbolLayer.type === "text") {
      if (symbolLayer.background.color && symbolLayer.halo.color && symbolLayer.material.color) {
        codeSnippet += `
    new TextSymbol3DLayer({
      background: {
        color: new Color([${symbolLayer.background.color.toRgba()}]),
      },
      font: new Font({
        decoration: "${symbolLayer.font.decoration}",
        family: "${symbolLayer.font.family}",
        size: ${symbolLayer.font.size},
        style: "${symbolLayer.font.style}",
        weight: "${symbolLayer.font.weight}"
      }),
      halo: {
        color: new Color([${symbolLayer.halo.color.toRgba()}]),
        size: ${symbolLayer.halo.size}
      },
      horizontalAlignment: "${symbolLayer.horizontalAlignment}",
      lineHeight: ${symbolLayer.lineHeight},
      material: {
        color: new Color([${symbolLayer.material.color.toRgba()}]),
      },
      size: ${symbolLayer.size},
      text: "${symbolLayer.text}",
      verticalAlignment: "${symbolLayer.verticalAlignment}"
    }),
    `;
      }
    }
  });

  codeSnippet += `
  ],
  verticalOffset: new Symbol3DVerticalOffset({
    maxWorldLength: ${pointSymbol3D.verticalOffset.maxWorldLength},
    minWorldLength: ${pointSymbol3D.verticalOffset.minWorldLength},
    screenLength: ${pointSymbol3D.verticalOffset.screenLength}
  })
});`;

  return (
    <React.Fragment>
      <CalcitePanel>
        <div slot="header-content">ESM / TypeScript</div>
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

export default PointSymbol3DESMPanel;
