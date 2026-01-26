import type FillSymbol3DLayer from "@arcgis/core/symbols/FillSymbol3DLayer.js";
import "@esri/calcite-components/components/calcite-input";
import "@esri/calcite-components/components/calcite-label";
import "@esri/calcite-components/components/calcite-option";
import "@esri/calcite-components/components/calcite-select";
import { useState } from "react";
import { colorMixModeOptions } from "./lib/constants";
import { labelStyles } from "./lib/styles";

interface Props {
  layerIndex: number;
  handleColorChange: (layerIndex: number, value: string) => void;
  handleColorMixModeChange: (
    layerIndex: number,
    value: NonNullable<NonNullable<InstanceType<typeof FillSymbol3DLayer>["material"]>["colorMixMode"]>,
  ) => void;
}

function FillSymbol3DLayerMaterialForm({
  layerIndex,
  handleColorChange,
  handleColorMixModeChange,
}: Props): React.ReactElement {
  const [color, setColor] = useState("#007ac2");
  const [colorMixMode, setColorMixMode] = useState("multiply");

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
        colorMixMode
        <calcite-select
          label={"cap selection"}
          oncalciteSelectChange={(event) => {
            setColorMixMode(event.target.value);
            handleColorMixModeChange(
              layerIndex,
              event.target.value as NonNullable<
                NonNullable<InstanceType<typeof FillSymbol3DLayer>["material"]>["colorMixMode"]
              >,
            );
          }}
          value={colorMixMode}>
          {colorMixModeOptions.map((option, index) => (
            <calcite-option key={index}>{option}</calcite-option>
          ))}
        </calcite-select>
      </calcite-label>
    </>
  );
}

export default FillSymbol3DLayerMaterialForm;
