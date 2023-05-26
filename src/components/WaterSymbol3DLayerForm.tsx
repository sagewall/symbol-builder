import type WaterSymbol3DLayer from "@arcgis/core/symbols/WaterSymbol3DLayer";
import {
  CalciteInput,
  CalciteLabel,
  CalciteOption,
  CalciteSelect,
  CalciteSlider
} from "@esri/calcite-components-react";
import React, { useState } from "react";
import { WATERBODY_SIZE_OPTIONS, WAVE_STRENGTH_OPTIONS } from "./lib/constants";
import { labelStyles } from "./lib/styles";

interface Props {
  layerIndex: number;
  handleColorChange: (layerIndex: number, value: string) => void;
  handleWaterbodySizeChange: (
    layerIndex: number,
    value: InstanceType<typeof WaterSymbol3DLayer>["waterbodySize"]
  ) => void;
  handleWaveDirectionChange: (layerIndex: number, value: number) => void;
  handleWaveStrengthChange: (
    layerIndex: number,
    value: InstanceType<typeof WaterSymbol3DLayer>["waveStrength"]
  ) => void;
}

const WaterSymbol3DLayerForm = ({
  layerIndex,
  handleColorChange,
  handleWaterbodySizeChange,
  handleWaveDirectionChange,
  handleWaveStrengthChange
}: Props) => {
  const [color, setColor] = useState("#0077BE");
  const [waterbodySize, setWaterbodySize] = useState("medium");
  const [waveDirection, setWaveDirection] = useState(0);
  const [waveStrength, setWaveStrength] = useState("moderate");

  return (
    <React.Fragment>
      <CalciteLabel layout="default" style={labelStyles}>
        color
        <CalciteInput
          onCalciteInputInput={(event) => {
            if (event.target.value) {
              setColor(event.target.value.toString());
            }
            handleColorChange(layerIndex, event.target.value as string);
          }}
          type="color"
          value={color}
        />
      </CalciteLabel>

      <CalciteLabel layout="default" style={labelStyles}>
        waterbodySize
        <CalciteSelect
          label={"waterbodySize selection"}
          onCalciteSelectChange={(event) => {
            setWaterbodySize(event.target.value);
            handleWaterbodySizeChange(
              layerIndex,
              event.target.value as InstanceType<typeof WaterSymbol3DLayer>["waterbodySize"]
            );
          }}
          value={waterbodySize}
        >
          {WATERBODY_SIZE_OPTIONS.map((option, index) =>
            option === "medium" ? (
              <CalciteOption key={index} selected>
                {option}
              </CalciteOption>
            ) : (
              <CalciteOption key={index}>{option}</CalciteOption>
            )
          )}
        </CalciteSelect>
      </CalciteLabel>

      <CalciteLabel layout="default" style={labelStyles}>
        waveDirection
        <CalciteSlider
          labelHandles={true}
          labelTicks={true}
          max={360}
          min={0}
          onCalciteSliderChange={(event) => {
            setWaveDirection(event.target.value as number);
            handleWaveDirectionChange(layerIndex, event.target.value as number);
          }}
          step={1}
          ticks={180}
          value={waveDirection}
        ></CalciteSlider>
      </CalciteLabel>

      <CalciteLabel layout="default" style={labelStyles}>
        waveStrength
        <CalciteSelect
          label={"waveStrength selection"}
          onCalciteSelectChange={(event) => {
            setWaveStrength(event.target.value);
            handleWaveStrengthChange(
              layerIndex,
              event.target.value as InstanceType<typeof WaterSymbol3DLayer>["waveStrength"]
            );
          }}
          value={waveStrength}
        >
          {WAVE_STRENGTH_OPTIONS.map((option, index) =>
            option === "moderate" ? (
              <CalciteOption key={index} selected>
                {option}
              </CalciteOption>
            ) : (
              <CalciteOption key={index}>{option}</CalciteOption>
            )
          )}
        </CalciteSelect>
      </CalciteLabel>
    </React.Fragment>
  );
};

export default WaterSymbol3DLayerForm;
