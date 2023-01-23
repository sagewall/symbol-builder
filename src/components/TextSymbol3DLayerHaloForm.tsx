import {
  CalciteBlock,
  CalciteColorPicker,
  CalciteInputNumber,
  CalciteLabel,
} from "@esri/calcite-components-react";
import React, { useState } from "react";
import { blockStyles, labelStyles } from "./lib/styles";

interface Props {
  layerIndex: number;
  handleColorChange: (layerIndex: number, value: string) => void;
  handleSizeChange: (layerIndex: number, value: string) => void;
}

const TextSymbol3DLayerHaloForm = ({
  layerIndex,
  handleColorChange,
  handleSizeChange,
}: Props) => {
  const [color, setColor] = useState("#000000");
  const [size, setSize] = useState("0");

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

export default TextSymbol3DLayerHaloForm;
