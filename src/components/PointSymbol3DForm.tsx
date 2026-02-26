import type Collection from "@arcgis/core/core/Collection.js";
import "@esri/calcite-components/components/calcite-block";
import { blockStyles } from "./lib/styles";
import PointSymbol3DCalloutForm from "./PointSymbol3DCalloutForm";
import PointSymbol3DSymbolLayersForm from "./PointSymbol3DSymbolLayersForm";
import PointSymbol3DVerticalOffsetForm from "./PointSymbol3DVerticalOffsetForm";

interface Props {
  handleCalloutColorChange: (value: string) => void;
  handleCalloutSizeChange: (value: string) => void;
  handleVerticalOffsetMaxWorldLengthChange: (value: string) => void;
  handleVerticalOffsetMinWorldLengthChange: (value: string) => void;
  handleVerticalOffsetScreenLengthChange: (value: string) => void;
  updateSymbolLayers: (newSymbolLayers: Collection) => void;
}

function PointSymbol3DForm({
  handleCalloutColorChange,
  handleCalloutSizeChange,
  handleVerticalOffsetMaxWorldLengthChange,
  handleVerticalOffsetMinWorldLengthChange,
  handleVerticalOffsetScreenLengthChange,
  updateSymbolLayers,
}: Props): React.ReactElement {
  return (
    <>
      <calcite-block style={blockStyles} collapsible heading={"callout"}>
        <PointSymbol3DCalloutForm
          handleColorChange={handleCalloutColorChange}
          handleSizeChange={handleCalloutSizeChange}
        ></PointSymbol3DCalloutForm>
      </calcite-block>
      <PointSymbol3DSymbolLayersForm
        updateSymbolLayers={updateSymbolLayers}
      ></PointSymbol3DSymbolLayersForm>
      <calcite-block style={blockStyles} collapsible heading={"verticalOffset"}>
        <PointSymbol3DVerticalOffsetForm
          handleMaxWorldLengthChange={handleVerticalOffsetMaxWorldLengthChange}
          handleMinWorldLengthChange={handleVerticalOffsetMinWorldLengthChange}
          handleScreenLengthChange={handleVerticalOffsetScreenLengthChange}
        ></PointSymbol3DVerticalOffsetForm>
      </calcite-block>
    </>
  );
}

export default PointSymbol3DForm;
