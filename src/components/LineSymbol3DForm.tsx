import type Collection from "@arcgis/core/core/Collection.js";
import type LineSymbol3D from "@arcgis/core/symbols/LineSymbol3D.js";
import "@esri/calcite-components/components/calcite-label";
import "@esri/calcite-components/components/calcite-switch";
import LineSymbol3DSymbolLayersForm from "./LineSymbol3DSymbolLayersForm";
import { labelStyles } from "./lib/styles";

interface Props {
  symbolLayers: LineSymbol3D["symbolLayers"];
  handleWorldSizedChange: (value: boolean) => void;
  updateSymbolLayers: (newSymbolLayers: Collection) => void;
  worldSized: boolean;
}

function LineSymbol3DForm({
  symbolLayers,
  handleWorldSizedChange,
  updateSymbolLayers,
  worldSized,
}: Props): React.ReactElement {
  return (
    <>
      <calcite-label layout="default" style={labelStyles}>
        worldSized
        <calcite-switch
          checked={worldSized}
          oncalciteSwitchChange={(event) => {
            handleWorldSizedChange(event.target.checked);
          }}
        ></calcite-switch>
      </calcite-label>
      <LineSymbol3DSymbolLayersForm
        symbolLayers={symbolLayers}
        updateSymbolLayers={updateSymbolLayers}
      ></LineSymbol3DSymbolLayersForm>
    </>
  );
}

export default LineSymbol3DForm;
