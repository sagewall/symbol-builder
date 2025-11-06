import type ObjectSymbol3DLayer from "@arcgis/core/symbols/ObjectSymbol3DLayer";
import "@esri/calcite-components/dist/components/calcite-block";
import "@esri/calcite-components/dist/components/calcite-input-number";
import "@esri/calcite-components/dist/components/calcite-label";
import "@esri/calcite-components/dist/components/calcite-option";
import "@esri/calcite-components/dist/components/calcite-select";
import "@esri/calcite-components/dist/components/calcite-slider";
import "@esri/calcite-components/dist/components/calcite-switch";
import { useState } from "react";
import { OBJECT_SYMBOL_3D_LAYER_ANCHOR_OPTIONS } from "../lib/constants";
import { blockStyles, labelStyles } from "../lib/styles";
import ObjectSymbol3DLayerAnchorPositionForm from "./ObjectSymbol3DLayerAnchorPositionForm";
import ObjectSymbol3DLayerMaterialForm from "./ObjectSymbol3DLayerMaterialForm";
import ObjectSymbol3DLayerResourceForm from "./ObjectSymbol3DLayerResourceForm";

interface Props {
  layerIndex: number;
  handleAnchorChange: (
    layerIndex: number,
    value: InstanceType<typeof ObjectSymbol3DLayer>["anchor"]
  ) => void;
  handleObjectSymbol3DLayerAnchorPositionXChange: (
    layerIndex: number,
    value: string
  ) => void;
  handleObjectSymbol3DLayerAnchorPositionYChange: (
    layerIndex: number,
    value: string
  ) => void;
  handleObjectSymbol3DLayerAnchorPositionZChange: (
    layerIndex: number,
    value: string
  ) => void;
  handleCastShadowsChange: (layerIndex: number, value: boolean) => void;
  handleDepthChange: (layerIndex: number, value: string) => void;
  handleHeadingChange: (layerIndex: number, value: number) => void;
  handleHeightChange: (layerIndex: number, value: string) => void;
  handleObjectSymbol3DLayerMaterialColorChange: (
    layerIndex: number,
    value: string
  ) => void;
  handleObjectSymbol3DLayerResourceHrefChange: (
    layerIndex: number,
    value: string
  ) => void;
  handleObjectSymbol3DLayerResourcePrimitiveChange: (
    layerIndex: number,
    value: NonNullable<
      NonNullable<
        InstanceType<typeof ObjectSymbol3DLayer>["resource"]
      >["primitive"]
    >
  ) => void;
  handleRollChange: (layerIndex: number, value: number) => void;
  handleTiltChange: (layerIndex: number, value: number) => void;
  handleWidthChange: (layerIndex: number, value: string) => void;
}

function ObjectSymbol3DLayerForm({
  layerIndex,
  handleAnchorChange,
  handleObjectSymbol3DLayerAnchorPositionXChange,
  handleObjectSymbol3DLayerAnchorPositionYChange,
  handleObjectSymbol3DLayerAnchorPositionZChange,
  handleCastShadowsChange,
  handleDepthChange,
  handleHeadingChange,
  handleHeightChange,
  handleObjectSymbol3DLayerMaterialColorChange,
  handleObjectSymbol3DLayerResourceHrefChange,
  handleObjectSymbol3DLayerResourcePrimitiveChange,
  handleRollChange,
  handleTiltChange,
  handleWidthChange,
}: Props) {
  const [anchor, setAnchor] = useState("center");
  const [castShadows, setCastShadows] = useState(false);
  const [depth, setDepth] = useState("10");
  const [heading, setHeading] = useState(0);
  const [height, setHeight] = useState("10");
  const [roll, setRoll] = useState(0);
  const [tilt, setTilt] = useState(0);
  const [width, setWidth] = useState("10");

  return (
    <>
      <calcite-label layout="default" style={labelStyles}>
        anchor
        <calcite-select
          label={"anchor selection"}
          oncalciteSelectChange={(event) => {
            setAnchor(event.target.value);
            handleAnchorChange(
              layerIndex,
              event.target.value as InstanceType<
                typeof ObjectSymbol3DLayer
              >["anchor"]
            );
          }}
          value={anchor}
        >
          {OBJECT_SYMBOL_3D_LAYER_ANCHOR_OPTIONS.map((option, index) => (
            <calcite-option key={index}>{option}</calcite-option>
          ))}
        </calcite-select>
      </calcite-label>

      {anchor === "relative" && (
        <calcite-block
          style={blockStyles}
          collapsible
          heading={"anchorPosition"}
        >
          <ObjectSymbol3DLayerAnchorPositionForm
            layerIndex={layerIndex}
            handleObjectSymbol3DLayerAnchorPositionXChange={
              handleObjectSymbol3DLayerAnchorPositionXChange
            }
            handleObjectSymbol3DLayerAnchorPositionYChange={
              handleObjectSymbol3DLayerAnchorPositionYChange
            }
            handleObjectSymbol3DLayerAnchorPositionZChange={
              handleObjectSymbol3DLayerAnchorPositionZChange
            }
          ></ObjectSymbol3DLayerAnchorPositionForm>
        </calcite-block>
      )}

      <calcite-label layout="default" style={labelStyles}>
        castShadows
        <calcite-switch
          oncalciteSwitchChange={(event) => {
            setCastShadows(event.target.checked);
            handleCastShadowsChange(layerIndex, event.target.checked);
          }}
          value={castShadows}
        ></calcite-switch>
      </calcite-label>

      <calcite-label layout="default" style={labelStyles}>
        depth
        <calcite-input-number
          label={"depth input"}
          min={0}
          oncalciteInputNumberChange={(event) => {
            setDepth(event.target.value);
            handleDepthChange(layerIndex, event.target.value);
          }}
          value={depth}
        ></calcite-input-number>
      </calcite-label>

      <calcite-label layout="default" style={labelStyles}>
        height
        <calcite-input-number
          label={"height input"}
          min={0}
          oncalciteInputNumberChange={(event) => {
            setHeight(event.target.value);
            handleHeightChange(layerIndex, event.target.value);
          }}
          value={height}
        ></calcite-input-number>
      </calcite-label>

      <calcite-label layout="default" style={labelStyles}>
        width
        <calcite-input-number
          label={"width input"}
          min={0}
          oncalciteInputNumberChange={(event) => {
            setWidth(event.target.value);
            handleWidthChange(layerIndex, event.target.value);
          }}
          value={width}
        ></calcite-input-number>
      </calcite-label>

      <calcite-block style={blockStyles} collapsible heading={"material"}>
        <ObjectSymbol3DLayerMaterialForm
          layerIndex={layerIndex}
          handleColorChange={handleObjectSymbol3DLayerMaterialColorChange}
        ></ObjectSymbol3DLayerMaterialForm>
      </calcite-block>

      <calcite-block style={blockStyles} collapsible heading={"resource"}>
        <ObjectSymbol3DLayerResourceForm
          layerIndex={layerIndex}
          handleHrefChange={handleObjectSymbol3DLayerResourceHrefChange}
          handlePrimitiveChange={
            handleObjectSymbol3DLayerResourcePrimitiveChange
          }
        ></ObjectSymbol3DLayerResourceForm>
      </calcite-block>

      <calcite-label layout="default" style={labelStyles}>
        heading
        <calcite-slider
          labelHandles={true}
          labelTicks={true}
          max={360}
          min={0}
          oncalciteSliderChange={(event) => {
            setHeading(event.target.value as number);
            handleHeadingChange(layerIndex, event.target.value as number);
          }}
          step={1}
          ticks={90}
          value={heading}
        ></calcite-slider>
      </calcite-label>

      <calcite-label layout="default" style={labelStyles}>
        roll
        <calcite-slider
          labelHandles={true}
          labelTicks={true}
          max={360}
          min={0}
          oncalciteSliderChange={(event) => {
            setRoll(event.target.value as number);
            handleRollChange(layerIndex, event.target.value as number);
          }}
          step={1}
          ticks={90}
          value={roll}
        ></calcite-slider>
      </calcite-label>

      <calcite-label layout="default" style={labelStyles}>
        tilt
        <calcite-slider
          labelHandles={true}
          labelTicks={true}
          max={360}
          min={0}
          oncalciteSliderChange={(event) => {
            setTilt(event.target.value as number);
            handleTiltChange(layerIndex, event.target.value as number);
          }}
          step={1}
          ticks={90}
          value={tilt}
        ></calcite-slider>
      </calcite-label>
    </>
  );
}

export default ObjectSymbol3DLayerForm;
