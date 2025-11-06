import type Collection from "@arcgis/core/core/Collection";
import MeshSymbol3DSymbolLayersForm from "./MeshSymbol3DSymbolLayersForm";

interface Props {
  updateSymbolLayers: (newSymbolLayers: Collection) => void;
}

function MeshSymbol3DForm({ updateSymbolLayers }: Props) {
  return (
    <>
      <MeshSymbol3DSymbolLayersForm
        updateSymbolLayers={updateSymbolLayers}
      ></MeshSymbol3DSymbolLayersForm>
    </>
  );
}

export default MeshSymbol3DForm;
