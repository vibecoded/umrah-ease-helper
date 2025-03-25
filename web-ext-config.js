module.exports = {
  // Directory where your extension is built
  sourceDir: './dist/firefox-extension',
  
  // Pattern for files to ignore when packaging
  ignoreFiles: [
    'package-lock.json',
    'yarn.lock',
    'node_modules',
    '.git',
    '.github',
    '.vscode',
    '.idea'
  ],
  
  // Browser-specific settings
  firefox: {
    // Firefox profile with which to run the extension
    // Use 'keepProfileChanges: true' to save changes made during testing
    profileCreateIfMissing: true,
    keepProfileChanges: false,
  },
  
  // Lint settings
  lint: {
    // Extra rules for linting
    warningsAsErrors: false,
    selfHosted: true,
  },
  
  // Build settings
  build: {
    // Where to output the built extension
    overwriteDest: true,
    filename: 'umrah-assistant.zip',
  }
};
