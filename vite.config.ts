import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path'; // Import 'path' module

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
      },
      // Add a custom resolver to explicitly tell Rollup how to find Firebase modules
      // This is a more aggressive attempt to resolve the 'firebase/app' import issue.
      // It tries to force Rollup to use Node.js module resolution for Firebase.
      input: {
        main: path.resolve(__dirname, 'index.html'), // Ensure main entry point is correctly defined
      },
    },
    commonjsOptions: {
      include: [/node_modules/],
      transformMixedEsModules: true, // Important for mixed CJS/ESM packages
    },
  },
  resolve: {
    // This alias can sometimes help with module resolution issues,
    // ensuring that 'firebase/app' correctly points to the installed package.
    alias: {
      'firebase/app': path.resolve(__dirname, 'node_modules/firebase/app/dist/index.esm.js'),
      'firebase/firestore': path.resolve(__dirname, 'node_modules/firebase/firestore/dist/index.esm.js'),
      // If you use firebase/firestore/lite, you might need to add it here too:
      // 'firebase/firestore/lite': path.resolve(__dirname, 'node_modules/firebase/firestore/dist/index.esm.js'),
      // Note: The actual path might vary slightly based on Firebase version and internal structure.
      // You might need to check your node_modules/firebase/app/dist and node_modules/firebase/firestore/dist
      // for the exact ESM entry point (e.g., index.esm.js, index.mjs, etc.)
    },
  },
});
