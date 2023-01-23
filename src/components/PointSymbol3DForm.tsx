import Collection from "@arcgis/core/core/Collection";
import { CalciteBlock } from "@esri/calcite-components-react";
import "@esri/calcite-components/dist/components/calcite-block";
import React from "react";
import { blockStyles } from "./lib/styles";
import LineCallout3DForm from "./LineCallout3DForm";
import PointSymbol3DLayerCollectionForm from "./PointSymbol3DLayerCollectionForm";
import Symbol3DVerticalOffsetForm from "./Symbol3DVerticalOffsetForm";

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
  updateSymbolLayers,
}: Props) => {
  return (
    <React.Fragment>
      <CalciteBlock style={blockStyles} collapsible heading={"callout"}>
        <LineCallout3DForm
          handleColorChange={handleCalloutColorChange}
          handleSizeChange={handleCalloutSizeChange}
        ></LineCallout3DForm>
      </CalciteBlock>
      <PointSymbol3DLayerCollectionForm
        updateSymbolLayers={updateSymbolLayers}
      ></PointSymbol3DLayerCollectionForm>
      <CalciteBlock style={blockStyles} collapsible heading={"verticalOffset"}>
        <Symbol3DVerticalOffsetForm
          handleMaxWorldLengthChange={handleVerticalOffsetMaxWorldLengthChange}
          handleMinWorldLengthChange={handleVerticalOffsetMinWorldLengthChange}
          handleScreenLengthChange={handleVerticalOffsetScreenLengthChange}
        ></Symbol3DVerticalOffsetForm>
      </CalciteBlock>
    </React.Fragment>
  );
};

export default PointSymbol3DForm;
