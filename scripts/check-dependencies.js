const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const studioDir = path.join(__dirname, '..', 'Apps', 'studio');
const packagesToCheck = ['node-gyp', '@stdlib/number-float64-base-normalize'];

function runCommand(command, cwd = studioDir) {
    try {
        return execSync(command, { encoding: 'utf8', cwd });
    } catch (error) {
        console.error(`Error running command: ${command}`);
        console.error(error.message);
        return '';
    }
}

function searchForUsage(packageName) {
    console.log(`Searching for usage of ${packageName}...`);
    const grepCommand = `grep -R "${packageName}" . --exclude-dir=node_modules`;
    const result = runCommand(grepCommand);
    console.log(result || 'No direct usage found.');
}

function checkDependencyTree(packageName) {
    console.log(`Checking dependency tree for ${packageName}...`);
    const npmLsCommand = `npm ls ${packageName}`;
    const result = runCommand(npmLsCommand);
    console.log(result || `${packageName} not found in dependency tree.`);
}

function checkBuildScripts() {
    console.log('Checking build scripts...');
    const packageJson = JSON.parse(fs.readFileSync(path.join(studioDir, 'package.json'), 'utf8'));
    const buildScripts = Object.entries(packageJson.scripts || {})
        .filter(([name, script]) => name.includes('build') || script.includes('build'));
    
    console.log('Build scripts found:');
    buildScripts.forEach(([name, script]) => {
        console.log(`${name}: ${script}`);
    });
}

function main() {
    console.log('Analyzing dependencies in Apps/studio...\n');

    packagesToCheck.forEach(packageName => {
        console.log(`\nAnalyzing ${packageName}:`);
        searchForUsage(packageName);
        checkDependencyTree(packageName);
    });

    console.log('\nChecking build scripts:');
    checkBuildScripts();

    console.log('\nAnalysis complete. Please review the output to determine if these packages are necessary.');
}

main();