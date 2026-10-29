import type Edges3D from "@arcgis/core/symbols/edges/Edges3D.js";
import SolidEdges3D from "@arcgis/core/symbols/edges/SolidEdges3D.js";
import SketchEdges3D from "@arcgis/core/symbols/edges/SketchEdges3D.js";
import "@esri/calcite-components/components/calcite-input";
import "@esri/calcite-components/components/calcite-input-number";
import "@esri/calcite-components/components/calcite-label";
import { useState } from "react";
import { labelStyles } from "./lib/styles";
import { edgeStyleOptions } from "./lib/constants";
import "@esri/calcite-components/components/calcite-switch";
import "@esri/calcite-components/components/calcite-select";
import "@esri/calcite-components/components/calcite-option";

export type EdgesChangeHandler = (
  layerIndex: number,
  value: Edges3D | null,
) => void;

interface Props {
  edges: Edges3D | null | undefined;
  handleEdgesChange: EdgesChangeHandler;
  layerIndex: number;
  handleColorChange: (layerIndex: number, value: string) => void;
  handleExtensionLengthChange: (layerIndex: number, value: string) => void;
  handleSizeChange: (layerIndex: number, value: string) => void;
}

function Edges3DForm({
  edges,
  handleEdgesChange,
  layerIndex,
  handleColorChange,
  handleExtensionLengthChange,
  handleSizeChange,
}: Props): React.ReactElement {
  const [saved, setSaved] = useState(
    edges?.clone() ?? new SolidEdges3D({ color: "#000000", size: 1 }),
  );

  return (
    <>
      <calcite-label layout="default" style={labelStyles}>
        enabled
        <calcite-switch
          label="edges enabled"
          checked={!!edges}
          oncalciteSwitchChange={(event) => {
            if (edges) setSaved(edges.clone());
            handleEdgesChange(
              layerIndex,
              event.target.checked ? saved.clone() : null,
            );
          }}
        ></calcite-switch>
      </calcite-label>
      {edges && (
        <>
          <calcite-label layout="default" style={labelStyles}>
            type
            <calcite-select
              label="edges type selection"
              value={edges instanceof SketchEdges3D ? "sketch" : "solid"}
              oncalciteSelectChange={(event) => {
                const Constructor =
                  event.target.value === "sketch"
                    ? SketchEdges3D
                    : SolidEdges3D;
                handleEdgesChange(
                  layerIndex,
                  new Constructor({
                    color: edges.color,
                    size: edges.size,
                    extensionLength: edges.extensionLength,
                  }),
                );
              }}
            >
              {edgeStyleOptions.map((option) => (
                <calcite-option key={option} value={option}>
                  {option}
                </calcite-option>
              ))}
            </calcite-select>
          </calcite-label>
          <calcite-label layout="default" style={labelStyles}>
            color
            <calcite-input
              oncalciteInputInput={(event) => {
                if (event.target.value)
                  handleColorChange(layerIndex, event.target.value);
              }}
              type="color"
              value={edges.color?.toHex() ?? "#000000"}
            ></calcite-input>
          </calcite-label>

          <calcite-label layout="default" style={labelStyles}>
            extensionLength
            <calcite-input-number
              label={"extensionLength input"}
              min={0}
              oncalciteInputNumberChange={(event) => {
                handleExtensionLengthChange(layerIndex, event.target.value);
              }}
              value={String(edges.extensionLength)}
            ></calcite-input-number>
          </calcite-label>

          <calcite-label layout="default" style={labelStyles}>
            size
            <calcite-input-number
              label={"size input"}
              min={0}
              oncalciteInputNumberChange={(event) => {
                handleSizeChange(layerIndex, event.target.value);
              }}
              value={String(edges.size)}
            ></calcite-input-number>
          </calcite-label>
        </>
      )}
    </>
  );
}

export default Edges3DForm;
