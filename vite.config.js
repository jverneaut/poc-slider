import { resolve } from 'path';
import { defineConfig } from 'vite';
import twig from 'vite-plugin-twig';

const root = resolve(__dirname, 'src');
const outDir = resolve(__dirname, 'dist');

export default defineConfig({
  plugins: [twig()],
  root,
  build: {
    outDir,
    emptyOutDir: true,
    rollupOptions: {
      input: {
        index: resolve(root, 'index.html'),
        rosheim: resolve(root, 'rosheim.html'),
        paris: resolve(root, 'paris.html'),
        strasbourg: resolve(root, 'strasbourg.html'),
      },
    },
  },
});
