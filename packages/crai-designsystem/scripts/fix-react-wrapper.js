import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const packageRoot = path.resolve(__dirname, '..');
const componentsDir = path.join(packageRoot, 'gen', 'crai-designsystem-react', 'src', 'components');

if (!fs.existsSync(componentsDir)) {
  console.error(`Directory not found: ${componentsDir}`);
  process.exit(1);
}

console.log(`Fixing React wrappers in ${componentsDir}...`);

function getFiles(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach(file => {
    file = path.join(dir, file);
    const stat = fs.statSync(file);
    if (stat && stat.isDirectory()) {
      results = results.concat(getFiles(file));
    } else {
      if (file.endsWith('.ts')) {
        results.push(file);
      }
    }
  });
  return results;
}

const files = getFiles(componentsDir);

files.forEach(file => {
  let content = fs.readFileSync(file, 'utf-8');
  let changed = false;

  // Fix import path
  // from: @cr-ai/designsystem/src/components/crai-button/crai-button.component.js
  // to:   @cr-ai/designsystem/crai-button.js
  const importRegex = /@cr-ai\/designsystem\/src\/components\/([^/]+)\/([^/]+).component.js/g;
  if (importRegex.test(content)) {
    content = content.replace(importRegex, (match, dir, name) => {
      // Assuming the file base name matches the export we want.
      // crai-button.component.js -> crai-button.js
      return `@cr-ai/designsystem/${name}.js`;
    });
    changed = true;
  }

  // Fix tagName: 'undefined'
  // Assuming the component name matches the directory name logic or file name
  // e.g. path/crai-button/crai-button.component.ts -> crai-button
  const folderName = path.basename(path.dirname(file));
  const tagRegex = /tagName: 'undefined'/g;
  if (tagRegex.test(content)) {
    content = content.replace(tagRegex, `tagName: '${folderName}'`);
    changed = true;
  }

  if (changed) {
    fs.writeFileSync(file, content, 'utf-8');
    console.log(`Fixed ${path.basename(file)}`);
  }
});
