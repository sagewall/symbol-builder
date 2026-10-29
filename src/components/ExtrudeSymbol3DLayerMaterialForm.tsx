import "@esri/calcite-components/dist/components/calcite-input";
import "@esri/calcite-components/dist/components/calcite-label";
import type ExtrudeSymbol3DLayer from "@arcgis/core/symbols/ExtrudeSymbol3DLayer.js";
import { labelStyles } from "./lib/styles";
import Symbol3DEmissiveForm, {
  type EmissiveChangeHandler,
} from "./Symbol3DEmissiveForm";

interface Props {
  symbolLayer: ExtrudeSymbol3DLayer;
  handleEmissiveChange?: EmissiveChangeHandler;
  layerIndex: number;
  handleColorChange: (layerIndex: number, value: string) => void;
}

function ExtrudeSymbol3DLayerMaterialForm({
  symbolLayer,
  handleEmissiveChange,
  layerIndex,
  handleColorChange,
}: Props): React.ReactElement {
  const color = symbolLayer.material?.color?.toHex() ?? "#ffffff";

  return (
    <>
      <calcite-label layout="default" style={labelStyles}>
        color
        <calcite-input
          oncalciteInputInput={(event) => {
            if (!event.target.value) return;
            handleColorChange(layerIndex, event.target.value);
          }}
          type="color"
          value={color}
        ></calcite-input>
      </calcite-label>
      {handleEmissiveChange && (
        <Symbol3DEmissiveForm
          emissive={symbolLayer.material?.emissive}
          layerIndex={layerIndex}
          handleChange={handleEmissiveChange}
        />
      )}
    </>
  );
}

export default ExtrudeSymbol3DLayerMaterialForm;
