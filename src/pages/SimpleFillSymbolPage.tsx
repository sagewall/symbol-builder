import Color from "@arcgis/core/Color";
import Collection from "@arcgis/core/core/Collection";
import Polygon from "@arcgis/core/geometry/Polygon";
import Graphic from "@arcgis/core/Graphic";
import SimpleFillSymbol from "@arcgis/core/symbols/SimpleFillSymbol";
import SimpleLineSymbol from "@arcgis/core/symbols/SimpleLineSymbol";
import {
  CalciteAction,
  CalciteLabel,
  CalciteLoader,
  CalcitePanel,
  CalciteShell,
  CalciteShellPanel,
  CalciteSwitch,
} from "@esri/calcite-components-react";
import { lazy, Suspense, useRef, useState } from "react";
import {
  formStyles,
  shellStyles,
  viewSwitchLabelStyles,
} from "../Components/lib/styles";
import {
  SimpleFillSymbolStyleOption,
  SimpleLineSymbolCapOption,
  SimpleLineSymbolJoinOption,
  SimpleLineSymbolStyleOption,
} from "../Components/lib/types";
import SimpleFillSymbolForm from "../components/SimpleFillSymbolForm";

const MapView = lazy(() => import("../components/MapView"));
const SceneView = lazy(() => import("../components/SceneView"));

const SimpleFillSymbolPage = () => {
  const viewSwitchRef = useRef(null);

  const [simpleLineSymbol, setSimpleLineSymbol] = useState(
    new SimpleLineSymbol()
  );

  const [simpleFillSymbol, setSimpleFillSymbol] = useState(
    new SimpleFillSymbol({
      color: "#007ac2",
      outline: simpleLineSymbol,
    })
  );

  const polygon = new Polygon({
    rings: [
      [
        [-105.0, 40.0],
        [-105.1, 40.2],
        [-105.35, 40.1],
      ],
    ],
  });

  const polygonGraphic = new Graphic({
    geometry: polygon,
    symbol: simpleFillSymbol,
  });

  const graphicsCollection = new Collection();
  graphicsCollection.add(polygonGraphic);

  const [graphics, setGraphics] =
    useState<Collection<Graphic>>(graphicsCollection);

  const [sceneView, setSceneView] = useState(false);
  let view = <MapView graphics={graphics} />;
  if (sceneView) {
    view = <SceneView graphics={graphics} />;
  }

  const handleSwitchChange = () => {
    if (viewSwitchRef.current) {
      setSceneView((viewSwitchRef.current as HTMLCalciteSwitchElement).checked);
    }
  };

  const updateGraphics = (newSimpleFillSymbol: SimpleFillSymbol) => {
    setSimpleFillSymbol(newSimpleFillSymbol);

    const newPolygonGraphic = graphics.getItemAt(0).clone();
    newPolygonGraphic.symbol = newSimpleFillSymbol;

    const newGraphics = new Collection();
    newGraphics.add(newPolygonGraphic);
    setGraphics(newGraphics);
  };

  const handleColorChange = (currentColor: string) => {
    const newSimpleFillSymbol = simpleFillSymbol.clone();
    newSimpleFillSymbol.color = new Color(currentColor);
    updateGraphics(newSimpleFillSymbol);
  };

  const handleOutlineCapChange = (
    currentCapValue: SimpleLineSymbolCapOption
  ) => {
    const newSimpleLineSymbol = simpleLineSymbol.clone();
    newSimpleLineSymbol.cap = currentCapValue;
    setSimpleLineSymbol(newSimpleLineSymbol);

    const newSimpleFillSymbol = simpleFillSymbol.clone();
    newSimpleFillSymbol.outline = newSimpleLineSymbol;
    updateGraphics(newSimpleFillSymbol);
  };

  const handleOutlineColorChange = (currentColor: string) => {
    const newSimpleLineSymbol = simpleLineSymbol.clone();
    newSimpleLineSymbol.color = new Color(currentColor);
    setSimpleLineSymbol(newSimpleLineSymbol);

    const newSimpleFillSymbol = simpleFillSymbol.clone();
    newSimpleFillSymbol.outline = newSimpleLineSymbol;
    updateGraphics(newSimpleFillSymbol);
  };

  const handleOutlineJoinChange = (
    currentJoinValue: SimpleLineSymbolJoinOption
  ) => {
    const newSimpleLineSymbol = simpleLineSymbol.clone();
    newSimpleLineSymbol.join = currentJoinValue;
    setSimpleLineSymbol(newSimpleLineSymbol);

    const newSimpleFillSymbol = simpleFillSymbol.clone();
    newSimpleFillSymbol.outline = newSimpleLineSymbol;
    updateGraphics(newSimpleFillSymbol);
  };

  const handleOutlineMiterLimitChange = (currentMiterLimitValue: string) => {
    const newSimpleLineSymbol = simpleLineSymbol.clone();
    newSimpleLineSymbol.miterLimit = Number(currentMiterLimitValue);
    setSimpleLineSymbol(newSimpleLineSymbol);

    const newSimpleFillSymbol = simpleFillSymbol.clone();
    newSimpleFillSymbol.outline = newSimpleLineSymbol;
    updateGraphics(newSimpleFillSymbol);
  };

  const handleOutlineStyleChange = (
    currentStyleValue: SimpleLineSymbolStyleOption
  ) => {
    const newSimpleLineSymbol = simpleLineSymbol.clone();
    newSimpleLineSymbol.style = currentStyleValue;
    setSimpleLineSymbol(newSimpleLineSymbol);

    const newSimpleFillSymbol = simpleFillSymbol.clone();
    newSimpleFillSymbol.outline = newSimpleLineSymbol;
    updateGraphics(newSimpleFillSymbol);
  };

  const handleOutlineWidthChange = (currentWidthValue: string) => {
    const newSimpleLineSymbol = simpleLineSymbol.clone();
    newSimpleLineSymbol.width = Number(currentWidthValue);
    setSimpleLineSymbol(newSimpleLineSymbol);

    const newSimpleFillSymbol = simpleFillSymbol.clone();
    newSimpleFillSymbol.outline = newSimpleLineSymbol;
    updateGraphics(newSimpleFillSymbol);
  };

  const handleStyleChange = (
    currentStyleValue: SimpleFillSymbolStyleOption
  ) => {
    const newSimpleFillSymbol = simpleFillSymbol.clone();
    newSimpleFillSymbol.style = currentStyleValue;
    updateGraphics(newSimpleFillSymbol);
  };

  const handleCopyJSONClick = () => {
    navigator.clipboard.writeText(
      JSON.stringify(simpleLineSymbol.toJSON(), null, 2)
    );
  };

  return (
    <CalciteShell style={shellStyles}>
      <Suspense
        fallback={
          <CalciteLoader label="loading" text="loading" type="indeterminate" />
        }
      >
        {view}
      </Suspense>
      <CalciteShellPanel
        slot="panel-start"
        position="start"
        resizable
        widthScale="l"
      >
        <CalcitePanel>
          <div slot="header-content">Properties </div>
          <CalciteLabel
            slot="header-actions-end"
            layout="inline"
            style={viewSwitchLabelStyles}
          >
            SceneView
            <CalciteSwitch
              ref={viewSwitchRef}
              onCalciteSwitchChange={handleSwitchChange}
            ></CalciteSwitch>
          </CalciteLabel>

          <form style={formStyles}>
            <SimpleFillSymbolForm
              handleColorChange={handleColorChange}
              handleOutlineCapChange={handleOutlineCapChange}
              handleOutlineColorChange={handleOutlineColorChange}
              handleOutlineJoinChange={handleOutlineJoinChange}
              handleOutlineMiterLimitChange={handleOutlineMiterLimitChange}
              handleOutlineStyleChange={handleOutlineStyleChange}
              handleOutlineWidthChange={handleOutlineWidthChange}
              handleStyleChange={handleStyleChange}
            />
          </form>
        </CalcitePanel>

        <CalcitePanel>
          <div slot="header-content">JSON</div>
          <CalciteAction
            icon="copy-to-clipboard"
            label="Copy code to clipboard"
            text="Copy JSON"
            textEnabled
            slot="header-actions-end"
            onClick={handleCopyJSONClick}
          ></CalciteAction>
          <pre>{JSON.stringify(simpleFillSymbol.toJSON(), null, 2)}</pre>
        </CalcitePanel>
      </CalciteShellPanel>
    </CalciteShell>
  );
};

export default SimpleFillSymbolPage;
