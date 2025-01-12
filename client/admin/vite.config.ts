import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'http://5.141.235.46:5000',
        changeOrigin: true,
      },
      'http://localhost:5128': {
        target: 'http://5.141.235.46:5000',
        changeOrigin: true,
      },
    },
  },
});
