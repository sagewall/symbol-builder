import Color from "@arcgis/core/Color";
import Polygon from "@arcgis/core/geometry/Polygon";
import Graphic from "@arcgis/core/Graphic";
import SimpleFillSymbol from "@arcgis/core/symbols/SimpleFillSymbol";
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

interface SimpleFillSymbolPageProps {
  sceneView: boolean;
}

function SimpleFillSymbolPage({ sceneView }: SimpleFillSymbolPageProps) {
  const [simpleFillSymbol, setSimpleFillSymbol] = useState(
    new SimpleFillSymbol({
      color: new Color("#000000"),
      outline: {
        cap: "round",
        color: "#000000",
        join: "round",
        marker: undefined,
        miterLimit: 2,
        style: "solid",
        width: 0.75,
      },
      style: "solid",
    })
  );

  const [polygon, setPolygon] = useState(
    new Polygon({
      rings: [
        [
          [-105.0, 40.0],
          [-105.1, 40.2],
          [-105.35, 40.1],
        ],
      ],
    })
  );

  const [polygonGraphic, setPolygonGraphic] = useState(
    new Graphic({
      geometry: polygon,
      symbol: simpleFillSymbol,
    })
  );

  let view = <MapView graphics={[polygonGraphic]} />;
  if (sceneView) {
    view = <SceneView graphics={[polygonGraphic]} />;
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

export default SimpleFillSymbolPage;
