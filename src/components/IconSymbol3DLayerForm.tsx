import type IconSymbol3DLayer from "@arcgis/core/symbols/IconSymbol3DLayer";
import React, { useState } from "react";
import IconSymbol3DLayerAnchorPositionForm from "./IconSymbol3DLayerAnchorPositionForm";
import IconSymbol3DLayerMaterialForm from "./IconSymbol3DLayerMaterialForm";
import IconSymbol3DLayerOutlineForm from "./IconSymbol3DLayerOutlineForm";
import IconSymbol3DLayerResourceForm from "./IconSymbol3DLayerResourceForm";
import { ICON_SYMBOL_3D_LAYER_ANCHOR_OPTIONS } from "./lib/constants";
import { blockStyles, labelStyles } from "./lib/styles";

interface Props {
  layerIndex: number;
  handleIconSymbol3DLayerAnchorChange: (
    layerIndex: number,
    value: InstanceType<typeof IconSymbol3DLayer>["anchor"]
  ) => void;
  handleIconSymbol3DLayerAnchorPositionXChange: (layerIndex: number, value: string) => void;
  handleIconSymbol3DLayerAngleChange: (layerIndex: number, value: number) => void;
  handleIconSymbol3DLayerAnchorPositionYChange: (layerIndex: number, value: string) => void;
  handleIconSymbol3DLayerMaterialColorChange: (layerIndex: number, value: string) => void;
  handleIconSymbol3DLayerOutlineColorChange: (layerIndex: number, value: string) => void;
  handleIconSymbol3DLayerOutlineSizeChange: (layerIndex: number, value: string) => void;
  handleIconSymbol3DLayerResourceHrefChange: (layerIndex: number, value: string) => void;
  handleIconSymbol3DLayerResourcePrimitiveChange: (
    layerIndex: number,
    value: InstanceType<typeof IconSymbol3DLayer>["resource"]["primitive"]
  ) => void;
  handleSizeChange: (layerIndex: number, value: string) => void;
}

const IconSymbol3DLayerForm = ({
  layerIndex,
  handleIconSymbol3DLayerAnchorChange,
  handleIconSymbol3DLayerAnchorPositionXChange,
  handleIconSymbol3DLayerAngleChange,
  handleIconSymbol3DLayerAnchorPositionYChange,
  handleIconSymbol3DLayerMaterialColorChange,
  handleIconSymbol3DLayerOutlineColorChange,
  handleIconSymbol3DLayerOutlineSizeChange,
  handleIconSymbol3DLayerResourceHrefChange,
  handleIconSymbol3DLayerResourcePrimitiveChange,
  handleSizeChange
}: Props) => {
  const [anchor, setAnchor] = useState("center");
  const [angle, setAngle] = useState(0);
  const [size, setSize] = useState("12");

  return (
    <React.Fragment>
      <calcite-label layout="default" style={labelStyles}>
        anchor
        <calcite-select
          label={"anchor selection"}
          oncalciteSelectChange={(event) => {
            setAnchor(event.target.value);
            handleIconSymbol3DLayerAnchorChange(
              layerIndex,
              event.target.value as InstanceType<typeof IconSymbol3DLayer>["anchor"]
            );
          }}
          value={anchor}
        >
          {ICON_SYMBOL_3D_LAYER_ANCHOR_OPTIONS.map((option, index) => (
            <calcite-option key={index}>{option}</calcite-option>
          ))}
        </calcite-select>
      </calcite-label>

      {anchor === "relative" && (
        <calcite-block style={blockStyles} collapsible heading={"anchorPosition"}>
          <IconSymbol3DLayerAnchorPositionForm
            layerIndex={layerIndex}
            handleIconSymbol3DLayerAnchorPositionXChange={
              handleIconSymbol3DLayerAnchorPositionXChange
            }
            handleIconSymbol3DLayerAnchorPositionYChange={
              handleIconSymbol3DLayerAnchorPositionYChange
            }
          ></IconSymbol3DLayerAnchorPositionForm>
        </calcite-block>
      )}

      <calcite-label layout="default" style={labelStyles}>
        angle
        <calcite-slider
          labelHandles={true}
          labelTicks={true}
          max={360}
          min={0}
          oncalciteSliderChange={(event) => {
            setAngle(event.target.value as number);
            handleIconSymbol3DLayerAngleChange(layerIndex, event.target.value as number);
          }}
          step={1}
          ticks={180}
          value={angle}
        ></calcite-slider>
      </calcite-label>

      <calcite-block style={blockStyles} collapsible heading={"material"}>
        <IconSymbol3DLayerMaterialForm
          layerIndex={layerIndex}
          handleColorChange={handleIconSymbol3DLayerMaterialColorChange}
        ></IconSymbol3DLayerMaterialForm>
      </calcite-block>

      <calcite-block style={blockStyles} collapsible heading={"outline"}>
        <IconSymbol3DLayerOutlineForm
          layerIndex={layerIndex}
          handleColorChange={handleIconSymbol3DLayerOutlineColorChange}
          handleSizeChange={handleIconSymbol3DLayerOutlineSizeChange}
        ></IconSymbol3DLayerOutlineForm>
      </calcite-block>

      <calcite-block style={blockStyles} collapsible heading={"resource"}>
        <IconSymbol3DLayerResourceForm
          layerIndex={layerIndex}
          handleHrefChange={handleIconSymbol3DLayerResourceHrefChange}
          handlePrimitiveChange={handleIconSymbol3DLayerResourcePrimitiveChange}
        ></IconSymbol3DLayerResourceForm>
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
    </React.Fragment>
  );
};

export default IconSymbol3DLayerForm;
