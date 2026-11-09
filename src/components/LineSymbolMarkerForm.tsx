import type LineSymbolMarker from "@arcgis/core/symbols/LineSymbolMarker.js";
import "@esri/calcite-components/components/calcite-input";
import "@esri/calcite-components/components/calcite-label";
import "@esri/calcite-components/components/calcite-option";
import "@esri/calcite-components/components/calcite-select";
import { markerPlacementOptions, markerStyleOptions } from "./lib/constants";
import { labelStyles } from "./lib/styles";

interface Props {
  marker: LineSymbolMarker;
  handleColorChange: ((value: string) => void) | undefined;
  handlePlacementChange:
    | ((value: InstanceType<typeof LineSymbolMarker>["placement"]) => void)
    | undefined;
  handleStyleChange:
    | ((value: InstanceType<typeof LineSymbolMarker>["style"]) => void)
    | undefined;
}

function LineSymbolMarkerForm({
  marker,
  handleColorChange,
  handlePlacementChange,
  handleStyleChange,
}: Props): React.ReactElement {
  const { placement, style } = marker;

  return (
    <>
      <calcite-label layout="default" style={labelStyles}>
        color
        <calcite-input
          oncalciteInputInput={(event) => {
            if (handleColorChange) {
              handleColorChange(event.target.value);
            }
          }}
          type="color"
          value={marker.color?.toHex() ?? ""}
        ></calcite-input>
      </calcite-label>

      <calcite-label layout="default" style={labelStyles}>
        placement
        <calcite-select
          label={"marker placement selection"}
          oncalciteSelectChange={(event) => {
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
