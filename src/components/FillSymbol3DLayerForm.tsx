import { CalciteBlock } from "@esri/calcite-components-react";
import React from "react";
import FillSymbol3DLayerMaterialForm from "./FillSymbol3DLayerMaterialForm";
import { blockStyles } from "./lib/styles";

interface Props {
  layerIndex: number;
  handleFillSymbol3DLayerMaterialColorChange: (layerIndex: number, value: string) => void;
}

const FillSymbol3DLayerForm = ({
  layerIndex,
  handleFillSymbol3DLayerMaterialColorChange: handleFillSymbol3DLayerMaterialColorChange
}: Props) => {
  return (
    <React.Fragment>
      <CalciteBlock style={blockStyles} collapsible heading={"material"}>
        <FillSymbol3DLayerMaterialForm
          layerIndex={layerIndex}
          handleColorChange={handleFillSymbol3DLayerMaterialColorChange}
        ></FillSymbol3DLayerMaterialForm>
      </CalciteBlock>
    </React.Fragment>
  );
};

export default FillSymbol3DLayerForm;
