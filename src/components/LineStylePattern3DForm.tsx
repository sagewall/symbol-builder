import type LineStylePattern3D from "@arcgis/core/symbols/patterns/LineStylePattern3D.js";
import "@esri/calcite-components/components/calcite-label";
import "@esri/calcite-components/components/calcite-option";
import "@esri/calcite-components/components/calcite-select";
import { useState } from "react";
import { lineStyleOptions } from "./lib/constants";
import { labelStyles } from "./lib/styles";

interface Props {
  styleValue?: LineStylePattern3D["style"];
  layerIndex: number;
  handleStyleChange: (
    layerIndex: number,
    value: InstanceType<typeof LineStylePattern3D>["style"],
  ) => void;
}

function LineStylePattern3DForm({
  styleValue,
  layerIndex,
  handleStyleChange,
}: Props): React.ReactElement {
  const [style, setStyle] = useState("solid");

  return (
    <>
      <calcite-label layout="default" style={labelStyles}>
        style
        <calcite-select
          label="pattern style selection"
          oncalciteSelectChange={(event) => {
            setStyle(event.target.value);
            handleStyleChange(
              layerIndex,
              event.target.value as InstanceType<
                typeof LineStylePattern3D
              >["style"],
            );
          }}
          value={styleValue ?? style}
        >
          {lineStyleOptions.map((option, index) => (
            <calcite-option key={index}>{option}</calcite-option>
          ))}
        </calcite-select>
      </calcite-label>
    </>
  );
}

export default LineStylePattern3DForm;
