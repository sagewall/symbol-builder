import {
  CalciteInputNumber,
  CalciteLabel,
} from "@esri/calcite-components-react";
import "@esri/calcite-components/dist/components/calcite-input-number";
import "@esri/calcite-components/dist/components/calcite-label";
import React, { useState } from "react";
import { labelStyles } from "./lib/styles";

interface Props {
  handleMaxWorldLengthChange: (value: string) => void;
  handleMinWorldLengthChange: (value: string) => void;
  handleScreenLengthChange: (value: string) => void;
}
const Symbol3DVerticalOffsetForm = ({
  handleMaxWorldLengthChange,
  handleMinWorldLengthChange,
  handleScreenLengthChange,
}: Props) => {
  const [maxWorldLength, setMaxWorldLength] = useState("100");
  const [minWorldLength, setMinWorldLength] = useState("0");
  const [screenLength, setScreenLength] = useState("0");

  return (
    <React.Fragment>
      <CalciteLabel layout="default" style={labelStyles}>
        maxWorldLength
        <CalciteInputNumber
          label={"maxWorldLength input"}
          min={0}
          onCalciteInputNumberChange={(event) => {
            setMaxWorldLength(event.target.value);
            handleMaxWorldLengthChange(event.target.value);
          }}
          value={maxWorldLength}
        ></CalciteInputNumber>
      </CalciteLabel>

      <CalciteLabel layout="default" style={labelStyles}>
        minWorldLength
        <CalciteInputNumber
          label={"minWorldLength input"}
          min={0}
          onCalciteInputNumberChange={(event) => {
            setMinWorldLength(event.target.value);
            handleMinWorldLengthChange(event.target.value);
          }}
          value={minWorldLength}
        ></CalciteInputNumber>
      </CalciteLabel>

      <CalciteLabel layout="default" style={labelStyles}>
        screenLength
        <CalciteInputNumber
          label={"screenLength input"}
          min={0}
          onCalciteInputNumberChange={(event) => {
            setScreenLength(event.target.value);
            handleScreenLengthChange(event.target.value);
          }}
          value={screenLength}
        ></CalciteInputNumber>
      </CalciteLabel>
    </React.Fragment>
  );
};

export default Symbol3DVerticalOffsetForm;
