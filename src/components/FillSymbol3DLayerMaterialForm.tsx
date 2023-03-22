import {
  CalciteBlock,
  CalciteColorPicker,
  CalciteLabel,
  CalciteOption,
  CalciteSelect
} from "@esri/calcite-components-react";
import React, { useState } from "react";
import { blockStyles, labelStyles } from "./lib/styles";
import { FillSymbol3DColorMixModeOption } from "./lib/types";

interface Props {
  layerIndex: number;
  handleColorChange: (layerIndex: number, value: string) => void;
  handleColorMixModeChange: (layerIndex: number, value: string) => void;
}

const FillSymbol3DLayerMaterialForm = ({
  layerIndex,
  handleColorChange,
  handleColorMixModeChange
}: Props) => {
  const colorMixModeOptions = ["multiply", "tint", "replace"];

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
            handleColorMixModeChange(
              layerIndex,
              event.target.value as FillSymbol3DColorMixModeOption
            );
          }}
          value={colorMixMode}
        >
          {colorMixModeOptions.map((option, index) => (
            <CalciteOption key={index}>{option}</CalciteOption>
          ))}
        </CalciteSelect>
      </CalciteLabel>
    </React.Fragment>
  );
};

export default FillSymbol3DLayerMaterialForm;
