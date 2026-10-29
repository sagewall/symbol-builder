import type Collection from "@arcgis/core/core/Collection.js";
import type PolygonSymbol3D from "@arcgis/core/symbols/PolygonSymbol3D.js";
import PolygonSymbol3DSymbolLayersForm from "./PolygonSymbol3DSymbolLayersForm";

interface Props {
  symbolLayers: PolygonSymbol3D["symbolLayers"];
  updateSymbolLayers: (newSymbolLayers: Collection) => void;
}

function PolygonSymbol3DForm({
  symbolLayers,
  updateSymbolLayers,
}: Props): React.ReactElement {
  return (
    <>
      <PolygonSymbol3DSymbolLayersForm
        symbolLayers={symbolLayers}
        updateSymbolLayers={updateSymbolLayers}
      ></PolygonSymbol3DSymbolLayersForm>
    </>
  );
}

export default PolygonSymbol3DForm;
