import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    exclude: ['lucide-react'],
    // Keep these includes as they can sometimes help with development server,
    // though the build issue is often addressed by 'external'
    include: [
      'firebase/app',
      'firebase/firestore',
      'firebase/analytics' // Include if you use getAnalytics
    ],
  },
  build: {
    rollupOptions: {
      // Explicitly mark Firebase modules as external.
      // This tells Rollup not to try and bundle them, assuming they are available
      // at runtime (which they are, as they are installed via npm).
      external: [
        'firebase/app',
        'firebase/firestore',
        // Add other firebase sub-modules if you import them directly (e.g., 'firebase/auth')
        // 'firebase/analytics', // Add if you use analytics and it causes issues
      ],
    },
  },
});