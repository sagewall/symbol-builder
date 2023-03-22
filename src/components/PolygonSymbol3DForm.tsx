import Collection from "@arcgis/core/core/Collection";
import React from "react";
import PolygonSymbol3DSymbolLayersForm from "./PolygonSymbol3DSymbolLayersForm";

interface Props {
  updateSymbolLayers: (newSymbolLayers: Collection) => void;
}

const PolygonSymbol3DForm = ({ updateSymbolLayers }: Props) => {
  return (
    <React.Fragment>
      <PolygonSymbol3DSymbolLayersForm
        updateSymbolLayers={updateSymbolLayers}
      ></PolygonSymbol3DSymbolLayersForm>
    </React.Fragment>
  );
};

export default PolygonSymbol3DForm;
