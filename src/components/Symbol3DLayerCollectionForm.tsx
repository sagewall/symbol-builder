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
  updateSymbolLayers: (newSymbolLayers: Collection) => void;
}
const Symbol3DLayerCollectionForm = ({ updateSymbolLayers }: PageProps) => {
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
    newTextSymbol3DLayer.halo = { color: new Color("#000000"), size: 0 };
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

  const handleIconSymbol3DLayerAnchorChange = (
    layerIndex: number,
    value: IconSymbol3DLayerAnchorOption
  ) => {
    const newSymbolLayers = symbolLayers.clone();
    const symbolLayer: IconSymbol3DLayer =
      newSymbolLayers.getItemAt(layerIndex);
    symbolLayer.anchor = value;
    setSymbolLayers(newSymbolLayers);
    updateSymbolLayers(newSymbolLayers);
  };

  const handleIconSymbol3DLayerAnchorPositionXChange = (
    layerIndex: number,
    value: string
  ) => {
    const newSymbolLayers = symbolLayers.clone();
    const symbolLayer: IconSymbol3DLayer =
      newSymbolLayers.getItemAt(layerIndex);
    symbolLayer.anchorPosition.x = Number(value);
    setSymbolLayers(newSymbolLayers);
    updateSymbolLayers(newSymbolLayers);
  };

  const handleIconSymbol3DLayerAnchorPositionYChange = (
    layerIndex: number,
    value: string
  ) => {
    const newSymbolLayers = symbolLayers.clone();
    const symbolLayer: IconSymbol3DLayer =
      newSymbolLayers.getItemAt(layerIndex);
    symbolLayer.anchorPosition.y = Number(value);
    setSymbolLayers(newSymbolLayers);
    updateSymbolLayers(newSymbolLayers);
  };

  const handleIconSymbol3DLayerMaterialColorChange = (
    layerIndex: number,
    value: string
  ) => {
    const newSymbolLayers = symbolLayers.clone();
    const symbolLayer: IconSymbol3DLayer =
      newSymbolLayers.getItemAt(layerIndex);
    symbolLayer.material.color = new Color(value);
    setSymbolLayers(newSymbolLayers);
    updateSymbolLayers(newSymbolLayers);
  };

  const handleIconSymbol3DLayerOutlineColorChange = (
    layerIndex: number,
    value: string
  ) => {
    const newSymbolLayers = symbolLayers.clone();
    const symbolLayer: IconSymbol3DLayer =
      newSymbolLayers.getItemAt(layerIndex);
    symbolLayer.outline.color = new Color(value);
    setSymbolLayers(newSymbolLayers);
    updateSymbolLayers(newSymbolLayers);
  };

  const handleIconSymbol3DLayerOutlineSizeChange = (
    layerIndex: number,
    value: string
  ) => {
    const newSymbolLayers = symbolLayers.clone();
    const symbolLayer: IconSymbol3DLayer =
      newSymbolLayers.getItemAt(layerIndex);
    symbolLayer.outline.size = Number(value);
    setSymbolLayers(newSymbolLayers);
    updateSymbolLayers(newSymbolLayers);
  };

  const handleIconSymbol3DLayerResourceHrefChange = (
    layerIndex: number,
    value: string
  ) => {
    const newSymbolLayers = symbolLayers.clone();
    const symbolLayer: IconSymbol3DLayer =
      newSymbolLayers.getItemAt(layerIndex);
    symbolLayer.resource.href = value;
    setSymbolLayers(newSymbolLayers);
    updateSymbolLayers(newSymbolLayers);
  };

  const handleIconSymbol3DLayerResourcePrimitiveChange = (
    layerIndex: number,
    value: IconSymbol3DLayerResourcePrimitiveOption
  ) => {
    const newSymbolLayers = symbolLayers.clone();
    const symbolLayer: IconSymbol3DLayer =
      newSymbolLayers.getItemAt(layerIndex);
    symbolLayer.resource.primitive = value;
    setSymbolLayers(newSymbolLayers);
    updateSymbolLayers(newSymbolLayers);
  };

  const handleIconSymbol3DLayerSizeChange = (
    layerIndex: number,
    value: string
  ) => {
    const newSymbolLayers = symbolLayers.clone();
    const symbolLayer: IconSymbol3DLayer =
      newSymbolLayers.getItemAt(layerIndex);
    symbolLayer.size = Number(value);
    setSymbolLayers(newSymbolLayers);
    updateSymbolLayers(newSymbolLayers);
  };

  const handleObjectSymbol3DLayerAnchorChange = (
    layerIndex: number,
    value: ObjectSymbol3DLayerAnchorOption
  ) => {
    const newSymbolLayers = symbolLayers.clone();
    const symbolLayer: ObjectSymbol3DLayer =
      newSymbolLayers.getItemAt(layerIndex);
    symbolLayer.anchor = value;
    setSymbolLayers(newSymbolLayers);
    updateSymbolLayers(newSymbolLayers);
  };

  const handleObjectSymbol3DLayerAnchorPositionXChange = (
    layerIndex: number,
    value: string
  ) => {
    const newSymbolLayers = symbolLayers.clone();
    const symbolLayer: ObjectSymbol3DLayer =
      newSymbolLayers.getItemAt(layerIndex);
    symbolLayer.anchorPosition.x = Number(value);
    setSymbolLayers(newSymbolLayers);
    updateSymbolLayers(newSymbolLayers);
  };

  const handleObjectSymbol3DLayerAnchorPositionYChange = (
    layerIndex: number,
    value: string
  ) => {
    const newSymbolLayers = symbolLayers.clone();
    const symbolLayer: ObjectSymbol3DLayer =
      newSymbolLayers.getItemAt(layerIndex);
    symbolLayer.anchorPosition.y = Number(value);
    setSymbolLayers(newSymbolLayers);
    updateSymbolLayers(newSymbolLayers);
  };

  const handleObjectSymbol3DLayerAnchorPositionZChange = (
    layerIndex: number,
    value: string
  ) => {
    const newSymbolLayers = symbolLayers.clone();
    const symbolLayer: ObjectSymbol3DLayer =
      newSymbolLayers.getItemAt(layerIndex);
    symbolLayer.anchorPosition.z = Number(value);
    setSymbolLayers(newSymbolLayers);
    updateSymbolLayers(newSymbolLayers);
  };

  const handleObjectSymbol3DLayerCastShadowsChange = (
    layerIndex: number,
    value: boolean
  ) => {
    const newSymbolLayers = symbolLayers.clone();
    const symbolLayer: ObjectSymbol3DLayer =
      newSymbolLayers.getItemAt(layerIndex);
    symbolLayer.castShadows = value;
    setSymbolLayers(newSymbolLayers);
    updateSymbolLayers(newSymbolLayers);
  };

  const handleObjectSymbol3DLayerDepthChange = (
    layerIndex: number,
    value: string
  ) => {
    const newSymbolLayers = symbolLayers.clone();
    const symbolLayer: ObjectSymbol3DLayer =
      newSymbolLayers.getItemAt(layerIndex);
    symbolLayer.depth = Number(value);
    setSymbolLayers(newSymbolLayers);
    updateSymbolLayers(newSymbolLayers);
  };

  const handleObjectSymbol3DLayerHeadingChange = (
    layerIndex: number,
    value: number
  ) => {
    const newSymbolLayers = symbolLayers.clone();
    const symbolLayer: ObjectSymbol3DLayer =
      newSymbolLayers.getItemAt(layerIndex);
    symbolLayer.heading = value;
    setSymbolLayers(newSymbolLayers);
    updateSymbolLayers(newSymbolLayers);
  };

  const handleObjectSymbol3DLayerMaterialColorChange = (
    layerIndex: number,
    value: string
  ) => {
    const newSymbolLayers = symbolLayers.clone();
    const symbolLayer: ObjectSymbol3DLayer =
      newSymbolLayers.getItemAt(layerIndex);
    symbolLayer.material.color = new Color(value);
    setSymbolLayers(newSymbolLayers);
    updateSymbolLayers(newSymbolLayers);
  };

  const handleObjectSymbol3DLayerResourceHrefChange = (
    layerIndex: number,
    value: string
  ) => {
    const newSymbolLayers = symbolLayers.clone();
    const symbolLayer: ObjectSymbol3DLayer =
      newSymbolLayers.getItemAt(layerIndex);
    symbolLayer.resource.href = value;
    setSymbolLayers(newSymbolLayers);
    updateSymbolLayers(newSymbolLayers);
  };

  const handleObjectSymbol3DLayerResourcePrimitiveChange = (
    layerIndex: number,
    value: ObjectSymbol3DLayerResourcePrimitiveOption
  ) => {
    const newSymbolLayers = symbolLayers.clone();
    const symbolLayer: ObjectSymbol3DLayer =
      newSymbolLayers.getItemAt(layerIndex);
    symbolLayer.resource.primitive = value;
    setSymbolLayers(newSymbolLayers);
    updateSymbolLayers(newSymbolLayers);
  };

  const handleObjectSymbol3DLayerRollChange = (
    layerIndex: number,
    value: number
  ) => {
    const newSymbolLayers = symbolLayers.clone();
    const symbolLayer: ObjectSymbol3DLayer =
      newSymbolLayers.getItemAt(layerIndex);
    symbolLayer.roll = value;
    setSymbolLayers(newSymbolLayers);
    updateSymbolLayers(newSymbolLayers);
  };

  const handleObjectSymbol3DLayerTiltChange = (
    layerIndex: number,
    value: number
  ) => {
    const newSymbolLayers = symbolLayers.clone();
    const symbolLayer: ObjectSymbol3DLayer =
      newSymbolLayers.getItemAt(layerIndex);
    symbolLayer.tilt = value;
    setSymbolLayers(newSymbolLayers);
    updateSymbolLayers(newSymbolLayers);
  };

  const handleObjectSymbol3DLayerWidthChange = (
    layerIndex: number,
    value: string
  ) => {
    const newSymbolLayers = symbolLayers.clone();
    const symbolLayer: ObjectSymbol3DLayer =
      newSymbolLayers.getItemAt(layerIndex);
    symbolLayer.width = Number(value);
    setSymbolLayers(newSymbolLayers);
    updateSymbolLayers(newSymbolLayers);
  };

  const handleTextSymbol3DLayerBackgroundColorChange = (
    layerIndex: number,
    value: string
  ) => {
    const newSymbolLayers = symbolLayers.clone();
    const symbolLayer = newSymbolLayers.getItemAt(
      layerIndex as number
    ) as TextSymbol3DLayer;
    symbolLayer.background.color = new Color(value);
    setSymbolLayers(newSymbolLayers);
    updateSymbolLayers(newSymbolLayers);
  };

  const handleTextSymbol3DLayerFontDecorationChange = (
    layerIndex: number,
    value: FontDecoration
  ) => {
    const newSymbolLayers = symbolLayers.clone();
    const symbolLayer = newSymbolLayers.getItemAt(
      layerIndex as number
    ) as TextSymbol3DLayer;
    symbolLayer.font.decoration = value;
    setSymbolLayers(newSymbolLayers);
    updateSymbolLayers(newSymbolLayers);
  };

  const handleTextSymbol3DLayerFontFamilyChange = (
    layerIndex: number,
    value: string
  ) => {
    const newSymbolLayers = symbolLayers.clone();
    const symbolLayer = newSymbolLayers.getItemAt(
      layerIndex as number
    ) as TextSymbol3DLayer;
    symbolLayer.font.family = value;
    setSymbolLayers(newSymbolLayers);
    updateSymbolLayers(newSymbolLayers);
  };

  const handleTextSymbol3DLayerFontSizeChange = (
    layerIndex: number,
    value: string
  ) => {
    const newSymbolLayers = symbolLayers.clone();
    const symbolLayer = newSymbolLayers.getItemAt(
      layerIndex as number
    ) as TextSymbol3DLayer;
    symbolLayer.font.size = Number(value);
    setSymbolLayers(newSymbolLayers);
    updateSymbolLayers(newSymbolLayers);
  };

  const handleTextSymbol3DLayerFontStyleChange = (
    layerIndex: number,
    value: FontStyle | undefined
  ) => {
    const newSymbolLayers = symbolLayers.clone();
    const symbolLayer = newSymbolLayers.getItemAt(
      layerIndex as number
    ) as TextSymbol3DLayer;
    symbolLayer.font.style = value as FontStyle;
    setSymbolLayers(newSymbolLayers);
    updateSymbolLayers(newSymbolLayers);
  };

  const handleTextSymbol3DLayerFontWeightChange = (
    layerIndex: number,
    value: FontWeight | undefined
  ) => {
    const newSymbolLayers = symbolLayers.clone();
    const symbolLayer = newSymbolLayers.getItemAt(
      layerIndex as number
    ) as TextSymbol3DLayer;
    symbolLayer.font.weight = value as FontWeight;
    setSymbolLayers(newSymbolLayers);
    updateSymbolLayers(newSymbolLayers);
  };

  const handleTextSymbol3DLayerHaloColorChange = (
    layerIndex: number,
    value: string
  ) => {
    const newSymbolLayers = symbolLayers.clone();
    const symbolLayer = newSymbolLayers.getItemAt(
      layerIndex
    ) as TextSymbol3DLayer;
    symbolLayer.halo.color = new Color(value);
    setSymbolLayers(newSymbolLayers);
    updateSymbolLayers(newSymbolLayers);
  };

  const handleTextSymbol3DLayerHaloSizeChange = (
    layerIndex: number,
    value: string
  ) => {
    const newSymbolLayers = symbolLayers.clone();
    const symbolLayer = newSymbolLayers.getItemAt(
      layerIndex
    ) as TextSymbol3DLayer;
    symbolLayer.halo.size = Number(value);
    setSymbolLayers(newSymbolLayers);
    updateSymbolLayers(newSymbolLayers);
  };

  const handleTextSymbol3DLayerHorizontalAlignmentChange = (
    layerIndex: number,
    value: HorizontalAlignment
  ) => {
    const newSymbolLayers = symbolLayers.clone();
    const symbolLayer = newSymbolLayers.getItemAt(
      layerIndex as number
    ) as TextSymbol3DLayer;
    symbolLayer.horizontalAlignment = value;
    setSymbolLayers(newSymbolLayers);
    updateSymbolLayers(newSymbolLayers);
  };

  const handleTextSymbol3DLayerLineHeightChange = (
    layerIndex: number,
    value: string
  ) => {
    const newSymbolLayers = symbolLayers.clone();
    const symbolLayer = newSymbolLayers.getItemAt(
      layerIndex as number
    ) as TextSymbol3DLayer;
    symbolLayer.lineHeight = Number(value);
    setSymbolLayers(newSymbolLayers);
    updateSymbolLayers(newSymbolLayers);
  };

  const handleTextSymbol3DLayerTextChange = (
    layerIndex: number,
    value: string
  ) => {
    const newSymbolLayers = symbolLayers.clone();
    const symbolLayer = newSymbolLayers.getItemAt(
      layerIndex as number
    ) as TextSymbol3DLayer;
    symbolLayer.text = value;
    setSymbolLayers(newSymbolLayers);
    updateSymbolLayers(newSymbolLayers);
  };

  const handleTextSymbol3DLayerVerticalAlignmentChange = (
    layerIndex: number,
    value: VerticalAlignment
  ) => {
    const newSymbolLayers = symbolLayers.clone();
    const symbolLayer = newSymbolLayers.getItemAt(
      layerIndex as number
    ) as TextSymbol3DLayer;
    symbolLayer.verticalAlignment = value;
    setSymbolLayers(newSymbolLayers);
    updateSymbolLayers(newSymbolLayers);
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
                  handleSizeChange={handleIconSymbol3DLayerSizeChange}
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
                  handleAnchorChange={handleObjectSymbol3DLayerAnchorChange}
                  handleObjectSymbol3DLayerAnchorPositionXChange={
                    handleObjectSymbol3DLayerAnchorPositionXChange
                  }
                  handleObjectSymbol3DLayerAnchorPositionYChange={
                    handleObjectSymbol3DLayerAnchorPositionYChange
                  }
                  handleObjectSymbol3DLayerAnchorPositionZChange={
                    handleObjectSymbol3DLayerAnchorPositionZChange
                  }
                  handleCastShadowsChange={
                    handleObjectSymbol3DLayerCastShadowsChange
                  }
                  handleDepthChange={handleObjectSymbol3DLayerDepthChange}
                  handleHeadingChange={handleObjectSymbol3DLayerHeadingChange}
                  handleObjectSymbol3DLayerMaterialColorChange={
                    handleObjectSymbol3DLayerMaterialColorChange
                  }
                  handleObjectSymbol3DLayerResourceHrefChange={
                    handleObjectSymbol3DLayerResourceHrefChange
                  }
                  handleObjectSymbol3DLayerResourcePrimitiveChange={
                    handleObjectSymbol3DLayerResourcePrimitiveChange
                  }
                  handleRollChange={handleObjectSymbol3DLayerRollChange}
                  handleTiltChange={handleObjectSymbol3DLayerTiltChange}
                  handleWidthChange={handleObjectSymbol3DLayerWidthChange}
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
                    handleTextSymbol3DLayerBackgroundColorChange
                  }
                  handleTextSymbol3DLayerFontDecorationChange={
                    handleTextSymbol3DLayerFontDecorationChange
                  }
                  handleTextSymbol3DLayerFontFamilyChange={
                    handleTextSymbol3DLayerFontFamilyChange
                  }
                  handleTextSymbol3DLayerFontSizeChange={
                    handleTextSymbol3DLayerFontSizeChange
                  }
                  handleTextSymbol3DLayerFontStyleChange={
                    handleTextSymbol3DLayerFontStyleChange
                  }
                  handleTextSymbol3DLayerFontWeightChange={
                    handleTextSymbol3DLayerFontWeightChange
                  }
                  handleTextSymbol3DLayerHaloColorChange={
                    handleTextSymbol3DLayerHaloColorChange
                  }
                  handleTextSymbol3DLayerHaloSizeChange={
                    handleTextSymbol3DLayerHaloSizeChange
                  }
                  handleHorizontalAlignmentChange={
                    handleTextSymbol3DLayerHorizontalAlignmentChange
                  }
                  handleLineHeightChange={
                    handleTextSymbol3DLayerLineHeightChange
                  }
                  handleTextChange={handleTextSymbol3DLayerTextChange}
                  handleVerticalAlignmentChange={
                    handleTextSymbol3DLayerVerticalAlignmentChange
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
