# Reference: theme paths and types

## Theme merge semantics

- Objects: deep merge of keys.
- Arrays of class strings: under **`extend`**, new classes append to defaults; under **`overwrite`**, the property’s array is replaced.

## Useful `renderPropertyClasses` / `getPropertyClass` paths

Top-level: `block` (root wrapper in default theme), then `heading`, `paragraph`, `quote`, `list`, `code`, `image`.

Examples:

- `['paragraph', 'block']`, `['paragraph', 'link']`
- `['heading', 'h2']`, `['heading', 'content', 'strong']`
- `['list', 'ordered']`, `['list', 'item']`, `['list', 'indent', 'unordered']` (for arrays indexed by depth, use `getPropertyClass` and subscript, not a single `renderPropertyClasses` on `indent` alone if you need per level)

## `StrapiBlockUserTheme` (conceptual)

- `extend?`: `DeepPartial` of the full resolved theme; arrays concat with defaults.
- `overwrite?`: same shape; arrays replace at each leaf.

Import `StrapiBlockUserTheme` and related types from `@sensinum/astro-strapi-blocks` in consuming apps.

## Block map keys (override)

`heading` | `paragraph` | `quote` | `list` | `code` | `image`
