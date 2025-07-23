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
      'firebase/firestore/lite', // Add the lite version that's causing the error
      'firebase/analytics'
    ],
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: (id) => {
          if (id.includes('firebase')) {
            return 'firebase';
          }
          if (id.includes('node_modules')) {
            return 'vendor';
          }
        },
      },
    },
    commonjsOptions: {
      include: [/node_modules/],
      transformMixedEsModules: true,
    },
  },
});