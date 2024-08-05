import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  root: 'frontend',
  publicDir: 'frontend/public',
  resolve: {
    alias: {
      '@': '/src',
    },
  },
  server: {
    open: true,
  },
  build: {
    outDir: 'dist'
  }
});
