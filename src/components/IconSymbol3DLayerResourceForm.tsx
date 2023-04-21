import type IconSymbol3DLayer from "@arcgis/core/symbols/IconSymbol3DLayer";
import {
  CalciteInputText,
  CalciteLabel,
  CalciteOption,
  CalciteSelect
} from "@esri/calcite-components-react";
import React, { useState } from "react";
import { ICON_SYMBOL_3D_LAYER_RESOURCE_PRIMITIVE_OPTIONS } from "./lib/constants";
import { labelStyles } from "./lib/styles";

interface Props {
  layerIndex: number;
  handleHrefChange: (layerIndex: number, value: string) => void;
  handlePrimitiveChange: (
    layerIndex: number,
    value: InstanceType<typeof IconSymbol3DLayer>["resource"]["primitive"]
  ) => void;
}

const IconSymbol3DLayerResourceForm = ({
  layerIndex,
  handleHrefChange,
  handlePrimitiveChange
}: Props) => {
  const [href, setHref] = useState("");
  const [primitive, setPrimitive] = useState("circle");

  return (
    <React.Fragment>
      <CalciteLabel layout="default" style={labelStyles}>
        href
        <CalciteInputText
          label={"url input"}
          onCalciteInputTextChange={(event) => {
            setHref(event.target.value);
            handleHrefChange(layerIndex, event.target.value);
          }}
          value={href}
        ></CalciteInputText>
      </CalciteLabel>
      <CalciteLabel layout="default" style={labelStyles}>
        primitive
        <CalciteSelect
          label={"primitive selection"}
          onCalciteSelectChange={(event) => {
            setPrimitive(event.target.value);
            handlePrimitiveChange(
              layerIndex,
              event.target.value as InstanceType<typeof IconSymbol3DLayer>["resource"]["primitive"]
            );
          }}
          value={primitive}
        >
          {ICON_SYMBOL_3D_LAYER_RESOURCE_PRIMITIVE_OPTIONS.map((option, index) => (
            <CalciteOption key={index}>{option}</CalciteOption>
          ))}
        </CalciteSelect>
      </CalciteLabel>
    </React.Fragment>
  );
};

export default IconSymbol3DLayerResourceForm;
