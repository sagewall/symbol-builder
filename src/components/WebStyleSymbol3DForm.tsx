import esriRequest from "@arcgis/core/request";
import {
  CalciteInputText,
  CalciteLabel,
  CalciteList,
  CalciteListItem,
  CalciteOption,
  CalciteSelect,
  CalciteTab,
  CalciteTabNav,
  CalciteTabs,
  CalciteTabTitle
} from "@esri/calcite-components-react";
import React, { useState } from "react";
import {
  ESRI_ICONS_STYLE_NAME_OPTIONS,
  ESRI_INFRASTRUCTURE_STYLE_NAME_OPTIONS,
  ESRI_REALISTIC_SIGNS_AND_SIGNALS_STYLE_NAME_OPTIONS,
  ESRI_REALISTIC_STREET_SCENE_STYLE_NAME_OPTIONS,
  ESRI_REALISTIC_TRANSPORTATION_STYLE_NAME_OPTIONS,
  ESRI_REALISTIC_TREES_STYLE_NAME_OPTIONS,
  ESRI_RECREATION_STYLE_NAME_OPTIONS,
  ESRI_THEMATIC_SHAPES_STYLE_NAME_OPTIONS,
  ESRI_THEMATIC_TREES_STYLE_NAME_OPTIONS,
  WEB_STYLE_SYMBOLS_3D_STYLE_OPTIONS
} from "./lib/constants";
import { labelStyles } from "./lib/styles";
import type { ItemType, WebStyleStymbolItem } from "./lib/types";

interface Props {
  handleNameChange: (value: string) => void;
  handleStyleNameChange: (value: string) => void;
  handleCustomStyleChange: (styleUrl: string, name: string, itemType: ItemType) => void;
}

const WebStyleSymbolForm = ({
  handleNameChange,
  handleStyleNameChange,
  handleCustomStyleChange
}: Props) => {
  const [name, setName] = useState("Accessibility");
  const [names, setNames] = useState(ESRI_ICONS_STYLE_NAME_OPTIONS);
  const [pointWebStyleSymbolItems, setPointWebStyleSymbolItems] = useState<WebStyleStymbolItem[]>(
    []
  );
  const [styleName, setStyleName] = useState("EsriIconsStyle");
  const [styleUrl, setStyleUrl] = useState("");

  async function getStyleItemDataFromUrl(url: string) {
    const response = await esriRequest(url, {
      responseType: "json"
    });
    const items = response.data.items;

    const pointItems = items
      .filter((item: WebStyleStymbolItem) => item.itemType === "pointSymbol")
      .sort((a: WebStyleStymbolItem, b: WebStyleStymbolItem) => {
        return a.name.localeCompare(b.name);
      });

    if (pointItems.length > 0) {
      setPointWebStyleSymbolItems(pointItems);
      handleCustomStyleChange(url, pointItems[0].name, "pointSymbol");
    }
  }

  const handleTabChange = (event: CustomEvent) => {
    const tabNav = event.target as HTMLCalciteTabNavElement;
    if (tabNav.selectedTitle.tab === "standard") {
      setName("Accessibility");
      setStyleName("EsriIconsStyle");
      handleStyleNameChange(styleName);
    } else {
      setName("");
      setStyleUrl(
        "https://www.arcgis.com/sharing/rest/content/items/9b8e84d1c01349f28d57502af601e37f/data"
      );
      getStyleItemDataFromUrl(
        "https://www.arcgis.com/sharing/rest/content/items/9b8e84d1c01349f28d57502af601e37f/data"
      );
    }
  };

  const updateNames = (styleName: string) => {
    switch (styleName) {
      case "EsriIconsStyle":
        setNames(ESRI_ICONS_STYLE_NAME_OPTIONS);
        setName(ESRI_ICONS_STYLE_NAME_OPTIONS[0]);
        break;

      case "EsriInfrastructureStyle":
        setNames(ESRI_INFRASTRUCTURE_STYLE_NAME_OPTIONS);
        setName(ESRI_INFRASTRUCTURE_STYLE_NAME_OPTIONS[0]);
        break;

      case "EsriRealisticSignsandSignalsStyle":
        setNames(ESRI_REALISTIC_SIGNS_AND_SIGNALS_STYLE_NAME_OPTIONS);
        setName(ESRI_REALISTIC_SIGNS_AND_SIGNALS_STYLE_NAME_OPTIONS[0]);
        break;

      case "EsriRealisticStreetSceneStyle":
        setNames(ESRI_REALISTIC_STREET_SCENE_STYLE_NAME_OPTIONS);
        setName(ESRI_REALISTIC_STREET_SCENE_STYLE_NAME_OPTIONS[0]);
        break;

      case "EsriRealisticTransportationStyle":
        setNames(ESRI_REALISTIC_TRANSPORTATION_STYLE_NAME_OPTIONS);
        setName(ESRI_REALISTIC_TRANSPORTATION_STYLE_NAME_OPTIONS[0]);
        break;

      case "EsriRealisticTreesStyle":
        setNames(ESRI_REALISTIC_TREES_STYLE_NAME_OPTIONS);
        setName(ESRI_REALISTIC_TREES_STYLE_NAME_OPTIONS[0]);
        break;

      case "EsriRecreationStyle":
        setNames(ESRI_RECREATION_STYLE_NAME_OPTIONS);
        setName(ESRI_RECREATION_STYLE_NAME_OPTIONS[0]);
        break;

      case "EsriThematicShapesStyle":
        setNames(ESRI_THEMATIC_SHAPES_STYLE_NAME_OPTIONS);
        setName(ESRI_THEMATIC_SHAPES_STYLE_NAME_OPTIONS[0]);
        break;

      case "EsriThematicTreesStyle":
        setNames(ESRI_THEMATIC_TREES_STYLE_NAME_OPTIONS);
        setName(ESRI_THEMATIC_TREES_STYLE_NAME_OPTIONS[0]);
        break;

      default:
        setNames(ESRI_ICONS_STYLE_NAME_OPTIONS);
        setName(ESRI_ICONS_STYLE_NAME_OPTIONS[0]);
    }
  };

  return (
    <React.Fragment>
      <CalciteTabs>
        <CalciteTabNav slot="title-group" onCalciteTabChange={handleTabChange}>
          <CalciteTabTitle tab="standard">Standard</CalciteTabTitle>
          <CalciteTabTitle tab="custom">Custom</CalciteTabTitle>
        </CalciteTabNav>
        <CalciteTab tab="standard">
          <CalciteLabel layout="default" style={labelStyles}>
            name
            <CalciteSelect
              label={"name selection"}
              onCalciteSelectChange={(event) => {
                setName(event.target.value as string);
                handleNameChange(event.target.value as string);
              }}
              value={name}
            >
              {names.map((option, index) => (
                <CalciteOption key={index}>{option}</CalciteOption>
              ))}
            </CalciteSelect>
          </CalciteLabel>

          <CalciteLabel layout="default" style={labelStyles}>
            styleName
            <CalciteSelect
              label={"styleName selection"}
              onCalciteSelectChange={(event) => {
                setStyleName(event.target.value);
                handleStyleNameChange(event.target.value);
                updateNames(event.target.value);
              }}
              value={styleName}
            >
              {WEB_STYLE_SYMBOLS_3D_STYLE_OPTIONS.map((option, index) => (
                <CalciteOption key={index}>{option}</CalciteOption>
              ))}
            </CalciteSelect>
          </CalciteLabel>
        </CalciteTab>
        <CalciteTab tab="custom">
          <CalciteLabel layout="default" style={labelStyles}>
            styleUrl
            <CalciteInputText
              label={"url input"}
              onCalciteInputTextChange={(event) => {
                setStyleUrl(event.target.value);
                getStyleItemDataFromUrl(event.target.value);
              }}
              value={styleUrl}
            ></CalciteInputText>
          </CalciteLabel>
          <CalciteList filter-enabled filter-placeholder="Filter symbols" label="WebStyleSymbols">
            {pointWebStyleSymbolItems.length > 0 && (
              <CalciteListItem label="Point Symbols" open>
                <CalciteList>
                  {pointWebStyleSymbolItems.map((item, index) => (
                    <CalciteListItem
                      key={index}
                      label={item.name}
                      onClick={(event) => {
                        const newName =
                          (event.target as HTMLCalciteListItemElement).label === undefined
                            ? (event.target as HTMLImageElement).alt
                            : (event.target as HTMLCalciteListItemElement).label;
                        handleCustomStyleChange(styleUrl, newName, "pointSymbol");
                      }}
                      value={item.name}
                    >
                      <img alt={item.name} slot="content-start" src={item.thumbnail.href} />
                    </CalciteListItem>
                  ))}
                </CalciteList>
              </CalciteListItem>
            )}
          </CalciteList>
        </CalciteTab>
      </CalciteTabs>
    </React.Fragment>
  );
};

export default WebStyleSymbolForm;
