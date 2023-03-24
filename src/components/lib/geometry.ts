import Point from "@arcgis/core/geometry/Point";
import Polygon from "@arcgis/core/geometry/Polygon";
import Polyline from "@arcgis/core/geometry/Polyline";
import Mesh from "@arcgis/core/geometry/Mesh";

export const point = new Point({
  latitude: 40.2,
  longitude: -105.1
});

export const polyline = new Polyline({
  paths: [
    [
      [-105.0, 40.0],
      [-105.1, 40.2],
      [-105.35, 40.1]
    ]
  ]
});

export const polygon = new Polygon({
  rings: [
    [
      [-105.0, 40.0],
      [-105.1, 40.2],
      [-105.35, 40.1]
    ]
  ]
});

export const mesh = Mesh.createBox(point, {
  size: {
    width: 300,
    height: 150,
    depth: 150
  }
});
