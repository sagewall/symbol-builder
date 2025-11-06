import type TextSymbol from "@arcgis/core/symbols/TextSymbol";
import "@esri/calcite-components/dist/components/calcite-action";
import "@esri/calcite-components/dist/components/calcite-alert";
import "@esri/calcite-components/dist/components/calcite-panel";
import { useRef } from "react";
import { jsonStyles } from "../lib/styles";

interface Props {
  textSymbol: TextSymbol;
}

function TextSymbolCDNPanel({ textSymbol }: Props) {
  const alertRef = useRef<HTMLCalciteAlertElement>(null);

  const handleCopyClick = async () => {
    await navigator.clipboard.writeText(codeSnippet);
    if (alertRef.current) {
      alertRef.current.open = true;
    }
  };

  const codeSnippet = `
const TextSymbol = await $arcgis.import("@arcgis/core/symbols/TextSymbol.js");

const textSymbol = new TextSymbol({
  angle: ${textSymbol.angle},
  backgroundColor: [${textSymbol.backgroundColor?.toRgba()}],
  borderLineColor: [${textSymbol.borderLineColor?.toRgba()}],
  borderLineSize: ${textSymbol.borderLineSize},
  color: [${textSymbol.color?.toRgba()}],
  font: {
    decoration: "${textSymbol.font.decoration}",
    family: "${textSymbol.font.family}",
    size: ${textSymbol.font.size},
    style: "${textSymbol.font.style}",
    weight: "${textSymbol.font.weight}"
  },
  haloColor: [${textSymbol.haloColor?.toRgba()}],
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
    <>
      <calcite-panel>
        <div slot="header-content">CDN</div>
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

export default TextSymbolCDNPanel;
