import type PolygonSymbol3D from "@arcgis/core/symbols/PolygonSymbol3D";
import { CalciteAction, CalciteAlert, CalcitePanel } from "@esri/calcite-components-react";
import React, { useRef } from "react";
import { jsonStyles } from "./lib/styles";

interface Props {
  polygonSymbol3D: PolygonSymbol3D;
}

const PolygonSymbol3DJSONPanel = ({ polygonSymbol3D }: Props) => {
  const alertRef = useRef<HTMLCalciteAlertElement>(null);

  const handleCopyClick = async () => {
    await navigator.clipboard.writeText(codeSnippet);
    alertRef.current && (alertRef.current.open = true);
  };

  const codeSnippet = `
import PolygonSymbol3D from "@arcgis/core/symbols/PolygonSymbol3D.js";

const polygonSymbol3D = PolygonSymbol3D.fromJSON(
${JSON.stringify(polygonSymbol3D.toJSON(), null, 2)});`;

  return (
    <React.Fragment>
      <CalcitePanel>
        <div slot="header-content">JSON</div>
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

export default PolygonSymbol3DJSONPanel;
