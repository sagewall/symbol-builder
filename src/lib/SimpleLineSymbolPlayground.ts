import Color from "@arcgis/core/Color";
import Polyline from "@arcgis/core/geometry/Polyline";
import Graphic from "@arcgis/core/Graphic";
import SimpleLineSymbol from "@arcgis/core/symbols/SimpleLineSymbol";
import MapView from "@arcgis/core/views/MapView";
import "@esri/calcite-components/dist/components/calcite-accordion";
import "@esri/calcite-components/dist/components/calcite-accordion-item";
import "@esri/calcite-components/dist/components/calcite-action";
import "@esri/calcite-components/dist/components/calcite-block";
import "@esri/calcite-components/dist/components/calcite-color-picker";
import "@esri/calcite-components/dist/components/calcite-input-number";
import "@esri/calcite-components/dist/components/calcite-label";
import "@esri/calcite-components/dist/components/calcite-option";
import "@esri/calcite-components/dist/components/calcite-panel";
import "@esri/calcite-components/dist/components/calcite-select";
import "@esri/calcite-components/dist/components/calcite-shell-panel";
import "@esri/calcite-components/dist/components/calcite-switch";
import LineSymbolMarkerPlayground from "./LineSymbolMarkerPlayground";

class SimpleLineSymbolPlayground {
  capLabel: HTMLCalciteLabelElement;
  capSelect: HTMLCalciteSelectElement;
  capSelectOptionButt: HTMLCalciteOptionElement;
  capSelectOptionRound: HTMLCalciteOptionElement;
  capSelectOptionSquare: HTMLCalciteOptionElement;
  codeOutputParagraph: HTMLParagraphElement | null;
  colorBlock: HTMLCalciteBlockElement;
  colorPicker: HTMLCalciteColorPickerElement;
  colorPickerLabel: HTMLCalciteLabelElement;
  joinSelectLabel: HTMLCalciteLabelElement;
  joinSelect: HTMLCalciteSelectElement;
  joinSelectOptionBevel: HTMLCalciteOptionElement;
  joinSelectOptionMiter: HTMLCalciteOptionElement;
  joinSelectOptionRound: HTMLCalciteOptionElement;
  lineSymbolMarkerPlayground: LineSymbolMarkerPlayground;
  mapView: MapView | null;
  miterLimitInputNumber: HTMLCalciteInputNumberElement;
  miterLimitLabel: HTMLCalciteLabelElement;
  parentElement: HTMLElement;
  polyline: Polyline;
  polylineGraphic: Graphic;
  simpleLineSymbol: SimpleLineSymbol;
  simpleLineSymbolBlock: HTMLCalciteBlockElement;
  styleLabel: HTMLCalciteLabelElement;
  styleSelect: HTMLCalciteSelectElement;
  styleSelectOptionDash: HTMLCalciteOptionElement;
  styleSelectOptionDashDot: HTMLCalciteOptionElement;
  styleSelectOptionDot: HTMLCalciteOptionElement;
  styleSelectOptionLongDash: HTMLCalciteOptionElement;
  styleSelectOptionLongDashDot: HTMLCalciteOptionElement;
  styleSelectOptionLongDashDotDot: HTMLCalciteOptionElement;
  styleSelectOptionNone: HTMLCalciteOptionElement;
  styleSelectOptionShortDash: HTMLCalciteOptionElement;
  styleSelectOptionShortDashDot: HTMLCalciteOptionElement;
  styleSelectOptionShortDashDotDot: HTMLCalciteOptionElement;
  styleSelectOptionShortDot: HTMLCalciteOptionElement;
  styleSelectOptionShortSolid: HTMLCalciteOptionElement;
  widthInputNumber: HTMLCalciteInputNumberElement;
  widthLabel: HTMLCalciteLabelElement;

  constructor(
    parentElement: HTMLElement,
    codeOutputParagraph: HTMLParagraphElement | null = null,
    mapView: MapView | null = null
  ) {
    this.mapView = mapView;
    this.parentElement = parentElement;
    this.codeOutputParagraph = codeOutputParagraph;

    this.simpleLineSymbol = new SimpleLineSymbol({
      cap: "round",
      color: "#000000",
      join: "round",
      marker: null,
      miterLimit: 2,
      style: "solid",
      width: 0.75,
    });

    this.polyline = new Polyline({
      paths: [
        [
          [-105.0, 40.0],
          [-105.1, 40.2],
          [-105.35, 40.1],
        ],
      ],
    });

    this.polylineGraphic = new Graphic({
      geometry: this.polyline,
      symbol: this.simpleLineSymbol,
    });

    if (this.mapView) {
      this.mapView.when(() => {
        this.mapView!.goTo(this.mapView!.graphics);
      });
    }

    this.simpleLineSymbolBlock = document.createElement("calcite-block");
    this.simpleLineSymbolBlock.collapsible = true;
    this.simpleLineSymbolBlock.heading = "SimpleLineSymbol";
    this.simpleLineSymbolBlock.open = true;
    this.parentElement.appendChild(this.simpleLineSymbolBlock);

    this.capLabel = document.createElement("calcite-label");
    this.capLabel.innerText = "cap: ";
    this.capLabel.layout = "inline";
    this.simpleLineSymbolBlock.appendChild(this.capLabel);

    this.capSelect = document.createElement("calcite-select");
    this.capSelect.label = "cap selection";
    this.capSelect.value = "round";
    this.capLabel.appendChild(this.capSelect);

    this.capSelect.addEventListener("calciteSelectChange", () => {
      this.handleCapChange();
    });

    this.capSelectOptionButt = document.createElement("calcite-option");
    this.capSelectOptionButt.label = "butt";
    this.capSelectOptionButt.innerText = "butt";
    this.capSelect.appendChild(this.capSelectOptionButt);

    this.capSelectOptionRound = document.createElement("calcite-option");
    this.capSelectOptionRound.label = "round";
    this.capSelectOptionRound.innerText = "round";
    this.capSelectOptionRound.selected = true;
    this.capSelect.appendChild(this.capSelectOptionRound);

    this.capSelectOptionSquare = document.createElement("calcite-option");
    this.capSelectOptionSquare.label = "square";
    this.capSelectOptionSquare.innerText = "square";
    this.capSelect.appendChild(this.capSelectOptionSquare);

    this.colorBlock = document.createElement("calcite-block");
    this.colorBlock.collapsible = true;
    this.colorBlock.heading = `color: ${this.simpleLineSymbol.color.toHex()}`;
    this.simpleLineSymbolBlock.appendChild(this.colorBlock);

    this.colorPickerLabel = document.createElement("calcite-label");
    this.colorPickerLabel.innerText = "color: ";
    this.colorPickerLabel.layout = "inline";
    this.colorBlock.appendChild(this.colorPickerLabel);

    this.colorPicker = document.createElement("calcite-color-picker");
    this.colorPicker.value = "#000000";
    this.colorPickerLabel.appendChild(this.colorPicker);

    this.colorPicker.addEventListener("calciteColorPickerChange", () => {
      this.handleColorChange();
    });

    this.joinSelectLabel = document.createElement("calcite-label");
    this.joinSelectLabel.innerText = "join: ";
    this.joinSelectLabel.layout = "inline";
    this.simpleLineSymbolBlock.appendChild(this.joinSelectLabel);

    this.joinSelect = document.createElement("calcite-select");
    this.joinSelect.label = "join selection";
    this.joinSelect.value = "round";
    this.joinSelectLabel.appendChild(this.joinSelect);

    this.joinSelect.addEventListener("calciteSelectChange", () => {
      this.handleJoinChange();
    });

    this.joinSelectOptionBevel = document.createElement("calcite-option");
    this.joinSelectOptionBevel.label = "bevel";
    this.joinSelectOptionBevel.innerText = "bevel";
    this.joinSelect.appendChild(this.joinSelectOptionBevel);

    this.joinSelectOptionMiter = document.createElement("calcite-option");
    this.joinSelectOptionMiter.label = "miter";
    this.joinSelectOptionMiter.innerText = "miter";
    this.joinSelect.appendChild(this.joinSelectOptionMiter);

    this.joinSelectOptionRound = document.createElement("calcite-option");
    this.joinSelectOptionRound.label = "round";
    this.joinSelectOptionRound.innerText = "round";
    this.joinSelectOptionRound.selected = true;
    this.joinSelect.appendChild(this.joinSelectOptionRound);

    this.lineSymbolMarkerPlayground = new LineSymbolMarkerPlayground(
      this.simpleLineSymbolBlock
    );

    this.lineSymbolMarkerPlayground.lineSymbolMarkerBlock.addEventListener(
      "calciteBlockToggle",
      () => {
        this.handleMarkerBlockChange();
      }
    );

    this.lineSymbolMarkerPlayground.colorPicker.addEventListener(
      "calciteColorPickerChange",
      () => {
        this.handleMarkerColorChange();
      }
    );

    this.lineSymbolMarkerPlayground.placementSelect.addEventListener(
      "calciteSelectChange",
      () => {
        this.handleMarkerPlacementChange();
      }
    );
    this.lineSymbolMarkerPlayground.styleSelect.addEventListener(
      "calciteSelectChange",
      () => {
        this.handleMarkerStyleChange();
      }
    );

    this.miterLimitLabel = document.createElement("calcite-label");
    this.miterLimitLabel.innerText = "miterLimit: ";
    this.miterLimitLabel.layout = "inline";
    this.simpleLineSymbolBlock.appendChild(this.miterLimitLabel);

    this.miterLimitInputNumber = document.createElement("calcite-input-number");
    this.miterLimitInputNumber.min = 0;
    this.miterLimitInputNumber.step = 0.5;
    this.miterLimitInputNumber.value = "2";
    this.miterLimitLabel.appendChild(this.miterLimitInputNumber);

    this.miterLimitInputNumber.addEventListener(
      "calciteInputNumberChange",
      () => {
        this.handleMiterLimitChange();
      }
    );

    this.styleLabel = document.createElement("calcite-label");
    this.styleLabel.innerText = "style: ";
    this.styleLabel.layout = "inline";
    this.simpleLineSymbolBlock.appendChild(this.styleLabel);

    this.styleSelect = document.createElement("calcite-select");
    this.styleSelect.label = "style selection";
    this.styleSelect.value = "solid";
    this.styleLabel.appendChild(this.styleSelect);

    this.styleSelect.addEventListener("calciteSelectChange", () => {
      this.handleStyleChange();
    });

    this.styleSelectOptionDash = document.createElement("calcite-option");
    this.styleSelectOptionDash.label = "dash";
    this.styleSelectOptionDash.innerText = "dash";
    this.styleSelect.appendChild(this.styleSelectOptionDash);

    this.styleSelectOptionDashDot = document.createElement("calcite-option");
    this.styleSelectOptionDashDot.label = "dash-dot";
    this.styleSelectOptionDashDot.innerText = "dash-dot";
    this.styleSelect.appendChild(this.styleSelectOptionDashDot);

    this.styleSelectOptionDot = document.createElement("calcite-option");
    this.styleSelectOptionDot.label = "dot";
    this.styleSelectOptionDot.innerText = "dot";
    this.styleSelect.appendChild(this.styleSelectOptionDot);

    this.styleSelectOptionLongDash = document.createElement("calcite-option");
    this.styleSelectOptionLongDash.label = "long-dash";
    this.styleSelectOptionLongDash.innerText = "long-dash";
    this.styleSelect.appendChild(this.styleSelectOptionLongDash);

    this.styleSelectOptionLongDashDot =
      document.createElement("calcite-option");
    this.styleSelectOptionLongDashDot.label = "long-dash-dot";
    this.styleSelectOptionLongDashDot.innerText = "long-dash-dot";
    this.styleSelect.appendChild(this.styleSelectOptionLongDashDot);

    this.styleSelectOptionLongDashDotDot =
      document.createElement("calcite-option");
    this.styleSelectOptionLongDashDotDot.label = "long-dash-dot-dot";
    this.styleSelectOptionLongDashDotDot.innerText = "long-dash-dot-dot";
    this.styleSelect.appendChild(this.styleSelectOptionLongDashDotDot);

    this.styleSelectOptionNone = document.createElement("calcite-option");
    this.styleSelectOptionNone.label = "none";
    this.styleSelectOptionNone.innerText = "none";
    this.styleSelect.appendChild(this.styleSelectOptionNone);

    this.styleSelectOptionShortDash = document.createElement("calcite-option");
    this.styleSelectOptionShortDash.label = "short-dash";
    this.styleSelectOptionShortDash.innerText = "short-dash";
    this.styleSelect.appendChild(this.styleSelectOptionShortDash);

    this.styleSelectOptionShortDashDot =
      document.createElement("calcite-option");
    this.styleSelectOptionShortDashDot.label = "short-dash-dot";
    this.styleSelectOptionShortDashDot.innerText = "short-dash-dot";
    this.styleSelect.appendChild(this.styleSelectOptionShortDashDot);

    this.styleSelectOptionShortDashDotDot =
      document.createElement("calcite-option");
    this.styleSelectOptionShortDashDotDot.label = "short-dash-dot-dot";
    this.styleSelectOptionShortDashDotDot.innerText = "short-dash-dot-dot";
    this.styleSelect.appendChild(this.styleSelectOptionShortDashDotDot);

    this.styleSelectOptionShortDot = document.createElement("calcite-option");
    this.styleSelectOptionShortDot.label = "short-dot";
    this.styleSelectOptionShortDot.innerText = "short-dot";
    this.styleSelect.appendChild(this.styleSelectOptionShortDot);

    this.styleSelectOptionShortSolid = document.createElement("calcite-option");
    this.styleSelectOptionShortSolid.label = "solid";
    this.styleSelectOptionShortSolid.innerText = "solid";
    this.styleSelectOptionShortSolid.selected = true;
    this.styleSelect.appendChild(this.styleSelectOptionShortSolid);

    this.widthLabel = document.createElement("calcite-label");
    this.widthLabel.innerText = "width: ";
    this.widthLabel.layout = "inline";
    this.simpleLineSymbolBlock.appendChild(this.widthLabel);

    this.widthInputNumber = document.createElement("calcite-input-number");
    this.widthInputNumber.min = 0;
    this.widthInputNumber.step = 0.25;
    this.widthInputNumber.value = "0.75";
    this.widthLabel.appendChild(this.widthInputNumber);

    this.widthInputNumber.addEventListener("calciteInputNumberChange", () => {
      this.handleWidthChange();
    });

    this.update();
  }

  update() {
    if (this.mapView) {
      this.mapView.graphics.removeAll();
      this.mapView.graphics.add(this.polylineGraphic.clone());
    }

    let marker = "marker: null,";

    if (this.simpleLineSymbol.marker) {
      marker = `marker: new LineSymbolMarker({
          color: "${this.simpleLineSymbol.marker.color.toHex()}",
          placement: "${this.simpleLineSymbol.marker.placement}",
          style: "${this.simpleLineSymbol.marker.style}"
        }),`;
    }
    if (this.codeOutputParagraph) {
      this.codeOutputParagraph.innerText = `
      const simpleLineSymbol = new SimpleLineSymbol({
        cap: "${this.simpleLineSymbol.cap}",
        color: "${this.simpleLineSymbol.color.toHex()}",
        join: "${this.simpleLineSymbol.join}",
        ${marker}
        miterLimit: ${this.simpleLineSymbol.miterLimit},
        style: "${this.simpleLineSymbol.style}",
        width: ${this.simpleLineSymbol.width}
      })`;
    }
  }

  handleCapChange() {
    this.simpleLineSymbol.cap = <"butt" | "round" | "square">(
      this.capSelect.value
    );
    this.update();
  }

  handleColorChange() {
    this.simpleLineSymbol.color = new Color(this.colorPicker.value);
    this.colorBlock.heading = `color: ${this.simpleLineSymbol.color.toHex()}`;
    this.update();
  }

  handleJoinChange() {
    this.simpleLineSymbol.join = <"round" | "miter" | "bevel">(
      this.joinSelect.value
    );
    this.update();
  }

  handleMarkerBlockChange() {
    if (this.lineSymbolMarkerPlayground.lineSymbolMarkerBlock.open) {
      this.simpleLineSymbol.marker =
        this.lineSymbolMarkerPlayground.lineSymbolMarker;
      this.lineSymbolMarkerPlayground.lineSymbolMarkerBlock.heading =
        "marker: ";
    } else {
      this.simpleLineSymbol.marker = null;
      this.lineSymbolMarkerPlayground.lineSymbolMarkerBlock.heading =
        "marker: null";
    }
    this.update();
  }

  handleMarkerColorChange() {
    this.update();
  }

  handleMarkerPlacementChange() {
    this.update();
  }

  handleMarkerStyleChange() {
    this.update();
  }

  handleMiterLimitChange() {
    this.simpleLineSymbol.miterLimit = Number(this.miterLimitInputNumber.value);
    this.update();
  }

  handleStyleChange() {
    this.simpleLineSymbol.style = <
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
    >this.styleSelect.value;
    this.update();
  }

  handleWidthChange() {
    this.simpleLineSymbol.width = Number(this.widthInputNumber.value);
    this.update();
  }
}

export default SimpleLineSymbolPlayground;
