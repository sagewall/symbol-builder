import Color from "@arcgis/core/Color";
import Polygon from "@arcgis/core/geometry/Polygon";
import Graphic from "@arcgis/core/Graphic";
import SimpleFillSymbol from "@arcgis/core/symbols/SimpleFillSymbol";
import { CalciteShell } from "@esri/calcite-components-react";
import "@esri/calcite-components/dist/components/calcite-shell";
import { useState } from "react";
import MapView from "./MapView";
import ShellPanel from "./ShellPanel";

function SimpleFillSymbolPage() {
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

  return (
    <CalciteShell>
      <MapView graphics={[polygonGraphic]} />
      <ShellPanel></ShellPanel>
    </CalciteShell>
  );
}

export default SimpleFillSymbolPage;
