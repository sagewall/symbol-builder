import Color from "@arcgis/core/Color.js";
import { expect, test } from "vitest";
import { colorWithAlpha } from "./color";

test.each([0, 0.4, 1])("preserves opacity %s when changing RGB", (alpha) => {
  const previous = new Color([255, 0, 0, alpha]);
  const updated = colorWithAlpha("#007ac2", previous);
  expect(updated.toHex()).toBe("#007ac2");
  expect(updated.a).toBe(alpha);
  expect(updated).not.toBe(previous);
  expect(previous.toRgba()).toEqual([255, 0, 0, alpha]);
});

test.each([null, undefined])(
  "uses opaque RGB when no color exists: %s",
  (previous) => {
    expect(colorWithAlpha("#ffffff", previous).toRgba()).toEqual([
      255, 255, 255, 1,
    ]);
  },
);
