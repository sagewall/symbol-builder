import type ObjectSymbol3DLayer from "@arcgis/core/symbols/ObjectSymbol3DLayer.js";
import "@esri/calcite-components/dist/components/calcite-block";
import "@esri/calcite-components/dist/components/calcite-input-number";
import "@esri/calcite-components/dist/components/calcite-label";
import "@esri/calcite-components/dist/components/calcite-option";
import "@esri/calcite-components/dist/components/calcite-select";
import "@esri/calcite-components/dist/components/calcite-slider";
import "@esri/calcite-components/dist/components/calcite-switch";
import { objectSymbol3DLayerAnchorOptions } from "./lib/constants";
import { blockStyles, labelStyles } from "./lib/styles";
import ObjectSymbol3DLayerAnchorPositionForm from "./ObjectSymbol3DLayerAnchorPositionForm";
import ObjectSymbol3DLayerMaterialForm from "./ObjectSymbol3DLayerMaterialForm";
import type { EmissiveChangeHandler } from "./Symbol3DEmissiveForm";
import ObjectSymbol3DLayerResourceForm from "./ObjectSymbol3DLayerResourceForm";

interface Props {
  symbolLayer: ObjectSymbol3DLayer;
  handleMaterialEmissiveChange?: EmissiveChangeHandler;
  layerIndex: number;
  handleAnchorChange: (
    layerIndex: number,
    value: InstanceType<typeof ObjectSymbol3DLayer>["anchor"],
  ) => void;
  handleObjectSymbol3DLayerAnchorPositionXChange: (
    layerIndex: number,
    value: string,
  ) => void;
  handleObjectSymbol3DLayerAnchorPositionYChange: (
    layerIndex: number,
    value: string,
  ) => void;
  handleObjectSymbol3DLayerAnchorPositionZChange: (
    layerIndex: number,
    value: string,
  ) => void;
  handleCastShadowsChange: (layerIndex: number, value: boolean) => void;
  handleDepthChange: (layerIndex: number, value: string) => void;
  handleHeadingChange: (layerIndex: number, value: number) => void;
  handleHeightChange: (layerIndex: number, value: string) => void;
  handleObjectSymbol3DLayerMaterialColorChange: (
    layerIndex: number,
    value: string,
  ) => void;
  handleObjectSymbol3DLayerResourceHrefChange: (
    layerIndex: number,
    value: string,
  ) => void;
  handleObjectSymbol3DLayerResourcePrimitiveChange: (
    layerIndex: number,
    value: NonNullable<
      NonNullable<
        InstanceType<typeof ObjectSymbol3DLayer>["resource"]
      >["primitive"]
    >,
  ) => void;
  handleRollChange: (layerIndex: number, value: number) => void;
  handleTiltChange: (layerIndex: number, value: number) => void;
  handleWidthChange: (layerIndex: number, value: string) => void;
}

function ObjectSymbol3DLayerForm({
  symbolLayer,
  handleMaterialEmissiveChange,
  layerIndex,
  handleAnchorChange,
  handleObjectSymbol3DLayerAnchorPositionXChange,
  handleObjectSymbol3DLayerAnchorPositionYChange,
  handleObjectSymbol3DLayerAnchorPositionZChange,
  handleCastShadowsChange,
  handleDepthChange,
  handleHeadingChange,
  handleHeightChange,
  handleObjectSymbol3DLayerMaterialColorChange,
  handleObjectSymbol3DLayerResourceHrefChange,
  handleObjectSymbol3DLayerResourcePrimitiveChange,
  handleRollChange,
  handleTiltChange,
  handleWidthChange,
}: Props): React.ReactElement {
  const { anchor, castShadows, heading, roll, tilt } = symbolLayer;
  const depth = String(symbolLayer.depth ?? "");
  const height = String(symbolLayer.height ?? "");
  const width = String(symbolLayer.width ?? "");

  return (
    <>
      <calcite-label layout="default" style={labelStyles}>
        anchor
        <calcite-select
          label={"anchor selection"}
          oncalciteSelectChange={(event) => {
            handleAnchorChange(
              layerIndex,
              event.target.value as InstanceType<
                typeof ObjectSymbol3DLayer
              >["anchor"],
            );
          }}
          value={anchor ?? ""}
        >
          {objectSymbol3DLayerAnchorOptions.map((option, index) => (
            <calcite-option key={index}>{option}</calcite-option>
          ))}
        </calcite-select>
      </calcite-label>

      {anchor === "relative" && (
        <calcite-block
          style={blockStyles}
          expandable
          heading={"anchorPosition"}
        >
          <ObjectSymbol3DLayerAnchorPositionForm
            symbolLayer={symbolLayer}
            layerIndex={layerIndex}
            handleObjectSymbol3DLayerAnchorPositionXChange={
              handleObjectSymbol3DLayerAnchorPositionXChange
            }
            handleObjectSymbol3DLayerAnchorPositionYChange={
              handleObjectSymbol3DLayerAnchorPositionYChange
            }
            handleObjectSymbol3DLayerAnchorPositionZChange={
              handleObjectSymbol3DLayerAnchorPositionZChange
            }
          ></ObjectSymbol3DLayerAnchorPositionForm>
        </calcite-block>
      )}

      <calcite-label layout="default" style={labelStyles}>
        castShadows
        <calcite-switch
          oncalciteSwitchChange={(event) => {
            handleCastShadowsChange(layerIndex, event.target.checked);
          }}
          checked={castShadows}
        ></calcite-switch>
      </calcite-label>

      <calcite-label layout="default" style={labelStyles}>
        depth
        <calcite-input-number
          label={"depth input"}
          min={0}
          oncalciteInputNumberChange={(event) => {
            handleDepthChange(layerIndex, event.target.value);
          }}
          value={depth}
        ></calcite-input-number>
      </calcite-label>

      <calcite-label layout="default" style={labelStyles}>
        height
        <calcite-input-number
          label={"height input"}
          min={0}
          oncalciteInputNumberChange={(event) => {
            handleHeightChange(layerIndex, event.target.value);
          }}
          value={height}
        ></calcite-input-number>
      </calcite-label>

      <calcite-label layout="default" style={labelStyles}>
        width
        <calcite-input-number
          label={"width input"}
          min={0}
          oncalciteInputNumberChange={(event) => {
            handleWidthChange(layerIndex, event.target.value);
          }}
          value={width}
        ></calcite-input-number>
      </calcite-label>

      <calcite-block style={blockStyles} expandable heading={"material"}>
        <ObjectSymbol3DLayerMaterialForm
          symbolLayer={symbolLayer}
          handleEmissiveChange={handleMaterialEmissiveChange}
          layerIndex={layerIndex}
          handleColorChange={handleObjectSymbol3DLayerMaterialColorChange}
        ></ObjectSymbol3DLayerMaterialForm>
      </calcite-block>

      <calcite-block style={blockStyles} expandable heading={"resource"}>
        <ObjectSymbol3DLayerResourceForm
          symbolLayer={symbolLayer}
          layerIndex={layerIndex}
          handleHrefChange={handleObjectSymbol3DLayerResourceHrefChange}
          handlePrimitiveChange={
            handleObjectSymbol3DLayerResourcePrimitiveChange
          }
        ></ObjectSymbol3DLayerResourceForm>
      </calcite-block>

      <calcite-label layout="default" style={labelStyles}>
        heading
        <calcite-slider
          labelHandles={true}
          labelTicks={true}
          max={360}
          min={0}
          oncalciteSliderChange={(event) => {
            handleHeadingChange(layerIndex, event.target.value as number);
          }}
          step={1}
          ticks={90}
          value={heading ?? 0}
        ></calcite-slider>
      </calcite-label>

      <calcite-label layout="default" style={labelStyles}>
        roll
        <calcite-slider
          labelHandles={true}
          labelTicks={true}
          max={360}
          min={0}
          oncalciteSliderChange={(event) => {
            handleRollChange(layerIndex, event.target.value as number);
          }}
          step={1}
          ticks={90}
          value={roll ?? 0}
        ></calcite-slider>
      </calcite-label>

      <calcite-label layout="default" style={labelStyles}>
        tilt
        <calcite-slider
          labelHandles={true}
          labelTicks={true}
          max={360}
          min={0}
          oncalciteSliderChange={(event) => {
            handleTiltChange(layerIndex, event.target.value as number);
          }}
          step={1}
          ticks={90}
          value={tilt ?? 0}
        ></calcite-slider>
      </calcite-label>
    </>
  );
}

export default ObjectSymbol3DLayerForm;
