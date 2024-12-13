import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vite.dev/config/
export default defineConfig({
  base: '/calculator-react/', // Ensure this matches your GitHub Pages repository
  plugins: [react()],
  server: {
    watch: {
      usePolling: true, // Ensure Vite watches changes correctly
    },
    headers: {
      'Cache-Control': 'no-store', // Disable caching during development
    },
  },
  build: {
    rollupOptions: {
      output: {
        assetFileNames: 'assets/[name]-[hash][extname]',
        chunkFileNames: 'assets/[name]-[hash].js',
        entryFileNames: 'assets/[name]-[hash].js',
      },
    },
  },
});
