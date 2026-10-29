import Color from "@arcgis/core/Color.js";
import LineCallout3D from "@arcgis/core/symbols/callouts/LineCallout3D.js";
import "@esri/calcite-components/components/calcite-input";
import "@esri/calcite-components/components/calcite-input-number";
import "@esri/calcite-components/components/calcite-label";
import "@esri/calcite-components/components/calcite-switch";
import { useState } from "react";
import { labelStyles } from "./lib/styles";

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
  const [borderColor, setBorderColor] = useState("#ffffff");

  const update = (change: (value: LineCallout3D) => void) => {
    const next = (callout ?? saved).clone();
    change(next);
    setSaved(next);
    handleChange(next);
  };

  return (
    <>
      <calcite-label layout="default" style={labelStyles}>
        enabled
        <calcite-switch
          label="callout enabled"
          checked={!!callout}
          oncalciteSwitchChange={(event) =>
            handleChange(event.target.checked ? saved.clone() : null)
          }
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
                    next.color = new Color(event.target.value);
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
              oncalciteSwitchChange={(event) =>
                update((next) => {
                  next.border = event.target.checked
                    ? { color: borderColor }
                    : null;
                })
              }
            ></calcite-switch>
          </calcite-label>
          {callout.border && (
            <calcite-label layout="default" style={labelStyles}>
              border.color
              <calcite-input
                label="callout border color input"
                type="color"
                value={callout.border.color?.toHex() ?? borderColor}
                oncalciteInputInput={(event) => {
                  if (!event.target.value) return;
                  setBorderColor(event.target.value);
                  update((next) => {
                    next.border = { color: event.target.value };
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
