# Agent instructions (models, Cursor, and other tools)

The `.ai/` directory holds project-agnostic context for using **Astro Strapi Blocks** in **Astro + Strapi 5 (Blocks field)** projects. It is not tied to a single editor.

## Where to look

1. **Skill (workflow):** [astro-strapi-blocks/SKILL.md](./astro-strapi-blocks/SKILL.md) — passing `data`, `extend` / `overwrite`, overrides via `blocks`, and CMS type constraints.
2. **Quick reference:** [astro-strapi-blocks/reference.md](./astro-strapi-blocks/reference.md) — theme paths and merge behavior.
3. **API source of truth:** repository root `README.md` (props table, default theme, Astro examples, custom block prop types).

In **Cursor**, you can copy or symlink the skill folder to `.cursor/skills/astro-strapi-blocks/` if you want the skill in Cursor’s default skills location — the content is the same as under `.ai/astro-strapi-blocks/`.

## Code conventions

- Import `StrapiBlocks` from `@sensinum/astro-strapi-blocks`; pass **raw** block data from the Strapi response as `data={...}`.
- Centralize themes in a single module with exports instead of duplicating large `theme` objects across files.
- When overriding a block, follow the prop contract in the package README and use `renderPropertyClasses` / `getPropertyClass` wherever you mirror default class paths.

Do not put paths to private example repositories in public end-user documentation — patterns are described in general terms in the skill.
