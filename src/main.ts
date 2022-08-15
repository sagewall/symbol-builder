import "./style.css";

import Color from "@arcgis/core/Color";
import Point from "@arcgis/core/geometry/Point";
import Polygon from "@arcgis/core/geometry/Polygon";
import Polyline from "@arcgis/core/geometry/Polyline";
import Graphic from "@arcgis/core/Graphic";
import GraphicsLayer from "@arcgis/core/layers/GraphicsLayer";
import Map from "@arcgis/core/Map";
import SimpleFillSymbol from "@arcgis/core/symbols/SimpleFillSymbol";
import SimpleLineSymbol from "@arcgis/core/symbols/SimpleLineSymbol";
import SimpleMarkerSymbol from "@arcgis/core/symbols/SimpleMarkerSymbol";
import MapView from "@arcgis/core/views/MapView";
import { setAssetPath } from "@esri/calcite-components/dist/components";
import "@esri/calcite-components/dist/components/calcite-color-picker";

setAssetPath("https://js.arcgis.com/calcite-components/1.0.0-beta.91/assets");

const simpleLineSymbolColorPicker = document.createElement(
  "calcite-color-picker"
) as HTMLCalciteColorPickerElement;

const simpleLineSymbol = new SimpleLineSymbol();

const simpleMarkerSymbol = new SimpleMarkerSymbol({
  outline: simpleLineSymbol,
});

const simpleFillSymbol = new SimpleFillSymbol({
  outline: simpleLineSymbol,
});

const map = new Map({
  basemap: "hybrid",
});

const view = new MapView({
  center: [-80, 35],
  container: "viewDiv",
  map: map,
  zoom: 3,
});

view.ui.add(simpleLineSymbolColorPicker, { position: "top-right" });

const graphicsLayer = new GraphicsLayer();
map.add(graphicsLayer);

const point = new Point({
  longitude: -49.97,
  latitude: 41.73,
});

const pointGraphic = new Graphic({
  geometry: point,
  symbol: simpleMarkerSymbol,
});

const polyline = new Polyline({
  paths: [
    [
      [-111.3, 52.68],
      [-98, 49.5],
      [-93.94, 29.89],
    ],
  ],
});

const polylineGraphic = new Graphic({
  geometry: polyline,
  symbol: simpleLineSymbol,
});

const polygon = new Polygon({
  rings: [
    [
      [-64.78, 32.3],
      [-66.07, 18.45],
      [-80.21, 25.78],
      [-64.78, 32.3],
    ],
  ],
});

const polygonGraphic = new Graphic({
  geometry: polygon,
  symbol: simpleFillSymbol,
});

const update = () => {
  // Why doesn't this work???
  // pointGraphic.symbol = simpleMarkerSymbol;
  // polylineGraphic.symbol = simpleLineSymbol;
  // polygonGraphic.symbol = simpleFillSymbol;

  // graphicsLayer.graphics.removeAll();

  // graphicsLayer.graphics.addMany([
  //   pointGraphic,
  //   polylineGraphic,
  //   polygonGraphic,
  // ]);

  const newPointGraphic = pointGraphic.clone();
  const newPolylineGraphic = polylineGraphic.clone();
  const newPolygonGraphic = polygonGraphic.clone();

  newPointGraphic.symbol = simpleMarkerSymbol;
  newPolylineGraphic.symbol = simpleLineSymbol;
  newPolygonGraphic.symbol = simpleFillSymbol;

  graphicsLayer.graphics.removeAll();

  graphicsLayer.graphics.addMany([
    newPointGraphic,
    newPolylineGraphic,
    newPolygonGraphic,
  ]);
};

const handleSimpleLineSymbolColorPickerChange = () => {
  simpleLineSymbol.color = new Color(simpleLineSymbolColorPicker.value);
  update();
};

simpleLineSymbolColorPicker.addEventListener(
  "calciteColorPickerChange",
  handleSimpleLineSymbolColorPickerChange
);

handleSimpleLineSymbolColorPickerChange();
update();

// For debugging
view.whenLayerView(graphicsLayer).then((graphicsLayerView) => {
  graphicsLayerView.watch("updating", function (updating) {
    if (!updating) {
      graphicsLayerView.queryGraphics().then((graphics) => {
        console.log(graphics);
      });
    }
  });
});
