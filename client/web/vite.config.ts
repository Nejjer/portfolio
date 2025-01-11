import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import vitePluginSvgr from 'vite-plugin-svgr';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), vitePluginSvgr()],
  server: {
    proxy: {
      '/api/': {
        target: 'http://5.141.235.46:7198',
        changeOrigin: true,
      },
    },
  },
});
