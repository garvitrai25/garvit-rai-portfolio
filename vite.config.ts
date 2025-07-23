import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    exclude: ['lucide-react'],
    // Keep these includes for development server performance.
    // They are less impactful for production build issues but don't hurt.
    include: [
      'firebase/app',
      'firebase/firestore',
      'firebase/analytics' // Only include if you are actually using getAnalytics
    ],
  },
  build: {
    // Remove previous rollupOptions and commonjsOptions that were causing conflicts or not resolving the issue.
    // Instead, we'll focus on a more direct bundling approach.
    rollupOptions: {
      output: {
        // Ensure that Firebase modules are not externalized and are bundled directly.
        // This is often the most reliable way to prevent "Failed to resolve module specifier" errors
        // for client-side libraries like Firebase in production builds.
        manualChunks: (id) => {
          if (id.includes('firebase')) {
            // Group all firebase modules into a single 'firebase' chunk
            return 'firebase';
          }
          // Default chunking for other modules
          if (id.includes('node_modules')) {
            return 'vendor';
          }
        },
      },
    },
    // Ensure that CommonJS modules are correctly transformed to ESM.
    // This is crucial for Firebase v9+ in Vite production builds.
    commonjsOptions: {
      include: [/node_modules/],
      // Explicitly transpile Firebase modules if they are CommonJS
      transformMixedEsModules: true, // Important for mixed CJS/ESM packages
    },
  },
});
