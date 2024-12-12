import React, { useState } from "react";
import { labelStyles } from "./lib/styles";

interface Props {
  handleColorChange: (value: string) => void;
  handleSizeChange: (value: string) => void;
}

const PointSymbol3DCalloutForm = ({ handleColorChange, handleSizeChange }: Props) => {
  const [color, setColor] = useState("#000000");
  const [size, setSize] = useState("1");

  return (
    <React.Fragment>
      <calcite-label layout="default" style={labelStyles}>
        color
        <calcite-input
          oncalciteInputInput={(event) => {
            if (event.target.value) {
              setColor(event.target.value.toString());
            }
            handleColorChange(event.target.value as string);
          }}
          type="color"
          value={color}
        />
      </calcite-label>

      <calcite-label layout="default" style={labelStyles}>
        size
        <calcite-input-number
          label={"font size input"}
          min={0}
          oncalciteInputNumberChange={(event) => {
            setSize(event.target.value);
            handleSizeChange(event.target.value);
          }}
          value={size}
        ></calcite-input-number>
      </calcite-label>
    </React.Fragment>
  );
};

export default PointSymbol3DCalloutForm;
