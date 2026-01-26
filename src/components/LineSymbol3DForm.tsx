import type Collection from "@arcgis/core/core/Collection.js";
import LineSymbol3DSymbolLayersForm from "./LineSymbol3DSymbolLayersForm";

interface Props {
  updateSymbolLayers: (newSymbolLayers: Collection) => void;
}

function LineSymbol3DForm({ updateSymbolLayers }: Props): React.ReactElement {
  return (
    <>
      <LineSymbol3DSymbolLayersForm updateSymbolLayers={updateSymbolLayers}></LineSymbol3DSymbolLayersForm>
    </>
  );
}

export default LineSymbol3DForm;
