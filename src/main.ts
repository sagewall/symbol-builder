import "./style.css";

import Color from "@arcgis/core/Color";
import Polyline from "@arcgis/core/geometry/Polyline";
import Graphic from "@arcgis/core/Graphic";
import GraphicsLayer from "@arcgis/core/layers/GraphicsLayer";
import Map from "@arcgis/core/Map";
import SimpleLineSymbol from "@arcgis/core/symbols/SimpleLineSymbol";
import MapView from "@arcgis/core/views/MapView";
import BasemapGallery from "@arcgis/core/widgets/BasemapGallery";
import Expand from "@arcgis/core/widgets/Expand";
import { setAssetPath } from "@esri/calcite-components/dist/components";
import "@esri/calcite-components/dist/components/calcite-accordion";
import "@esri/calcite-components/dist/components/calcite-accordion-item";
import "@esri/calcite-components/dist/components/calcite-color-picker";
import "@esri/calcite-components/dist/components/calcite-panel";

setAssetPath("https://js.arcgis.com/calcite-components/1.0.0-beta.91/assets");

const simpleLineSymbolPanel = document.createElement(
  "calcite-panel"
) as HTMLCalcitePanelElement;

const simpleLineSymbolAccordian = document.createElement(
  "calcite-accordion"
) as HTMLCalciteAccordionElement;

const simpleLineSymbolAccordianItem = document.createElement(
  "calcite-accordion-item"
) as HTMLCalciteAccordionItemElement;
simpleLineSymbolAccordianItem.heading = "Color";
simpleLineSymbolAccordian.appendChild(simpleLineSymbolAccordianItem);

const simpleLineSymbolColorPicker = document.createElement(
  "calcite-color-picker"
) as HTMLCalciteColorPickerElement;
simpleLineSymbolColorPicker.value = "#3eb33d";
simpleLineSymbolAccordianItem.appendChild(simpleLineSymbolColorPicker);

simpleLineSymbolPanel.appendChild(simpleLineSymbolAccordian);

const simpleLineSymbol = new SimpleLineSymbol();

const map = new Map({
  basemap: "hybrid",
});

const view = new MapView({
  center: [-80, 35],
  container: "viewDiv",
  map: map,
  zoom: 3,
});

const basemapGallery = new BasemapGallery({
  view,
});

const basemapGalleryExpand = new Expand({
  view: view,
  content: basemapGallery,
});

view.ui.add(basemapGalleryExpand, {
  position: "top-left",
});

view.ui.add(simpleLineSymbolPanel, { position: "top-right" });

const graphicsLayer = new GraphicsLayer();
map.add(graphicsLayer);

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

const update = () => {
  const newPolylineGraphic = polylineGraphic.clone();
  newPolylineGraphic.symbol = simpleLineSymbol;
  graphicsLayer.graphics.removeAll();
  graphicsLayer.graphics.add(newPolylineGraphic);
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
