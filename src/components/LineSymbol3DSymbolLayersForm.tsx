import Color from "@arcgis/core/Color";
import Collection from "@arcgis/core/core/Collection";
import LineSymbol3DLayer from "@arcgis/core/symbols/LineSymbol3DLayer";
import PathSymbol3DLayer from "@arcgis/core/symbols/PathSymbol3DLayer";
import { CalciteAction, CalciteBlock } from "@esri/calcite-components-react";
import React, { useState } from "react";
import { blockStyles } from "./lib/styles";
import { LineSymbol3DCapOption, LineSymbol3DJoinOption } from "./lib/types";
import LineSymbol3DLayerForm from "./LineSymbol3DLayerForm";

interface PageProps {
  updateSymbolLayers: (newSymbolLayers: Collection) => void;
}
const LineSymbol3DSymbolLayersForm = ({ updateSymbolLayers }: PageProps) => {
  const createNewLineSymbol3DLayer = (): LineSymbol3DLayer => {
    const newLineSymbol3DLayer = new LineSymbol3DLayer({
      material: { color: "#007ac2" },
      size: 3,
    });
    return newLineSymbol3DLayer;
  };

  const [symbolLayers, setSymbolLayers] = useState(new Collection());

  const addLineSymbol3DLayer = () => {
    const newSymbolLayers = symbolLayers.clone();
    const lineSymbol3DLayer = createNewLineSymbol3DLayer();
    newSymbolLayers.add(lineSymbol3DLayer);
    setSymbolLayers(newSymbolLayers);
    updateSymbolLayers(newSymbolLayers);
  };

  const deleteSymbol3DLayer = (index: number) => {
    const newSymbolLayers = symbolLayers.clone();
    newSymbolLayers.removeAt(index);
    setSymbolLayers(newSymbolLayers);
    updateSymbolLayers(newSymbolLayers);
  };

  const handleLineSymbol3DLayerCapChange = (
    layerIndex: number,
    value: string
  ) => {
    const newSymbolLayers = symbolLayers.clone();
    const symbolLayer = newSymbolLayers.getItemAt(
      layerIndex
    ) as LineSymbol3DLayer;
    symbolLayer.cap = value as LineSymbol3DCapOption;
    setSymbolLayers(newSymbolLayers);
    updateSymbolLayers(newSymbolLayers);
  };

  const handleLineSymbol3DLayerJoinChange = (
    layerIndex: number,
    value: string
  ) => {
    const newSymbolLayers = symbolLayers.clone();
    const symbolLayer = newSymbolLayers.getItemAt(
      layerIndex
    ) as LineSymbol3DLayer;
    symbolLayer.join = value as LineSymbol3DJoinOption;
    setSymbolLayers(newSymbolLayers);
    updateSymbolLayers(newSymbolLayers);
  };

  const handleLineSymbol3DLayerMaterialColorChange = (
    layerIndex: number,
    value: string
  ) => {
    const newSymbolLayers = symbolLayers.clone();
    const symbolLayer = newSymbolLayers.getItemAt(
      layerIndex
    ) as LineSymbol3DLayer;
    symbolLayer.material.color = new Color(value);
    setSymbolLayers(newSymbolLayers);
    updateSymbolLayers(newSymbolLayers);
  };

  const handleLineSymbol3DLayerSizeChange = (
    layerIndex: number,
    value: string
  ) => {
    const newSymbolLayers = symbolLayers.clone();
    const symbolLayer = newSymbolLayers.getItemAt(
      layerIndex
    ) as LineSymbol3DLayer;
    symbolLayer.size = Number(value);
    setSymbolLayers(newSymbolLayers);
    updateSymbolLayers(newSymbolLayers);
  };

  const createSymbol3DLayerCollectionForm = () => {
    if (symbolLayers.length > 0) {
      const symbol3DLayerCollectionForm: JSX.Element[] = [];

      symbolLayers.map(
        (symbolLayer: LineSymbol3DLayer | PathSymbol3DLayer, index: number) => {
          if (symbolLayer.type === "line") {
            symbol3DLayerCollectionForm.push(
              <CalciteBlock
                collapsible
                heading={`symbolLayers[${index}]`}
                key={index}
              >
                <CalciteAction
                  icon="trash"
                  onClick={() => deleteSymbol3DLayer(index)}
                  slot="control"
                  text="Delete"
                />
                <LineSymbol3DLayerForm
                  layerIndex={index}
                  handleCapChange={handleLineSymbol3DLayerCapChange}
                  handleJoinChange={handleLineSymbol3DLayerJoinChange}
                  handleLineSymbol3DLayerMaterialColorChange={
                    handleLineSymbol3DLayerMaterialColorChange
                  }
                  handleSizeChange={handleLineSymbol3DLayerSizeChange}
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
      <CalciteBlock
        style={blockStyles}
        collapsible
        heading={"symbolLayers"}
        open={true}
      >
        <CalciteAction
          onClick={() => addLineSymbol3DLayer()}
          slot="header-menu-actions"
          icon="plus"
          text-enabled
          text="Add LineSymbol3DLayer"
        ></CalciteAction>

        {createSymbol3DLayerCollectionForm()}
      </CalciteBlock>
    </React.Fragment>
  );
};

export default LineSymbol3DSymbolLayersForm;
