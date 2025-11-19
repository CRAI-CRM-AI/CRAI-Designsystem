import { Config } from '@stencil/core';
import { reactOutputTarget } from '@stencil/react-output-target';

export const config: Config = {
  namespace: 'designsystem',
  globalStyle: 'src/components/global/app.css',
  outputTargets: [
    {
      type: 'dist',
      esmLoaderPath: '../loader',
    },
    reactOutputTarget({
      // Relative path to where the React components will be generated
      outDir: '../designsystem-react/lib/components/stencil-generated',
    }),
    {
      type: 'dist-custom-elements',
      generateTypeDeclarations: true,
      externalRuntime: false,
    },
    {
      type: 'dist-hydrate-script',
    },
    {
      type: 'docs-readme',
    },
    {
      type: 'www',
      serviceWorker: null, // disable service workers
    },
  ],
  testing: {
    browserHeadless: 'shell',
  },
};
