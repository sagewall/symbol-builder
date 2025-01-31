import React from "react";
import { iframeStyles, shellStyles } from "./lib/styles";
import Header from "./Header";

const CIMSymbolShell = () => {
  return (
    <React.Fragment>
      <calcite-shell style={shellStyles}>
        <Header title="CIMSymbol" backButton></Header>
        <iframe
          allow="clipboard-read; clipboard-write self https://esri.github.io/cim-symbol-builder-js/ https://sagewall.github.io/symbol-builder/ https://local.arcgis.com:8000/ https://*.arcgis.com;"
          src="https://esri.github.io/cim-symbol-builder-js/"
          style={iframeStyles}
          title="CIM Symbol Builder"
        ></iframe>
      </calcite-shell>
    </React.Fragment>
  );
};

export default CIMSymbolShell;
