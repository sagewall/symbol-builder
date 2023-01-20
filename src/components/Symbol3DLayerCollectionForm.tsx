import Color from "@arcgis/core/Color";
import Collection from "@arcgis/core/core/Collection";
import Font from "@arcgis/core/symbols/Font";
import IconSymbol3DLayer from "@arcgis/core/symbols/IconSymbol3DLayer";
import ObjectSymbol3DLayer from "@arcgis/core/symbols/ObjectSymbol3DLayer";
import TextSymbol3DLayer from "@arcgis/core/symbols/TextSymbol3DLayer";
import { CalciteAction, CalciteBlock } from "@esri/calcite-components-react";
import "@esri/calcite-components/dist/components/calcite-action";
import "@esri/calcite-components/dist/components/calcite-block";
import React, { useState } from "react";
import IconSymbol3DLayerForm from "./IconSymbol3DLayerForm";
import { blockStyles } from "./lib/styles";
import {
  FontDecoration,
  FontStyle,
  FontWeight,
  HorizontalAlignment,
  IconSymbol3DLayerAnchorOption,
  IconSymbol3DLayerResourcePrimitiveOption,
  ObjectSymbol3DLayerAnchorOption,
  ObjectSymbol3DLayerResourcePrimitiveOption,
  VerticalAlignment,
} from "./lib/types";
import ObjectSymbol3DLayerForm from "./ObjectSymbol3DLayerForm";
import TextSymbol3DLayerForm from "./TextSymbol3DLayerForm";

interface PageProps {
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
  handleObjectSymbol3DLayerRollChange: (
    layerIndex: number,
    value: number
  ) => void;
  handleObjectSymbol3DLayerTiltChange: (
    layerIndex: number,
    value: number
  ) => void;
  handleObjectSymbol3DLayerWidthChange: (
    layerIndex: number,
    value: string
  ) => void;
  handleTextSymbol3DLayerBackgroundColorChange: (
    layerIndex: number,
    value: string
  ) => void;
  handleTextSymbol3DLayerFontDecorationChange: (
    layerIndex: number,
    value: FontDecoration
  ) => void;
  handleTextSymbol3DLayerFontFamilyChange: (
    layerIndex: number,
    value: string
  ) => void;
  handleTextSymbol3DLayerFontSizeChange: (
    layerIndex: number,
    value: string
  ) => void;
  handleTextSymbol3DLayerFontStyleChange: (
    layerIndex: number,
    value: FontStyle | undefined
  ) => void;
  handleTextSymbol3DLayerFontWeightChange: (
    layerIndex: number,
    value: FontWeight | undefined
  ) => void;
  handleTextSymbol3DLayerHorizontalAlignmentChange: (
    layerIndex: number,
    value: HorizontalAlignment
  ) => void;
  handleTextSymbol3DLayerLineHeightChange: (
    layerIndex: number,
    value: string
  ) => void;
  handleTextSymbol3DLayerTextChange: (
    layerIndex: number,
    value: string
  ) => void;
  handleTextSymbol3DLayerVerticalAlignmentChange: (
    layerIndex: number,
    value: VerticalAlignment
  ) => void;
  updateSymbolLayers: (newSymbolLayers: Collection) => void;
}
const Symbol3DLayerCollectionForm = ({
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
  handleObjectSymbol3DLayerRollChange,
  handleObjectSymbol3DLayerTiltChange,
  handleObjectSymbol3DLayerWidthChange,
  handleTextSymbol3DLayerBackgroundColorChange,
  handleTextSymbol3DLayerFontDecorationChange,
  handleTextSymbol3DLayerFontFamilyChange,
  handleTextSymbol3DLayerFontSizeChange,
  handleTextSymbol3DLayerFontStyleChange,
  handleTextSymbol3DLayerFontWeightChange,
  handleTextSymbol3DLayerHorizontalAlignmentChange,
  handleTextSymbol3DLayerLineHeightChange,
  handleTextSymbol3DLayerTextChange,
  handleTextSymbol3DLayerVerticalAlignmentChange,
  updateSymbolLayers,
}: PageProps) => {
  const createNewIconSymbol3DLayer = (): IconSymbol3DLayer => {
    const newIconSymbol3DLayer = new IconSymbol3DLayer();
    newIconSymbol3DLayer.anchor = "center";
    newIconSymbol3DLayer.anchorPosition = { x: 0, y: 0 };
    newIconSymbol3DLayer.material = { color: new Color("red") };
    newIconSymbol3DLayer.outline = { color: new Color("black"), size: 1.5 };
    newIconSymbol3DLayer.resource = { href: undefined, primitive: "circle" };
    newIconSymbol3DLayer.size = 12;
    return newIconSymbol3DLayer;
  };

  const createNewObjectSymbol3DLayer = (): ObjectSymbol3DLayer => {
    const newObjectSymbol3DLayer = new ObjectSymbol3DLayer();
    newObjectSymbol3DLayer.anchor = "center";
    newObjectSymbol3DLayer.anchorPosition = { x: 0, y: 0, z: 0 };
    newObjectSymbol3DLayer.castShadows = false;
    newObjectSymbol3DLayer.material = { color: new Color("red") };
    newObjectSymbol3DLayer.resource = { href: undefined, primitive: "sphere" };
    return newObjectSymbol3DLayer;
  };

  const createNewTextSymbol3DLayer = (): TextSymbol3DLayer => {
    const newTextSymbol3DLayer = new TextSymbol3DLayer();
    newTextSymbol3DLayer.background = { color: new Color("#aaaaaa") };
    newTextSymbol3DLayer.font = new Font();
    newTextSymbol3DLayer.horizontalAlignment = "center";
    newTextSymbol3DLayer.lineHeight = 1;
    newTextSymbol3DLayer.material = { color: new Color("#ffffff") };
    newTextSymbol3DLayer.text = "Hello World!";
    newTextSymbol3DLayer.verticalAlignment = "baseline";
    return newTextSymbol3DLayer;
  };

  const [symbolLayers, setSymbolLayers] = useState(new Collection());

  const addIconSymbol3DLayer = () => {
    const newSymbolLayers = symbolLayers.clone();
    const iconSymbol3DLayer = createNewIconSymbol3DLayer();
    newSymbolLayers.add(iconSymbol3DLayer);
    setSymbolLayers(newSymbolLayers);
    updateSymbolLayers(newSymbolLayers);
  };

  const addObjectSymbol3DLayer = () => {
    const newSymbolLayers = symbolLayers.clone();
    const objectSymbol3DLayer = createNewObjectSymbol3DLayer();
    newSymbolLayers.add(objectSymbol3DLayer);
    setSymbolLayers(newSymbolLayers);
    updateSymbolLayers(newSymbolLayers);
  };

  const addTextSymbol3DLayer = () => {
    const newSymbolLayers = symbolLayers.clone();
    const textSymbol3DLayer = createNewTextSymbol3DLayer();
    newSymbolLayers.add(textSymbol3DLayer);
    setSymbolLayers(newSymbolLayers);
    updateSymbolLayers(newSymbolLayers);
  };

  const deleteSymbol3DLayer = (index: number) => {
    const newSymbolLayers = symbolLayers.clone();
    newSymbolLayers.removeAt(index);
    setSymbolLayers(newSymbolLayers);
    updateSymbolLayers(newSymbolLayers);
  };

  const handleSymbolLayersIconSymbol3DLayerAnchorChange = (
    layerIndex: number,
    value: IconSymbol3DLayerAnchorOption
  ) => {
    const newSymbolLayers = symbolLayers.clone();
    const symbolLayer: IconSymbol3DLayer =
      newSymbolLayers.getItemAt(layerIndex);
    symbolLayer.anchor = value;
    setSymbolLayers(newSymbolLayers);
    handleIconSymbol3DLayerAnchorChange(layerIndex, value);
  };

  const handleSymbolLayersIconSymbol3DLayerAnchorPositionXChange = (
    layerIndex: number,
    value: string
  ) => {
    const newSymbolLayers = symbolLayers.clone();
    const symbolLayer: IconSymbol3DLayer =
      newSymbolLayers.getItemAt(layerIndex);
    symbolLayer.anchorPosition.x = Number(value);
    setSymbolLayers(newSymbolLayers);
    handleIconSymbol3DLayerAnchorPositionXChange(layerIndex, value);
  };

  const handleSymbolLayersIconSymbol3DLayerAnchorPositionYChange = (
    layerIndex: number,
    value: string
  ) => {
    const newSymbolLayers = symbolLayers.clone();
    const symbolLayer: IconSymbol3DLayer =
      newSymbolLayers.getItemAt(layerIndex);
    symbolLayer.anchorPosition.y = Number(value);
    setSymbolLayers(newSymbolLayers);
    handleIconSymbol3DLayerAnchorPositionYChange(layerIndex, value);
  };

  const handleSymbolLayersIconSymbol3DLayerMaterialColorChange = (
    layerIndex: number,
    value: string
  ) => {
    const newSymbolLayers = symbolLayers.clone();
    const symbolLayer: IconSymbol3DLayer =
      newSymbolLayers.getItemAt(layerIndex);
    symbolLayer.material.color = new Color(value);
    setSymbolLayers(newSymbolLayers);
    handleIconSymbol3DLayerMaterialColorChange(layerIndex, value);
  };

  const handleSymbolLayersIconSymbol3DLayerOutlineColorChange = (
    layerIndex: number,
    value: string
  ) => {
    const newSymbolLayers = symbolLayers.clone();
    const symbolLayer: IconSymbol3DLayer =
      newSymbolLayers.getItemAt(layerIndex);
    symbolLayer.outline.color = new Color(value);
    setSymbolLayers(newSymbolLayers);
    handleIconSymbol3DLayerOutlineColorChange(layerIndex, value);
  };

  const handleSymbolLayersIconSymbol3DLayerOutlineSizeChange = (
    layerIndex: number,
    value: string
  ) => {
    const newSymbolLayers = symbolLayers.clone();
    const symbolLayer: IconSymbol3DLayer =
      newSymbolLayers.getItemAt(layerIndex);
    symbolLayer.outline.size = Number(value);
    setSymbolLayers(newSymbolLayers);
    handleIconSymbol3DLayerOutlineSizeChange(layerIndex, value);
  };

  const handleSymbolLayersIconSymbol3DLayerResourceHrefChange = (
    layerIndex: number,
    value: string
  ) => {
    const newSymbolLayers = symbolLayers.clone();
    const symbolLayer: IconSymbol3DLayer =
      newSymbolLayers.getItemAt(layerIndex);
    symbolLayer.resource.href = value;
    setSymbolLayers(newSymbolLayers);
    handleIconSymbol3DLayerResourceHrefChange(layerIndex, value);
  };

  const handleSymbolLayersIconSymbol3DLayerResourcePrimitiveChange = (
    layerIndex: number,
    value: IconSymbol3DLayerResourcePrimitiveOption
  ) => {
    const newSymbolLayers = symbolLayers.clone();
    const symbolLayer: IconSymbol3DLayer =
      newSymbolLayers.getItemAt(layerIndex);
    symbolLayer.resource.primitive = value;
    setSymbolLayers(newSymbolLayers);
    handleIconSymbol3DLayerResourcePrimitiveChange(layerIndex, value);
  };

  const handleSymbolLayersIconSymbol3DLayerSizeChange = (
    layerIndex: number,
    value: string
  ) => {
    const newSymbolLayers = symbolLayers.clone();
    const symbolLayer: IconSymbol3DLayer =
      newSymbolLayers.getItemAt(layerIndex);
    symbolLayer.size = Number(value);
    setSymbolLayers(newSymbolLayers);
    handleIconSymbol3DLayerSizeChange(layerIndex, value);
  };

  const handleSymbolLayersObjectSymbol3DLayerAnchorChange = (
    layerIndex: number,
    value: ObjectSymbol3DLayerAnchorOption
  ) => {
    const newSymbolLayers = symbolLayers.clone();
    const symbolLayer: ObjectSymbol3DLayer =
      newSymbolLayers.getItemAt(layerIndex);
    symbolLayer.anchor = value;
    setSymbolLayers(newSymbolLayers);
    handleObjectSymbol3DLayerAnchorChange(layerIndex, value);
  };

  const handleSymbolLayersObjectSymbol3DLayerAnchorPositionXChange = (
    layerIndex: number,
    value: string
  ) => {
    const newSymbolLayers = symbolLayers.clone();
    const symbolLayer: ObjectSymbol3DLayer =
      newSymbolLayers.getItemAt(layerIndex);
    symbolLayer.anchorPosition.x = Number(value);
    setSymbolLayers(newSymbolLayers);
    handleObjectSymbol3DLayerAnchorPositionXChange(layerIndex, value);
  };

  const handleSymbolLayersObjectSymbol3DLayerAnchorPositionYChange = (
    layerIndex: number,
    value: string
  ) => {
    const newSymbolLayers = symbolLayers.clone();
    const symbolLayer: ObjectSymbol3DLayer =
      newSymbolLayers.getItemAt(layerIndex);
    symbolLayer.anchorPosition.y = Number(value);
    setSymbolLayers(newSymbolLayers);
    handleObjectSymbol3DLayerAnchorPositionYChange(layerIndex, value);
  };

  const handleSymbolLayersObjectSymbol3DLayerAnchorPositionZChange = (
    layerIndex: number,
    value: string
  ) => {
    const newSymbolLayers = symbolLayers.clone();
    const symbolLayer: ObjectSymbol3DLayer =
      newSymbolLayers.getItemAt(layerIndex);
    symbolLayer.anchorPosition.z = Number(value);
    setSymbolLayers(newSymbolLayers);
    handleObjectSymbol3DLayerAnchorPositionZChange(layerIndex, value);
  };

  const handleSymbolLayersObjectSymbol3DLayerCastShadowsChange = (
    layerIndex: number,
    value: boolean
  ) => {
    const newSymbolLayers = symbolLayers.clone();
    const symbolLayer: ObjectSymbol3DLayer =
      newSymbolLayers.getItemAt(layerIndex);
    symbolLayer.castShadows = value;
    setSymbolLayers(newSymbolLayers);
    handleObjectSymbol3DLayerCastShadowsChange(layerIndex, value);
  };

  const handleSymbolLayersObjectSymbol3DLayerDepthChange = (
    layerIndex: number,
    value: string
  ) => {
    const newSymbolLayers = symbolLayers.clone();
    const symbolLayer: ObjectSymbol3DLayer =
      newSymbolLayers.getItemAt(layerIndex);
    symbolLayer.depth = Number(value);
    setSymbolLayers(newSymbolLayers);
    handleObjectSymbol3DLayerDepthChange(layerIndex, value);
  };

  const handleSymbolLayersObjectSymbol3DLayerHeadingChange = (
    layerIndex: number,
    value: number
  ) => {
    const newSymbolLayers = symbolLayers.clone();
    const symbolLayer: ObjectSymbol3DLayer =
      newSymbolLayers.getItemAt(layerIndex);
    symbolLayer.heading = value;
    setSymbolLayers(newSymbolLayers);
    handleObjectSymbol3DLayerHeadingChange(layerIndex, value);
  };

  const handleSymbolLayersObjectSymbol3DLayerMaterialColorChange = (
    layerIndex: number,
    value: string
  ) => {
    const newSymbolLayers = symbolLayers.clone();
    const symbolLayer: ObjectSymbol3DLayer =
      newSymbolLayers.getItemAt(layerIndex);
    symbolLayer.material.color = new Color(value);
    setSymbolLayers(newSymbolLayers);
    handleObjectSymbol3DLayerMaterialColorChange(layerIndex, value);
  };

  const handleSymbolLayersObjectSymbol3DLayerResourceHrefChange = (
    layerIndex: number,
    value: string
  ) => {
    const newSymbolLayers = symbolLayers.clone();
    const symbolLayer: ObjectSymbol3DLayer =
      newSymbolLayers.getItemAt(layerIndex);
    symbolLayer.resource.href = value;
    setSymbolLayers(newSymbolLayers);
    handleObjectSymbol3DLayerResourceHrefChange(layerIndex, value);
  };

  const handleSymbolLayersObjectSymbol3DLayerResourcePrimitiveChange = (
    layerIndex: number,
    value: ObjectSymbol3DLayerResourcePrimitiveOption
  ) => {
    const newSymbolLayers = symbolLayers.clone();
    const symbolLayer: ObjectSymbol3DLayer =
      newSymbolLayers.getItemAt(layerIndex);
    symbolLayer.resource.primitive = value;
    setSymbolLayers(newSymbolLayers);
    handleObjectSymbol3DLayerResourcePrimitiveChange(layerIndex, value);
  };

  const handleSymbolLayersObjectSymbol3DLayerRollChange = (
    layerIndex: number,
    value: number
  ) => {
    const newSymbolLayers = symbolLayers.clone();
    const symbolLayer: ObjectSymbol3DLayer =
      newSymbolLayers.getItemAt(layerIndex);
    symbolLayer.roll = value;
    setSymbolLayers(newSymbolLayers);
    handleObjectSymbol3DLayerRollChange(layerIndex, value);
  };

  const handleSymbolLayersObjectSymbol3DLayerTiltChange = (
    layerIndex: number,
    value: number
  ) => {
    const newSymbolLayers = symbolLayers.clone();
    const symbolLayer: ObjectSymbol3DLayer =
      newSymbolLayers.getItemAt(layerIndex);
    symbolLayer.tilt = value;
    setSymbolLayers(newSymbolLayers);
    handleObjectSymbol3DLayerTiltChange(layerIndex, value);
  };

  const handleSymbolLayersObjectSymbol3DLayerWidthChange = (
    layerIndex: number,
    value: string
  ) => {
    const newSymbolLayers = symbolLayers.clone();
    const symbolLayer: ObjectSymbol3DLayer =
      newSymbolLayers.getItemAt(layerIndex);
    symbolLayer.width = Number(value);
    setSymbolLayers(newSymbolLayers);
    handleObjectSymbol3DLayerWidthChange(layerIndex, value);
  };

  const handleSymbolLayersTextSymbol3DLayerBackgroundColorChange = (
    layerIndex: number,
    value: string
  ) => {
    const newSymbolLayers = symbolLayers.clone();
    const symbolLayer = newSymbolLayers.getItemAt(
      layerIndex as number
    ) as TextSymbol3DLayer;
    symbolLayer.background.color = new Color(value);
    setSymbolLayers(newSymbolLayers);
    handleTextSymbol3DLayerBackgroundColorChange(layerIndex, value);
  };

  const handleSymbolLayersTextSymbol3DLayerFontDecorationChange = (
    layerIndex: number,
    value: FontDecoration
  ) => {
    const newSymbolLayers = symbolLayers.clone();
    const symbolLayer = newSymbolLayers.getItemAt(
      layerIndex as number
    ) as TextSymbol3DLayer;
    symbolLayer.font.decoration = value;
    setSymbolLayers(newSymbolLayers);
    handleTextSymbol3DLayerFontDecorationChange(layerIndex, value);
  };

  const handleSymbolLayersTextSymbol3DLayerFontFamilyChange = (
    layerIndex: number,
    value: string
  ) => {
    const newSymbolLayers = symbolLayers.clone();
    const symbolLayer = newSymbolLayers.getItemAt(
      layerIndex as number
    ) as TextSymbol3DLayer;
    symbolLayer.font.family = value;
    setSymbolLayers(newSymbolLayers);
    handleTextSymbol3DLayerFontFamilyChange(layerIndex, value);
  };

  const handleSymbolLayersTextSymbol3DLayerFontSizeChange = (
    layerIndex: number,
    value: string
  ) => {
    const newSymbolLayers = symbolLayers.clone();
    const symbolLayer = newSymbolLayers.getItemAt(
      layerIndex as number
    ) as TextSymbol3DLayer;
    symbolLayer.font.size = Number(value);
    setSymbolLayers(newSymbolLayers);
    handleTextSymbol3DLayerFontSizeChange(layerIndex, value);
  };

  const handleSymbolLayersTextSymbol3DLayerFontStyleChange = (
    layerIndex: number,
    value: FontStyle | undefined
  ) => {
    const newSymbolLayers = symbolLayers.clone();
    const symbolLayer = newSymbolLayers.getItemAt(
      layerIndex as number
    ) as TextSymbol3DLayer;
    symbolLayer.font.style = value as FontStyle;
    setSymbolLayers(newSymbolLayers);
    handleTextSymbol3DLayerFontStyleChange(layerIndex, value);
  };

  const handleSymbolLayersTextSymbol3DLayerFontWeightChange = (
    layerIndex: number,
    value: FontWeight | undefined
  ) => {
    const newSymbolLayers = symbolLayers.clone();
    const symbolLayer = newSymbolLayers.getItemAt(
      layerIndex as number
    ) as TextSymbol3DLayer;
    symbolLayer.font.weight = value as FontWeight;
    setSymbolLayers(newSymbolLayers);
    handleTextSymbol3DLayerFontWeightChange(layerIndex, value);
  };

  const handleSymbolLayersTextSymbol3DLayerHorizontalAlignmentChange = (
    layerIndex: number,
    value: HorizontalAlignment
  ) => {
    const newSymbolLayers = symbolLayers.clone();
    const symbolLayer = newSymbolLayers.getItemAt(
      layerIndex as number
    ) as TextSymbol3DLayer;
    symbolLayer.horizontalAlignment = value;
    setSymbolLayers(newSymbolLayers);
    handleTextSymbol3DLayerHorizontalAlignmentChange(layerIndex, value);
  };

  const handleSymbolLayersTextSymbol3DLayerLineHeightChange = (
    layerIndex: number,
    value: string
  ) => {
    const newSymbolLayers = symbolLayers.clone();
    const symbolLayer = newSymbolLayers.getItemAt(
      layerIndex as number
    ) as TextSymbol3DLayer;
    symbolLayer.lineHeight = Number(value);
    setSymbolLayers(newSymbolLayers);
    handleTextSymbol3DLayerLineHeightChange(layerIndex, value);
  };

  const handleSymbolLayersTextSymbol3DLayerTextChange = (
    layerIndex: number,
    value: string
  ) => {
    const newSymbolLayers = symbolLayers.clone();
    const symbolLayer = newSymbolLayers.getItemAt(
      layerIndex as number
    ) as TextSymbol3DLayer;
    symbolLayer.text = value;
    setSymbolLayers(newSymbolLayers);
    handleTextSymbol3DLayerTextChange(layerIndex, value);
  };

  const handleSymbolLayersTextSymbol3DLayerVerticalAlignmentChange = (
    layerIndex: number,
    value: VerticalAlignment
  ) => {
    const newSymbolLayers = symbolLayers.clone();
    const symbolLayer = newSymbolLayers.getItemAt(
      layerIndex as number
    ) as TextSymbol3DLayer;
    symbolLayer.verticalAlignment = value;
    setSymbolLayers(newSymbolLayers);
    handleTextSymbol3DLayerVerticalAlignmentChange(layerIndex, value);
  };

  const createSymbol3DLayerCollectionForm = () => {
    if (symbolLayers.length > 0) {
      let symbol3DLayerCollectionForm: JSX.Element[] = [];

      symbolLayers.map(
        (
          symbolLayer:
            | IconSymbol3DLayer
            | ObjectSymbol3DLayer
            | TextSymbol3DLayer,
          index: number
        ) => {
          if (symbolLayer.type === "icon") {
            symbol3DLayerCollectionForm.push(
              <CalciteBlock
                collapsible
                heading={`symbolLayers[${index}]`}
                key={index}
                open={true}
              >
                <CalciteAction
                  icon="trash"
                  onClick={() => deleteSymbol3DLayer(index)}
                  slot="control"
                  text="Delete"
                />
                <IconSymbol3DLayerForm
                  layerIndex={index}
                  handleIconSymbol3DLayerAnchorChange={
                    handleSymbolLayersIconSymbol3DLayerAnchorChange
                  }
                  handleIconSymbol3DLayerAnchorPositionXChange={
                    handleSymbolLayersIconSymbol3DLayerAnchorPositionXChange
                  }
                  handleIconSymbol3DLayerAnchorPositionYChange={
                    handleSymbolLayersIconSymbol3DLayerAnchorPositionYChange
                  }
                  handleIconSymbol3DLayerMaterialColorChange={
                    handleSymbolLayersIconSymbol3DLayerMaterialColorChange
                  }
                  handleIconSymbol3DLayerOutlineColorChange={
                    handleSymbolLayersIconSymbol3DLayerOutlineColorChange
                  }
                  handleIconSymbol3DLayerOutlineSizeChange={
                    handleSymbolLayersIconSymbol3DLayerOutlineSizeChange
                  }
                  handleIconSymbol3DLayerResourceHrefChange={
                    handleSymbolLayersIconSymbol3DLayerResourceHrefChange
                  }
                  handleIconSymbol3DLayerResourcePrimitiveChange={
                    handleSymbolLayersIconSymbol3DLayerResourcePrimitiveChange
                  }
                  handleSizeChange={
                    handleSymbolLayersIconSymbol3DLayerSizeChange
                  }
                />
              </CalciteBlock>
            );
          }

          if (symbolLayer.type === "object") {
            symbol3DLayerCollectionForm.push(
              <CalciteBlock
                collapsible
                heading={`symbolLayers[${index}]`}
                key={index}
                open={true}
              >
                <CalciteAction
                  icon="trash"
                  onClick={() => deleteSymbol3DLayer(index)}
                  slot="control"
                  text="Delete"
                />
                <ObjectSymbol3DLayerForm
                  layerIndex={index}
                  handleAnchorChange={
                    handleSymbolLayersObjectSymbol3DLayerAnchorChange
                  }
                  handleObjectSymbol3DLayerAnchorPositionXChange={
                    handleSymbolLayersObjectSymbol3DLayerAnchorPositionXChange
                  }
                  handleObjectSymbol3DLayerAnchorPositionYChange={
                    handleSymbolLayersObjectSymbol3DLayerAnchorPositionYChange
                  }
                  handleObjectSymbol3DLayerAnchorPositionZChange={
                    handleSymbolLayersObjectSymbol3DLayerAnchorPositionZChange
                  }
                  handleCastShadowsChange={
                    handleSymbolLayersObjectSymbol3DLayerCastShadowsChange
                  }
                  handleDepthChange={
                    handleSymbolLayersObjectSymbol3DLayerDepthChange
                  }
                  handleHeadingChange={
                    handleSymbolLayersObjectSymbol3DLayerHeadingChange
                  }
                  handleObjectSymbol3DLayerMaterialColorChange={
                    handleSymbolLayersObjectSymbol3DLayerMaterialColorChange
                  }
                  handleObjectSymbol3DLayerResourceHrefChange={
                    handleSymbolLayersObjectSymbol3DLayerResourceHrefChange
                  }
                  handleObjectSymbol3DLayerResourcePrimitiveChange={
                    handleSymbolLayersObjectSymbol3DLayerResourcePrimitiveChange
                  }
                  handleRollChange={
                    handleSymbolLayersObjectSymbol3DLayerRollChange
                  }
                  handleTiltChange={
                    handleSymbolLayersObjectSymbol3DLayerTiltChange
                  }
                  handleWidthChange={
                    handleSymbolLayersObjectSymbol3DLayerWidthChange
                  }
                ></ObjectSymbol3DLayerForm>
              </CalciteBlock>
            );
          }
          if (symbolLayer.type === "text") {
            symbol3DLayerCollectionForm.push(
              <CalciteBlock
                collapsible
                heading={`symbolLayers[${index}]`}
                key={index}
                open={true}
              >
                <CalciteAction
                  icon="trash"
                  onClick={() => deleteSymbol3DLayer(index)}
                  slot="control"
                  text="Delete"
                />
                <TextSymbol3DLayerForm
                  layerIndex={index}
                  handleTextSymbol3DLayerBackgroundColorChange={
                    handleSymbolLayersTextSymbol3DLayerBackgroundColorChange
                  }
                  handleTextSymbol3DLayerFontDecorationChange={
                    handleSymbolLayersTextSymbol3DLayerFontDecorationChange
                  }
                  handleTextSymbol3DLayerFontFamilyChange={
                    handleSymbolLayersTextSymbol3DLayerFontFamilyChange
                  }
                  handleTextSymbol3DLayerFontSizeChange={
                    handleSymbolLayersTextSymbol3DLayerFontSizeChange
                  }
                  handleTextSymbol3DLayerFontStyleChange={
                    handleSymbolLayersTextSymbol3DLayerFontStyleChange
                  }
                  handleTextSymbol3DLayerFontWeightChange={
                    handleSymbolLayersTextSymbol3DLayerFontWeightChange
                  }
                  handleHorizontalAlignmentChange={
                    handleSymbolLayersTextSymbol3DLayerHorizontalAlignmentChange
                  }
                  handleLineHeightChange={
                    handleSymbolLayersTextSymbol3DLayerLineHeightChange
                  }
                  handleTextChange={
                    handleSymbolLayersTextSymbol3DLayerTextChange
                  }
                  handleVerticalAlignmentChange={
                    handleSymbolLayersTextSymbol3DLayerVerticalAlignmentChange
                  }
                ></TextSymbol3DLayerForm>
              </CalciteBlock>
            );
          }
        }
      );
      return symbol3DLayerCollectionForm;
    }
  };

  return (
    <React.Fragment>
      <CalciteBlock
        style={blockStyles}
        collapsible
        heading={"symbolLayers"}
        open={true}
      >
        <CalciteAction
          onClick={() => addIconSymbol3DLayer()}
          slot="header-menu-actions"
          icon="plus"
          text-enabled
          text="Add IconSymbol3DLayer"
        ></CalciteAction>
        <CalciteAction
          onClick={() => addObjectSymbol3DLayer()}
          slot="header-menu-actions"
          icon="plus"
          text-enabled
          text="Add ObjectSymbol3DLayer"
        ></CalciteAction>
        <CalciteAction
          onClick={() => addTextSymbol3DLayer()}
          slot="header-menu-actions"
          icon="plus"
          text-enabled
          text="Add TextSymbol3DLayer"
        ></CalciteAction>
        {createSymbol3DLayerCollectionForm()}
      </CalciteBlock>
    </React.Fragment>
  );
};

export default Symbol3DLayerCollectionForm;
