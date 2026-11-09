import { Symbol3DEmissive } from "@arcgis/core/symbols/support/Symbol3DEmissive.js";
import "@esri/calcite-components/components/calcite-switch";
import "@esri/calcite-components/components/calcite-input-number";
import "@esri/calcite-components/components/calcite-select";
import "@esri/calcite-components/components/calcite-option";
import "@esri/calcite-components/components/calcite-label";
import { useRef, useState } from "react";
import { emissiveSourceOptions } from "./lib/constants";
import { labelStyles } from "./lib/styles";

export type EmissiveChangeHandler = (
  layerIndex: number,
  value: Symbol3DEmissive | null,
) => void;

interface Props {
  emissive: Symbol3DEmissive | null | undefined;
  layerIndex: number;
  handleChange: EmissiveChangeHandler;
}

export default function Symbol3DEmissiveForm({
  emissive,
  layerIndex,
  handleChange,
}: Props) {
  const [saved, setSaved] = useState(
    emissive?.clone() ?? new Symbol3DEmissive({ source: "color", strength: 1 }),
  );
  const source = emissive?.source ?? saved.source;
  const strength = String(emissive?.strength ?? saved.strength);
  const sourceInput = useRef<HTMLCalciteSelectElement>(null);
  const strengthInput = useRef<HTMLCalciteInputNumberElement>(null);

  const update = (
    changes: Partial<Pick<Symbol3DEmissive, "source" | "strength">>,
  ) => {
    const next = (emissive ?? saved).clone();
    // Calcite can defer select events until another edit shares the same React batch.
    // Include both current inputs so a source edit cannot overwrite pending strength.
    const currentStrength = strengthInput.current?.value;
    if (
      currentStrength?.trim() &&
      Number.isFinite(Number(currentStrength)) &&
      Number(currentStrength) >= 0 &&
      Number(currentStrength) <= 16
    ) {
      next.strength = Number(currentStrength);
    }
    if (sourceInput.current) {
      next.source = sourceInput.current.value as Symbol3DEmissive["source"];
    }
    Object.assign(next, changes);
    handleChange(layerIndex, next);
  };

  return (
    <>
      <calcite-label layout="default" style={labelStyles}>
        emissive
        <calcite-switch
          label="emissive enabled"
          checked={!!emissive}
          oncalciteSwitchChange={(event) => {
            if (emissive) setSaved(emissive.clone());
            handleChange(
              layerIndex,
              event.target.checked ? saved.clone() : null,
            );
          }}
        ></calcite-switch>
      </calcite-label>
      {emissive && (
        <>
          <calcite-label layout="default" style={labelStyles}>
            source
            <calcite-select
              ref={sourceInput}
              label="emissive source selection"
              value={source}
              oncalciteSelectChange={(event) => {
                const nextSource = event.target
                  .value as Symbol3DEmissive["source"];
                update({ source: nextSource });
              }}
            >
              {emissiveSourceOptions.map((option) => (
                <calcite-option key={option} value={option}>
                  {option}
                </calcite-option>
              ))}
            </calcite-select>
          </calcite-label>
          <calcite-label layout="default" style={labelStyles}>
            strength
            <calcite-input-number
              ref={strengthInput}
              label="emissive strength input"
              min={0}
              max={16}
              step={0.1}
              value={strength}
              oncalciteInputNumberChange={(event) => {
                const value = Number(event.target.value);
                if (
                  !event.target.value.trim() ||
                  !Number.isFinite(value) ||
                  value < 0 ||
                  value > 16
                ) {
                  event.target.status = "invalid";
                  event.target.validationMessage = "Enter a strength between 0 and 16.";
                  event.target.value = strength;
                  return;
                }
                event.target.status = "idle";
                event.target.validationMessage = "";
                update({ strength: value });
              }}
            ></calcite-input-number>
          </calcite-label>
        </>
      )}
    </>
  );
}
