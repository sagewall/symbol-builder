import React, { useState } from "react";
import { labelStyles } from "./lib/styles";

interface Props {
  handleMaxWorldLengthChange: (value: string) => void;
  handleMinWorldLengthChange: (value: string) => void;
  handleScreenLengthChange: (value: string) => void;
}
const PointSymbol3DVerticalOffsetForm = ({
  handleMaxWorldLengthChange,
  handleMinWorldLengthChange,
  handleScreenLengthChange
}: Props) => {
  const [maxWorldLength, setMaxWorldLength] = useState("100");
  const [minWorldLength, setMinWorldLength] = useState("0");
  const [screenLength, setScreenLength] = useState("0");

  return (
    <React.Fragment>
      <calcite-label layout="default" style={labelStyles}>
        maxWorldLength
        <calcite-input-number
          label={"maxWorldLength input"}
          min={0}
          oncalciteInputNumberChange={(event) => {
            setMaxWorldLength(event.target.value);
            handleMaxWorldLengthChange(event.target.value);
          }}
          value={maxWorldLength}
        ></calcite-input-number>
      </calcite-label>

      <calcite-label layout="default" style={labelStyles}>
        minWorldLength
        <calcite-input-number
          label={"minWorldLength input"}
          min={0}
          oncalciteInputNumberChange={(event) => {
            setMinWorldLength(event.target.value);
            handleMinWorldLengthChange(event.target.value);
          }}
          value={minWorldLength}
        ></calcite-input-number>
      </calcite-label>

      <calcite-label layout="default" style={labelStyles}>
        screenLength
        <calcite-input-number
          label={"screenLength input"}
          min={0}
          oncalciteInputNumberChange={(event) => {
            setScreenLength(event.target.value);
            handleScreenLengthChange(event.target.value);
          }}
          value={screenLength}
        ></calcite-input-number>
      </calcite-label>
    </React.Fragment>
  );
};

export default PointSymbol3DVerticalOffsetForm;
