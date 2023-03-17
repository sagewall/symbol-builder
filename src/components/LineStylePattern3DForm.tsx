import {
  CalciteLabel,
  CalciteOption,
  CalciteSelect,
} from "@esri/calcite-components-react";
import React, { useState } from "react";
import { labelStyles } from "./lib/styles";
import { LineStylePattern3DStyleOption } from "./lib/types";

interface Props {
  layerIndex: number;
  handleStyleChange: (layerIndex: number, value: string) => void;
}

const LineStylePattern3DForm = ({ layerIndex, handleStyleChange }: Props) => {
  const styleOptions = [
    "dash",
    "dash-dot",
    "dot",
    "long-dash",
    "long-dash-dot",
    "long-dash-dot-dot",
    "none",
    "short-dash",
    "short-dash-dot",
    "short-dash-dot-dot",
    "short-dot",
    "solid",
  ];

  const [style, setStyle] = useState("solid");

  return (
    <React.Fragment>
      <CalciteLabel layout="default" style={labelStyles}>
        style
        <CalciteSelect
          label={"join selection"}
          onCalciteSelectChange={(event) => {
            setStyle(event.target.value);
            handleStyleChange(
              layerIndex,
              event.target.value as LineStylePattern3DStyleOption
            );
          }}
          value={style}
        >
          {styleOptions.map((option, index) => (
            <CalciteOption key={index}>{option}</CalciteOption>
          ))}
        </CalciteSelect>
      </CalciteLabel>
    </React.Fragment>
  );
};

export default LineStylePattern3DForm;
