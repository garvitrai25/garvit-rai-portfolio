import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    exclude: ['lucide-react'],
    // Keep these includes for development server performance,
    // but the build issue will be addressed by the new 'resolve.alias' or 'build.commonjsOptions'
    include: [
      'firebase/app',
      'firebase/firestore',
      'firebase/analytics' // Only include if you are actually using getAnalytics
    ],
  },
  build: {
    rollupOptions: {
      // This approach is often more reliable for Firebase in production with Vite.
      // It explicitly tells Rollup how to handle these specific Firebase sub-paths.
      // We'll try to ensure they are treated as CJS or correctly resolved.
      output: {
        manualChunks: {
          'firebase-app': ['firebase/app'],
          'firebase-firestore': ['firebase/firestore/lite'], // Use /lite here too
          // Add other firebase modules if you use them, e.g., 'firebase-analytics': ['firebase/analytics'],
        },
      },
    },
    // This is another common fix for Firebase v9+ in Vite production builds.
    // It tells Vite to transform these CommonJS modules into ESM during the build.
    commonjsOptions: {
      include: [/node_modules/],
      // Explicitly list Firebase modules that might be causing issues
      // This helps Vite/Rollup process them correctly for the browser
      esmExternals: ['firebase/app', 'firebase/firestore', 'firebase/analytics'],
      // You might need to adjust this based on the exact structure of Firebase's internal modules
      // Sometimes just including the top-level package is enough.
    },
  },
});
