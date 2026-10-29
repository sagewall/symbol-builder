# Symbol Builder

Live site: https://symbol-builder.s46e.com

Built with [ArcGIS Maps SDK for JavaScript](https://developers.arcgis.com/javascript/latest/), [Calcite Design System](https://developers.arcgis.com/calcite-design-system/components/), and [Astro](https://astro.build/).

## 🧞 Commands

Run from the project root:

| Command | Action |
| --- | --- |
| `npm install` | Install dependencies |
| `npm run dev` | Start the local development server |
| `npm run dev:stop` | Stop the development server |
| `npm test` | Run type checking, unit tests, and browser tests |
| `npm run build` | Build the production site |
| `npm run preview` | Preview the production build locally |

Set `PLAYWRIGHT_BASE_URL` to run browser tests against an existing server. Browser tests use one worker to avoid timeouts from concurrent browser instances.

## WebStyle catalogs

`npm run check:catalogs` checks curated WebStyle names against their public catalogs. It requires network access and is separate from `npm test`.

To update the catalog arrays, run:

```sh
npm run check:catalogs -- --write
```

Review the resulting diff before committing.
