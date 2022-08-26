import { CalcitePanel } from "@esri/calcite-components-react";
import "@esri/calcite-components/dist/components/calcite-panel";

function PropertiesPanel({ header }: PanelProps) {
  return (
    <CalcitePanel>
      <div slot="header-content">{header}</div>
    </CalcitePanel>
  );
}

export default PropertiesPanel;
