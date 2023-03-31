import {
  CalciteBlock,
  CalciteInputNumber,
  CalciteLabel,
  CalciteOption,
  CalciteSelect,
  CalciteSwitch
} from "@esri/calcite-components-react";
import React, { createRef, useEffect, useState } from "react";
import {
  CAP_3D_OPTIONS,
  JOIN_OPTIONS,
  PATH_SYMBOL_3D_LAYER_ANCHOR_OPTIONS,
  PROFILE_OPTIONS,
  ROTATION_OPTIONS
} from "./lib/constants";
import { blockStyles, labelStyles } from "./lib/styles";
import { PathSymbol3DLayerAnchor, Cap3D, Join, Profile, Rotation } from "./lib/types";
import PathSymbol3DLayerMaterialForm from "./PathSymbol3DLayerMaterialForm";

interface Props {
  layerIndex: number;
  handleAnchorChange: (layerIndex: number, value: PathSymbol3DLayerAnchor) => void;
  handleCapChange: (layerIndex: number, value: Cap3D) => void;
  handleCastShadowsChange: (layerIndex: number, value: boolean) => void;
  handleHeightChange: (layerIndex: number, value: string) => void;
  handleJoinChange: (layerIndex: number, value: Join) => void;
  handlePathSymbol3DLayerMaterialColorChange: (layerIndex: number, value: string) => void;
  handleProfileChange: (layerIndex: number, value: Profile) => void;
  handleProfileRotationChange: (layerIndex: number, value: Rotation) => void;
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

  const castShadowsRef: React.Ref<HTMLCalciteSwitchElement> | undefined = createRef();

  useEffect(() => {
    if (castShadowsRef.current) {
      castShadowsRef.current.checked = true;
    }
  }, []);

  return (
    <React.Fragment>
      <CalciteLabel layout="default" style={labelStyles}>
        anchor
        <CalciteSelect
          label={"anchor selection"}
          onCalciteSelectChange={(event) => {
            setAnchor(event.target.value);
            handleAnchorChange(layerIndex, event.target.value as PathSymbol3DLayerAnchor);
          }}
          value={anchor}
        >
          {PATH_SYMBOL_3D_LAYER_ANCHOR_OPTIONS.map((option, index) => (
            <CalciteOption key={index}>{option}</CalciteOption>
          ))}
        </CalciteSelect>
      </CalciteLabel>

      <CalciteLabel layout="default" style={labelStyles}>
        cap
        <CalciteSelect
          label={"cap selection"}
          onCalciteSelectChange={(event) => {
            setCap(event.target.value);
            handleCapChange(layerIndex, event.target.value as Cap3D);
          }}
          value={cap}
        >
          {CAP_3D_OPTIONS.map((option, index) => (
            <CalciteOption key={index}>{option}</CalciteOption>
          ))}
        </CalciteSelect>
      </CalciteLabel>

      <CalciteLabel layout="default" style={labelStyles}>
        castShadows
        <CalciteSwitch
          onCalciteSwitchChange={(event) => {
            setCastShadows(event.target.checked);
            handleCastShadowsChange(layerIndex, event.target.checked);
          }}
          ref={castShadowsRef}
          value={castShadows}
        ></CalciteSwitch>
      </CalciteLabel>

      <CalciteLabel layout="default" style={labelStyles}>
        height
        <CalciteInputNumber
          label={"height input"}
          min={0}
          onCalciteInputNumberChange={(event) => {
            setHeight(event.target.value);
            handleHeightChange(layerIndex, event.target.value);
          }}
          value={height}
        ></CalciteInputNumber>
      </CalciteLabel>

      <CalciteLabel layout="default" style={labelStyles}>
        join
        <CalciteSelect
          label={"join selection"}
          onCalciteSelectChange={(event) => {
            setJoin(event.target.value);
            handleJoinChange(layerIndex, event.target.value as Join);
          }}
          value={join}
        >
          {JOIN_OPTIONS.map((option, index) => (
            <CalciteOption key={index}>{option}</CalciteOption>
          ))}
        </CalciteSelect>
      </CalciteLabel>

      <CalciteBlock style={blockStyles} collapsible heading={"material"}>
        <PathSymbol3DLayerMaterialForm
          layerIndex={layerIndex}
          handleColorChange={handlePathSymbol3DLayerMaterialColorChange}
        ></PathSymbol3DLayerMaterialForm>
      </CalciteBlock>

      <CalciteLabel layout="default" style={labelStyles}>
        profile
        <CalciteSelect
          label={"profile selection"}
          onCalciteSelectChange={(event) => {
            setProfile(event.target.value);
            handleProfileChange(layerIndex, event.target.value as Profile);
          }}
          value={profile}
        >
          {PROFILE_OPTIONS.map((option, index) => (
            <CalciteOption key={index}>{option}</CalciteOption>
          ))}
        </CalciteSelect>
      </CalciteLabel>

      <CalciteLabel layout="default" style={labelStyles}>
        profileRotation
        <CalciteSelect
          label={"profileRotation selection"}
          onCalciteSelectChange={(event) => {
            setProfileRotation(event.target.value);
            handleProfileRotationChange(layerIndex, event.target.value as Rotation);
          }}
          value={profileRotation}
        >
          {ROTATION_OPTIONS.map((option, index) => (
            <CalciteOption key={index}>{option}</CalciteOption>
          ))}
        </CalciteSelect>
      </CalciteLabel>

      <CalciteLabel layout="default" style={labelStyles}>
        width
        <CalciteInputNumber
          label={"width input"}
          min={0}
          onCalciteInputNumberChange={(event) => {
            setWidth(event.target.value);
            handleWidthChange(layerIndex, event.target.value);
          }}
          value={width}
        ></CalciteInputNumber>
      </CalciteLabel>
    </React.Fragment>
  );
};

export default LineSymbol3DLayerForm;
