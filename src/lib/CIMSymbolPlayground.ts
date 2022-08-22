import MapView from "@arcgis/core/views/MapView";
import SceneView from "@arcgis/core/views/SceneView";

class CIMSymbolPlayground {
  cimSymbolBlock: HTMLCalciteBlockElement;
  codeOutputParagraph: HTMLParagraphElement | null;
  parentElement: HTMLElement;
  view: MapView | SceneView | null;

  constructor(
    parentElement: HTMLElement,
    codeOutputParagraph: HTMLParagraphElement | null = null,
    view: MapView | SceneView | null = null
  ) {
    this.parentElement = parentElement;
    this.codeOutputParagraph = codeOutputParagraph;
    this.view = view;

    this.cimSymbolBlock = document.createElement("calcite-block");
    this.cimSymbolBlock.collapsible = false;
    this.cimSymbolBlock.heading = "CIMSymbol";
    this.cimSymbolBlock.open = true;
    this.parentElement.appendChild(this.cimSymbolBlock);
  }
}

export default CIMSymbolPlayground;
