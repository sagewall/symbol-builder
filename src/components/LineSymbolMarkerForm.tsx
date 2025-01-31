import type LineSymbolMarker from "@arcgis/core/symbols/LineSymbolMarker";
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
      <calcite-label layout="default" style={labelStyles}>
        color
        <calcite-input
          oncalciteInputInput={(event) => {
            if (event.target.value) {
              setColor(event.target.value.toString());
            }
            if (handleColorChange) {
              handleColorChange(event.target.value as string);
            }
          }}
          type="color"
          value={color}
        ></calcite-input>
      </calcite-label>

      <calcite-label layout="default" style={labelStyles}>
        placement
        <calcite-select
          label={"marker placement selection"}
          oncalciteSelectChange={(event) => {
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
            <calcite-option key={index}>{option}</calcite-option>
          ))}
        </calcite-select>
      </calcite-label>

      <calcite-label layout="default" style={labelStyles}>
        style
        <calcite-select
          label={"marker style selection"}
          oncalciteSelectChange={(event) => {
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
            <calcite-option key={index}>{option}</calcite-option>
          ))}
        </calcite-select>
      </calcite-label>
    </React.Fragment>
  );
};

export default LineSymbolMarkerForm;
