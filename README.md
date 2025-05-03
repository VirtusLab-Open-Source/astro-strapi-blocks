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
  - 📝 Paragraph with formatting (italic, bold, underline, strikethrough, link)
  - 📑 Quote with formatting (italic, bold, underline, strikethrough, link)
  - 📋 List (ordered and unordered)
  - 💻 Code blocks
  - 🖼️ Image blocks
  - 📌 Headers (H1 - H6)
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
  color="primary"
  blockClass={{
    paragraph: {
      strong: "custom-strong-class",
      em: "custom-em-class",
      a: "custom-link-class",
      master: "custom-paragraph-class"
    },
    heading: "custom-heading-class",
    list: "custom-list-class",
    quote: "custom-quote-class",
    code: "custom-code-class",
    image: "custom-image-class"
  }}
/>
```

## ⚙️ Configuration

### Properties

| Property    | Type     | Description |
|------------|----------|-------------|
| `data`     | `StrapiBlockField` | Required. The Strapi block data to render. This should be the raw block data from your Strapi API response. |
| `class`    | `string` | Optional. Additional CSS classes to apply to the component wrapper. |
| `color`    | `FontColors` | Optional. Color theme for the block content. Available values: `primary`, `secondary`, `accent`, etc. As well you can parametrize it. |
| `blockClass` | `StrapiBlockClassExtension` | Optional. Custom class extension for specific block types. Allows for block-specific styling. |

### Block Class Configuration

The `blockClass` property allows you to customize the styling of different block types and their nested elements. Here's a detailed breakdown of the configuration options:

```typescript
type BlockClassConfig = {
  // Paragraph block configuration
  paragraph?: string | {
    // Nested elements within paragraph
    strong?: string;  // Custom class for <strong> elements
    em?: string;     // Custom class for <em> elements
    a?: string;      // Custom class for <a> elements
    s?: string;
    u?: string;
    master?: string; // Master class for the entire paragraph
  };
  
  // Heading block configuration
  heading?: string;  // Custom class for heading elements
  
  // List block configuration
  list?: string;     // Custom class for list elements
  
  // Quote block configuration
  quote?: string;     // Custom class for quote elements

  // Code block configuration
  code?: string;     // Custom class for code elements

  // Image block configuration
  image?: string;     // Custom class for image elements
}
```

#### Examples

1. Simple string configuration:
```astro
<StrapiBlocks 
  blockClass={{
    paragraph: "my-paragraph-class",
    heading: "my-heading-class",
    list: "my-list-class"
  }}
/>
```

2. Detailed paragraph configuration:
```astro
<StrapiBlocks 
  blockClass={{
    paragraph: {
      strong: "font-bold text-primary",
      em: "italic text-secondary",
      a: "text-accent hover:underline",
      master: "text-base leading-relaxed"
    }
  }}
/>
```

3. Mixed configuration:
```astro
<StrapiBlocks 
  blockClass={{
    paragraph: {
      strong: "font-bold",
      master: "text-base"
    },
    heading: "text-2xl font-bold",
    list: "list-disc pl-4"
  }}
/>
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