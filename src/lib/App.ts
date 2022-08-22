import Basemap from "@arcgis/core/Basemap";
import VectorTileLayer from "@arcgis/core/layers/VectorTileLayer";
import ArcMap from "@arcgis/core/Map";
import MapView from "@arcgis/core/views/MapView";
import type View from "@arcgis/core/views/View";
import BasemapGallery from "@arcgis/core/widgets/BasemapGallery";
import LocalBasemapsSource from "@arcgis/core/widgets/BasemapGallery/support/LocalBasemapsSource";
import Expand from "@arcgis/core/widgets/Expand";
import SimpleFillSymbolPlayground from "./SimpleFillSymbolPlayground";
import SimpleLineSymbolPlayground from "./SimpleLineSymbolPlayground";

class App {
  activeView: View | null;
  copyCodeAction: HTMLCalciteActionElement;
  codeOutputParagraph: HTMLParagraphElement;
  codePanel: HTMLCalcitePanelElement;
  codePanelHeaderContent: HTMLDivElement;
  header: HTMLElement;
  headerDiv: HTMLDivElement;
  heading: HTMLHeadingElement;
  parentElement: HTMLElement;
  propertiesPanel: HTMLCalcitePanelElement;
  propertiesShellPanel: HTMLCalciteShellPanelElement;
  shell: HTMLCalciteShellElement;
  symbolSelect: HTMLCalciteSelectElement;
  symbolSelectOptions: string[];
  viewDiv: HTMLDivElement;

  constructor(parentElement: HTMLElement) {
    this.parentElement = parentElement;

    this.activeView = null;

    this.shell = document.createElement("calcite-shell");
    this.parentElement.appendChild(this.shell);

    this.headerDiv = document.createElement("div") as HTMLDivElement;
    this.headerDiv.slot = "header";
    this.shell.appendChild(this.headerDiv);

    this.header = document.createElement("header") as HTMLElement;
    this.headerDiv.appendChild(this.header);

    this.heading = document.createElement("h1") as HTMLHeadingElement;
    this.heading.innerText = "Symbol Playground";
    this.header.appendChild(this.heading);

    this.symbolSelect = document.createElement(
      "calcite-select"
    ) as HTMLCalciteSelectElement;
    this.symbolSelect.label = "select symbol";
    this.symbolSelect.value = "SimpleFillSymbol";
    this.header.appendChild(this.symbolSelect);

    this.symbolSelect.addEventListener("calciteSelectChange", () => {
      this.handleSymbolSelectChange();
    });

    this.symbolSelectOptions = ["SimpleLineSymbol", "SimpleFillSymbol"];

    this.symbolSelectOptions.forEach((option) => {
      const selectOption = document.createElement("calcite-option");
      selectOption.label = option;
      selectOption.innerText = option;
      if (option === "SimpleFillSymbol") {
        selectOption.selected = true;
      }
      this.symbolSelect.appendChild(selectOption);
    });

    this.propertiesShellPanel = document.createElement(
      "calcite-shell-panel"
    ) as HTMLCalciteShellPanelElement;
    this.propertiesShellPanel.id = "propertiesShellPanel";
    this.propertiesShellPanel.slot = "panel-end";
    this.propertiesShellPanel.position = "end";
    this.propertiesShellPanel.resizable = true;
    this.propertiesShellPanel.widthScale = "l";
    this.shell.appendChild(this.propertiesShellPanel);

    this.viewDiv = document.createElement("div") as HTMLDivElement;
    this.viewDiv.id = "viewDiv";
    this.shell.appendChild(this.viewDiv);

    this.propertiesPanel = document.createElement("calcite-panel");
    this.propertiesShellPanel.appendChild(this.propertiesPanel);

    this.codePanel = document.createElement("calcite-panel");
    this.propertiesShellPanel.appendChild(this.codePanel);

    this.codePanelHeaderContent = document.createElement("div");
    this.codePanelHeaderContent.slot = "header-content";
    this.codePanelHeaderContent.innerText = "Code";
    this.codePanel.appendChild(this.codePanelHeaderContent);

    this.copyCodeAction = document.createElement("calcite-action");
    this.copyCodeAction.icon = "copy-to-clipboard";
    this.copyCodeAction.label = "Copy code to clipboard";
    this.copyCodeAction.slot = "header-actions-end";
    this.copyCodeAction.text = "Copy code to clipboard";
    this.copyCodeAction.textEnabled = true;
    this.codePanel.appendChild(this.copyCodeAction);

    this.copyCodeAction.addEventListener("click", () => {
      this.handleCopyCodeActionClick();
    });

    this.codeOutputParagraph = document.createElement("p");
    this.codeOutputParagraph.classList.add("code");
    this.codePanel.appendChild(this.codeOutputParagraph);

    this.handleSymbolSelectChange();
  }

  reset() {
    while (this.codeOutputParagraph.firstChild) {
      this.codeOutputParagraph.removeChild(this.codeOutputParagraph.firstChild);
    }

    while (this.propertiesPanel.firstChild) {
      this.propertiesPanel.removeChild(this.propertiesPanel.firstChild);
    }

    if (this.activeView) {
      this.activeView.destroy();
    }
  }

  handleSymbolSelectChange() {
    this.reset();

    if (this.symbolSelect.value === "SimpleLineSymbol") {
      const mapView = this.createMapView();
      new SimpleLineSymbolPlayground(
        this.propertiesPanel,
        this.codeOutputParagraph,
        mapView
      );
    }

    if (this.symbolSelect.value === "SimpleFillSymbol") {
      const mapView = this.createMapView();
      new SimpleFillSymbolPlayground(
        this.propertiesPanel,
        this.codeOutputParagraph,
        mapView
      );
    }
  }

  handleCopyCodeActionClick() {
    navigator.clipboard.writeText(this.codeOutputParagraph.innerText);
  }

  createMapView() {
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
      container: this.viewDiv,
      map,
    });

    this.activeView = mapView;

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
  }
}

export default App;
