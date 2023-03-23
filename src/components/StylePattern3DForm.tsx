import { CalciteLabel, CalciteOption, CalciteSelect } from "@esri/calcite-components-react";
import React, { useState } from "react";
import { labelStyles } from "./lib/styles";
import { SylePattern3DOptions } from "./lib/types";

interface Props {
  layerIndex: number;
  handleStyleChange: (layerIndex: number, value: string) => void;
}

const StylePattern3DForm = ({ layerIndex, handleStyleChange }: Props) => {
  const styleOptions = [
    "solid",
    "backward-diagonal",
    "cross",
    "diagonal-cross",
    "forward-diagonal",
    "horizontal",
    "none",
    "vertical"
  ];

  const [style, setStyle] = useState("solid");

  return (
    <React.Fragment>
      <CalciteLabel layout="default" style={labelStyles}>
        style
        <CalciteSelect
          label={"cap selection"}
          onCalciteSelectChange={(event) => {
            setStyle(event.target.value);
            handleStyleChange(layerIndex, event.target.value as SylePattern3DOptions);
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

export default StylePattern3DForm;
