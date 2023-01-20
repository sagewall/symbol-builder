import {
  CalciteBlock,
  CalciteColorPicker,
  CalciteLabel,
} from "@esri/calcite-components-react";
import "@esri/calcite-components/dist/components/calcite-block";
import "@esri/calcite-components/dist/components/calcite-color-picker";
import "@esri/calcite-components/dist/components/calcite-label";
import React, { useState } from "react";
import { blockStyles, labelStyles } from "./lib/styles";

interface Props {
  layerIndex: number;
  handleColorChange: (value: string, layerIndex: number) => void;
}

const TextSymbol3DLayerBackgroundForm = ({
  layerIndex,
  handleColorChange,
}: Props) => {
  const [color, setColor] = useState("#ff0000");

  return (
    <React.Fragment>
      <CalciteBlock style={blockStyles} collapsible heading={"material"}>
        <CalciteBlock style={blockStyles} collapsible heading={"color"}>
          <CalciteLabel layout="default" style={labelStyles}>
            color
            <CalciteColorPicker
              onCalciteColorPickerChange={(event) => {
                if (event.target.value) {
                  setColor(event.target.value.toString());
                }
                handleColorChange(event.target.value as string, layerIndex);
              }}
              value={color}
            ></CalciteColorPicker>
          </CalciteLabel>
        </CalciteBlock>
      </CalciteBlock>
    </React.Fragment>
  );
};

export default TextSymbol3DLayerBackgroundForm;
