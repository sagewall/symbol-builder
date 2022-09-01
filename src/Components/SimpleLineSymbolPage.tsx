import Polyline from "@arcgis/core/geometry/Polyline";
import Graphic from "@arcgis/core/Graphic";
import SimpleLineSymbol from "@arcgis/core/symbols/SimpleLineSymbol";
import "@esri/calcite-components/dist/components/calcite-shell";
import { lazy, Suspense, useRef, useState } from "react";

import Collection from "@arcgis/core/core/Collection";
import {
  CalciteAction,
  CalciteLabel,
  CalciteLoader,
  CalciteOption,
  CalcitePanel,
  CalciteSelect,
  CalciteShell,
  CalciteShellPanel,
} from "@esri/calcite-components-react";
import "@esri/calcite-components/dist/components/calcite-action";
import "@esri/calcite-components/dist/components/calcite-label";
import "@esri/calcite-components/dist/components/calcite-loader";
import "@esri/calcite-components/dist/components/calcite-option";
import "@esri/calcite-components/dist/components/calcite-panel";
import "@esri/calcite-components/dist/components/calcite-select";
import "@esri/calcite-components/dist/components/calcite-shell";
import "@esri/calcite-components/dist/components/calcite-shell-panel";

const MapView = lazy(() => import("./MapView"));
const SceneView = lazy(() => import("./SceneView"));

interface SimpleLineSymbolPageProps {
  sceneView: boolean;
}
type CapOption = "butt" | "round" | "square";

const SimpleLineSymbolPage = ({ sceneView }: SimpleLineSymbolPageProps) => {
  const [simpleLineSymbol, setSimpleLineSymbol] = useState(
    new SimpleLineSymbol({
      cap: "round",
      color: "#000000",
      join: "round",
      marker: undefined,
      miterLimit: 2,
      style: "solid",
      width: 8,
    })
  );

  const polyline = new Polyline({
    paths: [
      [
        [-105.0, 40.0],
        [-105.1, 40.2],
        [-105.35, 40.1],
      ],
    ],
  });

  const polylineGraphic = new Graphic({
    geometry: polyline,
    symbol: simpleLineSymbol,
  });

  const graphicsCollection = new Collection();
  graphicsCollection.add(polylineGraphic);

  const [graphics, setGraphics] =
    useState<Collection<Graphic>>(graphicsCollection);

  let view = <MapView graphics={graphics} />;
  if (sceneView) {
    view = <SceneView graphics={graphics} />;
  }

  const capSelect = useRef(null);

  const handleCapChange = () => {
    if (capSelect.current) {
      const currentCapValue: CapOption = (
        capSelect.current as HTMLCalciteSelectElement
      ).value as CapOption;

      const newSimpleLineSymbol = simpleLineSymbol.clone();
      newSimpleLineSymbol.cap = currentCapValue;
      setSimpleLineSymbol(newSimpleLineSymbol);

      const newPolylineGraphic = graphics.getItemAt(0).clone();
      newPolylineGraphic.symbol = newSimpleLineSymbol;

      const newGraphics = new Collection();

      newGraphics.add(newPolylineGraphic);

      setGraphics(newGraphics);
    }
  };

  const handleCopyJSONClick = () => {
    navigator.clipboard.writeText(
      JSON.stringify(simpleLineSymbol.toJSON(), null, 2)
    );
  };

  const capOptions = ["round", "butt", "square"];

  return (
    <CalciteShell>
      <Suspense
        fallback={<CalciteLoader label="loading" text="laoding" active />}
      >
        {view}
      </Suspense>
      <CalciteShellPanel
        slot="panel-end"
        position="end"
        resizable
        widthScale="l"
      >
        <CalcitePanel>
          <div slot="header-content">Properties</div>
          <CalciteLabel layout="inline">
            cap:
            <CalciteSelect
              ref={capSelect}
              label={"cap selection"}
              onCalciteSelectChange={handleCapChange}
            >
              {capOptions.map((option, index) => (
                <CalciteOption key={index}>{option}</CalciteOption>
              ))}
            </CalciteSelect>
          </CalciteLabel>
        </CalcitePanel>
        <CalcitePanel>
          <div slot="header-content">JSON</div>
          <CalciteAction
            icon="copy-to-clipboard"
            label="Copy code to clipboard"
            text="Copy JSON"
            textEnabled
            slot="header-actions-end"
            onClick={handleCopyJSONClick}
          ></CalciteAction>
          <pre>{JSON.stringify(simpleLineSymbol.toJSON(), null, 2)}</pre>
        </CalcitePanel>
      </CalciteShellPanel>
    </CalciteShell>
  );
};

export default SimpleLineSymbolPage;
