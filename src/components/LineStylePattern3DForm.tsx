import type LineStylePattern3D from "@arcgis/core/symbols/patterns/LineStylePattern3D";
import { CalciteLabel, CalciteOption, CalciteSelect } from "@esri/calcite-components-react";
import React, { useState } from "react";
import { LINE_STYLE_OPTIONS } from "./lib/constants";
import { labelStyles } from "./lib/styles";

interface Props {
  layerIndex: number;
  handleStyleChange: (
    layerIndex: number,
    value: InstanceType<typeof LineStylePattern3D>["style"]
  ) => void;
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
            handleStyleChange(
              layerIndex,
              event.target.value as InstanceType<typeof LineStylePattern3D>["style"]
            );
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
