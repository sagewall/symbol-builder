import Color from "@arcgis/core/Color";
import Collection from "@arcgis/core/core/Collection";
import ExtrudeSymbol3DLayer from "@arcgis/core/symbols/ExtrudeSymbol3DLayer";
import FillSymbol3DLayer from "@arcgis/core/symbols/FillSymbol3DLayer";
import IconSymbol3DLayer from "@arcgis/core/symbols/IconSymbol3DLayer";
import ObjectSymbol3DLayer from "@arcgis/core/symbols/ObjectSymbol3DLayer";
import WaterSymbol3DLayer from "@arcgis/core/symbols/WaterSymbol3DLayer";
import SolidEdges3D from "@arcgis/core/symbols/edges/SolidEdges3D";
import LineStylePattern3D from "@arcgis/core/symbols/patterns/LineStylePattern3D";
import StylePattern3D from "@arcgis/core/symbols/patterns/StylePattern3D";
import {
  CalciteAction,
  CalciteBlock,
  CalciteChip,
  CalciteTooltip
} from "@esri/calcite-components-react";
import React, { useState } from "react";
import ExtrudeSymbol3DLayerForm from "./ExtrudeSymbol3DLayerForm";
import FillSymbol3DLayerForm from "./FillSymbol3DLayerForm";
import IconSymbol3DLayerForm from "./IconSymbol3DLayerForm";
import ObjectSymbol3DLayerForm from "./ObjectSymbol3DLayerForm";
import WaterSymbol3DLayerForm from "./WaterSymbol3DLayerForm";
import { blockStyles, chipStyles } from "./lib/styles";

interface PageProps {
  updateSymbolLayers: (newSymbolLayers: Collection) => void;
}
const PolygonSymbol3DSymbolLayersForm = ({ updateSymbolLayers }: PageProps) => {
  const createNewExtrudeSymbol3DLayer = (): ExtrudeSymbol3DLayer => {
    const newExtrudeSymbol3DLayer = new ExtrudeSymbol3DLayer({
      edges: new SolidEdges3D({ size: 1 }),
      material: { color: "#007ac2" },
      size: 20
    });
    return newExtrudeSymbol3DLayer;
  };

  const createNewFillSymbol3DLayer = (): FillSymbol3DLayer => {
    const newFillSymbol3DLayer = new FillSymbol3DLayer({
      material: {
        color: "#007ac2",
        colorMixMode: "multiply"
      },
      outline: {
        color: "#111111",
        pattern: new LineStylePattern3D(),
        size: 3
      },
      pattern: new StylePattern3D({
        style: "solid"
      })
    });
    return newFillSymbol3DLayer;
  };

  const createNewIconSymbol3DLayer = (): IconSymbol3DLayer => {
    const newIconSymbol3DLayer = new IconSymbol3DLayer();
    newIconSymbol3DLayer.anchor = "center";
    newIconSymbol3DLayer.anchorPosition = { x: 0, y: 0 };
    newIconSymbol3DLayer.material = { color: new Color("#ff0000") };
    newIconSymbol3DLayer.outline = { color: new Color("#000000"), size: 1.5 };
    newIconSymbol3DLayer.resource = { href: undefined, primitive: "circle" };
    newIconSymbol3DLayer.size = 12;
    return newIconSymbol3DLayer;
  };

  const createNewObjectSymbol3DLayer = (): ObjectSymbol3DLayer => {
    const newObjectSymbol3DLayer = new ObjectSymbol3DLayer();
    newObjectSymbol3DLayer.anchor = "center";
    newObjectSymbol3DLayer.anchorPosition = { x: 0, y: 0, z: 0 };
    newObjectSymbol3DLayer.castShadows = false;
    newObjectSymbol3DLayer.depth = 10;
    newObjectSymbol3DLayer.heading = 0;
    newObjectSymbol3DLayer.height = 10;
    newObjectSymbol3DLayer.material = { color: new Color("#ff0000") };
    newObjectSymbol3DLayer.resource = { href: undefined, primitive: "sphere" };
    newObjectSymbol3DLayer.roll = 0;
    newObjectSymbol3DLayer.tilt = 0;
    newObjectSymbol3DLayer.width = 10;
    return newObjectSymbol3DLayer;
  };

  const createNewWaterSymbol3DLayer = (): WaterSymbol3DLayer => {
    const newWaterSymbol3DLayer = new WaterSymbol3DLayer({ waveDirection: 0 });
    return newWaterSymbol3DLayer;
  };

  const [symbolLayers, setSymbolLayers] = useState(new Collection());

  const addExtrudeSymbol3DLayer = () => {
    const newSymbolLayers = symbolLayers.clone();
    const extrudeSymbol3DLayer = createNewExtrudeSymbol3DLayer();
    newSymbolLayers.add(extrudeSymbol3DLayer);
    setSymbolLayers(newSymbolLayers);
    updateSymbolLayers(newSymbolLayers);
  };

  const addFillSymbol3DLayer = () => {
    const newSymbolLayers = symbolLayers.clone();
    const fillSymbol3DLayer = createNewFillSymbol3DLayer();
    newSymbolLayers.add(fillSymbol3DLayer);
    setSymbolLayers(newSymbolLayers);
    updateSymbolLayers(newSymbolLayers);
  };

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

  const addWaterSymbol3DLayer = () => {
    const newSymbolLayers = symbolLayers.clone();
    const waterSymbol3DLayer = createNewWaterSymbol3DLayer();
    newSymbolLayers.add(waterSymbol3DLayer);
    setSymbolLayers(newSymbolLayers);
    updateSymbolLayers(newSymbolLayers);
  };

  const deleteSymbol3DLayer = (index: number) => {
    const newSymbolLayers = symbolLayers.clone();
    newSymbolLayers.removeAt(index);
    setSymbolLayers(newSymbolLayers);
    updateSymbolLayers(newSymbolLayers);
  };

  const handleExtrudeSymbol3DLayerCastShadowsChange = (layerIndex: number, value: boolean) => {
    const newSymbolLayers = symbolLayers.clone();
    const symbolLayer = newSymbolLayers.getItemAt(layerIndex) as ExtrudeSymbol3DLayer;
    symbolLayer.castShadows = value;
    setSymbolLayers(newSymbolLayers);
    updateSymbolLayers(newSymbolLayers);
  };

  const handleExtrudeSymbol3DLayerEdgesColorChange = (layerIndex: number, value: string) => {
    const newSymbolLayers = symbolLayers.clone();
    const symbolLayer = newSymbolLayers.getItemAt(layerIndex) as ExtrudeSymbol3DLayer;
    symbolLayer.edges.color = new Color(value);
    setSymbolLayers(newSymbolLayers);
    updateSymbolLayers(newSymbolLayers);
  };

  const handleExtrudeSymbol3DLayerEdgesExtensionLengthChange = (
    layerIndex: number,
    value: string
  ) => {
    const newSymbolLayers = symbolLayers.clone();
    const symbolLayer = newSymbolLayers.getItemAt(layerIndex) as ExtrudeSymbol3DLayer;
    symbolLayer.edges.extensionLength = Number(value);
    setSymbolLayers(newSymbolLayers);
    updateSymbolLayers(newSymbolLayers);
  };

  const handleExtrudeSymbol3DLayerEdgesSizeChange = (layerIndex: number, value: string) => {
    const newSymbolLayers = symbolLayers.clone();
    const symbolLayer = newSymbolLayers.getItemAt(layerIndex) as ExtrudeSymbol3DLayer;
    symbolLayer.edges.size = Number(value);
    setSymbolLayers(newSymbolLayers);
    updateSymbolLayers(newSymbolLayers);
  };

  const handleExtrudeSymbol3DLayerMaterialColorChange = (layerIndex: number, value: string) => {
    const newSymbolLayers = symbolLayers.clone();
    const symbolLayer = newSymbolLayers.getItemAt(layerIndex) as ExtrudeSymbol3DLayer;
    symbolLayer.material.color = new Color(value);
    setSymbolLayers(newSymbolLayers);
    updateSymbolLayers(newSymbolLayers);
  };

  const handleExtrudeSymbol3DLayerSizeChange = (layerIndex: number, value: string) => {
    const newSymbolLayers = symbolLayers.clone();
    const symbolLayer = newSymbolLayers.getItemAt(layerIndex) as ExtrudeSymbol3DLayer;
    symbolLayer.size = Number(value);
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
    symbolLayer.edges.color = new Color(value);
    setSymbolLayers(newSymbolLayers);
    updateSymbolLayers(newSymbolLayers);
  };

  const handleFillSymbol3DLayerEdgesExtensionLengthChange = (layerIndex: number, value: string) => {
    const newSymbolLayers = symbolLayers.clone();
    const symbolLayer = newSymbolLayers.getItemAt(layerIndex) as FillSymbol3DLayer;
    symbolLayer.edges.extensionLength = Number(value);
    setSymbolLayers(newSymbolLayers);
    updateSymbolLayers(newSymbolLayers);
  };

  const handleFillSymbol3DLayerEdgesSizeChange = (layerIndex: number, value: string) => {
    const newSymbolLayers = symbolLayers.clone();
    const symbolLayer = newSymbolLayers.getItemAt(layerIndex) as FillSymbol3DLayer;
    symbolLayer.edges.size = Number(value);
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

  const handleFillSymbol3DLayerMaterialColorMixModeChange = (
    layerIndex: number,
    value: InstanceType<typeof FillSymbol3DLayer>["material"]["colorMixMode"]
  ) => {
    const newSymbolLayers = symbolLayers.clone();
    const symbolLayer = newSymbolLayers.getItemAt(layerIndex) as FillSymbol3DLayer;
    symbolLayer.material.colorMixMode = value;
    setSymbolLayers(newSymbolLayers);
    updateSymbolLayers(newSymbolLayers);
  };

  const handleFillSymbol3DLayerOutlineColorChange = (layerIndex: number, value: string) => {
    const newSymbolLayers = symbolLayers.clone();
    const symbolLayer = newSymbolLayers.getItemAt(layerIndex) as FillSymbol3DLayer;
    symbolLayer.outline.color = new Color(value);
    setSymbolLayers(newSymbolLayers);
    updateSymbolLayers(newSymbolLayers);
  };

  const handleFillSymbol3DLayerOutlinePatternChange = (layerIndex: number, value: string) => {
    const newSymbolLayers = symbolLayers.clone();
    const symbolLayer = newSymbolLayers.getItemAt(layerIndex) as FillSymbol3DLayer;
    if (symbolLayer.outline.pattern) {
      symbolLayer.outline.pattern.style = value as InstanceType<typeof LineStylePattern3D>["style"];
    }

    setSymbolLayers(newSymbolLayers);
    updateSymbolLayers(newSymbolLayers);
  };

  const handleFillSymbol3DLayerOutlinePatternCapChange = (
    layerIndex: number,
    value: InstanceType<typeof FillSymbol3DLayer>["outline"]["patternCap"]
  ) => {
    const newSymbolLayers = symbolLayers.clone();
    const symbolLayer = newSymbolLayers.getItemAt(layerIndex) as FillSymbol3DLayer;
    symbolLayer.outline.patternCap = value;
    setSymbolLayers(newSymbolLayers);
    updateSymbolLayers(newSymbolLayers);
  };

  const handleFillSymbol3DLayerOutlineSizeChange = (layerIndex: number, value: string) => {
    const newSymbolLayers = symbolLayers.clone();
    const symbolLayer = newSymbolLayers.getItemAt(layerIndex) as FillSymbol3DLayer;
    symbolLayer.outline.size = Number(value);
    setSymbolLayers(newSymbolLayers);
    updateSymbolLayers(newSymbolLayers);
  };

  const handleFillSymbol3DLayerPatternStyleChange = (
    layerIndex: number,
    value: InstanceType<typeof StylePattern3D>["style"]
  ) => {
    const newSymbolLayers = symbolLayers.clone();
    const symbolLayer = newSymbolLayers.getItemAt(layerIndex) as FillSymbol3DLayer;
    symbolLayer.pattern.style = value;
    setSymbolLayers(newSymbolLayers);
    updateSymbolLayers(newSymbolLayers);
  };

  const handleIconSymbol3DLayerAnchorChange = (
    layerIndex: number,
    value: InstanceType<typeof IconSymbol3DLayer>["anchor"]
  ) => {
    const newSymbolLayers = symbolLayers.clone();
    const symbolLayer = newSymbolLayers.getItemAt(layerIndex) as IconSymbol3DLayer;
    symbolLayer.anchor = value;
    setSymbolLayers(newSymbolLayers);
    updateSymbolLayers(newSymbolLayers);
  };

  const handleIconSymbol3DLayerAnchorPositionXChange = (layerIndex: number, value: string) => {
    const newSymbolLayers = symbolLayers.clone();
    const symbolLayer = newSymbolLayers.getItemAt(layerIndex) as IconSymbol3DLayer;
    symbolLayer.anchorPosition.x = Number(value);
    setSymbolLayers(newSymbolLayers);
    updateSymbolLayers(newSymbolLayers);
  };

  const handleIconSymbol3DLayerAnchorPositionYChange = (layerIndex: number, value: string) => {
    const newSymbolLayers = symbolLayers.clone();
    const symbolLayer = newSymbolLayers.getItemAt(layerIndex) as IconSymbol3DLayer;
    symbolLayer.anchorPosition.y = Number(value);
    setSymbolLayers(newSymbolLayers);
    updateSymbolLayers(newSymbolLayers);
  };

  const handleIconSymbol3DLayerMaterialColorChange = (layerIndex: number, value: string) => {
    const newSymbolLayers = symbolLayers.clone();
    const symbolLayer = newSymbolLayers.getItemAt(layerIndex) as IconSymbol3DLayer;
    symbolLayer.material.color = new Color(value);
    setSymbolLayers(newSymbolLayers);
    updateSymbolLayers(newSymbolLayers);
  };

  const handleIconSymbol3DLayerOutlineColorChange = (layerIndex: number, value: string) => {
    const newSymbolLayers = symbolLayers.clone();
    const symbolLayer = newSymbolLayers.getItemAt(layerIndex) as IconSymbol3DLayer;
    symbolLayer.outline.color = new Color(value);
    setSymbolLayers(newSymbolLayers);
    updateSymbolLayers(newSymbolLayers);
  };

  const handleIconSymbol3DLayerOutlineSizeChange = (layerIndex: number, value: string) => {
    const newSymbolLayers = symbolLayers.clone();
    const symbolLayer = newSymbolLayers.getItemAt(layerIndex) as IconSymbol3DLayer;
    symbolLayer.outline.size = Number(value);
    setSymbolLayers(newSymbolLayers);
    updateSymbolLayers(newSymbolLayers);
  };

  const handleIconSymbol3DLayerResourceHrefChange = (layerIndex: number, value: string) => {
    const newSymbolLayers = symbolLayers.clone();
    const symbolLayer = newSymbolLayers.getItemAt(layerIndex) as IconSymbol3DLayer;
    symbolLayer.resource.href = value;
    setSymbolLayers(newSymbolLayers);
    updateSymbolLayers(newSymbolLayers);
  };

  const handleIconSymbol3DLayerResourcePrimitiveChange = (
    layerIndex: number,
    value: InstanceType<typeof IconSymbol3DLayer>["resource"]["primitive"]
  ) => {
    const newSymbolLayers = symbolLayers.clone();
    const symbolLayer = newSymbolLayers.getItemAt(layerIndex) as IconSymbol3DLayer;
    symbolLayer.resource.primitive = value;
    setSymbolLayers(newSymbolLayers);
    updateSymbolLayers(newSymbolLayers);
  };

  const handleIconSymbol3DLayerSizeChange = (layerIndex: number, value: string) => {
    const newSymbolLayers = symbolLayers.clone();
    const symbolLayer = newSymbolLayers.getItemAt(layerIndex) as IconSymbol3DLayer;
    symbolLayer.size = Number(value);
    setSymbolLayers(newSymbolLayers);
    updateSymbolLayers(newSymbolLayers);
  };

  const handleObjectSymbol3DLayerAnchorChange = (
    layerIndex: number,
    value: InstanceType<typeof ObjectSymbol3DLayer>["anchor"]
  ) => {
    const newSymbolLayers = symbolLayers.clone();
    const symbolLayer = newSymbolLayers.getItemAt(layerIndex) as ObjectSymbol3DLayer;
    symbolLayer.anchor = value;
    setSymbolLayers(newSymbolLayers);
    updateSymbolLayers(newSymbolLayers);
  };

  const handleObjectSymbol3DLayerAnchorPositionXChange = (layerIndex: number, value: string) => {
    const newSymbolLayers = symbolLayers.clone();
    const symbolLayer = newSymbolLayers.getItemAt(layerIndex) as ObjectSymbol3DLayer;
    symbolLayer.anchorPosition.x = Number(value);
    setSymbolLayers(newSymbolLayers);
    updateSymbolLayers(newSymbolLayers);
  };

  const handleObjectSymbol3DLayerAnchorPositionYChange = (layerIndex: number, value: string) => {
    const newSymbolLayers = symbolLayers.clone();
    const symbolLayer = newSymbolLayers.getItemAt(layerIndex) as ObjectSymbol3DLayer;
    symbolLayer.anchorPosition.y = Number(value);
    setSymbolLayers(newSymbolLayers);
    updateSymbolLayers(newSymbolLayers);
  };

  const handleObjectSymbol3DLayerAnchorPositionZChange = (layerIndex: number, value: string) => {
    const newSymbolLayers = symbolLayers.clone();
    const symbolLayer = newSymbolLayers.getItemAt(layerIndex) as ObjectSymbol3DLayer;
    symbolLayer.anchorPosition.z = Number(value);
    setSymbolLayers(newSymbolLayers);
    updateSymbolLayers(newSymbolLayers);
  };

  const handleObjectSymbol3DLayerCastShadowsChange = (layerIndex: number, value: boolean) => {
    const newSymbolLayers = symbolLayers.clone();
    const symbolLayer = newSymbolLayers.getItemAt(layerIndex) as ObjectSymbol3DLayer;
    symbolLayer.castShadows = value;
    setSymbolLayers(newSymbolLayers);
    updateSymbolLayers(newSymbolLayers);
  };

  const handleObjectSymbol3DLayerDepthChange = (layerIndex: number, value: string) => {
    const newSymbolLayers = symbolLayers.clone();
    const symbolLayer = newSymbolLayers.getItemAt(layerIndex) as ObjectSymbol3DLayer;
    symbolLayer.depth = Number(value);
    setSymbolLayers(newSymbolLayers);
    updateSymbolLayers(newSymbolLayers);
  };

  const handleObjectSymbol3DLayerHeadingChange = (layerIndex: number, value: number) => {
    const newSymbolLayers = symbolLayers.clone();
    const symbolLayer = newSymbolLayers.getItemAt(layerIndex) as ObjectSymbol3DLayer;
    symbolLayer.heading = value;
    setSymbolLayers(newSymbolLayers);
    updateSymbolLayers(newSymbolLayers);
  };

  const handleObjectSymbol3DLayerHeightChange = (layerIndex: number, value: string) => {
    const newSymbolLayers = symbolLayers.clone();
    const symbolLayer = newSymbolLayers.getItemAt(layerIndex) as ObjectSymbol3DLayer;
    symbolLayer.height = Number(value);
    setSymbolLayers(newSymbolLayers);
    updateSymbolLayers(newSymbolLayers);
  };

  const handleObjectSymbol3DLayerMaterialColorChange = (layerIndex: number, value: string) => {
    const newSymbolLayers = symbolLayers.clone();
    const symbolLayer = newSymbolLayers.getItemAt(layerIndex) as ObjectSymbol3DLayer;
    symbolLayer.material.color = new Color(value);
    setSymbolLayers(newSymbolLayers);
    updateSymbolLayers(newSymbolLayers);
  };

  const handleObjectSymbol3DLayerResourceHrefChange = (layerIndex: number, value: string) => {
    const newSymbolLayers = symbolLayers.clone();
    const symbolLayer = newSymbolLayers.getItemAt(layerIndex) as ObjectSymbol3DLayer;
    symbolLayer.resource.href = value;
    setSymbolLayers(newSymbolLayers);
    updateSymbolLayers(newSymbolLayers);
  };

  const handleObjectSymbol3DLayerResourcePrimitiveChange = (
    layerIndex: number,
    value: InstanceType<typeof ObjectSymbol3DLayer>["resource"]["primitive"]
  ) => {
    const newSymbolLayers = symbolLayers.clone();
    const symbolLayer = newSymbolLayers.getItemAt(layerIndex) as ObjectSymbol3DLayer;
    symbolLayer.resource.primitive = value;
    setSymbolLayers(newSymbolLayers);
    updateSymbolLayers(newSymbolLayers);
  };

  const handleObjectSymbol3DLayerRollChange = (layerIndex: number, value: number) => {
    const newSymbolLayers = symbolLayers.clone();
    const symbolLayer = newSymbolLayers.getItemAt(layerIndex) as ObjectSymbol3DLayer;
    symbolLayer.roll = value;
    setSymbolLayers(newSymbolLayers);
    updateSymbolLayers(newSymbolLayers);
  };

  const handleObjectSymbol3DLayerTiltChange = (layerIndex: number, value: number) => {
    const newSymbolLayers = symbolLayers.clone();
    const symbolLayer = newSymbolLayers.getItemAt(layerIndex) as ObjectSymbol3DLayer;
    symbolLayer.tilt = value;
    setSymbolLayers(newSymbolLayers);
    updateSymbolLayers(newSymbolLayers);
  };

  const handleObjectSymbol3DLayerWidthChange = (layerIndex: number, value: string) => {
    const newSymbolLayers = symbolLayers.clone();
    const symbolLayer = newSymbolLayers.getItemAt(layerIndex) as ObjectSymbol3DLayer;
    symbolLayer.width = Number(value);
    setSymbolLayers(newSymbolLayers);
    updateSymbolLayers(newSymbolLayers);
  };

  const handleWaterSymbol3DLayerColorChange = (layerIndex: number, value: string) => {
    const newSymbolLayers = symbolLayers.clone();
    const symbolLayer = newSymbolLayers.getItemAt(layerIndex) as WaterSymbol3DLayer;
    symbolLayer.color = new Color(value);
    setSymbolLayers(newSymbolLayers);
    updateSymbolLayers(newSymbolLayers);
  };

  const handleWaterSymbol3DLayerWaterbodySizeChange = (
    layerIndex: number,
    value: InstanceType<typeof WaterSymbol3DLayer>["waterbodySize"]
  ) => {
    const newSymbolLayers = symbolLayers.clone();
    const symbolLayer = newSymbolLayers.getItemAt(layerIndex) as WaterSymbol3DLayer;
    symbolLayer.waterbodySize = value;
    setSymbolLayers(newSymbolLayers);
    updateSymbolLayers(newSymbolLayers);
  };

  const handleWaterSymbol3DLayerWaveDirectionChange = (layerIndex: number, value: number) => {
    const newSymbolLayers = symbolLayers.clone();
    const symbolLayer = newSymbolLayers.getItemAt(layerIndex) as WaterSymbol3DLayer;
    symbolLayer.waveDirection = value;
    setSymbolLayers(newSymbolLayers);
    updateSymbolLayers(newSymbolLayers);
  };

  const handleWaterSymbol3DLayerWaveStrengthChange = (
    layerIndex: number,
    value: InstanceType<typeof WaterSymbol3DLayer>["waveStrength"]
  ) => {
    const newSymbolLayers = symbolLayers.clone();
    const symbolLayer = newSymbolLayers.getItemAt(layerIndex) as WaterSymbol3DLayer;
    symbolLayer.waveStrength = value;
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
            | IconSymbol3DLayer
            | ObjectSymbol3DLayer,
          index: number
        ) => {
          if (symbolLayer.type === "extrude") {
            symbol3DLayerCollectionForm.push(
              <CalciteBlock collapsible heading={`symbolLayers[${index}]`} key={index}>
                <CalciteAction
                  icon="trash"
                  onClick={() => deleteSymbol3DLayer(index)}
                  slot="control"
                  text="Delete"
                />
                <ExtrudeSymbol3DLayerForm
                  layerIndex={index}
                  handleCastShadowsChange={handleExtrudeSymbol3DLayerCastShadowsChange}
                  handleExtrudeSymbol3DLayerEdgesColorChange={
                    handleExtrudeSymbol3DLayerEdgesColorChange
                  }
                  handleExtrudeSymbol3DLayerEdgesExtensionLengthChange={
                    handleExtrudeSymbol3DLayerEdgesExtensionLengthChange
                  }
                  handleExtrudeSymbol3DLayerEdgesSizeChange={
                    handleExtrudeSymbol3DLayerEdgesSizeChange
                  }
                  handleExtrudeSymbol3DLayerMaterialColorChange={
                    handleExtrudeSymbol3DLayerMaterialColorChange
                  }
                  handleSizeChange={handleExtrudeSymbol3DLayerSizeChange}
                />
              </CalciteBlock>
            );
          }

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
                  isMeshSymbol3D={false}
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
                  handleFillSymbol3DLayerOutlineSizeChange={
                    handleFillSymbol3DLayerOutlineSizeChange
                  }
                  handleFillSymbol3DLayerPatternStyleChange={
                    handleFillSymbol3DLayerPatternStyleChange
                  }
                />
              </CalciteBlock>
            );
          }

          if (symbolLayer.type === "icon") {
            symbol3DLayerCollectionForm.push(
              <CalciteBlock collapsible heading={`symbolLayers[${index}]`} key={index}>
                <CalciteAction
                  icon="trash"
                  onClick={() => deleteSymbol3DLayer(index)}
                  slot="control"
                  text="Delete"
                />
                <IconSymbol3DLayerForm
                  layerIndex={index}
                  handleIconSymbol3DLayerAnchorChange={handleIconSymbol3DLayerAnchorChange}
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
              <CalciteBlock collapsible heading={`symbolLayers[${index}]`} key={index}>
                <CalciteAction
                  icon="trash"
                  onClick={() => deleteSymbol3DLayer(index)}
                  slot="control"
                  text="Delete"
                />
                <ObjectSymbol3DLayerForm
                  layerIndex={index}
                  handleAnchorChange={handleObjectSymbol3DLayerAnchorChange}
                  handleObjectSymbol3DLayerAnchorPositionXChange={
                    handleObjectSymbol3DLayerAnchorPositionXChange
                  }
                  handleObjectSymbol3DLayerAnchorPositionYChange={
                    handleObjectSymbol3DLayerAnchorPositionYChange
                  }
                  handleObjectSymbol3DLayerAnchorPositionZChange={
                    handleObjectSymbol3DLayerAnchorPositionZChange
                  }
                  handleCastShadowsChange={handleObjectSymbol3DLayerCastShadowsChange}
                  handleDepthChange={handleObjectSymbol3DLayerDepthChange}
                  handleHeadingChange={handleObjectSymbol3DLayerHeadingChange}
                  handleHeightChange={handleObjectSymbol3DLayerHeightChange}
                  handleObjectSymbol3DLayerMaterialColorChange={
                    handleObjectSymbol3DLayerMaterialColorChange
                  }
                  handleObjectSymbol3DLayerResourceHrefChange={
                    handleObjectSymbol3DLayerResourceHrefChange
                  }
                  handleObjectSymbol3DLayerResourcePrimitiveChange={
                    handleObjectSymbol3DLayerResourcePrimitiveChange
                  }
                  handleRollChange={handleObjectSymbol3DLayerRollChange}
                  handleTiltChange={handleObjectSymbol3DLayerTiltChange}
                  handleWidthChange={handleObjectSymbol3DLayerWidthChange}
                ></ObjectSymbol3DLayerForm>
              </CalciteBlock>
            );
          }

          if (symbolLayer.type === "water") {
            symbol3DLayerCollectionForm.push(
              <CalciteBlock collapsible heading={`symbolLayers[${index}]`} key={index}>
                <CalciteAction
                  icon="trash"
                  onClick={() => deleteSymbol3DLayer(index)}
                  slot="control"
                  text="Delete"
                />
                <WaterSymbol3DLayerForm
                  layerIndex={index}
                  handleColorChange={handleWaterSymbol3DLayerColorChange}
                  handleWaterbodySizeChange={handleWaterSymbol3DLayerWaterbodySizeChange}
                  handleWaveDirectionChange={handleWaterSymbol3DLayerWaveDirectionChange}
                  handleWaveStrengthChange={handleWaterSymbol3DLayerWaveStrengthChange}
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
          onClick={() => addFillSymbol3DLayer()}
          slot="header-menu-actions"
          icon="polygon"
          text-enabled
          text="Add FillSymbol3DLayer"
        ></CalciteAction>

        <CalciteAction
          onClick={() => addExtrudeSymbol3DLayer()}
          slot="header-menu-actions"
          icon="polygon"
          text-enabled
          text="Add ExtrudeSymbol3DLayer"
        ></CalciteAction>

        <CalciteAction
          onClick={() => addWaterSymbol3DLayer()}
          slot="header-menu-actions"
          icon="polygon"
          text-enabled
          text="Add WaterSymbol3DLayer"
        ></CalciteAction>

        <CalciteAction
          onClick={() => addIconSymbol3DLayer()}
          slot="header-menu-actions"
          icon="point"
          text-enabled
          text="Add IconSymbol3DLayer"
        ></CalciteAction>

        <CalciteAction
          onClick={() => addObjectSymbol3DLayer()}
          slot="header-menu-actions"
          icon="point"
          text-enabled
          text="Add ObjectSymbol3DLayer"
        ></CalciteAction>
        {createSymbol3DLayerCollectionForm()}
      </CalciteBlock>
    </React.Fragment>
  );
};

export default PolygonSymbol3DSymbolLayersForm;
