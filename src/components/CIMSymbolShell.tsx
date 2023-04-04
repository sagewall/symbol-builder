import { CalciteShell } from "@esri/calcite-components-react";
import React from "react";
import { iframeStyles, shellStyles } from "./lib/styles";

const CIMSymbolShell = () => {
  return (
    <React.Fragment>
      <CalciteShell style={shellStyles}>
        <iframe
          src="https://esri.github.io/cim-symbol-builder-js/"
          style={iframeStyles}
          title="CIM Symbol Builder"
        ></iframe>
      </CalciteShell>
    </React.Fragment>
  );
};

export default CIMSymbolShell;
