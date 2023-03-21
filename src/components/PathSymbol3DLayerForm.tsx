import {
  CalciteBlock,
  CalciteLabel,
  CalciteOption,
  CalciteSelect
} from "@esri/calcite-components-react";
import React, { useState } from "react";
import { blockStyles, labelStyles } from "./lib/styles";
import { LineSymbol3DCapOption, LineSymbol3DJoinOption } from "./lib/types";
import PathSymbol3DLayerMaterialForm from "./PathSymbol3DLayerMaterialForm";

interface Props {
  layerIndex: number;
  handleCapChange: (layerIndex: number, value: string) => void;
  handleJoinChange: (layerIndex: number, value: string) => void;
  handlePathSymbol3DLayerMaterialColorChange: (layerIndex: number, value: string) => void;
}

const LineSymbol3DLayerForm = ({
  layerIndex,
  handleCapChange,
  handleJoinChange,
  handlePathSymbol3DLayerMaterialColorChange
}: Props) => {
  const capOptions = ["butt", "round", "square", "none"];
  const joinOptions = ["miter", "round", "bevel"];

  const [cap, setCap] = useState("butt");
  const [join, setJoin] = useState("miter");

  return (
    <React.Fragment>
      <CalciteLabel layout="default" style={labelStyles}>
        cap
        <CalciteSelect
          label={"cap selection"}
          onCalciteSelectChange={(event) => {
            setCap(event.target.value);
            handleCapChange(layerIndex, event.target.value as LineSymbol3DCapOption);
          }}
          value={cap}
        >
          {capOptions.map((option, index) => (
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
            handleJoinChange(layerIndex, event.target.value as LineSymbol3DJoinOption);
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
