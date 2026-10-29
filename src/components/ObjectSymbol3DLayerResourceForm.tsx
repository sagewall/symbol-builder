import type ObjectSymbol3DLayer from "@arcgis/core/symbols/ObjectSymbol3DLayer.js";
import "@esri/calcite-components/dist/components/calcite-input-text";
import "@esri/calcite-components/dist/components/calcite-label";
import "@esri/calcite-components/dist/components/calcite-option";
import "@esri/calcite-components/dist/components/calcite-select";
import { objectSymbol3dLayerResourcePrimitiveOptions } from "./lib/constants";
import { labelStyles } from "./lib/styles";

interface Props {
  symbolLayer: ObjectSymbol3DLayer;
  layerIndex: number;
  handleHrefChange: (layerIndex: number, value: string) => void;
  handlePrimitiveChange: (
    layerIndex: number,
    value: NonNullable<
      NonNullable<
        InstanceType<typeof ObjectSymbol3DLayer>["resource"]
      >["primitive"]
    >,
  ) => void;
}

function ObjectSymbol3DLayerResourceForm({
  symbolLayer,
  layerIndex,
  handleHrefChange,
  handlePrimitiveChange,
}: Props): React.ReactElement {
  const href = symbolLayer.resource?.href ?? "";
  const primitive = symbolLayer.resource?.primitive ?? "";

  return (
    <>
      <calcite-label layout="default" style={labelStyles}>
        href
        <calcite-input-text
          label={"url input"}
          oncalciteInputTextChange={(event) => {
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
            handlePrimitiveChange(
              layerIndex,
              event.target.value as NonNullable<
                NonNullable<
                  InstanceType<typeof ObjectSymbol3DLayer>["resource"]
                >["primitive"]
              >,
            );
          }}
          value={primitive}
        >
          {objectSymbol3dLayerResourcePrimitiveOptions.map((option, index) => (
            <calcite-option key={index}>{option}</calcite-option>
          ))}
        </calcite-select>
      </calcite-label>
    </>
  );
}

export default ObjectSymbol3DLayerResourceForm;
