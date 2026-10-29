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
| `npm run preview`         | Preview your build locally, before deploying         |
| `npm run astro ...`       | Run CLI commands like `astro add`, `astro check`     |
| `npm run astro -- --help` | Get help using the Astro CLI                         |

## Symbol Property Options

Enum options in `src/components/lib/constants.ts` use exhaustive registries checked against the owning SDK property types. Registry insertion order controls UI order, and the derived option arrays are read-only and frozen.

Values excluded from the UI must be named in the registry's `OptionSupport` type and represented by `null`. The option tests verify supported values and runtime exclusions against the installed SDK. Run `npm run typecheck` and `npm run test:unit` after dependency upgrades.

WebStyle catalog names and font families are open-ended strings rather than finite SDK unions. These lists are curated data and require catalog or service validation rather than exhaustive type registries.
