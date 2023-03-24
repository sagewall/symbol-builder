import Color from "@arcgis/core/Color";
import Collection from "@arcgis/core/core/Collection";
import Graphic from "@arcgis/core/Graphic";
import LineSymbolMarker from "@arcgis/core/symbols/LineSymbolMarker";
import SimpleLineSymbol from "@arcgis/core/symbols/SimpleLineSymbol";
import {
  CalciteAction,
  CalciteLabel,
  CalcitePanel,
  CalciteShell,
  CalciteShellPanel,
  CalciteSwitch
} from "@esri/calcite-components-react";
import React, { useRef, useState } from "react";
import { polyline } from "./lib/geometry";
import { formStyles, shellStyles, viewSwitchLabelStyles } from "./lib/styles";
import { MarkerPlacement, LineStyleMarker3DStyle, Cap, Join, LineStyle } from "./lib/types";
import MapView from "./MapView";
import SceneView from "./SceneView";
import SimpleLineSymbolForm from "./SimpleLineSymbolForm";

const SimpleLineSymbolShell = () => {
  const viewSwitchRef = useRef(null);

  const [simpleLineSymbol, setSimpleLineSymbol] = useState(
    new SimpleLineSymbol({
      color: "#007ac2",
      width: 2
    })
  );

  const [lineSymbolMarker, setLineSymbolMarker] = useState(
    new LineSymbolMarker({
      color: "#007ac2"
    })
  );

  const polylineGraphic = new Graphic({
    geometry: polyline,
    symbol: simpleLineSymbol
  });

  const graphicsCollection = new Collection();
  graphicsCollection.add(polylineGraphic);

  const [graphics, setGraphics] = useState<Collection<Graphic>>(graphicsCollection);

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

  const updateGraphics = (newSimpleLineSymbol: SimpleLineSymbol) => {
    setSimpleLineSymbol(newSimpleLineSymbol);

    const newPolylineGraphic = graphics.getItemAt(0).clone();
    newPolylineGraphic.symbol = newSimpleLineSymbol;

    const newGraphics = new Collection();
    newGraphics.add(newPolylineGraphic);
    setGraphics(newGraphics);
  };

  const handleCapChange = (currentCapValue: Cap) => {
    const newSimpleLineSymbol = simpleLineSymbol.clone();
    newSimpleLineSymbol.cap = currentCapValue;
    updateGraphics(newSimpleLineSymbol);
  };

  const handleColorChange = (currentColor: string) => {
    const newSimpleLineSymbol = simpleLineSymbol.clone();
    newSimpleLineSymbol.color = new Color(currentColor);
    updateGraphics(newSimpleLineSymbol);
  };

  const handleJoinChange = (currentJoinValue: Join) => {
    const newSimpleLineSymbol = simpleLineSymbol.clone();
    newSimpleLineSymbol.join = currentJoinValue;
    updateGraphics(newSimpleLineSymbol);
  };

  const handleMarkerBlockToggle = (currentMarkerBlock: HTMLCalciteBlockElement) => {
    if (currentMarkerBlock.heading == "marker") {
      const newSimpleLineSymbol = simpleLineSymbol.clone();
      if (currentMarkerBlock.open) {
        newSimpleLineSymbol.marker = lineSymbolMarker;
        setLineSymbolMarker(newSimpleLineSymbol.marker as LineSymbolMarker);
        updateGraphics(newSimpleLineSymbol);
      } else {
        newSimpleLineSymbol.marker = null;
        updateGraphics(newSimpleLineSymbol);
      }
    }
  };

  const handleMarkerColorChange = (currentColor: string) => {
    const newSimpleLineSymbol = simpleLineSymbol.clone();
    if (newSimpleLineSymbol.marker) {
      newSimpleLineSymbol.marker.color = new Color(currentColor);
    }

    setLineSymbolMarker(newSimpleLineSymbol.marker as LineSymbolMarker);
    updateGraphics(newSimpleLineSymbol);
  };

  const handleMarkerPlacementChange = (currentPlacementValue: MarkerPlacement) => {
    const newSimpleLineSymbol = simpleLineSymbol.clone();
    if (newSimpleLineSymbol.marker) {
      newSimpleLineSymbol.marker.placement = currentPlacementValue;
    }

    setLineSymbolMarker(newSimpleLineSymbol.marker as LineSymbolMarker);
    updateGraphics(newSimpleLineSymbol);
  };

  const handleMarkerStyleChange = (currentMarkerStyle: LineStyleMarker3DStyle) => {
    const newSimpleLineSymbol = simpleLineSymbol.clone();
    if (newSimpleLineSymbol.marker) {
      newSimpleLineSymbol.marker.style = currentMarkerStyle;
    }

    setLineSymbolMarker(newSimpleLineSymbol.marker as LineSymbolMarker);
    updateGraphics(newSimpleLineSymbol);
  };

  const handleMiterLimitChange = (currentMiterLimitValue: string) => {
    const newSimpleLineSymbol = simpleLineSymbol.clone();
    newSimpleLineSymbol.miterLimit = Number(currentMiterLimitValue);
    updateGraphics(newSimpleLineSymbol);
  };

  const handleStyleChange = (currentStyleValue: LineStyle) => {
    const newSimpleLineSymbol = simpleLineSymbol.clone();
    newSimpleLineSymbol.style = currentStyleValue;
    updateGraphics(newSimpleLineSymbol);
  };

  const handleWidthChange = (currentWidthValue: string) => {
    const newSimpleLineSymbol = simpleLineSymbol.clone();
    newSimpleLineSymbol.width = Number(currentWidthValue);
    updateGraphics(newSimpleLineSymbol);
  };

  const handleCopyJSONClick = () => {
    navigator.clipboard.writeText(JSON.stringify(simpleLineSymbol.toJSON(), null, 2));
  };

  return (
    <React.Fragment>
      <CalciteShell style={shellStyles}>
        <CalciteShellPanel slot="panel-start" position="start" resizable>
          <CalcitePanel>
            <div slot="header-content">Properties </div>

            <CalciteLabel slot="header-actions-end" layout="inline" style={viewSwitchLabelStyles}>
              2D
              <CalciteSwitch
                ref={viewSwitchRef}
                onCalciteSwitchChange={handleSwitchChange}
              ></CalciteSwitch>
              3D
            </CalciteLabel>

            <div style={formStyles}>
              <SimpleLineSymbolForm
                handleCapChange={handleCapChange}
                handleColorChange={handleColorChange}
                handleJoinChange={handleJoinChange}
                handleMarkerBlockToggle={handleMarkerBlockToggle}
                handleMarkerColorChange={handleMarkerColorChange}
                handleMarkerPlacementChange={handleMarkerPlacementChange}
                handleMarkerStyleChange={handleMarkerStyleChange}
                handleMiterLimitChange={handleMiterLimitChange}
                handleStyleChange={handleStyleChange}
                handleWidthChange={handleWidthChange}
                showMarker={true}
              ></SimpleLineSymbolForm>
            </div>
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
            <pre>{JSON.stringify(simpleLineSymbol.toJSON(), null, 2)}</pre>
          </CalcitePanel>
        </CalciteShellPanel>
        {view}
      </CalciteShell>
    </React.Fragment>
  );
};

export default SimpleLineSymbolShell;
