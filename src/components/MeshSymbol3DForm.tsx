import type Collection from "@arcgis/core/core/Collection.js";
import type MeshSymbol3D from "@arcgis/core/symbols/MeshSymbol3D.js";
import MeshSymbol3DSymbolLayersForm from "./MeshSymbol3DSymbolLayersForm";

interface Props {
  symbolLayers: MeshSymbol3D["symbolLayers"];
  updateSymbolLayers: (newSymbolLayers: Collection) => void;
}

function MeshSymbol3DForm({
  symbolLayers,
  updateSymbolLayers,
}: Props): React.ReactElement {
  return (
    <>
      <MeshSymbol3DSymbolLayersForm
        symbolLayers={symbolLayers}
        updateSymbolLayers={updateSymbolLayers}
      ></MeshSymbol3DSymbolLayersForm>
    </>
  );
}

export default MeshSymbol3DForm;
