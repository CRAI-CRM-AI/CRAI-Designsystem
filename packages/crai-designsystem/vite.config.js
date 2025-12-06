import { defineConfig, loadEnv } from 'vite';
import { viteStaticCopy } from 'vite-plugin-static-copy';
import generateFile from 'vite-plugin-generate-file';
import dts from 'vite-plugin-dts';
import fs from 'fs';
import path from 'path';

const OUTPUT_DIRECTORY = 'dist';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');

  if (!env.DEPLOY_TARGET) {
    console.log("No DEPLOY_TARGET specified, defaulting to 'npm'");
    env.DEPLOY_TARGET = 'npm';
  }

  // generate a list of components from the components directory.
  // this is used to create a library entry for each component
  const listOfComponents = (function () {
    const componentsDirectory = './src/components';

    const files = fs.readdirSync(componentsDirectory, {
      recursive: true,
    });

    const entries = {};

    files.forEach(file => {
      if (process.platform === 'win32') {
        file = file.replace(/\\/g, '/');
      }

      let fileName = path.posix.basename(file);

      if (fileName && fileName.startsWith('crai-') && fileName.endsWith('.ts') && fileName.includes('.component.')) {
        let customeElementSelector = path.basename(file, '.component.ts');
        entries[customeElementSelector] = `${componentsDirectory}/${file}`;
      }
    });

    return entries;
  })();

  // create a virtual module that exports all components defined in the listOfComponents
  const virtualLibraryModule = (function () {
    let code = '';

    Object.values(listOfComponents).forEach(value => {
      code += `export * from '${value}';`;
    });

    return {
      path: 'virtual:CraiLibrary',
      code,
    };
  })();

  // https://vite.dev/guide/api-plugin.html#virtual-modules-convention
  function resolveVirtualModule({ moduleId, moduleContent }) {
    const virtualModuleId = moduleId;
    const resolvedVirtualModuleId = '\0' + moduleId;

    return {
      name: 'vite-plugin-crai-resolve-virtual-module',
      resolveId(id) {
        if (id.endsWith(virtualModuleId)) {
          return resolvedVirtualModuleId;
        }
      },
      load(id) {
        if (id === resolvedVirtualModuleId) {
          return moduleContent;
        }
      },
    };
  }

  switch (env.DEPLOY_TARGET) {
    case 'cdn':
      return {
        plugins: [
          resolveVirtualModule({
            moduleId: virtualLibraryModule.path,
            moduleContent: virtualLibraryModule.code,
          }),
          generateFile({
            output: './index.html',
          }),
          viteStaticCopy({
            targets: [
              {
                src: 'staticwebapp.config.json',
                dest: './',
              },
              {
                src: '.temp/custom-elements.json',
                dest: './',
              },
              {
                src: '.temp/web-types.json',
                dest: './',
              },
            ],
          }),
        ],
        build: {
          cssCodeSplit: true,
          lib: {
            formats: ['es'],
            entry: {
              'theme/default.css': './src/theme/default.css',
              'crai-designsystem': virtualLibraryModule.path,
            },
          },
          sourcemap: true,
          outDir: `${OUTPUT_DIRECTORY}/cdn`,
        },
      };
    case 'github':
    case 'npm':
      return {
        plugins: [
          resolveVirtualModule({
            moduleId: virtualLibraryModule.path,
            moduleContent: virtualLibraryModule.code,
          }),
          viteStaticCopy({
            targets: [
              {
                src: 'package.json',
                dest: './',
              },
              {
                src: 'README.md',
                dest: './',
              },
              {
                src: '.temp/custom-elements.json',
                dest: './',
              },
              {
                src: '.temp/web-types.json',
                dest: './',
              },
            ],
          }),
          dts({
            outDir: `${OUTPUT_DIRECTORY}/${env.DEPLOY_TARGET}`,
            include: ['src/components'],
            afterBuild: () => {
              const dtsDir = path.join(process.cwd(), OUTPUT_DIRECTORY, env.DEPLOY_TARGET);
              const componentKeys = Object.keys(listOfComponents);

              // Move component declaration files
              componentKeys.forEach(key => {
                const possiblePath1 = path.join(dtsDir, 'src', 'components', key, `${key}.component.d.ts`);
                const possiblePath2 = path.join(dtsDir, 'components', key, `${key}.component.d.ts`);
                const targetPath = path.join(dtsDir, `${key}.d.ts`);

                if (fs.existsSync(possiblePath1)) {
                  fs.renameSync(possiblePath1, targetPath);
                } else if (fs.existsSync(possiblePath2)) {
                  fs.renameSync(possiblePath2, targetPath);
                }
              });

              // Generate index.d.ts
              const indexDtsContent = componentKeys.map(key => `export * from './${key}';`).join('\n');
              fs.writeFileSync(path.join(dtsDir, 'index.d.ts'), indexDtsContent);
            },
          }),
        ],
        build: {
          cssCodeSplit: true,
          lib: {
            formats: ['es'],
            entry: {
              'theme/default.css': './src/theme/default.css',
              index: virtualLibraryModule.path,
              ...listOfComponents,
            },
          },
          sourcemap: true,
          rollupOptions: {
            output: {
              globals: {
                lit: 'lit',
              },
            },
          },
          outDir: `${OUTPUT_DIRECTORY}/${env.DEPLOY_TARGET}`,
        },
      };
    default:
      throw Error(`Unknown DEPLOY_TARGET: ${env.DEPLOY_TARGET}. DEPLOY_TARGET should be one of these: npm, cdn`);
  }
});
