# CRAI Design System

Welcome to the CRAI Design System monorepo. This project contains a collection of reusable, framework-agnostic Web Components built with [StencilJS](https://stenciljs.com/).

## About This Project

This repository is a monorepo managed by npm workspaces. It is structured to house the core design system and potentially other related packages in the future.

### Packages

- `packages/designsystem`: The core component library, published to npm as `@cr-ai/designsystem`. This is where all the components like `crai-button` and `crai-text-input` live.

## Getting Started

### Prerequisites

- Node.js (LTS version recommended)
- npm (v7 or later for workspace support)

### Development

1.  **Clone the repository:**

    ```bash
    git clone https://github.com/your-username/CRAI-Designsystem.git
    cd CRAI-Designsystem
    ```

2.  **Install dependencies:**
    Running `npm install` from the root directory will install dependencies for all packages in the monorepo.

    ```bash
    npm install
    ```

3.  **Start the development server:**
    To start the development server for the `designsystem` package, run the following command from the root directory:
    ```bash
    npm start -w @cr-ai/designsystem
    ```
    This will open a browser with a live-reloading preview of the components.

## Using the Design System Package

To use the components in your own project, you can install the package from npm.

### Installation

```bash
npm install @cr-ai/designsystem
```

### Usage

For the components to render correctly, you need to import the stylesheet into your project. You can do this by adding the following line to your main JavaScript or TypeScript file:

```javascript
import '@cr-ai/designsystem/dist/designsystem/designsystem.css';
```

After installation, you can use the components in your HTML like any other element.

```html
<crai-button>Click Me</crai-button>
```

For more detailed documentation on individual components and their properties, please refer to the `readme.md` file within the `packages/designsystem` directory.
