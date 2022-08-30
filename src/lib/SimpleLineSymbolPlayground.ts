import Color from "@arcgis/core/Color";
import Polyline from "@arcgis/core/geometry/Polyline";
import Graphic from "@arcgis/core/Graphic";
import SimpleLineSymbol from "@arcgis/core/symbols/SimpleLineSymbol";
import MapView from "@arcgis/core/views/MapView";
import SceneView from "@arcgis/core/views/SceneView";
import LineSymbolMarkerPlayground from "./LineSymbolMarkerPlayground";

class SimpleLineSymbolPlayground {
  public capSelect = document.createElement("calcite-select");
  public colorPicker = document.createElement("calcite-color-picker");
  public joinSelect = document.createElement("calcite-select");
  public lineSymbolMarkerPlayground: LineSymbolMarkerPlayground;
  public miterLimitInputNumber = document.createElement("calcite-input-number");
  public simpleLineSymbol: SimpleLineSymbol;
  public simpleLineSymbolBlock = document.createElement("calcite-block");
  public styleSelect = document.createElement("calcite-select");
  public widthInputNumber = document.createElement("calcite-input-number");

  private capLabel = document.createElement("calcite-label");
  private capSelectOptions: SimpleLineSymbolCapOptions = [
    "butt",
    "round",
    "square",
  ];
  private colorBlock = document.createElement("calcite-block");
  private colorPickerLabel = document.createElement("calcite-label");
  private joinSelectLabel = document.createElement("calcite-label");
  private joinSelectOptions: SimpleLineSymbolJoinOptions = [
    "miter",
    "round",
    "bevel",
  ];
  private miterLimitLabel = document.createElement("calcite-label");
  private polyline = new Polyline({
    paths: [
      [
        [-105.0, 40.0],
        [-105.1, 40.2],
        [-105.35, 40.1],
      ],
    ],
  });
  private polylineGraphic: Graphic;
  private simpleLineSymbolProperties: __esri.SimpleLineSymbolProperties = {
    cap: "round",
    color: "#000000",
    join: "round",
    marker: null,
    miterLimit: 2,
    style: "solid",
    width: 0.75,
  };
  private styleLabel = document.createElement("calcite-label");
  private styleSelectOptions: SimpleLineSymbolStyleOptions = [
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

  private widthLabel = document.createElement("calcite-label");

  constructor(
    private parentElement: HTMLElement,
    private jsonOutputParagraph?: HTMLPreElement | null,
    private view?: MapView | SceneView | null
  ) {
    this.simpleLineSymbol = new SimpleLineSymbol(
      this.simpleLineSymbolProperties
    );

    this.polylineGraphic = new Graphic({
      geometry: this.polyline,
      symbol: this.simpleLineSymbol,
    });

    this.lineSymbolMarkerPlayground = new LineSymbolMarkerPlayground(
      this.simpleLineSymbolBlock
    );
    this.lineSymbolMarkerPlayground.init();
  }

  init() {
    this.parentElement.appendChild(this.simpleLineSymbolBlock);

    this.simpleLineSymbolBlock.collapsible = true;
    this.simpleLineSymbolBlock.heading = "SimpleLineSymbol";
    this.simpleLineSymbolBlock.open = true;

    this.capLabel.innerText = "cap: ";
    this.capLabel.layout = "inline";
    this.simpleLineSymbolBlock.appendChild(this.capLabel);

    this.capSelect.label = "cap selection";
    this.capSelect.value = "round";
    this.capLabel.appendChild(this.capSelect);

    this.capSelect.addEventListener("calciteSelectChange", () => {
      this.handleCapChange();
    });

    this.capSelectOptions.forEach((option) => {
      const selectOption = document.createElement("calcite-option");
      selectOption.label = option;
      selectOption.innerText = option;
      if (option === "round") {
        selectOption.selected = true;
      }
      this.capSelect.appendChild(selectOption);
    });

    this.colorBlock.collapsible = true;
    this.colorBlock.heading = `color: ${this.simpleLineSymbol.color.toHex()}`;
    this.simpleLineSymbolBlock.appendChild(this.colorBlock);

    this.colorPickerLabel.innerText = "color: ";
    this.colorPickerLabel.layout = "inline";
    this.colorBlock.appendChild(this.colorPickerLabel);

    this.colorPicker.value = "#000000";
    this.colorPickerLabel.appendChild(this.colorPicker);

    this.colorPicker.addEventListener("calciteColorPickerChange", () => {
      this.handleColorChange();
    });

    this.joinSelectLabel.innerText = "join: ";
    this.joinSelectLabel.layout = "inline";
    this.simpleLineSymbolBlock.appendChild(this.joinSelectLabel);

    this.joinSelect.label = "join selection";
    this.joinSelect.value = "round";
    this.joinSelectLabel.appendChild(this.joinSelect);

    this.joinSelect.addEventListener("calciteSelectChange", () => {
      this.handleJoinChange();
    });

    this.joinSelectOptions.forEach((option) => {
      const selectOption = document.createElement("calcite-option");
      selectOption.label = option;
      selectOption.innerText = option;
      if (option === "round") {
        selectOption.selected = true;
      }
      this.joinSelect.appendChild(selectOption);
    });

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

    this.miterLimitLabel.innerText = "miterLimit: ";
    this.miterLimitLabel.layout = "inline";
    this.simpleLineSymbolBlock.appendChild(this.miterLimitLabel);

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

    this.styleLabel.innerText = "style: ";
    this.styleLabel.layout = "inline";
    this.simpleLineSymbolBlock.appendChild(this.styleLabel);

    this.styleSelect.label = "style selection";
    this.styleSelect.value = "solid";
    this.styleLabel.appendChild(this.styleSelect);

    this.styleSelect.addEventListener("calciteSelectChange", () => {
      this.handleStyleChange();
    });

    this.styleSelectOptions.forEach((option) => {
      const selectOption = document.createElement("calcite-option");
      selectOption.label = option;
      selectOption.innerText = option;
      if (option === "solid") {
        selectOption.selected = true;
      }
      this.styleSelect.appendChild(selectOption);
    });

    this.widthLabel.innerText = "width: ";
    this.widthLabel.layout = "inline";
    this.simpleLineSymbolBlock.appendChild(this.widthLabel);

    this.widthInputNumber.min = 0;
    this.widthInputNumber.step = 0.25;
    this.widthInputNumber.value = "0.75";
    this.widthLabel.appendChild(this.widthInputNumber);

    this.widthInputNumber.addEventListener("calciteInputNumberChange", () => {
      this.handleWidthChange();
    });

    this.view?.when(() => {
      this.view?.goTo(this.view?.graphics);
    });

    this.update();
  }

  update() {
    if (this.view) {
      this.view.graphics.removeAll();
      this.view.graphics.add(this.polylineGraphic.clone());
    }

    if (this.jsonOutputParagraph) {
      this.jsonOutputParagraph.innerText = JSON.stringify(
        this.simpleLineSymbol.toJSON(),
        null,
        2
      );
    }
  }

  handleCapChange() {
    this.simpleLineSymbol.cap = <SimpleLineSymbolCapOption>this.capSelect.value;
    this.update();
  }

  handleColorChange() {
    this.simpleLineSymbol.color = new Color(this.colorPicker.value);
    this.colorBlock.heading = `color: ${this.simpleLineSymbol.color.toHex()}`;
    this.update();
  }

  handleJoinChange() {
    this.simpleLineSymbol.join = <SimpleLineSymbolJoinOption>(
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
    this.simpleLineSymbol.style = <SimpleLineSymbolStyleOption>(
      this.styleSelect.value
    );
    this.update();
  }

  handleWidthChange() {
    this.simpleLineSymbol.width = Number(this.widthInputNumber.value);
    this.update();
  }
}

export default SimpleLineSymbolPlayground;
