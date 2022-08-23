import MapView from "@arcgis/core/views/MapView";
import SceneView from "@arcgis/core/views/SceneView";

class CIMSymbolPlayground {
  cimSymbolBlock: HTMLCalciteBlockElement;

  constructor(
    public parentElement: HTMLElement,
    public codeOutputParagraph?: HTMLParagraphElement | null,
    public view?: MapView | SceneView | null
  ) {
    this.cimSymbolBlock = document.createElement("calcite-block");
    this.cimSymbolBlock.collapsible = false;
    this.cimSymbolBlock.heading = "CIMSymbol";
    this.cimSymbolBlock.open = true;
    this.parentElement.appendChild(this.cimSymbolBlock);
  }
}

export default CIMSymbolPlayground;
