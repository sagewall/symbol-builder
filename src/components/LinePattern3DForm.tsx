import type LineSymbol3DLayer from "@arcgis/core/symbols/LineSymbol3DLayer.js";
import LineStylePattern3D from "@arcgis/core/symbols/patterns/LineStylePattern3D.js";
import LineTemplatePattern3D from "@arcgis/core/symbols/patterns/LineTemplatePattern3D.js";
import "@esri/calcite-components/components/calcite-switch";
import "@esri/calcite-components/components/calcite-select";
import "@esri/calcite-components/components/calcite-option";
import "@esri/calcite-components/components/calcite-input-text";
import "@esri/calcite-components/components/calcite-label";
import { useState } from "react";
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
  const [savedStyle, setSavedStyle] = useState<LineStylePattern3D["style"]>(
    pattern?.type === "style" ? pattern.style : "solid",
  );
  const [savedTemplate, setSavedTemplate] = useState(
    pattern?.type === "template" ? [...pattern.dashTemplate] : [10, 6, 2, 6],
  );

  const update = (next: LineSymbol3DLayer["pattern"]) => {
    handleChange(layerIndex, next);
  };

  const updateTemplate = (input: HTMLCalciteInputTextElement) => {
    try {
      const values: unknown = JSON.parse(input.value);
      if (
        !Array.isArray(values) ||
        !values.length ||
        !values.every(
          (item) => typeof item === "number" && Number.isFinite(item),
        )
      )
        throw new Error();
      const next = new LineTemplatePattern3D({ dashTemplate: values });
      input.value = JSON.stringify(next.dashTemplate);
      input.status = "idle";
      input.validationMessage = "";
      update(next);
    } catch {
      input.status = "invalid";
      input.validationMessage = "Expected a non-empty array of finite numbers.";
      input.value = JSON.stringify(
        pattern?.type === "template" ? pattern.dashTemplate : savedTemplate,
      );
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
            if (pattern) setSaved(pattern.clone());
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
                if (pattern.type === "style") setSavedStyle(pattern.style);
                else setSavedTemplate([...pattern.dashTemplate]);
                if (event.target.value === "style")
                  update(new LineStylePattern3D({ style: savedStyle }));
                else {
                  update(
                    new LineTemplatePattern3D({
                      dashTemplate: savedTemplate,
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
                update(new LineStylePattern3D({ style: value }));
              }}
            />
          ) : (
            <calcite-label layout="default" style={labelStyles}>
              dashTemplate
              <calcite-input-text
                label="dashTemplate input"
                value={JSON.stringify(pattern.dashTemplate)}
                oncalciteInputTextChange={(event) =>
                  updateTemplate(event.target)
                }
              ></calcite-input-text>
            </calcite-label>
          )}
        </>
      )}
    </>
  );
}
