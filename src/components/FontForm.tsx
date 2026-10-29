import type Font from "@arcgis/core/symbols/Font.js";
import "@esri/calcite-components/dist/components/calcite-input-number";
import "@esri/calcite-components/dist/components/calcite-label";
import "@esri/calcite-components/dist/components/calcite-option";
import "@esri/calcite-components/dist/components/calcite-select";
import "@esri/calcite-components/components/calcite-input-text";
import {
  fonts,
  fontDecorationOptions,
  fontStyleOptions,
  fontWeightOptions,
} from "./lib/constants";
import { labelStyles } from "./lib/styles";

interface Props {
  font: Font;
  handlePropertiesChange: (
    value: Partial<Pick<Font, "family" | "style" | "weight">>,
  ) => void;
  handleDecorationChange: (
    value: InstanceType<typeof Font>["decoration"],
  ) => void;
  handleFontChange: (value: string) => void;
  handleSizeChange: (value: string) => void;
}

function FontForm({
  font,
  handlePropertiesChange,
  handleDecorationChange,
  handleFontChange,
  handleSizeChange,
}: Props): React.ReactElement {
  const preset = fonts.find(
    (option) =>
      option.font.family === font.family &&
      option.font.style === font.style &&
      option.font.weight === font.weight,
  );

  return (
    <>
      <calcite-label layout="default" style={labelStyles}>
        preset
        <calcite-select
          label={"font selection"}
          oncalciteSelectChange={(event) => {
            if (event.target.value !== "custom")
              handleFontChange(event.target.value);
          }}
          value={preset ? JSON.stringify(preset) : "custom"}
        >
          {!preset && (
            <calcite-option value="custom" disabled>
              Custom
            </calcite-option>
          )}
          {fonts.map((option, index) => (
            <calcite-option key={index} value={JSON.stringify(option)}>
              {option.name}
            </calcite-option>
          ))}
        </calcite-select>
      </calcite-label>

      <calcite-label layout="default" style={labelStyles}>
        family
        <calcite-input-text
          label="font family input"
          value={font.family}
          oncalciteInputTextChange={(event) =>
            handlePropertiesChange({ family: event.target.value })
          }
        ></calcite-input-text>
      </calcite-label>

      <calcite-label layout="default" style={labelStyles}>
        style
        <calcite-select
          label="font style selection"
          value={font.style}
          oncalciteSelectChange={(event) =>
            handlePropertiesChange({
              style: event.target.value as Font["style"],
            })
          }
        >
          {fontStyleOptions.map((option) => (
            <calcite-option key={option} value={option}>
              {option}
            </calcite-option>
          ))}
        </calcite-select>
      </calcite-label>

      <calcite-label layout="default" style={labelStyles}>
        weight
        <calcite-select
          label="font weight selection"
          value={font.weight}
          oncalciteSelectChange={(event) =>
            handlePropertiesChange({
              weight: event.target.value as Font["weight"],
            })
          }
        >
          {fontWeightOptions.map((option) => (
            <calcite-option key={option} value={option}>
              {option}
            </calcite-option>
          ))}
        </calcite-select>
      </calcite-label>

      <calcite-label layout="default" style={labelStyles}>
        decoration
        <calcite-select
          label={"font decoration selection"}
          oncalciteSelectChange={(event) => {
            handleDecorationChange(
              event.target.value as InstanceType<typeof Font>["decoration"],
            );
          }}
          value={font.decoration}
        >
          {fontDecorationOptions.map((option, index) => (
            <calcite-option key={index}>{option}</calcite-option>
          ))}
        </calcite-select>
      </calcite-label>

      <calcite-label layout="default" style={labelStyles}>
        size
        <calcite-input-number
          label={"font size input"}
          min={0}
          oncalciteInputNumberChange={(event) => {
            handleSizeChange(event.target.value);
          }}
          value={String(font.size)}
        ></calcite-input-number>
      </calcite-label>
    </>
  );
}

export default FontForm;
