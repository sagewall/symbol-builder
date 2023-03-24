import { CalciteLabel, CalciteOption, CalciteSelect } from "@esri/calcite-components-react";
import React, { useState } from "react";
import { FILL_OPTIONS } from "./lib/constants";
import { labelStyles } from "./lib/styles";
import { Fill } from "./lib/types";

interface Props {
  layerIndex: number;
  handleStyleChange: (layerIndex: number, value: Fill) => void;
}

const StylePattern3DForm = ({ layerIndex, handleStyleChange }: Props) => {
  const [style, setStyle] = useState("solid");

  return (
    <React.Fragment>
      <CalciteLabel layout="default" style={labelStyles}>
        style
        <CalciteSelect
          label={"cap selection"}
          onCalciteSelectChange={(event) => {
            setStyle(event.target.value);
            handleStyleChange(layerIndex, event.target.value as Fill);
          }}
          value={style}
        >
          {FILL_OPTIONS.map((option, index) => (
            <CalciteOption key={index}>{option}</CalciteOption>
          ))}
        </CalciteSelect>
      </CalciteLabel>
    </React.Fragment>
  );
};

export default StylePattern3DForm;
