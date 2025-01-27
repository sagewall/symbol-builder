import React, { useState } from "react";
import { labelStyles } from "./lib/styles";

interface Props {
  layerIndex: number;
  handleColorChange: (layerIndex: number, value: string) => void;
}

const PathSymbol3DLayerMaterialForm = ({ layerIndex, handleColorChange }: Props) => {
  const [color, setColor] = useState("#007ac2");

  return (
    <React.Fragment>
      <calcite-label layout="default" style={labelStyles}>
        color
        <calcite-input
          oncalciteInputInput={(event) => {
            if (event.target.value) {
              setColor(event.target.value.toString());
            }
            if (handleColorChange) {
              handleColorChange(layerIndex, event.target.value as string);
            }
          }}
          type="color"
          value={color}
        ></calcite-input>
      </calcite-label>
    </React.Fragment>
  );
};

export default PathSymbol3DLayerMaterialForm;
