const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const rootDir = process.cwd();
const packagesDir = path.join(rootDir, 'packages');
const studioDir = path.join(rootDir, 'Apps', 'studio');

function runCommand(command, cwd = rootDir) {
  console.log(`Running: ${command} in ${cwd}`);
  try {
    execSync(command, { stdio: 'inherit', cwd });
  } catch (error) {
    console.error(`Failed to run command: ${command}`);
    process.exit(1);
  }
}

// Install root dependencies
console.log('Installing root dependencies...');
runCommand('npm install --no-package-lock');

// Build and link local packages
console.log('Building and linking local packages...');
fs.readdirSync(packagesDir).forEach(packageName => {
  const packageDir = path.join(packagesDir, packageName);
  if (fs.statSync(packageDir).isDirectory()) {
    console.log(`Building package: ${packageName}`);
    runCommand('npm install --no-package-lock', packageDir);
    runCommand('npm run build', packageDir);
    runCommand('npm link', packageDir);
  }
});

// Install studio dependencies
console.log('Installing studio dependencies...');
runCommand('npm install --no-package-lock', studioDir);

// Link local packages in studio
console.log('Linking local packages in studio...');
fs.readdirSync(packagesDir).forEach(packageName => {
  const packageDir = path.join(packagesDir, packageName);
  if (fs.statSync(packageDir).isDirectory()) {
    console.log(`Linking package: ${packageName} in studio`);
    runCommand(`npm link ${packageName}`, studioDir);
  }
});

console.log('Installation completed successfully!');