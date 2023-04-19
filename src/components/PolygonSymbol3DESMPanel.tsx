import PolygonSymbol3D from "@arcgis/core/symbols/PolygonSymbol3D";
import { CalciteAction, CalcitePanel } from "@esri/calcite-components-react";
import React from "react";
import { jsonStyles } from "./lib/styles";

interface Props {
  polygonSymbol3D: PolygonSymbol3D;
}

const PolygonSymbol3DESMPanel = ({ polygonSymbol3D }: Props) => {
  const handleCopyClick = () => {
    navigator.clipboard.writeText(codeSnippet);
  };

  let codeSnippet = `
import Color from "@arcgis/core/Color.js";
import Edges3D from "@arcgis/core/symbols/edges/Edges3D.js";
import ExtrudeSymbol3DLayer from "@arcgis/core/symbols/ExtrudeSymbol3DLayer.js";
import IconSymbol3DLayer from "@arcgis/core/symbols/IconSymbol3DLayer.js";
import LineStyleMarker3D from "@arcgis/core/symbols/LineStyleMarker3D.js";
import LineSymbol3DLayer from "@arcgis/core/symbols/LineSymbol3DLayer.js";
import ObjectSymbol3DLayer from "@arcgis/core/symbols/ObjectSymbol3DLayer.js";
import PolygonSymbol3D from "@arcgis/core/symbols/PolygonSymbol3D.js";
import FillSymbol3DLayer from "@arcgis/core/symbols/FillSymbol3DLayer.js";
import WaterSymbol3DLayer from "@arcgis/core/symbols/WaterSymbol3DLayer.js";
import LineStylePattern3D from "@arcgis/core/symbols/patterns/LineStylePattern3D.js";
import StylePattern3D from "@arcgis/core/symbols/patterns/StylePattern3D.js";

const polygonSymbol3D = new PolygonSymbol3D({
  symbolLayers: [
`;

  polygonSymbol3D.symbolLayers.forEach((symbolLayer) => {
    if (symbolLayer.type === "fill") {
      if (symbolLayer.material.color && symbolLayer.outline.color && symbolLayer.outline.pattern) {
        codeSnippet += `
    new FillSymbol3DLayer({
      material: {
        color: new Color([${symbolLayer.material.color.toRgba()}]),
        colorMixMode: "${symbolLayer.material.colorMixMode}",
      },
      outline: {
        color: new Color([${symbolLayer.outline.color.toRgba()}]),
        pattern: new LineStylePattern3D({
          style: "${symbolLayer.outline.pattern.style}"
        }),
        patternCap: "${symbolLayer.outline.patternCap}",
        size: ${symbolLayer.outline.size},
      },
      pattern: new StylePattern3D({
        style: "${symbolLayer.pattern.style}"
      })
    }),
    `;
      }
    }

    if (symbolLayer.type === "extrude") {
      if (symbolLayer.material.color) {
        codeSnippet += `
    new ExtrudeSymbol3DLayer({
      castShadows: ${symbolLayer.castShadows},
      edges: new Edges3D({
        color: new Color([${symbolLayer.edges.color.toRgba()}]),
        extensionLength: ${symbolLayer.edges.extensionLength},
        size: ${symbolLayer.edges.size}
      }),
      material: {
        color: new Color([${symbolLayer.material.color.toRgba()}]),
      },
      size: ${symbolLayer.size}
    }),
    `;
      }
    }

    if (symbolLayer.type === "water") {
      codeSnippet += `
    new WaterSymbol3DLayer({
      color: new Color([${symbolLayer.color.toRgba()}]),
      waterbodySize: ${symbolLayer.waterbodySize},
      waveDirection: ${symbolLayer.waveDirection},
      waveStrength: ${symbolLayer.waveStrength}
    }),
    `;
    }

    if (symbolLayer.type === "line") {
      if (symbolLayer.material.color && symbolLayer.marker) {
        codeSnippet += `
    new LineSymbol3DLayer({
      cap: "${symbolLayer.cap}",
      join: "${symbolLayer.join}",
      marker: new LineStyleMarker3D({
        color: new Color([${symbolLayer.marker.color.toRgba()}]),
        placement: "${symbolLayer.marker.placement}",
        style: "${symbolLayer.marker.style}"
      }),
      material: {
        color: new Color([${symbolLayer.material.color.toRgba()}]),
      },
      pattern: new LineStylePattern3D({}),
      size: ${symbolLayer.size}
    }),
    `;
      } else if (symbolLayer.material.color) {
        codeSnippet += `
    new LineSymbol3DLayer({
      cap: "${symbolLayer.cap}",
      join: "${symbolLayer.join}",
      material: {
        color: new Color([${symbolLayer.material.color.toRgba()}]),
      },
      pattern: new LineStylePattern3D({
        style: "${symbolLayer.pattern.style}"
      }),
      size: ${symbolLayer.size}
    }),
    `;
      }
    }

    if (symbolLayer.type === "icon") {
      if (symbolLayer.material.color && symbolLayer.outline.color) {
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
        href: "${symbolLayer.resource.href}",
      },
      size: ${symbolLayer.size}
    }),
    `;
      }
    }

    if (symbolLayer.type === "object") {
      if (symbolLayer.material.color) {
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
        href: "${symbolLayer.resource.href}"
      },
      roll: ${symbolLayer.roll},
      tilt: ${symbolLayer.tilt},
      width: ${symbolLayer.width}
    }),
    `;
      }
    }
  });

  codeSnippet += `
  ]
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

export default PolygonSymbol3DESMPanel;
