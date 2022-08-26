import MapView from "@arcgis/core/views/MapView";
import SceneView from "@arcgis/core/views/SceneView";

class CIMSymbolPlayground {
  private cimSymbolBlock = document.createElement("calcite-block");

  constructor(
    private parentElement: HTMLElement,
    private codeOutputParagraph?: HTMLParagraphElement | null,
    private view?: MapView | SceneView | null
  ) {
    this.cimSymbolBlock = document.createElement("calcite-block");
  }

  init() {
    this.parentElement.appendChild(this.cimSymbolBlock);

    this.cimSymbolBlock.collapsible = false;
    this.cimSymbolBlock.heading = "CIMSymbol";
    this.cimSymbolBlock.open = true;
  }
}

export default CIMSymbolPlayground;
