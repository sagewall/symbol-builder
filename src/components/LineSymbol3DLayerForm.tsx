import {
  CalciteBlock,
  CalciteInputNumber,
  CalciteLabel,
  CalciteOption,
  CalciteSelect,
} from "@esri/calcite-components-react";
import React, { useState } from "react";
import { blockStyles, labelStyles } from "./lib/styles";
import { LineSymbol3DCapOption, LineSymbol3DJoinOption } from "./lib/types";
import LineSymbol3DLayerMaterialForm from "./LineSymbol3DLayerMaterialForm";

interface Props {
  layerIndex: number;
  handleCapChange: (layerIndex: number, value: string) => void;
  handleJoinChange: (layerIndex: number, value: string) => void;
  handleLineSymbol3DLayerMaterialColorChange: (
    layerIndex: number,
    value: string
  ) => void;
  handleSizeChange: (layerIndex: number, value: string) => void;
}

const LineSymbol3DLayerForm = ({
  layerIndex,
  handleCapChange,
  handleJoinChange,
  handleLineSymbol3DLayerMaterialColorChange,
  handleSizeChange,
}: Props) => {
  const capOptions = ["butt", "round", "square"];
  const joinOptions = ["miter", "round", "bevel"];

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
            handleCapChange(
              layerIndex,
              event.target.value as LineSymbol3DCapOption
            );
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
            handleJoinChange(
              layerIndex,
              event.target.value as LineSymbol3DJoinOption
            );
          }}
          value={join}
        >
          {joinOptions.map((option, index) => (
            <CalciteOption key={index}>{option}</CalciteOption>
          ))}
        </CalciteSelect>
      </CalciteLabel>

      <CalciteBlock style={blockStyles} collapsible heading={"material"}>
        <LineSymbol3DLayerMaterialForm
          layerIndex={layerIndex}
          handleColorChange={handleLineSymbol3DLayerMaterialColorChange}
        ></LineSymbol3DLayerMaterialForm>
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
