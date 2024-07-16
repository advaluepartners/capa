#!/bin/bash

# Install node-gyp globally
npm install -g node-gyp@latest

# Install dependencies without running scripts
npm install $NPM_FLAGS --ignore-scripts

# Run the patch-stdlib.js script
node ./scripts/patch-stdlib.js

# Install remaining dependencies
npm install

# Change to Apps/studio directory and install its dependencies
cd Apps/studio

# Install node-gyp in the Apps/studio directory
npm install --ignore-scripts=false --verbose node-gyp@latest

# Install other dependencies
npm install --ignore-scripts

# Run the patch-stdlib.js script in Apps/studio
node ../scripts/patch-stdlib.js

# Return to root directory
cd ../..

# List installed packages
npm ls