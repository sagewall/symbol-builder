import type TextSymbol from "@arcgis/core/symbols/TextSymbol";
import { CalciteAction, CalciteAlert, CalcitePanel } from "@esri/calcite-components-react";
import React, { useRef } from "react";
import { jsonStyles } from "./lib/styles";

interface Props {
  textSymbol: TextSymbol;
}

const TextSymbolAMDPanel = ({ textSymbol }: Props) => {
  const alertRef = useRef<HTMLCalciteAlertElement>(null);

  const handleCopyClick = async () => {
    await navigator.clipboard.writeText(codeSnippet);
    alertRef.current && (alertRef.current.open = true);
  };

  const codeSnippet = `
require(["esri/symbols/TextSymbol"], (TextSymbol) => {
  const textSymbol = new TextSymbol({
    angle: ${textSymbol.angle},
    backgroundColor: [${textSymbol.backgroundColor.toRgba()}],
    borderLineColor: [${textSymbol.borderLineColor.toRgba()}],
    borderLineSize: ${textSymbol.borderLineSize},
    color: [${textSymbol.color.toRgba()}],
    font: {
      decoration: "${textSymbol.font.decoration}",
      family: "${textSymbol.font.family}",
      size: ${textSymbol.font.size},
      style: "${textSymbol.font.style}",
      weight: "${textSymbol.font.weight}"
    },
    haloColor: [${textSymbol.haloColor.toRgba()}],
    haloSize: ${textSymbol.haloSize},
    horizontalAlignment: "${textSymbol.horizontalAlignment}",
    kerning: ${textSymbol.kerning},
    lineWidth: ${textSymbol.lineWidth},
    rotated: ${textSymbol.rotated},
    text: "${textSymbol.text}",
    verticalAlignment: "${textSymbol.verticalAlignment}",
    xoffset: ${textSymbol.xoffset},
    yoffset: ${textSymbol.yoffset}
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
      <CalciteAlert
        autoClose
        autoCloseDuration="fast"
        icon="copy-to-clipboard"
        kind="success"
        label="Copied to clipboard"
        ref={alertRef}
      >
        <div slot="message">Copied to clipboard</div>
      </CalciteAlert>
    </React.Fragment>
  );
};

export default TextSymbolAMDPanel;
