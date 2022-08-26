import {
  CalciteLabel,
  CalciteOption,
  CalciteSelect,
  CalciteShell,
  CalciteSwitch,
} from "@esri/calcite-components-react";
import "@esri/calcite-components/dist/components/calcite-label";
import "@esri/calcite-components/dist/components/calcite-option";
import "@esri/calcite-components/dist/components/calcite-select";
import "@esri/calcite-components/dist/components/calcite-shell";
import "@esri/calcite-components/dist/components/calcite-switch";
import { useRef } from "react";
import "./App.css";
import MapView from "./Components/MapView";
import ShellPanel from "./Components/ShellPanel";

function App({ header, footer }: AppProps) {
  const symbolSelect = useRef(null);
  const viewSwitch = useRef(null);

  const symbolSelectOptions = [
    "CIMSymbol",
    "SimpleLineSymbol",
    "SimpleFillSymbol",
  ];

  function handleSymbolSelectChange() {
    if (symbolSelect.current) {
      console.log((symbolSelect.current as HTMLCalciteSelectElement).value);
    }
  }

  function handleSwitchChange() {
    if (viewSwitch.current) {
      console.log((viewSwitch.current as HTMLCalciteSwitchElement).checked);
    }
  }

  return (
    <CalciteShell>
      <header slot="header" className="header">
        <h2>{header}</h2>
        <CalciteLabel layout="inline">
          Symbol Class
          <CalciteSelect
            ref={symbolSelect}
            label="Select Symbol Class"
            value="SimpleFillSymbol"
            onCalciteSelectChange={() => handleSymbolSelectChange()}
          >
            {symbolSelectOptions.map((option) => (
              <CalciteOption key={option}>{option}</CalciteOption>
            ))}
          </CalciteSelect>
        </CalciteLabel>
        <CalciteLabel layout="inline">
          3D
          <CalciteSwitch
            ref={viewSwitch}
            onCalciteSwitchChange={handleSwitchChange}
          ></CalciteSwitch>
        </CalciteLabel>
      </header>
      <MapView />
      <ShellPanel></ShellPanel>
      <footer slot="footer" className="footer">
        {footer}
      </footer>
    </CalciteShell>
  );
}

export default App;
