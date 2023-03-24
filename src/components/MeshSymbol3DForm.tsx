import Collection from "@arcgis/core/core/Collection";
import React from "react";
import MeshSymbol3DSymbolLayersForm from "./MeshSymbol3DSymbolLayersForm";

interface Props {
  updateSymbolLayers: (newSymbolLayers: Collection) => void;
}

const MeshSymbol3DForm = ({ updateSymbolLayers }: Props) => {
  return (
    <React.Fragment>
      <MeshSymbol3DSymbolLayersForm
        updateSymbolLayers={updateSymbolLayers}
      ></MeshSymbol3DSymbolLayersForm>
    </React.Fragment>
  );
};

export default MeshSymbol3DForm;
