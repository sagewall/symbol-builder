import type Font from "@arcgis/core/symbols/Font.js";

export type FontData = {
  font: FontOptions;
  status: number;
  staticName: string;
  staticUrl: string;
  serviceUrl: string;
  name: string;
  dataUrl: string;
};

export type FontOptions = {
  family: string;
  style: InstanceType<typeof Font>["style"];
  weight: InstanceType<typeof Font>["weight"];
};

export type ItemType = "lineSymbol" | "pointSymbol" | "polygonSymbol";

export type GroupItem = {
  access: string;
  id: string;
  snippet: string;
  thumbnail: string;
  title: string;
  type: string;
};

export type WebStyleSymbolItem = {
  cimRef: string;
  dimensionality: string;
  formats: string[];
  itemType: ItemType;
  name: string;
  thumbnail: { href: string };
  title: string;
};
