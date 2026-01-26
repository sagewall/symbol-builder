import "@esri/calcite-components/components/calcite-input";
import "@esri/calcite-components/components/calcite-input-number";
import "@esri/calcite-components/components/calcite-label";
import { useState } from "react";
import { labelStyles } from "./lib/styles";

interface Props {
  handleColorChange: (value: string) => void;
  handleSizeChange: (value: string) => void;
}

function PointSymbol3DCalloutForm({ handleColorChange, handleSizeChange }: Props): React.ReactElement {
  const [color, setColor] = useState("#000000");
  const [size, setSize] = useState("1");

  return (
    <>
      <calcite-label layout="default" style={labelStyles}>
        color
        <calcite-input
          oncalciteInputInput={(event) => {
            if (event.target.value) {
              setColor(event.target.value);
            }
            handleColorChange(event.target.value);
          }}
          type="color"
          value={color}></calcite-input>
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
          value={size}></calcite-input-number>
      </calcite-label>
    </>
  );
}

export default PointSymbol3DCalloutForm;
