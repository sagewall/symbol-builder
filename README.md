# Symbol Builder

View live at https://symbol-builder.s46e.com

Made with [ArcGIS Maps SDK for JavaScript](https://developers.arcgis.com/javascript/latest/), [Calcite Design System](https://developers.arcgis.com/calcite-design-system/components/) and [Astro](https://astro.build/).

To learn more about the folder structure of an Astro project, refer to [the guide on project structure](https://docs.astro.build/en/basics/project-structure/).

## 🧞 Commands

All commands are run from the root of the project, from a terminal:

| Command                   | Action                                               |
| :------------------------ | :--------------------------------------------------- |
| `npm install`             | Installs dependencies                                |
| `npm run dev`             | Starts local dev server at `localhost:4321`          |
| `npm run dev:stop`        | Stops local dev server at `localhost:4321`           |
| `npm run build`           | Build your production site to `./dist/`              |
| `npm test`                | Runs type checking, unit tests, and browser tests    |
| `npm run typecheck`       | Checks TypeScript against installed dependency types |
| `npm run test:e2e`        | Runs browser tests with a single worker              |
| `npm run check:catalogs`  | Checks static WebStyle names against public REST catalogs |
| `npm run preview`         | Preview your build locally, before deploying         |
| `npm run astro ...`       | Run CLI commands like `astro add`, `astro check`     |
| `npm run astro -- --help` | Get help using the Astro CLI                         |

Set `PLAYWRIGHT_BASE_URL` to run browser tests against an existing server without starting a development server.

Browser tests use one Playwright worker to avoid timeouts observed when running multiple browser instances concurrently.

## Symbol Forms

Editable property controls read their values from the current SDK symbol or symbol layer, including nested outlines, resources, fonts, and anchor positions. Keep property defaults in symbol construction rather than duplicating them in form state. Calcite switches use `checked` for boolean properties.

Local form state is reserved for UI state, pending catalog requests, and saved settings for disabled optional features. RGB color edits preserve the existing alpha value; the text-symbol background and border opacity sliders edit alpha separately.

## Symbol Property Options

Enum options in `src/components/lib/constants.ts` use exhaustive registries checked against the owning SDK property types. Registry insertion order controls UI order, and the derived option arrays are read-only and frozen.

Values excluded from the UI must be named in the registry's `OptionSupport` type and represented by `null`. The option tests verify supported values and runtime exclusions against the installed SDK. Run `npm run typecheck` and `npm run test:unit` after dependency upgrades.

WebStyle catalog names and font families are open-ended strings rather than finite SDK unions. These lists are curated data and require catalog or service validation rather than exhaustive type registries.

Run `npm run check:catalogs` to compare all ten static WebStyle name lists against their public ArcGIS Online catalogs. The script resolves official 3D styles by owner, item type, and registered style keyword; the legacy 2D style uses the item ID referenced by the SDK. It reports names missing locally, names absent remotely, and duplicates, and exits nonzero for differences, malformed responses, or request failures.

The default check is read-only. To update the literal catalog arrays in `constants.ts`, run:

```sh
npm run check:catalogs -- --write
```

Update mode preserves the order of surviving names, removes stale names and local duplicates, and appends new names alphabetically. It leaves unrelated code and unchanged arrays untouched. If any request fails, a response is invalid, or a remote catalog contains duplicate names, nothing is written. Review the diff before committing, especially if a removed first entry changes the UI default.

Add a mapping in `scripts/check-style-catalogs.mjs` when adding a catalog. The script validates names and catalog membership, not individual resource downloads, font availability, or rendering. It requires network access and is intentionally separate from `npm test` and the build; run it manually after SDK upgrades or as a scheduled check.
