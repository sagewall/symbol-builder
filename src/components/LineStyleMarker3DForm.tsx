import {
  CalciteBlock,
  CalciteColorPicker,
  CalciteLabel,
  CalciteOption,
  CalciteSelect,
} from "@esri/calcite-components-react";
import React, { useState } from "react";
import { blockStyles, labelStyles } from "./lib/styles";
import {
  LineStyleMarker3DPlacementOption,
  LineStyleMarker3DStyleOption,
} from "./lib/types";

interface Props {
  layerIndex: number;
  handleColorChange: (layerIndex: number, value: string) => void;
  handlePlacementChange: (layerIndex: number, value: string) => void;
  handleStyleChange: (layerIndex: number, value: string) => void;
}

const LineStyleMarker3DForm = ({
  layerIndex,
  handleColorChange,
  handlePlacementChange,
  handleStyleChange,
}: Props) => {
  const placementOptions = ["begin-end", "begin", "end"];
  const styleOptions = ["arrow", "circle", "square", "diamond", "cross", "x"];

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
        placement
        <CalciteSelect
          label={"placement selection"}
          onCalciteSelectChange={(event) => {
            setPlacement(event.target.value);
            handlePlacementChange(
              layerIndex,
              event.target.value as LineStyleMarker3DPlacementOption
            );
          }}
          value={placement}
        >
          {placementOptions.map((option, index) => (
            <CalciteOption key={index}>{option}</CalciteOption>
          ))}
        </CalciteSelect>
      </CalciteLabel>
      <CalciteLabel layout="default" style={labelStyles}>
        style
        <CalciteSelect
          label={"style selection"}
          onCalciteSelectChange={(event) => {
            setStyle(event.target.value);
            handleStyleChange(
              layerIndex,
              event.target.value as LineStyleMarker3DStyleOption
            );
          }}
          value={style}
        >
          {styleOptions.map((option, index) => (
            <CalciteOption key={index}>{option}</CalciteOption>
          ))}
        </CalciteSelect>
      </CalciteLabel>
    </React.Fragment>
  );
};

export default LineStyleMarker3DForm;
