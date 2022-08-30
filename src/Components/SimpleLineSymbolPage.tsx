import Polyline from "@arcgis/core/geometry/Polyline";
import Graphic from "@arcgis/core/Graphic";
import SimpleLineSymbol from "@arcgis/core/symbols/SimpleLineSymbol";
import "@esri/calcite-components/dist/components/calcite-shell";
import { useState } from "react";

import {
  CalcitePanel,
  CalciteShell,
  CalciteShellPanel,
} from "@esri/calcite-components-react";
import "@esri/calcite-components/dist/components/calcite-panel";
import "@esri/calcite-components/dist/components/calcite-shell";
import "@esri/calcite-components/dist/components/calcite-shell-panel";
import MapView from "./MapView";
import SceneView from "./SceneView";

interface SimpleLineSymbolPageProps {
  sceneView: boolean;
}

function SimpleLineSymbolPage({ sceneView }: SimpleLineSymbolPageProps) {
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

  let view = <MapView graphics={[polylineGraphic]} />;
  if (sceneView) {
    view = <SceneView graphics={[polylineGraphic]} />;
  }

  return (
    <CalciteShell>
      {view}
      <CalciteShellPanel
        slot="panel-end"
        position="end"
        resizable
        widthScale="l"
      >
        <CalcitePanel>
          <div slot="header-content">Properties</div>
        </CalcitePanel>
        <CalcitePanel>
          <div slot="header-content">Code</div>
        </CalcitePanel>
      </CalciteShellPanel>
    </CalciteShell>
  );
}

export default SimpleLineSymbolPage;
