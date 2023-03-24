import {
  CalciteInputText,
  CalciteLabel,
  CalciteOption,
  CalciteSelect
} from "@esri/calcite-components-react";
import React, { useState } from "react";
import { OBJECT_SYMBOL_3D_LAYER_RESOURCE_PRIMITIVE_OPTIONS } from "./lib/constants";
import { labelStyles } from "./lib/styles";
import { ObjectSymbol3DLayerResourcePrimitive } from "./lib/types";

interface Props {
  layerIndex: number;
  handleHrefChange: (layerIndex: number, value: string) => void;
  handlePrimitiveChange: (layerIndex: number, value: ObjectSymbol3DLayerResourcePrimitive) => void;
}

const ObjectSymbol3DLayerResourceForm = ({
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
              event.target.value as ObjectSymbol3DLayerResourcePrimitive
            );
          }}
          value={primitive}
        >
          {OBJECT_SYMBOL_3D_LAYER_RESOURCE_PRIMITIVE_OPTIONS.map((option, index) => (
            <CalciteOption key={index}>{option}</CalciteOption>
          ))}
        </CalciteSelect>
      </CalciteLabel>
    </React.Fragment>
  );
};

export default ObjectSymbol3DLayerResourceForm;
