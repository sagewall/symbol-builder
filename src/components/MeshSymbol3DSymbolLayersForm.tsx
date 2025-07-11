import Color from "@arcgis/core/Color";
import Collection from "@arcgis/core/core/Collection";
import FillSymbol3DLayer from "@arcgis/core/symbols/FillSymbol3DLayer";
import SolidEdges3D from "@arcgis/core/symbols/edges/SolidEdges3D";
import type LineStylePattern3D from "@arcgis/core/symbols/patterns/LineStylePattern3D";
import StylePattern3D from "@arcgis/core/symbols/patterns/StylePattern3D";
import React, { useState } from "react";
import FillSymbol3DLayerForm from "./FillSymbol3DLayerForm";
import { blockStyles, chipStyles } from "./lib/styles";

interface PageProps {
  updateSymbolLayers: (newSymbolLayers: Collection) => void;
}

const MeshSymbol3DSymbolLayersForm = ({ updateSymbolLayers }: PageProps) => {
  const createNewFillSymbol3DLayer = (): FillSymbol3DLayer => {
    const newFillSymbol3DLayer = new FillSymbol3DLayer({
      material: {
        color: "#007ac2",
        colorMixMode: "multiply"
      },
      edges: new SolidEdges3D({
        color: "#000000"
      }),
      pattern: new StylePattern3D({
        style: "solid"
      })
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

  const handleFillSymbol3DLayerEdgesColorChange = (layerIndex: number, value: string) => {
    const newSymbolLayers = symbolLayers.clone();
    const symbolLayer = newSymbolLayers.getItemAt(layerIndex) as FillSymbol3DLayer;
    if (symbolLayer.edges) {
      symbolLayer.edges.color = new Color(value);
    }
    setSymbolLayers(newSymbolLayers);
    updateSymbolLayers(newSymbolLayers);
  };

  const handleFillSymbol3DLayerEdgesExtensionLengthChange = (layerIndex: number, value: string) => {
    const newSymbolLayers = symbolLayers.clone();
    const symbolLayer = newSymbolLayers.getItemAt(layerIndex) as FillSymbol3DLayer;
    if (symbolLayer.edges) {
      symbolLayer.edges.extensionLength = Number(value);
    }
    setSymbolLayers(newSymbolLayers);
    updateSymbolLayers(newSymbolLayers);
  };

  const handleFillSymbol3DLayerEdgesSizeChange = (layerIndex: number, value: string) => {
    const newSymbolLayers = symbolLayers.clone();
    const symbolLayer = newSymbolLayers.getItemAt(layerIndex) as FillSymbol3DLayer;
    if (symbolLayer.edges) {
      symbolLayer.edges.size = Number(value);
    }
    setSymbolLayers(newSymbolLayers);
    updateSymbolLayers(newSymbolLayers);
  };

  const handleFillSymbol3DLayerMaterialColorChange = (layerIndex: number, value: string) => {
    const newSymbolLayers = symbolLayers.clone();
    const symbolLayer = newSymbolLayers.getItemAt(layerIndex) as FillSymbol3DLayer;
    if (symbolLayer.material) {
      symbolLayer.material.color = new Color(value);
    }
    setSymbolLayers(newSymbolLayers);
    updateSymbolLayers(newSymbolLayers);
  };

  const handleFillSymbol3DLayerMaterialColorMixModeChange = (
    layerIndex: number,
    value: NonNullable<
      NonNullable<InstanceType<typeof FillSymbol3DLayer>["material"]>["colorMixMode"]
    >
  ) => {
    const newSymbolLayers = symbolLayers.clone();
    const symbolLayer = newSymbolLayers.getItemAt(layerIndex) as FillSymbol3DLayer;
    if (symbolLayer.material) {
      symbolLayer.material.colorMixMode = value;
    }
    setSymbolLayers(newSymbolLayers);
    updateSymbolLayers(newSymbolLayers);
  };

  const handleFillSymbol3DLayerOutlineColorChange = (layerIndex: number, value: string) => {
    const newSymbolLayers = symbolLayers.clone();
    const symbolLayer = newSymbolLayers.getItemAt(layerIndex) as FillSymbol3DLayer;
    if (symbolLayer.outline) {
      symbolLayer.outline.color = new Color(value);
    }
    setSymbolLayers(newSymbolLayers);
    updateSymbolLayers(newSymbolLayers);
  };

  const handleFillSymbol3DLayerOutlinePatternChange = (
    layerIndex: number,
    value: InstanceType<typeof LineStylePattern3D>["style"]
  ) => {
    const newSymbolLayers = symbolLayers.clone();
    const symbolLayer = newSymbolLayers.getItemAt(layerIndex) as FillSymbol3DLayer;
    if (symbolLayer.outline?.pattern) {
      symbolLayer.outline.pattern.style = value;
    }

    setSymbolLayers(newSymbolLayers);
    updateSymbolLayers(newSymbolLayers);
  };

  const handleFillSymbol3DLayerOutlinePatternCapChange = (
    layerIndex: number,
    value: NonNullable<NonNullable<InstanceType<typeof FillSymbol3DLayer>["outline"]>["patternCap"]>
  ) => {
    const newSymbolLayers = symbolLayers.clone();
    const symbolLayer = newSymbolLayers.getItemAt(layerIndex) as FillSymbol3DLayer;
    if (symbolLayer.outline) {
      symbolLayer.outline.patternCap = value;
    }
    setSymbolLayers(newSymbolLayers);
    updateSymbolLayers(newSymbolLayers);
  };

  const handleFillSymbol3DLayerOutlineSizeChange = (layerIndex: number, value: string) => {
    const newSymbolLayers = symbolLayers.clone();
    const symbolLayer = newSymbolLayers.getItemAt(layerIndex) as FillSymbol3DLayer;
    if (symbolLayer.outline) {
      symbolLayer.outline.size = Number(value);
    }
    setSymbolLayers(newSymbolLayers);
    updateSymbolLayers(newSymbolLayers);
  };

  const handleFillSymbol3DLayerPatternStyleChange = (
    layerIndex: number,
    value: InstanceType<typeof StylePattern3D>["style"]
  ) => {
    const newSymbolLayers = symbolLayers.clone();
    const symbolLayer = newSymbolLayers.getItemAt(layerIndex) as FillSymbol3DLayer;
    if (symbolLayer.pattern) {
      symbolLayer.pattern.style = value;
    }
    setSymbolLayers(newSymbolLayers);
    updateSymbolLayers(newSymbolLayers);
  };

  const createSymbol3DLayerCollectionForm = () => {
    if (symbolLayers.length > 0) {
      const symbol3DLayerCollectionForm: React.JSX.Element[] = [];

      symbolLayers.map((symbolLayer: FillSymbol3DLayer, index: number) => {
        if (symbolLayer.type === "fill") {
          symbol3DLayerCollectionForm.push(
            <calcite-block collapsible heading={`symbolLayers[${index}]`} key={index}>
              {index === symbolLayers.length - 1 && (
                <calcite-action
                  icon="trash"
                  onClick={() => deleteSymbol3DLayer(index)}
                  slot="control"
                  text="Delete"
                ></calcite-action>
              )}
              <FillSymbol3DLayerForm
                layerIndex={index}
                isMeshSymbol3D={true}
                handleCastShadowsChange={handleFillSymbol3DLayerCastShadowsChange}
                handleFillSymbol3DLayerEdgesColorChange={handleFillSymbol3DLayerEdgesColorChange}
                handleFillSymbol3DLayerEdgesExtensionLengthChange={
                  handleFillSymbol3DLayerEdgesExtensionLengthChange
                }
                handleFillSymbol3DLayerEdgesSizeChange={handleFillSymbol3DLayerEdgesSizeChange}
                handleFillSymbol3DLayerMaterialColorChange={
                  handleFillSymbol3DLayerMaterialColorChange
                }
                handleFillSymbol3DLayerMaterialColorMixModeChange={
                  handleFillSymbol3DLayerMaterialColorMixModeChange
                }
                handleFillSymbol3DLayerOutlineColorChange={
                  handleFillSymbol3DLayerOutlineColorChange
                }
                handleFillSymbol3DLayerOutlinePatternStyleChange={
                  handleFillSymbol3DLayerOutlinePatternChange
                }
                handleFillSymbol3DLayerOutlinePatternCapChange={
                  handleFillSymbol3DLayerOutlinePatternCapChange
                }
                handleFillSymbol3DLayerOutlineSizeChange={handleFillSymbol3DLayerOutlineSizeChange}
                handleFillSymbol3DLayerPatternStyleChange={
                  handleFillSymbol3DLayerPatternStyleChange
                }
              ></FillSymbol3DLayerForm>
            </calcite-block>
          );
        }
      });
      return symbol3DLayerCollectionForm;
    }
  };

  return (
    <React.Fragment>
      <calcite-block style={blockStyles} collapsible heading={"symbolLayers"} expanded>
        <calcite-chip
          id="add-layer-chip"
          icon="add-layer"
          label="Add layer"
          slot="control"
          value="Information"
          style={chipStyles}
        ></calcite-chip>
        <calcite-tooltip reference-element={"add-layer-chip"}>
          <span>Add symbol layer by opening the dropdown menu on the right</span>
        </calcite-tooltip>

        <calcite-action
          onClick={() => addFillSymbol3DLayer()}
          slot="header-menu-actions"
          icon="cube"
          text-enabled
          text="Add FillSymbol3DLayer"
        ></calcite-action>

        {createSymbol3DLayerCollectionForm()}
      </calcite-block>
    </React.Fragment>
  );
};

export default MeshSymbol3DSymbolLayersForm;
