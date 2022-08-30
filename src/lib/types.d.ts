type CIMSymbolStyleOption =
  | __esri.CIMPointSymbol
  | __esri.CIMLineSymbol
  | __esri.CIMPolygonSymbol;
type CIMSymbolStyleOptions = CIMSymbolStyleOption[];

type LineSymbolMarkerPlacementOption = "begin" | "end" | "begin-end";
type LineSymbolMarkerPlacementOptions = LineSymbolMarkerPlacementOption[];

type LineSymbolMarkerStyleOption =
  | "square"
  | "arrow"
  | "circle"
  | "diamond"
  | "cross"
  | "x";
type LineSymbolMarkerStyleOptions = LineSymbolMarkerStyleOption[];

type SymbolOption = "CIMSymbol" | "SimpleLineSymbol" | "SimpleFillSymbol";
type SymbolOptions = SymbolOption[];

type SimpleFillSymbolStyleOption =
  | "backward-diagonal"
  | "cross"
  | "diagonal-cross"
  | "forward-diagonal"
  | "horizontal"
  | "none"
  | "solid"
  | "vertical";
type SimpleFillSymbolStyleOptions = SimpleFillSymbolStyleOption[];

type SimpleLineSymbolCapOption = "butt" | "round" | "square";
type SimpleLineSymbolCapOptions = SimpleLineSymbolCapOption[];

type SimpleLineSymbolJoinOption = "round" | "miter" | "bevel";
type SimpleLineSymbolJoinOptions = SimpleLineSymbolJoinOption[];

type SimpleLineSymbolStyleOption =
  | "dash"
  | "dash-dot"
  | "dot"
  | "long-dash"
  | "long-dash-dot"
  | "long-dash-dot-dot"
  | "none"
  | "short-dash"
  | "short-dash-dot"
  | "short-dash-dot-dot"
  | "short-dot"
  | "solid";
type SimpleLineSymbolStyleOptions = SimpleLineSymbolStyleOption[];
