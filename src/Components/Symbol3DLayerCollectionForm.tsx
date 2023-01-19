import Color from "@arcgis/core/Color";
import Collection from "@arcgis/core/core/Collection";
import IconSymbol3DLayer from "@arcgis/core/symbols/IconSymbol3DLayer";
import ObjectSymbol3DLayer from "@arcgis/core/symbols/ObjectSymbol3DLayer";
import { CalciteAction, CalciteBlock } from "@esri/calcite-components-react";
import "@esri/calcite-components/dist/components/calcite-action";
import "@esri/calcite-components/dist/components/calcite-block";
import React, { useState } from "react";
import IconSymbol3DLayerForm from "./IconSymbol3DLayerForm";
import { blockStyles } from "./lib/styles";
import {
  IconSymbol3DLayerAnchorOption,
  IconSymbol3DLayerResourcePrimitiveOption,
  ObjectSymbol3DLayerAnchorOption,
  ObjectSymbol3DLayerResourcePrimitiveOption,
} from "./lib/types";
import ObjectSymbol3DLayerForm from "./ObjectSymbol3DLayerForm";

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

  const createSymbol3DLayerCollectionForm = () => {
    if (symbolLayers.length > 0) {
      let symbol3DLayerCollectionForm: JSX.Element[] = [];

      symbolLayers.map(
        (
          symbolLayer: IconSymbol3DLayer | ObjectSymbol3DLayer,
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
                ></ObjectSymbol3DLayerForm>
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
        {createSymbol3DLayerCollectionForm()}
      </CalciteBlock>
    </React.Fragment>
  );
};

export default Symbol3DLayerCollectionForm;
