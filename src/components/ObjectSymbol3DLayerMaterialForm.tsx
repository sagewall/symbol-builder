import "@esri/calcite-components/dist/components/calcite-input";
import "@esri/calcite-components/dist/components/calcite-label";
import { useState } from "react";
import { labelStyles } from "./lib/styles";

interface Props {
  layerIndex: number;
  handleColorChange: (layerIndex: number, value: string) => void;
}

function ObjectSymbol3DLayerMaterialForm({ layerIndex, handleColorChange }: Props): React.ReactElement {
  const [color, setColor] = useState("#ff0000");

  return (
    <>
      <calcite-label layout="default" style={labelStyles}>
        color
        <calcite-input
          oncalciteInputInput={(event) => {
            if (event.target.value) {
              setColor(event.target.value);
            }
            if (handleColorChange) {
              handleColorChange(layerIndex, event.target.value);
            }
          }}
          type="color"
          value={color}></calcite-input>
      </calcite-label>
    </>
  );
}

export default ObjectSymbol3DLayerMaterialForm;
