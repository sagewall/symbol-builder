import type PointSymbol3D from "@arcgis/core/symbols/PointSymbol3D";
import React, { useRef } from "react";
import { jsonStyles } from "./lib/styles";

interface Props {
  pointSymbol3D: PointSymbol3D;
}

const PointSymbol3DJSONPanel = ({ pointSymbol3D }: Props) => {
  const alertRef = useRef<HTMLCalciteAlertElement>(null);

  const handleCopyClick = async () => {
    await navigator.clipboard.writeText(codeSnippet);
    if (alertRef.current) {
      alertRef.current.open = true;
    }
  };

  const codeSnippet = `
import PointSymbol3D from "@arcgis/core/symbols/PointSymbol3D.js";

const pointSymbol3D = PointSymbol3D.fromJSON(
${JSON.stringify(pointSymbol3D.toJSON(), null, 2)});`;

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

export default PointSymbol3DJSONPanel;
