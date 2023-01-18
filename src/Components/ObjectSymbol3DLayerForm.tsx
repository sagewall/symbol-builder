import {
  CalciteLabel,
  CalciteOption,
  CalciteSelect,
  CalciteSwitch,
} from "@esri/calcite-components-react";
import "@esri/calcite-components/dist/components/calcite-label";
import "@esri/calcite-components/dist/components/calcite-option";
import "@esri/calcite-components/dist/components/calcite-select";
import React, { useState } from "react";
import { labelStyles } from "../lib/styles";
import {
  ObjectSymbol3DLayerAnchorOption,
  ObjectSymbol3DLayerResourcePrimitiveOption,
} from "../lib/types";
import ObjectSymbol3DLayerAnchorPositionForm from "./ObjectSymbol3DLayerAnchorPositionForm";
import ObjectSymbol3DLayerMaterialForm from "./ObjectSymbol3DLayerMaterialForm";
import ObjectSymbol3DLayerResourceForm from "./ObjectSymbol3DLayerResourceForm";

interface Props {
  layerIndex: number;
  handleObjectSymbol3DLayerAnchorChange: (
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
  handleObjectSymbol3DLayerCastShadowsChange: (
    layerIndex: number,
    value: boolean
  ) => void;
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
}

const ObjectSymbol3DLayerForm = ({
  layerIndex,
  handleObjectSymbol3DLayerAnchorChange,
  handleObjectSymbol3DLayerAnchorPositionXChange,
  handleObjectSymbol3DLayerAnchorPositionYChange,
  handleObjectSymbol3DLayerAnchorPositionZChange,
  handleObjectSymbol3DLayerCastShadowsChange,
  handleObjectSymbol3DLayerMaterialColorChange,
  handleObjectSymbol3DLayerResourceHrefChange,
  handleObjectSymbol3DLayerResourcePrimitiveChange,
}: Props) => {
  const anchorOptions = ["center", "top", "bottom", "origin", "relative"];

  const [anchor, setAnchor] = useState("center");
  const [castShadows, setCastShadows] = useState(false);

  return (
    <React.Fragment>
      <CalciteLabel layout="default" style={labelStyles}>
        anchor
        <CalciteSelect
          label={"anchor selection"}
          onCalciteSelectChange={(event) => {
            setAnchor(event.target.value);
            handleObjectSymbol3DLayerAnchorChange(
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
            handleObjectSymbol3DLayerCastShadowsChange(
              layerIndex,
              event.target.checked
            );
          }}
          value={castShadows}
        ></CalciteSwitch>
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
    </React.Fragment>
  );
};

export default ObjectSymbol3DLayerForm;
