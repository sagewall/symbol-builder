import type Font from "@arcgis/core/symbols/Font.js";
import "@esri/calcite-components/components/calcite-input-text";
import "@esri/calcite-components/components/calcite-label";
import "@esri/calcite-components/components/calcite-option";
import "@esri/calcite-components/components/calcite-select";
import type TextSymbol3DLayer from "@arcgis/core/symbols/TextSymbol3DLayer.js";
import {
  fontDecorationOptions,
  fontStyleOptions,
  fontWeightOptions,
} from "./lib/constants";
import { labelStyles } from "./lib/styles";

interface Props {
  symbolLayer: TextSymbol3DLayer;
  layerIndex: number;
  handleDecorationChange: (
    layerIndex: number,
    value: InstanceType<typeof Font>["decoration"],
  ) => void;
  handleFamilyChange: (layerIndex: number, value: string) => void;
  handleStyleChange: (
    layerIndex: number,
    value: InstanceType<typeof Font>["style"],
  ) => void;
  handleWeightChange: (
    layerIndex: number,
    value: InstanceType<typeof Font>["weight"],
  ) => void;
}

function TextSymbol3DLayerFontForm({
  symbolLayer,
  layerIndex,
  handleDecorationChange,
  handleFamilyChange,
  handleStyleChange,
  handleWeightChange,
}: Props): React.ReactElement {
  const decoration = symbolLayer.font?.decoration ?? "none";
  const family = symbolLayer.font?.family ?? "sans-serif";
  const style = symbolLayer.font?.style ?? "normal";
  const weight = symbolLayer.font?.weight ?? "normal";

  return (
    <>
      <calcite-label layout="default" style={labelStyles}>
        decoration
        <calcite-select
          label={"font decoration selection"}
          oncalciteSelectChange={(event) => {
            handleDecorationChange(
              layerIndex,
              event.target.value as InstanceType<typeof Font>["decoration"],
            );
          }}
          value={decoration}
        >
          {fontDecorationOptions.map((option, index) => (
            <calcite-option key={index}>{option}</calcite-option>
          ))}
        </calcite-select>
      </calcite-label>

      <calcite-label layout="default" style={labelStyles}>
        family
        <calcite-input-text
          label={"font family input"}
          oncalciteInputTextChange={(event) => {
            handleFamilyChange(layerIndex, event.target.value);
          }}
          value={family}
        ></calcite-input-text>
      </calcite-label>

      <calcite-label layout="default" style={labelStyles}>
        style
        <calcite-select
          label={"font style selection"}
          oncalciteSelectChange={(event) => {
            handleStyleChange(
              layerIndex,
              event.target.value as InstanceType<typeof Font>["style"],
            );
          }}
          value={style}
        >
          {fontStyleOptions.map((option, index) => (
            <calcite-option key={index}>{option}</calcite-option>
          ))}
        </calcite-select>
      </calcite-label>

      <calcite-label layout="default" style={labelStyles}>
        weight
        <calcite-select
          label={"font weight selection"}
          oncalciteSelectChange={(event) => {
            handleWeightChange(
              layerIndex,
              event.target.value as InstanceType<typeof Font>["weight"],
            );
          }}
          value={weight}
        >
          {fontWeightOptions.map((option, index) => (
            <calcite-option key={index}>{option}</calcite-option>
          ))}
        </calcite-select>
      </calcite-label>
    </>
  );
}

export default TextSymbol3DLayerFontForm;
