import type FillSymbol3DLayer from "@arcgis/core/symbols/FillSymbol3DLayer";
import React, { useState } from "react";
import { COLOR_MIX_MODE_OPTIONS } from "./lib/constants";
import { labelStyles } from "./lib/styles";

interface Props {
  layerIndex: number;
  handleColorChange: (layerIndex: number, value: string) => void;
  handleColorMixModeChange: (
    layerIndex: number,
    value: NonNullable<
      NonNullable<InstanceType<typeof FillSymbol3DLayer>["material"]>["colorMixMode"]
    >
  ) => void;
}

const FillSymbol3DLayerMaterialForm = ({
  layerIndex,
  handleColorChange,
  handleColorMixModeChange
}: Props) => {
  const [color, setColor] = useState("#007ac2");
  const [colorMixMode, setColorMixMode] = useState("multiply");

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
        ></calcite-input>
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
              >
            );
          }}
          value={colorMixMode}
        >
          {COLOR_MIX_MODE_OPTIONS.map((option, index) => (
            <calcite-option key={index}>{option}</calcite-option>
          ))}
        </calcite-select>
      </calcite-label>
    </React.Fragment>
  );
};

export default FillSymbol3DLayerMaterialForm;
