import Color from "@arcgis/core/Color";
import Collection from "@arcgis/core/core/Collection";
import IconSymbol3DLayer from "@arcgis/core/symbols/IconSymbol3DLayer";
import { CalciteAction, CalciteBlock } from "@esri/calcite-components-react";
import "@esri/calcite-components/dist/components/calcite-action";
import "@esri/calcite-components/dist/components/calcite-block";
import React, { useState } from "react";
import { blockStyles } from "../lib/styles";
import { AnchorOption } from "../lib/types";
import IconSymbol3DForm from "./IconSymbol3DLayerForm";

interface PageProps {
  handleIconSymbol3DLayerAnchorChange: (
    layerIndex: number,
    value: AnchorOption
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
  updateSymbolLayers: (newSymbolLayers: Collection) => void;
}
const Symbol3DLayerCollectionForm = ({
  handleIconSymbol3DLayerAnchorChange,
  handleIconSymbol3DLayerAnchorPositionXChange,
  handleIconSymbol3DLayerAnchorPositionYChange,
  handleIconSymbol3DLayerMaterialColorChange,
  updateSymbolLayers,
}: PageProps) => {
  const createNewIconSymbol3DLayer = (): IconSymbol3DLayer => {
    const newIconSymbol3DLayer = new IconSymbol3DLayer();
    newIconSymbol3DLayer.anchor = "center";
    newIconSymbol3DLayer.anchorPosition = { x: 0, y: 0 };
    newIconSymbol3DLayer.material = { color: new Color("red") };
    newIconSymbol3DLayer.size = 12;
    return newIconSymbol3DLayer;
  };

  const [symbolLayers, setSymbolLayers] = useState(new Collection());

  const addSymbol3DLayer = () => {
    const newSymbolLayers = symbolLayers.clone();
    const iconSymbol3DLayer = createNewIconSymbol3DLayer();
    newSymbolLayers.add(iconSymbol3DLayer);
    setSymbolLayers(newSymbolLayers);
    updateSymbolLayers(newSymbolLayers);
  };

  const deleteSymbol3DLayer = (index: number) => {
    const newSymbolLayers = symbolLayers.clone();
    newSymbolLayers.removeAt(index);
    setSymbolLayers(newSymbolLayers);
    updateSymbolLayers(newSymbolLayers);
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
          onClick={() => addSymbol3DLayer()}
          slot="header-menu-actions"
          icon="plus"
          text-enabled
          text="Add IconSymbol3DLayer"
        ></CalciteAction>

        {symbolLayers.length > 0 &&
          symbolLayers.map((element, index) => (
            <CalciteBlock
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
              <IconSymbol3DForm
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
              />
            </CalciteBlock>
          ))}
      </CalciteBlock>
    </React.Fragment>
  );
};

export default Symbol3DLayerCollectionForm;
