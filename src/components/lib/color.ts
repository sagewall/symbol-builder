import Color from "@arcgis/core/Color.js";

export function colorWithAlpha(
  value: string,
  previous: Color | null | undefined,
): Color {
  const color = new Color(value);
  color.a = previous?.a ?? 1;
  return color;
}
