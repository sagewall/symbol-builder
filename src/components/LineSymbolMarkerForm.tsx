import {
  CalciteBlock,
  CalciteColorPicker,
  CalciteLabel,
  CalciteOption,
  CalciteSelect
} from "@esri/calcite-components-react";
import React, { useState } from "react";
import { blockStyles, labelStyles } from "./lib/styles";
import { LineSymbolMarkerPlacementOption, LineSymbolMarkerStyleOption } from "./lib/types";

interface Props {
  handleColorChange: ((value: string) => void) | undefined;
  handlePlacementChange: ((value: LineSymbolMarkerPlacementOption) => void) | undefined;
  handleStyleChange: ((value: LineSymbolMarkerStyleOption) => void) | undefined;
}

const LineSymbolMarkerForm = ({
  handleColorChange,
  handlePlacementChange,
  handleStyleChange
}: Props) => {
  const markerPlacementOptions = ["begin-end", "begin", "end"];
  const markerStyleOptions = ["arrow", "circle", "square", "diamond", "cross", "x"];

  const [color, setColor] = useState("#007ac2");
  const [placement, setPlacement] = useState("begin-end");
  const [style, setStyle] = useState("arrow");

  return (
    <React.Fragment>
      <CalciteBlock style={blockStyles} collapsible heading={"color"}>
        <CalciteColorPicker
          onCalciteColorPickerChange={(event) => {
            if (event.target.value) {
              setColor(event.target.value.toString());
            }
            if (handleColorChange) {
              handleColorChange(event.target.value as string);
            }
          }}
          allowEmpty
          hideChannels
          hideSaved
          scale="s"
          value={color}
        ></CalciteColorPicker>
      </CalciteBlock>

      <CalciteLabel layout="default" style={labelStyles}>
        placement
        <CalciteSelect
          label={"marker placement selection"}
          onCalciteSelectChange={(event) => {
            setPlacement(event.target.value);
            if (handlePlacementChange) {
              handlePlacementChange(event.target.value as LineSymbolMarkerPlacementOption);
            }
          }}
          value={placement}
        >
          {markerPlacementOptions.map((option, index) => (
            <CalciteOption key={index}>{option}</CalciteOption>
          ))}
        </CalciteSelect>
      </CalciteLabel>

      <CalciteLabel layout="default" style={labelStyles}>
        style
        <CalciteSelect
          label={"marker style selection"}
          onCalciteSelectChange={(event) => {
            setStyle(event.target.value);
            if (handleStyleChange) {
              handleStyleChange(event.target.value as LineSymbolMarkerStyleOption);
            }
          }}
          value={style}
        >
          {markerStyleOptions.map((option, index) => (
            <CalciteOption key={index}>{option}</CalciteOption>
          ))}
        </CalciteSelect>
      </CalciteLabel>
    </React.Fragment>
  );
};

export default LineSymbolMarkerForm;
