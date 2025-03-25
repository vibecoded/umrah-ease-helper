
const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('Building Umrah Assistant extension...');

try {
  // Run the Vite build command
  execSync('npx vite build', { stdio: 'inherit' });
  
  console.log('Build completed successfully!');
  console.log('Now packaging the extension...');
  
  // Run the packaging script
  require('./package-extension.js');
  
  console.log('\nExtension is ready in the dist/firefox-extension directory');
  console.log('You can upload the zip file from dist/umrah-assistant.zip to the Firefox Add-ons Developer Hub');
} catch (error) {
  console.error('Build failed:', error);
  process.exit(1);
}
