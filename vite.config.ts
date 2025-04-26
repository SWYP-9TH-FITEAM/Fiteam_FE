import path from 'path';
import tailwindcss from '@tailwindcss/vite';
import {defineConfig} from 'vite';
import react from '@vitejs/plugin-react-swc';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  build: {
    outDir: 'dist',
    rollupOptions: {
      // Make sure Rollup treats the _redirects file as an asset
      input: {
        main: path.resolve(__dirname, 'index.html'),
      },
    },
  },
});
