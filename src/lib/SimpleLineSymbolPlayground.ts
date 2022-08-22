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
  capSelectOptions: string[];
  codeOutputParagraph: HTMLParagraphElement | null;
  colorBlock: HTMLCalciteBlockElement;
  colorPicker: HTMLCalciteColorPickerElement;
  colorPickerLabel: HTMLCalciteLabelElement;
  joinSelectLabel: HTMLCalciteLabelElement;
  joinSelect: HTMLCalciteSelectElement;
  joinSelectOptions: string[];
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
  styleSelectOptions: string[];
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

    this.capSelectOptions = ["butt", "round", "square"];

    this.capSelectOptions.forEach((option) => {
      const selectOption = document.createElement("calcite-option");
      selectOption.label = option;
      selectOption.innerText = option;
      if (option === "round") {
        selectOption.selected = true;
      }
      this.capSelect.appendChild(selectOption);
    });

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

    this.joinSelectOptions = ["miter", "round", "bevel"];

    this.joinSelectOptions.forEach((option) => {
      const selectOption = document.createElement("calcite-option");
      selectOption.label = option;
      selectOption.innerText = option;
      if (option === "round") {
        selectOption.selected = true;
      }
      this.joinSelect.appendChild(selectOption);
    });

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

    this.styleSelectOptions = [
      "dash",
      "dash-dot",
      "dot",
      "long-dash",
      "long-dash-dot",
      "long-dash-dot-dot",
      "none",
      "short-dash",
      "short-dash-dot",
      "short-dash-dot-dot",
      "short-dot",
      "solid",
    ];

    this.styleSelectOptions.forEach((option) => {
      const selectOption = document.createElement("calcite-option");
      selectOption.label = option;
      selectOption.innerText = option;
      if (option === "solid") {
        selectOption.selected = true;
      }
      this.styleSelect.appendChild(selectOption);
    });

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
