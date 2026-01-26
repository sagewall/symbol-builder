import type IconSymbol3DLayer from "@arcgis/core/symbols/IconSymbol3DLayer.js";
import "@esri/calcite-components/components/calcite-input-text";
import "@esri/calcite-components/components/calcite-label";
import "@esri/calcite-components/components/calcite-option";
import "@esri/calcite-components/components/calcite-select";
import { useState } from "react";
import { iconSymbol3dLayerResourcePrimitiveOptions } from "./lib/constants";
import { labelStyles } from "./lib/styles";

interface Props {
  layerIndex: number;
  handleHrefChange: (layerIndex: number, value: string) => void;
  handlePrimitiveChange: (
    layerIndex: number,
    value: NonNullable<NonNullable<InstanceType<typeof IconSymbol3DLayer>["resource"]>["primitive"]>,
  ) => void;
}

function IconSymbol3DLayerResourceForm({
  layerIndex,
  handleHrefChange,
  handlePrimitiveChange,
}: Props): React.ReactElement {
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
          value={href}></calcite-input-text>
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
              >,
            );
          }}
          value={primitive}>
          {iconSymbol3dLayerResourcePrimitiveOptions.map((option, index) => (
            <calcite-option key={index}>{option}</calcite-option>
          ))}
        </calcite-select>
      </calcite-label>
    </>
  );
}

export default IconSymbol3DLayerResourceForm;
