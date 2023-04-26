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
