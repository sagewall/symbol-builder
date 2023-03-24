import {
  CalciteBlock,
  CalciteColorPicker,
  CalciteLabel,
  CalciteOption,
  CalciteSelect
} from "@esri/calcite-components-react";
import React, { useState } from "react";
import { blockStyles, labelStyles } from "./lib/styles";
import { ColorMixMode } from "./lib/types";
import { COLOR_MIX_MODE_OPTIONS } from "./lib/constants";

interface Props {
  layerIndex: number;
  handleColorChange: (layerIndex: number, value: string) => void;
  handleColorMixModeChange: (layerIndex: number, value: ColorMixMode) => void;
}

const FillSymbol3DLayerMaterialForm = ({
  layerIndex,
  handleColorChange,
  handleColorMixModeChange
}: Props) => {
  const [color, setColor] = useState("#007ac2");
  const [colorMixMode, setColorMixMode] = useState("multiply");

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

      <CalciteLabel layout="default" style={labelStyles}>
        colorMixMode
        <CalciteSelect
          label={"cap selection"}
          onCalciteSelectChange={(event) => {
            setColorMixMode(event.target.value);
            handleColorMixModeChange(layerIndex, event.target.value as ColorMixMode);
          }}
          value={colorMixMode}
        >
          {COLOR_MIX_MODE_OPTIONS.map((option, index) => (
            <CalciteOption key={index}>{option}</CalciteOption>
          ))}
        </CalciteSelect>
      </CalciteLabel>
    </React.Fragment>
  );
};

export default FillSymbol3DLayerMaterialForm;
