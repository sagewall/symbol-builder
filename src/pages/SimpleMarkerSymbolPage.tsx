import Color from "@arcgis/core/Color";
import Collection from "@arcgis/core/core/Collection";
import Point from "@arcgis/core/geometry/Point";
import Graphic from "@arcgis/core/Graphic";
import SimpleLineSymbol from "@arcgis/core/symbols/SimpleLineSymbol";
import SimpleMarkerSymbol from "@arcgis/core/symbols/SimpleMarkerSymbol";
import {
  CalciteAction,
  CalciteLabel,
  CalciteLoader,
  CalcitePanel,
  CalciteShell,
  CalciteShellPanel,
  CalciteSwitch,
} from "@esri/calcite-components-react";
import React, { lazy, Suspense, useRef, useState } from "react";
import {
  formStyles,
  shellStyles,
  viewSwitchLabelStyles,
} from "../components/lib/styles";
import {
  SimpleLineSymbolCapOption,
  SimpleLineSymbolJoinOption,
  SimpleLineSymbolStyleOption,
  SimpleMarkerSymbolStyleOption,
} from "../components/lib/types";
import SimpleMarkerSymbolForm from "../components/SimpleMarkerSymbolForm";

const MapView = lazy(() => import("../components/MapView"));
const SceneView = lazy(() => import("../components/SceneView"));

const SimpleMarkerSymbolPage = () => {
  const viewSwitchRef = useRef(null);

  const [simpleLineSymbol, setSimpleLineSymbol] = useState(
    new SimpleLineSymbol({ color: "#007ac2" })
  );

  const [simpleMarkerSymbol, setSimpleMarkerSymbol] = useState(
    new SimpleMarkerSymbol({
      outline: simpleLineSymbol,
    })
  );

  const point = new Point({
    latitude: 40.2,
    longitude: -105.1,
  });

  const pointGraphic = new Graphic({
    geometry: point,
    symbol: simpleMarkerSymbol,
  });

  const graphicsCollection = new Collection();
  graphicsCollection.add(pointGraphic);

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

  const updateGraphics = (newSimpleMarkerSymbol: SimpleMarkerSymbol) => {
    setSimpleMarkerSymbol(newSimpleMarkerSymbol);

    const newPointGraphic = graphics.getItemAt(0).clone();
    newPointGraphic.symbol = newSimpleMarkerSymbol;

    const newGraphics = new Collection();
    newGraphics.add(newPointGraphic);
    setGraphics(newGraphics);
  };

  const handleAngleChange = (currentAngle: number) => {
    const newSimpleMarkerSymbol = simpleMarkerSymbol.clone();
    newSimpleMarkerSymbol.angle = Number(currentAngle);
    updateGraphics(newSimpleMarkerSymbol);
  };

  const handleColorChange = (currentColor: string) => {
    const newSimpleMarkerSymbol = simpleMarkerSymbol.clone();
    newSimpleMarkerSymbol.color = new Color(currentColor);
    updateGraphics(newSimpleMarkerSymbol);
  };

  const handleOutlineCapChange = (
    currentCapValue: SimpleLineSymbolCapOption
  ) => {
    const newSimpleLineSymbol = simpleLineSymbol.clone();
    newSimpleLineSymbol.cap = currentCapValue;
    setSimpleLineSymbol(newSimpleLineSymbol);

    const newSimpleMarkerSymbol = simpleMarkerSymbol.clone();
    newSimpleMarkerSymbol.outline = newSimpleLineSymbol;
    updateGraphics(newSimpleMarkerSymbol);
  };

  const handleOutlineColorChange = (currentColor: string) => {
    const newSimpleLineSymbol = simpleLineSymbol.clone();
    newSimpleLineSymbol.color = new Color(currentColor);
    setSimpleLineSymbol(newSimpleLineSymbol);

    const newSimpleMarkerSymbol = simpleMarkerSymbol.clone();
    newSimpleMarkerSymbol.outline = newSimpleLineSymbol;
    updateGraphics(newSimpleMarkerSymbol);
  };

  const handleOutlineJoinChange = (
    currentJoinValue: SimpleLineSymbolJoinOption
  ) => {
    const newSimpleLineSymbol = simpleLineSymbol.clone();
    newSimpleLineSymbol.join = currentJoinValue;
    setSimpleLineSymbol(newSimpleLineSymbol);

    const newSimpleMarkerSymbol = simpleMarkerSymbol.clone();
    newSimpleMarkerSymbol.outline = newSimpleLineSymbol;
    updateGraphics(newSimpleMarkerSymbol);
  };

  const handleOutlineMiterLimitChange = (currentMiterLimitValue: string) => {
    const newSimpleLineSymbol = simpleLineSymbol.clone();
    newSimpleLineSymbol.miterLimit = Number(currentMiterLimitValue);
    setSimpleLineSymbol(newSimpleLineSymbol);

    const newSimpleMarkerSymbol = simpleMarkerSymbol.clone();
    newSimpleMarkerSymbol.outline = newSimpleLineSymbol;
    updateGraphics(newSimpleMarkerSymbol);
  };

  const handleOutlineStyleChange = (
    currentStyleValue: SimpleLineSymbolStyleOption
  ) => {
    const newSimpleLineSymbol = simpleLineSymbol.clone();
    newSimpleLineSymbol.style = currentStyleValue;
    setSimpleLineSymbol(newSimpleLineSymbol);

    const newSimpleMarkerSymbol = simpleMarkerSymbol.clone();
    newSimpleMarkerSymbol.outline = newSimpleLineSymbol;
    updateGraphics(newSimpleMarkerSymbol);
  };

  const handleOutlineWidthChange = (currentWidthValue: string) => {
    const newSimpleLineSymbol = simpleLineSymbol.clone();
    newSimpleLineSymbol.width = Number(currentWidthValue);
    setSimpleLineSymbol(newSimpleLineSymbol);

    const newSimpleMarkerSymbol = simpleMarkerSymbol.clone();
    newSimpleMarkerSymbol.outline = newSimpleLineSymbol;
    updateGraphics(newSimpleMarkerSymbol);
  };

  const handlePathChange = (currentPathValue: string) => {
    const newSimpleMarkerSymbol = simpleMarkerSymbol.clone();
    newSimpleMarkerSymbol.path = currentPathValue;
    updateGraphics(newSimpleMarkerSymbol);
  };

  const handleSizeChange = (currentSize: string) => {
    const newSimpleMarkerSymbol = simpleMarkerSymbol.clone();
    newSimpleMarkerSymbol.size = Number(currentSize);
    updateGraphics(newSimpleMarkerSymbol);
  };

  const handleStyleChange = (
    currentStyleValue: SimpleMarkerSymbolStyleOption
  ) => {
    const newSimpleMarkerSymbol = simpleMarkerSymbol.clone();
    newSimpleMarkerSymbol.style = currentStyleValue;
    updateGraphics(newSimpleMarkerSymbol);
  };

  const handleXoffsetChange = (currentXOffset: string) => {
    const newSimpleMarkerSymbol = simpleMarkerSymbol.clone();
    newSimpleMarkerSymbol.xoffset = Number(currentXOffset);
    updateGraphics(newSimpleMarkerSymbol);
  };

  const handleYoffsetChange = (currentYOffset: string) => {
    const newSimpleMarkerSymbol = simpleMarkerSymbol.clone();
    newSimpleMarkerSymbol.yoffset = Number(currentYOffset);
    updateGraphics(newSimpleMarkerSymbol);
  };

  const handleCopyJSONClick = () => {
    navigator.clipboard.writeText(
      JSON.stringify(simpleLineSymbol.toJSON(), null, 2)
    );
  };

  return (
    <React.Fragment>
      <CalciteShell style={shellStyles}>
        <Suspense
          fallback={
            <CalciteLoader
              label="loading"
              text="loading"
              type="indeterminate"
            />
          }
        >
          {view}
        </Suspense>
        <CalciteShellPanel slot="panel-start" position="start" resizable>
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
              <SimpleMarkerSymbolForm
                handleAngleChange={handleAngleChange}
                handleColorChange={handleColorChange}
                handleOutlineCapChange={handleOutlineCapChange}
                handleOutlineColorChange={handleOutlineColorChange}
                handleOutlineJoinChange={handleOutlineJoinChange}
                handleOutlineMiterLimitChange={handleOutlineMiterLimitChange}
                handleOutlineStyleChange={handleOutlineStyleChange}
                handleOutlineWidthChange={handleOutlineWidthChange}
                handlePathChange={handlePathChange}
                handleSizeChange={handleSizeChange}
                handleStyleChange={handleStyleChange}
                handleXoffsetChange={handleXoffsetChange}
                handleYoffsetChange={handleYoffsetChange}
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
            <pre>{JSON.stringify(simpleMarkerSymbol.toJSON(), null, 2)}</pre>
          </CalcitePanel>
        </CalciteShellPanel>
      </CalciteShell>
    </React.Fragment>
  );
};

export default SimpleMarkerSymbolPage;
