import Color from "@arcgis/core/Color";
import Collection from "@arcgis/core/core/Collection";
import IconSymbol3DLayer from "@arcgis/core/symbols/IconSymbol3DLayer";
import ObjectSymbol3DLayer from "@arcgis/core/symbols/ObjectSymbol3DLayer";
import { CalciteAction, CalciteBlock } from "@esri/calcite-components-react";
import "@esri/calcite-components/dist/components/calcite-action";
import "@esri/calcite-components/dist/components/calcite-block";
import React, { useState } from "react";
import { blockStyles } from "../lib/styles";
import {
  IconSymbol3DLayerAnchorOption,
  IconSymbol3DLayerResourcePrimitiveOption,
  ObjectSymbol3DLayerAnchorOption,
  ObjectSymbol3DLayerResourcePrimitiveOption,
} from "../lib/types";
import IconSymbol3DLayerForm from "./IconSymbol3DLayerForm";
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

  const createSymbol3DLayerCollectionForm = (
    symbolLayers: Collection<IconSymbol3DLayer | ObjectSymbol3DLayer>
  ) => {
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
                  handleObjectSymbol3DLayerMaterialColorChange={
                    handleObjectSymbol3DLayerMaterialColorChange
                  }
                  handleObjectSymbol3DLayerResourceHrefChange={
                    handleObjectSymbol3DLayerResourceHrefChange
                  }
                  handleObjectSymbol3DLayerResourcePrimitiveChange={
                    handleObjectSymbol3DLayerResourcePrimitiveChange
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

        {createSymbol3DLayerCollectionForm(symbolLayers)}
      </CalciteBlock>
    </React.Fragment>
  );
};

export default Symbol3DLayerCollectionForm;
