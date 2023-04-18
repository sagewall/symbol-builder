import Color from "@arcgis/core/Color";
import Collection from "@arcgis/core/core/Collection";
import SolidEdges3D from "@arcgis/core/symbols/edges/SolidEdges3D";
import ExtrudeSymbol3DLayer from "@arcgis/core/symbols/ExtrudeSymbol3DLayer";
import FillSymbol3DLayer from "@arcgis/core/symbols/FillSymbol3DLayer";
import Font from "@arcgis/core/symbols/Font";
import IconSymbol3DLayer from "@arcgis/core/symbols/IconSymbol3DLayer";
import LineStyleMarker3D from "@arcgis/core/symbols/LineStyleMarker3D";
import LineSymbol3DLayer from "@arcgis/core/symbols/LineSymbol3DLayer";
import ObjectSymbol3DLayer from "@arcgis/core/symbols/ObjectSymbol3DLayer";
import LineStylePattern3D from "@arcgis/core/symbols/patterns/LineStylePattern3D";
import StylePattern3D from "@arcgis/core/symbols/patterns/StylePattern3D";
import TextSymbol3DLayer from "@arcgis/core/symbols/TextSymbol3DLayer";
import WaterSymbol3DLayer from "@arcgis/core/symbols/WaterSymbol3DLayer";
import { CalciteAction, CalciteBlock } from "@esri/calcite-components-react";
import React, { useState } from "react";
import ExtrudeSymbol3DLayerForm from "./ExtrudeSymbol3DLayerForm";
import FillSymbol3DLayerForm from "./FillSymbol3DLayerForm";
import IconSymbol3DLayerForm from "./IconSymbol3DLayerForm";
import { blockStyles } from "./lib/styles";
import {
  Cap,
  ColorMixMode,
  Fill,
  FontDecoration,
  FontStyle,
  FontWeight,
  HorizontalAlignment,
  IconSymbol3DLayerAnchor,
  IconSymbol3DLayerResourcePrimitive,
  Join,
  LineStyle,
  LineStyleMarker3DStyle,
  MarkerPlacement,
  ObjectSymbol3DLayerAnchor,
  ObjectSymbol3DLayerResourcePrimitive,
  VerticalAlignment,
  WaterbodySize,
  WaveStrength
} from "./lib/types";
import LineSymbol3DLayerForm from "./LineSymbol3DLayerForm";
import ObjectSymbol3DLayerForm from "./ObjectSymbol3DLayerForm";
import TextSymbol3DLayerForm from "./TextSymbol3DLayerForm";
import WaterSymbol3DLayerForm from "./WaterSymbol3DLayerForm";

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
    newIconSymbol3DLayer.material = { color: new Color("red") };
    newIconSymbol3DLayer.outline = { color: new Color("black"), size: 1.5 };
    newIconSymbol3DLayer.resource = { href: undefined, primitive: "circle" };
    newIconSymbol3DLayer.size = 12;
    return newIconSymbol3DLayer;
  };

  const createNewLineSymbol3DLayer = (): LineSymbol3DLayer => {
    const newLineSymbol3DLayer = new LineSymbol3DLayer({
      material: { color: "#007ac2" },
      pattern: new LineStylePattern3D(),
      size: 3
    });
    return newLineSymbol3DLayer;
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

  const createNewTextSymbol3DLayer = (): TextSymbol3DLayer => {
    const newTextSymbol3DLayer = new TextSymbol3DLayer();
    newTextSymbol3DLayer.background = { color: new Color("#aaaaaa") };
    newTextSymbol3DLayer.font = new Font();
    newTextSymbol3DLayer.halo = { color: new Color("#000000"), size: 0 };
    newTextSymbol3DLayer.horizontalAlignment = "center";
    newTextSymbol3DLayer.lineHeight = 1;
    newTextSymbol3DLayer.material = { color: new Color("#ffffff") };
    newTextSymbol3DLayer.size = 9;
    newTextSymbol3DLayer.text = "Hello World!";
    newTextSymbol3DLayer.verticalAlignment = "baseline";
    return newTextSymbol3DLayer;
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

  const addLineSymbol3DLayer = () => {
    const newSymbolLayers = symbolLayers.clone();
    const lineSymbol3DLayer = createNewLineSymbol3DLayer();
    newSymbolLayers.add(lineSymbol3DLayer);
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

  const addTextSymbol3DLayer = () => {
    const newSymbolLayers = symbolLayers.clone();
    const textSymbol3DLayer = createNewTextSymbol3DLayer();
    newSymbolLayers.add(textSymbol3DLayer);
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
    value: ColorMixMode
  ) => {
    const newSymbolLayers = symbolLayers.clone();
    const symbolLayer = newSymbolLayers.getItemAt(layerIndex) as FillSymbol3DLayer;
    symbolLayer.material.colorMixMode = value as ColorMixMode;
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
      symbolLayer.outline.pattern.style = value as LineStyle;
    }

    setSymbolLayers(newSymbolLayers);
    updateSymbolLayers(newSymbolLayers);
  };

  const handleFillSymbol3DLayerOutlinePatternCapChange = (layerIndex: number, value: string) => {
    const newSymbolLayers = symbolLayers.clone();
    const symbolLayer = newSymbolLayers.getItemAt(layerIndex) as FillSymbol3DLayer;
    symbolLayer.outline.patternCap = value as Cap;
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

  const handleFillSymbol3DLayerPatternStyleChange = (layerIndex: number, value: Fill) => {
    const newSymbolLayers = symbolLayers.clone();
    const symbolLayer = newSymbolLayers.getItemAt(layerIndex) as FillSymbol3DLayer;
    symbolLayer.pattern.style = value as Fill;
    setSymbolLayers(newSymbolLayers);
    updateSymbolLayers(newSymbolLayers);
  };

  const handleIconSymbol3DLayerAnchorChange = (
    layerIndex: number,
    value: IconSymbol3DLayerAnchor
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
    value: IconSymbol3DLayerResourcePrimitive
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

  const handleLineSymbol3DLayerCapChange = (layerIndex: number, value: string) => {
    const newSymbolLayers = symbolLayers.clone();
    const symbolLayer = newSymbolLayers.getItemAt(layerIndex) as LineSymbol3DLayer;
    symbolLayer.cap = value as Cap;
    setSymbolLayers(newSymbolLayers);
    updateSymbolLayers(newSymbolLayers);
  };

  const handleLineSymbol3DLayerJoinChange = (layerIndex: number, value: string) => {
    const newSymbolLayers = symbolLayers.clone();
    const symbolLayer = newSymbolLayers.getItemAt(layerIndex) as LineSymbol3DLayer;
    symbolLayer.join = value as Join;
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
    symbolLayer.marker.placement = value as MarkerPlacement;
    setSymbolLayers(newSymbolLayers);
    updateSymbolLayers(newSymbolLayers);
  };

  const handleLineSymbol3DLayerMarkerStyleChange = (layerIndex: number, value: string) => {
    const newSymbolLayers = symbolLayers.clone();
    const symbolLayer = newSymbolLayers.getItemAt(layerIndex) as LineSymbol3DLayer;
    symbolLayer.marker.style = value as LineStyleMarker3DStyle;
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
    symbolLayer.pattern.style = value as LineStyle;
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

  const handleObjectSymbol3DLayerAnchorChange = (
    layerIndex: number,
    value: ObjectSymbol3DLayerAnchor
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
    value: ObjectSymbol3DLayerResourcePrimitive
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

  const handleTextSymbol3DLayerBackgroundColorChange = (layerIndex: number, value: string) => {
    const newSymbolLayers = symbolLayers.clone();
    const symbolLayer = newSymbolLayers.getItemAt(layerIndex) as TextSymbol3DLayer;
    symbolLayer.background.color = new Color(value);
    setSymbolLayers(newSymbolLayers);
    updateSymbolLayers(newSymbolLayers);
  };

  const handleTextSymbol3DLayerFontDecorationChange = (
    layerIndex: number,
    value: FontDecoration
  ) => {
    const newSymbolLayers = symbolLayers.clone();
    const symbolLayer = newSymbolLayers.getItemAt(layerIndex) as TextSymbol3DLayer;
    symbolLayer.font.decoration = value;
    setSymbolLayers(newSymbolLayers);
    updateSymbolLayers(newSymbolLayers);
  };

  const handleTextSymbol3DLayerFontFamilyChange = (layerIndex: number, value: string) => {
    const newSymbolLayers = symbolLayers.clone();
    const symbolLayer = newSymbolLayers.getItemAt(layerIndex) as TextSymbol3DLayer;
    symbolLayer.font.family = value;
    setSymbolLayers(newSymbolLayers);
    updateSymbolLayers(newSymbolLayers);
  };

  const handleTextSymbol3DLayerFontSizeChange = (layerIndex: number, value: string) => {
    const newSymbolLayers = symbolLayers.clone();
    const symbolLayer = newSymbolLayers.getItemAt(layerIndex) as TextSymbol3DLayer;
    symbolLayer.font.size = Number(value);
    setSymbolLayers(newSymbolLayers);
    updateSymbolLayers(newSymbolLayers);
  };

  const handleTextSymbol3DLayerFontStyleChange = (layerIndex: number, value: FontStyle) => {
    const newSymbolLayers = symbolLayers.clone();
    const symbolLayer = newSymbolLayers.getItemAt(layerIndex) as TextSymbol3DLayer;
    symbolLayer.font.style = value as FontStyle;
    setSymbolLayers(newSymbolLayers);
    updateSymbolLayers(newSymbolLayers);
  };

  const handleTextSymbol3DLayerFontWeightChange = (layerIndex: number, value: FontWeight) => {
    const newSymbolLayers = symbolLayers.clone();
    const symbolLayer = newSymbolLayers.getItemAt(layerIndex) as TextSymbol3DLayer;
    symbolLayer.font.weight = value as FontWeight;
    setSymbolLayers(newSymbolLayers);
    updateSymbolLayers(newSymbolLayers);
  };

  const handleTextSymbol3DLayerHaloColorChange = (layerIndex: number, value: string) => {
    const newSymbolLayers = symbolLayers.clone();
    const symbolLayer = newSymbolLayers.getItemAt(layerIndex) as TextSymbol3DLayer;
    symbolLayer.halo.color = new Color(value);
    setSymbolLayers(newSymbolLayers);
    updateSymbolLayers(newSymbolLayers);
  };

  const handleTextSymbol3DLayerHaloSizeChange = (layerIndex: number, value: string) => {
    const newSymbolLayers = symbolLayers.clone();
    const symbolLayer = newSymbolLayers.getItemAt(layerIndex) as TextSymbol3DLayer;
    symbolLayer.halo.size = Number(value);
    setSymbolLayers(newSymbolLayers);
    updateSymbolLayers(newSymbolLayers);
  };

  const handleTextSymbol3DLayerHorizontalAlignmentChange = (
    layerIndex: number,
    value: HorizontalAlignment
  ) => {
    const newSymbolLayers = symbolLayers.clone();
    const symbolLayer = newSymbolLayers.getItemAt(layerIndex) as TextSymbol3DLayer;
    symbolLayer.horizontalAlignment = value;
    setSymbolLayers(newSymbolLayers);
    updateSymbolLayers(newSymbolLayers);
  };

  const handleTextSymbol3DLayerLineHeightChange = (layerIndex: number, value: string) => {
    const newSymbolLayers = symbolLayers.clone();
    const symbolLayer = newSymbolLayers.getItemAt(layerIndex) as TextSymbol3DLayer;
    symbolLayer.lineHeight = Number(value);
    setSymbolLayers(newSymbolLayers);
    updateSymbolLayers(newSymbolLayers);
  };

  const handleTextSymbol3DLayerMaterialColorChange = (layerIndex: number, value: string) => {
    const newSymbolLayers = symbolLayers.clone();
    const symbolLayer = newSymbolLayers.getItemAt(layerIndex) as TextSymbol3DLayer;
    symbolLayer.material.color = new Color(value);
    setSymbolLayers(newSymbolLayers);
    updateSymbolLayers(newSymbolLayers);
  };

  const handleTextSymbol3DLayerSizeChange = (layerIndex: number, value: string) => {
    const newSymbolLayers = symbolLayers.clone();
    const symbolLayer = newSymbolLayers.getItemAt(layerIndex) as TextSymbol3DLayer;
    symbolLayer.size = Number(value);
    setSymbolLayers(newSymbolLayers);
    updateSymbolLayers(newSymbolLayers);
  };

  const handleTextSymbol3DLayerTextChange = (layerIndex: number, value: string) => {
    const newSymbolLayers = symbolLayers.clone();
    const symbolLayer = newSymbolLayers.getItemAt(layerIndex) as TextSymbol3DLayer;
    symbolLayer.text = value;
    setSymbolLayers(newSymbolLayers);
    updateSymbolLayers(newSymbolLayers);
  };

  const handleTextSymbol3DLayerVerticalAlignmentChange = (
    layerIndex: number,
    value: VerticalAlignment
  ) => {
    const newSymbolLayers = symbolLayers.clone();
    const symbolLayer = newSymbolLayers.getItemAt(layerIndex) as TextSymbol3DLayer;
    symbolLayer.verticalAlignment = value;
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

  const handleWaterSymbol3DLayerWaterbodySizeChange = (layerIndex: number, value: string) => {
    const newSymbolLayers = symbolLayers.clone();
    const symbolLayer = newSymbolLayers.getItemAt(layerIndex) as WaterSymbol3DLayer;
    symbolLayer.waterbodySize = value as WaterbodySize;
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

  const handleWaterSymbol3DLayerWaveStrengthChange = (layerIndex: number, value: string) => {
    const newSymbolLayers = symbolLayers.clone();
    const symbolLayer = newSymbolLayers.getItemAt(layerIndex) as WaterSymbol3DLayer;
    symbolLayer.waveStrength = value as WaveStrength;
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

          if (symbolLayer.type === "text") {
            symbol3DLayerCollectionForm.push(
              <CalciteBlock collapsible heading={`symbolLayers[${index}]`} key={index}>
                <CalciteAction
                  icon="trash"
                  onClick={() => deleteSymbol3DLayer(index)}
                  slot="control"
                  text="Delete"
                />
                <TextSymbol3DLayerForm
                  layerIndex={index}
                  handleTextSymbol3DLayerBackgroundColorChange={
                    handleTextSymbol3DLayerBackgroundColorChange
                  }
                  handleTextSymbol3DLayerFontDecorationChange={
                    handleTextSymbol3DLayerFontDecorationChange
                  }
                  handleTextSymbol3DLayerFontFamilyChange={handleTextSymbol3DLayerFontFamilyChange}
                  handleTextSymbol3DLayerFontSizeChange={handleTextSymbol3DLayerFontSizeChange}
                  handleTextSymbol3DLayerFontStyleChange={handleTextSymbol3DLayerFontStyleChange}
                  handleTextSymbol3DLayerFontWeightChange={handleTextSymbol3DLayerFontWeightChange}
                  handleTextSymbol3DLayerHaloColorChange={handleTextSymbol3DLayerHaloColorChange}
                  handleTextSymbol3DLayerHaloSizeChange={handleTextSymbol3DLayerHaloSizeChange}
                  handleHorizontalAlignmentChange={handleTextSymbol3DLayerHorizontalAlignmentChange}
                  handleLineHeightChange={handleTextSymbol3DLayerLineHeightChange}
                  handleTextSymbol3DLayerMaterialColorChange={
                    handleTextSymbol3DLayerMaterialColorChange
                  }
                  handleSizeChange={handleTextSymbol3DLayerSizeChange}
                  handleTextChange={handleTextSymbol3DLayerTextChange}
                  handleVerticalAlignmentChange={handleTextSymbol3DLayerVerticalAlignmentChange}
                ></TextSymbol3DLayerForm>
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
        <CalciteAction
          onClick={() => addFillSymbol3DLayer()}
          slot="header-menu-actions"
          icon="plus"
          text-enabled
          text="Add FillSymbol3DLayer"
        ></CalciteAction>

        <CalciteAction
          onClick={() => addExtrudeSymbol3DLayer()}
          slot="header-menu-actions"
          icon="plus"
          text-enabled
          text="Add ExtrudeSymbol3DLayer"
        ></CalciteAction>

        <CalciteAction
          onClick={() => addWaterSymbol3DLayer()}
          slot="header-menu-actions"
          icon="plus"
          text-enabled
          text="Add WaterSymbol3DLayer"
        ></CalciteAction>

        <CalciteAction
          onClick={() => addLineSymbol3DLayer()}
          slot="header-menu-actions"
          icon="plus"
          text-enabled
          text="Add LineSymbol3DLayer"
        ></CalciteAction>

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

        <CalciteAction
          onClick={() => addTextSymbol3DLayer()}
          slot="header-menu-actions"
          icon="plus"
          text-enabled
          text="Add TextSymbol3DLayer"
        ></CalciteAction>

        {createSymbol3DLayerCollectionForm()}
      </CalciteBlock>
    </React.Fragment>
  );
};

export default PolygonSymbol3DSymbolLayersForm;
