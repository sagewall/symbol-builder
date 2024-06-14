import Graphic from "@arcgis/core/Graphic";
import Collection from "@arcgis/core/core/Collection";
import esriRequest from "@arcgis/core/request";
import WebStyleSymbol from "@arcgis/core/symbols/WebStyleSymbol";
import {
  CalciteLabel,
  CalcitePanel,
  CalciteShell,
  CalciteShellPanel,
  CalciteSwitch,
  CalciteTab,
  CalciteTabNav,
  CalciteTabTitle,
  CalciteTabs
} from "@esri/calcite-components-react";
import React, { useEffect, useRef, useState } from "react";
import Header from "./Header";
import MapView from "./MapView";
import SceneView from "./SceneView";
import WebStyleSymbol2DForm from "./WebStyleSymbol2DForm";
import WebStyleSymbol3DForm from "./WebStyleSymbol3DForm";
import WebStyleSymbolAMDPanel from "./WebStyleSymbolAMDPanel";
import WebStyleSymbolESMPanel from "./WebStyleSymbolESMPanel";
import WebStyleSymbolJSONPanel from "./WebStyleSymbolJSONPanel";
import {
  ESRI_2D_POINT_SYMBOLS_STYLE_NAME_OPTIONS,
  ESRI_ICONS_STYLE_NAME_OPTIONS,
  ESRI_INFRASTRUCTURE_STYLE_NAME_OPTIONS,
  ESRI_REALISTIC_SIGNS_AND_SIGNALS_STYLE_NAME_OPTIONS,
  ESRI_REALISTIC_STREET_SCENE_STYLE_NAME_OPTIONS,
  ESRI_REALISTIC_TRANSPORTATION_STYLE_NAME_OPTIONS,
  ESRI_REALISTIC_TREES_STYLE_NAME_OPTIONS,
  ESRI_RECREATION_STYLE_NAME_OPTIONS,
  ESRI_THEMATIC_SHAPES_STYLE_NAME_OPTIONS,
  ESRI_THEMATIC_TREES_STYLE_NAME_OPTIONS
} from "./lib/constants";
import { point } from "./lib/geometry";
import {
  formStyles,
  shellPanelStyles,
  shellStyles,
  tabNavStyles,
  viewSwitchLabelStyles
} from "./lib/styles";
import type { GroupItem, ItemType } from "./lib/types";

const WebStyleSymbolShell = () => {
  const viewSwitchRef = useRef(null);

  const defaultPointWebStyleSymbol2D = new WebStyleSymbol({
    name: "Armadillo",
    styleUrl:
      "https://www.arcgis.com/sharing/rest/content/items/1fbb242c54e4415d9b8e8a343ca7a9d0/data"
  });

  const defaultWebStyleSymbol3D = new WebStyleSymbol({
    name: "Accessibility",
    styleName: "EsriIconsStyle"
  });

  const [groupItems, setGroupItems] = useState([]);
  const [pointWebStyleSymbol, setPointWebStyleSymbol] = useState(defaultPointWebStyleSymbol2D);

  const pointGraphic = new Graphic({
    geometry: point,
    symbol: pointWebStyleSymbol
  });

  const graphicsCollection = new Collection();
  graphicsCollection.add(pointGraphic);

  const [graphics, setGraphics] = useState<Collection<Graphic>>(graphicsCollection);

  const [sceneView, setSceneView] = useState(false);
  let view = <MapView graphics={graphics} />;
  if (sceneView) {
    view = <SceneView graphics={graphics} />;
  }

  const handleSwitchChange = () => {
    if (viewSwitchRef.current) {
      setSceneView((viewSwitchRef.current as HTMLCalciteSwitchElement).checked);
      (viewSwitchRef.current as HTMLCalciteSwitchElement).checked
        ? updateGraphics(defaultWebStyleSymbol3D, "pointSymbol")
        : updateGraphics(defaultPointWebStyleSymbol2D, "pointSymbol");
    }
  };

  const updateGraphics = (newWebStyleSymbol: WebStyleSymbol, itemType: ItemType) => {
    if (itemType === "pointSymbol") {
      setPointWebStyleSymbol(newWebStyleSymbol);

      const newPointGraphic = graphics.getItemAt(0).clone();
      newPointGraphic.symbol = newWebStyleSymbol;

      const newGraphics = new Collection();
      newGraphics.add(newPointGraphic);
      setGraphics(newGraphics);
    }

    if (itemType === "lineSymbol") {
      console.log(newWebStyleSymbol, "lineSymbol");
    }
  };

  const handleNameChange = (currentName: string) => {
    const newWebStyleSymbol = pointWebStyleSymbol.clone();
    newWebStyleSymbol.name = currentName;
    updateGraphics(newWebStyleSymbol, "pointSymbol");
  };

  const handleStyleNameChange = (currentStyleName: string) => {
    const newWebStyleSymbol = new WebStyleSymbol();

    switch (currentStyleName) {
      case "EsriIconsStyle":
        newWebStyleSymbol.name = ESRI_ICONS_STYLE_NAME_OPTIONS[0];
        break;

      case "EsriInfrastructureStyle":
        newWebStyleSymbol.name = ESRI_INFRASTRUCTURE_STYLE_NAME_OPTIONS[0];
        break;

      case "EsriRealisticSignsandSignalsStyle":
        newWebStyleSymbol.name = ESRI_REALISTIC_SIGNS_AND_SIGNALS_STYLE_NAME_OPTIONS[0];
        break;

      case "EsriRealisticStreetSceneStyle":
        newWebStyleSymbol.name = ESRI_REALISTIC_STREET_SCENE_STYLE_NAME_OPTIONS[0];
        break;

      case "EsriRealisticTransportationStyle":
        newWebStyleSymbol.name = ESRI_REALISTIC_TRANSPORTATION_STYLE_NAME_OPTIONS[0];
        break;

      case "EsriRealisticTreesStyle":
        newWebStyleSymbol.name = ESRI_REALISTIC_TREES_STYLE_NAME_OPTIONS[0];
        break;

      case "EsriRecreationStyle":
        newWebStyleSymbol.name = ESRI_RECREATION_STYLE_NAME_OPTIONS[0];
        break;

      case "EsriThematicShapesStyle":
        newWebStyleSymbol.name = ESRI_THEMATIC_SHAPES_STYLE_NAME_OPTIONS[0];
        break;

      case "EsriThematicTreesStyle":
        newWebStyleSymbol.name = ESRI_THEMATIC_TREES_STYLE_NAME_OPTIONS[0];
        break;

      default:
        newWebStyleSymbol.name = ESRI_2D_POINT_SYMBOLS_STYLE_NAME_OPTIONS[0];
    }

    newWebStyleSymbol.styleName = currentStyleName;
    updateGraphics(newWebStyleSymbol, "pointSymbol");
  };

  const handleCustomStyleChange = (
    currentStyleUrl: string,
    currentName: string,
    itemType: ItemType
  ) => {
    const newWebStyleSymbol = new WebStyleSymbol();
    newWebStyleSymbol.name = currentName;
    newWebStyleSymbol.styleUrl = currentStyleUrl;

    if (itemType === "pointSymbol") {
      updateGraphics(newWebStyleSymbol, "pointSymbol");
    }

    if (itemType === "lineSymbol") {
      console.log(newWebStyleSymbol, "lineSymbol");
    }

    if (itemType === "polygonSymbol") {
      console.log(newWebStyleSymbol, "polygonSymbol");
    }
  };

  const requestGroupItems = async (itemId: string) => {
    const response = await esriRequest(
      `https://www.arcgis.com/sharing/rest/content/groups/${itemId}?f=pjson`,
      {
        responseType: "json"
      }
    );
    const sortedGroupItems = response.data.items.sort((a: GroupItem, b: GroupItem) =>
      a.title.localeCompare(b.title)
    );
    setGroupItems(sortedGroupItems);
  };

  useEffect(() => {
    requestGroupItems("7687bc306b8048a48efd92b3a6da9d88");
  }, []);

  return (
    <React.Fragment>
      <CalciteShell style={shellStyles}>
        <Header title="WebStyleSymbol" backButton></Header>
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
              {!sceneView ? (
                <WebStyleSymbol2DForm
                  groupItems={groupItems}
                  handleNameChange={handleNameChange}
                  handleStyleNameChange={handleStyleNameChange}
                  handleCustomStyleChange={handleCustomStyleChange}
                />
              ) : (
                <WebStyleSymbol3DForm
                  handleNameChange={handleNameChange}
                  handleStyleNameChange={handleStyleNameChange}
                  handleCustomStyleChange={handleCustomStyleChange}
                />
              )}
            </div>
          </CalcitePanel>
        </CalciteShellPanel>

        <CalciteShellPanel slot="panel-end" position="end" resizable style={shellPanelStyles}>
          <CalcitePanel>
            <CalciteTabs>
              <CalciteTabNav slot="title-group" style={tabNavStyles}>
                <CalciteTabTitle>ESM</CalciteTabTitle>
                <CalciteTabTitle>AMD</CalciteTabTitle>
                <CalciteTabTitle>JSON</CalciteTabTitle>
              </CalciteTabNav>
              <CalciteTab>
                <WebStyleSymbolESMPanel webStyleSymbol={pointWebStyleSymbol} />
              </CalciteTab>
              <CalciteTab>
                <WebStyleSymbolAMDPanel webStyleSymbol={pointWebStyleSymbol} />
              </CalciteTab>
              <CalciteTab>
                <WebStyleSymbolJSONPanel webStyleSymbol={pointWebStyleSymbol} />
              </CalciteTab>
            </CalciteTabs>
          </CalcitePanel>
        </CalciteShellPanel>
        {view}
      </CalciteShell>
    </React.Fragment>
  );
};

export default WebStyleSymbolShell;
