import MapView from "@arcgis/core/views/MapView";
import SceneView from "@arcgis/core/views/SceneView";
import CIMSymbol from "@arcgis/core/symbols/CIMSymbol";
import Graphic from "@arcgis/core/Graphic";
import Point from "@arcgis/core/geometry/Point";
import Polyline from "@arcgis/core/geometry/Polyline";
import Polygon from "@arcgis/core/geometry/Polygon";

class CIMSymbolPlayground {
  private cimSymbolBlock = document.createElement("calcite-block");

  private cimPointSymbol: __esri.CIMPointSymbol = {
    type: "CIMPointSymbol",
    symbolLayers: [
      {
        type: "CIMVectorMarker",
        enable: true,
        size: 32,
        frame: {
          xmin: 0,
          ymin: 0,
          xmax: 16,
          ymax: 16,
        },
        markerGraphics: [
          {
            type: "CIMMarkerGraphic",
            geometry: {
              rings: [
                [
                  [8, 16],
                  [0, 0],
                  [16, 0],
                  [8, 16],
                ],
              ],
            },
            symbol: {
              type: "CIMPolygonSymbol",
              symbolLayers: [
                {
                  type: "CIMSolidStroke",
                  enable: true,
                  width: 5,
                  color: [240, 94, 35, 255],
                },
              ],
            },
          },
        ],
      },
    ],
  };

  private cimLineSymbol: __esri.CIMLineSymbol = {
    type: "CIMLineSymbol",
    symbolLayers: [
      {
        type: "CIMSolidStroke",
        effects: [
          {
            type: "CIMGeometricEffectDashes",
            dashTemplate: [5, 5],
            lineDashEnding: "FullGap",
            offsetAlongLine: 0,
          },
        ],
        enable: true,
        capStyle: "Butt",
        joinStyle: "Round",
        width: 2.6,
        color: [255, 255, 255, 255],
      },
      {
        type: "CIMSolidStroke",
        enable: true,
        capStyle: "Butt",
        joinStyle: "Round",
        width: 3.4,
        color: [0, 0, 0, 255],
      },
    ],
  };

  private cimPolygonSymbol: __esri.CIMPolygonSymbol = {
    type: "CIMPolygonSymbol",

    symbolLayers: [
      {
        type: "CIMVectorMarker",
        enable: true,
        frame: {
          xmin: 0,
          ymin: 0,
          xmax: 10,
          ymax: 10,
        },
        size: 10,
        markerPlacement: {
          type: "CIMMarkerPlacementInsidePolygon",
          gridType: "Fixed",
          seed: 13,
          stepX: 16,
          stepY: 16,
          clipping: "ClipAtBoundary",
        },
        markerGraphics: [
          {
            type: "CIMMarkerGraphic",
            geometry: {
              rings: [
                [
                  [0, 5],
                  [1.12, 1.55],
                  [4.76, 1.55],
                  [1.82, -0.59],
                  [2.94, -4.05],
                  [0, -1.91],
                  [-2.94, -4.05],
                  [-1.82, -0.59],
                  [-4.76, 1.55],
                  [-1.12, 1.55],
                  [0, 5],
                ],
              ],
            },
            symbol: {
              type: "CIMPolygonSymbol",
              symbolLayers: [
                {
                  type: "CIMSolidFill",
                  enable: true,
                  color: [190, 210, 255, 255],
                },
              ],
            },
          },
        ],
        scaleSymbolsProportionally: true,
        respectFrame: true,
      },
      {
        type: "CIMSolidFill",
        enable: true,
        color: [0, 112, 255, 255],
      },
    ],
  };

  private cimSymbolReference: __esri.CIMSymbolReference;

  private cimSymbol: CIMSymbol;

  private maxScale = 0;
  private maxScaleInputNumber = document.createElement("calcite-input-number");
  private maxScaleLabel = document.createElement("calcite-label");

  private minScale = 0;
  private minScaleInputNumber = document.createElement("calcite-input-number");
  private minScaleLabel = document.createElement("calcite-label");

  private point = new Point({
    x: -105.175,
    y: 40.1,
  });
  private pointGraphic: Graphic;

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

  private polygon = new Polygon({
    rings: [
      [
        [-105.0, 40.0],
        [-105.1, 40.2],
        [-105.35, 40.1],
      ],
    ],
  });
  private polygonGraphic: Graphic;

  private primitiveOverrides: __esri.PrimitiveOverride[] = [];

  private symbolLabel = document.createElement("calcite-label");
  private symbolSelect = document.createElement("calcite-select");
  private symbolSelectOptions = [
    "CIMPointSymbol",
    "CIMLineSymbol",
    "CIMPolygonSymbol",
  ];

  constructor(
    private parentElement: HTMLElement,
    private codeOutputParagraph?: HTMLParagraphElement | null,
    private view?: MapView | SceneView | null
  ) {
    this.cimSymbolBlock = document.createElement("calcite-block");

    this.cimSymbolReference = {
      type: "CIMSymbolReference",
      primitiveOverrides: this.primitiveOverrides,
      symbol: this.cimPointSymbol,
      minScale: this.minScale,
      maxScale: this.maxScale,
    };

    this.cimSymbol = new CIMSymbol({
      data: this.cimSymbolReference,
    });

    this.pointGraphic = new Graphic({
      geometry: this.point,
      symbol: this.cimSymbol,
    });

    this.polylineGraphic = new Graphic({
      geometry: this.polyline,
      symbol: this.cimSymbol,
    });

    this.polygonGraphic = new Graphic({
      geometry: this.polygon,
      symbol: this.cimSymbol,
    });
  }

  init() {
    this.parentElement.appendChild(this.cimSymbolBlock);

    this.cimSymbolBlock.collapsible = false;
    this.cimSymbolBlock.heading = "CIMSymbol";
    this.cimSymbolBlock.open = true;

    this.symbolLabel.innerText = "style: ";
    this.symbolLabel.layout = "inline";
    this.cimSymbolBlock.appendChild(this.symbolLabel);

    this.symbolSelect.label = "style selection";
    this.symbolSelect.value = "CIMPointSymbol";
    this.cimSymbolBlock.appendChild(this.symbolSelect);

    this.symbolSelect.addEventListener("calciteSelectChange", () => {
      this.handleSymbolChange();
    });

    this.symbolSelectOptions.forEach((option) => {
      const selectOption = document.createElement("calcite-option");
      selectOption.label = option;
      selectOption.innerText = option;
      if (option === "CIMPointSymbol") {
        selectOption.selected = true;
      }
      if (this.view?.type === "3d" && option !== "CIMPointSymbol") {
        selectOption.disabled = true;
        selectOption.label += " (Not available in 3D)";
        selectOption.innerText += " (Not available in 3D)";
      }
      this.symbolSelect.appendChild(selectOption);
    });

    this.maxScaleLabel.innerText = "minScale: ";
    this.maxScaleLabel.layout = "inline";
    this.cimSymbolBlock.appendChild(this.maxScaleLabel);

    this.maxScaleInputNumber.min = 0;
    this.maxScaleInputNumber.step = 500;
    this.maxScaleInputNumber.value = "0";
    this.maxScaleLabel.appendChild(this.maxScaleInputNumber);

    this.maxScaleInputNumber.addEventListener(
      "calciteInputNumberChange",
      () => {
        this.handleMaxScaleChange();
      }
    );

    this.minScaleLabel.innerText = "maxScale: ";
    this.minScaleLabel.layout = "inline";
    this.cimSymbolBlock.appendChild(this.minScaleLabel);

    this.minScaleInputNumber.min = 0;
    this.minScaleInputNumber.step = 500;
    this.minScaleInputNumber.value = "0";
    this.minScaleLabel.appendChild(this.minScaleInputNumber);

    this.minScaleInputNumber.addEventListener(
      "calciteInputNumberChange",
      () => {
        this.handleMinScaleChange();
      }
    );

    this.view?.when(() => {
      console.log("view ready");

      this.view?.goTo(this.view?.graphics);
    });

    this.update();
  }
  handleSymbolChange() {
    switch (this.symbolSelect.value) {
      case "CIMPointSymbol":
        this.cimSymbolReference.symbol = this.cimPointSymbol;
        break;

      case "CIMLineSymbol":
        this.cimSymbolReference.symbol = this.cimLineSymbol;
        break;

      case "CIMPolygonSymbol":
        this.cimSymbolReference.symbol = this.cimPolygonSymbol;
        break;

      default:
        break;
    }
    this.update();
  }

  handleMaxScaleChange() {
    this.cimSymbolReference.maxScale = Number(this.maxScaleInputNumber.value);
    this.update();
  }

  handleMinScaleChange() {
    this.cimSymbolReference.minScale = Number(this.minScaleInputNumber.value);
    this.update();
  }

  update() {
    // this.cimSymbol = new CIMSymbol({
    //   data: this.cimSymbolReference,
    // });

    // this.pointGraphic = new Graphic({
    //   geometry: this.point,
    //   symbol: this.cimSymbol,
    // });

    if (this.view) {
      this.view.graphics.removeAll();
      switch (this.symbolSelect.value) {
        case "CIMPointSymbol":
          this.view.graphics.add(this.pointGraphic.clone());
          break;

        case "CIMLineSymbol":
          this.view.graphics.add(this.polylineGraphic.clone());
          break;

        case "CIMPolygonSymbol":
          this.view.graphics.add(this.polygonGraphic.clone());
          break;

        default:
          break;
      }
    }

    if (this.codeOutputParagraph) {
      this.codeOutputParagraph.innerText = JSON.stringify(
        this.cimSymbol.toJSON(),
        null,
        4
      );
    }
  }
}

export default CIMSymbolPlayground;
