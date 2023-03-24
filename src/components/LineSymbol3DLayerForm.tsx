import {
  CalciteBlock,
  CalciteInputNumber,
  CalciteLabel,
  CalciteOption,
  CalciteSelect
} from "@esri/calcite-components-react";
import React, { useState } from "react";
import { CAP_OPTIONS, JOIN_OPTIONS } from "./lib/constants";
import { blockStyles, labelStyles } from "./lib/styles";
import { Join, LineStyle, LineStyleMarker3DStyle, Cap, MarkerPlacement } from "./lib/types";
import LineStyleMarker3DForm from "./LineStyleMarker3DForm";
import LineStylePattern3DForm from "./LineStylePattern3DForm";
import LineSymbol3DLayerMaterialForm from "./LineSymbol3DLayerMaterialForm";

interface Props {
  layerIndex: number;
  handleCapChange: (layerIndex: number, value: Cap) => void;
  handleJoinChange: (layerIndex: number, value: Join) => void;
  handleLineSymbol3DLayerMarkerBlockToggle: (
    layerIndex: number,
    currentMarkerBlock: HTMLCalciteBlockElement
  ) => void;
  handleLineSymbol3DLayerMarkerColorChange: (layerIndex: number, value: string) => void;
  handleLineSymbol3DLayerMarkerPlacementChange: (
    layerIndex: number,
    value: MarkerPlacement
  ) => void;
  handleLineSymbol3DLayerMarkerStyleChange: (
    layerIndex: number,
    value: LineStyleMarker3DStyle
  ) => void;
  handleLineSymbol3DLayerMaterialColorChange: (layerIndex: number, value: string) => void;
  handleLineSymbol3DLayerPatternStyleChange: (layerIndex: number, value: LineStyle) => void;
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
      <CalciteLabel layout="default" style={labelStyles}>
        cap
        <CalciteSelect
          label={"cap selection"}
          onCalciteSelectChange={(event) => {
            setCap(event.target.value);
            handleCapChange(layerIndex, event.target.value as Cap);
          }}
          value={cap}
        >
          {CAP_OPTIONS.map((option, index) => (
            <CalciteOption key={index}>{option}</CalciteOption>
          ))}
        </CalciteSelect>
      </CalciteLabel>

      <CalciteLabel layout="default" style={labelStyles}>
        join
        <CalciteSelect
          label={"join selection"}
          onCalciteSelectChange={(event) => {
            setJoin(event.target.value);
            handleJoinChange(layerIndex, event.target.value as Join);
          }}
          value={join}
        >
          {JOIN_OPTIONS.map((option, index) => (
            <CalciteOption key={index}>{option}</CalciteOption>
          ))}
        </CalciteSelect>
      </CalciteLabel>

      <CalciteBlock
        style={blockStyles}
        collapsible
        heading={"marker"}
        onCalciteBlockToggle={(event) => {
          handleLineSymbol3DLayerMarkerBlockToggle(layerIndex, event.target);
        }}
      >
        <LineStyleMarker3DForm
          layerIndex={layerIndex}
          handleColorChange={handleLineSymbol3DLayerMarkerColorChange}
          handlePlacementChange={handleLineSymbol3DLayerMarkerPlacementChange}
          handleStyleChange={handleLineSymbol3DLayerMarkerStyleChange}
        ></LineStyleMarker3DForm>
      </CalciteBlock>

      <CalciteBlock style={blockStyles} collapsible heading={"material"}>
        <LineSymbol3DLayerMaterialForm
          layerIndex={layerIndex}
          handleColorChange={handleLineSymbol3DLayerMaterialColorChange}
        ></LineSymbol3DLayerMaterialForm>
      </CalciteBlock>

      <CalciteBlock style={blockStyles} collapsible heading={"pattern"}>
        <LineStylePattern3DForm
          layerIndex={layerIndex}
          handleStyleChange={handleLineSymbol3DLayerPatternStyleChange}
        ></LineStylePattern3DForm>
      </CalciteBlock>

      <CalciteLabel layout="default" style={labelStyles}>
        size
        <CalciteInputNumber
          label={"size input"}
          min={0}
          onCalciteInputNumberChange={(event) => {
            setSize(event.target.value);
            handleSizeChange(layerIndex, event.target.value);
          }}
          value={size}
        ></CalciteInputNumber>
      </CalciteLabel>
    </React.Fragment>
  );
};

export default LineSymbol3DLayerForm;
