import type StylePattern3D from "@arcgis/core/symbols/patterns/StylePattern3D.js";
import "@esri/calcite-components/components/calcite-label";
import "@esri/calcite-components/components/calcite-option";
import "@esri/calcite-components/components/calcite-select";
import type FillSymbol3DLayer from "@arcgis/core/symbols/FillSymbol3DLayer.js";
import { fillOptions } from "./lib/constants";
import { labelStyles } from "./lib/styles";

interface Props {
  symbolLayer: FillSymbol3DLayer;
  layerIndex: number;
  handleStyleChange: (
    layerIndex: number,
    value: InstanceType<typeof StylePattern3D>["style"],
  ) => void;
}

function StylePattern3DForm({
  symbolLayer,
  layerIndex,
  handleStyleChange,
}: Props): React.ReactElement {
  const style = symbolLayer.pattern?.style ?? "solid";

  return (
    <>
      <calcite-label layout="default" style={labelStyles}>
        style
        <calcite-select
          label="pattern style selection"
          oncalciteSelectChange={(event) => {
            handleStyleChange(
              layerIndex,
              event.target.value as InstanceType<
                typeof StylePattern3D
              >["style"],
            );
          }}
          value={style}
        >
          {fillOptions.map((option, index) => (
            <calcite-option key={index}>{option}</calcite-option>
          ))}
        </calcite-select>
      </calcite-label>
    </>
  );
}

export default StylePattern3DForm;
