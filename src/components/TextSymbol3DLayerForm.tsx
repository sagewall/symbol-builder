import type Font from "@arcgis/core/symbols/Font.js";
import type TextSymbol3DLayer from "@arcgis/core/symbols/TextSymbol3DLayer.js";
import Symbol3DTextBackground from "@arcgis/core/symbols/support/Symbol3DTextBackground.js";
import Symbol3DHalo from "@arcgis/core/symbols/support/Symbol3DHalo.js";
import type { OccludedVisibilityMode } from "@arcgis/core/symbols/support/types.js";
import "@esri/calcite-components/components/calcite-block";
import "@esri/calcite-components/components/calcite-input-number";
import "@esri/calcite-components/components/calcite-input-text";
import "@esri/calcite-components/components/calcite-label";
import "@esri/calcite-components/components/calcite-option";
import "@esri/calcite-components/components/calcite-select";
import "@esri/calcite-components/components/calcite-switch";
import { useState } from "react";
import {
  horizontalAlignmentOptions,
  occludedVisibilityOptions,
  verticalAlignmentOptions,
} from "./lib/constants";
import { blockStyles, labelStyles } from "./lib/styles";
import TextSymbol3DLayerBackgroundForm from "./TextSymbol3DLayerBackgroundForm";
import TextSymbol3DLayerFontForm from "./TextSymbol3DLayerFontForm";
import TextSymbol3DLayerHaloForm from "./TextSymbol3DLayerHaloForm";
import TextSymbol3DLayerMaterialForm from "./TextSymbol3DLayerMaterialForm";

interface Props {
  symbolLayer: TextSymbol3DLayer;
  handleAppearanceChange: (
    index: number,
    value: Partial<Pick<TextSymbol3DLayer, "background" | "halo">>,
  ) => void;
  layerIndex: number;
  handleTextSymbol3DLayerBackgroundColorChange: (
    layerIndex: number,
    value: string,
  ) => void;
  handleTextSymbol3DLayerFontDecorationChange: (
    layerIndex: number,
    value: InstanceType<typeof Font>["decoration"],
  ) => void;
  handleTextSymbol3DLayerFontFamilyChange: (
    layerIndex: number,
    value: string,
  ) => void;
  handleTextSymbol3DLayerFontStyleChange: (
    layerIndex: number,
    value: InstanceType<typeof Font>["style"],
  ) => void;
  handleTextSymbol3DLayerFontWeightChange: (
    layerIndex: number,
    value: InstanceType<typeof Font>["weight"],
  ) => void;
  handleTextSymbol3DLayerHaloColorChange: (
    layerIndex: number,
    value: string,
  ) => void;
  handleTextSymbol3DLayerHaloSizeChange: (
    layerIndex: number,
    value: string,
  ) => void;
  handleHorizontalAlignmentChange: (
    layerIndex: number,
    value: InstanceType<typeof TextSymbol3DLayer>["horizontalAlignment"],
  ) => void;
  handleLineHeightChange: (layerIndex: number, value: string) => void;
  handleTextSymbol3DLayerMaterialColorChange: (
    layerIndex: number,
    value: string,
  ) => void;
  handleOccludedVisibilityChange: (
    layerIndex: number,
    value: OccludedVisibilityMode,
  ) => void;
  handleSizeChange: (layerIndex: number, value: string) => void;
  handleTextChange: (layerIndex: number, value: string) => void;
  handleVerticalAlignmentChange: (
    layerIndex: number,
    value: InstanceType<typeof TextSymbol3DLayer>["verticalAlignment"],
  ) => void;
}

function TextSymbol3DLayerForm({
  symbolLayer,
  handleAppearanceChange,
  handleTextSymbol3DLayerBackgroundColorChange,
  handleTextSymbol3DLayerFontDecorationChange,
  handleTextSymbol3DLayerFontFamilyChange,
  handleTextSymbol3DLayerFontStyleChange,
  handleTextSymbol3DLayerFontWeightChange,
  handleTextSymbol3DLayerHaloColorChange,
  handleTextSymbol3DLayerHaloSizeChange,
  handleHorizontalAlignmentChange,
  handleLineHeightChange,
  handleTextSymbol3DLayerMaterialColorChange,
  handleOccludedVisibilityChange,
  handleSizeChange,
  handleTextChange,
  handleVerticalAlignmentChange,
  layerIndex,
}: Props): React.ReactElement {
  const [savedBackground, setSavedBackground] = useState(
    symbolLayer.background?.clone() ??
      new Symbol3DTextBackground({ color: "#aaaaaa" }),
  );
  const [savedHalo, setSavedHalo] = useState(
    new Symbol3DHalo({
      color: symbolLayer.halo?.color?.toRgba() ?? "#000000",
      size: symbolLayer.halo?.size ?? 0,
    }),
  );
  const [horizontalAlignment, setHorizontalAlignment] = useState("center");
  const [lineHeight, setLineHeight] = useState("1");
  const [occludedVisibility, setOccludedVisibility] =
    useState<OccludedVisibilityMode>("adaptive");
  const [size, setSize] = useState("9");
  const [text, setText] = useState("Hello World!");
  const [verticalAlignment, setVerticalAlignment] = useState("baseline");

  return (
    <>
      <calcite-label layout="default" style={labelStyles}>
        text
        <calcite-input-text
          label={"text input"}
          oncalciteInputTextChange={(event) => {
            setText(event.target.value);
            handleTextChange(layerIndex, event.target.value);
          }}
          value={text}
        ></calcite-input-text>
      </calcite-label>

      <calcite-block style={blockStyles} expandable heading={"background"}>
        <calcite-label layout="default" style={labelStyles}>
          enabled
          <calcite-switch
            label="background enabled"
            checked={!!symbolLayer.background}
            oncalciteSwitchChange={(event) => {
              if (symbolLayer.background)
                setSavedBackground(symbolLayer.background.clone());
              handleAppearanceChange(layerIndex, {
                background: event.target.checked
                  ? savedBackground.clone()
                  : null,
              });
            }}
          ></calcite-switch>
        </calcite-label>
        {symbolLayer.background && (
          <TextSymbol3DLayerBackgroundForm
            colorValue={symbolLayer.background.color?.toHex()}
            layerIndex={layerIndex}
            handleColorChange={handleTextSymbol3DLayerBackgroundColorChange}
          ></TextSymbol3DLayerBackgroundForm>
        )}
      </calcite-block>

      <calcite-block style={blockStyles} expandable heading={"font"}>
        <TextSymbol3DLayerFontForm
          layerIndex={layerIndex}
          handleDecorationChange={handleTextSymbol3DLayerFontDecorationChange}
          handleFamilyChange={handleTextSymbol3DLayerFontFamilyChange}
          handleStyleChange={handleTextSymbol3DLayerFontStyleChange}
          handleWeightChange={handleTextSymbol3DLayerFontWeightChange}
        ></TextSymbol3DLayerFontForm>
      </calcite-block>

      <calcite-block style={blockStyles} expandable heading={"halo"}>
        <calcite-label layout="default" style={labelStyles}>
          enabled
          <calcite-switch
            label="halo enabled"
            checked={!!symbolLayer.halo}
            oncalciteSwitchChange={(event) => {
              if (symbolLayer.halo)
                setSavedHalo(
                  new Symbol3DHalo({
                    color: symbolLayer.halo.color?.toRgba(),
                    size: symbolLayer.halo.size,
                  }),
                );
              handleAppearanceChange(layerIndex, {
                halo: event.target.checked
                  ? new Symbol3DHalo({
                      color: savedHalo.color?.toRgba(),
                      size: savedHalo.size,
                    })
                  : null,
              });
            }}
          ></calcite-switch>
        </calcite-label>
        {symbolLayer.halo && (
          <TextSymbol3DLayerHaloForm
            colorValue={symbolLayer.halo.color?.toHex()}
            sizeValue={symbolLayer.halo.size}
            layerIndex={layerIndex}
            handleColorChange={handleTextSymbol3DLayerHaloColorChange}
            handleSizeChange={handleTextSymbol3DLayerHaloSizeChange}
          ></TextSymbol3DLayerHaloForm>
        )}
      </calcite-block>

      <calcite-label layout="default" style={labelStyles}>
        horizontalAlignment
        <calcite-select
          label={"horizontalAlignment selection"}
          oncalciteSelectChange={(event) => {
            setHorizontalAlignment(event.target.value);
            handleHorizontalAlignmentChange(
              layerIndex,
              event.target.value as InstanceType<
                typeof TextSymbol3DLayer
              >["horizontalAlignment"],
            );
          }}
          value={horizontalAlignment}
        >
          {horizontalAlignmentOptions.map((option, index) => (
            <calcite-option key={index}>{option}</calcite-option>
          ))}
        </calcite-select>
      </calcite-label>

      <calcite-label layout="default" style={labelStyles}>
        verticalAlignment
        <calcite-select
          label={"verticalAlignment selection"}
          oncalciteSelectChange={(event) => {
            setVerticalAlignment(event.target.value);
            handleVerticalAlignmentChange(
              layerIndex,
              event.target.value as InstanceType<
                typeof TextSymbol3DLayer
              >["verticalAlignment"],
            );
          }}
          value={verticalAlignment}
        >
          {verticalAlignmentOptions.map((option, index) => (
            <calcite-option key={index}>{option}</calcite-option>
          ))}
        </calcite-select>
      </calcite-label>

      <calcite-label layout="default" style={labelStyles}>
        lineHeight
        <calcite-input-number
          label={"lineHeight input"}
          min={0}
          oncalciteInputNumberChange={(event) => {
            setLineHeight(event.target.value);
            handleLineHeightChange(layerIndex, event.target.value);
          }}
          value={lineHeight}
        ></calcite-input-number>
      </calcite-label>

      <calcite-block style={blockStyles} expandable heading={"material"}>
        <TextSymbol3DLayerMaterialForm
          layerIndex={layerIndex}
          handleColorChange={handleTextSymbol3DLayerMaterialColorChange}
        ></TextSymbol3DLayerMaterialForm>
      </calcite-block>

      <calcite-label layout="default" style={labelStyles}>
        occludedVisibility
        <calcite-select
          label="Occluded visibility selection"
          oncalciteSelectChange={(event) => {
            const mode = event.target.value as OccludedVisibilityMode;
            setOccludedVisibility(mode);
            handleOccludedVisibilityChange(layerIndex, mode);
          }}
          value={occludedVisibility}
        >
          {occludedVisibilityOptions.map((option) => (
            <calcite-option key={option} value={option}>
              {option}
            </calcite-option>
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

export default TextSymbol3DLayerForm;
