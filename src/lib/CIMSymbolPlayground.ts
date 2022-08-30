import MapView from "@arcgis/core/views/MapView";
import SceneView from "@arcgis/core/views/SceneView";
import CIMSymbol from "@arcgis/core/symbols/CIMSymbol";
import Graphic from "@arcgis/core/Graphic";
import Point from "@arcgis/core/geometry/Point";

class CIMSymbolPlayground {
  private cimSymbolBlock = document.createElement("calcite-block");

  private cimSymbolReference: __esri.CIMSymbolReference = {
    type: "CIMSymbolReference",
    primitiveOverrides: undefined,
    symbol: {
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
    },
    minScale: 0,
    maxScale: 0,
  };

  private cimSymbol: CIMSymbol;

  point = new Point({
    x: -105.175,
    y: 40.1,
  });
  private pointGraphic: Graphic;

  constructor(
    private parentElement: HTMLElement,
    private codeOutputParagraph?: HTMLParagraphElement | null,
    private view?: MapView | SceneView | null
  ) {
    this.cimSymbolBlock = document.createElement("calcite-block");

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

    this.view?.when(() => {
      console.log("view ready");

      this.view?.goTo(this.view?.graphics);
    });

    this.update();
  }

  update() {
    console.log("update");
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
