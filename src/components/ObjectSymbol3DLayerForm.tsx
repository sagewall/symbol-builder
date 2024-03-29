import type ObjectSymbol3DLayer from "@arcgis/core/symbols/ObjectSymbol3DLayer";
import {
  CalciteBlock,
  CalciteInputNumber,
  CalciteLabel,
  CalciteOption,
  CalciteSelect,
  CalciteSlider,
  CalciteSwitch
} from "@esri/calcite-components-react";
import React, { useState } from "react";
import ObjectSymbol3DLayerAnchorPositionForm from "./ObjectSymbol3DLayerAnchorPositionForm";
import ObjectSymbol3DLayerMaterialForm from "./ObjectSymbol3DLayerMaterialForm";
import ObjectSymbol3DLayerResourceForm from "./ObjectSymbol3DLayerResourceForm";
import { OBJECT_SYMBOL_3D_LAYER_ANCHOR_OPTIONS } from "./lib/constants";
import { blockStyles, labelStyles } from "./lib/styles";

interface Props {
  layerIndex: number;
  handleAnchorChange: (
    layerIndex: number,
    value: InstanceType<typeof ObjectSymbol3DLayer>["anchor"]
  ) => void;
  handleObjectSymbol3DLayerAnchorPositionXChange: (layerIndex: number, value: string) => void;
  handleObjectSymbol3DLayerAnchorPositionYChange: (layerIndex: number, value: string) => void;
  handleObjectSymbol3DLayerAnchorPositionZChange: (layerIndex: number, value: string) => void;
  handleCastShadowsChange: (layerIndex: number, value: boolean) => void;
  handleDepthChange: (layerIndex: number, value: string) => void;
  handleHeadingChange: (layerIndex: number, value: number) => void;
  handleHeightChange: (layerIndex: number, value: string) => void;
  handleObjectSymbol3DLayerMaterialColorChange: (layerIndex: number, value: string) => void;
  handleObjectSymbol3DLayerResourceHrefChange: (layerIndex: number, value: string) => void;
  handleObjectSymbol3DLayerResourcePrimitiveChange: (
    layerIndex: number,
    value: InstanceType<typeof ObjectSymbol3DLayer>["resource"]["primitive"]
  ) => void;
  handleRollChange: (layerIndex: number, value: number) => void;
  handleTiltChange: (layerIndex: number, value: number) => void;
  handleWidthChange: (layerIndex: number, value: string) => void;
}

const ObjectSymbol3DLayerForm = ({
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
  handleWidthChange
}: Props) => {
  const [anchor, setAnchor] = useState("center");
  const [castShadows, setCastShadows] = useState(false);
  const [depth, setDepth] = useState("10");
  const [heading, setHeading] = useState(0);
  const [height, setHeight] = useState("10");
  const [roll, setRoll] = useState(0);
  const [tilt, setTilt] = useState(0);
  const [width, setWidth] = useState("10");

  return (
    <React.Fragment>
      <CalciteLabel layout="default" style={labelStyles}>
        anchor
        <CalciteSelect
          label={"anchor selection"}
          onCalciteSelectChange={(event) => {
            setAnchor(event.target.value);
            handleAnchorChange(
              layerIndex,
              event.target.value as InstanceType<typeof ObjectSymbol3DLayer>["anchor"]
            );
          }}
          value={anchor}
        >
          {OBJECT_SYMBOL_3D_LAYER_ANCHOR_OPTIONS.map((option, index) => (
            <CalciteOption key={index}>{option}</CalciteOption>
          ))}
        </CalciteSelect>
      </CalciteLabel>

      {anchor === "relative" && (
        <CalciteBlock style={blockStyles} collapsible heading={"anchorPosition"}>
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
        </CalciteBlock>
      )}

      <CalciteLabel layout="default" style={labelStyles}>
        castShadows
        <CalciteSwitch
          onCalciteSwitchChange={(event) => {
            setCastShadows(event.target.checked);
            handleCastShadowsChange(layerIndex, event.target.checked);
          }}
          value={castShadows}
        ></CalciteSwitch>
      </CalciteLabel>

      <CalciteLabel layout="default" style={labelStyles}>
        depth
        <CalciteInputNumber
          label={"depth input"}
          min={0}
          onCalciteInputNumberChange={(event) => {
            setDepth(event.target.value);
            handleDepthChange(layerIndex, event.target.value);
          }}
          value={depth}
        ></CalciteInputNumber>
      </CalciteLabel>

      <CalciteLabel layout="default" style={labelStyles}>
        height
        <CalciteInputNumber
          label={"height input"}
          min={0}
          onCalciteInputNumberChange={(event) => {
            setHeight(event.target.value);
            handleHeightChange(layerIndex, event.target.value);
          }}
          value={height}
        ></CalciteInputNumber>
      </CalciteLabel>

      <CalciteLabel layout="default" style={labelStyles}>
        width
        <CalciteInputNumber
          label={"width input"}
          min={0}
          onCalciteInputNumberChange={(event) => {
            setWidth(event.target.value);
            handleWidthChange(layerIndex, event.target.value);
          }}
          value={width}
        ></CalciteInputNumber>
      </CalciteLabel>

      <CalciteBlock style={blockStyles} collapsible heading={"material"}>
        <ObjectSymbol3DLayerMaterialForm
          layerIndex={layerIndex}
          handleColorChange={handleObjectSymbol3DLayerMaterialColorChange}
        ></ObjectSymbol3DLayerMaterialForm>
      </CalciteBlock>

      <CalciteBlock style={blockStyles} collapsible heading={"resource"}>
        <ObjectSymbol3DLayerResourceForm
          layerIndex={layerIndex}
          handleHrefChange={handleObjectSymbol3DLayerResourceHrefChange}
          handlePrimitiveChange={handleObjectSymbol3DLayerResourcePrimitiveChange}
        ></ObjectSymbol3DLayerResourceForm>
      </CalciteBlock>

      <CalciteLabel layout="default" style={labelStyles}>
        heading
        <CalciteSlider
          labelHandles={true}
          labelTicks={true}
          max={360}
          min={0}
          onCalciteSliderChange={(event) => {
            setHeading(event.target.value as number);
            handleHeadingChange(layerIndex, event.target.value as number);
          }}
          step={1}
          ticks={90}
          value={heading}
        ></CalciteSlider>
      </CalciteLabel>

      <CalciteLabel layout="default" style={labelStyles}>
        roll
        <CalciteSlider
          labelHandles={true}
          labelTicks={true}
          max={360}
          min={0}
          onCalciteSliderChange={(event) => {
            setRoll(event.target.value as number);
            handleRollChange(layerIndex, event.target.value as number);
          }}
          step={1}
          ticks={90}
          value={roll}
        ></CalciteSlider>
      </CalciteLabel>

      <CalciteLabel layout="default" style={labelStyles}>
        tilt
        <CalciteSlider
          labelHandles={true}
          labelTicks={true}
          max={360}
          min={0}
          onCalciteSliderChange={(event) => {
            setTilt(event.target.value as number);
            handleTiltChange(layerIndex, event.target.value as number);
          }}
          step={1}
          ticks={90}
          value={tilt}
        ></CalciteSlider>
      </CalciteLabel>
    </React.Fragment>
  );
};

export default ObjectSymbol3DLayerForm;
