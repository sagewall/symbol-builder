import { CalciteShell } from "@esri/calcite-components-react";
import React from "react";
import { iframeStyles, shellStyles } from "./lib/styles";
import Header from "./Header";

const CIMSymbolShell = () => {
  return (
    <React.Fragment>
      <CalciteShell style={shellStyles}>
        <Header title="CIMSymbol"></Header>
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
