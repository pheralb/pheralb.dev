import adapter from '@sveltejs/adapter-auto';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

// Markdown:
import { mdsvex } from 'mdsvex';
import { mdsvexOptions } from './mdsvex.options.js';

/** @type {import('@sveltejs/kit').Config} */
const config = {
  extensions: ['.svelte', '.md'],
  preprocess: [vitePreprocess(), mdsvex(mdsvexOptions)],
  kit: {
    adapter: adapter(),
    alias: {
      '@': './src/*'
    }
  }
};

export default config;
