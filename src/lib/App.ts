import Basemap from "@arcgis/core/Basemap";
import VectorTileLayer from "@arcgis/core/layers/VectorTileLayer";
import ArcMap from "@arcgis/core/Map";
import MapView from "@arcgis/core/views/MapView";
import SceneView from "@arcgis/core/views/SceneView";
import BasemapGallery from "@arcgis/core/widgets/BasemapGallery";
import LocalBasemapsSource from "@arcgis/core/widgets/BasemapGallery/support/LocalBasemapsSource";
import Expand from "@arcgis/core/widgets/Expand";
import CIMSymbolPlayground from "./CIMSymbolPlayground";
import SimpleFillSymbolPlayground from "./SimpleFillSymbolPlayground";
import SimpleLineSymbolPlayground from "./SimpleLineSymbolPlayground";

class App {
  private activeView: MapView | SceneView | null = null;
  private copyCodeAction = document.createElement("calcite-action");
  private codeOutputParagraph = document.createElement("p");
  private codePanel = document.createElement("calcite-panel");
  private codePanelHeaderContent = document.createElement("div");
  private header = document.createElement("header");
  private headerDiv = document.createElement("div");
  private heading = document.createElement("h1");
  private propertiesPanel = document.createElement("calcite-panel");
  private propertiesShellPanel = document.createElement("calcite-shell-panel");
  private shell = document.createElement("calcite-shell");
  private symbolSelect = document.createElement("calcite-select");
  private symbolSelectOptions = [
    "CIMSymbol",
    "SimpleLineSymbol",
    "SimpleFillSymbol",
  ];
  private viewDiv = document.createElement("div");
  private viewSwitchLabel = document.createElement("calcite-label");
  private viewSwitch = document.createElement("calcite-switch");

  constructor(private parentElement: HTMLElement) {}

  init() {
    this.parentElement.appendChild(this.shell);

    this.activeView = null;

    this.headerDiv.slot = "header";
    this.shell.appendChild(this.headerDiv);

    this.headerDiv.appendChild(this.header);

    this.heading.innerText = "Symbol Playground";
    this.header.appendChild(this.heading);

    this.symbolSelect.label = "select symbol";
    this.symbolSelect.value = "SimpleFillSymbol";
    this.header.appendChild(this.symbolSelect);

    this.symbolSelect.addEventListener("calciteSelectChange", () => {
      this.handleSymbolSelectChange();
    });

    this.symbolSelectOptions.forEach((option) => {
      const selectOption = document.createElement("calcite-option");
      selectOption.label = option;
      selectOption.innerText = option;
      if (option === "SimpleFillSymbol") {
        selectOption.selected = true;
      }
      this.symbolSelect.appendChild(selectOption);
    });

    this.viewSwitchLabel.innerText = "3D";
    this.viewSwitchLabel.layout = "inline";
    this.header.appendChild(this.viewSwitchLabel);

    this.viewSwitch.label = "view switch";
    this.viewSwitchLabel.appendChild(this.viewSwitch);

    this.viewSwitch.addEventListener("calciteSwitchChange", () => {
      this.handleViewSwitchChange();
    });

    this.propertiesShellPanel.id = "propertiesShellPanel";
    this.propertiesShellPanel.slot = "panel-end";
    this.propertiesShellPanel.position = "end";
    this.propertiesShellPanel.resizable = true;
    this.propertiesShellPanel.widthScale = "l";
    this.shell.appendChild(this.propertiesShellPanel);

    this.viewDiv.id = "viewDiv";
    this.shell.appendChild(this.viewDiv);

    this.propertiesShellPanel.appendChild(this.propertiesPanel);

    this.propertiesShellPanel.appendChild(this.codePanel);

    this.codePanelHeaderContent.slot = "header-content";
    this.codePanelHeaderContent.innerText = "Code";
    this.codePanel.appendChild(this.codePanelHeaderContent);

    this.copyCodeAction.icon = "copy-to-clipboard";
    this.copyCodeAction.label = "Copy code to clipboard";
    this.copyCodeAction.slot = "header-actions-end";
    this.copyCodeAction.text = "Copy code to clipboard";
    this.copyCodeAction.textEnabled = true;
    this.codePanel.appendChild(this.copyCodeAction);

    this.copyCodeAction.addEventListener("click", () => {
      this.handleCopyCodeActionClick();
    });

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

    if (this.symbolSelect.value === "CIMSymbol") {
      this.createView();
      new CIMSymbolPlayground(
        this.propertiesPanel,
        this.codeOutputParagraph,
        this.activeView
      );
    }

    if (this.symbolSelect.value === "SimpleLineSymbol") {
      this.createView();
      new SimpleLineSymbolPlayground(
        this.propertiesPanel,
        this.codeOutputParagraph,
        this.activeView
      ).init();
    }

    if (this.symbolSelect.value === "SimpleFillSymbol") {
      this.createView();
      new SimpleFillSymbolPlayground(
        this.propertiesPanel,
        this.codeOutputParagraph,
        this.activeView
      ).init();
    }
  }

  handleViewSwitchChange() {
    this.handleSymbolSelectChange();
  }

  handleCopyCodeActionClick() {
    navigator.clipboard.writeText(this.codeOutputParagraph.innerText);
  }

  createView() {
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

    let view: MapView | SceneView | null = null;

    if (this.viewSwitch.checked) {
      view = new SceneView({
        container: this.viewDiv,
        map,
      });
    } else {
      view = new MapView({
        container: this.viewDiv,
        map,
      });
    }

    this.activeView = view;

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
  }
}

export default App;
