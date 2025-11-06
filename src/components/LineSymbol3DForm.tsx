import type Collection from "@arcgis/core/core/Collection";
import LineSymbol3DSymbolLayersForm from "./LineSymbol3DSymbolLayersForm";

interface Props {
  updateSymbolLayers: (newSymbolLayers: Collection) => void;
}

const LineSymbol3DForm = ({ updateSymbolLayers }: Props) => {
  return (
    <>
      <LineSymbol3DSymbolLayersForm
        updateSymbolLayers={updateSymbolLayers}
      ></LineSymbol3DSymbolLayersForm>
    </>
  );
};

export default LineSymbol3DForm;
