import type LineSymbolMarker from "@arcgis/core/symbols/LineSymbolMarker.js";
import "@esri/calcite-components/components/calcite-input";
import "@esri/calcite-components/components/calcite-label";
import "@esri/calcite-components/components/calcite-option";
import "@esri/calcite-components/components/calcite-select";
import { useState } from "react";
import { markerPlacementOptions, markerStyleOptions } from "./lib/constants";
import { labelStyles } from "./lib/styles";

interface Props {
  handleColorChange: ((value: string) => void) | undefined;
  handlePlacementChange:
    | ((value: InstanceType<typeof LineSymbolMarker>["placement"]) => void)
    | undefined;
  handleStyleChange:
    | ((value: InstanceType<typeof LineSymbolMarker>["style"]) => void)
    | undefined;
}

function LineSymbolMarkerForm({
  handleColorChange,
  handlePlacementChange,
  handleStyleChange,
}: Props): React.ReactElement {
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
              setColor(event.target.value);
            }
            if (handleColorChange) {
              handleColorChange(event.target.value);
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
                event.target.value as InstanceType<
                  typeof LineSymbolMarker
                >["placement"],
              );
            }
          }}
          value={placement}
        >
          {markerPlacementOptions.map((option, index) => (
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
                event.target.value as InstanceType<
                  typeof LineSymbolMarker
                >["style"],
              );
            }
          }}
          value={style}
        >
          {markerStyleOptions.map((option, index) => (
            <calcite-option key={index}>{option}</calcite-option>
          ))}
        </calcite-select>
      </calcite-label>
    </>
  );
}

export default LineSymbolMarkerForm;
