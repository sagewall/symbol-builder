import type Collection from "@arcgis/core/core/Collection.js";
import PolygonSymbol3DSymbolLayersForm from "./PolygonSymbol3DSymbolLayersForm";

interface Props {
  updateSymbolLayers: (newSymbolLayers: Collection) => void;
}

function PolygonSymbol3DForm({
  updateSymbolLayers,
}: Props): React.ReactElement {
  return (
    <>
      <PolygonSymbol3DSymbolLayersForm
        updateSymbolLayers={updateSymbolLayers}
      ></PolygonSymbol3DSymbolLayersForm>
    </>
  );
}

export default PolygonSymbol3DForm;
