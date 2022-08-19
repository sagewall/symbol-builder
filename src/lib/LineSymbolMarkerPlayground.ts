import Color from "@arcgis/core/Color";
import LineSymbolMarker from "@arcgis/core/symbols/LineSymbolMarker";
import "@esri/calcite-components/dist/components/calcite-block";
import "@esri/calcite-components/dist/components/calcite-color-picker";
import "@esri/calcite-components/dist/components/calcite-label";
import "@esri/calcite-components/dist/components/calcite-option";
import "@esri/calcite-components/dist/components/calcite-select";

class LineSymbolMarkerPlayground {
  parentElement: HTMLElement;
  lineSymbolMarker: LineSymbolMarker;
  lineSymbolMarkerBlock: HTMLCalciteBlockElement;
  colorBlock: HTMLCalciteBlockElement;
  colorLabel: HTMLCalciteLabelElement;
  colorPicker: HTMLCalciteColorPickerElement;
  placementLabel: HTMLCalciteLabelElement;
  placementSelect: HTMLCalciteSelectElement;
  placementSelectOptionBegin: HTMLCalciteOptionElement;
  placementSelectOptionEnd: HTMLCalciteOptionElement;
  placementSelectOptionBeginEnd: HTMLCalciteOptionElement;
  styleLabel: HTMLCalciteLabelElement;
  styleSelect: HTMLCalciteSelectElement;
  styleSelectOptionArrow: HTMLCalciteOptionElement;
  styleSelectOptionCircle: HTMLCalciteOptionElement;
  styleSelectOptionSquare: HTMLCalciteOptionElement;
  styleSelectOptionDiamond: HTMLCalciteOptionElement;
  styleSelectOptionCross: HTMLCalciteOptionElement;
  styleSelectOptionX: HTMLCalciteOptionElement;

  constructor(parentElement: HTMLElement) {
    this.parentElement = parentElement;
    this.lineSymbolMarker = new LineSymbolMarker({
      color: "#000000",
      placement: "begin-end",
      style: "arrow",
    });

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

    this.placementSelectOptionBegin = document.createElement("calcite-option");
    this.placementSelectOptionBegin.label = "begin";
    this.placementSelectOptionBegin.innerText = "begin";
    this.placementSelect.appendChild(this.placementSelectOptionBegin);

    this.placementSelectOptionEnd = document.createElement("calcite-option");
    this.placementSelectOptionEnd.label = "end";
    this.placementSelectOptionEnd.innerText = "end";
    this.placementSelect.appendChild(this.placementSelectOptionEnd);

    this.placementSelectOptionBeginEnd =
      document.createElement("calcite-option");
    this.placementSelectOptionBeginEnd.label = "begin-end";
    this.placementSelectOptionBeginEnd.innerText = "begin-end";
    this.placementSelectOptionBeginEnd.selected = true;
    this.placementSelect.appendChild(this.placementSelectOptionBeginEnd);

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

    this.styleSelectOptionArrow = document.createElement("calcite-option");
    this.styleSelectOptionArrow.label = "arrow";
    this.styleSelectOptionArrow.innerText = "arrow";
    this.styleSelectOptionArrow.selected = true;
    this.styleSelect.appendChild(this.styleSelectOptionArrow);

    this.styleSelectOptionCircle = document.createElement("calcite-option");
    this.styleSelectOptionCircle.label = "circle";
    this.styleSelectOptionCircle.innerText = "circle";
    this.styleSelect.appendChild(this.styleSelectOptionCircle);

    this.styleSelectOptionSquare = document.createElement("calcite-option");
    this.styleSelectOptionSquare.label = "square";
    this.styleSelectOptionSquare.innerText = "square";
    this.styleSelect.appendChild(this.styleSelectOptionSquare);

    this.styleSelectOptionDiamond = document.createElement("calcite-option");
    this.styleSelectOptionDiamond.label = "diamond";
    this.styleSelectOptionDiamond.innerText = "diamond";
    this.styleSelect.appendChild(this.styleSelectOptionDiamond);

    this.styleSelectOptionCross = document.createElement("calcite-option");
    this.styleSelectOptionCross.label = "cross";
    this.styleSelectOptionCross.innerText = "cross";
    this.styleSelect.appendChild(this.styleSelectOptionCross);

    this.styleSelectOptionX = document.createElement("calcite-option");
    this.styleSelectOptionX.label = "x";
    this.styleSelectOptionX.innerText = "x";
    this.styleSelect.appendChild(this.styleSelectOptionX);
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
