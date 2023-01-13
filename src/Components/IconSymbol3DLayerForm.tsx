import {
  CalciteLabel,
  CalciteOption,
  CalciteSelect,
} from "@esri/calcite-components-react";
import "@esri/calcite-components/dist/components/calcite-label";
import "@esri/calcite-components/dist/components/calcite-option";
import "@esri/calcite-components/dist/components/calcite-select";
import React, { useState } from "react";
import { labelStyles } from "../lib/styles";
import { AnchorOption } from "../lib/types";
import IconSymbol3DLayerAnchorPositionForm from "./IconSymbol3DLayerAnchorPositionForm";
import IconSymbol3DLayerMaterialForm from "./IconSymbol3DLayerMaterialForm";

interface Props {
  layerIndex: number;
  handleIconSymbol3DLayerAnchorChange: (
    layerIndex: number,
    value: AnchorOption
  ) => void;
  handleIconSymbol3DLayerAnchorPositionXChange: (
    layerIndex: number,
    value: AnchorOption
  ) => void;
  handleIconSymbol3DLayerAnchorPositionYChange: (
    layerIndex: number,
    value: string
  ) => void;
  handleIconSymbol3DLayerMaterialColorChange: (
    layerIndex: number,
    value: string
  ) => void;
}

const IconSymbol3DLayerForm = ({
  layerIndex,
  handleIconSymbol3DLayerAnchorChange,
  handleIconSymbol3DLayerAnchorPositionXChange,
  handleIconSymbol3DLayerAnchorPositionYChange,
  handleIconSymbol3DLayerMaterialColorChange,
}: Props) => {
  const anchorOptions = [
    "center",
    "left",
    "right",
    "top",
    "bottom",
    "top-left",
    "top-right",
    "bottom-left",
    "bottom-right",
    "relative",
  ];

  const [anchor, setAnchor] = useState("center");

  return (
    <React.Fragment>
      <CalciteLabel layout="default" style={labelStyles}>
        horizontalAlignment
        <CalciteSelect
          label={"horizontalAlignment selection"}
          onCalciteSelectChange={(event) => {
            setAnchor(event.target.value);
            handleIconSymbol3DLayerAnchorChange(
              layerIndex,
              event.target.value as AnchorOption
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
        <IconSymbol3DLayerAnchorPositionForm
          layerIndex={layerIndex}
          handleIconSymbol3DLayerAnchorPositionXChange={
            handleIconSymbol3DLayerAnchorPositionXChange
          }
          handleIconSymbol3DLayerAnchorPositionYChange={
            handleIconSymbol3DLayerAnchorPositionYChange
          }
        ></IconSymbol3DLayerAnchorPositionForm>
      )}

      <IconSymbol3DLayerMaterialForm
        layerIndex={layerIndex}
        handleColorChange={handleIconSymbol3DLayerMaterialColorChange}
      ></IconSymbol3DLayerMaterialForm>
    </React.Fragment>
  );
};

export default IconSymbol3DLayerForm;
