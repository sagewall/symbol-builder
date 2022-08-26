import Color from "@arcgis/core/Color";
import LineSymbolMarker from "@arcgis/core/symbols/LineSymbolMarker";

class LineSymbolMarkerPlayground {
  public colorPicker = document.createElement("calcite-color-picker");
  public lineSymbolMarker: LineSymbolMarker;
  public lineSymbolMarkerBlock = document.createElement("calcite-block");
  public placementSelect = document.createElement("calcite-select");
  public styleSelect = document.createElement("calcite-select");

  private colorBlock = document.createElement("calcite-block");
  private colorLabel = document.createElement("calcite-label");
  private lineSymbolMarkerProperties: __esri.LineSymbolMarkerProperties = {
    color: "#000000",
    placement: "begin-end",
    style: "arrow",
  };
  private placementLabel = document.createElement("calcite-label");
  private placementSelectOptions: LineSymbolMarkerPlacementOptions = [
    "begin",
    "end",
    "begin-end",
  ];
  private styleLabel = document.createElement("calcite-label");
  private styleSelectOptions: LineSymbolMarkerStyleOptions = [
    "arrow",
    "circle",
    "square",
    "diamond",
    "cross",
    "x",
  ];

  constructor(private parentElement: HTMLElement) {
    this.lineSymbolMarker = new LineSymbolMarker(
      this.lineSymbolMarkerProperties
    );
  }

  init() {
    this.parentElement.appendChild(this.lineSymbolMarkerBlock);

    this.lineSymbolMarkerBlock.collapsible = true;
    this.lineSymbolMarkerBlock.heading = "marker: null";

    this.colorBlock.collapsible = true;
    this.colorBlock.heading = `color: ${this.lineSymbolMarker.color.toHex()}`;
    this.lineSymbolMarkerBlock.appendChild(this.colorBlock);

    this.colorLabel.innerText = "color: ";
    this.colorLabel.layout = "inline";
    this.colorBlock.appendChild(this.colorLabel);

    this.colorPicker.value = "#000000";
    this.colorLabel.appendChild(this.colorPicker);

    this.colorPicker.addEventListener("calciteColorPickerChange", () => {
      this.handleColorChange();
    });

    this.placementLabel.innerText = "placement: ";
    this.placementLabel.layout = "inline";
    this.lineSymbolMarkerBlock.appendChild(this.placementLabel);

    this.placementSelect.label = "placement selection";
    this.placementSelect.value = "begin-end";
    this.placementLabel.appendChild(this.placementSelect);

    this.placementSelect.addEventListener("calciteSelectChange", () => {
      this.handlePlacementChange();
    });

    this.placementSelectOptions.forEach((option) => {
      const selectOption = document.createElement("calcite-option");
      selectOption.label = option;
      selectOption.innerText = option;
      if (option === "begin-end") {
        selectOption.selected = true;
      }
      this.placementSelect.appendChild(selectOption);
    });

    this.styleLabel.innerText = "style: ";
    this.styleLabel.layout = "inline";
    this.lineSymbolMarkerBlock.appendChild(this.styleLabel);

    this.styleSelect.label = "style selection";
    this.styleSelect.value = "arrow";
    this.styleLabel.appendChild(this.styleSelect);

    this.styleSelect.addEventListener("calciteSelectChange", () => {
      this.handleStyleChange();
    });

    this.styleSelectOptions.forEach((option) => {
      const selectOption = document.createElement("calcite-option");
      selectOption.label = option;
      selectOption.innerText = option;
      if (option === "arrow") {
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
    this.lineSymbolMarker.placement = <LineSymbolMarkerPlacementOption>(
      this.placementSelect.value
    );
  }

  handleStyleChange = () => {
    this.lineSymbolMarker.style = <LineSymbolMarkerStyleOption>(
      this.styleSelect.value
    );
  };
}

export default LineSymbolMarkerPlayground;
