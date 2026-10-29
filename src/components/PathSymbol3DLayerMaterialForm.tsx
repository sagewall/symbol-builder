import "@esri/calcite-components/components/calcite-input";
import "@esri/calcite-components/components/calcite-label";
import { useState } from "react";
import { labelStyles } from "./lib/styles";
import Symbol3DEmissiveForm, {
  type EmissiveChangeHandler,
} from "./Symbol3DEmissiveForm";

interface Props {
  handleEmissiveChange?: EmissiveChangeHandler;
  layerIndex: number;
  handleColorChange: (layerIndex: number, value: string) => void;
}

function PathSymbol3DLayerMaterialForm({
  handleEmissiveChange,
  layerIndex,
  handleColorChange,
}: Props): React.ReactElement {
  const [color, setColor] = useState("#007ac2");

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
          value={color}
        ></calcite-input>
      </calcite-label>
      {handleEmissiveChange && (
        <Symbol3DEmissiveForm
          layerIndex={layerIndex}
          handleChange={handleEmissiveChange}
        />
      )}
    </>
  );
}

export default PathSymbol3DLayerMaterialForm;
