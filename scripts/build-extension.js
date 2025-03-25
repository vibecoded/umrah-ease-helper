
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
  
  console.log('\nExtension is ready in the dist/umrah-assistant.zip file');
  console.log('You can upload this file to the Firefox Add-ons Developer Hub');
} catch (error) {
  console.error('Build failed:', error);
  process.exit(1);
}
