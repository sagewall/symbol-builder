import type Collection from "@arcgis/core/core/Collection";
import { CalciteBlock } from "@esri/calcite-components-react";
import React from "react";
import { blockStyles } from "./lib/styles";
import PointSymbol3DCalloutForm from "./PointSymbol3DCalloutForm";
import PointSymbol3DSymbolLayersForm from "./PointSymbol3DSymbolLayersForm";
import PointSymbol3DVerticalOffsetForm from "./PointSymbol3DVerticalOffsetForm";

interface Props {
  handleCalloutColorChange: (value: string) => void;
  handleCalloutSizeChange: (value: string) => void;
  handleVerticalOffsetMaxWorldLengthChange: (value: string) => void;
  handleVerticalOffsetMinWorldLengthChange: (value: string) => void;
  handleVerticalOffsetScreenLengthChange: (value: string) => void;
  updateSymbolLayers: (newSymbolLayers: Collection) => void;
}

const PointSymbol3DForm = ({
  handleCalloutColorChange,
  handleCalloutSizeChange,
  handleVerticalOffsetMaxWorldLengthChange,
  handleVerticalOffsetMinWorldLengthChange,
  handleVerticalOffsetScreenLengthChange,
  updateSymbolLayers
}: Props) => {
  return (
    <React.Fragment>
      <CalciteBlock style={blockStyles} collapsible heading={"callout"}>
        <PointSymbol3DCalloutForm
          handleColorChange={handleCalloutColorChange}
          handleSizeChange={handleCalloutSizeChange}
        ></PointSymbol3DCalloutForm>
      </CalciteBlock>
      <PointSymbol3DSymbolLayersForm
        updateSymbolLayers={updateSymbolLayers}
      ></PointSymbol3DSymbolLayersForm>
      <CalciteBlock style={blockStyles} collapsible heading={"verticalOffset"}>
        <PointSymbol3DVerticalOffsetForm
          handleMaxWorldLengthChange={handleVerticalOffsetMaxWorldLengthChange}
          handleMinWorldLengthChange={handleVerticalOffsetMinWorldLengthChange}
          handleScreenLengthChange={handleVerticalOffsetScreenLengthChange}
        ></PointSymbol3DVerticalOffsetForm>
      </CalciteBlock>
    </React.Fragment>
  );
};

export default PointSymbol3DForm;
