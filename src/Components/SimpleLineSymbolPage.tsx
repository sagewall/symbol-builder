import Polyline from "@arcgis/core/geometry/Polyline";
import Graphic from "@arcgis/core/Graphic";
import SimpleLineSymbol from "@arcgis/core/symbols/SimpleLineSymbol";
import "@esri/calcite-components/dist/components/calcite-shell";
import { useEffect, useRef, useState } from "react";

import {
  CalciteAction,
  CalciteLabel,
  CalcitePanel,
  CalciteShell,
  CalciteShellPanel,
  CalciteSelect,
  CalciteOption,
} from "@esri/calcite-components-react";
import "@esri/calcite-components/dist/components/calcite-action";
import "@esri/calcite-components/dist/components/calcite-label";
import "@esri/calcite-components/dist/components/calcite-panel";
import "@esri/calcite-components/dist/components/calcite-select";
import "@esri/calcite-components/dist/components/calcite-shell";
import "@esri/calcite-components/dist/components/calcite-option";
import "@esri/calcite-components/dist/components/calcite-shell-panel";
import MapView from "./MapView";
import SceneView from "./SceneView";
import VectorTileLayer from "@arcgis/core/layers/VectorTileLayer";
import Basemap from "@arcgis/core/Basemap";
import ArcMap from "@arcgis/core/Map";
import ArcMapView from "@arcgis/core/views/MapView";
import LocalBasemapsSource from "@arcgis/core/widgets/BasemapGallery/support/LocalBasemapsSource";
import BasemapGallery from "@arcgis/core/widgets/BasemapGallery";
import Expand from "@arcgis/core/widgets/Expand";

interface SimpleLineSymbolPageProps {
  sceneView: boolean;
}
type CapOption = "butt" | "round" | "square";

function SimpleLineSymbolPage({ sceneView }: SimpleLineSymbolPageProps) {
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

  const capSelect = useRef(null);

  // let view = <MapView graphics={[polylineGraphic]} />;
  // if (sceneView) {
  //   view = <SceneView graphics={[polylineGraphic]} />;
  // }

  const viewDiv = useRef(null);

  function handleCopyJSONClick() {
    navigator.clipboard.writeText(
      JSON.stringify(simpleLineSymbol.toJSON(), null, 2)
    );
  }

  function handleCapChange() {
    if (capSelect.current) {
      const currentValue: CapOption = (
        capSelect.current as HTMLCalciteSelectElement
      ).value as CapOption;
      console.log(currentValue);

      const newSimpleLineSymbol = simpleLineSymbol.clone();
      newSimpleLineSymbol.cap = currentValue;
      setSimpleLineSymbol(newSimpleLineSymbol);

      const newPolylineGraphic = polylineGraphic.clone();
      newPolylineGraphic.symbol = newSimpleLineSymbol;
      setPolylineGraphic(newPolylineGraphic);
    }
  }

  const capOptions = ["butt", "round", "square"];

  useEffect(() => {
    if (viewDiv.current) {
      const blankBasemapVectorTileLayer = new VectorTileLayer({
        portalItem: {
          id: "da7c2aa6b22a439fae31294413b5bc62",
        },
      });

      const blankBasemap = new Basemap({
        baseLayers: [blankBasemapVectorTileLayer],
        thumbnailUrl:
          "https://jsapi.maps.arcgis.com/sharing/rest/content/items/da7c2aa6b22a439fae31294413b5bc62/info/thumbnail/thumbnail1660688993675.png",
        title: "Blank",
      });

      const map = new ArcMap({
        basemap: blankBasemap,
      });

      const view = new ArcMapView({
        container: viewDiv.current,
        graphics: [polylineGraphic],
        map,
      });

      const localBasemapsSource = new LocalBasemapsSource({
        basemaps: [
          blankBasemap,
          Basemap.fromId("satellite"),
          Basemap.fromId("hybrid"),
          Basemap.fromId("oceans"),
          Basemap.fromId("osm"),
          Basemap.fromId("terrain"),
          Basemap.fromId("dark-gray-vector"),
          Basemap.fromId("gray-vector"),
          Basemap.fromId("streets-vector"),
          Basemap.fromId("streets-night-vector"),
          Basemap.fromId("streets-navigation-vector"),
          Basemap.fromId("topo-vector"),
          Basemap.fromId("streets-relief-vector"),
        ],
      });

      const basemapGallery = new BasemapGallery({
        view,
        source: localBasemapsSource,
      });

      const basemapGalleryExpand = new Expand({
        view,
        content: basemapGallery,
      });

      view.ui.add(basemapGalleryExpand, {
        position: "top-left",
      });

      view.when().then(() => {
        view.goTo(view.graphics);
      });
    }
  }, [polylineGraphic]);

  return (
    <CalciteShell>
      <div className="viewDiv" ref={viewDiv}></div>;
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
              {capOptions.map((option) => (
                <CalciteOption key={option}>{option}</CalciteOption>
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
}

export default SimpleLineSymbolPage;
