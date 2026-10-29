import type WaterSymbol3DLayer from "@arcgis/core/symbols/WaterSymbol3DLayer.js";
import "@esri/calcite-components/dist/components/calcite-input";
import "@esri/calcite-components/dist/components/calcite-label";
import "@esri/calcite-components/dist/components/calcite-option";
import "@esri/calcite-components/dist/components/calcite-select";
import "@esri/calcite-components/dist/components/calcite-slider";
import { waterbodySizeOptions, waveStrengthOptions } from "./lib/constants";
import { labelStyles } from "./lib/styles";

interface Props {
  symbolLayer: WaterSymbol3DLayer;
  layerIndex: number;
  handleColorChange: (layerIndex: number, value: string) => void;
  handleWaterbodySizeChange: (
    layerIndex: number,
    value: InstanceType<typeof WaterSymbol3DLayer>["waterbodySize"],
  ) => void;
  handleWaveDirectionChange: (layerIndex: number, value: number) => void;
  handleWaveStrengthChange: (
    layerIndex: number,
    value: InstanceType<typeof WaterSymbol3DLayer>["waveStrength"],
  ) => void;
}

function WaterSymbol3DLayerForm({
  symbolLayer,
  layerIndex,
  handleColorChange,
  handleWaterbodySizeChange,
  handleWaveDirectionChange,
  handleWaveStrengthChange,
}: Props): React.ReactElement {
  const { waterbodySize, waveDirection, waveStrength } = symbolLayer;
  const color = symbolLayer.color.toHex();

  return (
    <>
      <calcite-label layout="default" style={labelStyles}>
        color
        <calcite-input
          oncalciteInputInput={(event) => {
            if (!event.target.value) return;
            handleColorChange(layerIndex, event.target.value);
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
            handleWaterbodySizeChange(
              layerIndex,
              event.target.value as InstanceType<
                typeof WaterSymbol3DLayer
              >["waterbodySize"],
            );
          }}
          value={waterbodySize}
        >
          {waterbodySizeOptions.map((option) => (
            <calcite-option key={option} value={option}>{option}</calcite-option>
          ))}
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
            handleWaveDirectionChange(layerIndex, event.target.value as number);
          }}
          step={1}
          ticks={180}
          value={waveDirection ?? 0}
        ></calcite-slider>
      </calcite-label>

      <calcite-label layout="default" style={labelStyles}>
        waveStrength
        <calcite-select
          label={"waveStrength selection"}
          oncalciteSelectChange={(event) => {
            handleWaveStrengthChange(
              layerIndex,
              event.target.value as InstanceType<
                typeof WaterSymbol3DLayer
              >["waveStrength"],
            );
          }}
          value={waveStrength}
        >
          {waveStrengthOptions.map((option) => (
            <calcite-option key={option} value={option}>{option}</calcite-option>
          ))}
        </calcite-select>
      </calcite-label>
    </>
  );
}

export default WaterSymbol3DLayerForm;
