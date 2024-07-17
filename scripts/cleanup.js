const fs = require('fs-extra');
const path = require('path');
const { execSync } = require('child_process');

const rootDir = process.cwd();
const packagesDir = path.join(rootDir, 'packages');
const appsDir = path.join(rootDir, 'Apps');

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
    fs.removeSync(nodeModules);
    console.log(`Removed ${nodeModules}`);
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

console.log('Cleanup completed successfully!');