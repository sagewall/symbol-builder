import type FillSymbol3DLayer from "@arcgis/core/symbols/FillSymbol3DLayer.js";
import type Font from "@arcgis/core/symbols/Font.js";
import type IconSymbol3DLayer from "@arcgis/core/symbols/IconSymbol3DLayer.js";
import type LineStyleMarker3D from "@arcgis/core/symbols/LineStyleMarker3D.js";
import type LineSymbol3DLayer from "@arcgis/core/symbols/LineSymbol3DLayer.js";
import type LineSymbolMarker from "@arcgis/core/symbols/LineSymbolMarker.js";
import type ObjectSymbol3DLayer from "@arcgis/core/symbols/ObjectSymbol3DLayer.js";
import type PathSymbol3DLayer from "@arcgis/core/symbols/PathSymbol3DLayer.js";
import type SimpleFillSymbol from "@arcgis/core/symbols/SimpleFillSymbol.js";
import type SimpleLineSymbol from "@arcgis/core/symbols/SimpleLineSymbol.js";
import type SimpleMarkerSymbol from "@arcgis/core/symbols/SimpleMarkerSymbol.js";
import type TextSymbol from "@arcgis/core/symbols/TextSymbol.js";
import type TextSymbol3DLayer from "@arcgis/core/symbols/TextSymbol3DLayer.js";
import type WaterSymbol3DLayer from "@arcgis/core/symbols/WaterSymbol3DLayer.js";
import type LineStylePattern3D from "@arcgis/core/symbols/patterns/LineStylePattern3D.js";
import type StylePattern3D from "@arcgis/core/symbols/patterns/StylePattern3D.js";
import type IconSymbol3DLayerResource from "@arcgis/core/symbols/support/IconSymbol3DLayerResource.js";
import type ObjectSymbol3DLayerResource from "@arcgis/core/symbols/support/ObjectSymbol3DLayerResource.js";
import type Symbol3DOutline from "@arcgis/core/symbols/support/Symbol3DOutline.js";
import type SolidEdges3D from "@arcgis/core/symbols/edges/SolidEdges3D.js";
import type SketchEdges3D from "@arcgis/core/symbols/edges/SketchEdges3D.js";
import type { Symbol3DEmissive } from "@arcgis/core/symbols/support/Symbol3DEmissive.js";
import fontData from "./esri-labeling-page-data.json";

type OptionSupport<Value extends string, Unsupported extends Value = never> = {
  readonly [Option in Value]: Option extends Unsupported ? null : Option;
};

function supportedOptions<Value extends string>(
  support: Readonly<Record<string, Value | null>>,
): readonly Value[] {
  return Object.freeze(
    Object.values(support).filter((value): value is Value => value !== null),
  );
}

export const capOptions = supportedOptions({
  round: "round",
  butt: "butt",
  square: "square",
} as const satisfies OptionSupport<
  | SimpleLineSymbol["cap"]
  | LineSymbol3DLayer["cap"]
  | NonNullable<Symbol3DOutline["patternCap"]>
>);

export const cap3DOptions = supportedOptions({
  butt: "butt",
  square: "square",
  round: "round",
  none: "none",
} as const satisfies OptionSupport<PathSymbol3DLayer["cap"]>);

export const colorMixModeOptions = supportedOptions({
  multiply: "multiply",
  replace: "replace",
  tint: "tint",
} as const satisfies OptionSupport<
  NonNullable<NonNullable<FillSymbol3DLayer["material"]>["colorMixMode"]>
>);

export const emissiveSourceOptions = supportedOptions({
  color: "color",
  emissive: "emissive",
} as const satisfies OptionSupport<Symbol3DEmissive["source"]>);

export const edgeStyleOptions = supportedOptions({
  solid: "solid",
  sketch: "sketch",
} as const satisfies OptionSupport<
  SolidEdges3D["type"] | SketchEdges3D["type"]
>);

export const linePatternTypeOptions = supportedOptions({
  style: "style",
  template: "template",
} as const satisfies OptionSupport<
  NonNullable<LineSymbol3DLayer["pattern"]>["type"]
>);

export const esri2DPointSymbolsStyleNameOptions = [
  "extent-hollow-gray",
  "extent-hollow-square",
  "extent-hollow-square-yellow",
  "extent-square",
  "extent-square-gray",
  "extent-square-yellow",
  "extent-star",
  "extent-star-gray",
  "extent-star-yellow",
  "accessibility",
  "aerial-tram",
  "airport",
  "amusement-park",
  "aquarium",
  "atm",
  "bar",
  "beach",
  "border-crossing",
  "box-pin",
  "bus-station",
  "campground",
  "car-rental",
  "casino",
  "cemetery",
  "city-hall",
  "coffee-shop",
  "court-house",
  "embassy",
  "esri-pin-1",
  "esri-pin-2",
  "ferry",
  "fire-station",
  "flag",
  "gas-station",
  "golf-course",
  "grocery-store",
  "hospital",
  "hotel",
  "house",
  "industrial-complex",
  "information",
  "landmark",
  "library",
  "live-music-venue",
  "military-base",
  "mountain",
  "museum",
  "native-reservation",
  "park",
  "parking",
  "pharmacy",
  "place-of-worship",
  "playground",
  "police-station",
  "post-office",
  "push-pin-1",
  "push-pin-2",
  "radio-tower",
  "restaurant",
  "restroom",
  "school",
  "shopping-center",
  "sports-complex",
  "star",
  "subway-station",
  "tear-pin-1",
  "tear-pin-2",
  "theatre",
  "trail",
  "train-station",
  "university",
  "vineyard",
  "zoo",
  "circle-1",
  "circle-2",
  "circle-3",
  "circle-4",
  "circle-5",
  "circle-6",
  "cross-1",
  "cross-2",
  "cross-3",
  "cross-4",
  "diamond-1",
  "diamond-2",
  "diamond-3",
  "hexagon-1",
  "hexagon-2",
  "hexagon-3",
  "pentagon-1",
  "pentagon-2",
  "pentagon-3",
  "square-1",
  "square-2",
  "square-3",
  "square-4",
  "square-5",
  "square-6",
  "star-1",
  "star-2",
  "star-3",
  "triangle-1",
  "triangle-2",
  "triangle-3",
  "triangle-4",
  "triangle-5",
  "triangle-6",
  "shield-1",
  "shield-1-wide",
  "shield-2",
  "shield-3",
  "shield-4",
  "shield-5",
];

export const esriIconsStyleNameOptions = [
  "Accessibility",
  "Aerial Tram",
  "Airport",
  "Amusement Park",
  "Aquarium",
  "Bank",
  "Bar",
  "Beach",
  "Border Crossing",
  "Bus",
  "Campground",
  "Car Rental",
  "Casino",
  "Cemetery",
  "Centered Circle",
  "Centered Diamond",
  "Centered Diamond Wide",
  "Centered Hexagon",
  "Centered Octagon",
  "Centered Rounded Square",
  "Centered Square",
  "Centered Star",
  "Centered Triangle",
  "City Hall",
  "Coffee",
  "Court House",
  "Embassy",
  "Ferry",
  "Fire",
  "Flag",
  "Fuel",
  "Golf Course",
  "Grocery Store",
  "Hiking",
  "Hospital",
  "Hotel",
  "House",
  "Industrial Complex",
  "Information",
  "Landmark",
  "Library",
  "Live Music Venue",
  "Military Base",
  "Mountain",
  "Museum",
  "Native Reservation",
  "Park",
  "Parking",
  "Pharmacy",
  "Place of Worship",
  "Playground",
  "Police",
  "Post Office",
  "Pushpin 1",
  "Pushpin 2",
  "Pushpin 3",
  "Pushpin 4",
  "Pushpin 5",
  "Restaurant",
  "Restroom",
  "School",
  "Shopping",
  "Sports Complex",
  "Standing Circle",
  "Standing Diamond",
  "Standing Diamond Wide",
  "Standing Hexagon",
  "Standing Octagon",
  "Standing Rounded Square",
  "Standing Square",
  "Standing Star",
  "Standing Triangle",
  "Telecom",
  "Theatre",
  "Train",
  "University",
  "Vineyard",
  "Zoo",
];

export const esriInfrastructureStyleNameOptions = [
  "Cell_Phone_Antenna",
  "Electricity_Box",
  "Electricity_Meter",
  "Powerline_Pole",
  "Radio_Antenna",
  "Wind_Turbine",
];

export const esriRealisticSignsAndSignalsStyleNameOptions = [
  "Campfire",
  "Camping",
  "Crossroads",
  "Dead_End",
  "Do_Not_Enter",
  "Gas",
  "Left_T-junction",
  "Medical",
  "Motel",
  "No_Outlet",
  "No_Thru_Traffic",
  "Opposing_Traffic",
  "Pedestrian_Crossing",
  "Picnic_Area",
  "Railway_Crossing",
  "Restaurant",
  "Right_T-junction",
  "School_Crossing",
  "Speed_Limit_-_15_mph",
  "Speed_Limit_-_20_mph",
  "Speed_Limit_-_25_mph",
  "Speed_Limit_-_30_mph",
  "Speed_Limit_-_35_mph",
  "Speed_Limit_-_40_mph",
  "Speed_Limit_-_45_mph",
  "Speed_Limit_-_50_mph",
  "Speed_Limit_-_55_mph",
  "Speed_Limit_-_60_mph",
  "Speed_Limit_-_65_mph",
  "Speed_Limit_-_70_mph",
  "Stop",
  "Stop_Ahead",
  "T-Junction",
  "Telephone",
  "Traffic_Light",
  "Traffic_Light_1",
  "Traffic_Light_2",
  "Traffic_Light_3",
  "Traffic_Light_4",
  "Turn_Left_Arrow",
  "Turn_Right_Arrow",
  "Yield",
];

export const esriRealisticStreetSceneStyleNameOptions = [
  "ATM",
  "Bike_Rack",
  "Bus_Stop_1",
  "Bus_Stop_2",
  "Dumpster",
  "Fire_Hydrant",
  "Fountain_1",
  "Fountain_2",
  "Fountain_3",
  "Fountain_4",
  "Jersey_Barrier",
  "Light_On_Post_-_Light_off",
  "Light_On_Post_-_Light_on",
  "Mailbox",
  "Newspaper_Vending_Machine",
  "Overhanging_Sidewalk_-_Light_off",
  "Overhanging_Sidewalk_-_Light_on",
  "Overhanging_Street_-_Light_off",
  "Overhanging_Street_-_Light_on",
  "Overhanging_Street_and_Sidewalk_-_Light_off",
  "Overhanging_Street_and_Sidewalk_-_Light_on",
  "Park_Bench_1",
  "Park_Bench_2",
  "Park_Bench_3",
  "Park_Bench_4",
  "Payphone",
  "Picnic_Table",
  "Planter_Circular",
  "Planter_Square",
  "Planter_Tapered",
  "Rock_1",
  "Rock_2",
  "Rock_3",
  "Rock_4",
  "Sewer_Grate",
  "Storm_Drain",
  "Traffic_Barrier_1",
  "Traffic_Barrier_2",
  "Traffic_Cone",
  "Traffic_Pylon",
  "Trash_Bin_1",
  "Trash_Bin_2",
  "Trash_Bin_3",
  "Trash_Can_1",
  "Trash_Can_2",
  "US_Mailbox",
];

export const esriRealisticTransportationStyleNameOptions = [
  "Airplane_Large_Passenger",
  "Airplane_Large_Passenger_With_Wheels",
  "Airplane_Private",
  "Airplane_Private_With_Wheels",
  "Airplane_Propeller",
  "Airplane_Propeller_With_Wheels",
  "Airplane_Small_Passenger",
  "Airplane_Small_Passenger_With_Wheels",
  "Ambulance",
  "Audi_A6",
  "BMW_3-Series",
  "Backhoe",
  "Bobcat",
  "Bus",
  "Cargo_Box",
  "Cargo_Ship_Empty",
  "Cargo_Ship_Full",
  "City_Bike",
  "Crane",
  "Delivery_Truck",
  "Dumptruck",
  "Eurocopter_AS-365",
  "Eurocopter_AS-365_-_Flying",
  "Eurocopter_H125",
  "Eurocopter_H125_-_Flying",
  "Firetruck",
  "Ford_Edge",
  "Ford_Expedition",
  "Ford_F-150",
  "Ford_Fiesta",
  "Ford_Focus_Hatchback",
  "Ford_Fusion",
  "Ford_Mustang",
  "Ford_Taurus",
  "Ford_Transit_Commercial_Van",
  "Ford_Transit_Connect",
  "High_Speed_Train",
  "Mercedes_S-Class",
  "Motorboat",
  "Motorcycle",
  "Mountain_Bike",
  "Pickup_Truck_Ford_F250",
  "Pickup_Truck_Toyota_Hilux",
  "Police",
  "Porsche_Boxter",
  "Porsche_Carrera",
  "Road_Bike",
  "Sailboat",
  "Sailboat_-_Sails_Up",
  "Semi_Trailer_Truck",
  "Taxi",
  "Tesla_P7",
  "Tower_Crane",
  "Toyota_Prius",
  "Tractor",
  "Tractor_And_Trailer",
  "Trailer",
  "Train_Europe",
  "Train_Europe_With_Carriages",
  "Train_US",
  "Tram",
  "Tricycle",
  "Truck_With_Trailer",
  "Van_Taxi",
  "Volkswagen_Jetta_Wagon",
];

export const esriRealisticTreesStyleNameOptions = [
  "Frangula",
  "Echinodorus",
  "Castanea",
  "Platanus",
  "Prunus",
  "Casuarina",
  "Taxodium",
  "Abies",
  "Phyllostachys",
  "Musa",
  "Tilia",
  "Laurus",
  "Robinia",
  "Eucalyptus",
  "Buxus",
  "Phlebodium",
  "Umbellularia",
  "Calocedrus",
  "Washingtonia",
  "Sequoia",
  "Juglans",
  "Cocos",
  "Crataegus",
  "Sorbus",
  "Aesculus",
  "Phoenix",
  "Chilopsis",
  "Pseudotsuga",
  "Fagus",
  "Larix",
  "Ficus",
  "Ulmus",
  "Fremontodendron",
  "Cornus",
  "GenericDead",
  "Stump",
  "Unknown",
  "Sequoiadendron",
  "Agave",
  "Aralia",
  "Philodendron",
  "Cupressus",
  "Convallaria",
  "Pinus",
  "Rhamnus",
  "Sabal",
  "Cercocarpus",
  "Quercus Rubra",
  "Acer",
  "Picea",
  "Citrus",
  "Bulbophyllum",
  "Other",
  "Ligustrum",
  "Cordyline",
  "Parkinsonia",
  "Betula",
  "Chamaedorea",
  "Opuntia",
  "Alnus",
  "Carya",
  "Rhododendron",
  "Rosa",
  "Aiphanes",
  "Carnegiea",
  "Sassafras",
  "Pinus Sylvestris",
  "Yucca",
  "Amelanchier",
  "Sansevieria",
  "Magnolia",
  "Spartium",
  "Arbutus",
  "Acer Saccharum",
  "Helianthus",
  "Liquidambar",
  "Acacia",
  "Juniperus",
  "Fraxinus",
  "Quercus",
  "Populus",
  "Salix",
  "Hamamelis",
];

export const esriRecreationStyleNameOptions = [
  "American_Football_Goal",
  "Basketball_Hoop",
  "Jungle_Gym",
  "Slide",
  "Soccer_Goal",
  "Swing",
  "Teeter_Totter",
];

export const esriThematicShapesStyleNameOptions = [
  "Centered Cube",
  "Centered Diamond",
  "Centered Sphere",
  "Standing Cone",
  "Standing Cube",
  "Standing Cylinder",
  "Standing Diamond",
  "Standing Inverted Cone",
  "Standing Sphere",
  "Standing Tetrahedron",
];

export const esriThematicTreesStyleNameOptions = [
  "Frangula",
  "Echinodorus",
  "Castanea",
  "Platanus",
  "Prunus",
  "Casuarina",
  "Taxodium",
  "Abies",
  "Phyllostachys",
  "Musa",
  "Tilia",
  "Laurus",
  "Robinia",
  "Eucalyptus",
  "Buxus",
  "Phlebodium",
  "Umbellularia",
  "Calocedrus",
  "Washingtonia",
  "Sequoia",
  "Juglans",
  "Cocos",
  "Crataegus",
  "Sorbus",
  "Aesculus",
  "Phoenix",
  "Chilopsis",
  "Pseudotsuga",
  "Fagus",
  "Larix",
  "Ficus",
  "Ulmus",
  "Fremontodendron",
  "Cornus",
  "GenericDead",
  "Stump",
  "Unknown",
  "Sequoiadendron",
  "Agave",
  "Aralia",
  "Philodendron",
  "Cupressus",
  "Convallaria",
  "Pinus",
  "Rhamnus",
  "Sabal",
  "Cercocarpus",
  "Quercus Rubra",
  "Acer",
  "Picea",
  "Citrus",
  "Bulbophyllum",
  "Other",
  "Ligustrum",
  "Cordyline",
  "Parkinsonia",
  "Betula",
  "Chamaedorea",
  "Opuntia",
  "Alnus",
  "Carya",
  "Rhododendron",
  "Rosa",
  "Aiphanes",
  "Carnegiea",
  "Sassafras",
  "Pinus Sylvestris",
  "Yucca",
  "Amelanchier",
  "Sansevieria",
  "Magnolia",
  "Spartium",
  "Arbutus",
  "Acer Saccharum",
  "Helianthus",
  "Liquidambar",
  "Acacia",
  "Juniperus",
  "Fraxinus",
  "Quercus",
  "Populus",
  "Salix",
  "Hamamelis",
];

export const fillOptions = supportedOptions({
  solid: "solid",
  "backward-diagonal": "backward-diagonal",
  cross: "cross",
  "diagonal-cross": "diagonal-cross",
  "forward-diagonal": "forward-diagonal",
  horizontal: "horizontal",
  none: "none",
  vertical: "vertical",
} as const satisfies OptionSupport<
  SimpleFillSymbol["style"] | StylePattern3D["style"]
>);

export const fontDecorationOptions = supportedOptions({
  none: "none",
  underline: "underline",
  "line-through": "line-through",
} as const satisfies OptionSupport<Font["decoration"]>);

export const fonts = fontData.fontList;

export const fontFamilyOptions = [
  "Abril Fatface",
  "Alegreya",
  "Amarante",
  "Arial",
  "Atomic Age",
  "Audiowide",
  "Avenir Next LT Pro",
  "BellTopo Sans",
  "Belleza",
  "Black Ops One",
  "Cabin Sketch",
  "Coming Soon",
  "FGDC GeoAge",
  "Homemade Apple",
  "IM FELL DW Pica PRO",
  "Josefin Sans",
  "Just Another Hand",
  "Kranky",
  "Life Savers",
  "Loved by the King",
  "Merriweather",
  "Montserrat",
  "Noto Sans",
  "Noto Serif",
  "Old Standard TT",
  "Orbitron",
  "Oregano",
  "Oswald",
  "Pacifico",
  "Palatino Linotype",
  "Playfair Display",
  "Redressed",
  "Risque",
  "Roboto Condensed",
  "Rye",
  "Special Elite",
  "Syncopate Bold",
  "Syncopate",
  "Tangerine",
  "Ubuntu",
  "Ubuntu Mono",
  "UnifrakturCook",
  "Vast Shadow",
  "Walter Turncoat",
];

export const fontStyleOptions = supportedOptions({
  normal: "normal",
  italic: "italic",
  oblique: "oblique",
} as const satisfies OptionSupport<Font["style"]>);

export const fontWeightOptions = supportedOptions({
  normal: "normal",
  bold: "bold",
  bolder: "bolder",
  lighter: "lighter",
} as const satisfies OptionSupport<Font["weight"]>);

export const horizontalAlignmentSupport = {
  center: "center",
  right: "right",
  left: "left",
  justify: null,
} as const satisfies OptionSupport<
  TextSymbol["horizontalAlignment"] | TextSymbol3DLayer["horizontalAlignment"],
  "justify"
>;

export const horizontalAlignmentOptions = supportedOptions(
  horizontalAlignmentSupport,
);

export const iconSymbol3dLayerAnchorOptions = supportedOptions({
  center: "center",
  left: "left",
  right: "right",
  top: "top",
  bottom: "bottom",
  "top-left": "top-left",
  "top-right": "top-right",
  "bottom-left": "bottom-left",
  "bottom-right": "bottom-right",
  relative: "relative",
} as const satisfies OptionSupport<IconSymbol3DLayer["anchor"]>);

export const iconSymbol3dLayerResourcePrimitiveOptions = supportedOptions({
  circle: "circle",
  square: "square",
  cross: "cross",
  x: "x",
  kite: "kite",
  triangle: "triangle",
} as const satisfies OptionSupport<
  NonNullable<IconSymbol3DLayerResource["primitive"]>
>);

export const joinOptions = supportedOptions({
  miter: "miter",
  round: "round",
  bevel: "bevel",
} as const satisfies OptionSupport<
  | SimpleLineSymbol["join"]
  | LineSymbol3DLayer["join"]
  | PathSymbol3DLayer["join"]
>);

export const lineStyleMarker3dStyleOptions = supportedOptions({
  arrow: "arrow",
  circle: "circle",
  square: "square",
  diamond: "diamond",
  cross: "cross",
  x: "x",
} as const satisfies OptionSupport<
  LineStyleMarker3D["style"] | LineSymbolMarker["style"]
>);

export const lineStyleOptions = supportedOptions({
  solid: "solid",
  dash: "dash",
  "dash-dot": "dash-dot",
  dot: "dot",
  "long-dash": "long-dash",
  "long-dash-dot": "long-dash-dot",
  "long-dash-dot-dot": "long-dash-dot-dot",
  none: "none",
  "short-dash": "short-dash",
  "short-dash-dot": "short-dash-dot",
  "short-dash-dot-dot": "short-dash-dot-dot",
  "short-dot": "short-dot",
} as const satisfies OptionSupport<
  SimpleLineSymbol["style"] | LineStylePattern3D["style"]
>);

export const markerPlacementOptions = supportedOptions({
  begin: "begin",
  end: "end",
  "begin-end": "begin-end",
} as const satisfies OptionSupport<
  LineSymbolMarker["placement"] | LineStyleMarker3D["placement"]
>);

export const markerStyleOptions = lineStyleMarker3dStyleOptions;

export const objectSymbol3DLayerAnchorOptions = supportedOptions({
  center: "center",
  top: "top",
  bottom: "bottom",
  origin: "origin",
  relative: "relative",
} as const satisfies OptionSupport<NonNullable<ObjectSymbol3DLayer["anchor"]>>);

export const objectSymbol3dLayerResourcePrimitiveOptions = supportedOptions({
  sphere: "sphere",
  cylinder: "cylinder",
  cube: "cube",
  cone: "cone",
  "inverted-cone": "inverted-cone",
  diamond: "diamond",
  tetrahedron: "tetrahedron",
} as const satisfies OptionSupport<
  NonNullable<ObjectSymbol3DLayerResource["primitive"]>
>);

export const occludedVisibilityOptions = supportedOptions({
  adaptive: "adaptive",
  hidden: "hidden",
  visible: "visible",
} as const satisfies OptionSupport<
  NonNullable<
    | NonNullable<IconSymbol3DLayer["occludedVisibility"]>["mode"]
    | NonNullable<TextSymbol3DLayer["occludedVisibility"]>["mode"]
  >
>);

export const pathSymbol3dLayerAnchorOptions = supportedOptions({
  center: "center",
  bottom: "bottom",
  top: "top",
} as const satisfies OptionSupport<PathSymbol3DLayer["anchor"]>);

export const profileOptions = supportedOptions({
  quad: "quad",
  circle: "circle",
} as const satisfies OptionSupport<PathSymbol3DLayer["profile"]>);

export const rotationOptions = supportedOptions({
  all: "all",
  heading: "heading",
} as const satisfies OptionSupport<PathSymbol3DLayer["profileRotation"]>);

export const simpleMarkerSymbolStyleOptions = supportedOptions({
  circle: "circle",
  square: "square",
  cross: "cross",
  x: "x",
  diamond: "diamond",
  triangle: "triangle",
  path: "path",
} as const satisfies OptionSupport<SimpleMarkerSymbol["style"]>);

export const symbols = [
  {
    description:
      "CIMSymbols are high quality, scalable, multi-layer vector symbols for features and graphics.",
    line: true,
    link: "./cim-symbol/",
    map: true,
    mesh: false,
    name: "CIMSymbol",
    point: true,
    polygon: true,
    scene: true,
    symbolLayers: true,
  },
  {
    description:
      "LineSymbol3D is used to render features with Polyline geometry in a 3D Scene.",
    line: true,
    link: "./line-symbol-3d/",
    map: false,
    mesh: false,
    name: "LineSymbol3D",
    point: false,
    polygon: false,
    scene: true,
    symbolLayers: true,
  },
  {
    description:
      "MeshSymbol3D is used to render 3D mesh features in a SceneLayer in a 3D Scene.",
    line: false,
    link: "./mesh-symbol-3d/",
    map: false,
    mesh: true,
    name: "MeshSymbol3D",
    point: false,
    polygon: false,
    scene: true,
    symbolLayers: true,
  },
  {
    description:
      "PictureFillSymbol uses an image in a repeating pattern to symbolize polygon features in a 2D Map.",
    line: false,
    link: "./picture-fill-symbol/",
    map: true,
    mesh: false,
    name: "PictureFillSymbol",
    point: false,
    polygon: true,
    scene: false,
    symbolLayers: false,
  },
  {
    description:
      "PictureMarkerSymbol renders Point graphics in either a 2D Map or 3D Scene using an image.",
    line: false,
    link: "./picture-marker-symbol/",
    map: true,
    mesh: false,
    name: "PictureMarkerSymbol",
    point: true,
    polygon: false,
    scene: true,
    symbolLayers: false,
  },
  {
    description:
      "PointSymbol3D is used to render features with Point geometry in a 3D Scene.",
    line: false,
    link: "./point-symbol-3d/",
    map: false,
    mesh: false,
    name: "PointSymbol3D",
    point: true,
    polygon: false,
    scene: true,
    symbolLayers: true,
  },
  {
    description:
      "PolygonSymbol3D is used to render features with Polygon geometry in a 3D Scene.",
    line: false,
    link: "./polygon-symbol-3d/",
    map: false,
    mesh: false,
    name: "PolygonSymbol3D",
    point: false,
    polygon: true,
    scene: true,
    symbolLayers: true,
  },
  {
    description:
      "SimpleFillSymbol is used for rendering 2D polygons in either a Map or a Scene.",
    line: false,
    link: "./simple-fill-symbol/",
    map: true,
    mesh: false,
    name: "SimpleFillSymbol",
    point: false,
    polygon: true,
    scene: true,
    symbolLayers: false,
  },
  {
    description:
      "SimpleLineSymbol is used for rendering 2D polyline geometries in a 2D Map.",
    line: true,
    link: "./simple-line-symbol/",
    map: true,
    mesh: false,
    name: "SimpleLineSymbol",
    point: false,
    polygon: false,
    scene: true,
    symbolLayers: false,
  },
  {
    description:
      "SimpleMarkerSymbol is used for rendering 2D Point geometries with a simple shape and color in either a Map or a Scene.",
    line: false,
    link: "./simple-marker-symbol/",
    map: true,
    mesh: false,
    name: "SimpleMarkerSymbol",
    point: true,
    polygon: false,
    scene: true,
    symbolLayers: false,
  },
  {
    description:
      "Text symbols are used to define the graphic for displaying labels on a FeatureLayer, CSVLayer, Sublayer, and StreamLayer in a 2D Map.",
    line: false,
    link: "./text-symbol/",
    map: true,
    mesh: false,
    name: "TextSymbol",
    point: true,
    polygon: false,
    scene: false,
    symbolLayers: false,
  },
  {
    description:
      "WebStyleSymbol is a class used to conveniently create vector 2D symbols and realistic and thematic 3D symbols.",
    line: true,
    link: "./web-style-symbol/",
    map: true,
    mesh: false,
    name: "WebStyleSymbol",
    point: true,
    polygon: true,
    scene: true,
    symbolLayers: false,
  },
];

export const verticalAlignmentOptions = supportedOptions({
  baseline: "baseline",
  top: "top",
  middle: "middle",
  bottom: "bottom",
} as const satisfies OptionSupport<
  TextSymbol["verticalAlignment"] | TextSymbol3DLayer["verticalAlignment"]
>);

export const waterbodySizeOptions = supportedOptions({
  small: "small",
  medium: "medium",
  large: "large",
} as const satisfies OptionSupport<WaterSymbol3DLayer["waterbodySize"]>);

export const waveStrengthOptions = supportedOptions({
  calm: "calm",
  rippled: "rippled",
  slight: "slight",
  moderate: "moderate",
} as const satisfies OptionSupport<WaterSymbol3DLayer["waveStrength"]>);

export const webStyleSymbols2DStyleOptions = ["Esri2DPointSymbolsStyle"];

export const webStyleSymbols3DStyleOptions = [
  "EsriIconsStyle",
  "EsriInfrastructureStyle",
  "EsriRealisticSignsandSignalsStyle",
  "EsriRealisticStreetSceneStyle",
  "EsriRealisticTransportationStyle",
  "EsriRealisticTreesStyle",
  "EsriRecreationStyle",
  "EsriThematicShapesStyle",
  "EsriThematicTreesStyle",
];
