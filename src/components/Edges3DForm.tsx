import {
  CalciteBlock,
  CalciteColorPicker,
  CalciteInputNumber,
  CalciteLabel
} from "@esri/calcite-components-react";
import React, { useState } from "react";
import { blockStyles, labelStyles } from "./lib/styles";

interface Props {
  layerIndex: number;
  handleColorChange: (layerIndex: number, value: string) => void;
  handleExtensionLengthChange: (layerIndex: number, value: string) => void;
  handleSizeChange: (layerIndex: number, value: string) => void;
}

const Edges3DForm = ({
  layerIndex,
  handleColorChange,
  handleExtensionLengthChange,
  handleSizeChange
}: Props) => {
  const [color, setColor] = useState("#000000");
  const [extensionLength, setExtensionLength] = useState("0");
  const [size, setSize] = useState("1");

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
        extensionLength
        <CalciteInputNumber
          label={"extensionLength input"}
          onCalciteInputNumberChange={(event) => {
            setExtensionLength(event.target.value);
            handleExtensionLengthChange(layerIndex, event.target.value);
          }}
          value={extensionLength}
        ></CalciteInputNumber>
      </CalciteLabel>

      <CalciteLabel layout="default" style={labelStyles}>
        size
        <CalciteInputNumber
          label={"size input"}
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

export default Edges3DForm;
