import {defineConfig} from 'vite';
import {resolve} from 'path';
import react from '@vitejs/plugin-react';
import {crx} from '@crxjs/vite-plugin';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import {nodePolyfills} from 'vite-plugin-node-polyfills';
import manifest from './manifest.json';
// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      'crypto': 'crypto-browserify',
      'util': 'util/',
      'buffer': 'buffer/',
      'process': 'process/browser.js',
    },
  },
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        injected: resolve(__dirname, 'injected.html'),
      },
    },
  },
  plugins: [
    react(),
    crx({manifest}),
    nodePolyfills(),
    // eslint-disable-next-line new-cap
  ],
});
