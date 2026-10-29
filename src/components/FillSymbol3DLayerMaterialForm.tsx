import type FillSymbol3DLayer from "@arcgis/core/symbols/FillSymbol3DLayer.js";
import "@esri/calcite-components/components/calcite-input";
import "@esri/calcite-components/components/calcite-label";
import "@esri/calcite-components/components/calcite-option";
import "@esri/calcite-components/components/calcite-select";
import { colorMixModeOptions } from "./lib/constants";
import { labelStyles } from "./lib/styles";
import Symbol3DEmissiveForm, {
  type EmissiveChangeHandler,
} from "./Symbol3DEmissiveForm";

interface Props {
  symbolLayer: FillSymbol3DLayer;
  handleEmissiveChange?: EmissiveChangeHandler;
  layerIndex: number;
  handleColorChange: (layerIndex: number, value: string) => void;
  handleColorMixModeChange: (
    layerIndex: number,
    value: NonNullable<
      NonNullable<
        InstanceType<typeof FillSymbol3DLayer>["material"]
      >["colorMixMode"]
    >,
  ) => void;
}

function FillSymbol3DLayerMaterialForm({
  symbolLayer,
  handleEmissiveChange,
  layerIndex,
  handleColorChange,
  handleColorMixModeChange,
}: Props): React.ReactElement {
  const color = symbolLayer.material?.color?.toHex() ?? "#ffffff";
  const colorMixMode = symbolLayer.material?.colorMixMode ?? "multiply";

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

      <calcite-label layout="default" style={labelStyles}>
        colorMixMode
        <calcite-select
          label="colorMixMode selection"
          oncalciteSelectChange={(event) => {
            handleColorMixModeChange(
              layerIndex,
              event.target.value as NonNullable<
                NonNullable<
                  InstanceType<typeof FillSymbol3DLayer>["material"]
                >["colorMixMode"]
              >,
            );
          }}
          value={colorMixMode}
        >
          {colorMixModeOptions.map((option, index) => (
            <calcite-option key={index}>{option}</calcite-option>
          ))}
        </calcite-select>
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

export default FillSymbol3DLayerMaterialForm;
