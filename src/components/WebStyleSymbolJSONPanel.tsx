import type WebStyleSymbol from "@arcgis/core/symbols/WebStyleSymbol.js";
import "@esri/calcite-components/dist/components/calcite-action";
import "@esri/calcite-components/dist/components/calcite-alert";
import "@esri/calcite-components/dist/components/calcite-panel";
import { useRef } from "react";
import { jsonStyles } from "./lib/styles";

interface Props {
  webStyleSymbol: WebStyleSymbol;
}

function SimpleFillSymbolJSONPanel({ webStyleSymbol }: Props): React.ReactElement {
  const alertRef = useRef<HTMLCalciteAlertElement>(null);

  const handleCopyClick = async (): Promise<void> => {
    await navigator.clipboard.writeText(codeSnippet);
    if (alertRef.current) {
      alertRef.current.open = true;
    }
  };

  const codeSnippet = `
import WebStyleSymbol from "@arcgis/core/symbols/WebStyleSymbol.js";

const webStyleSymbolSymbol = WebStyleSymbol.fromJSON(
${JSON.stringify(webStyleSymbol.toJSON(), null, 2)});`;

  return (
    <>
      <calcite-panel>
        <div slot="header-content">JSON</div>
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

export default SimpleFillSymbolJSONPanel;
