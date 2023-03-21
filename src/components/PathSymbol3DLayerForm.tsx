import {
  CalciteBlock,
  CalciteInputNumber,
  CalciteLabel,
  CalciteOption,
  CalciteSelect,
  CalciteSwitch
} from "@esri/calcite-components-react";
import React, { useState } from "react";
import { blockStyles, labelStyles } from "./lib/styles";
import {
  PathSymbol3DLayerAnchorOption,
  PathSymbol3DLayerCapOption,
  PathSymbol3DLayerJoinOption
} from "./lib/types";
import PathSymbol3DLayerMaterialForm from "./PathSymbol3DLayerMaterialForm";

interface Props {
  layerIndex: number;
  handleAnchorChange: (layerIndex: number, value: string) => void;
  handleCapChange: (layerIndex: number, value: string) => void;
  handleCastShadowsChange: (layerIndex: number, value: boolean) => void;
  handleHeightChange: (layerIndex: number, value: string) => void;
  handleJoinChange: (layerIndex: number, value: string) => void;
  handlePathSymbol3DLayerMaterialColorChange: (layerIndex: number, value: string) => void;
}

const LineSymbol3DLayerForm = ({
  layerIndex,
  handleAnchorChange,
  handleCapChange,
  handleCastShadowsChange,
  handleHeightChange,
  handleJoinChange,
  handlePathSymbol3DLayerMaterialColorChange
}: Props) => {
  const anchorOptions = ["center", "bottom", "top"];
  const capOptions = ["butt", "round", "square", "none"];
  const joinOptions = ["miter", "round", "bevel"];

  const [anchor, setAnchor] = useState("center");
  const [cap, setCap] = useState("butt");
  const [castShadows, setCastShadows] = useState(true);
  const [height, setHeight] = useState("300");
  const [join, setJoin] = useState("miter");

  return (
    <React.Fragment>
      <CalciteLabel layout="default" style={labelStyles}>
        anchor
        <CalciteSelect
          label={"anchor selection"}
          onCalciteSelectChange={(event) => {
            setAnchor(event.target.value);
            handleAnchorChange(layerIndex, event.target.value as PathSymbol3DLayerAnchorOption);
          }}
          value={anchor}
        >
          {anchorOptions.map((option, index) => (
            <CalciteOption key={index}>{option}</CalciteOption>
          ))}
        </CalciteSelect>
      </CalciteLabel>

      <CalciteLabel layout="default" style={labelStyles}>
        cap
        <CalciteSelect
          label={"cap selection"}
          onCalciteSelectChange={(event) => {
            setCap(event.target.value);
            handleCapChange(layerIndex, event.target.value as PathSymbol3DLayerCapOption);
          }}
          value={cap}
        >
          {capOptions.map((option, index) => (
            <CalciteOption key={index}>{option}</CalciteOption>
          ))}
        </CalciteSelect>
      </CalciteLabel>

      <CalciteLabel layout="default" style={labelStyles}>
        castShadows
        <CalciteSwitch
          onCalciteSwitchChange={(event) => {
            setCastShadows(event.target.checked);
            handleCastShadowsChange(layerIndex, event.target.checked);
          }}
          value={castShadows}
        ></CalciteSwitch>
      </CalciteLabel>

      <CalciteLabel layout="default" style={labelStyles}>
        height
        <CalciteInputNumber
          label={"height input"}
          min={0}
          onCalciteInputNumberChange={(event) => {
            setHeight(event.target.value);
            handleHeightChange(layerIndex, event.target.value);
          }}
          value={height}
        ></CalciteInputNumber>
      </CalciteLabel>

      <CalciteLabel layout="default" style={labelStyles}>
        join
        <CalciteSelect
          label={"join selection"}
          onCalciteSelectChange={(event) => {
            setJoin(event.target.value);
            handleJoinChange(layerIndex, event.target.value as PathSymbol3DLayerJoinOption);
          }}
          value={join}
        >
          {joinOptions.map((option, index) => (
            <CalciteOption key={index}>{option}</CalciteOption>
          ))}
        </CalciteSelect>
      </CalciteLabel>

      <CalciteBlock style={blockStyles} collapsible heading={"material"}>
        <PathSymbol3DLayerMaterialForm
          layerIndex={layerIndex}
          handleColorChange={handlePathSymbol3DLayerMaterialColorChange}
        ></PathSymbol3DLayerMaterialForm>
      </CalciteBlock>
    </React.Fragment>
  );
};

export default LineSymbol3DLayerForm;
