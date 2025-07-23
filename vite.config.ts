import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    exclude: ['lucide-react'],
    // Add Firebase modules to include for optimization/pre-bundling.
    // This often helps Vite resolve them correctly during the build process.
    include: [
      'firebase/app',
      'firebase/firestore',
      'firebase/analytics' // Include if you use getAnalytics
    ],
  },
  // You might also see suggestions to add `build.rollupOptions.external`.
  // However, `external` usually tells Rollup *not* to bundle a module,
  // which is generally not what you want for client-side Firebase.
  // The `optimizeDeps.include` often resolves the underlying resolution issue.
});