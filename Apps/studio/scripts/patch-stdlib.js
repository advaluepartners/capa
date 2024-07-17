const fs = require('fs');
const path = require('path');

const patchFile = (filePath) => {
  if (fs.existsSync(filePath)) {
    let content = fs.readFileSync(filePath, 'utf8');
    content = content.replace(
      '"install": "node-gyp rebuild"',
      '"install": "exit 0"'
    );
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`Patched: ${filePath}`);
  }
};

const stdlibPath = path.join(__dirname, 'node_modules', '@stdlib', 'number-float64-base-normalize', 'package.json');
patchFile(stdlibPath);