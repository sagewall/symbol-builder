import type PathSymbol3DLayer from "@arcgis/core/symbols/PathSymbol3DLayer";
import React, { useState } from "react";
import PathSymbol3DLayerMaterialForm from "./PathSymbol3DLayerMaterialForm";
import {
  CAP_3D_OPTIONS,
  JOIN_OPTIONS,
  PATH_SYMBOL_3D_LAYER_ANCHOR_OPTIONS,
  PROFILE_OPTIONS,
  ROTATION_OPTIONS
} from "./lib/constants";
import { blockStyles, labelStyles } from "./lib/styles";

interface Props {
  layerIndex: number;
  handleAnchorChange: (
    layerIndex: number,
    value: InstanceType<typeof PathSymbol3DLayer>["anchor"]
  ) => void;
  handleCapChange: (
    layerIndex: number,
    value: InstanceType<typeof PathSymbol3DLayer>["cap"]
  ) => void;
  handleCastShadowsChange: (layerIndex: number, value: boolean) => void;
  handleHeightChange: (layerIndex: number, value: string) => void;
  handleJoinChange: (
    layerIndex: number,
    value: InstanceType<typeof PathSymbol3DLayer>["join"]
  ) => void;
  handlePathSymbol3DLayerMaterialColorChange: (layerIndex: number, value: string) => void;
  handleProfileChange: (
    layerIndex: number,
    value: InstanceType<typeof PathSymbol3DLayer>["profile"]
  ) => void;
  handleProfileRotationChange: (
    layerIndex: number,
    value: InstanceType<typeof PathSymbol3DLayer>["profileRotation"]
  ) => void;
  handleWidthChange: (layerIndex: number, value: string) => void;
}

const LineSymbol3DLayerForm = ({
  layerIndex,
  handleAnchorChange,
  handleCapChange,
  handleCastShadowsChange,
  handleHeightChange,
  handleJoinChange,
  handlePathSymbol3DLayerMaterialColorChange,
  handleProfileChange,
  handleProfileRotationChange,
  handleWidthChange
}: Props) => {
  const [anchor, setAnchor] = useState("center");
  const [cap, setCap] = useState("butt");
  const [castShadows, setCastShadows] = useState(true);
  const [height, setHeight] = useState("5");
  const [join, setJoin] = useState("miter");
  const [profile, setProfile] = useState("quad");
  const [profileRotation, setProfileRotation] = useState("all");
  const [width, setWidth] = useState("3");

  return (
    <React.Fragment>
      <calcite-label layout="default" style={labelStyles}>
        anchor
        <calcite-select
          label={"anchor selection"}
          oncalciteSelectChange={(event) => {
            setAnchor(event.target.value);
            handleAnchorChange(
              layerIndex,
              event.target.value as InstanceType<typeof PathSymbol3DLayer>["anchor"]
            );
          }}
          value={anchor}
        >
          {PATH_SYMBOL_3D_LAYER_ANCHOR_OPTIONS.map((option, index) => (
            <calcite-option key={index}>{option}</calcite-option>
          ))}
        </calcite-select>
      </calcite-label>

      <calcite-label layout="default" style={labelStyles}>
        cap
        <calcite-select
          label={"cap selection"}
          oncalciteSelectChange={(event) => {
            setCap(event.target.value);
            handleCapChange(
              layerIndex,
              event.target.value as InstanceType<typeof PathSymbol3DLayer>["cap"]
            );
          }}
          value={cap}
        >
          {CAP_3D_OPTIONS.map((option, index) => (
            <calcite-option key={index}>{option}</calcite-option>
          ))}
        </calcite-select>
      </calcite-label>

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

      <calcite-label layout="default" style={labelStyles}>
        height
        <calcite-input-number
          label={"height input"}
          min={0}
          oncalciteInputNumberChange={(event) => {
            setHeight(event.target.value);
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
            setWidth(event.target.value);
            handleWidthChange(layerIndex, event.target.value);
          }}
          value={width}
        ></calcite-input-number>
      </calcite-label>

      <calcite-label layout="default" style={labelStyles}>
        join
        <calcite-select
          label={"join selection"}
          oncalciteSelectChange={(event) => {
            setJoin(event.target.value);
            handleJoinChange(
              layerIndex,
              event.target.value as InstanceType<typeof PathSymbol3DLayer>["join"]
            );
          }}
          value={join}
        >
          {JOIN_OPTIONS.map((option, index) => (
            <calcite-option key={index}>{option}</calcite-option>
          ))}
        </calcite-select>
      </calcite-label>

      <calcite-block style={blockStyles} collapsible heading={"material"}>
        <PathSymbol3DLayerMaterialForm
          layerIndex={layerIndex}
          handleColorChange={handlePathSymbol3DLayerMaterialColorChange}
        ></PathSymbol3DLayerMaterialForm>
      </calcite-block>

      <calcite-label layout="default" style={labelStyles}>
        profile
        <calcite-select
          label={"profile selection"}
          oncalciteSelectChange={(event) => {
            setProfile(event.target.value);
            handleProfileChange(
              layerIndex,
              event.target.value as InstanceType<typeof PathSymbol3DLayer>["profile"]
            );
          }}
          value={profile}
        >
          {PROFILE_OPTIONS.map((option, index) => (
            <calcite-option key={index}>{option}</calcite-option>
          ))}
        </calcite-select>
      </calcite-label>

      <calcite-label layout="default" style={labelStyles}>
        profileRotation
        <calcite-select
          label={"profileRotation selection"}
          oncalciteSelectChange={(event) => {
            setProfileRotation(event.target.value);
            handleProfileRotationChange(
              layerIndex,
              event.target.value as InstanceType<typeof PathSymbol3DLayer>["profileRotation"]
            );
          }}
          value={profileRotation}
        >
          {ROTATION_OPTIONS.map((option, index) => (
            <calcite-option key={index}>{option}</calcite-option>
          ))}
        </calcite-select>
      </calcite-label>
    </React.Fragment>
  );
};

export default LineSymbol3DLayerForm;
