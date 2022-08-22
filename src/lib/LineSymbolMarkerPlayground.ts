import Color from "@arcgis/core/Color";
import LineSymbolMarker from "@arcgis/core/symbols/LineSymbolMarker";
import "@esri/calcite-components/dist/components/calcite-block";
import "@esri/calcite-components/dist/components/calcite-color-picker";
import "@esri/calcite-components/dist/components/calcite-label";
import "@esri/calcite-components/dist/components/calcite-option";
import "@esri/calcite-components/dist/components/calcite-select";

class LineSymbolMarkerPlayground {
  colorBlock: HTMLCalciteBlockElement;
  colorLabel: HTMLCalciteLabelElement;
  colorPicker: HTMLCalciteColorPickerElement;
  lineSymbolMarker: LineSymbolMarker;
  lineSymbolMarkerProperties: Object;
  lineSymbolMarkerBlock: HTMLCalciteBlockElement;
  parentElement: HTMLElement;
  placementLabel: HTMLCalciteLabelElement;
  placementSelect: HTMLCalciteSelectElement;
  placementSelectOptions: string[];
  styleLabel: HTMLCalciteLabelElement;
  styleSelect: HTMLCalciteSelectElement;
  styleSelectOptions: string[];

  constructor(parentElement: HTMLElement) {
    this.parentElement = parentElement;

    this.lineSymbolMarkerProperties = {
      color: "#000000",
      placement: "begin-end",
      style: "arrow",
    };
    this.lineSymbolMarker = new LineSymbolMarker(
      this.lineSymbolMarkerProperties
    );

    this.lineSymbolMarkerBlock = document.createElement("calcite-block");
    this.lineSymbolMarkerBlock.collapsible = true;
    this.lineSymbolMarkerBlock.heading = "marker: null";
    this.parentElement.appendChild(this.lineSymbolMarkerBlock);

    this.colorBlock = document.createElement("calcite-block");
    this.colorBlock.collapsible = true;
    this.colorBlock.heading = `color: ${this.lineSymbolMarker.color.toHex()}`;
    this.lineSymbolMarkerBlock.appendChild(this.colorBlock);

    this.colorLabel = document.createElement("calcite-label");
    this.colorLabel.innerText = "color: ";
    this.colorLabel.layout = "inline";
    this.colorBlock.appendChild(this.colorLabel);

    this.colorPicker = document.createElement("calcite-color-picker");
    this.colorPicker.value = "#000000";
    this.colorLabel.appendChild(this.colorPicker);

    this.colorPicker.addEventListener("calciteColorPickerChange", () => {
      this.handleColorChange();
    });

    this.placementLabel = document.createElement("calcite-label");
    this.placementLabel.innerText = "placement: ";
    this.placementLabel.layout = "inline";
    this.lineSymbolMarkerBlock.appendChild(this.placementLabel);

    this.placementSelect = document.createElement("calcite-select");
    this.placementSelect.label = "placement selection";
    this.placementSelect.value = "begin-end";
    this.placementLabel.appendChild(this.placementSelect);

    this.placementSelect.addEventListener("calciteSelectChange", () => {
      this.handlePlacementChange();
    });

    this.placementSelectOptions = ["begin", "end", "begin-end"];

    this.placementSelectOptions.forEach((option) => {
      const selectOption = document.createElement("calcite-option");
      selectOption.label = option;
      selectOption.innerText = option;
      if (option === "begin-end") {
        selectOption.selected = true;
      }
      this.placementSelect.appendChild(selectOption);
    });

    this.styleLabel = document.createElement("calcite-label");
    this.styleLabel.innerText = "style: ";
    this.styleLabel.layout = "inline";
    this.lineSymbolMarkerBlock.appendChild(this.styleLabel);

    this.styleSelect = document.createElement("calcite-select");
    this.styleSelect.label = "style selection";
    this.styleSelect.value = "arrow";
    this.styleLabel.appendChild(this.styleSelect);

    this.styleSelect.addEventListener("calciteSelectChange", () => {
      this.handleStyleChange();
    });

    this.styleSelectOptions = [
      "arrow",
      "circle",
      "square",
      "diamond",
      "cross",
      "x",
    ];

    this.styleSelectOptions.forEach((option) => {
      const selectOption = document.createElement("calcite-option");
      selectOption.label = option;
      selectOption.innerText = option;
      if (option === "begin-end") {
        selectOption.selected = true;
      }
      this.styleSelect.appendChild(selectOption);
    });
  }

  handleColorChange() {
    this.lineSymbolMarker.color = new Color(this.colorPicker.value);
    this.colorBlock.heading = `color: ${this.lineSymbolMarker.color.toHex()}`;
  }

  handlePlacementChange() {
    this.lineSymbolMarker.placement = <"begin" | "end" | "begin-end">(
      this.placementSelect.value
    );
  }

  handleStyleChange = () => {
    this.lineSymbolMarker.style = <
      "square" | "arrow" | "circle" | "diamond" | "cross" | "x"
    >this.styleSelect.value;
  };
}

export default LineSymbolMarkerPlayground;
