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
- TailwindCSS ^4.0.0

## 📦 Installation

```bash
yarn add @sensinum/astro-strapi-blocks
```

```bash
npm install @sensinum/astro-strapi-blocks
```

## 🚀 Features

- ✨ Comprehensive support for Strapi 5 Blocks Field with built-in types:
  - 📌 Headers (H1 - H6)
  - 📝 Paragraph with formatting (italic, bold, underline, strikethrough, link)
  - 📑 Quote with formatting (italic, bold, underline, strikethrough, link)
  - 📋 List (ordered and unordered)
  - 💻 Code blocks
  - 🖼️ Image blocks
- 🎯 Flexible block class configuration for custom styling
- 🛠️ TypeScript support with full type definitions

## 🖥️ Usage

```astro
---
import StrapiBlocks from '@sensinum/astro-strapi-blocks';
---

<StrapiBlocks 
  data={strapiBlockData}
  class="custom-class"
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

#### Examples

1. Extending default theme:
```astro
<StrapiBlocks 
  theme={{
    extend: {
      paragraph: {
        block: ['my-paragraph-class'],
        strong: ['font-bold text-primary'],
        italic: ['italic text-secondary'],
        link: ['text-accent hover:underline']
      },
      heading: {
        block: ['my-heading-class'],
        h1: ['text-4xl font-bold']
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
        h1: ['text-4xl font-bold']
      }
    }
  }}
/>
```

The default theme includes Tailwind CSS classes for common styling needs. You can extend or overwrite these classes to match your design requirements.

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