import type WebStyleSymbol from "@arcgis/core/symbols/WebStyleSymbol";
import React, { useRef } from "react";
import { jsonStyles } from "./lib/styles";

interface Props {
  webStyleSymbol: WebStyleSymbol;
}

const WebStyleSymbolESMPanel = ({ webStyleSymbol }: Props) => {
  const alertRef = useRef<HTMLCalciteAlertElement>(null);

  const handleCopyClick = async () => {
    await navigator.clipboard.writeText(codeSnippet);
    alertRef.current && (alertRef.current.open = true);
  };

  let codeSnippet = ``;

  if (webStyleSymbol.styleName) {
    codeSnippet = `
import WebStyleSymbol from "@arcgis/core/symbols/WebStyleSymbol.js";

const webStyleSymbol = new WebStyleSymbol({
  name: "${webStyleSymbol.name}",
  styleName: "${webStyleSymbol.styleName}"
});`;
  } else {
    codeSnippet = `
import WebStyleSymbol from "@arcgis/core/symbols/WebStyleSymbol.js";

const webStyleSymbol = new WebStyleSymbol({
  name: "${webStyleSymbol.name}",
  styleUrl: "${webStyleSymbol.styleUrl}"
});`;
  }

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

export default WebStyleSymbolESMPanel;
