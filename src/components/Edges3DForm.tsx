import React, { useState } from "react";
import { labelStyles } from "./lib/styles";

interface Props {
  layerIndex: number;
  handleColorChange: (layerIndex: number, value: string) => void;
  handleExtensionLengthChange: (layerIndex: number, value: string) => void;
  handleSizeChange: (layerIndex: number, value: string) => void;
}

const Edges3DForm = ({
  layerIndex,
  handleColorChange,
  handleExtensionLengthChange,
  handleSizeChange
}: Props) => {
  const [color, setColor] = useState("#000000");
  const [extensionLength, setExtensionLength] = useState("0");
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
            handleColorChange(layerIndex, event.target.value as string);
          }}
          type="color"
          value={color}
        />
      </calcite-label>

      <calcite-label layout="default" style={labelStyles}>
        extensionLength
        <calcite-input-number
          label={"extensionLength input"}
          min={0}
          oncalciteInputNumberChange={(event) => {
            setExtensionLength(event.target.value);
            handleExtensionLengthChange(layerIndex, event.target.value);
          }}
          value={extensionLength}
        ></calcite-input-number>
      </calcite-label>

      <calcite-label layout="default" style={labelStyles}>
        size
        <calcite-input-number
          label={"size input"}
          min={0}
          oncalciteInputNumberChange={(event) => {
            setSize(event.target.value);
            handleSizeChange(layerIndex, event.target.value);
          }}
          value={size}
        ></calcite-input-number>
      </calcite-label>
    </React.Fragment>
  );
};

export default Edges3DForm;
