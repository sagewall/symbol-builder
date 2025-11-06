import type StylePattern3D from "@arcgis/core/symbols/patterns/StylePattern3D";
import "@esri/calcite-components/components/calcite-label";
import "@esri/calcite-components/components/calcite-option";
import "@esri/calcite-components/components/calcite-select";
import { useState } from "react";
import { FILL_OPTIONS } from "../lib/constants";
import { labelStyles } from "../lib/styles";

interface Props {
  layerIndex: number;
  handleStyleChange: (
    layerIndex: number,
    value: InstanceType<typeof StylePattern3D>["style"]
  ) => void;
}

function StylePattern3DForm({ layerIndex, handleStyleChange }: Props) {
  const [style, setStyle] = useState("solid");

  return (
    <>
      <calcite-label layout="default" style={labelStyles}>
        style
        <calcite-select
          label={"cap selection"}
          oncalciteSelectChange={(event) => {
            setStyle(event.target.value);
            handleStyleChange(
              layerIndex,
              event.target.value as InstanceType<typeof StylePattern3D>["style"]
            );
          }}
          value={style}
        >
          {FILL_OPTIONS.map((option, index) => (
            <calcite-option key={index}>{option}</calcite-option>
          ))}
        </calcite-select>
      </calcite-label>
    </>
  );
}

export default StylePattern3DForm;
