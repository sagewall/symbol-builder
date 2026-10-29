import type LineStyleMarker3D from "@arcgis/core/symbols/LineStyleMarker3D.js";
import type LineSymbol3DLayer from "@arcgis/core/symbols/LineSymbol3DLayer.js";
import "@esri/calcite-components/components/calcite-block";
import "@esri/calcite-components/components/calcite-input-number";
import "@esri/calcite-components/components/calcite-label";
import "@esri/calcite-components/components/calcite-option";
import "@esri/calcite-components/components/calcite-select";
import { capOptions, joinOptions } from "./lib/constants";
import { blockStyles, labelStyles } from "./lib/styles";
import LineStyleMarker3DForm from "./LineStyleMarker3DForm";
import LinePattern3DForm, {
  type LinePatternChangeHandler,
} from "./LinePattern3DForm";
import LineSymbol3DLayerMaterialForm from "./LineSymbol3DLayerMaterialForm";

interface Props {
  symbolLayer: LineSymbol3DLayer;
  marker: LineStyleMarker3D | null | undefined;
  pattern: LineSymbol3DLayer["pattern"];
  handlePatternChange: LinePatternChangeHandler;
  layerIndex: number;
  handleCapChange: (
    layerIndex: number,
    value: InstanceType<typeof LineSymbol3DLayer>["cap"],
  ) => void;
  handleJoinChange: (
    layerIndex: number,
    value: InstanceType<typeof LineSymbol3DLayer>["join"],
  ) => void;
  handleLineSymbol3DLayerMarkerBlockToggle: (
    layerIndex: number,
    currentMarkerBlock: HTMLCalciteBlockElement,
  ) => void;
  handleLineSymbol3DLayerMarkerColorChange: (
    layerIndex: number,
    value: string,
  ) => void;
  handleLineSymbol3DLayerMarkerPlacementChange: (
    layerIndex: number,
    value: InstanceType<typeof LineStyleMarker3D>["placement"],
  ) => void;
  handleLineSymbol3DLayerMarkerStyleChange: (
    layerIndex: number,
    value: InstanceType<typeof LineStyleMarker3D>["style"],
  ) => void;
  handleLineSymbol3DLayerMaterialColorChange: (
    layerIndex: number,
    value: string,
  ) => void;
  handleSizeChange: (layerIndex: number, value: string) => void;
}

function LineSymbol3DLayerForm({
  symbolLayer,
  marker,
  pattern,
  handlePatternChange,
  layerIndex,
  handleCapChange,
  handleJoinChange,
  handleLineSymbol3DLayerMarkerBlockToggle,
  handleLineSymbol3DLayerMarkerColorChange,
  handleLineSymbol3DLayerMarkerPlacementChange,
  handleLineSymbol3DLayerMarkerStyleChange,
  handleLineSymbol3DLayerMaterialColorChange,
  handleSizeChange,
}: Props): React.ReactElement {
  const { cap, join } = symbolLayer;
  const size = String(symbolLayer.size);

  return (
    <>
      <calcite-label layout="default" style={labelStyles}>
        cap
        <calcite-select
          label={"cap selection"}
          oncalciteSelectChange={(event) => {
            handleCapChange(
              layerIndex,
              event.target.value as InstanceType<
                typeof LineSymbol3DLayer
              >["cap"],
            );
          }}
          value={cap}
        >
          {capOptions.map((option) => (
            <calcite-option key={option} value={option}>{option}</calcite-option>
          ))}
        </calcite-select>
      </calcite-label>

      <calcite-label layout="default" style={labelStyles}>
        join
        <calcite-select
          label={"join selection"}
          oncalciteSelectChange={(event) => {
            handleJoinChange(
              layerIndex,
              event.target.value as InstanceType<
                typeof LineSymbol3DLayer
              >["join"],
            );
          }}
          value={join}
        >
          {joinOptions.map((option, index) => (
            <calcite-option key={index}>{option}</calcite-option>
          ))}
        </calcite-select>
      </calcite-label>

      <calcite-block
        style={blockStyles}
        expandable
        heading={"marker"}
        expanded={!!symbolLayer.marker}
        oncalciteBlockClose={(event) => {
          handleLineSymbol3DLayerMarkerBlockToggle(layerIndex, event.target);
        }}
        oncalciteBlockOpen={(event) => {
          handleLineSymbol3DLayerMarkerBlockToggle(layerIndex, event.target);
        }}
      >
        <LineStyleMarker3DForm
          marker={marker}
          layerIndex={layerIndex}
          handleColorChange={handleLineSymbol3DLayerMarkerColorChange}
          handlePlacementChange={handleLineSymbol3DLayerMarkerPlacementChange}
          handleStyleChange={handleLineSymbol3DLayerMarkerStyleChange}
        ></LineStyleMarker3DForm>
      </calcite-block>

      <calcite-block style={blockStyles} expandable heading={"material"}>
        <LineSymbol3DLayerMaterialForm
          symbolLayer={symbolLayer}
          layerIndex={layerIndex}
          handleColorChange={handleLineSymbol3DLayerMaterialColorChange}
        ></LineSymbol3DLayerMaterialForm>
      </calcite-block>

      <calcite-block style={blockStyles} expandable heading={"pattern"}>
        <LinePattern3DForm
          layerIndex={layerIndex}
          pattern={pattern}
          handleChange={handlePatternChange}
        />
      </calcite-block>

      <calcite-label layout="default" style={labelStyles}>
        size
        <calcite-input-number
          label={"size input"}
          min={0}
          oncalciteInputNumberChange={(event) => {
            handleSizeChange(layerIndex, event.target.value);
          }}
          value={size}
        ></calcite-input-number>
      </calcite-label>
    </>
  );
}

export default LineSymbol3DLayerForm;
