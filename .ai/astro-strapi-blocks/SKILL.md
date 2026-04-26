---
name: astro-strapi-blocks
description: >-
  Integrates @sensinum/astro-strapi-blocks with Strapi 5 Blocks fields in Astro: wiring
  `data` from API responses, theming with `extend` and `overwrite`, and custom block
  components. Use when adding or editing Strapi block rendering, rich text zones, or
  `StrapiBlocks` / theme configuration.
---

# Astro Strapi Blocks (Strapi 5 + Astro)

## Prereq

- `data` is **raw** Strapi 5 **Blocks** JSON: `StrapiBlockField` (array of blocks). Do not pre-stringify; pass the same shape the REST/GraphQL client returns.
- Install `@sensinum/astro-strapi-blocks`, Astro per package requirements.

## Pass data into the component

1. In the Astro page, layout, or section component, receive the object that already includes the blocks field (e.g. from a loader, `getEntry`, or `fetch`).
2. Pass that field: `data={entity.<blocksField>}`.
3. If the field can be empty, guard the parent or accept empty array (the renderer maps over `data`).

**Anti-pattern:** building a new array by hand in the view unless the CMS is not the source of truth. Prefer one mapping from API types to your components at the data layer, then a single `data={...}`.

## Theme: `extend` vs `overwrite`

- **`extend`:** merges with the package default. String arrays (class lists) are **concatenated**; nested objects are merged. Use to tweak (e.g. add `prose` classes, brand links) while keeping default spacing where useful.
- **`overwrite`:** replaces arrays at a given path; nested objects are still deep-merged, but any array you set **replaces** the default for that key. Use for a full design system look that should not retain Tailwind defaults from the built-in theme.

**Order of application (library behavior):** `overwrite` is applied first, then `extend` on the result. In a mixed `theme`, use `overwrite` to reset major sections and `extend` to add a few project-wide tokens.

**Lists and nesting:** for nested list markers, configure `list.indent.ordered` and `list.indent.unordered` as arrays: index 0 = top level, index 1 = first nested, etc. Use `getPropertyClass` and level when writing custom list markup that mirrors the default.

## Centralizing themes

- Export a default theme object (or factory) from a small module and import it in pages/sections. Keeps `StrapiBlocks` calls consistent.
- If the same blocks must **look different** on different surfaces (e.g. on dark vs light, or in a card), return a **derived** theme from a base object (e.g. clone and adjust class strings for links/foreground). Avoid duplicating full theme trees in every `.astro` file.

## Custom block components (`blocks` prop)

Map built-in type keys to Astro components: `heading`, `paragraph`, `quote`, `list`, `code`, `image`.

Each override receives props consistent with the built-in block (see package README: `data`, `theme`, `class`, type-specific: `level`, `format`, `language`, `url`, `caption`, etc.).

1. Co-locate a custom `*.astro` file with your UI layer.
2. Reuse `renderPropertyClasses` / `getPropertyClass` from the package for class paths that match the default theme structure.
3. For text rich runs, follow how default blocks forward `data` to child item renderers (links, strong, etc.) so you do not drop formatting.

`StrapiBlockCustom` in the package wraps your component: your component receives the same prop contract as the default block for that type.

## New “block” types

Strapi 5 only emits the types the editor supports. This package **renders** the standard set. To add **custom** types you must add them in Strapi (e.g. custom field / plugin) and handle them in your own code path—`StrapiBlocks` only dispatches the built-in `type` values. If you need custom CMS blocks in one zone, use a **dynamic zone** in Strapi and a parent Astro switch that picks `StrapiBlocks` for rich-text fields and your components for other components.

## Checklist (new feature)

- [ ] Blocks field typed or asserted as `StrapiBlockField` / your shared API types.
- [ ] `data` points at the unmodified blocks array from the response.
- [ ] Theme: choose `extend`, `overwrite`, or both with clear intent.
- [ ] Custom block: props match README; use theme helpers for class names.
- [ ] Lists: if styling nested markers, set `list.indent` arrays to enough depth.

## Further reading

- [reference.md](reference.md) — path cheat sheet and `StrapiBlockUserTheme` shape.
- Package `README.md` in the repository root for default theme table and copy-paste examples.
