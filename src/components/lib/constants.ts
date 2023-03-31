export const CAP_OPTIONS = ["butt", "round", "square"] as const;

export const CAP_3D_OPTIONS = ["butt", "square", "round", "none"];

export const COLOR_MIX_MODE_OPTIONS = ["multiply", "tint", "replace"] as const;

export const ESRI_2D_POINT_SYMBOLS_STYLE_NAME_OPTIONS = [
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
  "shield-5"
];

export const ESRI_ICONS_STYLE_NAME_OPTIONS = [
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
  "Zoo"
];

export const ESRI_INFRASTRUCTURE_STYLE_NAME_OPTIONS = [
  "Cell_Phone_Antenna",
  "Electricity_Box",
  "Electricity_Meter",
  "Powerline_Pole",
  "Radio_Antenna",
  "Wind_Turbine"
];

export const ESRI_REALISTIC_SIGNS_AND_SIGNALS_STYLE_NAME_OPTIONS = [
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
  "Yield"
];

export const ESRI_REALISTIC_STREET_SCENE_STYLE_NAME_OPTIONS = [
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
  "US_Mailbox"
];

export const ESRI_REALISTIC_TRANSPORTATION_STYLE_NAME_OPTIONS = [
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
  "Volkswagen_Jetta_Wagon"
];

export const ESRI_REALISTIC_TREES_STYLE_NAME_OPTIONS = [
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
  "Hamamelis"
];

export const ESRI_RECREATION_STYLE_NAME_OPTIONS = [
  "American_Football_Goal",
  "Basketball_Hoop",
  "Jungle_Gym",
  "Slide",
  "Soccer_Goal",
  "Swing",
  "Teeter_Totter"
];

export const ESRI_THEMATIC_SHAPES_STYLE_NAME_OPTIONS = [
  "Centered Cube",
  "Centered Diamond",
  "Centered Sphere",
  "Standing Cone",
  "Standing Cube",
  "Standing Cylinder",
  "Standing Diamond",
  "Standing Inverted Cone",
  "Standing Sphere",
  "Standing Tetrahedron"
];

export const ESRI_THEMATIC_TREES_STYLE_NAME_OPTIONS = [
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
  "Hamamelis"
];

export const FILL_OPTIONS = [
  "solid",
  "backward-diagonal",
  "cross",
  "diagonal-cross",
  "forward-diagonal",
  "horizontal",
  "none",
  "vertical"
] as const;

export const FONT_DECORATION_OPTIONS = ["none", "underline", "line-through"] as const;

export const FONT_STYLE_OPTIONS = ["normal", "italic", "oblique"] as const;

export const FONT_WEIGHT_OPTIONS = ["normal", "bold", "bolder", "lighter"] as const;

export const HORIZONTAL_ALIGNMENT_OPTIONS = ["center", "right", "left"] as const;

export const ICON_SYMBOL_3D_LAYER_ANCHOR_OPTIONS = [
  "center",
  "left",
  "right",
  "top",
  "bottom",
  "top-left",
  "top-right",
  "bottom-left",
  "bottom-right",
  "relative"
] as const;

export const ICON_SYMBOL_3D_LAYER_RESOURCE_PRIMITIVE_OPTIONS = [
  "circle",
  "square",
  "cross",
  "x",
  "kite",
  "triangle"
] as const;

export const JOIN_OPTIONS = ["miter", "round", "bevel"] as const;

export const LINE_STYLE_MARKER_3D_STYLE_OPTIONS = ["arrow", "circle", "square", "diamond", "cross", "x"] as const;

export const LINE_STYLE_OPTIONS = [
  "solid",
  "dash",
  "dash-dot",
  "dot",
  "long-dash",
  "long-dash-dot",
  "long-dash-dot-dot",
  "none",
  "short-dash",
  "short-dash-dot",
  "short-dash-dot-dot",
  "short-dot"
] as const;

export const MARKER_PLACEMENT_OPTIONS = ["begin", "end", "begin-end"] as const;

export const MARKER_STYLE_OPTIONS = ["arrow", "circle", "square", "diamond", "cross", "x"] as const;

export const OBJECT_SYMBOL_3D_LAYER_ANCHOR_OPTIONS = ["center", "top", "bottom", "origin", "relative"] as const;

export const OBJECT_SYMBOL_3D_LAYER_RESOURCE_PRIMITIVE_OPTIONS = [
  "sphere",
  "cylinder",
  "cube",
  "cone",
  "inverted-cone",
  "diamond",
  "tetrahedron"
] as const;

export const PATH_SYMBOL_3D_LAYER_ANCHOR_OPTIONS = ["center", "bottom", "top"] as const;

export const PROFILE_OPTIONS = ["quad", "circle"] as const;

export const ROTATION_OPTIONS = ["all", "heading"] as const;

export const SIMPLE_MARKER_SYMBOL_STYLE_OPTIONS = [
  "circle",
  "square",
  "cross",
  "x",
  "diamond",
  "triangle",
  "path"
] as const;

export const VERTICAL_ALIGNMENT_OPTIONS = ["baseline", "top", "middle", "bottom"] as const;

export const WATERBODY_SIZE_OPTIONS = ["small", "medium", "large"] as const;

export const WAVE_STRENGTH_OPTIONS = ["calm", "rippled", "slight", "moderate"] as const;

export const WEB_STYLE_SYMBOLS_2D_STYLE_OPTIONS = ["Esri2DPointSymbolsStyle"] as const;

export const WEB_STYLE_SYMBOLS_3D_STYLE_OPTIONS = [
  "EsriIconsStyle",
  "EsriInfrastructureStyle",
  "EsriRealisticSignsandSignalsStyle",
  "EsriRealisticStreetSceneStyle",
  "EsriRealisticTransportationStyle",
  "EsriRealisticTreesStyle",
  "EsriRecreationStyle",
  "EsriThematicShapesStyle",
  "EsriThematicTreesStyle"
] as const;
