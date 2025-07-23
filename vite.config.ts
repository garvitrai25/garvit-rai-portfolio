import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    exclude: ['lucide-react'],
    // Ensure Firebase is explicitly included for pre-bundling.
    // This is often key for resolving module resolution issues.
    include: [
      'firebase/app',
      'firebase/firestore',
      'firebase/analytics', // Only include if you are actually using getAnalytics
    ],
  },
  build: {
    // Set a build target that is widely supported.
    // Sometimes, very modern targets can cause issues with older dependencies.
    target: 'esnext', // 'es2015' or 'esnext' are common. 'esnext' is usually fine.
    rollupOptions: {
      output: {
        manualChunks: (id) => {
          if (id.includes('firebase')) {
            return 'firebase'; // Group all firebase modules into a single 'firebase' chunk
          }
          if (id.includes('node_modules')) {
            return 'vendor'; // Default chunking for other modules
          }
        },
      },
      // IMPORTANT: Do NOT use 'external' here for Firebase modules.
      // The error indicates Rollup is failing to resolve them when externalized.
      // We want Vite to bundle them.
    },
    commonjsOptions: {
      include: [/node_modules/],
      // This is crucial for Firebase v9+ which often has mixed CommonJS/ESM modules.
      // Ensure Vite transforms them correctly.
      transformMixedEsModules: true,
      // Remove esmExternals from here if it was causing issues with 'firebase/app' specifically.
      // esmExternals: ['firebase'], // Remove this line
    },
  },
});
