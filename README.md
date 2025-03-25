
# Umrah Assistant Firefox Extension

A comprehensive tool to simplify planning and performing Umrah.

## Project Structure

- `dist/firefox-extension/` - The built extension ready for submission to Firefox Add-ons
- `src/` - Source code
  - `background.ts` - Background script for the extension
  - `components/` - React components
  - `context/` - React context providers
  - `lib/` - Utility functions and constants
  - `services/` - Service modules
  - `types/` - TypeScript type definitions
- `public/` - Static files
  - `icons/` - Extension icons

## Development

1. Install dependencies:
```
npm install
```

2. Build the extension:
```
node scripts/build-extension.js
```

3. The built extension will be in `dist/firefox-extension/` and a zip file will be created at `dist/umrah-assistant.zip`

4. For development, you can use web-ext:
```
npm install -g web-ext
web-ext run --source-dir ./dist/firefox-extension
```

## Firefox Add-on Submission

To submit the extension to Firefox Add-ons:

1. Build the extension using the command above
2. Upload the generated `dist/umrah-assistant.zip` file to [Firefox Add-on Developer Hub](https://addons.mozilla.org/developers/)

## Features

- Prayer time notifications
- Umrah ritual guidance
- Multi-language support
- Weather information
- Hotel and flight booking assistance
- And more!

## License

This project is proprietary and confidential.
