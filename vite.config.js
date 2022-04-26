import { resolve } from 'path';
import { defineConfig } from 'vite';
import twig from 'vite-plugin-twig';

const root = resolve(__dirname, 'src');

export default defineConfig({
  plugins: [twig()],
  root,
});
