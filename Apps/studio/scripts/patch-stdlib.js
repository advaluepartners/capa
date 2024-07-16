const fs = require('fs');
const path = require('path');

const patchFile = (filePath) => {
  if (fs.existsSync(filePath)) {
    let content = fs.readFileSync(filePath, 'utf8');
    content = content.replace(
      '"postinstall": "node-gyp rebuild"',
      '"postinstall": "exit 0"'
    );
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`Patched: ${filePath}`);
  }
};

const stdlibPaths = [
  'node_modules/@stdlib/math-base-special-ldexp/node_modules/@stdlib/number-float64-base-normalize/package.json',
  'node_modules/@stdlib/number-float64-base-normalize/package.json'
];

stdlibPaths.forEach(stdlibPath => {
  const fullPath = path.join(process.cwd(), stdlibPath);
  patchFile(fullPath);
});