import {
  CalciteLabel,
  CalciteLink,
  CalciteShell,
  CalciteSwitch,
} from "@esri/calcite-components-react";
import "@esri/calcite-components/dist/components/calcite-label";
import "@esri/calcite-components/dist/components/calcite-link";
import "@esri/calcite-components/dist/components/calcite-shell";
import "@esri/calcite-components/dist/components/calcite-switch";
import { useRef } from "react";
import {
  BrowserRouter as Router,
  NavLink,
  Route,
  Routes,
} from "react-router-dom";
import "./App.css";
import SimpleFillSymbolPage from "./Components/SimpleFillSymbolPage";
import SimpleLineSymbolPage from "./Components/SimpleLineSymbolPage";

function App({ header, footer }: AppProps) {
  const symbolSelect = useRef(null);
  const viewSwitch = useRef(null);

  const symbolSelectOptions = [
    "CIMSymbol",
    "SimpleLineSymbol",
    "SimpleFillSymbol",
  ];

  function handleSwitchChange() {
    if (viewSwitch.current) {
      console.log((viewSwitch.current as HTMLCalciteSwitchElement).checked);
    }
  }

  return (
    <CalciteShell>
      <Router>
        <Routes>
          <Route path="/" element={<SimpleLineSymbolPage />} />
          <Route path="/SimpleLineSymbol" element={<SimpleLineSymbolPage />} />
          <Route path="/SimpleFillSymbol" element={<SimpleFillSymbolPage />} />
        </Routes>
        <header slot="header" className="header">
          <h2>{header}</h2>
          <nav className="nav">
            {" "}
            <NavLink to="/SimpleLineSymbol">
              <CalciteLink>SimpleLineSymbol</CalciteLink>
            </NavLink>
            <NavLink to="/SimpleFillSymbol">SimpleFillSymbol</NavLink>
          </nav>

          <CalciteLabel layout="inline">
            3D
            <CalciteSwitch
              ref={viewSwitch}
              onCalciteSwitchChange={handleSwitchChange}
            ></CalciteSwitch>
          </CalciteLabel>
        </header>
      </Router>
      <footer slot="footer" className="footer">
        {footer}
      </footer>
    </CalciteShell>
  );
}

export default App;
