import "./style.css";

import Basemap from "@arcgis/core/Basemap";
import Color from "@arcgis/core/Color";
import Polyline from "@arcgis/core/geometry/Polyline";
import Graphic from "@arcgis/core/Graphic";
import GraphicsLayer from "@arcgis/core/layers/GraphicsLayer";
import VectorTileLayer from "@arcgis/core/layers/VectorTileLayer";
import Map from "@arcgis/core/Map";
import LineSymbolMarker from "@arcgis/core/symbols/LineSymbolMarker";
import SimpleLineSymbol from "@arcgis/core/symbols/SimpleLineSymbol";
import MapView from "@arcgis/core/views/MapView";
import BasemapGallery from "@arcgis/core/widgets/BasemapGallery";
import LocalBasemapsSource from "@arcgis/core/widgets/BasemapGallery/support/LocalBasemapsSource";
import Expand from "@arcgis/core/widgets/Expand";
import { setAssetPath } from "@esri/calcite-components/dist/components";
import "@esri/calcite-components/dist/components/calcite-accordion";
import "@esri/calcite-components/dist/components/calcite-accordion-item";
import "@esri/calcite-components/dist/components/calcite-color-picker";
import "@esri/calcite-components/dist/components/calcite-input-number";
import "@esri/calcite-components/dist/components/calcite-option";
import "@esri/calcite-components/dist/components/calcite-panel";
import "@esri/calcite-components/dist/components/calcite-select";
import "@esri/calcite-components/dist/components/calcite-shell";
import "@esri/calcite-components/dist/components/calcite-shell-panel";
import "@esri/calcite-components/dist/components/calcite-switch";

setAssetPath("https://js.arcgis.com/calcite-components/1.0.0-beta.91/assets");

const app = document.querySelector("#app") as HTMLDivElement;

const shell = document.createElement("calcite-shell");
app.appendChild(shell);

const headerDiv = document.createElement("div") as HTMLDivElement;
headerDiv.slot = "header";
shell.appendChild(headerDiv);

const header = document.createElement("header") as HTMLElement;
headerDiv.appendChild(header);

const h1 = document.createElement("h1") as HTMLHeadingElement;
h1.innerText = "SimpleLineSymbol";
header.appendChild(h1);

const propertiesShellPanel = document.createElement("calcite-shell-panel");
propertiesShellPanel.id = "propertiesShellPanel";
propertiesShellPanel.slot = "panel-end";
propertiesShellPanel.position = "end";
propertiesShellPanel.widthScale = "l";
shell.appendChild(propertiesShellPanel);

const h2 = document.createElement("h2") as HTMLHeadingElement;
h2.innerText = "Properties";
propertiesShellPanel.appendChild(h2);

const viewDiv = document.createElement("div") as HTMLDivElement;
viewDiv.id = "viewDiv";
shell.appendChild(viewDiv);

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
capSelect.value = "round";
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
capSelectOptionRound.selected = true;
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
colorPicker.value = "#000000";
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
joinSelect.value = "round";
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
joinSelectOptionRound.selected = true;
joinSelect.appendChild(joinSelectOptionRound);

// marker
const markerAccordianItem = document.createElement(
  "calcite-accordion-item"
) as HTMLCalciteAccordionItemElement;
markerAccordianItem.heading = "marker: null";
accordian.appendChild(markerAccordianItem);

const markerSwitchLabel = document.createElement("label") as HTMLLabelElement;
markerSwitchLabel.innerText = "Add Marker";
markerAccordianItem.appendChild(markerSwitchLabel);

const markerSwitch = document.createElement(
  "calcite-switch"
) as HTMLCalciteSwitchElement;
markerSwitchLabel.appendChild(markerSwitch);

const markerAccordian = document.createElement(
  "calcite-accordion"
) as HTMLCalciteAccordionElement;
markerAccordianItem.appendChild(markerAccordian);

// marker color
const markerColorAccordianItem = document.createElement(
  "calcite-accordion-item"
) as HTMLCalciteAccordionItemElement;
markerColorAccordianItem.heading = "color";
markerAccordian.appendChild(markerColorAccordianItem);

const markerColorPicker = document.createElement(
  "calcite-color-picker"
) as HTMLCalciteColorPickerElement;
markerColorPicker.value = "#ff0000";
markerColorAccordianItem.appendChild(markerColorPicker);

// marker placement
const markerPlacementAccordianItem = document.createElement(
  "calcite-accordion-item"
) as HTMLCalciteAccordionItemElement;
markerPlacementAccordianItem.heading = "placement";
markerAccordian.appendChild(markerPlacementAccordianItem);

const makerPlacementSelect = document.createElement(
  "calcite-select"
) as HTMLCalciteSelectElement;
makerPlacementSelect.label = "style selection";
makerPlacementSelect.value = "begin-end";
markerPlacementAccordianItem.appendChild(makerPlacementSelect);

const makerPlacementSelectOptionBegin = document.createElement(
  "calcite-option"
) as HTMLCalciteOptionElement;
makerPlacementSelectOptionBegin.label = "begin";
makerPlacementSelectOptionBegin.innerText = "begin";
makerPlacementSelect.appendChild(makerPlacementSelectOptionBegin);

const makerPlacementSelectOptionEnd = document.createElement(
  "calcite-option"
) as HTMLCalciteOptionElement;
makerPlacementSelectOptionEnd.label = "end";
makerPlacementSelectOptionEnd.innerText = "end";
makerPlacementSelect.appendChild(makerPlacementSelectOptionEnd);

const makerPlacementSelectOptionBeginEnd = document.createElement(
  "calcite-option"
) as HTMLCalciteOptionElement;
makerPlacementSelectOptionBeginEnd.label = "begin-end";
makerPlacementSelectOptionBeginEnd.innerText = "begin-end";
makerPlacementSelectOptionBeginEnd.selected = true;
makerPlacementSelect.appendChild(makerPlacementSelectOptionBeginEnd);

// marker placement
const markerStyleAccordianItem = document.createElement(
  "calcite-accordion-item"
) as HTMLCalciteAccordionItemElement;
markerStyleAccordianItem.heading = "style";
markerAccordian.appendChild(markerStyleAccordianItem);

const makerStyleSelect = document.createElement(
  "calcite-select"
) as HTMLCalciteSelectElement;
makerStyleSelect.label = "marker style selection";
makerStyleSelect.value = "arrow";
markerStyleAccordianItem.appendChild(makerStyleSelect);

const makerStyleSelectOptionArrow = document.createElement(
  "calcite-option"
) as HTMLCalciteOptionElement;
makerStyleSelectOptionArrow.label = "arrow";
makerStyleSelectOptionArrow.innerText = "arrow";
makerStyleSelectOptionArrow.selected = true;
makerStyleSelect.appendChild(makerStyleSelectOptionArrow);

const makerStyleSelectOptionCircle = document.createElement(
  "calcite-option"
) as HTMLCalciteOptionElement;
makerStyleSelectOptionCircle.label = "circle";
makerStyleSelectOptionCircle.innerText = "circle";
makerStyleSelect.appendChild(makerStyleSelectOptionCircle);

const makerStyleSelectOptionSquare = document.createElement(
  "calcite-option"
) as HTMLCalciteOptionElement;
makerStyleSelectOptionSquare.label = "square";
makerStyleSelectOptionSquare.innerText = "square";
makerStyleSelect.appendChild(makerStyleSelectOptionSquare);

const makerStyleSelectOptionDiamond = document.createElement(
  "calcite-option"
) as HTMLCalciteOptionElement;
makerStyleSelectOptionDiamond.label = "diamond";
makerStyleSelectOptionDiamond.innerText = "diamond";
makerStyleSelect.appendChild(makerStyleSelectOptionDiamond);

const makerStyleSelectOptionCross = document.createElement(
  "calcite-option"
) as HTMLCalciteOptionElement;
makerStyleSelectOptionCross.label = "cross";
makerStyleSelectOptionCross.innerText = "cross";
makerStyleSelect.appendChild(makerStyleSelectOptionCross);

const makerStyleSelectOptionX = document.createElement(
  "calcite-option"
) as HTMLCalciteOptionElement;
makerStyleSelectOptionX.label = "x";
makerStyleSelectOptionX.innerText = "x";
makerStyleSelect.appendChild(makerStyleSelectOptionX);

// miterLimit
const miterLimitAccordianItem = document.createElement(
  "calcite-accordion-item"
) as HTMLCalciteAccordionItemElement;
miterLimitAccordianItem.heading = "miterLimit";
accordian.appendChild(miterLimitAccordianItem);

const miterLimitInputNumber = document.createElement(
  "calcite-input-number"
) as HTMLCalciteInputNumberElement;
miterLimitInputNumber.value = "2";
miterLimitAccordianItem.appendChild(miterLimitInputNumber);

// style
const styleAccordianItem = document.createElement(
  "calcite-accordion-item"
) as HTMLCalciteAccordionItemElement;
styleAccordianItem.heading = "style";
accordian.appendChild(styleAccordianItem);

const styleSelect = document.createElement(
  "calcite-select"
) as HTMLCalciteSelectElement;
styleSelect.label = "style selection";
styleSelect.value = "solid";
styleAccordianItem.appendChild(styleSelect);

const styleSelectOptionDash = document.createElement(
  "calcite-option"
) as HTMLCalciteOptionElement;
styleSelectOptionDash.label = "dash";
styleSelectOptionDash.innerText = "dash";
styleSelect.appendChild(styleSelectOptionDash);

const styleSelectOptionDashDot = document.createElement(
  "calcite-option"
) as HTMLCalciteOptionElement;
styleSelectOptionDashDot.label = "dash-dot";
styleSelectOptionDashDot.innerText = "dash-dot";
styleSelect.appendChild(styleSelectOptionDashDot);

const styleSelectOptionDot = document.createElement(
  "calcite-option"
) as HTMLCalciteOptionElement;
styleSelectOptionDot.label = "dot";
styleSelectOptionDot.innerText = "dot";
styleSelect.appendChild(styleSelectOptionDot);

const styleSelectOptionLongDash = document.createElement(
  "calcite-option"
) as HTMLCalciteOptionElement;
styleSelectOptionLongDash.label = "long-dash";
styleSelectOptionLongDash.innerText = "long-dash";
styleSelect.appendChild(styleSelectOptionLongDash);

const styleSelectOptionLongDashDot = document.createElement(
  "calcite-option"
) as HTMLCalciteOptionElement;
styleSelectOptionLongDashDot.label = "long-dash-dot";
styleSelectOptionLongDashDot.innerText = "long-dash-dot";
styleSelect.appendChild(styleSelectOptionLongDashDot);

const styleSelectOptionLongDashDotDot = document.createElement(
  "calcite-option"
) as HTMLCalciteOptionElement;
styleSelectOptionLongDashDotDot.label = "long-dash-dot-dot";
styleSelectOptionLongDashDotDot.innerText = "long-dash-dot-dot";
styleSelect.appendChild(styleSelectOptionLongDashDotDot);

const styleSelectOptionNone = document.createElement(
  "calcite-option"
) as HTMLCalciteOptionElement;
styleSelectOptionNone.label = "none";
styleSelectOptionNone.innerText = "none";
styleSelect.appendChild(styleSelectOptionNone);

const styleSelectOptionShortDash = document.createElement(
  "calcite-option"
) as HTMLCalciteOptionElement;
styleSelectOptionShortDash.label = "short-dash";
styleSelectOptionShortDash.innerText = "short-dash";
styleSelect.appendChild(styleSelectOptionShortDash);

const styleSelectOptionShortDashDot = document.createElement(
  "calcite-option"
) as HTMLCalciteOptionElement;
styleSelectOptionShortDashDot.label = "short-dash-dot";
styleSelectOptionShortDashDot.innerText = "short-dash-dot";
styleSelect.appendChild(styleSelectOptionShortDashDot);

const styleSelectOptionShortDashDotDot = document.createElement(
  "calcite-option"
) as HTMLCalciteOptionElement;
styleSelectOptionShortDashDotDot.label = "short-dash-dot-dot";
styleSelectOptionShortDashDotDot.innerText = "short-dash-dot-dot";
styleSelect.appendChild(styleSelectOptionShortDashDotDot);

const styleSelectOptionShortDot = document.createElement(
  "calcite-option"
) as HTMLCalciteOptionElement;
styleSelectOptionShortDot.label = "short-dot";
styleSelectOptionShortDot.innerText = "short-dot";
styleSelect.appendChild(styleSelectOptionShortDot);

const styleSelectOptionShortSolid = document.createElement(
  "calcite-option"
) as HTMLCalciteOptionElement;
styleSelectOptionShortSolid.label = "solid";
styleSelectOptionShortSolid.innerText = "solid";
styleSelectOptionShortSolid.selected = true;
styleSelect.appendChild(styleSelectOptionShortSolid);

// width
const widthAccordianItem = document.createElement(
  "calcite-accordion-item"
) as HTMLCalciteAccordionItemElement;
widthAccordianItem.heading = "width";
accordian.appendChild(widthAccordianItem);

const widthInputNumber = document.createElement(
  "calcite-input-number"
) as HTMLCalciteInputNumberElement;
widthInputNumber.value = "0.75";
widthAccordianItem.appendChild(widthInputNumber);

propertiesShellPanel.appendChild(accordian);

const lineSymbolMarker = new LineSymbolMarker();
const simpleLineSymbol = new SimpleLineSymbol();
// simpleLineSymbol.marker = lineSymbolMarker;

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

const map = new Map({
  basemap: blankBasemap,
});

const mapView = new MapView({
  center: [-98, 49.5],
  container: viewDiv,
  map: map,
  zoom: 3,
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
  view: mapView,
  source: localBasemapsSource,
});

const basemapGalleryExpand = new Expand({
  view: mapView,
  content: basemapGallery,
});

mapView.ui.add(basemapGalleryExpand, {
  position: "top-left",
});

const graphicsLayer = new GraphicsLayer();
map.add(graphicsLayer);
mapView.goTo(graphicsLayer.graphics);

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
  capAccordianItem.heading = `cap: "${capSelect.value}"`;
  update();
};

capSelect.addEventListener("calciteSelectChange", () => {
  handleCapChange();
});

const handleColorChange = () => {
  simpleLineSymbol.color = new Color(colorPicker.value);
  colorAccordianItem.heading = `color: "${colorPicker.value}"`;
  update();
};

colorPicker.addEventListener("calciteColorPickerChange", handleColorChange);

const handleJoinChange = () => {
  simpleLineSymbol.join = <"round" | "miter" | "bevel">joinSelect.value;
  joinAccordianItem.heading = `join: "${joinSelect.value}"`;
  update();
};

joinSelect.addEventListener("calciteSelectChange", () => {
  handleJoinChange();
});

const handleMarkerSwitchChange = () => {
  if (markerSwitch.checked) {
    simpleLineSymbol.marker = lineSymbolMarker;
    markerAccordianItem.heading = `marker: ${JSON.stringify(lineSymbolMarker)}`;
  } else {
    // @ts-ignore
    simpleLineSymbol.marker = null;
    markerAccordianItem.heading = `marker: null`;
  }
  update();
};

markerSwitch.addEventListener("calciteSwitchChange", handleMarkerSwitchChange);

const handleMarkerColorChange = () => {
  lineSymbolMarker.color = new Color(markerColorPicker.value);
  markerColorAccordianItem.heading = `color: "${markerColorPicker.value}"`;
  update();
};

markerColorPicker.addEventListener(
  "calciteColorPickerChange",
  handleMarkerColorChange
);

const handleMarkerPlacementChange = () => {
  lineSymbolMarker.placement = <"begin" | "end" | "begin-end">(
    makerPlacementSelect.value
  );
  markerPlacementAccordianItem.heading = `placement: "${makerPlacementSelect.value}"`;
  update();
};

makerPlacementSelect.addEventListener("calciteSelectChange", () => {
  handleMarkerPlacementChange();
});

const handleMarkerStyleChange = () => {
  lineSymbolMarker.style = <
    "square" | "arrow" | "circle" | "diamond" | "cross" | "x"
  >makerStyleSelect.value;
  markerStyleAccordianItem.heading = `style "${makerStyleSelect.value}"`;
  update();
};

makerStyleSelect.addEventListener("calciteSelectChange", () => {
  handleMarkerStyleChange();
});

const handleMiterLimitChange = () => {
  simpleLineSymbol.miterLimit = Number(miterLimitInputNumber.value);
  miterLimitAccordianItem.heading = `miterLimit: ${miterLimitInputNumber.value}`;
  update();
};

miterLimitInputNumber.addEventListener("calciteInputNumberChange", () => {
  handleMiterLimitChange();
});

const handleStyleChange = () => {
  simpleLineSymbol.style = <
    | "dash"
    | "dash-dot"
    | "dot"
    | "long-dash"
    | "long-dash-dot"
    | "long-dash-dot-dot"
    | "none"
    | "short-dash"
    | "short-dash-dot"
    | "short-dash-dot-dot"
    | "short-dot"
    | "solid"
  >styleSelect.value;
  styleAccordianItem.heading = `style: "${styleSelect.value}"`;
  update();
};

styleSelect.addEventListener("calciteSelectChange", () => {
  handleStyleChange();
});

const handleWidthChange = () => {
  simpleLineSymbol.width = Number(widthInputNumber.value);
  widthAccordianItem.heading = `width: ${widthInputNumber.value}`;
  update();
};

widthInputNumber.addEventListener("calciteInputNumberChange", () => {
  handleWidthChange();
});

handleCapChange();
handleColorChange();
handleJoinChange();
handleMarkerColorChange();
handleMarkerPlacementChange();
handleMarkerStyleChange();
handleMiterLimitChange();
handleStyleChange();
handleWidthChange();
update();

// For debugging
mapView.whenLayerView(graphicsLayer).then((graphicsLayerView) => {
  graphicsLayerView.watch("updating", function (updating) {
    if (!updating) {
      graphicsLayerView.queryGraphics().then((graphics) => {
        console.log(graphics);
      });
    }
  });
});
