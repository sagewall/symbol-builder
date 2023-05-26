import type LineSymbolMarker from "@arcgis/core/symbols/LineSymbolMarker";
import {
  CalciteInput,
  CalciteLabel,
  CalciteOption,
  CalciteSelect
} from "@esri/calcite-components-react";
import React, { useState } from "react";
import { MARKER_PLACEMENT_OPTIONS, MARKER_STYLE_OPTIONS } from "./lib/constants";
import { labelStyles } from "./lib/styles";

interface Props {
  handleColorChange: ((value: string) => void) | undefined;
  handlePlacementChange:
    | ((value: InstanceType<typeof LineSymbolMarker>["placement"]) => void)
    | undefined;
  handleStyleChange: ((value: InstanceType<typeof LineSymbolMarker>["style"]) => void) | undefined;
}

const LineSymbolMarkerForm = ({
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
            if (handleColorChange) {
              handleColorChange(event.target.value as string);
            }
          }}
          type="color"
          value={color}
        />
      </CalciteLabel>

      <CalciteLabel layout="default" style={labelStyles}>
        placement
        <CalciteSelect
          label={"marker placement selection"}
          onCalciteSelectChange={(event) => {
            setPlacement(event.target.value);
            if (handlePlacementChange) {
              handlePlacementChange(
                event.target.value as InstanceType<typeof LineSymbolMarker>["placement"]
              );
            }
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
          label={"marker style selection"}
          onCalciteSelectChange={(event) => {
            setStyle(event.target.value);
            if (handleStyleChange) {
              handleStyleChange(
                event.target.value as InstanceType<typeof LineSymbolMarker>["style"]
              );
            }
          }}
          value={style}
        >
          {MARKER_STYLE_OPTIONS.map((option, index) => (
            <CalciteOption key={index}>{option}</CalciteOption>
          ))}
        </CalciteSelect>
      </CalciteLabel>
    </React.Fragment>
  );
};

export default LineSymbolMarkerForm;
