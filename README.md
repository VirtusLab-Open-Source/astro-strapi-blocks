<div align="center" style="max-width: 10rem; margin: 0 auto">
  <img style="width: 150px; height: auto;" src="https://www.sensinum.com/img/open-source/strapi-astro-blocks/logo.png" alt="Logo - Strapi Astro Blocks" />
</div>
<div align="center">
  <h1>Astro Strapi Blocks</h1>
  <p>Astro Components package for Strapi 5 Blocks Field integration</p>
  <a href="https://www.npmjs.org/package/@sensinum/astro-strapi-blocks">
    <img alt="GitHub package.json version" src="https://img.shields.io/github/package-json/v/VirtusLab-Open-Source/astro-strapi-blocks?label=npm&logo=npm">
  </a>
  <a href="https://www.npmjs.org/package/@sensinum/astro-strapi-blocks">
    <img src="https://img.shields.io/npm/dm/%40sensinum%2Fastro-strapi-blocks.svg" alt="Monthly download on NPM" />
  </a>
  <a href="https://circleci.com/gh/VirtusLab-Open-Source/astro-strapi-blocks">
    <img src="https://circleci.com/gh/VirtusLab-Open-Source/astro-strapi-blocks.svg?style=shield" alt="CircleCI" />
  </a>
  <a href="https://codecov.io/gh/VirtusLab-Open-Source/astro-strapi-blocks">
    <img src="https://codecov.io/gh/VirtusLab-Open-Source/astro-strapi-blocks/coverage.svg?branch=main" alt="codecov.io" />
  </a>
</div>

---

## Table of Contents

- 📋 [Requirements](#requirements)
- 📦 [Installation](#installation)
- 🚀 [Features](#features)
- 🖥️ [Usage](#usage)
- ⚙️ [Configuration](#configuration)
- 🔧 [Development](#development)
- 🤝 [Contributing](#contributing)
- 📄 [License](#license)

## 📋 Requirements

- Astro ^5.5.0

## 📦 Installation

```bash
yarn add @sensinum/astro-strapi-blocks@latest
```

```bash
npm install @sensinum/astro-strapi-blocks@latest
```

## 🚀 Features

- ✨ Comprehensive support for Strapi 5 Blocks Field with built-in types:
  - 📌 Headers (H1 - H6)
  - 📝 Paragraph with formatting (italic, bold, underline, strikethrough, link)
  - 📑 Quote with formatting (italic, bold, underline, strikethrough, link)
  - 📋 List (ordered and unordered)
  - 💻 Code blocks
  - 🖼️ Image blocks
- 🎨 Flexible block class configuration for custom styling
- 🔄 Custom block components support:
  - 🎯 Override default block rendering
  - ⚡ Full control over block output
- 🛠️ TypeScript support with full type definitions

## 🖥️ Usage

```astro
---
import { StrapiBlocks } from '@sensinum/astro-strapi-blocks';
---

<StrapiBlocks 
  data={strapiBlockData}
  class="custom-class"
  blocks={{
    code: CustomCodeBlock,
    heading: CustomHeadingBlock,
    paragraph: CustomParagraphBlock
  }}
  theme={{
    extend: { // 'extend' and/or 'overwrite'
      paragraph: {
        block: ['custom-paragraph-class'],
        strong: ['custom-strong-class'],
        italic: ['custom-em-class'],
        link: ['custom-link-class']
      },
      heading: {
        block: ['custom-heading-class']
      },
      list: {
        block: ['custom-list-class']
      },
      quote: {
        block: ['custom-quote-class']
      },
      code: {
        block: ['custom-code-class']
      },
      image: {
        block: ['custom-image-class']
      }
    }
  }}
/>
```

## ⚙️ Configuration

### Properties

| Property    | Type     | Description |
|------------|----------|-------------|
| `data`     | `StrapiBlockField` | Required. The Strapi block data to render. This should be the raw block data from your Strapi API response. |
| `class`    | `string` | Optional. Additional CSS classes to apply to the component wrapper. |
| `theme`    | `StrapiBlockUserTheme` | Optional. Theme configuration for blocks. Allows for extending or overwriting default styles. |
| `blocks`   | `Record<string, AstroComponent>` | Optional. Custom components for specific block types. Use this to override default block rendering. Example: `{ code: CustomCodeBlock }` |

### Theme Configuration

The `theme` property allows you to customize the styling of different block types and their nested elements. You can either extend the default theme or completely overwrite it. Here's a detailed breakdown of the configuration options:

```typescript
type StrapiBlockUserTheme = {
  extend?: {
    block?: string[];
    heading?: {
      block?: string[];
      h1?: string[];
      h2?: string[];
      h3?: string[];
      h4?: string[];
      h5?: string[];
      h6?: string[];
      content: {
        block?: string[];
        span?: string[];
        strong?: string[];
        italic?: string[];
        underline?: string[];
        strikethrough?: string[];
        link?: string[];
      } 
    };
    paragraph?: {
      block?: string[];
      span?: string[];
      strong?: string[];
      italic?: string[];
      underline?: string[];
      strikethrough?: string[];
      link?: string[];
    };
    quote?: {
      block?: string[];
      span?: string[];
      strong?: string[];
      italic?: string[];
      underline?: string[];
      strikethrough?: string[];
      link?: string[];
    };
    list?: {
      block?: string[];
      ordered?: string[];
      unordered?: string[];
      item?: string[];
    };
    code?: {
      block?: string[];
      language?: string[];
    };
    image?: {
      block?: string[];
      image?: string[];
      caption?: string[];
    };
  };
  overwrite?: {
    // Same structure as extend, but will replace default values instead of extending them
  };
}
```

#### Default Theme Reference

Here's the complete default theme object that you can use as a reference when extending or overwriting:

```typescript
const StrapiBlockThemeDefault = {
  block: ['mb-4'],
  heading: {
    block: ['mb-4'],
    h1: ['text-4xl', 'font-bold', 'mb-4'],
    h2: ['text-3xl', 'font-bold', 'mb-3'],
    h3: ['text-2xl', 'font-bold', 'mb-3'],
    h4: ['text-xl', 'font-bold', 'mb-2'],
    h5: ['text-lg', 'font-bold', 'mb-2'],
    h6: ['text-base', 'font-bold', 'mb-2'],
    content: {},
  },
  paragraph: {
    block: ['mb-4'],
    span: [''],
    strong: ['font-bold'],
    italic: ['italic'],
    underline: ['underline'],
    strikethrough: ['line-through'],
    link: ['text-blue-600', 'hover:underline']
  },
  quote: {
    block: ['border-l-4', 'border-gray-300', 'pl-4', 'italic', 'mb-4'],
    span: [''],
    strong: ['font-bold'],
    italic: ['italic'],
    underline: ['underline'],
    strikethrough: ['line-through'],
    link: ['text-blue-600', 'hover:underline']
  },
  list: {
    block: ['mb-4'],
    ordered: ['list-decimal', 'list-inside'],
    unordered: ['list-disc', 'list-inside'],
    item: ['mb-1']
  },
  code: {
    block: ['bg-gray-100', 'p-4', 'rounded', 'mb-4', 'font-mono', 'text-sm'],
    language: ['text-gray-600', 'text-sm', 'mb-2']
  },
  image: {
    block: ['mb-4'],
    image: ['max-w-full', 'h-auto', 'rounded'],
    caption: ['text-gray-600', 'text-sm mt-2']
  }
}
```

This default theme provides a clean, modern look using Tailwind CSS classes. You can use this as a starting point for your custom themes.

#### Examples

1. Extending default theme:
```astro
<StrapiBlocks 
  theme={{
    extend: {
      paragraph: {
        block: ['my-paragraph-class'],
        strong: ['font-bold', 'text-primary'],
        italic: ['italic', 'text-secondary'],
        link: ['text-accent', 'hover:underline']
      },
      heading: {
        block: ['my-heading-class'],
        h1: ['text-4xl', 'font-bold']
      }
    }
  }}
/>
```

2. Overwriting default theme:
```astro
<StrapiBlocks 
  theme={{
    overwrite: {
      paragraph: {
        block: ['my-paragraph-class'],
        strong: ['font-bold'],
        italic: ['italic'],
        link: ['text-blue-500']
      }
    }
  }}
/>
```

3. Mixed configuration (extend and overwrite):
```astro
<StrapiBlocks 
  theme={{
    extend: {
      paragraph: {
        strong: ['font-bold'],
        italic: ['italic']
      }
    },
    overwrite: {
      heading: {
        block: ['text-2xl'],
        h1: ['text-4xl', 'font-bold']
      }
    }
  }}
/>
```

The default theme includes Tailwind CSS classes for common styling needs. You can extend or overwrite these classes to match your design requirements.

### Component Customization

You can override any built-in block component with your own Astro component. This allows for complete control over the rendering of each block type while maintaining the same input props structure.

#### Usage

```astro
---
import { StrapiBlocks } from '@sensinum/astro-strapi-blocks';
import MyCustomHeading from '../components/MyCustomHeading.astro';
import MyCustomParagraph from '../components/MyCustomParagraph.astro';
---

<StrapiBlocks 
  data={strapiBlockData}
  blocks={{
    heading: MyCustomHeading,
    paragraph: MyCustomParagraph
  }}
/>
```

#### Available Block Types

You can override any of the following block types:
- `heading` - For header blocks (H1-H6)
- `paragraph` - For paragraph blocks
- `quote` - For quote blocks
- `list` - For ordered and unordered lists
- `code` - For code blocks
- `image` - For image blocks

#### Block Type Properties

Each block type has its own specific properties. Here's a detailed breakdown of all available properties for each block type:

##### Heading Block
```typescript
type HeadingBlockProps = {
  data: Array<StrapiBlockNode>;  // Text content nodes
  class?: string;                // Additional CSS classes
  theme: StrapiBlockTheme;       // Theme configuration
  level: 1 | 2 | 3 | 4 | 5 | 6; // Heading level (h1-h6)
}
```

##### Paragraph Block
```typescript
type ParagraphBlockProps = {
  data: Array<StrapiBlockNode>;  // Text content nodes with formatting
  class?: string;                // Additional CSS classes
  theme: StrapiBlockTheme;       // Theme configuration
}
```

##### Quote Block
```typescript
type QuoteBlockProps = {
  data: Array<StrapiBlockNode>;  // Text content nodes with formatting
  class?: string;                // Additional CSS classes
  theme: StrapiBlockTheme;       // Theme configuration
}
```

##### List Block
```typescript
type ListBlockProps = {
  data: Array<StrapiBlockNode>;  // List items
  class?: string;                // Additional CSS classes
  theme: StrapiBlockTheme;       // Theme configuration
  format: 'ordered' | 'unordered'; // List type
}
```

##### Code Block
```typescript
type CodeBlockProps = {
  data: Array<StrapiBlockNode>;  // Code content nodes
  class?: string;                // Additional CSS classes
  theme: StrapiBlockTheme;       // Theme configuration
  language: string;              // Programming language
}
```

##### Image Block
```typescript
type ImageBlockProps = {
  data: Array<StrapiBlockNode>;  // Image content nodes
  class?: string;                // Additional CSS classes
  theme: StrapiBlockTheme;       // Theme configuration
  url: string;                   // Image URL
  alternativeText?: string;      // Alt text for accessibility
  caption?: string;              // Image caption
}
```

#### Example Custom Component

Here's an example of a custom heading component:

```astro
---
// MyCustomHeading.astro
import { renderPropertyClasses } from '@sensinum/astro-strapi-blocks';
import type { StrapiBlockNode, StrapiBlockTheme } from '@sensinum/astro-strapi-blocks';

type Props = {
  data: Array<StrapiBlockNode>;
  class?: string;
  theme: StrapiBlockTheme;
  level?: 1 | 2 | 3 | 4 | 5 | 6;
}

const { data, class: classes = '', theme, level = 1 } = Astro.props;
const Tag = `h${level}`;
---

<Tag class={renderPropertyClasses(theme, ['heading', `h${level}`], classes)}>
  {data.map((item) => item.text).join('')}
</Tag>
```

## 🔧 Development

1. Clone the repository
2. Install dependencies:
   ```bash
   yarn
   ```
3. Run development mode:
   ```bash
   yarn dev
   ```
4. Check types:
   ```bash
   yarn check
   ```

## 🤝 Contributing

We welcome contributions to this project! Here's how you can help:

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

Please make sure to:
- Follow the existing code style
- Write tests for new features
- Update documentation as needed
- Keep your PR focused and concise

## 📄 License

Copyright © [Sensinum](https://sensinum.com) & [VirtusLab](https://virtuslab.com)

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details. 