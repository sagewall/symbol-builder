import FillSymbol3DLayer from "@arcgis/core/symbols/FillSymbol3DLayer";
import {
  CalciteInput,
  CalciteLabel,
  CalciteOption,
  CalciteSelect
} from "@esri/calcite-components-react";
import React, { useState } from "react";
import { COLOR_MIX_MODE_OPTIONS } from "./lib/constants";
import { labelStyles } from "./lib/styles";

interface Props {
  layerIndex: number;
  handleColorChange: (layerIndex: number, value: string) => void;
  handleColorMixModeChange: (
    layerIndex: number,
    value: InstanceType<typeof FillSymbol3DLayer>["material"]["colorMixMode"]
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
      <CalciteLabel layout="default" style={labelStyles}>
        color
        <CalciteInput
          onCalciteInputChange={(event) => {
            if (event.target.value) {
              setColor(event.target.value.toString());
            }
            handleColorChange(layerIndex, event.target.value as string);
          }}
          type="color"
          value={color}
        />
      </CalciteLabel>

      <CalciteLabel layout="default" style={labelStyles}>
        colorMixMode
        <CalciteSelect
          label={"cap selection"}
          onCalciteSelectChange={(event) => {
            setColorMixMode(event.target.value);
            handleColorMixModeChange(
              layerIndex,
              event.target.value as InstanceType<
                typeof FillSymbol3DLayer
              >["material"]["colorMixMode"]
            );
          }}
          value={colorMixMode}
        >
          {COLOR_MIX_MODE_OPTIONS.map((option, index) => (
            <CalciteOption key={index}>{option}</CalciteOption>
          ))}
        </CalciteSelect>
      </CalciteLabel>
    </React.Fragment>
  );
};

export default FillSymbol3DLayerMaterialForm;
