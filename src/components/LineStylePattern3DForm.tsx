import { CalciteLabel, CalciteOption, CalciteSelect } from "@esri/calcite-components-react";
import React, { useState } from "react";
import { LINE_STYLE_OPTIONS } from "./lib/constants";
import { labelStyles } from "./lib/styles";
import { LineStyle } from "./lib/types";

interface Props {
  layerIndex: number;
  handleStyleChange: (layerIndex: number, value: LineStyle) => void;
}

const LineStylePattern3DForm = ({ layerIndex, handleStyleChange }: Props) => {
  const [style, setStyle] = useState("solid");

  return (
    <React.Fragment>
      <CalciteLabel layout="default" style={labelStyles}>
        style
        <CalciteSelect
          label={"join selection"}
          onCalciteSelectChange={(event) => {
            setStyle(event.target.value);
            handleStyleChange(layerIndex, event.target.value as LineStyle);
          }}
          value={style}
        >
          {LINE_STYLE_OPTIONS.map((option, index) => (
            <CalciteOption key={index}>{option}</CalciteOption>
          ))}
        </CalciteSelect>
      </CalciteLabel>
    </React.Fragment>
  );
};

export default LineStylePattern3DForm;
