import {
  CalciteInputText,
  CalciteLabel,
  CalciteList,
  CalciteListItem,
  CalciteListItemGroup,
  CalciteOption,
  CalciteSelect,
  CalciteTab,
  CalciteTabNav,
  CalciteTabs,
  CalciteTabTitle
} from "@esri/calcite-components-react";
import React, { useEffect, useState } from "react";
import {
  ESRI_2D_POINT_SYMBOLS_STYLE_NAME_OPTIONS,
  WEB_STYLE_SYMBOLS_2D_STYLE_OPTIONS
} from "./lib/constants";
import { labelStyles } from "./lib/styles";
import type { GroupItem, WebStyleStymbolItem } from "./lib/types";
import esriRequest from "@arcgis/core/request";

interface Props {
  groupItems: GroupItem[];
  handleNameChange: (value: string) => void;
  handleStyleNameChange: (value: string) => void;
  handleCustomStyleChange: (styleUrl: string, name: string) => void;
}

const WebStyleSymbol2DForm = ({
  groupItems,
  handleNameChange,
  handleStyleNameChange,
  handleCustomStyleChange
}: Props) => {
  const [agolStyle, setAgolStyle] = useState("Animals");
  const [name, setName] = useState("");
  const [pointWebStyleSymbolItems, setPointWebStyleSymbolItems] = useState<WebStyleStymbolItem[]>(
    []
  );
  const [styleName, setStyleName] = useState("Esri2DPointSymbolsStyle");
  const [styleUrl, setStyleUrl] = useState(
    "https://www.arcgis.com/sharing/rest/content/items/1fbb242c54e4415d9b8e8a343ca7a9d0/data"
  );

  useEffect(() => {
    getStyleItemDataFromItem(groupItems[0]);
  }, [groupItems]);

  async function getStyleItemDataFromItem(groupItem: GroupItem) {
    const styleItem = groupItems.find((styleItem) => styleItem.title === groupItem.title);
    if (styleItem && styleItem.id) {
      const response = await esriRequest(
        `https://www.arcgis.com/sharing/rest/content/items/${styleItem.id}/data?f=pjson`,
        {
          responseType: "json"
        }
      );
      const items = response.data.items;
      const pointItems = items
        .filter((item: WebStyleStymbolItem) => item.itemType === "pointSymbol")
        .sort((a: WebStyleStymbolItem, b: WebStyleStymbolItem) => {
          return a.name.localeCompare(b.name);
        });

      if (pointItems.length > 0) {
        setPointWebStyleSymbolItems(pointItems);

        handleCustomStyleChange(
          `https://www.arcgis.com/sharing/rest/content/items/${groupItem.id}/data`,
          pointItems[0].name
        );
      } else {
        setPointWebStyleSymbolItems([]);
      }
    }
  }

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

      handleCustomStyleChange(url, pointItems[0].name);
    }
  }

  const handleTabChange = (event: CustomEvent) => {
    const tabNav = event.target as HTMLCalciteTabNavElement;
    if (tabNav.selectedTitle.tab === "standard") {
      setStyleName("Esri2DPointSymbolsStyle");
      setName("extent-hollow-gray");
      handleStyleNameChange(styleName);
    } else {
      setName("");
      setAgolStyle("Animals");
      setStyleUrl(
        "https://www.arcgis.com/sharing/rest/content/items/1fbb242c54e4415d9b8e8a343ca7a9d0/data"
      );
      getStyleItemDataFromUrl(
        "https://www.arcgis.com/sharing/rest/content/items/1fbb242c54e4415d9b8e8a343ca7a9d0/data"
      );
    }
  };

  function setStyleUrlFromName(title: string) {
    const item = groupItems.find((item) => item.title === title);
    if (item && item.id) {
      const url = `https://www.arcgis.com/sharing/rest/content/items/${item.id}/data`;
      setStyleUrl(url);
      getStyleItemDataFromItem(item);
    }
  }

  return (
    <React.Fragment>
      <CalciteTabs>
        <CalciteTabNav slot="title-group" onCalciteTabChange={handleTabChange}>
          <CalciteTabTitle tab="agol">ArcGIS Online</CalciteTabTitle>
          <CalciteTabTitle tab="standard">Standard</CalciteTabTitle>
          <CalciteTabTitle tab="custom">Custom</CalciteTabTitle>
        </CalciteTabNav>
        <CalciteTab tab="agol">
          <CalciteLabel layout="default" style={labelStyles}>
            Style
            <CalciteSelect
              label={"styleName selection"}
              onCalciteSelectChange={(event) => {
                setAgolStyle(event.target.value);
                setStyleUrlFromName(event.target.value);
              }}
              value={agolStyle}
            >
              {groupItems.map((option, index) => (
                <CalciteOption key={index}>{option.title}</CalciteOption>
              ))}
            </CalciteSelect>
          </CalciteLabel>
          <CalciteList label="Point WebStyleSymbols">
            <CalciteListItemGroup heading="Point Symbols">
              {pointWebStyleSymbolItems.map((item, index) => (
                <CalciteListItem
                  key={index}
                  label={item.name}
                  onClick={(event) => {
                    const newName = (event.target as HTMLCalciteListItemElement).label as string;
                    handleCustomStyleChange(styleUrl, newName);
                  }}
                >
                  <img
                    alt={item.name}
                    slot="content-start"
                    src={`${styleUrl.split("/data")[0]}/resources${item.thumbnail.href.split("/resources")[1]}`}
                  />
                </CalciteListItem>
              ))}
            </CalciteListItemGroup>
          </CalciteList>
        </CalciteTab>
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
              {ESRI_2D_POINT_SYMBOLS_STYLE_NAME_OPTIONS.map((option, index) => (
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
              }}
              value={styleName}
            >
              {WEB_STYLE_SYMBOLS_2D_STYLE_OPTIONS.map((option, index) => (
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
          <CalciteList label="Point WebStyleSymbols">
            <CalciteListItemGroup heading="Point Symbols">
              {pointWebStyleSymbolItems.map((item, index) => (
                <CalciteListItem
                  key={index}
                  label={item.name}
                  description={item.title}
                  onClick={(event) => {
                    const newName = (event.target as HTMLCalciteListItemElement).label as string;
                    handleCustomStyleChange(styleUrl, newName);
                  }}
                >
                  <img
                    alt={item.name}
                    slot="content-start"
                    src={`${styleUrl.split("/data")[0]}/resources${item.thumbnail.href.split("/resources")[1]}`}
                  />
                </CalciteListItem>
              ))}
            </CalciteListItemGroup>
          </CalciteList>
        </CalciteTab>
      </CalciteTabs>
    </React.Fragment>
  );
};

export default WebStyleSymbol2DForm;
