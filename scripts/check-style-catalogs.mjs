import { readFile, writeFile } from "node:fs/promises";
import { resolve } from "node:path";
import { pathToFileURL } from "node:url";

const portalUrl = "https://www.arcgis.com/sharing/rest";
const catalogStyles = {
  esri2DPointSymbolsStyleNameOptions: "Esri2DPointSymbolsStyle",
  esriIconsStyleNameOptions: "EsriIconsStyle",
  esriInfrastructureStyleNameOptions: "EsriInfrastructureStyle",
  esriRealisticSignsAndSignalsStyleNameOptions:
    "EsriRealisticSignsandSignalsStyle",
  esriRealisticStreetSceneStyleNameOptions: "EsriRealisticStreetSceneStyle",
  esriRealisticTransportationStyleNameOptions:
    "EsriRealisticTransportationStyle",
  esriRealisticTreesStyleNameOptions: "EsriRealisticTreesStyle",
  esriRecreationStyleNameOptions: "EsriRecreationStyle",
  esriThematicShapesStyleNameOptions: "EsriThematicShapesStyle",
  esriThematicTreesStyleNameOptions: "EsriThematicTreesStyle",
};

export function readCatalogs(source) {
  const catalogs = new Map();
  const declarations = source.matchAll(
    /export const (esri\w+StyleNameOptions)\s*=/g,
  );
  for (const [, name] of declarations) {
    if (!Object.hasOwn(catalogStyles, name)) {
      throw new Error(`No registered style mapping for ${name}.`);
    }
    const literal = source.match(
      new RegExp(`export const ${name}\\s*=\\s*\\[([\\s\\S]*?)\\];`),
    );
    if (!literal) {
      throw new Error(`${name} must be a literal array of JSON strings.`);
    }
    // Read only literal data, without executing the app's TypeScript or SDK imports.
    const values = JSON.parse(`[${literal[1].replace(/,\s*$/, "")}]`);
    if (
      values.length === 0 ||
      !values.every((value) => typeof value === "string" && value.length > 0)
    ) {
      throw new Error(`${name} must contain nonempty strings.`);
    }
    catalogs.set(name, values);
  }
  for (const name of Object.keys(catalogStyles)) {
    if (!catalogs.has(name)) {
      throw new Error(`Missing catalog declaration: ${name}.`);
    }
  }
  return catalogs;
}

export async function requestJSON(url, fetchJSON = fetch) {
  const response = await fetchJSON(url, {
    signal: AbortSignal.timeout(30_000),
  });
  if (!response.ok) {
    throw new Error(`HTTP ${response.status} requesting ${url}`);
  }
  const data = await response.json();
  if (data === null || typeof data !== "object" || Array.isArray(data)) {
    throw new Error(`Expected a JSON object from ${url}`);
  }
  if (data.error) {
    throw new Error(
      `ArcGIS REST error from ${url}: ${JSON.stringify(data.error)}`,
    );
  }
  return data;
}

export async function resolveStyleItem(styleName, fetchJSON = fetch) {
  // The SDK resolves this legacy 2D style directly, rather than via portal search.
  if (styleName === "Esri2DPointSymbolsStyle") {
    return "220936cc6ed342c9937abd8f180e7d1e";
  }
  const url = new URL(`${portalUrl}/search`);
  url.search = new URLSearchParams({
    f: "json",
    q: `owner:esri_en AND type:Style AND typekeywords:"${styleName}"`,
    num: "100",
  }).toString();
  const data = await requestJSON(url.href, fetchJSON);
  if (
    !Array.isArray(data.results) ||
    (data.nextStart !== undefined && data.nextStart !== -1)
  ) {
    throw new Error(`Incomplete style search response for ${styleName}.`);
  }
  const matches = data.results.filter(
    (item) =>
      item.owner === "esri_en" &&
      item.type === "Style" &&
      Array.isArray(item.typeKeywords) &&
      item.typeKeywords.some(
        (keyword) =>
          typeof keyword === "string" &&
          keyword.toLowerCase() === styleName.toLowerCase(),
      ),
  );
  if (matches.length !== 1 || !/^[a-f0-9]{32}$/i.test(matches[0].id ?? "")) {
    throw new Error(
      `Expected one official item for ${styleName}, found ${matches.length}.`,
    );
  }
  return matches[0].id;
}

export function getPointSymbolNames(data) {
  if (!Array.isArray(data.items)) {
    throw new Error("Style data must contain an items array.");
  }
  const names = [];
  for (const item of data.items) {
    if (item === null || typeof item !== "object") {
      throw new Error("Style data contains an invalid item.");
    }
    if (item.itemType !== "pointSymbol") continue;
    if (typeof item.name !== "string" || item.name.length === 0) {
      throw new Error("Point symbol item must have a nonempty name.");
    }
    names.push(item.name);
  }
  if (names.length === 0) {
    throw new Error("Style data contains no point symbols.");
  }
  return names;
}

export function compareCatalog(local, remote) {
  const duplicates = (values) =>
    [
      ...new Set(
        values.filter((value, index) => values.indexOf(value) !== index),
      ),
    ].sort();
  return {
    missingLocally: [...new Set(remote)]
      .filter((name) => !local.includes(name))
      .sort(),
    absentRemotely: [...new Set(local)]
      .filter((name) => !remote.includes(name))
      .sort(),
    localDuplicates: duplicates(local),
    remoteDuplicates: duplicates(remote),
  };
}

async function inspectCatalogs(source, fetchJSON, report, update) {
  const catalogs = readCatalogs(source);
  let updatedSource = source;
  let failures = 0;
  for (const [name, local] of catalogs) {
    try {
      const styleName = catalogStyles[name];
      const itemId = await resolveStyleItem(styleName, fetchJSON);
      const url = `${portalUrl}/content/items/${itemId}/data?f=json`;
      const remote = getPointSymbolNames(await requestJSON(url, fetchJSON));
      const differences = compareCatalog(local, remote);
      const changed = Object.values(differences).some(
        (values) => values.length > 0,
      );
      const canUpdate = update && differences.remoteDuplicates.length === 0;
      report(
        `${changed ? (canUpdate ? "UPDATE" : "FAIL") : "PASS"} ${name}: ${local.length} local, ${remote.length} remote (${itemId})`,
      );
      if (changed) {
        if (!canUpdate) failures += 1;
        for (const [category, values] of Object.entries(differences)) {
          if (values.length > 0) {
            report(`  ${category}: ${JSON.stringify(values)}`);
          }
        }
        if (canUpdate) {
          const names = [
            ...new Set(local.filter((value) => remote.includes(value))),
            ...differences.missingLocally,
          ];
          const newline = source.includes("\r\n") ? "\r\n" : "\n";
          updatedSource = updatedSource.replace(
            new RegExp(`(export const ${name}\\s*=\\s*)\\[([\\s\\S]*?)\\];`),
            (_, declaration) =>
              `${declaration}[${newline}${names
                .map((value) => `  ${JSON.stringify(value)},`)
                .join(newline)}${newline}];`,
          );
        }
      }
    } catch (error) {
      failures += 1;
      report(
        `FAIL ${name}: ${error instanceof Error ? error.message : String(error)}`,
      );
    }
  }
  return {
    failures,
    source: failures === 0 ? updatedSource : source,
  };
}

export async function checkCatalogs(
  source,
  fetchJSON = fetch,
  report = console.log,
) {
  return (await inspectCatalogs(source, fetchJSON, report, false)).failures;
}

export async function updateCatalogs(
  source,
  fetchJSON = fetch,
  report = console.log,
) {
  return inspectCatalogs(source, fetchJSON, report, true);
}

if (
  process.argv[1] &&
  import.meta.url === pathToFileURL(resolve(process.argv[1])).href
) {
  try {
    const args = process.argv.slice(2);
    if (args.some((arg) => arg !== "--write") || args.length > 1) {
      throw new Error("Usage: npm run check:catalogs -- [--write]");
    }
    const constantsUrl = new URL(
      "../src/components/lib/constants.ts",
      import.meta.url,
    );
    const source = await readFile(constantsUrl, "utf8");
    if (args.includes("--write")) {
      const result = await updateCatalogs(source);
      if (result.failures > 0) {
        console.error(
          "No changes written: one or more catalogs failed validation.",
        );
        process.exitCode = 1;
      } else if (result.source !== source) {
        if ((await readFile(constantsUrl, "utf8")) !== source) {
          throw new Error(
            "constants.ts changed during validation; no changes written. Run again.",
          );
        }
        await writeFile(constantsUrl, result.source, "utf8");
        console.log("Updated constants.ts. Review the diff before committing.");
      } else {
        console.log("constants.ts is already up to date; no changes written.");
      }
    } else {
      const failures = await checkCatalogs(source);
      if (failures > 0) process.exitCode = 1;
    }
  } catch (error) {
    console.error(error instanceof Error ? error.message : String(error));
    process.exitCode = 1;
  }
}
