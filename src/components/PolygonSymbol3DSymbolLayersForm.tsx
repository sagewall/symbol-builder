import Color from "@arcgis/core/Color";
import Collection from "@arcgis/core/core/Collection";
import ExtrudeSymbol3DLayer from "@arcgis/core/symbols/ExtrudeSymbol3DLayer";
import FillSymbol3DLayer from "@arcgis/core/symbols/FillSymbol3DLayer";
import IconSymbol3DLayer from "@arcgis/core/symbols/IconSymbol3DLayer";
import LineSymbol3DLayer from "@arcgis/core/symbols/LineSymbol3DLayer";
import ObjectSymbol3DLayer from "@arcgis/core/symbols/ObjectSymbol3DLayer";
import TextSymbol3DLayer from "@arcgis/core/symbols/TextSymbol3DLayer";
import WaterSymbol3DLayer from "@arcgis/core/symbols/WaterSymbol3DLayer";
import { CalciteAction, CalciteBlock } from "@esri/calcite-components-react";
import React, { useState } from "react";
import FillSymbol3DLayerForm from "./FillSymbol3DLayerForm";
import { blockStyles } from "./lib/styles";
import { FillSymbol3DColorMixModeOption } from "./lib/types";

interface PageProps {
  updateSymbolLayers: (newSymbolLayers: Collection) => void;
}
const PolygonSymbol3DSymbolLayersForm = ({ updateSymbolLayers }: PageProps) => {
  const createNewFillSymbol3DLayer = (): FillSymbol3DLayer => {
    const newFillSymbol3DLayer = new FillSymbol3DLayer({
      material: {
        color: "#007ac2"
      }
    });
    return newFillSymbol3DLayer;
  };

  const [symbolLayers, setSymbolLayers] = useState(new Collection());

  const addFillSymbol3DLayer = () => {
    const newSymbolLayers = symbolLayers.clone();
    const fillSymbol3DLayer = createNewFillSymbol3DLayer();
    newSymbolLayers.add(fillSymbol3DLayer);
    setSymbolLayers(newSymbolLayers);
    updateSymbolLayers(newSymbolLayers);
  };

  const deleteSymbol3DLayer = (index: number) => {
    const newSymbolLayers = symbolLayers.clone();
    newSymbolLayers.removeAt(index);
    setSymbolLayers(newSymbolLayers);
    updateSymbolLayers(newSymbolLayers);
  };

  const handleFillSymbol3DLayerCastShadowsChange = (layerIndex: number, value: boolean) => {
    const newSymbolLayers = symbolLayers.clone();
    const symbolLayer = newSymbolLayers.getItemAt(layerIndex) as FillSymbol3DLayer;
    symbolLayer.castShadows = value;
    setSymbolLayers(newSymbolLayers);
    updateSymbolLayers(newSymbolLayers);
  };

  const handleFillSymbol3DLayerMaterialColorChange = (layerIndex: number, value: string) => {
    const newSymbolLayers = symbolLayers.clone();
    const symbolLayer = newSymbolLayers.getItemAt(layerIndex) as FillSymbol3DLayer;
    symbolLayer.material.color = new Color(value);
    setSymbolLayers(newSymbolLayers);
    updateSymbolLayers(newSymbolLayers);
  };

  const handleFillSymbol3DLayerMaterialColorMixModeChange = (layerIndex: number, value: string) => {
    const newSymbolLayers = symbolLayers.clone();
    const symbolLayer = newSymbolLayers.getItemAt(layerIndex) as FillSymbol3DLayer;
    symbolLayer.material.colorMixMode = value as FillSymbol3DColorMixModeOption;
    setSymbolLayers(newSymbolLayers);
    updateSymbolLayers(newSymbolLayers);
  };

  const createSymbol3DLayerCollectionForm = () => {
    if (symbolLayers.length > 0) {
      const symbol3DLayerCollectionForm: JSX.Element[] = [];

      symbolLayers.map(
        (
          symbolLayer:
            | FillSymbol3DLayer
            | ExtrudeSymbol3DLayer
            | WaterSymbol3DLayer
            | LineSymbol3DLayer
            | IconSymbol3DLayer
            | ObjectSymbol3DLayer
            | TextSymbol3DLayer,
          index: number
        ) => {
          if (symbolLayer.type === "fill") {
            symbol3DLayerCollectionForm.push(
              <CalciteBlock collapsible heading={`symbolLayers[${index}]`} key={index}>
                <CalciteAction
                  icon="trash"
                  onClick={() => deleteSymbol3DLayer(index)}
                  slot="control"
                  text="Delete"
                />
                <FillSymbol3DLayerForm
                  layerIndex={index}
                  handleCastShadowsChange={handleFillSymbol3DLayerCastShadowsChange}
                  handleFillSymbol3DLayerMaterialColorChange={
                    handleFillSymbol3DLayerMaterialColorChange
                  }
                  handleFillSymbol3DLayerMaterialColorMixModeChange={
                    handleFillSymbol3DLayerMaterialColorMixModeChange
                  }
                />
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
      <CalciteBlock style={blockStyles} collapsible heading={"symbolLayers"} open={true}>
        <CalciteAction
          onClick={() => addFillSymbol3DLayer()}
          slot="header-menu-actions"
          icon="plus"
          text-enabled
          text="Add FillSymbol3DLayer"
        ></CalciteAction>

        {createSymbol3DLayerCollectionForm()}
      </CalciteBlock>
    </React.Fragment>
  );
};

export default PolygonSymbol3DSymbolLayersForm;
