import React, { useState } from "react";
import { labelStyles } from "./lib/styles";

interface Props {
  layerIndex: number;
  handleColorChange: (layerIndex: number, value: string) => void;
}

const IconSymbol3DLayerMaterialForm = ({ layerIndex, handleColorChange }: Props) => {
  const [color, setColor] = useState("#ff0000");

  return (
    <React.Fragment>
      <calcite-label layout="default" style={labelStyles}>
        color
        <calcite-input
          oncalciteInputInput={(event) => {
            if (event.target.value) {
              setColor(event.target.value.toString());
            }
            handleColorChange(layerIndex, event.target.value as string);
          }}
          type="color"
          value={color}
        ></calcite-input>
      </calcite-label>
    </React.Fragment>
  );
};

export default IconSymbol3DLayerMaterialForm;
