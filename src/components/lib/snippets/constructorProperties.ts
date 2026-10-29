function normalizeColorTransparency(value: unknown): unknown {
  if (Array.isArray(value)) {
    return value.map(normalizeColorTransparency);
  }

  if (value === null || typeof value !== "object") {
    return value;
  }

  const properties = Object.fromEntries(
    Object.entries(value).map(([key, property]) => [
      key,
      normalizeColorTransparency(property),
    ]),
  );
  const color = properties.color;
  const transparency = properties.transparency;

  if (
    Array.isArray(color) &&
    typeof transparency === "number" &&
    color.length >= 3
  ) {
    properties.color = [
      color[0],
      color[1],
      color[2],
      (100 - transparency) / 100,
    ];
    delete properties.transparency;
  }

  return properties;
}

export function stringifyConstructorProperties(value: unknown): string {
  const serialized = JSON.stringify(normalizeColorTransparency(value));
  if (serialized === undefined) {
    throw new TypeError("Constructor properties must be JSON serializable.");
  }
  return serialized;
}
