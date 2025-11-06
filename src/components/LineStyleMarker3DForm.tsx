import type LineStyleMarker3D from "@arcgis/core/symbols/LineStyleMarker3D";
import "@esri/calcite-components/components/calcite-input";
import "@esri/calcite-components/components/calcite-label";
import "@esri/calcite-components/components/calcite-option";
import "@esri/calcite-components/components/calcite-select";
import { useState } from "react";
import {
  LINE_STYLE_MARKER_3D_STYLE_OPTIONS,
  MARKER_PLACEMENT_OPTIONS,
} from "../lib/constants";
import { labelStyles } from "../lib/styles";

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

function LineStyleMarker3DForm({
  layerIndex,
  handleColorChange,
  handlePlacementChange,
  handleStyleChange,
}: Props) {
  const [color, setColor] = useState("#007ac2");
  const [placement, setPlacement] = useState("begin-end");
  const [style, setStyle] = useState("arrow");

  return (
    <>
      <calcite-label layout="default" style={labelStyles}>
        color
        <calcite-input
          oncalciteInputInput={(event) => {
            if (event.target.value) {
              setColor(event.target.value.toString());
            }
            handleColorChange(layerIndex, event.target.value as string);
          }}
          type="color"
          value={color}
        ></calcite-input>
      </calcite-label>

      <calcite-label layout="default" style={labelStyles}>
        placement
        <calcite-select
          label={"placement selection"}
          oncalciteSelectChange={(event) => {
            setPlacement(event.target.value);
            handlePlacementChange(
              layerIndex,
              event.target.value as InstanceType<
                typeof LineStyleMarker3D
              >["placement"]
            );
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
          label={"style selection"}
          oncalciteSelectChange={(event) => {
            setStyle(event.target.value);
            handleStyleChange(
              layerIndex,
              event.target.value as InstanceType<
                typeof LineStyleMarker3D
              >["style"]
            );
          }}
          value={style}
        >
          {LINE_STYLE_MARKER_3D_STYLE_OPTIONS.map((option, index) => (
            <calcite-option key={index}>{option}</calcite-option>
          ))}
        </calcite-select>
      </calcite-label>
    </>
  );
}

export default LineStyleMarker3DForm;
