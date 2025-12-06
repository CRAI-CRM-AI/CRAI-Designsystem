import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const packageRoot = path.resolve(__dirname, '..');
const reactPackageDir = path.join(packageRoot, 'gen', 'crai-designsystem-react');
const packageJsonPath = path.join(reactPackageDir, 'package.json');
const tsconfigPath = path.join(reactPackageDir, 'tsconfig.json');

console.log(`Fixing React package configuration in ${reactPackageDir}...`);

// Fix package.json
if (fs.existsSync(packageJsonPath)) {
  try {
    const pkg = JSON.parse(fs.readFileSync(packageJsonPath, 'utf-8'));
    let changed = false;

    // Ensure files include 'components'
    if (!pkg.files) {
      pkg.files = [];
      changed = true;
    }
    if (!pkg.files.includes('components')) {
      pkg.files.push('components');
      changed = true;
    }

    // Ensure prepublishOnly script exists
    if (!pkg.scripts) {
      pkg.scripts = {};
      changed = true;
    }
    if (pkg.scripts.prepublishOnly !== 'npm run build') {
      pkg.scripts.prepublishOnly = 'npm run build';
      changed = true;
    }

    if (changed) {
      fs.writeFileSync(packageJsonPath, JSON.stringify(pkg, null, 2), 'utf-8');
      console.log('Fixed package.json');
    } else {
      console.log('package.json already up to date');
    }
  } catch (err) {
    console.error('Error parsing/writing package.json:', err);
  }
} else {
  console.error('package.json not found');
}

// Fix tsconfig.json
if (fs.existsSync(tsconfigPath)) {
  try {
    const tsconfig = JSON.parse(fs.readFileSync(tsconfigPath, 'utf-8'));
    let changed = false;

    if (!tsconfig.compilerOptions) {
      tsconfig.compilerOptions = {};
      changed = true;
    }

    if (tsconfig.compilerOptions.skipLibCheck !== true) {
      tsconfig.compilerOptions.skipLibCheck = true;
      changed = true;
    }

    if (changed) {
      fs.writeFileSync(tsconfigPath, JSON.stringify(tsconfig, null, 2), 'utf-8');
      console.log('Fixed tsconfig.json');
    } else {
      console.log('tsconfig.json already up to date');
    }
  } catch (err) {
    console.error('Error parsing/writing tsconfig.json:', err);
  }
} else {
  console.error('tsconfig.json not found');
}
