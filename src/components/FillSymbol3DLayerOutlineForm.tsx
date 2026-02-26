import type FillSymbol3DLayer from "@arcgis/core/symbols/FillSymbol3DLayer.js";
import type LineStylePattern3D from "@arcgis/core/symbols/patterns/LineStylePattern3D.js";
import "@esri/calcite-components/components/calcite-input";
import "@esri/calcite-components/components/calcite-input-number";
import "@esri/calcite-components/components/calcite-label";
import "@esri/calcite-components/components/calcite-option";
import "@esri/calcite-components/components/calcite-select";
import { useState } from "react";
import { capOptions } from "./lib/constants";
import { labelStyles } from "./lib/styles";
import LineStylePattern3DForm from "./LineStylePattern3DForm";

interface Props {
  layerIndex: number;
  handleColorChange: (layerIndex: number, value: string) => void;
  handleLineSylePattern3DStyleChange: (
    layerIndex: number,
    value: InstanceType<typeof LineStylePattern3D>["style"],
  ) => void;
  handlePatternCapChange: (
    layerIndex: number,
    value: NonNullable<
      NonNullable<
        InstanceType<typeof FillSymbol3DLayer>["outline"]
      >["patternCap"]
    >,
  ) => void;
  handleSizeChange: (layerIndex: number, value: string) => void;
}

function FillSymbol3DLayerOutlineForm({
  layerIndex,
  handleColorChange,
  handleLineSylePattern3DStyleChange,
  handlePatternCapChange,
  handleSizeChange,
}: Props): React.ReactElement {
  const [color, setColor] = useState("#111111");
  const [patternCap, setPatternCap] = useState("butt");
  const [size, setSize] = useState("3");

  return (
    <>
      <calcite-label layout="default" style={labelStyles}>
        color
        <calcite-input
          oncalciteInputInput={(event) => {
            if (event.target.value) {
              setColor(event.target.value);
            }
            handleColorChange(layerIndex, event.target.value);
          }}
          type="color"
          value={color}
        ></calcite-input>
      </calcite-label>

      <LineStylePattern3DForm
        layerIndex={layerIndex}
        handleStyleChange={handleLineSylePattern3DStyleChange}
      ></LineStylePattern3DForm>

      <calcite-label layout="default" style={labelStyles}>
        patternCap
        <calcite-select
          label={"patternCap selection"}
          oncalciteSelectChange={(event) => {
            setPatternCap(event.target.value);
            handlePatternCapChange(
              layerIndex,
              event.target.value as NonNullable<
                NonNullable<
                  InstanceType<typeof FillSymbol3DLayer>["outline"]
                >["patternCap"]
              >,
            );
          }}
          value={patternCap}
        >
          {capOptions.map((option, index) => (
            <calcite-option key={index}>{option}</calcite-option>
          ))}
        </calcite-select>
      </calcite-label>

      <calcite-label layout="default" style={labelStyles}>
        size
        <calcite-input-number
          label={"size input"}
          min={0}
          oncalciteInputNumberChange={(event) => {
            setSize(event.target.value);
            handleSizeChange(layerIndex, event.target.value);
          }}
          value={size}
        ></calcite-input-number>
      </calcite-label>
    </>
  );
}

export default FillSymbol3DLayerOutlineForm;
