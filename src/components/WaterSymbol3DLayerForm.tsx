import type WaterSymbol3DLayer from "@arcgis/core/symbols/WaterSymbol3DLayer";
import "@esri/calcite-components/dist/components/calcite-input";
import "@esri/calcite-components/dist/components/calcite-label";
import "@esri/calcite-components/dist/components/calcite-option";
import "@esri/calcite-components/dist/components/calcite-select";
import "@esri/calcite-components/dist/components/calcite-slider";
import { useState } from "react";
import {
  WATERBODY_SIZE_OPTIONS,
  WAVE_STRENGTH_OPTIONS,
} from "../lib/constants";
import { labelStyles } from "../lib/styles";

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

function WaterSymbol3DLayerForm({
  layerIndex,
  handleColorChange,
  handleWaterbodySizeChange,
  handleWaveDirectionChange,
  handleWaveStrengthChange,
}: Props) {
  const [color, setColor] = useState("#0077BE");
  const [waterbodySize, setWaterbodySize] = useState("medium");
  const [waveDirection, setWaveDirection] = useState(0);
  const [waveStrength, setWaveStrength] = useState("moderate");

  return (
    <>
      <calcite-label layout="default" style={labelStyles}>
        color
        <calcite-input
          oncalciteInputInput={(event) => {
            if (event.target.value) {
              setColor(event.target.value.toString());
            }
            handleColorChange(layerIndex, event.target.value as string);
          }}
          type="color"
          value={color}
        ></calcite-input>
      </calcite-label>

      <calcite-label layout="default" style={labelStyles}>
        waterbodySize
        <calcite-select
          label={"waterbodySize selection"}
          oncalciteSelectChange={(event) => {
            setWaterbodySize(event.target.value);
            handleWaterbodySizeChange(
              layerIndex,
              event.target.value as InstanceType<
                typeof WaterSymbol3DLayer
              >["waterbodySize"]
            );
          }}
          value={waterbodySize}
        >
          {WATERBODY_SIZE_OPTIONS.map((option, index) =>
            option === "medium" ? (
              <calcite-option key={index} selected>
                {option}
              </calcite-option>
            ) : (
              <calcite-option key={index}>{option}</calcite-option>
            )
          )}
        </calcite-select>
      </calcite-label>

      <calcite-label layout="default" style={labelStyles}>
        waveDirection
        <calcite-slider
          labelHandles={true}
          labelTicks={true}
          max={360}
          min={0}
          oncalciteSliderChange={(event) => {
            setWaveDirection(event.target.value as number);
            handleWaveDirectionChange(layerIndex, event.target.value as number);
          }}
          step={1}
          ticks={180}
          value={waveDirection}
        ></calcite-slider>
      </calcite-label>

      <calcite-label layout="default" style={labelStyles}>
        waveStrength
        <calcite-select
          label={"waveStrength selection"}
          oncalciteSelectChange={(event) => {
            setWaveStrength(event.target.value);
            handleWaveStrengthChange(
              layerIndex,
              event.target.value as InstanceType<
                typeof WaterSymbol3DLayer
              >["waveStrength"]
            );
          }}
          value={waveStrength}
        >
          {WAVE_STRENGTH_OPTIONS.map((option, index) =>
            option === "moderate" ? (
              <calcite-option key={index} selected>
                {option}
              </calcite-option>
            ) : (
              <calcite-option key={index}>{option}</calcite-option>
            )
          )}
        </calcite-select>
      </calcite-label>
    </>
  );
}

export default WaterSymbol3DLayerForm;
