import { CalciteShell } from "@esri/calcite-components-react";
import "@esri/calcite-components/dist/components/calcite-shell";
import MapView from "./MapView";
import ShellPanel from "./ShellPanel";

function SimpleLineSymbolPage() {
  return (
    <CalciteShell>
      <MapView />
      <ShellPanel></ShellPanel>
    </CalciteShell>
  );
}

export default SimpleLineSymbolPage;
