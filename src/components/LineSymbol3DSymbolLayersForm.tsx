import Color from "@arcgis/core/Color";
import Collection from "@arcgis/core/core/Collection";
import LineStyleMarker3D from "@arcgis/core/symbols/LineStyleMarker3D";
import LineSymbol3DLayer from "@arcgis/core/symbols/LineSymbol3DLayer";
import PathSymbol3DLayer from "@arcgis/core/symbols/PathSymbol3DLayer";
import LineStylePattern3D from "@arcgis/core/symbols/patterns/LineStylePattern3D";
import {
  CalciteAction,
  CalciteBlock,
  CalciteChip,
  CalciteTooltip
} from "@esri/calcite-components-react";
import React, { useState } from "react";
import LineSymbol3DLayerForm from "./LineSymbol3DLayerForm";
import PathSymbol3DLayerForm from "./PathSymbol3DLayerForm";
import { blockStyles, chipStyles } from "./lib/styles";

interface PageProps {
  updateSymbolLayers: (newSymbolLayers: Collection) => void;
}

const LineSymbol3DSymbolLayersForm = ({ updateSymbolLayers }: PageProps) => {
  const createNewLineSymbol3DLayer = (): LineSymbol3DLayer => {
    const newLineSymbol3DLayer = new LineSymbol3DLayer({
      material: { color: "#007ac2" },
      pattern: new LineStylePattern3D(),
      size: 3
    });
    return newLineSymbol3DLayer;
  };

  const createNewPathSymbol3DLayer = (): PathSymbol3DLayer => {
    const newPathSymbol3DLayer = new PathSymbol3DLayer({
      castShadows: true,
      height: 5,
      material: { color: "#007ac2" },
      profile: "quad",
      width: 3
    });
    return newPathSymbol3DLayer;
  };

  const [symbolLayers, setSymbolLayers] = useState(new Collection());

  const addLineSymbol3DLayer = () => {
    const newSymbolLayers = symbolLayers.clone();
    const lineSymbol3DLayer = createNewLineSymbol3DLayer();
    newSymbolLayers.add(lineSymbol3DLayer);
    setSymbolLayers(newSymbolLayers);
    updateSymbolLayers(newSymbolLayers);
  };

  const addPathSymbol3DLayer = () => {
    const newSymbolLayers = symbolLayers.clone();
    const pathSymbol3DLayer = createNewPathSymbol3DLayer();
    newSymbolLayers.add(pathSymbol3DLayer);
    setSymbolLayers(newSymbolLayers);
    updateSymbolLayers(newSymbolLayers);
  };

  const deleteSymbol3DLayer = (index: number) => {
    const newSymbolLayers = symbolLayers.clone();
    newSymbolLayers.removeAt(index);
    setSymbolLayers(newSymbolLayers);
    updateSymbolLayers(newSymbolLayers);
  };

  const handleLineSymbol3DLayerCapChange = (layerIndex: number, value: string) => {
    const newSymbolLayers = symbolLayers.clone();
    const symbolLayer = newSymbolLayers.getItemAt(layerIndex) as LineSymbol3DLayer;
    symbolLayer.cap = value as InstanceType<typeof LineSymbol3DLayer>["cap"];
    setSymbolLayers(newSymbolLayers);
    updateSymbolLayers(newSymbolLayers);
  };

  const handleLineSymbol3DLayerJoinChange = (layerIndex: number, value: string) => {
    const newSymbolLayers = symbolLayers.clone();
    const symbolLayer = newSymbolLayers.getItemAt(layerIndex) as LineSymbol3DLayer;
    symbolLayer.join = value as InstanceType<typeof LineSymbol3DLayer>["join"];
    setSymbolLayers(newSymbolLayers);
    updateSymbolLayers(newSymbolLayers);
  };

  const handleLineSymbol3DLayerMarkerBlockToggle = (
    layerIndex: number,
    currentMarkerBlock: HTMLCalciteBlockElement
  ) => {
    const newSymbolLayers = symbolLayers.clone();
    const symbolLayer = newSymbolLayers.getItemAt(layerIndex) as LineSymbol3DLayer;
    if (currentMarkerBlock.open && !symbolLayer.marker) {
      symbolLayer.marker = new LineStyleMarker3D({
        color: "#007ac2",
        placement: "begin-end",
        style: "arrow"
      });
    }
    setSymbolLayers(newSymbolLayers);
    updateSymbolLayers(newSymbolLayers);
  };

  const handleLineSymbol3DLayerMarkerColorChange = (layerIndex: number, value: string) => {
    const newSymbolLayers = symbolLayers.clone();
    const symbolLayer = newSymbolLayers.getItemAt(layerIndex) as LineSymbol3DLayer;
    symbolLayer.marker.color = new Color(value);
    setSymbolLayers(newSymbolLayers);
    updateSymbolLayers(newSymbolLayers);
  };

  const handleLineSymbol3DLayerMarkerPlacementChange = (layerIndex: number, value: string) => {
    const newSymbolLayers = symbolLayers.clone();
    const symbolLayer = newSymbolLayers.getItemAt(layerIndex) as LineSymbol3DLayer;
    symbolLayer.marker.placement = value as InstanceType<typeof LineStyleMarker3D>["placement"];
    setSymbolLayers(newSymbolLayers);
    updateSymbolLayers(newSymbolLayers);
  };

  const handleLineSymbol3DLayerMarkerStyleChange = (layerIndex: number, value: string) => {
    const newSymbolLayers = symbolLayers.clone();
    const symbolLayer = newSymbolLayers.getItemAt(layerIndex) as LineSymbol3DLayer;
    symbolLayer.marker.style = value as InstanceType<typeof LineStyleMarker3D>["style"];
    setSymbolLayers(newSymbolLayers);
    updateSymbolLayers(newSymbolLayers);
  };

  const handleLineSymbol3DLayerMaterialColorChange = (layerIndex: number, value: string) => {
    const newSymbolLayers = symbolLayers.clone();
    const symbolLayer = newSymbolLayers.getItemAt(layerIndex) as LineSymbol3DLayer;
    symbolLayer.material.color = new Color(value);
    setSymbolLayers(newSymbolLayers);
    updateSymbolLayers(newSymbolLayers);
  };

  const handleLineSymbol3DLayerPatternStyleChange = (layerIndex: number, value: string) => {
    const newSymbolLayers = symbolLayers.clone();
    const symbolLayer = newSymbolLayers.getItemAt(layerIndex) as LineSymbol3DLayer;
    symbolLayer.pattern.style = value as InstanceType<typeof LineStylePattern3D>["style"];
    setSymbolLayers(newSymbolLayers);
    updateSymbolLayers(newSymbolLayers);
  };

  const handleLineSymbol3DLayerSizeChange = (layerIndex: number, value: string) => {
    const newSymbolLayers = symbolLayers.clone();
    const symbolLayer = newSymbolLayers.getItemAt(layerIndex) as LineSymbol3DLayer;
    symbolLayer.size = Number(value);
    setSymbolLayers(newSymbolLayers);
    updateSymbolLayers(newSymbolLayers);
  };

  const handlePathSymbol3DLayerAnchorChange = (layerIndex: number, value: string) => {
    const newSymbolLayers = symbolLayers.clone();
    const symbolLayer = newSymbolLayers.getItemAt(layerIndex) as PathSymbol3DLayer;
    symbolLayer.anchor = value as InstanceType<typeof PathSymbol3DLayer>["anchor"];
    setSymbolLayers(newSymbolLayers);
    updateSymbolLayers(newSymbolLayers);
  };

  const handlePathSymbol3DLayerCapChange = (layerIndex: number, value: string) => {
    const newSymbolLayers = symbolLayers.clone();
    const symbolLayer = newSymbolLayers.getItemAt(layerIndex) as PathSymbol3DLayer;
    symbolLayer.cap = value as InstanceType<typeof PathSymbol3DLayer>["cap"];
    setSymbolLayers(newSymbolLayers);
    updateSymbolLayers(newSymbolLayers);
  };

  const handlePathSymbol3DLayerCastShadowsChange = (layerIndex: number, value: boolean) => {
    const newSymbolLayers = symbolLayers.clone();
    const symbolLayer = newSymbolLayers.getItemAt(layerIndex) as PathSymbol3DLayer;
    symbolLayer.castShadows = value;
    setSymbolLayers(newSymbolLayers);
    updateSymbolLayers(newSymbolLayers);
  };

  const handlePathSymbol3DLayerHeightChange = (layerIndex: number, value: string) => {
    const newSymbolLayers = symbolLayers.clone();
    const symbolLayer = newSymbolLayers.getItemAt(layerIndex) as PathSymbol3DLayer;
    symbolLayer.height = Number(value);
    setSymbolLayers(newSymbolLayers);
    updateSymbolLayers(newSymbolLayers);
  };

  const handlePathSymbol3DLayerJoinChange = (layerIndex: number, value: string) => {
    const newSymbolLayers = symbolLayers.clone();
    const symbolLayer = newSymbolLayers.getItemAt(layerIndex) as PathSymbol3DLayer;
    symbolLayer.join = value as InstanceType<typeof PathSymbol3DLayer>["join"];
    setSymbolLayers(newSymbolLayers);
    updateSymbolLayers(newSymbolLayers);
  };

  const handlePathSymbol3DLayerMaterialColorChange = (layerIndex: number, value: string) => {
    const newSymbolLayers = symbolLayers.clone();
    const symbolLayer = newSymbolLayers.getItemAt(layerIndex) as PathSymbol3DLayer;
    symbolLayer.material.color = new Color(value);
    setSymbolLayers(newSymbolLayers);
    updateSymbolLayers(newSymbolLayers);
  };

  const handlePathSymbol3DLayerProfileChange = (layerIndex: number, value: string) => {
    const newSymbolLayers = symbolLayers.clone();
    const symbolLayer = newSymbolLayers.getItemAt(layerIndex) as PathSymbol3DLayer;
    symbolLayer.profile = value as InstanceType<typeof PathSymbol3DLayer>["profile"];
    setSymbolLayers(newSymbolLayers);
    updateSymbolLayers(newSymbolLayers);
  };

  const handlePathSymbol3DLayerProfileRotationChange = (layerIndex: number, value: string) => {
    const newSymbolLayers = symbolLayers.clone();
    const symbolLayer = newSymbolLayers.getItemAt(layerIndex) as PathSymbol3DLayer;
    symbolLayer.profileRotation = value as InstanceType<
      typeof PathSymbol3DLayer
    >["profileRotation"];
    setSymbolLayers(newSymbolLayers);
    updateSymbolLayers(newSymbolLayers);
  };

  const handlePathSymbol3DLayerWidthChange = (layerIndex: number, value: string) => {
    const newSymbolLayers = symbolLayers.clone();
    const symbolLayer = newSymbolLayers.getItemAt(layerIndex) as PathSymbol3DLayer;
    symbolLayer.width = Number(value);
    setSymbolLayers(newSymbolLayers);
    updateSymbolLayers(newSymbolLayers);
  };

  const createSymbol3DLayerCollectionForm = () => {
    if (symbolLayers.length > 0) {
      const symbol3DLayerCollectionForm: JSX.Element[] = [];

      symbolLayers.map((symbolLayer: LineSymbol3DLayer | PathSymbol3DLayer, index: number) => {
        if (symbolLayer.type === "line") {
          symbol3DLayerCollectionForm.push(
            <CalciteBlock collapsible heading={`symbolLayers[${index}]`} key={index}>
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
                handleLineSymbol3DLayerMarkerBlockToggle={handleLineSymbol3DLayerMarkerBlockToggle}
                handleLineSymbol3DLayerMarkerColorChange={handleLineSymbol3DLayerMarkerColorChange}
                handleLineSymbol3DLayerMarkerPlacementChange={
                  handleLineSymbol3DLayerMarkerPlacementChange
                }
                handleLineSymbol3DLayerMarkerStyleChange={handleLineSymbol3DLayerMarkerStyleChange}
                handleLineSymbol3DLayerMaterialColorChange={
                  handleLineSymbol3DLayerMaterialColorChange
                }
                handleLineSymbol3DLayerPatternStyleChange={
                  handleLineSymbol3DLayerPatternStyleChange
                }
                handleSizeChange={handleLineSymbol3DLayerSizeChange}
              />
            </CalciteBlock>
          );
        }

        if (symbolLayer.type === "path") {
          symbol3DLayerCollectionForm.push(
            <CalciteBlock collapsible heading={`symbolLayers[${index}]`} key={index}>
              <CalciteAction
                icon="trash"
                onClick={() => deleteSymbol3DLayer(index)}
                slot="control"
                text="Delete"
              />
              <PathSymbol3DLayerForm
                layerIndex={index}
                handleAnchorChange={handlePathSymbol3DLayerAnchorChange}
                handleCapChange={handlePathSymbol3DLayerCapChange}
                handleCastShadowsChange={handlePathSymbol3DLayerCastShadowsChange}
                handleHeightChange={handlePathSymbol3DLayerHeightChange}
                handleJoinChange={handlePathSymbol3DLayerJoinChange}
                handlePathSymbol3DLayerMaterialColorChange={
                  handlePathSymbol3DLayerMaterialColorChange
                }
                handleProfileChange={handlePathSymbol3DLayerProfileChange}
                handleProfileRotationChange={handlePathSymbol3DLayerProfileRotationChange}
                handleWidthChange={handlePathSymbol3DLayerWidthChange}
              ></PathSymbol3DLayerForm>
            </CalciteBlock>
          );
        }
      });
      return symbol3DLayerCollectionForm;
    }
  };

  return (
    <React.Fragment>
      <CalciteBlock style={blockStyles} collapsible heading={"symbolLayers"} open={true}>
        <CalciteChip
          id="add-layer-chip"
          icon="add-layer"
          slot="control"
          value="Information"
          style={chipStyles}
        ></CalciteChip>
        <CalciteTooltip label="add-layer" reference-element={"add-layer-chip"}>
          <span>Add symbol layer by opening the dropdown menu on the right</span>
        </CalciteTooltip>

        <CalciteAction
          onClick={() => addLineSymbol3DLayer()}
          slot="header-menu-actions"
          icon="line"
          text-enabled
          text="Add LineSymbol3DLayer"
        ></CalciteAction>

        <CalciteAction
          onClick={() => addPathSymbol3DLayer()}
          slot="header-menu-actions"
          icon="line"
          text-enabled
          text="Add PathSymbol3DLayer"
        ></CalciteAction>

        {createSymbol3DLayerCollectionForm()}
      </CalciteBlock>
    </React.Fragment>
  );
};

export default LineSymbol3DSymbolLayersForm;
