const fs = require('fs-extra');
const path = require('path');
const { execSync } = require('child_process');

const rootDir = process.cwd();
const packagesDir = path.join(rootDir, 'packages');
const appsDir = path.join(rootDir, 'Apps');

function forceRemove(dir) {
  try {
    fs.removeSync(dir);
    console.log(`Removed ${dir}`);
  } catch (error) {
    console.error(`Failed to remove ${dir}. Trying with rm -rf...`);
    try {
      execSync(`rm -rf "${dir}"`, { stdio: 'inherit' });
      console.log(`Removed ${dir} with rm -rf`);
    } catch (rmError) {
      console.error(`Failed to remove ${dir} with rm -rf. Please remove it manually.`);
    }
  }
}

function cleanDirectory(dir) {
  console.log(`Cleaning ${dir}...`);
  
  // Remove package-lock.json
  const lockFile = path.join(dir, 'package-lock.json');
  if (fs.existsSync(lockFile)) {
    fs.removeSync(lockFile);
    console.log(`Removed ${lockFile}`);
  }
  
  // Remove node_modules
  const nodeModules = path.join(dir, 'node_modules');
  if (fs.existsSync(nodeModules)) {
    forceRemove(nodeModules);
  }
}

// Clean root directory
cleanDirectory(rootDir);

// Clean packages
fs.readdirSync(packagesDir).forEach(packageName => {
  const packageDir = path.join(packagesDir, packageName);
  if (fs.statSync(packageDir).isDirectory()) {
    cleanDirectory(packageDir);
  }
});

// Clean Apps
fs.readdirSync(appsDir).forEach(appName => {
  const appDir = path.join(appsDir, appName);
  if (fs.statSync(appDir).isDirectory()) {
    cleanDirectory(appDir);
  }
});

console.log('Aggressive cleanup completed.');