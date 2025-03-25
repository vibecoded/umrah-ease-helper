
const fs = require('fs');
const path = require('path');
const archiver = require('archiver');

// Create dist directory if it doesn't exist
const distPath = path.resolve(__dirname, '../dist');
if (!fs.existsSync(distPath)) {
  fs.mkdirSync(distPath, { recursive: true });
}

// Create extension zip file
const output = fs.createWriteStream(path.resolve(distPath, 'umrah-assistant.zip'));
const archive = archiver('zip', {
  zlib: { level: 9 } // Maximum compression
});

output.on('close', () => {
  console.log(`Extension packaged successfully: ${archive.pointer()} total bytes`);
});

archive.on('error', (err) => {
  throw err;
});

archive.pipe(output);

// Add built files to the zip
archive.directory(path.resolve(__dirname, '../dist'), false);

// Add manifest.json
archive.file(path.resolve(__dirname, '../src/manifest.json'), { name: 'manifest.json' });

// Add icons
archive.directory(path.resolve(__dirname, '../public/icons'), 'icons');

// Add background script
archive.file(path.resolve(__dirname, '../dist/background.js'), { name: 'background.js' });

archive.finalize();
