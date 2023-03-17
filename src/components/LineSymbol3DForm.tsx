import Collection from "@arcgis/core/core/Collection";
import React from "react";
import LineSymbol3DSymbolLayersForm from "./LineSymbol3DSymbolLayersForm";

interface Props {
  updateSymbolLayers: (newSymbolLayers: Collection) => void;
}

const LineSymbol3DForm = ({ updateSymbolLayers }: Props) => {
  return (
    <React.Fragment>
      <LineSymbol3DSymbolLayersForm
        updateSymbolLayers={updateSymbolLayers}
      ></LineSymbol3DSymbolLayersForm>
    </React.Fragment>
  );
};

export default LineSymbol3DForm;
