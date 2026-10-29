import { readFile } from "node:fs/promises";
import { expect, test, vi } from "vitest";
import {
  checkCatalogs,
  compareCatalog,
  getPointSymbolNames,
  readCatalogs,
  requestJSON,
  resolveStyleItem,
  updateCatalogs,
} from "./check-style-catalogs.mjs";

const source = await readFile(
  new URL("../src/components/lib/constants.ts", import.meta.url),
  "utf8",
);
const fixtureSource = [...readCatalogs(source).keys()]
  .map((name) => `export const ${name} = ["one",];`)
  .join("\n");
const response = (data) => ({
  ok: true,
  json: async () => data,
});

function mockCatalogService(names = ["one"]) {
  return vi.fn(async (url) => {
    const query = new URL(url).searchParams.get("q");
    if (query) {
      const styleName = query.match(/typekeywords:"([^"]+)"/)[1];
      return response({
        nextStart: -1,
        results: [
          {
            id: "a".repeat(32),
            owner: "esri_en",
            type: "Style",
            typeKeywords: [styleName],
          },
        ],
      });
    }
    return response({
      items: names.map((name) => ({ name, itemType: "pointSymbol" })),
    });
  });
}

test("reads every existing catalog without executing TypeScript", () => {
  const catalogs = readCatalogs(source);
  expect(catalogs.size).toBe(10);
  expect(catalogs.get("esri2DPointSymbolsStyleNameOptions")).toContain(
    "extent-hollow-gray",
  );
  expect(readCatalogs(fixtureSource).get("esriIconsStyleNameOptions")).toEqual([
    "one",
  ]);
});

test("requires explicit mappings and declarations for every catalog", () => {
  expect(() =>
    readCatalogs(
      `${fixtureSource}\nexport const esriNewStyleNameOptions = ["one"];`,
    ),
  ).toThrow("No registered style mapping");
  expect(() => readCatalogs("")).toThrow("Missing catalog declaration");
  expect(() =>
    readCatalogs(fixtureSource.replace('["one",]', "getNames()")),
  ).toThrow("literal array");
  expect(() =>
    readCatalogs(fixtureSource.replace('["one",]', "[123]")),
  ).toThrow("nonempty strings");
});

test("reports membership differences and duplicates without comparing order", () => {
  expect(compareCatalog(["b", "a"], ["a", "b"])).toEqual({
    missingLocally: [],
    absentRemotely: [],
    localDuplicates: [],
    remoteDuplicates: [],
  });
  expect(compareCatalog(["a", "old", "a"], ["a", "new", "new"])).toEqual({
    missingLocally: ["new"],
    absentRemotely: ["old"],
    localDuplicates: ["a"],
    remoteDuplicates: ["new"],
  });
});

test("ignores other symbol types but rejects malformed or empty point catalogs", () => {
  expect(
    getPointSymbolNames({
      items: [
        { itemType: "lineSymbol", name: "line" },
        { itemType: "pointSymbol", name: "point" },
      ],
    }),
  ).toEqual(["point"]);
  for (const data of [
    {},
    { items: [] },
    { items: [null] },
    { items: [{ itemType: "pointSymbol", name: "" }] },
  ]) {
    expect(() => getPointSymbolNames(data)).toThrow();
  }
});

test("resolves legacy 2D without search and 3D by exact official keyword", async () => {
  const fetchJSON = mockCatalogService();
  expect(await resolveStyleItem("Esri2DPointSymbolsStyle", fetchJSON)).toBe(
    "220936cc6ed342c9937abd8f180e7d1e",
  );
  expect(fetchJSON).not.toHaveBeenCalled();
  expect(await resolveStyleItem("EsriIconsStyle", fetchJSON)).toBe(
    "a".repeat(32),
  );
  const url = new URL(fetchJSON.mock.calls[0][0]);
  expect(url.searchParams.get("q")).toBe(
    'owner:esri_en AND type:Style AND typekeywords:"EsriIconsStyle"',
  );
});

test("rejects absent, ambiguous, unofficial, and incomplete search results", async () => {
  const official = {
    id: "a".repeat(32),
    owner: "esri_en",
    type: "Style",
    typeKeywords: ["EsriIconsStyle"],
  };
  for (const data of [
    { results: [] },
    { results: [official, official] },
    { results: [{ ...official, owner: "someone_else" }] },
    { results: [{ ...official, typeKeywords: ["OtherStyle"] }] },
    { results: [official], nextStart: 101 },
    {},
  ]) {
    await expect(
      resolveStyleItem("EsriIconsStyle", async () => response(data)),
    ).rejects.toThrow();
  }
});

test("rejects HTTP, ArcGIS, invalid JSON, and network failures", async () => {
  for (const fetchJSON of [
    async () => ({ ok: false, status: 503 }),
    async () => response({ error: { code: 403, message: "Forbidden" } }),
    async () => response(null),
    async () => response([]),
    async () => {
      throw new Error("Network unavailable");
    },
  ]) {
    await expect(requestJSON("https://example.com", fetchJSON)).rejects.toThrow();
  }
});

test("checks all catalogs and reports failures without stopping early", async () => {
  const report = vi.fn();
  expect(
    await checkCatalogs(fixtureSource, mockCatalogService(), report),
  ).toBe(0);
  expect(report).toHaveBeenCalledTimes(10);
  expect(report.mock.calls.every(([line]) => line.startsWith("PASS"))).toBe(true);

  report.mockClear();
  expect(
    await checkCatalogs(fixtureSource, mockCatalogService(["new"]), report),
  ).toBe(10);
  expect(
    report.mock.calls.filter(([line]) => line.startsWith("FAIL")),
  ).toHaveLength(10);
  expect(report).toHaveBeenCalledWith('  absentRemotely: ["one"]');
  expect(report).toHaveBeenCalledWith('  missingLocally: ["new"]');

  report.mockClear();
  expect(
    await checkCatalogs(
      fixtureSource,
      async () => {
        throw new Error("Network unavailable");
      },
      report,
    ),
  ).toBe(10);
  expect(report).toHaveBeenCalledTimes(10);
  expect(
    report.mock.calls.every(([line]) => line.includes("Network unavailable")),
  ).toBe(true);
});

test("updates membership while preserving surviving order and appending sorted names", async () => {
  const input = fixtureSource.replace(
    '["one",]',
    '["keep", "old", "one", "keep",]',
  );
  const report = vi.fn();
  const result = await updateCatalogs(
    input,
    mockCatalogService(["zeta", "one", "alpha", "keep"]),
    report,
  );

  expect(result.failures).toBe(0);
  expect(
    readCatalogs(result.source).get("esri2DPointSymbolsStyleNameOptions"),
  ).toEqual(["keep", "one", "alpha", "zeta"]);
  expect(result.source).toContain(
    'export const esri2DPointSymbolsStyleNameOptions = [\n  "keep",\n  "one",\n  "alpha",\n  "zeta",\n];',
  );
  expect(
    report.mock.calls.filter(([line]) => line.startsWith("UPDATE")),
  ).toHaveLength(10);
  expect(
    await checkCatalogs(
      result.source,
      mockCatalogService(["zeta", "one", "alpha", "keep"]),
      vi.fn(),
    ),
  ).toBe(0);
});

test("does not rewrite matching arrays or unrelated source and is idempotent", async () => {
  const input = `// Before\n${fixtureSource}\nexport const unrelated = ["untouched"];`;
  const unchanged = await updateCatalogs(input, mockCatalogService(), vi.fn());
  expect(unchanged).toEqual({ failures: 0, source: input });

  const updated = await updateCatalogs(
    input,
    mockCatalogService(["one", "new"]),
    vi.fn(),
  );
  expect(updated.source).toContain("// Before\n");
  expect(updated.source).toContain('export const unrelated = ["untouched"];');
  const repeated = await updateCatalogs(
    updated.source,
    mockCatalogService(["one", "new"]),
    vi.fn(),
  );
  expect(repeated).toEqual({ failures: 0, source: updated.source });
});

test("escapes catalog names as JSON strings and preserves CRLF", async () => {
  const name = 'quotes " and \\ backslashes\nnewline';
  const result = await updateCatalogs(
    fixtureSource.replaceAll("\n", "\r\n"),
    mockCatalogService([name]),
    vi.fn(),
  );
  expect(result.failures).toBe(0);
  expect(result.source).not.toMatch(/(?<!\r)\n/);
  expect([...readCatalogs(result.source).values()]).toEqual(
    Array.from({ length: 10 }, () => [name]),
  );
});

test("discards all proposed updates when any catalog request fails", async () => {
  const service = mockCatalogService(["new"]);
  const result = await updateCatalogs(
    fixtureSource,
    async (url, options) => {
      if (new URL(url).pathname.endsWith("/search")) {
        throw new Error("Search unavailable");
      }
      return service(url, options);
    },
    vi.fn(),
  );
  expect(result.failures).toBe(9);
  expect(result.source).toBe(fixtureSource);
});

test("refuses updates for remote duplicates or malformed catalogs", async () => {
  for (const service of [
    mockCatalogService(["new", "new"]),
    async () => response({ items: [] }),
  ]) {
    const result = await updateCatalogs(fixtureSource, service, vi.fn());
    expect(result.failures).toBe(10);
    expect(result.source).toBe(fixtureSource);
  }
});
