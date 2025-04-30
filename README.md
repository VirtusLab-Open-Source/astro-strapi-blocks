# Astro Strapi Blocks

Astro components package for Strapi integration.

## Table of Contents

- 📋 [Requirements](#requirements)
- 📦 [Installation](#installation)
- 🚀 [Usage](#usage)
- ⚙️ [Properties](#properties)
- 🔧 [Development](#development)
- 🤝 [Contributing](#contributing)
- 📄 [License](#license)

## 📋 Requirements

- Astro ^4.5.0
- TailwindCSS ^3.4.0

## 📦 Installation

```bash
yarn add astro-strapi-blocks
```

## 🚀 Usage

```astro
---
import { StrapiBlocks } from 'astro-strapi-blocks';
---

<StrapiBlocks 
  data={strapiBlockData}
  class="custom-class"
  color="primary"
  blockClass="custom-block-class"
/>
```

## ⚙️ Properties

| Property    | Type     | Description |
|------------|----------|-------------|
| `data`     | `StrapiBlockField` | Required. The Strapi block data to render. This should be the raw block data from your Strapi API response. |
| `class`    | `string` | Optional. Additional CSS classes to apply to the component wrapper. |
| `color`    | `FontColors` | Optional. Color theme for the block content. Available values: `primary`, `secondary`, `accent`, etc. As well you can parametrize it. |
| `blockClass` | `StrapiBlockClassExtension` | Optional. Custom class extension for specific block types. Allows for block-specific styling. |

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