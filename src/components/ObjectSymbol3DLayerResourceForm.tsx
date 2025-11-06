import type ObjectSymbol3DLayer from "@arcgis/core/symbols/ObjectSymbol3DLayer";
import "@esri/calcite-components/dist/components/calcite-input-text";
import "@esri/calcite-components/dist/components/calcite-label";
import "@esri/calcite-components/dist/components/calcite-option";
import "@esri/calcite-components/dist/components/calcite-select";
import { useState } from "react";
import { OBJECT_SYMBOL_3D_LAYER_RESOURCE_PRIMITIVE_OPTIONS } from "../lib/constants";
import { labelStyles } from "../lib/styles";

interface Props {
  layerIndex: number;
  handleHrefChange: (layerIndex: number, value: string) => void;
  handlePrimitiveChange: (
    layerIndex: number,
    value: NonNullable<
      NonNullable<
        InstanceType<typeof ObjectSymbol3DLayer>["resource"]
      >["primitive"]
    >
  ) => void;
}

function ObjectSymbol3DLayerResourceForm({
  layerIndex,
  handleHrefChange,
  handlePrimitiveChange,
}: Props) {
  const [href, setHref] = useState("");
  const [primitive, setPrimitive] = useState("circle");

  return (
    <>
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
                NonNullable<
                  InstanceType<typeof ObjectSymbol3DLayer>["resource"]
                >["primitive"]
              >
            );
          }}
          value={primitive}
        >
          {OBJECT_SYMBOL_3D_LAYER_RESOURCE_PRIMITIVE_OPTIONS.map(
            (option, index) => (
              <calcite-option key={index}>{option}</calcite-option>
            )
          )}
        </calcite-select>
      </calcite-label>
    </>
  );
}

export default ObjectSymbol3DLayerResourceForm;
