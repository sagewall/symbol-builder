import Polyline from "@arcgis/core/geometry/Polyline";
import Graphic from "@arcgis/core/Graphic";
import SimpleLineSymbol from "@arcgis/core/symbols/SimpleLineSymbol";
import "@esri/calcite-components/dist/components/calcite-shell";
import { lazy, Suspense, useRef, useState } from "react";
import LineSymbolMarker from "@arcgis/core/symbols/LineSymbolMarker";
import Color from "@arcgis/core/Color";
import Collection from "@arcgis/core/core/Collection";
import {
  CalciteAction,
  CalciteBlock,
  CalciteColorPicker,
  CalciteLabel,
  CalciteLoader,
  CalciteOption,
  CalcitePanel,
  CalciteSelect,
  CalciteShell,
  CalciteShellPanel,
} from "@esri/calcite-components-react";
import "@esri/calcite-components/dist/components/calcite-action";
import "@esri/calcite-components/dist/components/calcite-block";
import "@esri/calcite-components/dist/components/calcite-color-picker";
import "@esri/calcite-components/dist/components/calcite-label";
import "@esri/calcite-components/dist/components/calcite-loader";
import "@esri/calcite-components/dist/components/calcite-option";
import "@esri/calcite-components/dist/components/calcite-panel";
import "@esri/calcite-components/dist/components/calcite-select";
import "@esri/calcite-components/dist/components/calcite-shell";
import "@esri/calcite-components/dist/components/calcite-shell-panel";

const MapView = lazy(() => import("./MapView"));
const SceneView = lazy(() => import("./SceneView"));

interface SimpleLineSymbolPageProps {
  sceneView: boolean;
}
type CapOption = "butt" | "round" | "square";
type JoinOption = "miter" | "round" | "bevel";
type MarkerPlacementOption = "begin" | "end" | "begin-end";
type MarkerStyleOption =
  | "arrow"
  | "circle"
  | "square"
  | "diamond"
  | "cross"
  | "x";

const SimpleLineSymbolPage = ({ sceneView }: SimpleLineSymbolPageProps) => {
  const capSelectRef = useRef(null);
  const colorPickerRef = useRef(null);
  const joinSelectRef = useRef(null);
  const markerBlockRef = useRef(null);
  const markerColorPickerRef = useRef(null);
  const markerPlacementSelectRef = useRef(null);
  const markerStyleSelectRef = useRef(null);

  const [simpleLineSymbol, setSimpleLineSymbol] = useState(
    new SimpleLineSymbol({
      cap: "round",
      color: "#007ac2",
      join: "round",
      marker: undefined,
      miterLimit: 2,
      style: "solid",
      width: 8,
    })
  );

  const [lineSymbolMarker, setLineSymbolMarker] = useState(
    new LineSymbolMarker({
      color: "#007ac2",
      placement: "begin-end",
      style: "arrow",
    })
  );

  const polyline = new Polyline({
    paths: [
      [
        [-105.0, 40.0],
        [-105.1, 40.2],
        [-105.35, 40.1],
      ],
    ],
  });

  const polylineGraphic = new Graphic({
    geometry: polyline,
    symbol: simpleLineSymbol,
  });

  const graphicsCollection = new Collection();
  graphicsCollection.add(polylineGraphic);

  const [graphics, setGraphics] =
    useState<Collection<Graphic>>(graphicsCollection);

  let view = <MapView graphics={graphics} />;
  if (sceneView) {
    view = <SceneView graphics={graphics} />;
  }

  const handleCapChange = () => {
    if (capSelectRef.current) {
      const currentCapValue = (capSelectRef.current as HTMLCalciteSelectElement)
        .value as CapOption;

      const newSimpleLineSymbol = simpleLineSymbol.clone();
      newSimpleLineSymbol.cap = currentCapValue;
      setSimpleLineSymbol(newSimpleLineSymbol);

      const newPolylineGraphic = graphics.getItemAt(0).clone();
      newPolylineGraphic.symbol = newSimpleLineSymbol;

      const newGraphics = new Collection();
      newGraphics.add(newPolylineGraphic);
      setGraphics(newGraphics);
    }
  };

  const handleColorChange = () => {
    if (colorPickerRef.current) {
      const currentColor = (
        colorPickerRef.current as HTMLCalciteColorPickerElement
      ).value;

      const newSimpleLineSymbol = simpleLineSymbol.clone();
      newSimpleLineSymbol.color = new Color(currentColor);
      setSimpleLineSymbol(newSimpleLineSymbol);

      const newPolylineGraphic = graphics.getItemAt(0).clone();
      newPolylineGraphic.symbol = newSimpleLineSymbol;

      const newGraphics = new Collection();
      newGraphics.add(newPolylineGraphic);
      setGraphics(newGraphics);
    }
  };

  const handleJoinChange = () => {
    if (joinSelectRef.current) {
      const currentJoinValue = (
        joinSelectRef.current as HTMLCalciteSelectElement
      ).value as JoinOption;

      const newSimpleLineSymbol = simpleLineSymbol.clone();
      newSimpleLineSymbol.join = currentJoinValue;
      setSimpleLineSymbol(newSimpleLineSymbol);

      const newPolylineGraphic = graphics.getItemAt(0).clone();
      newPolylineGraphic.symbol = newSimpleLineSymbol;

      const newGraphics = new Collection();
      newGraphics.add(newPolylineGraphic);
      setGraphics(newGraphics);
    }
  };

  const handleMarkerBlockToggle = () => {
    if (markerBlockRef.current) {
      const currentMarkerBlock =
        markerBlockRef.current as HTMLCalciteBlockElement;

      const newSimpleLineSymbol = simpleLineSymbol.clone();
      if (currentMarkerBlock.open) {
        newSimpleLineSymbol.marker = lineSymbolMarker;
        setSimpleLineSymbol(newSimpleLineSymbol);
      } else {
        newSimpleLineSymbol.marker = null;
        setSimpleLineSymbol(newSimpleLineSymbol);
      }

      const newPolylineGraphic = graphics.getItemAt(0).clone();
      newPolylineGraphic.symbol = newSimpleLineSymbol;

      const newGraphics = new Collection();
      newGraphics.add(newPolylineGraphic);
      setGraphics(newGraphics);
    }
  };

  const handleMarkerColorChange = () => {
    if (markerColorPickerRef.current) {
      const currentColor = (
        markerColorPickerRef.current as HTMLCalciteColorPickerElement
      ).value;

      const newSimpleLineSymbol = simpleLineSymbol.clone();
      if (newSimpleLineSymbol.marker) {
        newSimpleLineSymbol.marker.color = new Color(currentColor);
      }
      setSimpleLineSymbol(newSimpleLineSymbol);

      const newPolylineGraphic = graphics.getItemAt(0).clone();
      newPolylineGraphic.symbol = newSimpleLineSymbol;

      const newGraphics = new Collection();
      newGraphics.add(newPolylineGraphic);
      setGraphics(newGraphics);
    }
  };

  const handleMarkerPlacementChange = () => {
    if (markerPlacementSelectRef.current) {
      const currentMarkerPlacementValue = (
        markerPlacementSelectRef.current as HTMLCalciteSelectElement
      ).value as MarkerPlacementOption;

      const newSimpleLineSymbol = simpleLineSymbol.clone();
      if (newSimpleLineSymbol.marker) {
        newSimpleLineSymbol.marker.placement = currentMarkerPlacementValue;
      }

      setSimpleLineSymbol(newSimpleLineSymbol);

      const newPolylineGraphic = graphics.getItemAt(0).clone();
      newPolylineGraphic.symbol = newSimpleLineSymbol;

      const newGraphics = new Collection();
      newGraphics.add(newPolylineGraphic);
      setGraphics(newGraphics);
    }
  };

  const handleMarkerStyleChange = () => {
    if (markerStyleSelectRef.current) {
      const currentMarkerStyleValue = (
        markerStyleSelectRef.current as HTMLCalciteSelectElement
      ).value as MarkerStyleOption;

      const newSimpleLineSymbol = simpleLineSymbol.clone();
      if (newSimpleLineSymbol.marker) {
        newSimpleLineSymbol.marker.style = currentMarkerStyleValue;
      }

      setSimpleLineSymbol(newSimpleLineSymbol);

      const newPolylineGraphic = graphics.getItemAt(0).clone();
      newPolylineGraphic.symbol = newSimpleLineSymbol;

      const newGraphics = new Collection();
      newGraphics.add(newPolylineGraphic);
      setGraphics(newGraphics);
    }
  };

  const handleCopyJSONClick = () => {
    navigator.clipboard.writeText(
      JSON.stringify(simpleLineSymbol.toJSON(), null, 2)
    );
  };

  const capOptions = ["round", "butt", "square"];
  const joinOptions = ["round", "miter", "bevel"];
  const markerPlacementOptions = ["begin-end", "begin", "end"];
  const markerStyleOptions = [
    "arrow",
    "circle",
    "square",
    "diamond",
    "cross",
    "x",
  ];

  return (
    <CalciteShell>
      <Suspense
        fallback={<CalciteLoader label="loading" text="laoding" active />}
      >
        {view}
      </Suspense>
      <CalciteShellPanel
        slot="panel-end"
        position="end"
        resizable
        widthScale="l"
      >
        <CalcitePanel>
          <div slot="header-content">Properties</div>
          <CalciteLabel layout="inline">
            cap:
            <CalciteSelect
              ref={capSelectRef}
              label={"cap selection"}
              onCalciteSelectChange={handleCapChange}
            >
              {capOptions.map((option, index) => (
                <CalciteOption key={index}>{option}</CalciteOption>
              ))}
            </CalciteSelect>
          </CalciteLabel>
          <CalciteBlock
            collapsible
            heading={`color: ${simpleLineSymbol.color.toHex()}`}
            onCalciteBlockToggle={handleMarkerBlockToggle}
          >
            <CalciteLabel layout="inline">
              color:
              <CalciteColorPicker
                ref={colorPickerRef}
                onCalciteColorPickerChange={handleColorChange}
              ></CalciteColorPicker>
            </CalciteLabel>
          </CalciteBlock>
          <CalciteLabel layout="inline">
            join:
            <CalciteSelect
              ref={joinSelectRef}
              label={"join selection"}
              onCalciteSelectChange={handleJoinChange}
            >
              {joinOptions.map((option, index) => (
                <CalciteOption key={index}>{option}</CalciteOption>
              ))}
            </CalciteSelect>
          </CalciteLabel>
          <CalciteBlock
            ref={markerBlockRef}
            collapsible
            heading={"marker: "}
            onCalciteBlockToggle={handleMarkerBlockToggle}
          >
            <CalciteBlock
              collapsible
              heading={`color: ${simpleLineSymbol.color.toHex()}`}
            >
              <CalciteLabel layout="inline">
                color:
                <CalciteColorPicker
                  ref={markerColorPickerRef}
                  onCalciteColorPickerChange={handleMarkerColorChange}
                ></CalciteColorPicker>
              </CalciteLabel>
            </CalciteBlock>
            <CalciteLabel layout="inline">
              placement:
              <CalciteSelect
                ref={markerPlacementSelectRef}
                label={"marker placement selection"}
                onCalciteSelectChange={handleMarkerPlacementChange}
              >
                {markerPlacementOptions.map((option, index) => (
                  <CalciteOption key={index}>{option}</CalciteOption>
                ))}
              </CalciteSelect>
            </CalciteLabel>
            <CalciteLabel layout="inline">
              style:
              <CalciteSelect
                ref={markerStyleSelectRef}
                label={"marker style selection"}
                onCalciteSelectChange={handleMarkerStyleChange}
              >
                {markerStyleOptions.map((option, index) => (
                  <CalciteOption key={index}>{option}</CalciteOption>
                ))}
              </CalciteSelect>
            </CalciteLabel>
          </CalciteBlock>
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
    </CalciteShell>
  );
};

export default SimpleLineSymbolPage;
