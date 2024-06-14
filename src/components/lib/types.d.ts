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

export type GroupItem = {
  access: string;
  id: string;
  snippet: string;
  thumbnail: string;
  title: string;
  type: string;
};

export type WebStyleStymbolItem = {
  cimRef: string;
  dimensionality: string;
  formats: string[];
  itemType: "pointSymbol" | "lineSymbol" | "polygonSymbol";
  name: string;
  thumbnail: { href: string };
  title: string;
};
