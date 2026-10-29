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
  layerIndex: number;
  handleChange: EmissiveChangeHandler;
}

export default function Symbol3DEmissiveForm({
  layerIndex,
  handleChange,
}: Props) {
  const [enabled, setEnabled] = useState(false);
  const [source, setSource] = useState<Symbol3DEmissive["source"]>("color");
  const [strength, setStrength] = useState("1");
  const [error, setError] = useState(false);
  const settingsRef = useRef({ source, strength });
  const validSettingsRef = useRef({ source, strength });

  const update = (
    active: boolean,
    changes: Partial<typeof settingsRef.current> = {},
  ) => {
    const next = { ...settingsRef.current, ...changes };
    settingsRef.current = next;
    setSource(next.source);
    setStrength(next.strength);
    if (!active) {
      setEnabled(false);
      setError(false);
      handleChange(layerIndex, null);
      return;
    }
    const numericStrength = Number(next.strength);
    if (
      !next.strength.trim() ||
      !Number.isFinite(numericStrength) ||
      numericStrength < 0 ||
      numericStrength > 16
    ) {
      setError(true);
      return;
    }
    validSettingsRef.current = next;
    setEnabled(true);
    setError(false);
    handleChange(
      layerIndex,
      new Symbol3DEmissive({
        source: next.source,
        strength: numericStrength,
      }),
    );
  };

  return (
    <>
      <calcite-label layout="default" style={labelStyles}>
        emissive
        <calcite-switch
          label="emissive enabled"
          checked={enabled}
          oncalciteSwitchChange={(event) => {
            update(
              event.target.checked,
              event.target.checked ? validSettingsRef.current : {},
            );
          }}
        ></calcite-switch>
      </calcite-label>
      {enabled && (
        <>
          <calcite-label layout="default" style={labelStyles}>
            source
            <calcite-select
              label="emissive source selection"
              value={source}
              oncalciteSelectChange={(event) => {
                const nextSource = event.target
                  .value as Symbol3DEmissive["source"];
                update(true, { source: nextSource });
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
              label="emissive strength input"
              min={0}
              max={16}
              step={0.1}
              value={strength}
              status={error ? "invalid" : "idle"}
              validationMessage={
                error ? "Enter a strength between 0 and 16." : undefined
              }
              oncalciteInputNumberChange={(event) => {
                update(true, { strength: event.target.value });
              }}
            ></calcite-input-number>
          </calcite-label>
        </>
      )}
    </>
  );
}
