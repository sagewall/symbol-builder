import {
  CalciteBlock,
  CalciteColorPicker,
  CalciteLabel,
} from "@esri/calcite-components-react";
import React, { useState } from "react";
import { blockStyles, labelStyles } from "./lib/styles";

interface Props {
  layerIndex: number;
  handleColorChange: (layerIndex: number, value: string) => void;
}

const IconSymbol3DLayerMaterialForm = ({
  layerIndex,
  handleColorChange,
}: Props) => {
  const [color, setColor] = useState("#ff0000");

  return (
    <React.Fragment>
      <CalciteBlock style={blockStyles} collapsible heading={"color"}>
        <CalciteLabel layout="default" style={labelStyles}>
          color
          <CalciteColorPicker
            onCalciteColorPickerChange={(event) => {
              if (event.target.value) {
                setColor(event.target.value.toString());
              }
              handleColorChange(layerIndex, event.target.value as string);
            }}
            value={color}
          ></CalciteColorPicker>
        </CalciteLabel>
      </CalciteBlock>
    </React.Fragment>
  );
};

export default IconSymbol3DLayerMaterialForm;
