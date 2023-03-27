import {
  CAP_3D_OPTIONS,
  CAP_OPTIONS,
  COLOR_MIX_MODE_OPTIONS,
  FILL_OPTIONS,
  FONT_DECORATION_OPTIONS,
  FONT_STYLE_OPTIONS,
  FONT_WEIGHT_OPTIONS,
  HORIZONTAL_ALIGNMENT_OPTIONS,
  ICON_SYMBOL_3D_LAYER_ANCHOR_OPTIONS,
  ICON_SYMBOL_3D_LAYER_RESOURCE_PRIMITIVE_OPTIONS,
  JOIN_OPTIONS,
  LINE_STYLE_MARKER_3D_STYLE_OPTIONS,
  LINE_STYLE_OPTIONS,
  MARKER_PLACEMENT_OPTIONS,
  OBJECT_SYMBOL_3D_LAYER_ANCHOR_OPTIONS,
  OBJECT_SYMBOL_3D_LAYER_RESOURCE_PRIMITIVE_OPTIONS,
  PATH_SYMBOL_3D_LAYER_ANCHOR_OPTIONS,
  PROFILE_OPTIONS,
  ROTATION_OPTIONS,
  SIMPLE_MARKER_SYMBOL_STYLE_OPTIONS,
  VERTICAL_ALIGNMENT_OPTIONS
} from "./constants";

export type Cap = (typeof CAP_OPTIONS)[number];

export type Cap3D = (typeof CAP_3D_OPTIONS)[number];

export type ColorMixMode = (typeof COLOR_MIX_MODE_OPTIONS)[number];

export type Fill = (typeof FILL_OPTIONS)[number];

export type FontDecoration = (typeof FONT_DECORATION_OPTIONS)[number];

export type FontStyle = (typeof FONT_STYLE_OPTIONS)[number];

export type FontWeight = (typeof FONT_WEIGHT_OPTIONS)[number];

export type HorizontalAlignment = (typeof HORIZONTAL_ALIGNMENT_OPTIONS)[number];

export type IconSymbol3DLayerAnchor = (typeof ICON_SYMBOL_3D_LAYER_ANCHOR_OPTIONS)[number];

export type IconSymbol3DLayerResourcePrimitive = (typeof ICON_SYMBOL_3D_LAYER_RESOURCE_PRIMITIVE_OPTIONS)[number];

export type Join = (typeof JOIN_OPTIONS)[number];

export type LineStyleMarker3DStyle = (typeof LINE_STYLE_MARKER_3D_STYLE_OPTIONS)[number];

export type LineStyle = (typeof LINE_STYLE_OPTIONS)[number];

export type MarkerPlacement = (typeof MARKER_PLACEMENT_OPTIONS)[number];

export type ObjectSymbol3DLayerAnchor = (typeof OBJECT_SYMBOL_3D_LAYER_ANCHOR_OPTIONS)[number];

export type ObjectSymbol3DLayerResourcePrimitive = (typeof OBJECT_SYMBOL_3D_LAYER_RESOURCE_PRIMITIVE_OPTIONS)[number];

export type PathSymbol3DLayerAnchor = (typeof PATH_SYMBOL_3D_LAYER_ANCHOR_OPTIONS)[number];

export type Profile = (typeof PROFILE_OPTIONS)[number];

export type Rotation = (typeof ROTATION_OPTIONS)[number];

export type SimpleMarkerSymbolStyle = (typeof SIMPLE_MARKER_SYMBOL_STYLE_OPTIONS)[number];

export type VerticalAlignment = (typeof VERTICAL_ALIGNMENT_OPTIONS)[number];

export type WaterbodySize = (typeof WATERBODY_SIZE_OPTIONS)[number];

export type WaveStrength = (typeof WAVE_STRENGTH_OPTIONS)[number];
