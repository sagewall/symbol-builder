import Color from "@arcgis/core/Color";
import Collection from "@arcgis/core/core/Collection";
import SolidEdges3D from "@arcgis/core/symbols/edges/SolidEdges3D";
import ExtrudeSymbol3DLayer from "@arcgis/core/symbols/ExtrudeSymbol3DLayer";
import FillSymbol3DLayer from "@arcgis/core/symbols/FillSymbol3DLayer";
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
import { blockStyles } from "./lib/styles";
import {
  Cap,
  ColorMixMode,
  Fill,
  Join,
  LineStyle,
  LineStyleMarker3DStyle,
  MarkerPlacement
} from "./lib/types";
import LineSymbol3DLayerForm from "./LineSymbol3DLayerForm";

interface PageProps {
  updateSymbolLayers: (newSymbolLayers: Collection) => void;
}
const PolygonSymbol3DSymbolLayersForm = ({ updateSymbolLayers }: PageProps) => {
  const createNewFillSymbol3DLayer = (): FillSymbol3DLayer => {
    const newFillSymbol3DLayer = new FillSymbol3DLayer({
      material: {
        color: "#007ac2"
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

  const createNewExtrudeSymbol3DLayer = (): ExtrudeSymbol3DLayer => {
    const newExtrudeSymbol3DLayer = new ExtrudeSymbol3DLayer({
      edges: new SolidEdges3D(),
      material: { color: "#007ac2" },
      size: 3000
    });
    return newExtrudeSymbol3DLayer;
  };

  const createNewLineSymbol3DLayer = (): LineSymbol3DLayer => {
    const newLineSymbol3DLayer = new LineSymbol3DLayer({
      material: { color: "#007ac2" },
      pattern: new LineStylePattern3D(),
      size: 3
    });
    return newLineSymbol3DLayer;
  };

  const [symbolLayers, setSymbolLayers] = useState(new Collection());

  const addFillSymbol3DLayer = () => {
    const newSymbolLayers = symbolLayers.clone();
    const fillSymbol3DLayer = createNewFillSymbol3DLayer();
    newSymbolLayers.add(fillSymbol3DLayer);
    setSymbolLayers(newSymbolLayers);
    updateSymbolLayers(newSymbolLayers);
  };

  const addExtrudeSymbol3DLayer = () => {
    const newSymbolLayers = symbolLayers.clone();
    const extrudeSymbol3DLayer = createNewExtrudeSymbol3DLayer();
    newSymbolLayers.add(extrudeSymbol3DLayer);
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
      symbolLayer.marker = new LineStyleMarker3D();
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

export default PolygonSymbol3DSymbolLayersForm;
