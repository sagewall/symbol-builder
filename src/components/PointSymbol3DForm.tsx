import type Collection from "@arcgis/core/core/Collection.js";
import type LineCallout3D from "@arcgis/core/symbols/callouts/LineCallout3D.js";
import type Symbol3DVerticalOffset from "@arcgis/core/symbols/support/Symbol3DVerticalOffset.js";
import "@esri/calcite-components/components/calcite-block";
import "@esri/calcite-components/components/calcite-switch";
import "@esri/calcite-components/components/calcite-label";
import { blockStyles, labelStyles } from "./lib/styles";
import PointSymbol3DCalloutForm from "./PointSymbol3DCalloutForm";
import PointSymbol3DSymbolLayersForm from "./PointSymbol3DSymbolLayersForm";
import PointSymbol3DVerticalOffsetForm from "./PointSymbol3DVerticalOffsetForm";

interface Props {
  callout: LineCallout3D | null | undefined;
  handleCalloutChange: (value: LineCallout3D | null) => void;
  verticalOffset: Symbol3DVerticalOffset | null | undefined;
  handleVerticalOffsetEnabledChange: (value: boolean) => void;
  handleVerticalOffsetMaxWorldLengthChange: (value: string) => void;
  handleVerticalOffsetMinWorldLengthChange: (value: string) => void;
  handleVerticalOffsetScreenLengthChange: (value: string) => void;
  updateSymbolLayers: (newSymbolLayers: Collection) => void;
}

function PointSymbol3DForm({
  callout,
  handleCalloutChange,
  verticalOffset,
  handleVerticalOffsetEnabledChange,
  handleVerticalOffsetMaxWorldLengthChange,
  handleVerticalOffsetMinWorldLengthChange,
  handleVerticalOffsetScreenLengthChange,
  updateSymbolLayers,
}: Props): React.ReactElement {
  return (
    <>
      <calcite-block style={blockStyles} expandable heading={"callout"}>
        <PointSymbol3DCalloutForm
          callout={callout}
          handleChange={handleCalloutChange}
        ></PointSymbol3DCalloutForm>
      </calcite-block>
      <PointSymbol3DSymbolLayersForm
        updateSymbolLayers={updateSymbolLayers}
      ></PointSymbol3DSymbolLayersForm>
      <calcite-block style={blockStyles} expandable heading={"verticalOffset"}>
        <calcite-label layout="default" style={labelStyles}>
          enabled
          <calcite-switch
            label="verticalOffset enabled"
            checked={!!verticalOffset}
            oncalciteSwitchChange={(event) =>
              handleVerticalOffsetEnabledChange(event.target.checked)
            }
          ></calcite-switch>
        </calcite-label>
        {verticalOffset && (
          <PointSymbol3DVerticalOffsetForm
            value={verticalOffset}
            handleMaxWorldLengthChange={
              handleVerticalOffsetMaxWorldLengthChange
            }
            handleMinWorldLengthChange={
              handleVerticalOffsetMinWorldLengthChange
            }
            handleScreenLengthChange={handleVerticalOffsetScreenLengthChange}
          ></PointSymbol3DVerticalOffsetForm>
        )}
      </calcite-block>
    </>
  );
}

export default PointSymbol3DForm;
