import {
  CalciteInputNumber,
  CalciteLabel,
  CalciteOption,
  CalciteSelect,
  CalciteSlider,
  CalciteSwitch,
} from "@esri/calcite-components-react";
import "@esri/calcite-components/dist/components/calcite-label";
import "@esri/calcite-components/dist/components/calcite-option";
import "@esri/calcite-components/dist/components/calcite-select";
import React, { useState } from "react";
import { labelStyles } from "./lib/styles";
import {
  ObjectSymbol3DLayerAnchorOption,
  ObjectSymbol3DLayerResourcePrimitiveOption,
} from "./lib/types";
import ObjectSymbol3DLayerAnchorPositionForm from "./ObjectSymbol3DLayerAnchorPositionForm";
import ObjectSymbol3DLayerMaterialForm from "./ObjectSymbol3DLayerMaterialForm";
import ObjectSymbol3DLayerResourceForm from "./ObjectSymbol3DLayerResourceForm";

interface Props {
  layerIndex: number;
  handleAnchorChange: (
    layerIndex: number,
    value: ObjectSymbol3DLayerAnchorOption
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
    value: ObjectSymbol3DLayerResourcePrimitiveOption
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
  handleObjectSymbol3DLayerMaterialColorChange,
  handleObjectSymbol3DLayerResourceHrefChange,
  handleObjectSymbol3DLayerResourcePrimitiveChange,
  handleRollChange,
  handleTiltChange,
  handleWidthChange,
}: Props) => {
  const anchorOptions = ["center", "top", "bottom", "origin", "relative"];

  const [anchor, setAnchor] = useState("center");
  const [castShadows, setCastShadows] = useState(false);
  const [depth, setDepth] = useState("10");
  const [heading, setHeading] = useState(0);
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
              event.target.value as ObjectSymbol3DLayerAnchorOption
            );
          }}
          value={anchor}
        >
          {anchorOptions.map((option, index) => (
            <CalciteOption key={index}>{option}</CalciteOption>
          ))}
        </CalciteSelect>
      </CalciteLabel>

      {anchor === "relative" && (
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

      <ObjectSymbol3DLayerMaterialForm
        layerIndex={layerIndex}
        handleColorChange={handleObjectSymbol3DLayerMaterialColorChange}
      ></ObjectSymbol3DLayerMaterialForm>

      <ObjectSymbol3DLayerResourceForm
        layerIndex={layerIndex}
        handleHrefChange={handleObjectSymbol3DLayerResourceHrefChange}
        handlePrimitiveChange={handleObjectSymbol3DLayerResourcePrimitiveChange}
      ></ObjectSymbol3DLayerResourceForm>

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
    </React.Fragment>
  );
};

export default ObjectSymbol3DLayerForm;
