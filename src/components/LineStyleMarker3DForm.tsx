import type LineStyleMarker3D from "@arcgis/core/symbols/LineStyleMarker3D.js";
import "@esri/calcite-components/components/calcite-input";
import "@esri/calcite-components/components/calcite-label";
import "@esri/calcite-components/components/calcite-option";
import "@esri/calcite-components/components/calcite-select";
import {
  lineStyleMarker3dStyleOptions,
  markerPlacementOptions,
} from "./lib/constants";
import { labelStyles } from "./lib/styles";

interface Props {
  marker: LineStyleMarker3D | null | undefined;
  layerIndex: number;
  handleColorChange: (layerIndex: number, value: string) => void;
  handlePlacementChange: (
    layerIndex: number,
    value: InstanceType<typeof LineStyleMarker3D>["placement"],
  ) => void;
  handleStyleChange: (
    layerIndex: number,
    value: InstanceType<typeof LineStyleMarker3D>["style"],
  ) => void;
}

function LineStyleMarker3DForm({
  marker,
  layerIndex,
  handleColorChange,
  handlePlacementChange,
  handleStyleChange,
}: Props): React.ReactElement {
  const color = marker?.color?.toHex() ?? "#007ac2";
  const placement = marker?.placement ?? "begin-end";
  const style = marker?.style ?? "arrow";

  return (
    <>
      <calcite-label layout="default" style={labelStyles}>
        color
        <calcite-input
          oncalciteInputInput={(event) => {
            if (!event.target.value) return;
            handleColorChange(layerIndex, event.target.value);
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
            handlePlacementChange(
              layerIndex,
              event.target.value as InstanceType<
                typeof LineStyleMarker3D
              >["placement"],
            );
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
          label={"style selection"}
          oncalciteSelectChange={(event) => {
            handleStyleChange(
              layerIndex,
              event.target.value as InstanceType<
                typeof LineStyleMarker3D
              >["style"],
            );
          }}
          value={style}
        >
          {lineStyleMarker3dStyleOptions.map((option, index) => (
            <calcite-option key={index}>{option}</calcite-option>
          ))}
        </calcite-select>
      </calcite-label>
    </>
  );
}

export default LineStyleMarker3DForm;
