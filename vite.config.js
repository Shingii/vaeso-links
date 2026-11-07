import { defineConfig } from 'vite';

// base './' makes the built site work from any folder or URL,
// including GitHub Pages project sites (user.github.io/repo-name/).
export default defineConfig({
  base: './',
  build: { chunkSizeWarningLimit: 700 } // three.js is large by nature; this silences the size warning
});
