import Color from "@arcgis/core/Color.js";
import Collection from "@arcgis/core/core/Collection.js";
import LineStyleMarker3D from "@arcgis/core/symbols/LineStyleMarker3D.js";
import LineSymbol3DLayer from "@arcgis/core/symbols/LineSymbol3DLayer.js";
import PathSymbol3DLayer from "@arcgis/core/symbols/PathSymbol3DLayer.js";
import LineStylePattern3D from "@arcgis/core/symbols/patterns/LineStylePattern3D.js";
import "@esri/calcite-components/components/calcite-action";
import "@esri/calcite-components/components/calcite-block";
import "@esri/calcite-components/components/calcite-chip";
import "@esri/calcite-components/components/calcite-tooltip";
import React, { useState } from "react";
import { blockStyles, chipStyles } from "./lib/styles";
import LineSymbol3DLayerForm from "./LineSymbol3DLayerForm";
import PathSymbol3DLayerForm from "./PathSymbol3DLayerForm";

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

  const [lineStyleMarker3Ds, setLineStyleMarker3Ds] = useState(
    new Collection([
      new LineStyleMarker3D({
        color: "#007ac2",
        placement: "begin-end",
        style: "arrow",
      }),
    ]),
  );

  const addLineSymbol3DLayer = (): void => {
    const newSymbolLayers = symbolLayers.clone();
    const lineSymbol3DLayer = createNewLineSymbol3DLayer();
    newSymbolLayers.add(lineSymbol3DLayer);
    setSymbolLayers(newSymbolLayers);
    updateSymbolLayers(newSymbolLayers);

    const newLineStyleMarker3Ds = lineStyleMarker3Ds.clone();
    newLineStyleMarker3Ds.add(
      new LineStyleMarker3D({
        color: "#007ac2",
        placement: "begin-end",
        style: "arrow",
      }),
    );
    setLineStyleMarker3Ds(newLineStyleMarker3Ds);
  };

  const addPathSymbol3DLayer = (): void => {
    const newSymbolLayers = symbolLayers.clone();
    const pathSymbol3DLayer = createNewPathSymbol3DLayer();
    newSymbolLayers.add(pathSymbol3DLayer);
    setSymbolLayers(newSymbolLayers);
    updateSymbolLayers(newSymbolLayers);
  };

  const deleteSymbol3DLayer = (index: number): void => {
    const newSymbolLayers = symbolLayers.clone();
    newSymbolLayers.removeAt(index);
    lineStyleMarker3Ds.removeAt(index);
    setSymbolLayers(newSymbolLayers);
    updateSymbolLayers(newSymbolLayers);
  };

  const handleLineSymbol3DLayerCapChange = (
    layerIndex: number,
    value: string,
  ): void => {
    const newSymbolLayers = symbolLayers.clone();
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
    const newSymbolLayers = symbolLayers.clone();
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
    const newSymbolLayers = symbolLayers.clone();
    const symbolLayer = newSymbolLayers.getItemAt(
      layerIndex,
    ) as LineSymbol3DLayer;
    if (currentMarkerBlock.expanded && !symbolLayer.marker) {
      symbolLayer.marker = lineStyleMarker3Ds.getItemAt(
        layerIndex,
      ) as LineStyleMarker3D;
    } else {
      const newLineStyleMarker3Ds = lineStyleMarker3Ds.clone();
      newLineStyleMarker3Ds.removeAt(layerIndex);
      newLineStyleMarker3Ds.add(symbolLayer.marker!, layerIndex);
      setLineStyleMarker3Ds(newLineStyleMarker3Ds);
      symbolLayer.marker = null;
      updateSymbolLayers(newSymbolLayers);
    }
    setSymbolLayers(newSymbolLayers);
    updateSymbolLayers(newSymbolLayers);
  };

  const handleLineSymbol3DLayerMarkerColorChange = (
    layerIndex: number,
    value: string,
  ): void => {
    const newSymbolLayers = symbolLayers.clone();
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
    const newSymbolLayers = symbolLayers.clone();
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
    const newSymbolLayers = symbolLayers.clone();
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
    const newSymbolLayers = symbolLayers.clone();
    const symbolLayer = newSymbolLayers.getItemAt(
      layerIndex,
    ) as LineSymbol3DLayer;
    if (symbolLayer.material) {
      symbolLayer.material.color = new Color(value);
    }
    setSymbolLayers(newSymbolLayers);
    updateSymbolLayers(newSymbolLayers);
  };

  const handleLineSymbol3DLayerPatternStyleChange = (
    layerIndex: number,
    value: string,
  ): void => {
    const newSymbolLayers = symbolLayers.clone();
    const symbolLayer = newSymbolLayers.getItemAt(
      layerIndex,
    ) as LineSymbol3DLayer;
    if (symbolLayer.pattern) {
      symbolLayer.pattern.style = value as InstanceType<
        typeof LineStylePattern3D
      >["style"];
    }
    setSymbolLayers(newSymbolLayers);
    updateSymbolLayers(newSymbolLayers);
  };

  const handleLineSymbol3DLayerSizeChange = (
    layerIndex: number,
    value: string,
  ): void => {
    const newSymbolLayers = symbolLayers.clone();
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
    const newSymbolLayers = symbolLayers.clone();
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
    const newSymbolLayers = symbolLayers.clone();
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
    const newSymbolLayers = symbolLayers.clone();
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
    const newSymbolLayers = symbolLayers.clone();
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
    const newSymbolLayers = symbolLayers.clone();
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
    const newSymbolLayers = symbolLayers.clone();
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
    const newSymbolLayers = symbolLayers.clone();
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
    const newSymbolLayers = symbolLayers.clone();
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
    const newSymbolLayers = symbolLayers.clone();
    const symbolLayer = newSymbolLayers.getItemAt(
      layerIndex,
    ) as PathSymbol3DLayer;
    symbolLayer.width = Number(value);
    setSymbolLayers(newSymbolLayers);
    updateSymbolLayers(newSymbolLayers);
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
                collapsible
                heading={`symbolLayers[${index}]`}
                key={index}
              >
                <calcite-action
                  icon="trash"
                  onClick={() => deleteSymbol3DLayer(index)}
                  slot="control"
                  text="Delete"
                ></calcite-action>

                <LineSymbol3DLayerForm
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
                  handleLineSymbol3DLayerPatternStyleChange={
                    handleLineSymbol3DLayerPatternStyleChange
                  }
                  handleSizeChange={handleLineSymbol3DLayerSizeChange}
                ></LineSymbol3DLayerForm>
              </calcite-block>,
            );
          }

          if (symbolLayer.type === "path") {
            symbol3DLayerCollectionForm.push(
              <calcite-block
                collapsible
                heading={`symbolLayers[${index}]`}
                key={index}
              >
                <calcite-action
                  icon="trash"
                  onClick={() => deleteSymbol3DLayer(index)}
                  slot="control"
                  text="Delete"
                ></calcite-action>
                <PathSymbol3DLayerForm
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
        collapsible
        heading={"symbolLayers"}
        expanded
      >
        <calcite-chip
          id="add-layer-chip"
          icon="add-layer"
          label="Add Layer"
          slot="control"
          value="Information"
          style={chipStyles}
        ></calcite-chip>
        <calcite-tooltip reference-element={"add-layer-chip"}>
          <span>
            Add symbol layer by opening the dropdown menu on the right
          </span>
        </calcite-tooltip>

        <calcite-action
          onClick={() => addLineSymbol3DLayer()}
          slot="header-menu-actions"
          icon="line"
          text-enabled
          text="Add LineSymbol3DLayer"
        ></calcite-action>

        <calcite-action
          onClick={() => addPathSymbol3DLayer()}
          slot="header-menu-actions"
          icon="line"
          text-enabled
          text="Add PathSymbol3DLayer"
        ></calcite-action>

        {createSymbol3DLayerCollectionForm()}
      </calcite-block>
    </>
  );
}

export default LineSymbol3DSymbolLayersForm;
