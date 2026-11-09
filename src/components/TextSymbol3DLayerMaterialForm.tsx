import "@esri/calcite-components/components/calcite-input";
import "@esri/calcite-components/components/calcite-label";
import type TextSymbol3DLayer from "@arcgis/core/symbols/TextSymbol3DLayer.js";
import { labelStyles } from "./lib/styles";

interface Props {
  symbolLayer: TextSymbol3DLayer;
  layerIndex: number;
  handleColorChange: (layerIndex: number, value: string) => void;
}

function TextSymbol3DLayerMaterialForm({
  symbolLayer,
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
    </>
  );
}

export default TextSymbol3DLayerMaterialForm;
