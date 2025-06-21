import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/interview': {
        target: 'https://educational-yclh.onrender.com',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/interview/, '/api/interview'),
        secure: false,
      },
      '/api': {
        target: 'https://educational-yclh.onrender.com',
        changeOrigin: true,
        secure: false,
      }
    },
  },
});