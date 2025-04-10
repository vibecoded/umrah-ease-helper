
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [
    react(),
    mode === 'development' &&
    componentTagger(),
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    outDir: 'dist',
    emptyOutDir: true,
    sourcemap: mode === 'development',
    rollupOptions: {
      input: {
        main: path.resolve(__dirname, "index.html"),
        background: path.resolve(__dirname, "src/background.ts"),
      },
      output: {
        entryFileNames: (chunk) => {
          return chunk.name === 'background' ? 'background.js' : 'assets/[name]-[hash].js';
        },
      },
    },
  },
  define: {
    // Ensure browser and chrome globals are recognized
    'process.env.VITE_BROWSER_MODE': JSON.stringify(mode),
    // Make global.browser available in the build
    'global.browser': 'typeof browser !== "undefined" ? browser : undefined',
    'global.chrome': 'typeof chrome !== "undefined" ? chrome : undefined',
  }
}));
