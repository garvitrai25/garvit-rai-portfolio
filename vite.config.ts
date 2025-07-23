import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    exclude: ['lucide-react'],
    include: [
      'firebase/app',
      'firebase/firestore',
      'firebase/analytics' // Only include if you are actually using getAnalytics
    ],
  },
  build: {
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
        // This is a crucial part: explicitly tell Rollup how to resolve the Firebase imports
        // when it creates the output bundles. This often fixes the "Failed to resolve import" error.
        paths: {
          'firebase/app': './node_modules/firebase/app/dist/index.esm.js', // Adjust if your local path is different
          'firebase/firestore': './node_modules/firebase/firestore/dist/index.esm.js', // Adjust if your local path is different
          // If using analytics, add:
          // 'firebase/analytics': './node_modules/firebase/analytics/dist/index.esm.js',
        },
      },
      // Explicitly mark Firebase as external to prevent Rollup from trying to bundle it deeply,
      // but then use 'paths' to tell it where to find the module at runtime.
      external: [
        'firebase/app',
        'firebase/firestore',
        'firebase/analytics', // Add if using analytics
      ],
    },
    commonjsOptions: {
      include: [/node_modules/],
      transformMixedEsModules: true,
      // Ensure 'firebase' is in esmExternals if it has mixed modules,
      // but 'external' in rollupOptions might take precedence.
      // We'll keep it here as a fallback.
      esmExternals: ['firebase'],
    },
  },
});
