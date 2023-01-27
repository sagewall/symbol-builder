import {
  CalciteBlock,
  CalciteColorPicker,
} from "@esri/calcite-components-react";
import React, { useState } from "react";
import { blockStyles } from "./lib/styles";

interface Props {
  layerIndex: number;
  handleColorChange: (layerIndex: number, value: string) => void;
}

const ObjectSymbol3DLayerMaterialForm = ({
  layerIndex,
  handleColorChange,
}: Props) => {
  const [color, setColor] = useState("#ff0000");

  return (
    <React.Fragment>
      <CalciteBlock style={blockStyles} collapsible heading={"color"}>
        <CalciteColorPicker
          onCalciteColorPickerChange={(event) => {
            if (event.target.value) {
              setColor(event.target.value.toString());
            }
            handleColorChange(layerIndex, event.target.value as string);
          }}
          allowEmpty
          hideChannels
          hideSaved
          scale="s"
          value={color}
        ></CalciteColorPicker>
      </CalciteBlock>
    </React.Fragment>
  );
};

export default ObjectSymbol3DLayerMaterialForm;
