import MapView from "@arcgis/core/views/MapView";
import SceneView from "@arcgis/core/views/SceneView";
import CIMSymbol from "@arcgis/core/symbols/CIMSymbol";
import Graphic from "@arcgis/core/Graphic";
import Point from "@arcgis/core/geometry/Point";

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

  private primitiveOverrides: __esri.PrimitiveOverride[] = [];

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
  }

  init() {
    this.parentElement.appendChild(this.cimSymbolBlock);

    this.cimSymbolBlock.collapsible = false;
    this.cimSymbolBlock.heading = "CIMSymbol";
    this.cimSymbolBlock.open = true;

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

  handleMaxScaleChange() {
    this.cimSymbolReference.maxScale = Number(this.maxScaleInputNumber.value);
    this.update();
  }

  handleMinScaleChange() {
    this.cimSymbolReference.minScale = Number(this.minScaleInputNumber.value);
    this.update();
  }

  update() {
    this.cimSymbol = new CIMSymbol({
      data: this.cimSymbolReference,
    });

    this.pointGraphic = new Graphic({
      geometry: this.point,
      symbol: this.cimSymbol,
    });

    if (this.view) {
      this.view.graphics.removeAll();
      this.view.graphics.add(this.pointGraphic.clone());
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
