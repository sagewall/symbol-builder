import Point from "@arcgis/core/geometry/Point";
import Polygon from "@arcgis/core/geometry/Polygon";
import Polyline from "@arcgis/core/geometry/Polyline";
import Mesh from "@arcgis/core/geometry/Mesh";

const coordinates = [
  [
    [-117.196085314723, 34.0558472074798],
    [-117.196084527799, 34.0560069235092],
    [-117.196102741141, 34.0560072174863],
    [-117.196102669276, 34.0560805383114],
    [-117.196069526832, 34.0560814812699],
    [-117.196070562589, 34.0561738182182],
    [-117.196085206027, 34.0561736358784],
    [-117.196086570568, 34.0561772156933],
    [-117.196079843983, 34.056177281931],
    [-117.196079951781, 34.0562404146579],
    [-117.196086823893, 34.0562404146579],
    [-117.196086837367, 34.0562440212627],
    [-117.19607084466, 34.0562438746467],
    [-117.196070592234, 34.0563438458609],
    [-117.195829208629, 34.0563439396355],
    [-117.1958289041, 34.0561318353886],
    [-117.195771776638, 34.0561315659721],
    [-117.195771513431, 34.056161504696],
    [-117.195622899744, 34.0561626024564],
    [-117.195622754217, 34.0561660698908],
    [-117.195626538819, 34.0561660393768],
    [-117.195626661888, 34.0561938458292],
    [-117.195622852133, 34.0561948356738],
    [-117.195622624859, 34.0562415689798],
    [-117.195618473744, 34.0562416158671],
    [-117.195618473744, 34.0562226778405],
    [-117.195550124528, 34.0562228192469],
    [-117.195550181122, 34.0562283311165],
    [-117.195308626837, 34.0562283311165],
    [-117.195308683431, 34.0562216879962],
    [-117.195306010943, 34.0562216411088],
    [-117.195305994773, 34.0560138993242],
    [-117.195292711385, 34.0560137787564],
    [-117.195292675452, 34.0560105219373],
    [-117.195299298731, 34.0560104616533],
    [-117.195299301426, 34.0559473637349],
    [-117.19529276169, 34.0559472699598],
    [-117.195292591011, 34.0559438776853],
    [-117.195305896857, 34.0559437362785],
    [-117.19530471108, 34.0558649503296],
    [-117.195552946136, 34.0558649287465],
    [-117.195552877864, 34.0559894322441],
    [-117.195548872276, 34.0559894128938],
    [-117.195548895632, 34.0560094219421],
    [-117.195607724504, 34.0560093162592],
    [-117.195607819725, 34.0559794243691],
    [-117.195755259314, 34.0559794065072],
    [-117.195756481023, 34.0558627533125],
    [-117.195759664653, 34.0558627056807],
    [-117.195759437379, 34.0558960129602],
    [-117.195793611987, 34.0558947886744],
    [-117.195827559322, 34.0558948355619],
    [-117.195829094543, 34.0558889463374],
    [-117.19582848818, 34.0558472089682],
    [-117.195932421462, 34.0558472119452],
    [-117.195932421462, 34.0558494245919],
    [-117.19597935574, 34.0558494260804],
    [-117.19597935574, 34.055847205247],
    [-117.196085314723, 34.0558472074798]
  ]
];

export const point = new Point({
  latitude: 34.0564505,
  longitude: -117.1957098
});

export const polyline = new Polyline({
  paths: coordinates
});

export const polygon = new Polygon({
  rings: coordinates
});

export const mesh = Mesh.createBox(point, {
  size: {
    width: 10,
    height: 5,
    depth: 5
  }
});
