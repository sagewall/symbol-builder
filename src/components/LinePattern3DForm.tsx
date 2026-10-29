import type LineSymbol3DLayer from "@arcgis/core/symbols/LineSymbol3DLayer.js";
import LineStylePattern3D from "@arcgis/core/symbols/patterns/LineStylePattern3D.js";
import LineTemplatePattern3D from "@arcgis/core/symbols/patterns/LineTemplatePattern3D.js";
import "@esri/calcite-components/components/calcite-switch";
import "@esri/calcite-components/components/calcite-select";
import "@esri/calcite-components/components/calcite-option";
import "@esri/calcite-components/components/calcite-input-text";
import "@esri/calcite-components/components/calcite-label";
import { useRef, useState } from "react";
import { linePatternTypeOptions } from "./lib/constants";
import { labelStyles } from "./lib/styles";
import LineStylePattern3DForm from "./LineStylePattern3DForm";

export type LinePatternChangeHandler = (
  index: number,
  value: LineSymbol3DLayer["pattern"],
) => void;

interface Props {
  layerIndex: number;
  pattern: LineSymbol3DLayer["pattern"];
  handleChange: LinePatternChangeHandler;
}

export default function LinePattern3DForm({
  layerIndex,
  pattern,
  handleChange,
}: Props) {
  const [saved, setSaved] = useState(
    pattern?.clone() ?? new LineStylePattern3D(),
  );
  const [style, setStyle] = useState<LineStylePattern3D["style"]>(
    pattern?.type === "style" ? pattern.style : "solid",
  );
  const validTemplateRef = useRef(
    pattern?.type === "template" ? [...pattern.dashTemplate] : [10, 6, 2, 6],
  );
  const [template, setTemplate] = useState(
    JSON.stringify(validTemplateRef.current),
  );
  const [error, setError] = useState(false);

  const update = (next: LineSymbol3DLayer["pattern"]) => {
    if (next) setSaved(next);
    handleChange(layerIndex, next);
  };

  const updateTemplate = (value: string) => {
    setTemplate(value);
    try {
      const values: unknown = JSON.parse(value);
      if (
        !Array.isArray(values) ||
        !values.length ||
        !values.every(
          (item) => typeof item === "number" && Number.isFinite(item),
        )
      )
        throw new Error();
      const next = new LineTemplatePattern3D({ dashTemplate: values });
      validTemplateRef.current = [...next.dashTemplate];
      setError(false);
      update(next);
    } catch {
      setError(true);
    }
  };

  return (
    <>
      <calcite-label layout="default" style={labelStyles}>
        enabled
        <calcite-switch
          label="pattern enabled"
          checked={!!pattern}
          oncalciteSwitchChange={(event) => {
            if (event.target.checked && saved.type === "template") {
              setTemplate(JSON.stringify(saved.dashTemplate));
              setError(false);
            }
            update(event.target.checked ? saved.clone() : null);
          }}
        ></calcite-switch>
      </calcite-label>
      {pattern && (
        <>
          <calcite-label layout="default" style={labelStyles}>
            type
            <calcite-select
              label="pattern type selection"
              value={pattern.type}
              oncalciteSelectChange={(event) => {
                if (event.target.value === "style")
                  update(new LineStylePattern3D({ style }));
                else {
                  setTemplate(JSON.stringify(validTemplateRef.current));
                  setError(false);
                  update(
                    new LineTemplatePattern3D({
                      dashTemplate: validTemplateRef.current,
                    }),
                  );
                }
              }}
            >
              {linePatternTypeOptions.map((option) => (
                <calcite-option key={option} value={option}>
                  {option}
                </calcite-option>
              ))}
            </calcite-select>
          </calcite-label>
          {pattern.type === "style" ? (
            <LineStylePattern3DForm
              layerIndex={layerIndex}
              styleValue={pattern.style}
              handleStyleChange={(_, value) => {
                setStyle(value);
                update(new LineStylePattern3D({ style: value }));
              }}
            />
          ) : (
            <calcite-label layout="default" style={labelStyles}>
              dashTemplate
              <calcite-input-text
                label="dashTemplate input"
                value={template}
                status={error ? "invalid" : "idle"}
                validationMessage={
                  error
                    ? "Expected a non-empty array of finite numbers."
                    : undefined
                }
                oncalciteInputTextChange={(event) =>
                  updateTemplate(event.target.value)
                }
              ></calcite-input-text>
            </calcite-label>
          )}
        </>
      )}
    </>
  );
}
