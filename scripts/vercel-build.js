const { execSync } = require('child_process');
const path = require('path');

console.log('Starting verbose build process...');

// Install dependencies in the root
console.log('Installing root dependencies...');
execSync('npm install --verbose', { stdio: 'inherit' });

// Change to the Apps/studio directory
console.log('Changing to Apps/studio directory...');
process.chdir(path.join(__dirname, 'Apps', 'studio'));

// Install dependencies in the Apps/studio directory
console.log('Installing Apps/studio dependencies...');
execSync('npm install --verbose', { stdio: 'inherit' });

// Run the build command in the Apps/studio directory
console.log('Building Apps/studio...');
execSync('npm run build -- --verbose', { stdio: 'inherit' });

console.log('Build process completed.');