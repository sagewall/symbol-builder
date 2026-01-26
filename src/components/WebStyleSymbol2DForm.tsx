import esriRequest from "@arcgis/core/request.js";
import "@esri/calcite-components/dist/components/calcite-input-text";
import "@esri/calcite-components/dist/components/calcite-label";
import "@esri/calcite-components/dist/components/calcite-list";
import "@esri/calcite-components/dist/components/calcite-list-item";
import "@esri/calcite-components/dist/components/calcite-option";
import "@esri/calcite-components/dist/components/calcite-select";
import "@esri/calcite-components/dist/components/calcite-tab";
import "@esri/calcite-components/dist/components/calcite-tab-nav";
import "@esri/calcite-components/dist/components/calcite-tab-title";
import "@esri/calcite-components/dist/components/calcite-tabs";
import { useEffect, useState, useCallback } from "react";
import {
  esri2DPointSymbolsStyleNameOptions,
  webStyleSymbols2DStyleOptions,
} from "./lib/constants";
import { labelStyles } from "./lib/styles";
import type { GroupItem, ItemType, WebStyleSymbolItem } from "./lib/types";

interface Props {
  groupItems: GroupItem[];
  handleNameChange: (value: string) => void;
  handleStyleNameChange: (value: string) => void;
  handleCustomStyleChange: (
    styleUrl: string,
    name: string,
    itemType: ItemType,
  ) => void;
}

function WebStyleSymbol2DForm({
  groupItems,
  handleNameChange,
  handleStyleNameChange,
  handleCustomStyleChange,
}: Props): React.ReactElement {
  const [agolStyle, setAgolStyle] = useState("Animals");
  const [lineWebStyleSymbolItems, setLineWebStyleSymbolItems] = useState<
    WebStyleSymbolItem[]
  >([]);
  const [name, setName] = useState("");
  const [pointWebStyleSymbolItems, setPointWebStyleSymbolItems] = useState<
    WebStyleSymbolItem[]
  >([]);
  const [polygonWebStyleSymbolItems, setPolygonWebStyleSymbolItems] = useState<
    WebStyleSymbolItem[]
  >([]);
  const [styleName, setStyleName] = useState("Esri2DPointSymbolsStyle");
  const [styleUrl, setStyleUrl] = useState(
    "https://www.arcgis.com/sharing/rest/content/items/1fbb242c54e4415d9b8e8a343ca7a9d0/data",
  );

  const getStyleItemDataFromItem = useCallback(
    async (groupItem: GroupItem) => {
      setPointWebStyleSymbolItems([]);
      setLineWebStyleSymbolItems([]);
      setPolygonWebStyleSymbolItems([]);

      const styleItem = groupItems.find(
        (styleItem) => styleItem.title === groupItem.title,
      );
      if (styleItem?.id) {
        try {
          const response = await esriRequest(
            `https://www.arcgis.com/sharing/rest/content/items/${styleItem.id}/data?f=pjson`,
            {
              responseType: "json",
            },
          );
          const items =
            (response.data as { items?: WebStyleSymbolItem[] }).items ?? [];
          const pointItems = items
            .filter(
              (item: WebStyleSymbolItem) => item.itemType === "pointSymbol",
            )
            .sort((a: WebStyleSymbolItem, b: WebStyleSymbolItem) =>
              a.name.localeCompare(b.name),
            );

          if (pointItems.length > 0) {
            setPointWebStyleSymbolItems(pointItems);
            handleCustomStyleChange(
              `https://www.arcgis.com/sharing/rest/content/items/${groupItem.id}/data`,
              pointItems[0].name,
              "pointSymbol",
            );
          } else {
            setPointWebStyleSymbolItems([]);
          }

          const lineItems = items
            .filter(
              (item: WebStyleSymbolItem) => item.itemType === "lineSymbol",
            )
            .sort((a: WebStyleSymbolItem, b: WebStyleSymbolItem) =>
              a.name.localeCompare(b.name),
            );

          if (lineItems.length > 0) {
            setLineWebStyleSymbolItems(lineItems);

            if (pointItems.length === 0 && lineItems.length > 0) {
              handleCustomStyleChange(
                `https://www.arcgis.com/sharing/rest/content/items/${groupItem.id}/data`,
                lineItems[0].name,
                "lineSymbol",
              );
            }
          } else {
            setLineWebStyleSymbolItems([]);
          }

          const polygonItems = items
            .filter(
              (item: WebStyleSymbolItem) => item.itemType === "polygonSymbol",
            )
            .sort((a: WebStyleSymbolItem, b: WebStyleSymbolItem) =>
              a.name.localeCompare(b.name),
            );

          if (polygonItems.length > 0) {
            setPolygonWebStyleSymbolItems(polygonItems);

            if (
              pointItems.length === 0 &&
              lineItems.length === 0 &&
              polygonItems.length > 0
            ) {
              handleCustomStyleChange(
                `https://www.arcgis.com/sharing/rest/content/items/${groupItem.id}/data`,
                polygonItems[0].name,
                "polygonSymbol",
              );
            }
          } else {
            setPolygonWebStyleSymbolItems([]);
          }
        } catch (error) {
          setPointWebStyleSymbolItems([]);
          setLineWebStyleSymbolItems([]);
          setPolygonWebStyleSymbolItems([]);
          // Optionally, handle/log the error here
        }
      }
    },
    [groupItems, handleCustomStyleChange],
  );

  const getStyleItemDataFromUrl = async (url: string): Promise<void> => {
    const response = await esriRequest(url, {
      responseType: "json",
    });
    const items = (response.data as { items: WebStyleSymbolItem[] }).items;
    const pointItems = items
      .filter((item: WebStyleSymbolItem) => item.itemType === "pointSymbol")
      .sort((a: WebStyleSymbolItem, b: WebStyleSymbolItem) =>
        a.name.localeCompare(b.name),
      );

    if (pointItems.length > 0) {
      setPointWebStyleSymbolItems(pointItems);
      handleCustomStyleChange(url, pointItems[0].name, "pointSymbol");
    }

    const lineItems = items
      .filter((item: WebStyleSymbolItem) => item.itemType === "lineSymbol")
      .sort((a: WebStyleSymbolItem, b: WebStyleSymbolItem) =>
        a.name.localeCompare(b.name),
      );

    if (lineItems.length > 0) {
      setLineWebStyleSymbolItems(lineItems);
    }

    const polygonItems = items
      .filter((item: WebStyleSymbolItem) => item.itemType === "polygonSymbol")
      .sort((a: WebStyleSymbolItem, b: WebStyleSymbolItem) =>
        a.name.localeCompare(b.name),
      );

    if (polygonItems.length > 0) {
      setPolygonWebStyleSymbolItems(polygonItems);
    }
  };
  const handleAgolSyleChange = async (id: string): Promise<void> => {
    const item = groupItems.find((item) => item.id === id);
    if (item?.id) {
      const url = `https://www.arcgis.com/sharing/rest/content/items/${item.id}/data`;
      setStyleUrl(url);
      await getStyleItemDataFromItem(item);
    }
  };

  const handleTabChange = async (event: CustomEvent): Promise<void> => {
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
        "https://www.arcgis.com/sharing/rest/content/items/1fbb242c54e4415d9b8e8a343ca7a9d0/data",
      );
      await getStyleItemDataFromUrl(
        "https://www.arcgis.com/sharing/rest/content/items/1fbb242c54e4415d9b8e8a343ca7a9d0/data",
      );
    }
  };

  useEffect(() => {
    if (groupItems.length > 0) {
      void (async (): Promise<void> => {
        await getStyleItemDataFromItem(groupItems[0]);
      })();
    }
  }, []);

  return (
    <>
      <calcite-tabs>
        <calcite-tab-nav
          slot="title-group"
          oncalciteTabChange={handleTabChange}
        >
          <calcite-tab-title tab="agol">ArcGIS Online</calcite-tab-title>
          <calcite-tab-title tab="standard">Standard</calcite-tab-title>
          <calcite-tab-title tab="custom">Custom</calcite-tab-title>
        </calcite-tab-nav>
        <calcite-tab tab="agol">
          <calcite-label layout="default" style={labelStyles}>
            Style
            <calcite-select
              label={"styleName selection"}
              oncalciteSelectChange={async (event) => {
                setAgolStyle(event.target.value);
                await handleAgolSyleChange(event.target.value);
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
              <calcite-list-item label="Point symbols" expanded>
                <calcite-list label="Point symbols">
                  {pointWebStyleSymbolItems.map((item, index) => (
                    <calcite-list-item
                      key={index}
                      label={item.name}
                      onClick={(event) => {
                        const newName =
                          (event.target as HTMLCalciteListItemElement).label ===
                          undefined
                            ? (event.target as HTMLImageElement).alt
                            : (event.target as HTMLCalciteListItemElement)
                                .label;
                        handleCustomStyleChange(
                          styleUrl,
                          newName,
                          "pointSymbol",
                        );
                      }}
                      value={item.name}
                    >
                      <img
                        alt={item.name}
                        slot="content-start"
                        src={`${styleUrl.split("/data")[0]}/resources${item.thumbnail.href.split("/resources")[1]}`}
                      />
                    </calcite-list-item>
                  ))}
                </calcite-list>
              </calcite-list-item>
            )}

            {lineWebStyleSymbolItems.length > 0 && (
              <calcite-list-item label="Line symbols" expanded>
                <calcite-list label="Line symbols">
                  {lineWebStyleSymbolItems.map((item, index) => (
                    <calcite-list-item
                      key={index}
                      label={item.name}
                      onClick={(event) => {
                        const newName =
                          (event.target as HTMLCalciteListItemElement).label ===
                          undefined
                            ? (event.target as HTMLImageElement).alt
                            : (event.target as HTMLCalciteListItemElement)
                                .label;
                        handleCustomStyleChange(
                          styleUrl,
                          newName,
                          "lineSymbol",
                        );
                      }}
                      value={item.name}
                    >
                      <img
                        alt={item.name}
                        slot="content-start"
                        src={`${styleUrl.split("/data")[0]}/resources${item.thumbnail.href.split("/resources")[1]}`}
                      />
                    </calcite-list-item>
                  ))}
                </calcite-list>
              </calcite-list-item>
            )}

            {polygonWebStyleSymbolItems.length > 0 && (
              <calcite-list-item label="Polygon symbols" expanded>
                <calcite-list label="Polygon symbols">
                  {polygonWebStyleSymbolItems.map((item, index) => (
                    <calcite-list-item
                      key={index}
                      label={item.name}
                      onClick={(event) => {
                        const newName =
                          (event.target as HTMLCalciteListItemElement).label ===
                          undefined
                            ? (event.target as HTMLImageElement).alt
                            : (event.target as HTMLCalciteListItemElement)
                                .label;
                        handleCustomStyleChange(
                          styleUrl,
                          newName,
                          "polygonSymbol",
                        );
                      }}
                      value={item.name}
                    >
                      <img
                        alt={item.name}
                        slot="content-start"
                        src={`${styleUrl.split("/data")[0]}/resources${item.thumbnail.href.split("/resources")[1]}`}
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
                setName(event.target.value);
                handleNameChange(event.target.value);
              }}
              value={name}
            >
              {esri2DPointSymbolsStyleNameOptions.map((option, index) => (
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
              {webStyleSymbols2DStyleOptions.map((option, index) => (
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
                void getStyleItemDataFromUrl(event.target.value);
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
              <calcite-list-item label="Point symbols" expanded>
                <calcite-list label="Point symbols">
                  {pointWebStyleSymbolItems.map((item, index) => (
                    <calcite-list-item
                      key={index}
                      label={item.name}
                      onClick={(event) => {
                        const newName =
                          (event.target as HTMLCalciteListItemElement).label ===
                          undefined
                            ? (event.target as HTMLImageElement).alt
                            : (event.target as HTMLCalciteListItemElement)
                                .label;
                        handleCustomStyleChange(
                          styleUrl,
                          newName,
                          "pointSymbol",
                        );
                      }}
                      value={item.name}
                    >
                      <img
                        alt={item.name}
                        slot="content-start"
                        src={`${styleUrl.split("/data")[0]}/resources${item.thumbnail.href.split("/resources")[1]}`}
                      />
                    </calcite-list-item>
                  ))}
                </calcite-list>
              </calcite-list-item>
            )}

            {lineWebStyleSymbolItems.length > 0 && (
              <calcite-list-item label="Line symbols" expanded>
                <calcite-list label="Line symbols">
                  {lineWebStyleSymbolItems.map((item, index) => (
                    <calcite-list-item
                      key={index}
                      label={item.name}
                      onClick={(event) => {
                        const newName =
                          (event.target as HTMLCalciteListItemElement).label ===
                          undefined
                            ? (event.target as HTMLImageElement).alt
                            : (event.target as HTMLCalciteListItemElement)
                                .label;
                        handleCustomStyleChange(
                          styleUrl,
                          newName,
                          "lineSymbol",
                        );
                      }}
                      value={item.name}
                    >
                      <img
                        alt={item.name}
                        slot="content-start"
                        src={`${styleUrl.split("/data")[0]}/resources${item.thumbnail.href.split("/resources")[1]}`}
                      />
                    </calcite-list-item>
                  ))}
                </calcite-list>
              </calcite-list-item>
            )}

            {polygonWebStyleSymbolItems.length > 0 && (
              <calcite-list-item label="Polygon symbols" expanded>
                <calcite-list label="Polygon symbols">
                  {polygonWebStyleSymbolItems.map((item, index) => (
                    <calcite-list-item
                      key={index}
                      label={item.name}
                      onClick={(event) => {
                        const newName =
                          (event.target as HTMLCalciteListItemElement).label ===
                          undefined
                            ? (event.target as HTMLImageElement).alt
                            : (event.target as HTMLCalciteListItemElement)
                                .label;
                        handleCustomStyleChange(
                          styleUrl,
                          newName,
                          "polygonSymbol",
                        );
                      }}
                      value={item.name}
                    >
                      <img
                        alt={item.name}
                        slot="content-start"
                        src={`${styleUrl.split("/data")[0]}/resources${item.thumbnail.href.split("/resources")[1]}`}
                      />
                    </calcite-list-item>
                  ))}
                </calcite-list>
              </calcite-list-item>
            )}
          </calcite-list>
        </calcite-tab>
      </calcite-tabs>
    </>
  );
}

export default WebStyleSymbol2DForm;
