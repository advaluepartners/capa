const fs = require('fs');
const path = require('path');

function patchPackageJson(packagePath) {
  const packageJsonPath = path.join(packagePath, 'package.json');
  if (fs.existsSync(packageJsonPath)) {
    const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));
    if (packageJson.scripts && packageJson.scripts.install) {
      packageJson.scripts.install = "echo 'Skipping install script'";
      fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2));
      console.log(`Patched: ${packageJsonPath}`);
    }
  }
}

const rootNodeModules = path.join(__dirname, '..', 'node_modules');
const stdlibPath = path.join(rootNodeModules, '@stdlib', 'number-float64-base-normalize');
patchPackageJson(stdlibPath);

const studioDependencies = path.join(__dirname, '..', 'Apps', 'studio', 'node_modules');
const studioStdlibPath = path.join(studioDependencies, '@stdlib', 'number-float64-base-normalize');
patchPackageJson(studioStdlibPath);