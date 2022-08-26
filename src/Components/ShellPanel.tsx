import { CalciteShellPanel } from "@esri/calcite-components-react";
import "@esri/calcite-components/dist/components/calcite-shell-panel";
import CodePanel from "./CodePanel";
import PropertiesPanel from "./PropertiesPanel";

function ShellPanel() {
  return (
    <CalciteShellPanel slot="panel-end" position="end" resizable widthScale="l">
      <PropertiesPanel header="Properties"></PropertiesPanel>
      <CodePanel header="Code"></CodePanel>
    </CalciteShellPanel>
  );
}

export default ShellPanel;
