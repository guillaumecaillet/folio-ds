import { defineConfig } from 'vite';

export default defineConfig({
  build: {
    lib: {
      entry: 'src/index.ts',
      formats: ['es'],
      fileName: 'folio-ds',
    },
    // Bundle Lit so the output is a single self-contained module,
    // usable from a plain <script type="module"> without a build step.
    rollupOptions: {},
  },
});
