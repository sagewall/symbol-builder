import Color from "@arcgis/core/Color";
import Polygon from "@arcgis/core/geometry/Polygon";
import Graphic from "@arcgis/core/Graphic";
import SimpleFillSymbol from "@arcgis/core/symbols/SimpleFillSymbol";
import SimpleLineSymbol from "@arcgis/core/symbols/SimpleLineSymbol";
import MapView from "@arcgis/core/views/MapView";
import "@esri/calcite-components/dist/components/calcite-block";
import "@esri/calcite-components/dist/components/calcite-color-picker";
import "@esri/calcite-components/dist/components/calcite-label";
import "@esri/calcite-components/dist/components/calcite-option";
import "@esri/calcite-components/dist/components/calcite-select";
import SimpleLineSymbolPlayground from "./SimpleLineSymbolPlayground";

class SimpleFillSymbolPlayground {
  codeOutputParagraph: HTMLParagraphElement | null = null;
  mapView: MapView | null;
  parentElement: HTMLElement;
  simpleFillSymbol: SimpleFillSymbol;
  simpleLineSymbol: SimpleLineSymbol;
  simpleLineSymbolPlayground: SimpleLineSymbolPlayground;
  polygon: Polygon;
  polygonGraphic: Graphic;
  simpleFillSymbolBlock: HTMLCalciteBlockElement;

  constructor(
    parentElement: HTMLElement,
    codeOutputParagraph: HTMLParagraphElement | null = null,
    mapView: MapView | null = null
  ) {
    this.parentElement = parentElement;
    this.codeOutputParagraph = codeOutputParagraph;
    this.mapView = mapView;

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

    this.simpleFillSymbol = new SimpleFillSymbol({
      color: new Color("#000000"),
      outline: this.simpleLineSymbol,
      style: "cross",
    });

    this.polygonGraphic = new Graphic({
      geometry: this.polygon,
      symbol: this.simpleFillSymbol,
    });

    this.mapView?.goTo(this.polygon);

    this.createCalciteComponents();
    this.update();
  }

  createCalciteComponents() {
    const symbol = this.simpleFillSymbol.toJSON();

    Object.entries(symbol).forEach(([key, value]) => {
      switch (key) {
        case "color":
          this.createCalciteColorPicker(<string>key, <Color>new Color(value));
          break;

        case "outline":
          break;

        case "style":
          this.createCalciteSelect(<string>key);
          break;

        default:
          break;
      }
    });
  }

  createCalciteColorPicker(key: string, color: Color) {
    const colorBlock = document.createElement("calcite-block");
    colorBlock.collapsible = true;
    colorBlock.heading = `color: ${color.toHex()}`;
    colorBlock.id = `${key}ColorBlock`;
    this.simpleFillSymbolBlock.prepend(colorBlock);

    const colorPickerLabel = document.createElement("calcite-label");
    (colorPickerLabel.id = `${key}ColorLabel`),
      (colorPickerLabel.innerText = "color: ");
    colorPickerLabel.layout = "inline";
    colorBlock.appendChild(colorPickerLabel);

    const colorPicker = document.createElement("calcite-color-picker");
    colorPicker.id = `${key}ColorPicker`;
    colorPicker.value = "#000000";
    colorPickerLabel.appendChild(colorPicker);

    colorPicker.addEventListener("calciteColorPickerChange", () => {
      this.handleColorChange(colorPicker.value?.toString());
    });
  }

  createCalciteSelect(key: string) {
    const selectLabel = document.createElement("calcite-label");
    selectLabel.id = `${key}SelectLabel`;
    selectLabel.innerText = `${key}: `;
    selectLabel.layout = "inline";
    this.simpleFillSymbolBlock.appendChild(selectLabel);

    const select = document.createElement("calcite-select");
    select.id = `${key}Select`;
    select.label = `${key} selection`;
    selectLabel.appendChild(select);

    select.addEventListener("calciteSelectChange", () => {
      this.handleSelectChange(key, select.value);
    });

    const styleOptions = [
      "backward-diagonal",
      "cross",
      "diagonal-cross",
      "forward-diagonal",
      "horizontal",
      "none",
      "solid",
      "vertical",
    ];

    if (key === "style") {
      styleOptions.forEach((option) => {
        const selectOption = document.createElement("calcite-option");
        selectOption.label = option;
        selectOption.innerText = option;
        if (option === "cross") {
          selectOption.selected = true;
        }
        select.appendChild(selectOption);
      });
    }
  }

  handleColorChange(color: string | undefined) {
    this.simpleFillSymbol.color = new Color(color);
    const colorColorBlock = document.querySelector(
      "#colorColorBlock"
    ) as HTMLCalciteBlockElement;
    colorColorBlock.heading = <string>color;
    this.update();
  }

  handleSelectChange(key: string, value: string) {
    if (key === "style") {
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
    }
    this.update();
  }

  update() {
    if (this.mapView) {
      this.mapView.graphics.removeAll();
      this.mapView.graphics.add(this.polygonGraphic.clone());
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
