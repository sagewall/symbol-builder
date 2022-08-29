import Polyline from "@arcgis/core/geometry/Polyline";
import Graphic from "@arcgis/core/Graphic";
import SimpleLineSymbol from "@arcgis/core/symbols/SimpleLineSymbol";
import { CalciteShell } from "@esri/calcite-components-react";
import "@esri/calcite-components/dist/components/calcite-shell";
import { useState } from "react";
import MapView from "./MapView";
import ShellPanel from "./ShellPanel";

function SimpleLineSymbolPage() {
  const [simpleLineSymbol, setSimpleLineSymbol] = useState(
    new SimpleLineSymbol({
      cap: "round",
      color: "#000000",
      join: "round",
      marker: undefined,
      miterLimit: 2,
      style: "solid",
      width: 0.75,
    })
  );

  const [polyline, setPolyline] = useState(
    new Polyline({
      paths: [
        [
          [-105.0, 40.0],
          [-105.1, 40.2],
          [-105.35, 40.1],
        ],
      ],
    })
  );

  const [polylineGraphic, setPolylineGraphic] = useState(
    new Graphic({
      geometry: polyline,
      symbol: simpleLineSymbol,
    })
  );

  return (
    <CalciteShell>
      <MapView graphics={[polylineGraphic]} />
      <ShellPanel></ShellPanel>
    </CalciteShell>
  );
}

export default SimpleLineSymbolPage;
