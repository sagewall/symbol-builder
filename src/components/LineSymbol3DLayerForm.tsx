import type LineStyleMarker3D from "@arcgis/core/symbols/LineStyleMarker3D";
import type LineSymbol3DLayer from "@arcgis/core/symbols/LineSymbol3DLayer";
import type LineStylePattern3D from "@arcgis/core/symbols/patterns/LineStylePattern3D";
import React, { useState } from "react";
import LineStyleMarker3DForm from "./LineStyleMarker3DForm";
import LineStylePattern3DForm from "./LineStylePattern3DForm";
import LineSymbol3DLayerMaterialForm from "./LineSymbol3DLayerMaterialForm";
import { CAP_OPTIONS, JOIN_OPTIONS } from "./lib/constants";
import { blockStyles, labelStyles } from "./lib/styles";

interface Props {
  layerIndex: number;
  handleCapChange: (
    layerIndex: number,
    value: InstanceType<typeof LineSymbol3DLayer>["cap"]
  ) => void;
  handleJoinChange: (
    layerIndex: number,
    value: InstanceType<typeof LineSymbol3DLayer>["join"]
  ) => void;
  handleLineSymbol3DLayerMarkerBlockToggle: (
    layerIndex: number,
    currentMarkerBlock: HTMLCalciteBlockElement
  ) => void;
  handleLineSymbol3DLayerMarkerColorChange: (layerIndex: number, value: string) => void;
  handleLineSymbol3DLayerMarkerPlacementChange: (
    layerIndex: number,
    value: InstanceType<typeof LineStyleMarker3D>["placement"]
  ) => void;
  handleLineSymbol3DLayerMarkerStyleChange: (
    layerIndex: number,
    value: InstanceType<typeof LineStyleMarker3D>["style"]
  ) => void;
  handleLineSymbol3DLayerMaterialColorChange: (layerIndex: number, value: string) => void;
  handleLineSymbol3DLayerPatternStyleChange: (
    layerIndex: number,
    value: InstanceType<typeof LineStylePattern3D>["style"]
  ) => void;
  handleSizeChange: (layerIndex: number, value: string) => void;
}

const LineSymbol3DLayerForm = ({
  layerIndex,
  handleCapChange,
  handleJoinChange,
  handleLineSymbol3DLayerMarkerBlockToggle,
  handleLineSymbol3DLayerMarkerColorChange,
  handleLineSymbol3DLayerMarkerPlacementChange,
  handleLineSymbol3DLayerMarkerStyleChange,
  handleLineSymbol3DLayerMaterialColorChange,
  handleLineSymbol3DLayerPatternStyleChange,
  handleSizeChange
}: Props) => {
  const [cap, setCap] = useState("butt");
  const [join, setJoin] = useState("miter");
  const [size, setSize] = useState("3");

  return (
    <React.Fragment>
      <calcite-label layout="default" style={labelStyles}>
        cap
        <calcite-select
          label={"cap selection"}
          oncalciteSelectChange={(event) => {
            setCap(event.target.value);
            handleCapChange(
              layerIndex,
              event.target.value as InstanceType<typeof LineSymbol3DLayer>["cap"]
            );
          }}
          value={cap}
        >
          {CAP_OPTIONS.map((option, index) =>
            option === "butt" ? (
              <calcite-option key={index} selected>
                {option}
              </calcite-option>
            ) : (
              <calcite-option key={index}>{option}</calcite-option>
            )
          )}
        </calcite-select>
      </calcite-label>

      <calcite-label layout="default" style={labelStyles}>
        join
        <calcite-select
          label={"join selection"}
          oncalciteSelectChange={(event) => {
            setJoin(event.target.value);
            handleJoinChange(
              layerIndex,
              event.target.value as InstanceType<typeof LineSymbol3DLayer>["join"]
            );
          }}
          value={join}
        >
          {JOIN_OPTIONS.map((option, index) => (
            <calcite-option key={index}>{option}</calcite-option>
          ))}
        </calcite-select>
      </calcite-label>

      <calcite-block
        style={blockStyles}
        collapsible
        heading={"marker"}
        oncalciteBlockClose={(event) => {
          handleLineSymbol3DLayerMarkerBlockToggle(layerIndex, event.target);
        }}
        oncalciteBlockOpen={(event) => {
          handleLineSymbol3DLayerMarkerBlockToggle(layerIndex, event.target);
        }}
      >
        <LineStyleMarker3DForm
          layerIndex={layerIndex}
          handleColorChange={handleLineSymbol3DLayerMarkerColorChange}
          handlePlacementChange={handleLineSymbol3DLayerMarkerPlacementChange}
          handleStyleChange={handleLineSymbol3DLayerMarkerStyleChange}
        ></LineStyleMarker3DForm>
      </calcite-block>

      <calcite-block style={blockStyles} collapsible heading={"material"}>
        <LineSymbol3DLayerMaterialForm
          layerIndex={layerIndex}
          handleColorChange={handleLineSymbol3DLayerMaterialColorChange}
        ></LineSymbol3DLayerMaterialForm>
      </calcite-block>

      <calcite-block style={blockStyles} collapsible heading={"pattern"}>
        <LineStylePattern3DForm
          layerIndex={layerIndex}
          handleStyleChange={handleLineSymbol3DLayerPatternStyleChange}
        ></LineStylePattern3DForm>
      </calcite-block>

      <calcite-label layout="default" style={labelStyles}>
        size
        <calcite-input-number
          label={"size input"}
          min={0}
          oncalciteInputNumberChange={(event) => {
            setSize(event.target.value);
            handleSizeChange(layerIndex, event.target.value);
          }}
          value={size}
        ></calcite-input-number>
      </calcite-label>
    </React.Fragment>
  );
};

export default LineSymbol3DLayerForm;
