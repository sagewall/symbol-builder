import Color from "@arcgis/core/Color.js";
import LineCallout3D from "@arcgis/core/symbols/callouts/LineCallout3D.js";
import "@esri/calcite-components/components/calcite-input";
import "@esri/calcite-components/components/calcite-input-number";
import "@esri/calcite-components/components/calcite-label";
import "@esri/calcite-components/components/calcite-switch";
import { useState } from "react";
import { labelStyles } from "./lib/styles";
import { colorWithAlpha } from "./lib/color";

interface Props {
  callout: LineCallout3D | null | undefined;
  handleChange: (value: LineCallout3D | null) => void;
}

function PointSymbol3DCalloutForm({
  callout,
  handleChange,
}: Props): React.ReactElement {
  const [saved, setSaved] = useState(
    callout?.clone() ?? new LineCallout3D({ size: 1 }),
  );
  const [savedBorder, setSavedBorder] = useState(
    callout?.border
      ? { color: callout.border.color?.clone() ?? new Color("#ffffff") }
      : { color: new Color("#ffffff") },
  );

  const update = (change: (value: LineCallout3D) => void) => {
    const next = (callout ?? saved).clone();
    change(next);
    handleChange(next);
  };

  return (
    <>
      <calcite-label layout="default" style={labelStyles}>
        enabled
        <calcite-switch
          label="callout enabled"
          checked={!!callout}
          oncalciteSwitchChange={(event) => {
            if (callout) setSaved(callout.clone());
            handleChange(event.target.checked ? saved.clone() : null);
          }}
        ></calcite-switch>
      </calcite-label>
      {callout && (
        <>
          <calcite-label layout="default" style={labelStyles}>
            color
            <calcite-input
              oncalciteInputInput={(event) => {
                if (event.target.value)
                  update((next) => {
                    next.color = colorWithAlpha(event.target.value, next.color);
                  });
              }}
              type="color"
              value={callout.color?.toHex() ?? "#000000"}
            ></calcite-input>
          </calcite-label>

          <calcite-label layout="default" style={labelStyles}>
            size
            <calcite-input-number
              label="callout size input"
              min={0}
              oncalciteInputNumberChange={(event) => {
                update((next) => {
                  next.size = Number(event.target.value);
                });
              }}
              value={String(callout.size)}
            ></calcite-input-number>
          </calcite-label>
          <calcite-label layout="default" style={labelStyles}>
            border
            <calcite-switch
              label="callout border enabled"
              checked={!!callout.border}
              oncalciteSwitchChange={(event) => {
                if (callout.border) {
                  setSavedBorder({
                    color: callout.border.color?.clone() ?? new Color("#ffffff"),
                  });
                }
                update((next) => {
                  next.border = event.target.checked
                    ? { color: savedBorder.color.clone() }
                    : null;
                });
              }}
            ></calcite-switch>
          </calcite-label>
          {callout.border && (
            <calcite-label layout="default" style={labelStyles}>
              border.color
              <calcite-input
                label="callout border color input"
                type="color"
                value={callout.border.color?.toHex() ?? "#ffffff"}
                oncalciteInputInput={(event) => {
                  if (!event.target.value) return;
                  update((next) => {
                    next.border = {
                      color: colorWithAlpha(event.target.value, next.border?.color),
                    };
                  });
                }}
              ></calcite-input>
            </calcite-label>
          )}
        </>
      )}
    </>
  );
}

export default PointSymbol3DCalloutForm;
