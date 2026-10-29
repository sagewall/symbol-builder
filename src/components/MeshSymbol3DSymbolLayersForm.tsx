import Color from "@arcgis/core/Color.js";
import Collection from "@arcgis/core/core/Collection.js";
import FillSymbol3DLayer from "@arcgis/core/symbols/FillSymbol3DLayer.js";
import SolidEdges3D from "@arcgis/core/symbols/edges/SolidEdges3D.js";
import type LineStylePattern3D from "@arcgis/core/symbols/patterns/LineStylePattern3D.js";
import StylePattern3D from "@arcgis/core/symbols/patterns/StylePattern3D.js";
import "@esri/calcite-components/components/calcite-action";
import "@esri/calcite-components/components/calcite-action-menu";
import "@esri/calcite-components/components/calcite-block";
import React, { useState } from "react";
import FillSymbol3DLayerForm from "./FillSymbol3DLayerForm";
import type { EmissiveChangeHandler } from "./Symbol3DEmissiveForm";
import type { EdgesChangeHandler } from "./Edges3DForm";
import { blockStyles } from "./lib/styles";
import { cloneSymbolLayers, getSymbolLayerKey } from "./lib/symbolLayerKeys";

interface Props {
  updateSymbolLayers: (newSymbolLayers: Collection) => void;
}

function MeshSymbol3DSymbolLayersForm({
  updateSymbolLayers,
}: Props): React.ReactElement {
  const createNewFillSymbol3DLayer = (): FillSymbol3DLayer => {
    const newFillSymbol3DLayer = new FillSymbol3DLayer({
      material: {
        color: "#007ac2",
        colorMixMode: "multiply",
      },
      edges: new SolidEdges3D({
        color: "#000000",
      }),
      pattern: new StylePattern3D({
        style: "solid",
      }),
    });
    return newFillSymbol3DLayer;
  };

  const [symbolLayers, setSymbolLayers] = useState(new Collection());

  const addFillSymbol3DLayer = (): void => {
    const newSymbolLayers = cloneSymbolLayers(symbolLayers);
    const fillSymbol3DLayer = createNewFillSymbol3DLayer();
    newSymbolLayers.add(fillSymbol3DLayer);
    setSymbolLayers(newSymbolLayers);
    updateSymbolLayers(newSymbolLayers);
  };

  const deleteSymbol3DLayer = (index: number): void => {
    const newSymbolLayers = cloneSymbolLayers(symbolLayers);
    newSymbolLayers.removeAt(index);
    setSymbolLayers(newSymbolLayers);
    updateSymbolLayers(newSymbolLayers);
  };

  const handleFillSymbol3DLayerCastShadowsChange = (
    layerIndex: number,
    value: boolean,
  ): void => {
    const newSymbolLayers = cloneSymbolLayers(symbolLayers);
    const symbolLayer = newSymbolLayers.getItemAt(
      layerIndex,
    ) as FillSymbol3DLayer;
    symbolLayer.castShadows = value;
    setSymbolLayers(newSymbolLayers);
    updateSymbolLayers(newSymbolLayers);
  };

  const handleFillSymbol3DLayerEdgesColorChange = (
    layerIndex: number,
    value: string,
  ): void => {
    const newSymbolLayers = cloneSymbolLayers(symbolLayers);
    const symbolLayer = newSymbolLayers.getItemAt(
      layerIndex,
    ) as FillSymbol3DLayer;
    if (symbolLayer.edges) {
      symbolLayer.edges.color = new Color(value);
    }
    setSymbolLayers(newSymbolLayers);
    updateSymbolLayers(newSymbolLayers);
  };

  const handleFillSymbol3DLayerEdgesExtensionLengthChange = (
    layerIndex: number,
    value: string,
  ): void => {
    const newSymbolLayers = cloneSymbolLayers(symbolLayers);
    const symbolLayer = newSymbolLayers.getItemAt(
      layerIndex,
    ) as FillSymbol3DLayer;
    if (symbolLayer.edges) {
      symbolLayer.edges.extensionLength = Number(value);
    }
    setSymbolLayers(newSymbolLayers);
    updateSymbolLayers(newSymbolLayers);
  };

  const handleFillSymbol3DLayerEdgesSizeChange = (
    layerIndex: number,
    value: string,
  ): void => {
    const newSymbolLayers = cloneSymbolLayers(symbolLayers);
    const symbolLayer = newSymbolLayers.getItemAt(
      layerIndex,
    ) as FillSymbol3DLayer;
    if (symbolLayer.edges) {
      symbolLayer.edges.size = Number(value);
    }
    setSymbolLayers(newSymbolLayers);
    updateSymbolLayers(newSymbolLayers);
  };

  const handleFillSymbol3DLayerMaterialColorChange = (
    layerIndex: number,
    value: string,
  ): void => {
    const newSymbolLayers = cloneSymbolLayers(symbolLayers);
    const symbolLayer = newSymbolLayers.getItemAt(
      layerIndex,
    ) as FillSymbol3DLayer;
    if (symbolLayer.material) {
      symbolLayer.material.color = new Color(value);
    }
    setSymbolLayers(newSymbolLayers);
    updateSymbolLayers(newSymbolLayers);
  };

  const handleFillSymbol3DLayerMaterialColorMixModeChange = (
    layerIndex: number,
    value: NonNullable<
      NonNullable<
        InstanceType<typeof FillSymbol3DLayer>["material"]
      >["colorMixMode"]
    >,
  ): void => {
    const newSymbolLayers = cloneSymbolLayers(symbolLayers);
    const symbolLayer = newSymbolLayers.getItemAt(
      layerIndex,
    ) as FillSymbol3DLayer;
    if (symbolLayer.material) {
      symbolLayer.material.colorMixMode = value;
    }
    setSymbolLayers(newSymbolLayers);
    updateSymbolLayers(newSymbolLayers);
  };

  const handleFillSymbol3DLayerOutlineColorChange = (
    layerIndex: number,
    value: string,
  ): void => {
    const newSymbolLayers = cloneSymbolLayers(symbolLayers);
    const symbolLayer = newSymbolLayers.getItemAt(
      layerIndex,
    ) as FillSymbol3DLayer;
    if (symbolLayer.outline) {
      symbolLayer.outline.color = new Color(value);
    }
    setSymbolLayers(newSymbolLayers);
    updateSymbolLayers(newSymbolLayers);
  };

  const handleFillSymbol3DLayerOutlinePatternChange = (
    layerIndex: number,
    value: InstanceType<typeof LineStylePattern3D>["style"],
  ): void => {
    const newSymbolLayers = cloneSymbolLayers(symbolLayers);
    const symbolLayer = newSymbolLayers.getItemAt(
      layerIndex,
    ) as FillSymbol3DLayer;
    if (symbolLayer.outline?.pattern) {
      symbolLayer.outline.pattern.style = value;
    }

    setSymbolLayers(newSymbolLayers);
    updateSymbolLayers(newSymbolLayers);
  };

  const handleFillSymbol3DLayerOutlinePatternCapChange = (
    layerIndex: number,
    value: NonNullable<
      NonNullable<
        InstanceType<typeof FillSymbol3DLayer>["outline"]
      >["patternCap"]
    >,
  ): void => {
    const newSymbolLayers = cloneSymbolLayers(symbolLayers);
    const symbolLayer = newSymbolLayers.getItemAt(
      layerIndex,
    ) as FillSymbol3DLayer;
    if (symbolLayer.outline) {
      symbolLayer.outline.patternCap = value;
    }
    setSymbolLayers(newSymbolLayers);
    updateSymbolLayers(newSymbolLayers);
  };

  const handleFillSymbol3DLayerOutlineSizeChange = (
    layerIndex: number,
    value: string,
  ): void => {
    const newSymbolLayers = cloneSymbolLayers(symbolLayers);
    const symbolLayer = newSymbolLayers.getItemAt(
      layerIndex,
    ) as FillSymbol3DLayer;
    if (symbolLayer.outline) {
      symbolLayer.outline.size = Number(value);
    }
    setSymbolLayers(newSymbolLayers);
    updateSymbolLayers(newSymbolLayers);
  };

  const handleFillSymbol3DLayerPatternStyleChange = (
    layerIndex: number,
    value: InstanceType<typeof StylePattern3D>["style"],
  ): void => {
    const newSymbolLayers = cloneSymbolLayers(symbolLayers);
    const symbolLayer = newSymbolLayers.getItemAt(
      layerIndex,
    ) as FillSymbol3DLayer;
    if (symbolLayer.pattern) {
      symbolLayer.pattern.style = value;
    }
    setSymbolLayers(newSymbolLayers);
    updateSymbolLayers(newSymbolLayers);
  };

  const handleEdgesChange: EdgesChangeHandler = (index, value) => {
    const layers = cloneSymbolLayers(symbolLayers);
    (layers.getItemAt(index) as FillSymbol3DLayer).edges = value;
    setSymbolLayers(layers);
    updateSymbolLayers(layers);
  };

  const handleMaterialEmissiveChange: EmissiveChangeHandler = (
    index,
    value,
  ) => {
    const layers = cloneSymbolLayers(symbolLayers);
    const layer = layers.getItemAt(index) as FillSymbol3DLayer;
    if (layer.material) layer.material.emissive = value;
    setSymbolLayers(layers);
    updateSymbolLayers(layers);
  };

  const createSymbol3DLayerCollectionForm = ():
    | React.ReactElement[]
    | undefined => {
    if (symbolLayers.length > 0) {
      const symbol3DLayerCollectionForm: React.ReactElement[] = [];

      symbolLayers.forEach(
        (symbolLayer: FillSymbol3DLayer, index: number): void => {
          if (symbolLayer.type === "fill") {
            symbol3DLayerCollectionForm.push(
              <calcite-block
                expandable
                heading={`symbolLayers[${index}]`}
                key={getSymbolLayerKey(symbolLayer)}
              >
                <calcite-action
                  icon="trash"
                  onClick={() => deleteSymbol3DLayer(index)}
                  slot="actions-end"
                  text="Delete"
                ></calcite-action>

                <FillSymbol3DLayerForm
                  edges={symbolLayer.edges}
                  handleEdgesChange={handleEdgesChange}
                  handleMaterialEmissiveChange={handleMaterialEmissiveChange}
                  layerIndex={index}
                  isMeshSymbol3D={true}
                  handleCastShadowsChange={
                    handleFillSymbol3DLayerCastShadowsChange
                  }
                  handleFillSymbol3DLayerEdgesColorChange={
                    handleFillSymbol3DLayerEdgesColorChange
                  }
                  handleFillSymbol3DLayerEdgesExtensionLengthChange={
                    handleFillSymbol3DLayerEdgesExtensionLengthChange
                  }
                  handleFillSymbol3DLayerEdgesSizeChange={
                    handleFillSymbol3DLayerEdgesSizeChange
                  }
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
                  handleFillSymbol3DLayerOutlineSizeChange={
                    handleFillSymbol3DLayerOutlineSizeChange
                  }
                  handleFillSymbol3DLayerPatternStyleChange={
                    handleFillSymbol3DLayerPatternStyleChange
                  }
                ></FillSymbol3DLayerForm>
              </calcite-block>,
            );
          }
        },
      );
      return symbol3DLayerCollectionForm;
    }
  };

  return (
    <>
      <calcite-block
        style={blockStyles}
        expandable
        heading={"symbolLayers"}
        expanded
      >
        <calcite-action-menu
          label="Add symbol layer"
          placement="bottom-end"
          slot="actions-end"
        >
          <calcite-action
            icon="add-layer"
            label="Add symbol layer"
            slot="trigger"
            text="Add layer"
          ></calcite-action>
          <calcite-action
            onClick={() => addFillSymbol3DLayer()}
            icon="cube"
            label="Add FillSymbol3DLayer"
            text-enabled
            text="Add FillSymbol3DLayer"
          ></calcite-action>
        </calcite-action-menu>

        {createSymbol3DLayerCollectionForm()}
      </calcite-block>
    </>
  );
}

export default MeshSymbol3DSymbolLayersForm;
