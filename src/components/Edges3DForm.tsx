import "@esri/calcite-components/components/calcite-input";
import "@esri/calcite-components/components/calcite-input-number";
import "@esri/calcite-components/components/calcite-label";
import { useState } from "react";
import { labelStyles } from "./lib/styles";

interface Props {
  layerIndex: number;
  handleColorChange: (layerIndex: number, value: string) => void;
  handleExtensionLengthChange: (layerIndex: number, value: string) => void;
  handleSizeChange: (layerIndex: number, value: string) => void;
}

function Edges3DForm({
  layerIndex,
  handleColorChange,
  handleExtensionLengthChange,
  handleSizeChange,
}: Props): React.ReactElement {
  const [color, setColor] = useState("#000000");
  const [extensionLength, setExtensionLength] = useState("0");
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
            handleColorChange(layerIndex, event.target.value);
          }}
          type="color"
          value={color}></calcite-input>
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
          value={extensionLength}></calcite-input-number>
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
          value={size}></calcite-input-number>
      </calcite-label>
    </>
  );
}

export default Edges3DForm;
