# CRAI Design System

A collection of reusable, framework-agnostic Web Components built with [StencilJS](https://stenciljs.com/). The CRAI Design System provides a set of high-quality UI components designed for consistency and accessibility.

## Installation

Install the package from npm:

```bash
npm install @cr-ai/designsystem
```

For the components to render correctly, you also need to import the stylesheet. You can do this by adding the following line to your main JavaScript or TypeScript file:

```javascript
import '@cr-ai/designsystem/dist/designsystem/designsystem.css';
```

## Development

### Setup

```bash
npm install
npm start
```

### Build

```bash
npm run build
```

### Testing

```bash
npm test
```

Watch mode:

```bash
npm run test.watch
```

### Generate New Component

```bash
npm run generate
```

## Publishing

To publish a new version to npm:

1. Update the version in `package.json`
2. Build the package: `npm run build`
3. Publish: `npm publish`

## License

MIT

### Lazy Loading

If your Stencil project is built with the [`dist`](https://stenciljs.com/docs/distribution) output target, you can import a small bootstrap script that registers all components and allows you to load individual component scripts lazily.

For example, given your Stencil project namespace is called `my-design-system`, to use `my-component` on any website, inject this into your HTML:

```html
<script type="module" src="https://unpkg.com/my-design-system"></script>
<!--
To avoid unpkg.com redirects to the actual file, you can also directly import:
https://unpkg.com/foobar-design-system@0.0.1/dist/foobar-design-system/foobar-design-system.esm.js
-->
<my-component first="Stencil" middle="'Don't call me a framework'" last="JS"></my-component>
```

This will only load the necessary scripts needed to render `<my-component />`. Once more components of this package are used, they will automatically be loaded lazily.

You can also import the script as part of your `node_modules` in your applications entry file:

```tsx
import 'foobar-design-system/dist/foobar-design-system/foobar-design-system.esm.js';
```

Check out this [Live Demo](https://stackblitz.com/edit/vitejs-vite-y6v26a?file=src%2Fmain.tsx).

### Standalone

If you are using a Stencil component library with `dist-custom-elements`, we recommend importing Stencil components individually in those files where they are needed.

To export Stencil components as standalone components make sure you have the [`dist-custom-elements`](https://stenciljs.com/docs/custom-elements) output target defined in your `stencil.config.ts`.

For example, given you'd like to use `<my-component />` as part of a React component, you can import the component directly via:

```tsx
import 'foobar-design-system/my-component';

function App() {
  return (
    <>
      <div>
        <my-component first="Stencil" middle="'Don't call me a framework'" last="JS"></my-component>
      </div>
    </>
  );
}

export default App;
```

Check out this [Live Demo](https://stackblitz.com/edit/vitejs-vite-b6zuds?file=src%2FApp.tsx).
