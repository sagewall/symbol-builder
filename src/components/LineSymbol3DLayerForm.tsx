import {
  CalciteBlock,
  CalciteInputNumber,
  CalciteLabel,
} from "@esri/calcite-components-react";
import React, { useState } from "react";
import { blockStyles, labelStyles } from "./lib/styles";
import LineSymbol3DLayerMaterialForm from "./LineSymbol3DLayerMaterialForm";

interface Props {
  layerIndex: number;
  handleLineSymbol3DLayerMaterialColorChange: (
    layerIndex: number,
    value: string
  ) => void;
  handleSizeChange: (layerIndex: number, value: string) => void;
}

const LineSymbol3DLayerForm = ({
  layerIndex,
  handleLineSymbol3DLayerMaterialColorChange:
    handleLineSymbol3DLayerMaterialColorChange,
  handleSizeChange,
}: Props) => {
  const [size, setSize] = useState("12");

  return (
    <React.Fragment>
      <CalciteBlock style={blockStyles} collapsible heading={"material"}>
        <LineSymbol3DLayerMaterialForm
          layerIndex={layerIndex}
          handleColorChange={handleLineSymbol3DLayerMaterialColorChange}
        ></LineSymbol3DLayerMaterialForm>
      </CalciteBlock>

      <CalciteLabel layout="default" style={labelStyles}>
        size
        <CalciteInputNumber
          label={"size input"}
          min={0}
          onCalciteInputNumberChange={(event) => {
            setSize(event.target.value);
            handleSizeChange(layerIndex, event.target.value);
          }}
          value={size}
        ></CalciteInputNumber>
      </CalciteLabel>
    </React.Fragment>
  );
};

export default LineSymbol3DLayerForm;
