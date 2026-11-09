import { expect, test } from "vitest";
import { stringifyConstructorProperties } from "./constructorProperties";

test.each([
  [0, 1],
  [65, 0.35],
  [100, 0],
])("converts %s percent transparency to alpha %s", (transparency, alpha) => {
  const result = JSON.parse(
    stringifyConstructorProperties({
      color: [10, 20, 30],
      transparency,
      size: 2,
    }),
  );

  expect(result).toEqual({ color: [10, 20, 30, alpha], size: 2 });
});

test("normalizes nested colors and arrays without mutating input", () => {
  const input = {
    callout: {
      color: [255, 0, 0],
      transparency: 75,
      border: { color: [0, 0, 255], transparency: 50 },
    },
    layers: [{ color: [0, 255, 0], transparency: 100 }, null],
  };
  const before = structuredClone(input);

  expect(JSON.parse(stringifyConstructorProperties(input))).toEqual({
    callout: {
      color: [255, 0, 0, 0.25],
      border: { color: [0, 0, 255, 0.5] },
    },
    layers: [{ color: [0, 255, 0, 0] }, null],
  });
  expect(input).toEqual(before);
});

test.each([
  null,
  { color: [10, 20, 30, 0.4] },
  { color: "red", transparency: 25 },
  { color: [10, 20], transparency: 25 },
  { color: [10, 20, 30], transparency: "25" },
  { transparency: 25 },
])("preserves values without a convertible color: %j", (value) => {
  expect(JSON.parse(stringifyConstructorProperties(value))).toEqual(value);
});

test.each([undefined, () => {}, Symbol("invalid")])(
  "rejects a non-serializable top-level value: %s",
  (value) => {
    expect(() => stringifyConstructorProperties(value)).toThrow(
      new TypeError("Constructor properties must be JSON serializable."),
    );
  },
);
