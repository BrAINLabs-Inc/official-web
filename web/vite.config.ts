import path from 'path';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { badgesPlugin } from './badges/plugin';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), badgesPlugin()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  server: {
    port: 5173,
  },
  build: {
    sourcemap: false,
  },
});
