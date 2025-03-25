
const fs = require('fs');
const path = require('path');
const archiver = require('archiver');

// Create Firefox extension directory structure
const createExtensionStructure = () => {
  const extensionDir = path.resolve(__dirname, '../dist/firefox-extension');
  
  // Create directories
  const directories = [
    extensionDir,
    path.join(extensionDir, 'background'),
    path.join(extensionDir, 'popup'),
    path.join(extensionDir, 'icons')
  ];
  
  directories.forEach(dir => {
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
  });
  
  // Copy manifest.json to root
  fs.copyFileSync(
    path.resolve(__dirname, '../src/manifest.json'),
    path.join(extensionDir, 'manifest.json')
  );
  
  // Copy background script
  fs.copyFileSync(
    path.resolve(__dirname, '../dist/background.js'),
    path.join(extensionDir, 'background/background.js')
  );
  
  // Update manifest to point to the new background script location
  const manifest = JSON.parse(fs.readFileSync(path.join(extensionDir, 'manifest.json'), 'utf8'));
  manifest.background.service_worker = 'background/background.js';
  
  // Copy icons
  const iconSizes = [16, 32, 48, 96];
  iconSizes.forEach(size => {
    fs.copyFileSync(
      path.resolve(__dirname, `../public/icons/icon-${size}.png`),
      path.join(extensionDir, `icons/icon-${size}.png`)
    );
  });
  
  // Copy popup assets
  const popupAssets = fs.readdirSync(path.resolve(__dirname, '../dist/assets'));
  popupAssets.forEach(asset => {
    fs.copyFileSync(
      path.resolve(__dirname, '../dist/assets', asset),
      path.join(extensionDir, 'popup', asset)
    );
  });
  
  // Copy HTML file and update paths
  let htmlContent = fs.readFileSync(path.resolve(__dirname, '../dist/index.html'), 'utf8');
  
  // Update asset paths to be relative to popup folder
  htmlContent = htmlContent.replace(/src="\/assets\//g, 'src="');
  htmlContent = htmlContent.replace(/href="\/assets\//g, 'href="');
  
  fs.writeFileSync(path.join(extensionDir, 'popup/index.html'), htmlContent);
  
  // Update manifest to point to the new popup location
  manifest.action.default_popup = 'popup/index.html';
  manifest.action.default_icon = {
    "16": "icons/icon-16.png",
    "32": "icons/icon-32.png"
  };
  manifest.icons = {
    "48": "icons/icon-48.png",
    "96": "icons/icon-96.png"
  };
  
  fs.writeFileSync(path.join(extensionDir, 'manifest.json'), JSON.stringify(manifest, null, 2));
  
  return extensionDir;
};

// Create dist directory if it doesn't exist
const distPath = path.resolve(__dirname, '../dist');
if (!fs.existsSync(distPath)) {
  fs.mkdirSync(distPath, { recursive: true });
}

// Create the extension structure
const extensionDir = createExtensionStructure();
console.log(`Extension structure created at: ${extensionDir}`);

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
archive.directory(extensionDir, false);

archive.finalize();
