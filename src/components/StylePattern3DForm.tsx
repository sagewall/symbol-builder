import StylePattern3D from "@arcgis/core/symbols/patterns/StylePattern3D";
import { CalciteLabel, CalciteOption, CalciteSelect } from "@esri/calcite-components-react";
import React, { useState } from "react";
import { FILL_OPTIONS } from "./lib/constants";
import { labelStyles } from "./lib/styles";

interface Props {
  layerIndex: number;
  handleStyleChange: (
    layerIndex: number,
    value: InstanceType<typeof StylePattern3D>["style"]
  ) => void;
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
            handleStyleChange(
              layerIndex,
              event.target.value as InstanceType<typeof StylePattern3D>["style"]
            );
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
