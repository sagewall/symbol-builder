import type TextSymbol from "@arcgis/core/symbols/TextSymbol";
import React, { useRef } from "react";
import { jsonStyles } from "./lib/styles";

interface Props {
  textSymbol: TextSymbol;
}

const TextSymbolESMPanel = ({ textSymbol }: Props) => {
  const alertRef = useRef<HTMLCalciteAlertElement>(null);

  const handleCopyClick = async () => {
    await navigator.clipboard.writeText(codeSnippet);
    if (alertRef.current) {
      alertRef.current.open = true;
    }
  };

  const codeSnippet = `
import Color from "@arcgis/core/Color.js";
import Font from "@arcgis/core/symbols/Font.js";
import TextSymbol from "@arcgis/core/symbols/TextSymbol.js";

const textSymbol = new TextSymbol({
  angle: ${textSymbol.angle},
  backgroundColor: new Color([${textSymbol.backgroundColor?.toRgba()}]),
  borderLineColor: new Color([${textSymbol.borderLineColor?.toRgba()}]),
  borderLineSize: ${textSymbol.borderLineSize},
  color: new Color([${textSymbol.color?.toRgba()}]),
  font: new Font({
    decoration: "${textSymbol.font.decoration}",
    family: "${textSymbol.font.family}",
    size: ${textSymbol.font.size},
    style: "${textSymbol.font.style}",
    weight: "${textSymbol.font.weight}"
  }),
  haloColor: new Color([${textSymbol.haloColor?.toRgba()}]),
  haloSize: ${textSymbol.haloSize},
  horizontalAlignment: "${textSymbol.horizontalAlignment}",
  kerning: ${textSymbol.kerning},
  lineWidth: ${textSymbol.lineWidth},
  rotated: ${textSymbol.rotated},
  text: "${textSymbol.text}",
  verticalAlignment: "${textSymbol.verticalAlignment}",
  xoffset: ${textSymbol.xoffset},
  yoffset: ${textSymbol.yoffset}
});`;

  return (
    <React.Fragment>
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
    </React.Fragment>
  );
};

export default TextSymbolESMPanel;
