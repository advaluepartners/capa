const { execSync } = require('child_process');
const fs = require('fs-extra');
const path = require('path');

const rootDir = process.cwd();

function runCommand(command, cwd = rootDir) {
  console.log(`Running: ${command} in ${cwd}`);
  try {
    execSync(command, { stdio: 'inherit', cwd });
  } catch (error) {
    console.error(`Failed to run command: ${command}`);
    console.error(error);
    process.exit(1);
  }
}

console.log('Performing aggressive cleanup...');
runCommand('node scripts/aggressive-cleanup.js');

console.log('Installing dependencies...');
runCommand('npm install --no-package-lock --force');

console.log('Rebuilding problematic packages...');
runCommand('npm rebuild @stdlib/number-float64-base-normalize');
runCommand('npm rebuild libpg-query');
runCommand('npm rebuild sharp');

console.log('Building packages...');
runCommand('npx turbo run build');

console.log('Installation and build process completed successfully!');