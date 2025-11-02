import { Config } from '@stencil/core';
import { reactOutputTarget } from '@stencil/react-output-target';

export const config: Config = {
  namespace: 'designsystem-core',
  outputTargets: [
    reactOutputTarget({
      // Relative path to where the React components will be generated
      outDir: '../designsystem-react/lib/components/stencil-generated/',
      hydrateModule: 'designsystem-core/hydrate',
      clientModule: 'designsystem-core/client',
      customElementsDir: '../designsystem-core/components',
    }),
    { type: 'dist-hydrate-script' },
    {
      type: 'dist',
      esmLoaderPath: '../loader',
    },
    {
      type: 'dist-custom-elements',
      customElementsExportBehavior: 'auto-define-custom-elements',
      externalRuntime: false,
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
