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
import { useRef, useState } from "react";
import {
  BrowserRouter as Router,
  NavLink,
  Route,
  Routes,
} from "react-router-dom";
import "./App.css";
import SimpleFillSymbolPage from "./Components/SimpleFillSymbolPage";
import SimpleLineSymbolPage from "./Components/SimpleLineSymbolPage";

interface AppProps {
  header: string;
  footer: string;
}

function App({ header, footer }: AppProps) {
  const viewSwitch = useRef(null);
  const [sceneView, setSceneView] = useState(false);

  function handleSwitchChange() {
    if (viewSwitch.current) {
      setSceneView((viewSwitch.current as HTMLCalciteSwitchElement).checked);
    }
  }

  return (
    <CalciteShell>
      <Router>
        <Routes>
          <Route
            path="/"
            element={<SimpleLineSymbolPage sceneView={sceneView} />}
          />
          <Route
            path="/SimpleLineSymbol"
            element={<SimpleLineSymbolPage sceneView={sceneView} />}
          />
          <Route
            path="/SimpleFillSymbol"
            element={<SimpleFillSymbolPage sceneView={sceneView} />}
          />
        </Routes>
        <header slot="header" className="header">
          <h2>{header}</h2>
          <nav className="nav">
            <NavLink to="/SimpleLineSymbol">
              <CalciteLink>SimpleLineSymbol</CalciteLink>
            </NavLink>
            <NavLink to="/SimpleFillSymbol">
              <CalciteLink>SimpleFillSymbol</CalciteLink>
            </NavLink>
          </nav>

          <CalciteLabel layout="inline">
            SceneView
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
