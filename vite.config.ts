import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
// Remove 'path' import as it's no longer needed without 'resolve.alias'
// import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    exclude: ['lucide-react'],
    // Keep these includes for development server performance.
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
      // Remove 'input' if it was added solely for the alias, otherwise keep your main entry point
      // input: {
      //   main: path.resolve(__dirname, 'index.html'),
      // },
    },
    commonjsOptions: {
      include: [/node_modules/],
      transformMixedEsModules: true, // Important for mixed CJS/ESM packages
    },
  },
  // IMPORTANT: Remove the entire 'resolve' object with the 'alias' for Firebase.
  // resolve: {
  //   alias: {
  //     'firebase/app': path.resolve(__dirname, 'node_modules/firebase/app/dist/index.esm.js'),
  //     'firebase/firestore': path.resolve(__dirname, 'node_modules/firebase/firestore/dist/index.esm.js'),
  //   },
  // },
});
