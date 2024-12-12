import type LineSymbol3D from "@arcgis/core/symbols/LineSymbol3D";
import React, { useRef } from "react";
import { jsonStyles } from "./lib/styles";

interface Props {
  lineSymbol3D: LineSymbol3D;
}

const LineSymbol3DJSONPanel = ({ lineSymbol3D }: Props) => {
  const alertRef = useRef<HTMLCalciteAlertElement>(null);

  const handleCopyClick = async () => {
    await navigator.clipboard.writeText(codeSnippet);
    alertRef.current && (alertRef.current.open = true);
  };

  const codeSnippet = `
import LineSymbol3D from "@arcgis/core/symbols/LineSymbol3D.js";

const lineSymbol3D = LineSymbol3D.fromJSON(
${JSON.stringify(lineSymbol3D.toJSON(), null, 2)});`;

  return (
    <React.Fragment>
      <calcite-panel>
        <div slot="header-content">JSON</div>
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

export default LineSymbol3DJSONPanel;
