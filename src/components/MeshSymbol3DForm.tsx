import type Collection from "@arcgis/core/core/Collection.js";
import MeshSymbol3DSymbolLayersForm from "./MeshSymbol3DSymbolLayersForm";

interface Props {
  updateSymbolLayers: (newSymbolLayers: Collection) => void;
}

function MeshSymbol3DForm({ updateSymbolLayers }: Props): React.ReactElement {
  return (
    <>
      <MeshSymbol3DSymbolLayersForm
        updateSymbolLayers={updateSymbolLayers}
      ></MeshSymbol3DSymbolLayersForm>
    </>
  );
}

export default MeshSymbol3DForm;
