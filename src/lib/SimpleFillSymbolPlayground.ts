import Color from "@arcgis/core/Color";
import Polygon from "@arcgis/core/geometry/Polygon";
import Graphic from "@arcgis/core/Graphic";
import SimpleFillSymbol from "@arcgis/core/symbols/SimpleFillSymbol";
import SimpleLineSymbol from "@arcgis/core/symbols/SimpleLineSymbol";
import MapView from "@arcgis/core/views/MapView";
import SceneView from "@arcgis/core/views/SceneView";
import SimpleLineSymbolPlayground from "./SimpleLineSymbolPlayground";

class SimpleFillSymbolPlayground {
  codeOutputParagraph: HTMLParagraphElement | null = null;
  colorBlock: HTMLCalciteBlockElement;
  colorPicker: HTMLCalciteColorPickerElement;
  colorPickerLabel: HTMLCalciteLabelElement;
  view: MapView | SceneView | null;
  parentElement: HTMLElement;
  polygon: Polygon;
  polygonGraphic: Graphic;
  simpleFillSymbol: SimpleFillSymbol;
  simpleFillSymbolProperties: Object;
  simpleLineSymbol: SimpleLineSymbol;
  simpleLineSymbolPlayground: SimpleLineSymbolPlayground;
  simpleFillSymbolBlock: HTMLCalciteBlockElement;
  styleSelectOptions: string[];
  styleSelect: HTMLCalciteSelectElement;
  styleSelectLabel: HTMLCalciteLabelElement;

  constructor(
    parentElement: HTMLElement,
    codeOutputParagraph: HTMLParagraphElement | null = null,
    mapView: MapView | SceneView | null = null
  ) {
    this.parentElement = parentElement;
    this.codeOutputParagraph = codeOutputParagraph;
    this.view = mapView;

    this.simpleFillSymbolBlock = document.createElement("calcite-block");
    this.simpleFillSymbolBlock.collapsible = false;
    this.simpleFillSymbolBlock.heading = "SimpleFillSymbol";
    this.simpleFillSymbolBlock.open = true;
    this.parentElement.appendChild(this.simpleFillSymbolBlock);

    this.simpleLineSymbolPlayground = new SimpleLineSymbolPlayground(
      this.simpleFillSymbolBlock
    );
    this.simpleLineSymbolPlayground.simpleLineSymbolBlock.heading = "outline: ";
    this.simpleLineSymbolPlayground.simpleLineSymbolBlock.collapsible = false;
    this.simpleLineSymbolPlayground.lineSymbolMarkerPlayground.lineSymbolMarkerBlock.hidden =
      true;

    this.simpleLineSymbolPlayground.capSelect.addEventListener(
      "calciteSelectChange",
      () => {
        this.update();
      }
    );

    this.simpleLineSymbolPlayground.colorPicker.addEventListener(
      "calciteColorPickerChange",
      () => {
        this.update();
      }
    );

    this.simpleLineSymbolPlayground.joinSelect.addEventListener(
      "calciteSelectChange",
      () => {
        this.update();
      }
    );

    this.simpleLineSymbolPlayground.miterLimitInputNumber.addEventListener(
      "calciteInputNumberChange",
      () => {
        this.update();
      }
    );

    this.simpleLineSymbolPlayground.styleSelect.addEventListener(
      "calciteSelectChange",
      () => {
        this.update();
      }
    );

    this.simpleLineSymbolPlayground.widthInputNumber.addEventListener(
      "calciteInputNumberChange",
      () => {
        this.update();
      }
    );

    this.simpleLineSymbol = this.simpleLineSymbolPlayground.simpleLineSymbol;

    this.polygon = new Polygon({
      rings: [
        [
          [-105.0, 40.0],
          [-105.1, 40.2],
          [-105.35, 40.1],
        ],
      ],
    });

    this.simpleFillSymbolProperties = {
      color: new Color("#000000"),
      outline: this.simpleLineSymbol,
      style: "solid",
    };

    this.simpleFillSymbol = new SimpleFillSymbol(
      this.simpleFillSymbolProperties
    );

    this.polygonGraphic = new Graphic({
      geometry: this.polygon,
      symbol: this.simpleFillSymbol,
    });

    this.view?.when(() => {
      this.view?.goTo(this.polygon);
    });

    this.colorBlock = document.createElement("calcite-block");
    this.colorBlock.collapsible = true;
    this.colorBlock.heading = `color: ${this.simpleFillSymbol.color.toHex()}`;
    this.simpleFillSymbolBlock.prepend(this.colorBlock);

    this.colorPickerLabel = document.createElement("calcite-label");
    this.colorPickerLabel.innerText = "color: ";
    this.colorPickerLabel.layout = "inline";
    this.colorBlock.appendChild(this.colorPickerLabel);

    this.colorPicker = document.createElement("calcite-color-picker");
    this.colorPicker.value = "#000000";
    this.colorPickerLabel.appendChild(this.colorPicker);

    this.colorPicker.addEventListener("calciteColorPickerChange", () => {
      this.handleColorChange(this.colorPicker.value?.toString());
    });

    this.styleSelectLabel = document.createElement("calcite-label");
    this.styleSelectLabel.innerText = "select: ";
    this.styleSelectLabel.layout = "inline";
    this.simpleFillSymbolBlock.appendChild(this.styleSelectLabel);

    this.styleSelect = document.createElement("calcite-select");
    this.styleSelect.label = `style selection`;
    this.styleSelectLabel.appendChild(this.styleSelect);
    this.styleSelectOptions = [
      "backward-diagonal",
      "cross",
      "diagonal-cross",
      "forward-diagonal",
      "horizontal",
      "none",
      "solid",
      "vertical",
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

    this.styleSelect.addEventListener("calciteSelectChange", () => {
      this.handleStyleSelectChange(this.styleSelect.value);
    });

    this.update();
  }

  handleColorChange(color: string | undefined) {
    this.simpleFillSymbol.color = new Color(color);
    this.colorBlock.heading = `color: ${this.simpleFillSymbol.color.toHex()}`;
    this.update();
  }

  handleStyleSelectChange(value: string) {
    this.simpleFillSymbol.style = <
      | "backward-diagonal"
      | "cross"
      | "diagonal-cross"
      | "forward-diagonal"
      | "horizontal"
      | "none"
      | "solid"
      | "vertical"
    >value;

    this.update();
  }

  update() {
    if (this.view) {
      this.view.graphics.removeAll();
      this.view.graphics.add(this.polygonGraphic.clone());
    }

    if (this.codeOutputParagraph) {
      this.codeOutputParagraph.innerText = `
      const simpleFillSymbol = new SimpleFillSymbol({
        color: "${this.simpleFillSymbol.color.toHex()}",
        outline: new SimpleLineSymbol({
          cap: "${this.simpleFillSymbol.outline.cap}",
          color: "${this.simpleFillSymbol.outline.color.toHex()}",
          join: "${this.simpleFillSymbol.outline.join}",
          miterLimit: ${this.simpleFillSymbol.outline.miterLimit},
          style: "${this.simpleFillSymbol.outline.style}",
          width: ${this.simpleFillSymbol.outline.width}
        }),
        style: "${this.simpleFillSymbol.style}"
      })`;
    }
  }
}

export default SimpleFillSymbolPlayground;
