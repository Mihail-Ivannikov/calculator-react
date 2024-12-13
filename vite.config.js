import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    // Disable cache in development for quicker testing and reloading
    watch: {
      usePolling: true, // Forces Vite to disable caching in some cases
    },
    headers: {
      'Cache-Control': 'no-store', // Prevents caching of files in the browser during development
    },
  },
  build: {
    // Enable versioning of assets in production
    rollupOptions: {
      output: {
        assetFileNames: 'assets/[name]-[hash][extname]',
        chunkFileNames: 'assets/[name]-[hash].js',
        entryFileNames: 'assets/[name]-[hash].js',
      },
    },
  },
});
