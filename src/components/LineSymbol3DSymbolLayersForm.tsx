import Color from "@arcgis/core/Color.js";
import Collection from "@arcgis/core/core/Collection.js";
import LineStyleMarker3D from "@arcgis/core/symbols/LineStyleMarker3D.js";
import LineSymbol3DLayer from "@arcgis/core/symbols/LineSymbol3DLayer.js";
import PathSymbol3DLayer from "@arcgis/core/symbols/PathSymbol3DLayer.js";
import LineStylePattern3D from "@arcgis/core/symbols/patterns/LineStylePattern3D.js";
import "@esri/calcite-components/components/calcite-action";
import "@esri/calcite-components/components/calcite-action-menu";
import "@esri/calcite-components/components/calcite-block";
import React, { useState } from "react";
import { blockStyles } from "./lib/styles";
import { cloneSymbolLayers, getSymbolLayerKey } from "./lib/symbolLayerKeys";
import LineSymbol3DLayerForm from "./LineSymbol3DLayerForm";
import PathSymbol3DLayerForm from "./PathSymbol3DLayerForm";
import type { EmissiveChangeHandler } from "./Symbol3DEmissiveForm";
import type { LinePatternChangeHandler } from "./LinePattern3DForm";

interface Props {
  updateSymbolLayers: (newSymbolLayers: Collection) => void;
}

function LineSymbol3DSymbolLayersForm({
  updateSymbolLayers,
}: Props): React.ReactElement {
  const createNewLineSymbol3DLayer = (): LineSymbol3DLayer => {
    const newLineSymbol3DLayer = new LineSymbol3DLayer({
      material: { color: "#007ac2" },
      pattern: new LineStylePattern3D(),
      size: 3,
    });
    return newLineSymbol3DLayer;
  };

  const createNewPathSymbol3DLayer = (): PathSymbol3DLayer => {
    const newPathSymbol3DLayer = new PathSymbol3DLayer({
      castShadows: true,
      height: 5,
      material: { color: "#007ac2" },
      profile: "quad",
      width: 3,
    });
    return newPathSymbol3DLayer;
  };

  const [symbolLayers, setSymbolLayers] = useState(new Collection());

  const [lineStyleMarker3Ds, setLineStyleMarker3Ds] = useState<
    Map<number, LineStyleMarker3D>
  >(() => new Map());

  const addLineSymbol3DLayer = (): void => {
    const newSymbolLayers = cloneSymbolLayers(symbolLayers);
    const lineSymbol3DLayer = createNewLineSymbol3DLayer();
    newSymbolLayers.add(lineSymbol3DLayer);
    setSymbolLayers(newSymbolLayers);
    updateSymbolLayers(newSymbolLayers);

    const newLineStyleMarker3D = new LineStyleMarker3D({
      color: "#007ac2",
      placement: "begin-end",
      style: "arrow",
    });
    const newLineStyleMarker3Ds = new Map(lineStyleMarker3Ds);
    newLineStyleMarker3Ds.set(
      getSymbolLayerKey(lineSymbol3DLayer),
      newLineStyleMarker3D,
    );
    setLineStyleMarker3Ds(newLineStyleMarker3Ds);
  };

  const addPathSymbol3DLayer = (): void => {
    const newSymbolLayers = cloneSymbolLayers(symbolLayers);
    const pathSymbol3DLayer = createNewPathSymbol3DLayer();
    newSymbolLayers.add(pathSymbol3DLayer);
    setSymbolLayers(newSymbolLayers);
    updateSymbolLayers(newSymbolLayers);
  };

  const deleteSymbol3DLayer = (index: number): void => {
    const newSymbolLayers = cloneSymbolLayers(symbolLayers);
    newSymbolLayers.removeAt(index);
    const removedLayer = symbolLayers.getItemAt(index);
    if (removedLayer?.type === "line") {
      const newLineStyleMarker3Ds = new Map(lineStyleMarker3Ds);
      newLineStyleMarker3Ds.delete(getSymbolLayerKey(removedLayer));
      setLineStyleMarker3Ds(newLineStyleMarker3Ds);
    }
    setSymbolLayers(newSymbolLayers);
    updateSymbolLayers(newSymbolLayers);
  };

  const handleLineSymbol3DLayerCapChange = (
    layerIndex: number,
    value: string,
  ): void => {
    const newSymbolLayers = cloneSymbolLayers(symbolLayers);
    const symbolLayer = newSymbolLayers.getItemAt(
      layerIndex,
    ) as LineSymbol3DLayer;
    symbolLayer.cap = value as InstanceType<typeof LineSymbol3DLayer>["cap"];
    setSymbolLayers(newSymbolLayers);
    updateSymbolLayers(newSymbolLayers);
  };

  const handleLineSymbol3DLayerJoinChange = (
    layerIndex: number,
    value: string,
  ): void => {
    const newSymbolLayers = cloneSymbolLayers(symbolLayers);
    const symbolLayer = newSymbolLayers.getItemAt(
      layerIndex,
    ) as LineSymbol3DLayer;
    symbolLayer.join = value as InstanceType<typeof LineSymbol3DLayer>["join"];
    setSymbolLayers(newSymbolLayers);
    updateSymbolLayers(newSymbolLayers);
  };

  const handleLineSymbol3DLayerMarkerBlockToggle = (
    layerIndex: number,
    currentMarkerBlock: HTMLCalciteBlockElement,
  ): void => {
    const newSymbolLayers = cloneSymbolLayers(symbolLayers);
    const symbolLayer = newSymbolLayers.getItemAt(
      layerIndex,
    ) as LineSymbol3DLayer;
    const key = getSymbolLayerKey(symbolLayer);
    if (currentMarkerBlock.expanded && !symbolLayer.marker) {
      symbolLayer.marker =
        lineStyleMarker3Ds.get(key)?.clone() ??
        new LineStyleMarker3D({
          color: "#007ac2",
          placement: "begin-end",
          style: "arrow",
        });
    } else if (!currentMarkerBlock.expanded && symbolLayer.marker) {
      const newLineStyleMarker3Ds = new Map(lineStyleMarker3Ds);
      newLineStyleMarker3Ds.set(key, symbolLayer.marker.clone());
      setLineStyleMarker3Ds(newLineStyleMarker3Ds);
      symbolLayer.marker = null;
    }
    setSymbolLayers(newSymbolLayers);
    updateSymbolLayers(newSymbolLayers);
  };

  const handleLineSymbol3DLayerMarkerColorChange = (
    layerIndex: number,
    value: string,
  ): void => {
    const newSymbolLayers = cloneSymbolLayers(symbolLayers);
    const symbolLayer = newSymbolLayers.getItemAt(
      layerIndex,
    ) as LineSymbol3DLayer;
    if (symbolLayer.marker) {
      symbolLayer.marker.color = new Color(value);
    }
    setSymbolLayers(newSymbolLayers);
    updateSymbolLayers(newSymbolLayers);
  };

  const handleLineSymbol3DLayerMarkerPlacementChange = (
    layerIndex: number,
    value: string,
  ): void => {
    const newSymbolLayers = cloneSymbolLayers(symbolLayers);
    const symbolLayer = newSymbolLayers.getItemAt(
      layerIndex,
    ) as LineSymbol3DLayer;
    if (symbolLayer.marker) {
      symbolLayer.marker.placement = value as InstanceType<
        typeof LineStyleMarker3D
      >["placement"];
    }
    setSymbolLayers(newSymbolLayers);
    updateSymbolLayers(newSymbolLayers);
  };

  const handleLineSymbol3DLayerMarkerStyleChange = (
    layerIndex: number,
    value: string,
  ): void => {
    const newSymbolLayers = cloneSymbolLayers(symbolLayers);
    const symbolLayer = newSymbolLayers.getItemAt(
      layerIndex,
    ) as LineSymbol3DLayer;
    if (symbolLayer.marker) {
      symbolLayer.marker.style = value as InstanceType<
        typeof LineStyleMarker3D
      >["style"];
    }
    setSymbolLayers(newSymbolLayers);
    updateSymbolLayers(newSymbolLayers);
  };

  const handleLineSymbol3DLayerMaterialColorChange = (
    layerIndex: number,
    value: string,
  ): void => {
    const newSymbolLayers = cloneSymbolLayers(symbolLayers);
    const symbolLayer = newSymbolLayers.getItemAt(
      layerIndex,
    ) as LineSymbol3DLayer;
    if (symbolLayer.material) {
      symbolLayer.material.color = new Color(value);
    }
    setSymbolLayers(newSymbolLayers);
    updateSymbolLayers(newSymbolLayers);
  };

  const handlePatternChange: LinePatternChangeHandler = (index, value) => {
    const layers = cloneSymbolLayers(symbolLayers);
    (layers.getItemAt(index) as LineSymbol3DLayer).pattern = value;
    setSymbolLayers(layers);
    updateSymbolLayers(layers);
  };

  const handleLineSymbol3DLayerSizeChange = (
    layerIndex: number,
    value: string,
  ): void => {
    const newSymbolLayers = cloneSymbolLayers(symbolLayers);
    const symbolLayer = newSymbolLayers.getItemAt(
      layerIndex,
    ) as LineSymbol3DLayer;
    symbolLayer.size = Number(value);
    setSymbolLayers(newSymbolLayers);
    updateSymbolLayers(newSymbolLayers);
  };

  const handlePathSymbol3DLayerAnchorChange = (
    layerIndex: number,
    value: string,
  ): void => {
    const newSymbolLayers = cloneSymbolLayers(symbolLayers);
    const symbolLayer = newSymbolLayers.getItemAt(
      layerIndex,
    ) as PathSymbol3DLayer;
    symbolLayer.anchor = value as InstanceType<
      typeof PathSymbol3DLayer
    >["anchor"];
    setSymbolLayers(newSymbolLayers);
    updateSymbolLayers(newSymbolLayers);
  };

  const handlePathSymbol3DLayerCapChange = (
    layerIndex: number,
    value: string,
  ): void => {
    const newSymbolLayers = cloneSymbolLayers(symbolLayers);
    const symbolLayer = newSymbolLayers.getItemAt(
      layerIndex,
    ) as PathSymbol3DLayer;
    symbolLayer.cap = value as InstanceType<typeof PathSymbol3DLayer>["cap"];
    setSymbolLayers(newSymbolLayers);
    updateSymbolLayers(newSymbolLayers);
  };

  const handlePathSymbol3DLayerCastShadowsChange = (
    layerIndex: number,
    value: boolean,
  ): void => {
    const newSymbolLayers = cloneSymbolLayers(symbolLayers);
    const symbolLayer = newSymbolLayers.getItemAt(
      layerIndex,
    ) as PathSymbol3DLayer;
    symbolLayer.castShadows = value;
    setSymbolLayers(newSymbolLayers);
    updateSymbolLayers(newSymbolLayers);
  };

  const handlePathSymbol3DLayerHeightChange = (
    layerIndex: number,
    value: string,
  ): void => {
    const newSymbolLayers = cloneSymbolLayers(symbolLayers);
    const symbolLayer = newSymbolLayers.getItemAt(
      layerIndex,
    ) as PathSymbol3DLayer;
    symbolLayer.height = Number(value);
    setSymbolLayers(newSymbolLayers);
    updateSymbolLayers(newSymbolLayers);
  };

  const handlePathSymbol3DLayerJoinChange = (
    layerIndex: number,
    value: string,
  ): void => {
    const newSymbolLayers = cloneSymbolLayers(symbolLayers);
    const symbolLayer = newSymbolLayers.getItemAt(
      layerIndex,
    ) as PathSymbol3DLayer;
    symbolLayer.join = value as InstanceType<typeof PathSymbol3DLayer>["join"];
    setSymbolLayers(newSymbolLayers);
    updateSymbolLayers(newSymbolLayers);
  };

  const handlePathSymbol3DLayerMaterialColorChange = (
    layerIndex: number,
    value: string,
  ): void => {
    const newSymbolLayers = cloneSymbolLayers(symbolLayers);
    const symbolLayer = newSymbolLayers.getItemAt(
      layerIndex,
    ) as PathSymbol3DLayer;
    if (symbolLayer.material) {
      symbolLayer.material.color = new Color(value);
    }
    setSymbolLayers(newSymbolLayers);
    updateSymbolLayers(newSymbolLayers);
  };

  const handlePathSymbol3DLayerProfileChange = (
    layerIndex: number,
    value: string,
  ): void => {
    const newSymbolLayers = cloneSymbolLayers(symbolLayers);
    const symbolLayer = newSymbolLayers.getItemAt(
      layerIndex,
    ) as PathSymbol3DLayer;
    symbolLayer.profile = value as InstanceType<
      typeof PathSymbol3DLayer
    >["profile"];
    setSymbolLayers(newSymbolLayers);
    updateSymbolLayers(newSymbolLayers);
  };

  const handlePathSymbol3DLayerProfileRotationChange = (
    layerIndex: number,
    value: string,
  ): void => {
    const newSymbolLayers = cloneSymbolLayers(symbolLayers);
    const symbolLayer = newSymbolLayers.getItemAt(
      layerIndex,
    ) as PathSymbol3DLayer;
    symbolLayer.profileRotation = value as InstanceType<
      typeof PathSymbol3DLayer
    >["profileRotation"];
    setSymbolLayers(newSymbolLayers);
    updateSymbolLayers(newSymbolLayers);
  };

  const handlePathSymbol3DLayerWidthChange = (
    layerIndex: number,
    value: string,
  ): void => {
    const newSymbolLayers = cloneSymbolLayers(symbolLayers);
    const symbolLayer = newSymbolLayers.getItemAt(
      layerIndex,
    ) as PathSymbol3DLayer;
    symbolLayer.width = Number(value);
    setSymbolLayers(newSymbolLayers);
    updateSymbolLayers(newSymbolLayers);
  };

  const handleMaterialEmissiveChange: EmissiveChangeHandler = (
    index,
    value,
  ) => {
    const layers = cloneSymbolLayers(symbolLayers);
    const layer = layers.getItemAt(index) as PathSymbol3DLayer;
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
        (symbolLayer: LineSymbol3DLayer | PathSymbol3DLayer, index: number) => {
          if (symbolLayer.type === "line") {
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

                <LineSymbol3DLayerForm
                  pattern={symbolLayer.pattern}
                  handlePatternChange={handlePatternChange}
                  layerIndex={index}
                  handleCapChange={handleLineSymbol3DLayerCapChange}
                  handleJoinChange={handleLineSymbol3DLayerJoinChange}
                  handleLineSymbol3DLayerMarkerBlockToggle={
                    handleLineSymbol3DLayerMarkerBlockToggle
                  }
                  handleLineSymbol3DLayerMarkerColorChange={
                    handleLineSymbol3DLayerMarkerColorChange
                  }
                  handleLineSymbol3DLayerMarkerPlacementChange={
                    handleLineSymbol3DLayerMarkerPlacementChange
                  }
                  handleLineSymbol3DLayerMarkerStyleChange={
                    handleLineSymbol3DLayerMarkerStyleChange
                  }
                  handleLineSymbol3DLayerMaterialColorChange={
                    handleLineSymbol3DLayerMaterialColorChange
                  }
                  handleSizeChange={handleLineSymbol3DLayerSizeChange}
                ></LineSymbol3DLayerForm>
              </calcite-block>,
            );
          }

          if (symbolLayer.type === "path") {
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
                <PathSymbol3DLayerForm
                  handleMaterialEmissiveChange={handleMaterialEmissiveChange}
                  layerIndex={index}
                  handleAnchorChange={handlePathSymbol3DLayerAnchorChange}
                  handleCapChange={handlePathSymbol3DLayerCapChange}
                  handleCastShadowsChange={
                    handlePathSymbol3DLayerCastShadowsChange
                  }
                  handleHeightChange={handlePathSymbol3DLayerHeightChange}
                  handleJoinChange={handlePathSymbol3DLayerJoinChange}
                  handlePathSymbol3DLayerMaterialColorChange={
                    handlePathSymbol3DLayerMaterialColorChange
                  }
                  handleProfileChange={handlePathSymbol3DLayerProfileChange}
                  handleProfileRotationChange={
                    handlePathSymbol3DLayerProfileRotationChange
                  }
                  handleWidthChange={handlePathSymbol3DLayerWidthChange}
                ></PathSymbol3DLayerForm>
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
            onClick={() => addLineSymbol3DLayer()}
            icon="line"
            label="Add LineSymbol3DLayer"
            text-enabled
            text="Add LineSymbol3DLayer"
          ></calcite-action>

          <calcite-action
            onClick={() => addPathSymbol3DLayer()}
            icon="line"
            label="Add PathSymbol3DLayer"
            text-enabled
            text="Add PathSymbol3DLayer"
          ></calcite-action>
        </calcite-action-menu>

        {createSymbol3DLayerCollectionForm()}
      </calcite-block>
    </>
  );
}

export default LineSymbol3DSymbolLayersForm;
