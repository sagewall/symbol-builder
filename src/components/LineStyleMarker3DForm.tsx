import type LineStyleMarker3D from "@arcgis/core/symbols/LineStyleMarker3D";
import {
  CalciteInput,
  CalciteLabel,
  CalciteOption,
  CalciteSelect
} from "@esri/calcite-components-react";
import React, { useState } from "react";
import { LINE_STYLE_MARKER_3D_STYLE_OPTIONS, MARKER_PLACEMENT_OPTIONS } from "./lib/constants";
import { labelStyles } from "./lib/styles";

interface Props {
  layerIndex: number;
  handleColorChange: (layerIndex: number, value: string) => void;
  handlePlacementChange: (
    layerIndex: number,
    value: InstanceType<typeof LineStyleMarker3D>["placement"]
  ) => void;
  handleStyleChange: (
    layerIndex: number,
    value: InstanceType<typeof LineStyleMarker3D>["style"]
  ) => void;
}

const LineStyleMarker3DForm = ({
  layerIndex,
  handleColorChange,
  handlePlacementChange,
  handleStyleChange
}: Props) => {
  const [color, setColor] = useState("#007ac2");
  const [placement, setPlacement] = useState("begin-end");
  const [style, setStyle] = useState("arrow");

  return (
    <React.Fragment>
      <CalciteLabel layout="default" style={labelStyles}>
        color
        <CalciteInput
          onCalciteInputInput={(event) => {
            if (event.target.value) {
              setColor(event.target.value.toString());
            }
            handleColorChange(layerIndex, event.target.value as string);
          }}
          type="color"
          value={color}
        />
      </CalciteLabel>

      <CalciteLabel layout="default" style={labelStyles}>
        placement
        <CalciteSelect
          label={"placement selection"}
          onCalciteSelectChange={(event) => {
            setPlacement(event.target.value);
            handlePlacementChange(
              layerIndex,
              event.target.value as InstanceType<typeof LineStyleMarker3D>["placement"]
            );
          }}
          value={placement}
        >
          {MARKER_PLACEMENT_OPTIONS.map((option, index) => (
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
              event.target.value as InstanceType<typeof LineStyleMarker3D>["style"]
            );
          }}
          value={style}
        >
          {LINE_STYLE_MARKER_3D_STYLE_OPTIONS.map((option, index) => (
            <CalciteOption key={index}>{option}</CalciteOption>
          ))}
        </CalciteSelect>
      </CalciteLabel>
    </React.Fragment>
  );
};

export default LineStyleMarker3DForm;
