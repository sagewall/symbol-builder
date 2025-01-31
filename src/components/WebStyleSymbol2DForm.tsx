import esriRequest from "@arcgis/core/request";
import React, { useEffect, useState } from "react";
import {
  ESRI_2D_POINT_SYMBOLS_STYLE_NAME_OPTIONS,
  WEB_STYLE_SYMBOLS_2D_STYLE_OPTIONS
} from "./lib/constants";
import { labelStyles } from "./lib/styles";
import type { GroupItem, ItemType, WebStyleStymbolItem } from "./lib/types";

interface Props {
  groupItems: GroupItem[];
  handleNameChange: (value: string) => void;
  handleStyleNameChange: (value: string) => void;
  handleCustomStyleChange: (styleUrl: string, name: string, itemType: ItemType) => void;
}

const WebStyleSymbol2DForm = ({
  groupItems,
  handleNameChange,
  handleStyleNameChange,
  handleCustomStyleChange
}: Props) => {
  const [agolStyle, setAgolStyle] = useState("Animals");
  const [lineWebStyleSymbolItems, setLineWebStyleSymbolItems] = useState<WebStyleStymbolItem[]>([]);
  const [name, setName] = useState("");
  const [pointWebStyleSymbolItems, setPointWebStyleSymbolItems] = useState<WebStyleStymbolItem[]>(
    []
  );
  const [polygonWebStyleSymbolItems, setPolygonWebStyleSymbolItems] = useState<
    WebStyleStymbolItem[]
  >([]);
  const [styleName, setStyleName] = useState("Esri2DPointSymbolsStyle");
  const [styleUrl, setStyleUrl] = useState(
    "https://www.arcgis.com/sharing/rest/content/items/1fbb242c54e4415d9b8e8a343ca7a9d0/data"
  );

  const getStyleItemDataFromItem = async (groupItem: GroupItem) => {
    setPointWebStyleSymbolItems([]);
    setLineWebStyleSymbolItems([]);
    setPolygonWebStyleSymbolItems([]);

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
          pointItems[0].name,
          "pointSymbol"
        );
      } else {
        setPointWebStyleSymbolItems([]);
      }

      const lineItems = items
        .filter((item: WebStyleStymbolItem) => item.itemType === "lineSymbol")
        .sort((a: WebStyleStymbolItem, b: WebStyleStymbolItem) => {
          return a.name.localeCompare(b.name);
        });

      if (lineItems.length > 0) {
        setLineWebStyleSymbolItems(lineItems);

        if (pointItems.length === 0 && lineItems.length > 0) {
          handleCustomStyleChange(
            `https://www.arcgis.com/sharing/rest/content/items/${groupItem.id}/data`,
            lineItems[0].name,
            "lineSymbol"
          );
        }
      } else {
        setLineWebStyleSymbolItems([]);
      }

      const polygonItems = items
        .filter((item: WebStyleStymbolItem) => item.itemType === "polygonSymbol")
        .sort((a: WebStyleStymbolItem, b: WebStyleStymbolItem) => {
          return a.name.localeCompare(b.name);
        });

      if (polygonItems.length > 0) {
        setPolygonWebStyleSymbolItems(polygonItems);

        if (pointItems.length === 0 && lineItems.length === 0 && polygonItems.length > 0) {
          handleCustomStyleChange(
            `https://www.arcgis.com/sharing/rest/content/items/${groupItem.id}/data`,
            polygonItems[0].name,
            "polygonSymbol"
          );
        }
      } else {
        setPolygonWebStyleSymbolItems([]);
      }
    }
  };

  const getStyleItemDataFromUrl = async (url: string) => {
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

    const lineItems = items
      .filter((item: WebStyleStymbolItem) => item.itemType === "lineSymbol")
      .sort((a: WebStyleStymbolItem, b: WebStyleStymbolItem) => {
        return a.name.localeCompare(b.name);
      });

    if (lineItems.length > 0) {
      setLineWebStyleSymbolItems(lineItems);
    }

    const polygonItems = items
      .filter((item: WebStyleStymbolItem) => item.itemType === "polygonSymbol")
      .sort((a: WebStyleStymbolItem, b: WebStyleStymbolItem) => {
        return a.name.localeCompare(b.name);
      });

    if (polygonItems.length > 0) {
      setPolygonWebStyleSymbolItems(polygonItems);
    }
  };
  const handleAgolSyleChange = (id: string) => {
    const item = groupItems.find((item) => item.id === id);
    if (item && item.id) {
      const url = `https://www.arcgis.com/sharing/rest/content/items/${item.id}/data`;
      setStyleUrl(url);
      getStyleItemDataFromItem(item);
    }
  };

  const handleTabChange = (event: CustomEvent) => {
    const tabNav = event.target as HTMLCalciteTabNavElement;
    if (tabNav.selectedTitle.tab === "standard") {
      setName("extent-hollow-gray");
      setStyleName("Esri2DPointSymbolsStyle");
      handleStyleNameChange(styleName);
    } else {
      setAgolStyle("Animals");
      setName("");
      setLineWebStyleSymbolItems([]);
      setPolygonWebStyleSymbolItems([]);
      setStyleUrl(
        "https://www.arcgis.com/sharing/rest/content/items/1fbb242c54e4415d9b8e8a343ca7a9d0/data"
      );
      getStyleItemDataFromUrl(
        "https://www.arcgis.com/sharing/rest/content/items/1fbb242c54e4415d9b8e8a343ca7a9d0/data"
      );
    }
  };

  useEffect(() => {
    getStyleItemDataFromItem(groupItems[0]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [groupItems]);

  return (
    <React.Fragment>
      <calcite-tabs>
        <calcite-tab-nav slot="title-group" oncalciteTabChange={handleTabChange}>
          <calcite-tab-title tab="agol">ArcGIS Online</calcite-tab-title>
          <calcite-tab-title tab="standard">Standard</calcite-tab-title>
          <calcite-tab-title tab="custom">Custom</calcite-tab-title>
        </calcite-tab-nav>
        <calcite-tab tab="agol">
          <calcite-label layout="default" style={labelStyles}>
            Style
            <calcite-select
              label={"styleName selection"}
              oncalciteSelectChange={(event) => {
                setAgolStyle(event.target.value);
                handleAgolSyleChange(event.target.value);
              }}
              value={agolStyle}
            >
              {groupItems.map((option, index) => (
                <calcite-option key={index} value={option.id}>
                  {option.title}
                </calcite-option>
              ))}
            </calcite-select>
          </calcite-label>
          <calcite-list
            displayMode="nested"
            filter-enabled
            filter-placeholder="Filter symbols"
            label="WebStyleSymbols"
          >
            {pointWebStyleSymbolItems.length > 0 && (
              <calcite-list-item label="Point symbols" open>
                <calcite-list label="Point symbols">
                  {pointWebStyleSymbolItems.map((item, index) => (
                    <calcite-list-item
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
                      <img
                        alt={item.name}
                        slot="content-start"
                        src={`${styleUrl.split("/data")[0]}/resources${
                          item.thumbnail.href.split("/resources")[1]
                        }`}
                      />
                    </calcite-list-item>
                  ))}
                </calcite-list>
              </calcite-list-item>
            )}

            {lineWebStyleSymbolItems.length > 0 && (
              <calcite-list-item label="Line symbols" open>
                <calcite-list label="Line symbols">
                  {lineWebStyleSymbolItems.map((item, index) => (
                    <calcite-list-item
                      key={index}
                      label={item.name}
                      onClick={(event) => {
                        const newName =
                          (event.target as HTMLCalciteListItemElement).label === undefined
                            ? (event.target as HTMLImageElement).alt
                            : (event.target as HTMLCalciteListItemElement).label;
                        handleCustomStyleChange(styleUrl, newName, "lineSymbol");
                      }}
                      value={item.name}
                    >
                      <img
                        alt={item.name}
                        slot="content-start"
                        src={`${styleUrl.split("/data")[0]}/resources${
                          item.thumbnail.href.split("/resources")[1]
                        }`}
                      />
                    </calcite-list-item>
                  ))}
                </calcite-list>
              </calcite-list-item>
            )}

            {polygonWebStyleSymbolItems.length > 0 && (
              <calcite-list-item label="Polygon symbols" open>
                <calcite-list label="Polygon symbols">
                  {polygonWebStyleSymbolItems.map((item, index) => (
                    <calcite-list-item
                      key={index}
                      label={item.name}
                      onClick={(event) => {
                        const newName =
                          (event.target as HTMLCalciteListItemElement).label === undefined
                            ? (event.target as HTMLImageElement).alt
                            : (event.target as HTMLCalciteListItemElement).label;
                        handleCustomStyleChange(styleUrl, newName, "polygonSymbol");
                      }}
                      value={item.name}
                    >
                      <img
                        alt={item.name}
                        slot="content-start"
                        src={`${styleUrl.split("/data")[0]}/resources${
                          item.thumbnail.href.split("/resources")[1]
                        }`}
                      />
                    </calcite-list-item>
                  ))}
                </calcite-list>
              </calcite-list-item>
            )}
          </calcite-list>
        </calcite-tab>
        <calcite-tab tab="standard">
          <calcite-label layout="default" style={labelStyles}>
            name
            <calcite-select
              label={"name selection"}
              oncalciteSelectChange={(event) => {
                setName(event.target.value as string);
                handleNameChange(event.target.value as string);
              }}
              value={name}
            >
              {ESRI_2D_POINT_SYMBOLS_STYLE_NAME_OPTIONS.map((option, index) => (
                <calcite-option key={index}>{option}</calcite-option>
              ))}
            </calcite-select>
          </calcite-label>

          <calcite-label layout="default" style={labelStyles}>
            styleName
            <calcite-select
              label={"styleName selection"}
              oncalciteSelectChange={(event) => {
                setStyleName(event.target.value);
                handleStyleNameChange(event.target.value);
              }}
              value={styleName}
            >
              {WEB_STYLE_SYMBOLS_2D_STYLE_OPTIONS.map((option, index) => (
                <calcite-option key={index}>{option}</calcite-option>
              ))}
            </calcite-select>
          </calcite-label>
        </calcite-tab>

        <calcite-tab tab="custom">
          <calcite-label layout="default" style={labelStyles}>
            styleUrl
            <calcite-input-text
              label={"url input"}
              oncalciteInputTextChange={(event) => {
                setStyleUrl(event.target.value);
                getStyleItemDataFromUrl(event.target.value);
              }}
              value={styleUrl}
            ></calcite-input-text>
          </calcite-label>
          <calcite-list
            displayMode="nested"
            filter-enabled
            filter-placeholder="Filter symbols"
            label="Point WebStyleSymbols"
          >
            {pointWebStyleSymbolItems.length > 0 && (
              <calcite-list-item label="Point symbols" open>
                <calcite-list label="Point symbols">
                  {pointWebStyleSymbolItems.map((item, index) => (
                    <calcite-list-item
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
                      <img
                        alt={item.name}
                        slot="content-start"
                        src={`${styleUrl.split("/data")[0]}/resources${
                          item.thumbnail.href.split("/resources")[1]
                        }`}
                      />
                    </calcite-list-item>
                  ))}
                </calcite-list>
              </calcite-list-item>
            )}

            {lineWebStyleSymbolItems.length > 0 && (
              <calcite-list-item label="Line symbols" open>
                <calcite-list label="Line symbols">
                  {lineWebStyleSymbolItems.map((item, index) => (
                    <calcite-list-item
                      key={index}
                      label={item.name}
                      onClick={(event) => {
                        const newName =
                          (event.target as HTMLCalciteListItemElement).label === undefined
                            ? (event.target as HTMLImageElement).alt
                            : (event.target as HTMLCalciteListItemElement).label;
                        handleCustomStyleChange(styleUrl, newName, "lineSymbol");
                      }}
                      value={item.name}
                    >
                      <img
                        alt={item.name}
                        slot="content-start"
                        src={`${styleUrl.split("/data")[0]}/resources${
                          item.thumbnail.href.split("/resources")[1]
                        }`}
                      />
                    </calcite-list-item>
                  ))}
                </calcite-list>
              </calcite-list-item>
            )}

            {polygonWebStyleSymbolItems.length > 0 && (
              <calcite-list-item label="Polygon symbols" open>
                <calcite-list label="Polygon symbols">
                  {polygonWebStyleSymbolItems.map((item, index) => (
                    <calcite-list-item
                      key={index}
                      label={item.name}
                      onClick={(event) => {
                        const newName =
                          (event.target as HTMLCalciteListItemElement).label === undefined
                            ? (event.target as HTMLImageElement).alt
                            : (event.target as HTMLCalciteListItemElement).label;
                        handleCustomStyleChange(styleUrl, newName, "polygonSymbol");
                      }}
                      value={item.name}
                    >
                      <img
                        alt={item.name}
                        slot="content-start"
                        src={`${styleUrl.split("/data")[0]}/resources${
                          item.thumbnail.href.split("/resources")[1]
                        }`}
                      />
                    </calcite-list-item>
                  ))}
                </calcite-list>
              </calcite-list-item>
            )}
          </calcite-list>
        </calcite-tab>
      </calcite-tabs>
    </React.Fragment>
  );
};

export default WebStyleSymbol2DForm;
