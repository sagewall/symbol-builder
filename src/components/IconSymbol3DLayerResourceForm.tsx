import type IconSymbol3DLayer from "@arcgis/core/symbols/IconSymbol3DLayer";
import React, { useState } from "react";
import { ICON_SYMBOL_3D_LAYER_RESOURCE_PRIMITIVE_OPTIONS } from "./lib/constants";
import { labelStyles } from "./lib/styles";

interface Props {
  layerIndex: number;
  handleHrefChange: (layerIndex: number, value: string) => void;
  handlePrimitiveChange: (
    layerIndex: number,
    value: NonNullable<NonNullable<InstanceType<typeof IconSymbol3DLayer>["resource"]>["primitive"]>
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
      <calcite-label layout="default" style={labelStyles}>
        href
        <calcite-input-text
          label={"url input"}
          oncalciteInputTextChange={(event) => {
            setHref(event.target.value);
            handleHrefChange(layerIndex, event.target.value);
          }}
          value={href}
        ></calcite-input-text>
      </calcite-label>
      <calcite-label layout="default" style={labelStyles}>
        primitive
        <calcite-select
          label={"primitive selection"}
          oncalciteSelectChange={(event) => {
            setPrimitive(event.target.value);
            handlePrimitiveChange(
              layerIndex,
              event.target.value as NonNullable<
                NonNullable<InstanceType<typeof IconSymbol3DLayer>["resource"]>["primitive"]
              >
            );
          }}
          value={primitive}
        >
          {ICON_SYMBOL_3D_LAYER_RESOURCE_PRIMITIVE_OPTIONS.map((option, index) => (
            <calcite-option key={index}>{option}</calcite-option>
          ))}
        </calcite-select>
      </calcite-label>
    </React.Fragment>
  );
};

export default IconSymbol3DLayerResourceForm;
