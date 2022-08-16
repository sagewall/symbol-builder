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
import "@esri/calcite-components/dist/components/calcite-select";
import "@esri/calcite-components/dist/components/calcite-option";

setAssetPath("https://js.arcgis.com/calcite-components/1.0.0-beta.91/assets");

const panel = document.createElement(
  "calcite-panel"
) as HTMLCalcitePanelElement;

const accordian = document.createElement(
  "calcite-accordion"
) as HTMLCalciteAccordionElement;

// cap
const capAccordianItem = document.createElement(
  "calcite-accordion-item"
) as HTMLCalciteAccordionItemElement;
capAccordianItem.heading = "cap";
accordian.appendChild(capAccordianItem);

const capSelect = document.createElement(
  "calcite-select"
) as HTMLCalciteSelectElement;
capSelect.label = "cap selection";
capAccordianItem.appendChild(capSelect);

const capSelectOptionButt = document.createElement(
  "calcite-option"
) as HTMLCalciteOptionElement;
capSelectOptionButt.label = "butt";
capSelectOptionButt.innerText = "butt";
capSelect.appendChild(capSelectOptionButt);

const capSelectOptionRound = document.createElement(
  "calcite-option"
) as HTMLCalciteOptionElement;
capSelectOptionRound.label = "round";
capSelectOptionRound.innerText = "round";
capSelect.appendChild(capSelectOptionRound);

const capSelectOptionSquare = document.createElement(
  "calcite-option"
) as HTMLCalciteOptionElement;
capSelectOptionSquare.label = "square";
capSelectOptionSquare.innerText = "square";
capSelect.appendChild(capSelectOptionSquare);

// color
const colorAccordianItem = document.createElement(
  "calcite-accordion-item"
) as HTMLCalciteAccordionItemElement;
colorAccordianItem.heading = "color";
accordian.appendChild(colorAccordianItem);

const colorPicker = document.createElement(
  "calcite-color-picker"
) as HTMLCalciteColorPickerElement;
colorPicker.value = "#3eb33d";
colorAccordianItem.appendChild(colorPicker);

// join
const joinAccordianItem = document.createElement(
  "calcite-accordion-item"
) as HTMLCalciteAccordionItemElement;
joinAccordianItem.heading = "join";
accordian.appendChild(joinAccordianItem);

const joinSelect = document.createElement(
  "calcite-select"
) as HTMLCalciteSelectElement;
joinSelect.label = "join selection";
joinAccordianItem.appendChild(joinSelect);

const joinSelectOptionBevel = document.createElement(
  "calcite-option"
) as HTMLCalciteOptionElement;
joinSelectOptionBevel.label = "bevel";
joinSelectOptionBevel.innerText = "bevel";
joinSelect.appendChild(joinSelectOptionBevel);

const joinSelectOptionMiter = document.createElement(
  "calcite-option"
) as HTMLCalciteOptionElement;
joinSelectOptionMiter.label = "miter";
joinSelectOptionMiter.innerText = "miter";
joinSelect.appendChild(joinSelectOptionMiter);

const joinSelectOptionRound = document.createElement(
  "calcite-option"
) as HTMLCalciteOptionElement;
joinSelectOptionRound.label = "round";
joinSelectOptionRound.innerText = "round";
joinSelect.appendChild(joinSelectOptionRound);

panel.appendChild(accordian);

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

view.ui.add(panel, { position: "top-right" });

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

const handleCapChange = () => {
  simpleLineSymbol.cap = <"butt" | "round" | "square">capSelect.value;
  update();
};

capSelect.addEventListener("calciteSelectChange", () => {
  handleCapChange();
});

const handleColorChange = () => {
  simpleLineSymbol.color = new Color(colorPicker.value);
  update();
};

colorPicker.addEventListener("calciteColorPickerChange", handleColorChange);

const handleJoinChange = () => {
  simpleLineSymbol.join = <"round" | "miter" | "bevel">joinSelect.value;
  update();
};

joinSelect.addEventListener("calciteSelectChange", () => {
  handleJoinChange();
});

handleCapChange();
handleColorChange();
handleJoinChange();
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
