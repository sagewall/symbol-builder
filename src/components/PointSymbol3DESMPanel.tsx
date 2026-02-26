import type PointSymbol3D from "@arcgis/core/symbols/PointSymbol3D.js";
import "@esri/calcite-components/components/calcite-action";
import "@esri/calcite-components/components/calcite-alert";
import "@esri/calcite-components/components/calcite-panel";
import { useRef } from "react";
import { jsonStyles } from "./lib/styles";

interface Props {
  pointSymbol3D: PointSymbol3D;
}

function PointSymbol3DESMPanel({ pointSymbol3D }: Props): React.ReactElement {
  const alertRef = useRef<HTMLCalciteAlertElement>(null);

  const handleCopyClick = async (): Promise<void> => {
    await navigator.clipboard.writeText(codeSnippet);
    if (alertRef.current) {
      alertRef.current.open = true;
    }
  };

  let colorImport = false;
  let fontImport = false;
  let iconSymbol3DLayerImport = false;
  let objectSymbol3DLayerImport = false;
  const pointSymbol3DImport = true;
  let textSymbol3DLayerImport = false;
  const lineCallout3DImport = true;
  const symbol3DVerticalOffsetImport = true;

  pointSymbol3D.symbolLayers.forEach((symbolLayer) => {
    if (symbolLayer.type === "icon") {
      colorImport = true;
      iconSymbol3DLayerImport = true;
    }

    if (symbolLayer.type === "object") {
      colorImport = true;
      objectSymbol3DLayerImport = true;
    }

    if (symbolLayer.type === "text") {
      colorImport = true;
      fontImport = true;
      textSymbol3DLayerImport = true;
    }
  });

  let codeSnippet = `\n`;
  if (colorImport) {
    codeSnippet += `import Color from "@arcgis/core/Color.js";\n`;
  }
  if (fontImport) {
    codeSnippet += `import Font from "@arcgis/core/symbols/Font.js";\n`;
  }
  if (iconSymbol3DLayerImport) {
    codeSnippet += `import IconSymbol3DLayer from "@arcgis/core/symbols/IconSymbol3DLayer.js";\n`;
  }
  if (objectSymbol3DLayerImport) {
    codeSnippet += `import ObjectSymbol3DLayer from "@arcgis/core/symbols/ObjectSymbol3DLayer.js";\n`;
  }
  if (pointSymbol3DImport) {
    codeSnippet += `import PointSymbol3D from "@arcgis/core/symbols/PointSymbol3D.js";\n`;
  }
  if (textSymbol3DLayerImport) {
    codeSnippet += `import TextSymbol3DLayer from "@arcgis/core/symbols/TextSymbol3DLayer.js";\n`;
  }
  if (lineCallout3DImport) {
    codeSnippet += `import LineCallout3D from "@arcgis/core/symbols/callouts/LineCallout3D.js";\n`;
  }
  if (symbol3DVerticalOffsetImport) {
    codeSnippet += `import Symbol3DVerticalOffset from "@arcgis/core/symbols/support/Symbol3DVerticalOffset.js";\n`;
  }

  codeSnippet += `
const pointSymbol3D = new PointSymbol3D({
  callout: new LineCallout3D({
    color: new Color([${(pointSymbol3D.callout?.color?.toRgba() ?? []).toString()}]),
    size: ${pointSymbol3D.callout?.size}
  }),
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
    new IconSymbol3DLayer({
      anchor: "${symbolLayer.anchor}",
      anchorPosition: {
        x: ${symbolLayer.anchorPosition.x},
        y: ${symbolLayer.anchorPosition.y}
      },
      angle: ${symbolLayer.angle},
      material: {
        color: new Color([${symbolLayer.material.color.toRgba().toString()}])
      },
      outline: {
        color: new Color([${symbolLayer.outline.color.toRgba().toString()}]),
        size: ${symbolLayer.outline.size}
      },
      resource: {
        href: "${symbolLayer.resource.href}",
      },
      size: ${symbolLayer.size}
    }),
    `;
      } else if (
        symbolLayer.material?.color &&
        symbolLayer.outline?.color &&
        symbolLayer.resource?.primitive
      ) {
        codeSnippet += `
    new IconSymbol3DLayer({
      anchor: "${symbolLayer.anchor}",
      anchorPosition: {
        x: ${symbolLayer.anchorPosition.x},
        y: ${symbolLayer.anchorPosition.y}
      },
      angle: ${symbolLayer.angle},
      material: {
        color: new Color([${symbolLayer.material.color.toRgba().toString()}])
      },
      outline: {
        color: new Color([${symbolLayer.outline.color.toRgba().toString()}]),
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
      if (symbolLayer.material?.color && symbolLayer.resource?.href) {
        codeSnippet += `
    new ObjectSymbol3DLayer({
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
        color: new Color([${symbolLayer.material.color.toRgba().toString()}])
      },
      resource: {
        href: "${symbolLayer.resource.href}"
      },
      roll: ${symbolLayer.roll},
      tilt: ${symbolLayer.tilt},
      width: ${symbolLayer.width}
    }),
    `;
      } else if (
        symbolLayer.material?.color &&
        symbolLayer.resource?.primitive
      ) {
        codeSnippet += `
    new ObjectSymbol3DLayer({
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
        color: new Color([${symbolLayer.material.color.toRgba().toString()}])
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
      if (
        symbolLayer.background?.color &&
        symbolLayer.halo?.color &&
        symbolLayer.material?.color
      ) {
        codeSnippet += `
    new TextSymbol3DLayer({
      background: {
        color: new Color([${symbolLayer.background?.color.toRgba().toString()}]),
      },
      font: new Font({
        decoration: "${symbolLayer.font?.decoration}",
        family: "${symbolLayer.font?.family}",
        size: ${symbolLayer.font?.size},
        style: "${symbolLayer.font?.style}",
        weight: "${symbolLayer.font?.weight}"
      }),
      halo: {
        color: new Color([${symbolLayer.halo.color.toRgba().toString()}]),
        size: ${symbolLayer.halo.size}
      },
      horizontalAlignment: "${symbolLayer.horizontalAlignment}",
      lineHeight: ${symbolLayer.lineHeight},
      material: {
        color: new Color([${symbolLayer.material.color.toRgba().toString()}]),
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
    maxWorldLength: ${pointSymbol3D.verticalOffset?.maxWorldLength},
    minWorldLength: ${pointSymbol3D.verticalOffset?.minWorldLength},
    screenLength: ${pointSymbol3D.verticalOffset?.screenLength}
  })
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

export default PointSymbol3DESMPanel;
