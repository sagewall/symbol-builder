import {
  CalciteBlock,
  CalciteColorPicker,
  CalciteLabel,
  CalciteOption,
  CalciteSelect,
} from "@esri/calcite-components-react";
import "@esri/calcite-components/dist/components/calcite-block";
import "@esri/calcite-components/dist/components/calcite-color-picker";
import "@esri/calcite-components/dist/components/calcite-label";
import "@esri/calcite-components/dist/components/calcite-option";
import "@esri/calcite-components/dist/components/calcite-select";
import React, { useState } from "react";
import { blockStyles, labelStyles } from "../lib/styles";

interface Props {
  handleColorChange: ((value: string) => void) | undefined;
  handlePlacementChange: ((value: string) => void) | undefined;
  handleStyleChange: ((value: string) => void) | undefined;
}

const LineSymbolMarkerForm = ({
  handleColorChange,
  handlePlacementChange,
  handleStyleChange,
}: Props) => {
  const markerPlacementOptions = ["begin-end", "begin", "end"];
  const markerStyleOptions = [
    "arrow",
    "circle",
    "square",
    "diamond",
    "cross",
    "x",
  ];

  const [color, setColor] = useState("#007ac2");
  const [placement, setPlacement] = useState("begin-end");
  const [style, setStyle] = useState("arrow");

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
              if (handleColorChange) {
                handleColorChange(event.target.value as string);
              }
            }}
            value={color}
          ></CalciteColorPicker>
        </CalciteLabel>
      </CalciteBlock>

      <CalciteLabel layout="default" style={labelStyles}>
        placement
        <CalciteSelect
          label={"marker placement selection"}
          onCalciteSelectChange={(event) => {
            setPlacement(event.target.value);
            if (handlePlacementChange) {
              handlePlacementChange(event.target.value);
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
              handleStyleChange(event.target.value);
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
