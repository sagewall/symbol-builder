import { CalciteInput, CalciteLabel } from "@esri/calcite-components-react";
import React, { useState } from "react";
import { labelStyles } from "./lib/styles";

interface Props {
  layerIndex: number;
  handleColorChange: (layerIndex: number, value: string) => void;
}

const ObjectSymbol3DLayerMaterialForm = ({ layerIndex, handleColorChange }: Props) => {
  const [color, setColor] = useState("#ff0000");

  return (
    <React.Fragment>
      <CalciteLabel layout="default" style={labelStyles}>
        color
        <CalciteInput
          onCalciteInputInput={(event) => {
            if (event.target.value) {
              setColor(event.target.value.toString());
            }
            if (handleColorChange) {
              handleColorChange(layerIndex, event.target.value as string);
            }
          }}
          type="color"
          value={color}
        />
      </CalciteLabel>
    </React.Fragment>
  );
};

export default ObjectSymbol3DLayerMaterialForm;
