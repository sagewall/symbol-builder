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
import "@esri/calcite-components/dist/components/calcite-accordion";
import "@esri/calcite-components/dist/components/calcite-accordion-item";
import "@esri/calcite-components/dist/components/calcite-action";
import "@esri/calcite-components/dist/components/calcite-color-picker";
import "@esri/calcite-components/dist/components/calcite-input-number";
import "@esri/calcite-components/dist/components/calcite-label";
import "@esri/calcite-components/dist/components/calcite-option";
import "@esri/calcite-components/dist/components/calcite-panel";
import "@esri/calcite-components/dist/components/calcite-select";
import "@esri/calcite-components/dist/components/calcite-shell-panel";
import "@esri/calcite-components/dist/components/calcite-switch";
import "@esri/calcite-components/dist/components/calcite-block";

class SimpleLineSymbolPlayground {
  shellPanel: HTMLCalciteShellPanelElement;
  viewDiv: HTMLDivElement;

  constructor(
    shellPanel: HTMLCalciteShellPanelElement,
    viewDiv: HTMLDivElement
  ) {
    this.shellPanel = shellPanel;
    this.viewDiv = viewDiv;
  }

  init() {
    const propertiesPanel = document.createElement(
      "calcite-panel"
    ) as HTMLCalcitePanelElement;
    this.shellPanel.appendChild(propertiesPanel);

    const propertiesPanelHeaderContent = document.createElement(
      "div"
    ) as HTMLDivElement;
    propertiesPanelHeaderContent.slot = "header-content";
    propertiesPanelHeaderContent.innerText = "SimpleLineSymbol Properties";
    propertiesPanel.appendChild(propertiesPanelHeaderContent);

    const codePanel = document.createElement(
      "calcite-panel"
    ) as HTMLCalcitePanelElement;
    this.shellPanel.appendChild(codePanel);

    const codePanelHeaderContent = document.createElement(
      "div"
    ) as HTMLDivElement;
    codePanelHeaderContent.slot = "header-content";
    codePanelHeaderContent.innerText = "Code";
    codePanel.appendChild(codePanelHeaderContent);

    const copyCodeAction = document.createElement(
      "calcite-action"
    ) as HTMLCalciteActionElement;
    copyCodeAction.icon = "copy-to-clipboard";
    copyCodeAction.label = "Copy code to clipboard";
    copyCodeAction.slot = "header-actions-end";
    copyCodeAction.text = "Copy code to clipboard";
    copyCodeAction.textEnabled = true;
    codePanel.appendChild(copyCodeAction);

    const codeOutputParagraph = document.createElement(
      "p"
    ) as HTMLParagraphElement;
    codeOutputParagraph.classList.add("code");
    codePanel.appendChild(codeOutputParagraph);

    // cap
    const capLabel = document.createElement(
      "calcite-label"
    ) as HTMLCalciteLabelElement;
    capLabel.innerText = "cap: ";
    capLabel.layout = "inline";
    propertiesPanel.appendChild(capLabel);

    const capSelect = document.createElement(
      "calcite-select"
    ) as HTMLCalciteSelectElement;
    capSelect.label = "cap selection";
    capSelect.value = "round";
    capLabel.appendChild(capSelect);

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
    const colorBlock = document.createElement(
      "calcite-block"
    ) as HTMLCalciteBlockElement;
    colorBlock.collapsible = true;
    propertiesPanel.appendChild(colorBlock);

    const colorPickerLabel = document.createElement(
      "calcite-label"
    ) as HTMLCalciteLabelElement;
    colorPickerLabel.innerText = "color: ";
    colorPickerLabel.layout = "inline";
    colorBlock.appendChild(colorPickerLabel);

    const colorPicker = document.createElement(
      "calcite-color-picker"
    ) as HTMLCalciteColorPickerElement;
    colorPicker.value = "#000000";
    colorPickerLabel.appendChild(colorPicker);

    // join
    const joinSelectLabel = document.createElement(
      "calcite-label"
    ) as HTMLCalciteLabelElement;
    joinSelectLabel.innerText = "join: ";
    joinSelectLabel.layout = "inline";
    propertiesPanel.appendChild(joinSelectLabel);

    const joinSelect = document.createElement(
      "calcite-select"
    ) as HTMLCalciteSelectElement;
    joinSelect.label = "join selection";
    joinSelect.value = "round";
    joinSelectLabel.appendChild(joinSelect);

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
    const markerBlock = document.createElement(
      "calcite-block"
    ) as HTMLCalciteBlockElement;
    markerBlock.collapsible = true;
    markerBlock.heading = "marker: ";
    propertiesPanel.appendChild(markerBlock);

    // marker color
    const markerColorBlock = document.createElement(
      "calcite-block"
    ) as HTMLCalciteBlockElement;
    markerColorBlock.collapsible = true;
    markerBlock.appendChild(markerColorBlock);

    const markerColorLabel = document.createElement(
      "calcite-label"
    ) as HTMLCalciteLabelElement;
    markerColorLabel.innerText = "color: ";
    markerColorLabel.layout = "inline";
    markerColorBlock.appendChild(markerColorLabel);

    const markerColorPicker = document.createElement(
      "calcite-color-picker"
    ) as HTMLCalciteColorPickerElement;
    markerColorPicker.value = "#ff0000";
    markerColorLabel.appendChild(markerColorPicker);

    const markerPlacementLabel = document.createElement(
      "calcite-label"
    ) as HTMLCalciteLabelElement;
    markerPlacementLabel.innerText = "placement: ";
    markerPlacementLabel.layout = "inline";
    markerBlock.appendChild(markerPlacementLabel);

    const makerPlacementSelect = document.createElement(
      "calcite-select"
    ) as HTMLCalciteSelectElement;
    makerPlacementSelect.label = "style selection";
    makerPlacementSelect.value = "begin-end";
    markerPlacementLabel.appendChild(makerPlacementSelect);

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

    const markerStyleLabel = document.createElement(
      "calcite-label"
    ) as HTMLCalciteLabelElement;
    markerStyleLabel.innerText = "style: ";
    markerStyleLabel.layout = "inline";
    markerBlock.appendChild(markerStyleLabel);

    const makerStyleSelect = document.createElement(
      "calcite-select"
    ) as HTMLCalciteSelectElement;
    makerStyleSelect.label = "marker style selection";
    makerStyleSelect.value = "arrow";
    markerStyleLabel.appendChild(makerStyleSelect);

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
    const miterLimitLabel = document.createElement(
      "calcite-label"
    ) as HTMLCalciteLabelElement;
    miterLimitLabel.innerText = "miterLimit: ";
    miterLimitLabel.layout = "inline";
    propertiesPanel.appendChild(miterLimitLabel);

    const miterLimitInputNumber = document.createElement(
      "calcite-input-number"
    ) as HTMLCalciteInputNumberElement;
    miterLimitInputNumber.step = 0.5;
    miterLimitInputNumber.value = "2";
    miterLimitLabel.appendChild(miterLimitInputNumber);

    // style
    const styleLabel = document.createElement(
      "calcite-label"
    ) as HTMLCalciteLabelElement;
    styleLabel.innerText = "style: ";
    styleLabel.layout = "inline";
    propertiesPanel.appendChild(styleLabel);

    const styleSelect = document.createElement(
      "calcite-select"
    ) as HTMLCalciteSelectElement;
    styleSelect.label = "style selection";
    styleSelect.value = "solid";
    styleLabel.appendChild(styleSelect);

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
    const widthLabel = document.createElement(
      "calcite-label"
    ) as HTMLCalciteLabelElement;
    widthLabel.innerText = "width: ";
    widthLabel.layout = "inline";
    propertiesPanel.appendChild(widthLabel);

    const widthInputNumber = document.createElement(
      "calcite-input-number"
    ) as HTMLCalciteInputNumberElement;
    widthInputNumber.step = 0.5;
    widthInputNumber.value = "6";
    widthLabel.appendChild(widthInputNumber);

    const lineSymbolMarker = new LineSymbolMarker();
    let simpleLineSymbol = new SimpleLineSymbol();

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
      container: this.viewDiv,
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

      if (simpleLineSymbol.marker) {
        codeOutputParagraph.innerText = `
        const simpleLineSymbol = new SimpleLineSymbol({
          cap: "${simpleLineSymbol.cap}",
          color: "${simpleLineSymbol.color.toHex()}",
          join: "${simpleLineSymbol.join}",
          marker: {
            color: "${simpleLineSymbol.marker.color.toHex()}",
            placement: "${simpleLineSymbol.marker.placement}",
            style: "${simpleLineSymbol.marker.style}"
          },
          miterLimit: ${simpleLineSymbol.miterLimit},
          style: "${simpleLineSymbol.style}",
          width: ${simpleLineSymbol.width}
        })`;
      } else {
        codeOutputParagraph.innerText = `
        const simpleLineSymbol = new SimpleLineSymbol({
          cap: "${simpleLineSymbol.cap}",
          color: "${simpleLineSymbol.color.toHex()}",
          join: "${simpleLineSymbol.join}",
          marker: null,
          miterLimit: ${simpleLineSymbol.miterLimit},
          style: "${simpleLineSymbol.style}",
          width: ${simpleLineSymbol.width}
        })
      `;
      }
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
      colorBlock.heading = `color: ${simpleLineSymbol.color.toHex()}`;
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

    const handleMarkerBlockChange = () => {
      if (markerBlock.open) {
        simpleLineSymbol.marker = lineSymbolMarker;
        markerBlock.heading = "marker: ";
      } else {
        simpleLineSymbol.marker = null;
        markerBlock.heading = "marker: null";
      }
      update();
    };

    markerBlock.addEventListener("calciteBlockToggle", handleMarkerBlockChange);

    const handleMarkerColorChange = () => {
      lineSymbolMarker.color = new Color(markerColorPicker.value);
      markerColorBlock.heading = `color: ${lineSymbolMarker.color.toHex()}`;
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
      update();
    };

    makerPlacementSelect.addEventListener("calciteSelectChange", () => {
      handleMarkerPlacementChange();
    });

    const handleMarkerStyleChange = () => {
      lineSymbolMarker.style = <
        "square" | "arrow" | "circle" | "diamond" | "cross" | "x"
      >makerStyleSelect.value;
      update();
    };

    makerStyleSelect.addEventListener("calciteSelectChange", () => {
      handleMarkerStyleChange();
    });

    const handleMiterLimitChange = () => {
      simpleLineSymbol.miterLimit = Number(miterLimitInputNumber.value);
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
      // styleAccordianItem.heading = `style: "${styleSelect.value}"`;
      update();
    };

    styleSelect.addEventListener("calciteSelectChange", () => {
      handleStyleChange();
    });

    const handleWidthChange = () => {
      simpleLineSymbol.width = Number(widthInputNumber.value);
      update();
    };

    widthInputNumber.addEventListener("calciteInputNumberChange", () => {
      handleWidthChange();
    });

    copyCodeAction.addEventListener("click", () => {
      navigator.clipboard.writeText(codeOutputParagraph.innerText);
    });

    handleCapChange();
    handleColorChange();
    handleJoinChange();
    handleMarkerBlockChange();
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
  }
}

export default SimpleLineSymbolPlayground;
