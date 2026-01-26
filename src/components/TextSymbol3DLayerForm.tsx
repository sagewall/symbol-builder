import type Font from "@arcgis/core/symbols/Font.js";
import type TextSymbol3DLayer from "@arcgis/core/symbols/TextSymbol3DLayer.js";
import "@esri/calcite-components/components/calcite-block";
import "@esri/calcite-components/components/calcite-input-number";
import "@esri/calcite-components/components/calcite-input-text";
import "@esri/calcite-components/components/calcite-label";
import "@esri/calcite-components/components/calcite-option";
import "@esri/calcite-components/components/calcite-select";
import { useState } from "react";
import {
  horizontalAlignmentOptions,
  verticalAlignmentOptions,
} from "./lib/constants";
import { blockStyles, labelStyles } from "./lib/styles";
import TextSymbol3DLayerBackgroundForm from "./TextSymbol3DLayerBackgroundForm";
import TextSymbol3DLayerFontForm from "./TextSymbol3DLayerFontForm";
import TextSymbol3DLayerHaloForm from "./TextSymbol3DLayerHaloForm";
import TextSymbol3DLayerMaterialForm from "./TextSymbol3DLayerMaterialForm";

interface Props {
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
  handleTextSymbol3DLayerFontSizeChange: (
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
  handleSizeChange: (layerIndex: number, value: string) => void;
  handleTextChange: (layerIndex: number, value: string) => void;
  handleVerticalAlignmentChange: (
    layerIndex: number,
    value: InstanceType<typeof TextSymbol3DLayer>["verticalAlignment"],
  ) => void;
}

function TextSymbol3DLayerForm({
  handleTextSymbol3DLayerBackgroundColorChange,
  handleTextSymbol3DLayerFontDecorationChange,
  handleTextSymbol3DLayerFontFamilyChange,
  handleTextSymbol3DLayerFontSizeChange,
  handleTextSymbol3DLayerFontStyleChange,
  handleTextSymbol3DLayerFontWeightChange,
  handleTextSymbol3DLayerHaloColorChange,
  handleTextSymbol3DLayerHaloSizeChange,
  handleHorizontalAlignmentChange,
  handleLineHeightChange,
  handleTextSymbol3DLayerMaterialColorChange,
  handleSizeChange,
  handleTextChange,
  handleVerticalAlignmentChange,
  layerIndex,
}: Props): React.ReactElement {
  const [horizontalAlignment, setHorizontalAlignment] = useState("center");
  const [lineHeight, setLineHeight] = useState("1");
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

      <calcite-block style={blockStyles} collapsible heading={"background"}>
        <TextSymbol3DLayerBackgroundForm
          layerIndex={layerIndex}
          handleColorChange={handleTextSymbol3DLayerBackgroundColorChange}
        ></TextSymbol3DLayerBackgroundForm>
      </calcite-block>

      <calcite-block style={blockStyles} collapsible heading={"font"}>
        <TextSymbol3DLayerFontForm
          layerIndex={layerIndex}
          handleDecorationChange={handleTextSymbol3DLayerFontDecorationChange}
          handleFamilyChange={handleTextSymbol3DLayerFontFamilyChange}
          handleSizeChange={handleTextSymbol3DLayerFontSizeChange}
          handleStyleChange={handleTextSymbol3DLayerFontStyleChange}
          handleWeightChange={handleTextSymbol3DLayerFontWeightChange}
        ></TextSymbol3DLayerFontForm>
      </calcite-block>

      <calcite-block style={blockStyles} collapsible heading={"halo"}>
        <TextSymbol3DLayerHaloForm
          layerIndex={layerIndex}
          handleColorChange={handleTextSymbol3DLayerHaloColorChange}
          handleSizeChange={handleTextSymbol3DLayerHaloSizeChange}
        ></TextSymbol3DLayerHaloForm>
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

      <calcite-block style={blockStyles} collapsible heading={"material"}>
        <TextSymbol3DLayerMaterialForm
          layerIndex={layerIndex}
          handleColorChange={handleTextSymbol3DLayerMaterialColorChange}
        ></TextSymbol3DLayerMaterialForm>
      </calcite-block>

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
