import "@esri/calcite-components/dist/components/calcite-block";
import "@esri/calcite-components/dist/components/calcite-input-number";
import "@esri/calcite-components/dist/components/calcite-label";
import "@esri/calcite-components/dist/components/calcite-switch";
import { useState } from "react";
import Edges3DForm, { type EdgesChangeHandler } from "./Edges3DForm";
import type Edges3D from "@arcgis/core/symbols/edges/Edges3D.js";
import ExtrudeSymbol3DLayerMaterialForm from "./ExtrudeSymbol3DLayerMaterialForm";
import type { EmissiveChangeHandler } from "./Symbol3DEmissiveForm";
import { blockStyles, labelStyles } from "./lib/styles";

interface Props {
  edges: Edges3D | null | undefined;
  handleEdgesChange: EdgesChangeHandler;
  handleMaterialEmissiveChange?: EmissiveChangeHandler;
  layerIndex: number;
  handleCastShadowsChange: (layerIndex: number, value: boolean) => void;
  handleExtrudeSymbol3DLayerEdgesColorChange: (
    layerIndex: number,
    value: string,
  ) => void;
  handleExtrudeSymbol3DLayerEdgesExtensionLengthChange: (
    layerIndex: number,
    value: string,
  ) => void;
  handleExtrudeSymbol3DLayerEdgesSizeChange: (
    layerIndex: number,
    value: string,
  ) => void;
  handleExtrudeSymbol3DLayerMaterialColorChange: (
    layerIndex: number,
    value: string,
  ) => void;
  handleSizeChange: (layerIndex: number, value: string) => void;
}

function FillSymbol3DLayerForm({
  edges,
  handleEdgesChange,
  handleMaterialEmissiveChange,
  layerIndex,
  handleCastShadowsChange,
  handleExtrudeSymbol3DLayerEdgesColorChange,
  handleExtrudeSymbol3DLayerEdgesExtensionLengthChange,
  handleExtrudeSymbol3DLayerEdgesSizeChange,
  handleExtrudeSymbol3DLayerMaterialColorChange,
  handleSizeChange,
}: Props): React.ReactElement {
  const [castShadows, setCastShadows] = useState(true);
  const [size, setSize] = useState("20");

  return (
    <>
      <calcite-label layout="default" style={labelStyles}>
        castShadows
        <calcite-switch
          checked={castShadows}
          oncalciteSwitchChange={(event) => {
            setCastShadows(event.target.checked);
            handleCastShadowsChange(layerIndex, event.target.checked);
          }}
          value={castShadows}
        ></calcite-switch>
      </calcite-label>

      <calcite-block style={blockStyles} expandable heading={"edges"}>
        <Edges3DForm
          edges={edges}
          handleEdgesChange={handleEdgesChange}
          layerIndex={layerIndex}
          handleColorChange={handleExtrudeSymbol3DLayerEdgesColorChange}
          handleExtensionLengthChange={
            handleExtrudeSymbol3DLayerEdgesExtensionLengthChange
          }
          handleSizeChange={handleExtrudeSymbol3DLayerEdgesSizeChange}
        ></Edges3DForm>
      </calcite-block>

      <calcite-block style={blockStyles} expandable heading={"material"}>
        <ExtrudeSymbol3DLayerMaterialForm
          handleEmissiveChange={handleMaterialEmissiveChange}
          layerIndex={layerIndex}
          handleColorChange={handleExtrudeSymbol3DLayerMaterialColorChange}
        ></ExtrudeSymbol3DLayerMaterialForm>
      </calcite-block>

      <calcite-label layout="default" style={labelStyles}>
        size
        <calcite-input-number
          label={"size input"}
          min={0}
          oncalciteInputNumberChange={(event) => {
            setSize(event.target.value);
            handleSizeChange(layerIndex, event.target.value);
          }}
          value={size}
        ></calcite-input-number>
      </calcite-label>
    </>
  );
}

export default FillSymbol3DLayerForm;
