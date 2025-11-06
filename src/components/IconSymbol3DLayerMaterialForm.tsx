import "@esri/calcite-components/components/calcite-input";
import "@esri/calcite-components/components/calcite-label";
import { useState } from "react";
import { labelStyles } from "../lib/styles";

interface Props {
  layerIndex: number;
  handleColorChange: (layerIndex: number, value: string) => void;
}

function IconSymbol3DLayerMaterialForm({
  layerIndex,
  handleColorChange,
}: Props) {
  const [color, setColor] = useState("#ff0000");

  return (
    <>
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
        ></calcite-input>
      </calcite-label>
    </>
  );
}

export default IconSymbol3DLayerMaterialForm;
