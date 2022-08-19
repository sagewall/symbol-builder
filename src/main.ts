import Basemap from "@arcgis/core/Basemap";
import VectorTileLayer from "@arcgis/core/layers/VectorTileLayer";
import ArcMap from "@arcgis/core/Map";
import MapView from "@arcgis/core/views/MapView";
import type View from "@arcgis/core/views/View";
import BasemapGallery from "@arcgis/core/widgets/BasemapGallery";
import LocalBasemapsSource from "@arcgis/core/widgets/BasemapGallery/support/LocalBasemapsSource";
import Expand from "@arcgis/core/widgets/Expand";
import { setAssetPath } from "@esri/calcite-components/dist/components";
import "@esri/calcite-components/dist/components/calcite-action";
import "@esri/calcite-components/dist/components/calcite-option";
import "@esri/calcite-components/dist/components/calcite-panel";
import "@esri/calcite-components/dist/components/calcite-select";
import "@esri/calcite-components/dist/components/calcite-shell";
import "@esri/calcite-components/dist/components/calcite-shell-panel";
import SimpleFillSymbolPlayground from "./lib/SimpleFillSymbolPlayground";
import SimpleLineSymbolPlayground from "./lib/SimpleLineSymbolPlayground";
import "./style.css";

setAssetPath("https://js.arcgis.com/calcite-components/1.0.0-beta.92/assets");

let activeView: View | null = null;

const app = document.querySelector("#app") as HTMLDivElement;

const shell = document.createElement("calcite-shell");
app.appendChild(shell);

const headerDiv = document.createElement("div") as HTMLDivElement;
headerDiv.slot = "header";
shell.appendChild(headerDiv);

const header = document.createElement("header") as HTMLElement;
headerDiv.appendChild(header);

const h1 = document.createElement("h1") as HTMLHeadingElement;
h1.innerText = "Symbol Playground";
header.appendChild(h1);

const symbolSelect = document.createElement(
  "calcite-select"
) as HTMLCalciteSelectElement;
symbolSelect.label = "select symbol";
symbolSelect.value = "SimpleFillSymbol";
header.appendChild(symbolSelect);

symbolSelect.addEventListener("calciteSelectChange", () => {
  handleSymbolSelectChange();
});

const symbolSelectOptionSimpleLineSymbol = document.createElement(
  "calcite-option"
) as HTMLCalciteOptionElement;
symbolSelectOptionSimpleLineSymbol.innerText = "SimpleLineSymbol";
symbolSelectOptionSimpleLineSymbol.label = "SimpleLineSymbol";
symbolSelect.appendChild(symbolSelectOptionSimpleLineSymbol);

const symbolSelectOptionSimpleFillSymbol = document.createElement(
  "calcite-option"
) as HTMLCalciteOptionElement;
symbolSelectOptionSimpleFillSymbol.innerText = "SimpleFillSymbol";
symbolSelectOptionSimpleFillSymbol.label = "SimpleFillSymbol";
symbolSelectOptionSimpleFillSymbol.selected = true;
symbolSelect.appendChild(symbolSelectOptionSimpleFillSymbol);

const propertiesShellPanel = document.createElement(
  "calcite-shell-panel"
) as HTMLCalciteShellPanelElement;
propertiesShellPanel.id = "propertiesShellPanel";
propertiesShellPanel.slot = "panel-end";
propertiesShellPanel.position = "end";
propertiesShellPanel.resizable = true;
propertiesShellPanel.widthScale = "l";
shell.appendChild(propertiesShellPanel);

const viewDiv = document.createElement("div") as HTMLDivElement;
viewDiv.id = "viewDiv";
shell.appendChild(viewDiv);

const propertiesPanel = document.createElement("calcite-panel");
propertiesShellPanel.appendChild(propertiesPanel);

const codePanel = document.createElement("calcite-panel");
propertiesShellPanel.appendChild(codePanel);

const codePanelHeaderContent = document.createElement("div");
codePanelHeaderContent.slot = "header-content";
codePanelHeaderContent.innerText = "Code";
codePanel.appendChild(codePanelHeaderContent);

const copyCodeAction = document.createElement("calcite-action");
copyCodeAction.icon = "copy-to-clipboard";
copyCodeAction.label = "Copy code to clipboard";
copyCodeAction.slot = "header-actions-end";
copyCodeAction.text = "Copy code to clipboard";
copyCodeAction.textEnabled = true;
codePanel.appendChild(copyCodeAction);

copyCodeAction.addEventListener("click", () => {
  handleCopyCodeActionClick();
});

const codeOutputParagraph = document.createElement("p");
codeOutputParagraph.classList.add("code");
codePanel.appendChild(codeOutputParagraph);

const reset = () => {
  while (codeOutputParagraph.firstChild) {
    codeOutputParagraph.removeChild(codeOutputParagraph.firstChild);
  }

  while (propertiesPanel.firstChild) {
    propertiesPanel.removeChild(propertiesPanel.firstChild);
  }

  if (activeView) {
    activeView.destroy();
  }
};

const handleSymbolSelectChange = () => {
  reset();

  if (symbolSelect.value === "SimpleLineSymbol") {
    const mapView = createMapView();
    new SimpleLineSymbolPlayground(
      propertiesPanel,
      codeOutputParagraph,
      mapView
    );
  }

  if (symbolSelect.value === "SimpleFillSymbol") {
    const mapView = createMapView();
    new SimpleFillSymbolPlayground(
      propertiesPanel,
      codeOutputParagraph,
      mapView
    );
  }
};

const handleCopyCodeActionClick = () => {
  navigator.clipboard.writeText(codeOutputParagraph.innerText);
};

const createMapView = () => {
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

  const mapView = new MapView({
    container: viewDiv,
    map,
  });

  activeView = mapView;

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

  // For debugging
  mapView.when().then(() => {
    mapView.graphics.watch("updating", function (updating) {
      if (!updating) {
        console.log(mapView.graphics);
      }
    });
  });

  return mapView;
};

handleSymbolSelectChange();
