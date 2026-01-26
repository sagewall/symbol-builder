import "@esri/calcite-components/components/calcite-shell";
import { iframeStyles, shellStyles } from "./lib/styles";

function CIMSymbolShell(): React.ReactElement {
  return (
    <>
      <calcite-shell style={shellStyles}>
        <iframe
          allow="clipboard-read; clipboard-write 'self' https://esri.github.io/cim-symbol-builder-js/ https://sagewall.github.io/symbol-builder/ https://local.arcgis.com:8000/ https://arcgis.com;"
          src="https://esri.github.io/cim-symbol-builder-js/"
          style={iframeStyles}
          title="CIM Symbol Builder"></iframe>
      </calcite-shell>
    </>
  );
}

export default CIMSymbolShell;
