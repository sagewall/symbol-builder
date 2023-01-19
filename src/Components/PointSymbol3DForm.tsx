import Collection from "@arcgis/core/core/Collection";
import { CalciteBlock } from "@esri/calcite-components-react";
import "@esri/calcite-components/dist/components/calcite-block";
import React from "react";
import { blockStyles } from "./lib/styles";
import {
  IconSymbol3DLayerAnchorOption,
  IconSymbol3DLayerResourcePrimitiveOption,
  ObjectSymbol3DLayerAnchorOption,
  ObjectSymbol3DLayerResourcePrimitiveOption,
} from "./lib/types";
import LineCallout3DForm from "./LineCallout3DForm";
import Symbol3DLayerCollectionForm from "./Symbol3DLayerCollectionForm";
import Symbol3DVerticalOffsetForm from "./Symbol3DVerticalOffsetForm";

interface Props {
  handleCalloutColorChange: (value: string) => void;
  handleCalloutSizeChange: (value: string) => void;
  handleIconSymbol3DLayerAnchorChange: (
    layerIndex: number,
    value: IconSymbol3DLayerAnchorOption
  ) => void;
  handleIconSymbol3DLayerAnchorPositionXChange: (
    layerIndex: number,
    value: string
  ) => void;
  handleIconSymbol3DLayerAnchorPositionYChange: (
    layerIndex: number,
    value: string
  ) => void;
  handleIconSymbol3DLayerMaterialColorChange: (
    layerIndex: number,
    value: string
  ) => void;
  handleIconSymbol3DLayerOutlineColorChange: (
    layerIndex: number,
    value: string
  ) => void;
  handleIconSymbol3DLayerOutlineSizeChange: (
    layerIndex: number,
    value: string
  ) => void;
  handleIconSymbol3DLayerResourceHrefChange: (
    layerIndex: number,
    value: string
  ) => void;
  handleIconSymbol3DLayerResourcePrimitiveChange: (
    layerIndex: number,
    value: IconSymbol3DLayerResourcePrimitiveOption
  ) => void;
  handleIconSymbol3DLayerSizeChange: (
    layerIndex: number,
    value: string
  ) => void;
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
  handleObjectSymbol3DLayerDepthChange: (
    layerIndex: number,
    value: string
  ) => void;
  handleObjectSymbol3DLayerHeadingChange: (
    layerIndex: number,
    value: number
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
  handleVerticalOffsetMaxWorldLengthChange: (value: string) => void;
  handleVerticalOffsetMinWorldLengthChange: (value: string) => void;
  handleVerticalOffsetScreenLengthChange: (value: string) => void;
  updateSymbolLayers: (newSymbolLayers: Collection) => void;
}

const PointSymbol3DForm = ({
  handleCalloutColorChange,
  handleCalloutSizeChange,
  handleIconSymbol3DLayerAnchorChange,
  handleIconSymbol3DLayerAnchorPositionXChange,
  handleIconSymbol3DLayerAnchorPositionYChange,
  handleIconSymbol3DLayerMaterialColorChange,
  handleIconSymbol3DLayerOutlineColorChange,
  handleIconSymbol3DLayerOutlineSizeChange,
  handleIconSymbol3DLayerResourceHrefChange,
  handleIconSymbol3DLayerResourcePrimitiveChange,
  handleIconSymbol3DLayerSizeChange,
  handleObjectSymbol3DLayerAnchorChange,
  handleObjectSymbol3DLayerAnchorPositionXChange,
  handleObjectSymbol3DLayerAnchorPositionYChange,
  handleObjectSymbol3DLayerAnchorPositionZChange,
  handleObjectSymbol3DLayerCastShadowsChange,
  handleObjectSymbol3DLayerDepthChange,
  handleObjectSymbol3DLayerHeadingChange,
  handleObjectSymbol3DLayerMaterialColorChange,
  handleObjectSymbol3DLayerResourceHrefChange,
  handleObjectSymbol3DLayerResourcePrimitiveChange,
  handleVerticalOffsetMaxWorldLengthChange,
  handleVerticalOffsetMinWorldLengthChange,
  handleVerticalOffsetScreenLengthChange,
  updateSymbolLayers,
}: Props) => {
  return (
    <React.Fragment>
      <CalciteBlock style={blockStyles} collapsible heading={"callout"}>
        <LineCallout3DForm
          handleColorChange={handleCalloutColorChange}
          handleSizeChange={handleCalloutSizeChange}
        ></LineCallout3DForm>
      </CalciteBlock>
      <Symbol3DLayerCollectionForm
        handleIconSymbol3DLayerAnchorChange={
          handleIconSymbol3DLayerAnchorChange
        }
        handleIconSymbol3DLayerAnchorPositionXChange={
          handleIconSymbol3DLayerAnchorPositionXChange
        }
        handleIconSymbol3DLayerAnchorPositionYChange={
          handleIconSymbol3DLayerAnchorPositionYChange
        }
        handleIconSymbol3DLayerMaterialColorChange={
          handleIconSymbol3DLayerMaterialColorChange
        }
        handleIconSymbol3DLayerOutlineColorChange={
          handleIconSymbol3DLayerOutlineColorChange
        }
        handleIconSymbol3DLayerOutlineSizeChange={
          handleIconSymbol3DLayerOutlineSizeChange
        }
        handleIconSymbol3DLayerResourceHrefChange={
          handleIconSymbol3DLayerResourceHrefChange
        }
        handleIconSymbol3DLayerResourcePrimitiveChange={
          handleIconSymbol3DLayerResourcePrimitiveChange
        }
        handleIconSymbol3DLayerSizeChange={handleIconSymbol3DLayerSizeChange}
        handleObjectSymbol3DLayerAnchorChange={
          handleObjectSymbol3DLayerAnchorChange
        }
        handleObjectSymbol3DLayerAnchorPositionXChange={
          handleObjectSymbol3DLayerAnchorPositionXChange
        }
        handleObjectSymbol3DLayerAnchorPositionYChange={
          handleObjectSymbol3DLayerAnchorPositionYChange
        }
        handleObjectSymbol3DLayerAnchorPositionZChange={
          handleObjectSymbol3DLayerAnchorPositionZChange
        }
        handleObjectSymbol3DLayerCastShadowsChange={
          handleObjectSymbol3DLayerCastShadowsChange
        }
        handleObjectSymbol3DLayerDepthChange={
          handleObjectSymbol3DLayerDepthChange
        }
        handleObjectSymbol3DLayerHeadingChange={
          handleObjectSymbol3DLayerHeadingChange
        }
        handleObjectSymbol3DLayerMaterialColorChange={
          handleObjectSymbol3DLayerMaterialColorChange
        }
        handleObjectSymbol3DLayerResourceHrefChange={
          handleObjectSymbol3DLayerResourceHrefChange
        }
        handleObjectSymbol3DLayerResourcePrimitiveChange={
          handleObjectSymbol3DLayerResourcePrimitiveChange
        }
        updateSymbolLayers={updateSymbolLayers}
      ></Symbol3DLayerCollectionForm>
      <CalciteBlock style={blockStyles} collapsible heading={"verticalOffset"}>
        <Symbol3DVerticalOffsetForm
          handleMaxWorldLengthChange={handleVerticalOffsetMaxWorldLengthChange}
          handleMinWorldLengthChange={handleVerticalOffsetMinWorldLengthChange}
          handleScreenLengthChange={handleVerticalOffsetScreenLengthChange}
        ></Symbol3DVerticalOffsetForm>
      </CalciteBlock>
    </React.Fragment>
  );
};

export default PointSymbol3DForm;
